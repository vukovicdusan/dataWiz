"use client";

import { useEffect, useState } from "react";
import {
  getOrCreateInvite,
  regenerateInvite,
  type InviteResult,
} from "@/app/url-builder/dashboard/actions";

type InviteModalProps = {
  onClose: () => void;
};

const InviteModal = ({ onClose }: InviteModalProps) => {
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const applyResult = (result: InviteResult) => {
    if (result.ok) {
      setInviteUrl(
        `${window.location.origin}/url-builder/invite/${result.token}`
      );
      setError(null);
    } else {
      setError(result.error);
    }
    setIsWorking(false);
    setIsCopied(false);
  };

  useEffect(() => {
    getOrCreateInvite().then(applyResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setError("Could not copy. Select the link and copy it manually.");
    }
  };

  const handleRegenerate = async () => {
    setIsWorking(true);
    applyResult(await regenerateInvite());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg/80 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Invite a member"
        className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white">Invite a member</h2>
        <p className="mt-2 text-sm text-gray-300">
          Anyone with this link can join your team. It works for 7 days.
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        {inviteUrl && (
          <input
            type="text"
            readOnly
            value={inviteUrl}
            onFocus={(event) => event.target.select()}
            className="mt-4 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200"
          />
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isWorking || !inviteUrl}
            className="rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
          >
            {isCopied ? "Copied!" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isWorking}
            className="rounded-md border border-secondaryBg/60 px-5 py-2.5 font-bold text-gray-200 transition hover:bg-secondaryBg/30 disabled:opacity-60"
          >
            {isWorking ? "Working..." : "Generate new link"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-3 py-2.5 text-gray-400 transition hover:text-white"
          >
            Close
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          Generating a new link stops the previous one from working.
        </p>
      </div>
    </div>
  );
};

export default InviteModal;
