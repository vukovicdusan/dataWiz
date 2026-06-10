"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { leaveTeam } from "@/app/url-builder/dashboard/actions";

type LeaveTeamDialogProps = {
  teamName: string;
  onClose: () => void;
};

const LeaveTeamDialog = ({ teamName, onClose }: LeaveTeamDialogProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = async () => {
    setIsLeaving(true);
    setError(null);
    const result = await leaveTeam();
    if (result.ok) {
      onClose();
      router.refresh();
    } else {
      setError(result.error);
      setIsLeaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg/80 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Leave team"
        className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white">
          Leave {teamName}?
        </h2>
        <p className="mt-3 text-gray-300">
          Your teammates keep access to all shared data (links and history).
          You&apos;ll get a fresh personal team of your own.
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-gray-400 transition hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLeave}
            disabled={isLeaving}
            className="rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
          >
            {isLeaving ? "Leaving..." : "Leave team"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveTeamDialog;
