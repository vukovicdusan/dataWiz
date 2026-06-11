"use client";

import { useEffect, useRef, useState } from "react";
import {
  channelLabel,
  creatorLabel,
  formatEntryDate,
  type HistoryEntry,
} from "@/lib/history/types";

type HistoryRowProps = {
  entry: HistoryEntry;
  /** Opens the delete confirmation dialog for this row. */
  onRequestDelete: () => void;
  teamChannelLabels: Record<string, string>;
};

const HistoryRow = ({ entry, onRequestDelete, teamChannelLabels }: HistoryRowProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the pending "Copied!" reset on unmount (e.g. filters hide the row).
  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  const handleCopy = async () => {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(entry.fullUrl);
      setIsCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setCopyError(
        "Could not copy. Select the link text and copy it manually."
      );
    }
  };

  return (
    <li className="border-b border-secondaryBg/25 py-3 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <span
          className="min-w-0 flex-1 truncate font-mono text-sm text-gray-200"
          title={entry.fullUrl}
        >
          {entry.fullUrl}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={isCopied ? "Copied" : `Copy link for ${entry.campaign}`}
          aria-live="polite"
          className="flex-shrink-0 rounded-md bg-primaryAccent px-4 py-2 text-xs font-bold text-white transition hover:bg-primaryAccent/80"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={onRequestDelete}
          aria-label={`Delete link for ${entry.campaign}`}
          className="flex-shrink-0 rounded-md border border-red-500/60 px-2.5 py-2 text-red-300 transition hover:bg-red-500/20"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 .9h6a1 1 0 0 0 1-.9l1-12M10 11v6M14 11v6"
            />
          </svg>
        </button>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-gray-400">
        <span
          className={
            entry.channel
              ? "rounded-full bg-primaryAccent/20 px-2.5 py-0.5 text-blue-300"
              : "rounded-full bg-secondaryBg/40 px-2.5 py-0.5 text-gray-400"
          }
        >
          {channelLabel(entry.channel, teamChannelLabels)}
        </span>
        <span>{creatorLabel(entry)}</span>
        <span>{formatEntryDate(entry.createdAt)}</span>
      </div>
      {copyError && (
        <p role="alert" className="mt-1.5 text-xs text-red-300">
          {copyError}
        </p>
      )}
    </li>
  );
};

export default HistoryRow;
