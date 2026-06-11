"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/url-builder/GoogleSignInButton";
import { joinTeam } from "@/app/url-builder/invite/actions";

type InviteJoinCardProps = {
  token: string;
  teamName: string;
  isSignedIn: boolean;
  // The visitor's current team name when it differs from the inviting team;
  // null when they are signed out or have no team yet.
  currentTeamName: string | null;
};

const InviteJoinCard = ({
  token,
  teamName,
  isSignedIn,
  currentTeamName,
}: InviteJoinCardProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  // useCallback keeps the identity stable: GoogleSignInButton's effect lists
  // onSuccess as a dependency, and an unstable reference would re-initialize
  // the Google button on every render.
  const join = useCallback(async () => {
    setIsJoining(true);
    setError(null);
    const result = await joinTeam(token);
    if (result.ok) {
      router.push("/url-builder/dashboard");
      router.refresh();
    } else {
      setError(result.error);
      setIsJoining(false);
      // Re-render the server component: after a popup sign-in the page may
      // still show the signed-out branch even though a session now exists.
      router.refresh();
    }
  }, [token, router]);

  if (!isSignedIn) {
    return (
      <div>
        <p className="mt-3 text-gray-300">
          Sign in with Google to join this team.
        </p>
        <div className="mt-7">
          <GoogleSignInButton onSuccess={join} />
        </div>
        {isJoining && (
          <p className="mt-3 text-sm text-gray-400">Joining the team...</p>
        )}
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {currentTeamName ? (
        <p className="mt-3 text-gray-300">
          You are currently on <strong>{currentTeamName}</strong>. Joining{" "}
          <strong>{teamName}</strong> switches you to that team. Your current
          teammates keep all shared data.
        </p>
      ) : (
        <p className="mt-3 text-gray-300">
          Click below to join <strong>{teamName}</strong>.
        </p>
      )}
      <button
        type="button"
        onClick={join}
        disabled={isJoining}
        className="mt-7 rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
      >
        {isJoining
          ? "Joining..."
          : currentTeamName
            ? `Switch to ${teamName}`
            : `Join ${teamName}`}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
};

export default InviteJoinCard;
