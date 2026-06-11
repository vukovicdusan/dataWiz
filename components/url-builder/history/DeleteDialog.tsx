"use client";

import { useEffect, useState } from "react";
import type { HistoryActionResult } from "@/app/url-builder/history/history-actions";

type DeleteDialogProps = {
  /** How many links the confirm button will permanently delete. */
  count: number;
  /** Runs the delete server action. The dialog closes itself on success. */
  onConfirm: () => Promise<HistoryActionResult>;
  onClose: () => void;
};

const DeleteDialog = ({ count, onConfirm, onClose }: DeleteDialogProps) => {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // While a delete is in flight the dialog must stay open so a failure
  // message has somewhere to appear, so Escape/backdrop are ignored.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !working) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, working]);

  const single = count === 1;
  const title = single ? "Delete this link?" : `Delete ${count} links?`;
  const body = single
    ? "This removes it from history for the whole team and cannot be undone."
    : "This removes them from history for the whole team and cannot be undone.";
  const confirmLabel = single ? "Delete link" : `Delete ${count} links`;

  const handleConfirm = async () => {
    if (working) return;
    setWorking(true);
    setError(null);
    try {
      const result = await onConfirm();
      if (result.ok) {
        onClose();
      } else {
        setError(result.error);
        setWorking(false);
      }
    } catch {
      setError("Could not reach the server. Please try again.");
      setWorking(false);
    }
  };

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
        aria-label={title}
        className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-sm text-gray-300">{body}</p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={working}
            className="rounded-md border border-secondaryBg/60 px-4 py-2 text-sm font-bold text-gray-200 transition hover:bg-secondaryBg/30 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={working}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {working ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
