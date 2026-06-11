"use client";

import { useEffect, useRef, useState } from "react";
import {
  channelLabel,
  creatorLabel,
  formatEntryDate,
  type HistoryEntry,
} from "@/lib/history/types";

const HistoryRow = ({ entry }: { entry: HistoryEntry }) => {
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
          className="flex-shrink-0 rounded-md bg-primaryAccent px-4 py-2 text-xs font-bold text-white transition hover:bg-primaryAccent/80"
        >
          {isCopied ? "Copied!" : "Copy"}
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
          {channelLabel(entry.channel)}
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
