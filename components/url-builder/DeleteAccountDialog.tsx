"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteAccount } from "@/app/url-builder/team/account-actions";

type DeleteAccountDialogProps = {
  teamName: string;
  memberCount: number;
  onClose: () => void;
};

const DeleteAccountDialog = ({
  teamName,
  memberCount,
  onClose,
}: DeleteAccountDialogProps) => {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const soleMember = memberCount <= 1;
  // Exact match on purpose: deletion is irreversible and the friction is
  // intentional (approved design decision).
  const confirmed = confirmText === "DELETE";

  // While deletion is in flight the dialog must stay open so a failure
  // message has somewhere to appear, so Escape/backdrop are ignored.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !working) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, working]);

  const handleDelete = async () => {
    if (!confirmed || working) return;
    setWorking(true);
    setError(null);
    try {
      const result = await deleteAccount();
      if (result.ok) {
        // The account no longer exists, so signing out may fail. That is
        // fine: we only need the local session cookies cleared on a best
        // effort basis before leaving.
        try {
          await createClient().auth.signOut();
        } catch {
          // Ignore: there is no account left to sign out of.
        }
        router.push("/url-builder");
        router.refresh();
      } else {
        setError(result.error);
        setWorking(false);
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setWorking(false);
    }
  };

  const consequences = soleMember
    ? [
        "Your account and Google sign-in for this app are removed.",
        `Your team ${teamName} is deleted, along with all link history, saved base URLs, saved values, and channels.`,
        "Signing in again later starts from scratch with a brand-new account.",
      ]
    : [
        "Your account and Google sign-in for this app are removed.",
        `${teamName} keeps going for the other members, and all links stay in the team history.`,
        "Links you created will show Unknown as the creator.",
        "Signing in again later starts from scratch with a brand-new account.",
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg/80 px-4"
      onClick={() => {
        if (!working) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Delete account"
        className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white">Delete your account?</h2>
        <p className="mt-3 text-sm text-gray-300">
          This cannot be undone. Here is what happens:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
          {consequences.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <label
          htmlFor="delete-account-confirm"
          className="mt-5 block text-sm font-bold text-gray-200"
        >
          Type DELETE to confirm
        </label>
        <input
          id="delete-account-confirm"
          type="text"
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
          autoComplete="off"
          disabled={working}
          className="mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none disabled:opacity-60"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={working}
            className="px-4 py-2.5 text-gray-400 transition hover:text-white disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!confirmed || working}
            className="rounded-md bg-red-600 px-5 py-2.5 font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {working ? "Deleting..." : "Delete my account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
