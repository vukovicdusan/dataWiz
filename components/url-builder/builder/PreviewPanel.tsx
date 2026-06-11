"use client";

import { useEffect, useRef, useState } from "react";
import type { Warning } from "@/lib/utm/validate";
import type { BuilderActionResult } from "@/app/url-builder/dashboard/builder-actions";

type PreviewPanelProps = {
  fullUrl: string;
  warnings: Warning[];
  copyDisabled: boolean;
  /** Saves the URL to team history (server action wired by BuilderForm). */
  onCopy: () => Promise<BuilderActionResult>;
};

const PreviewPanel = ({
  fullUrl,
  warnings,
  copyDisabled,
  onCopy,
}: PreviewPanelProps) => {
  const previewRef = useRef<HTMLParagraphElement>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [fallbackHint, setFallbackHint] = useState<string | null>(null);

  // The URL changed, so any earlier "Copied..." message no longer describes it.
  useEffect(() => {
    setConfirmation(null);
    setSaveError(null);
    setFallbackHint(null);
  }, [fullUrl]);

  const selectPreview = () => {
    const node = previewRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleCopy = async () => {
    setIsWorking(true);
    setConfirmation(null);
    setSaveError(null);
    setFallbackHint(null);

    // Clipboard first: a later save failure must never cost the user the copy.
    let copied = false;
    try {
      await navigator.clipboard.writeText(fullUrl);
      copied = true;
    } catch {
      selectPreview();
      setFallbackHint(
        "Copying is blocked in this browser. The link is selected for you, press Cmd+C (Ctrl+C on Windows) to copy it."
      );
    }

    try {
      const result = await onCopy();
      if (result.ok) {
        setConfirmation(
          copied ? "Copied and saved to team history." : "Saved to team history."
        );
      } else {
        setSaveError(copied ? `Copied. ${result.error}` : result.error);
      }
    } catch {
      setSaveError(
        copied
          ? "Copied. Could not reach the server to save to team history."
          : "Could not reach the server to save to team history."
      );
    } finally {
      setIsWorking(false);
    }
  };

  return (
    <section className="h-fit rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-6 shadow-2xl">
      <h2 className="text-lg font-bold text-white">Your link</h2>

      {fullUrl ? (
        <p
          ref={previewRef}
          className="mt-3 break-all rounded-md bg-primaryBg/60 p-3 font-mono text-sm text-gray-200"
        >
          {fullUrl}
        </p>
      ) : (
        <p className="mt-3 text-sm text-gray-400">
          Start typing a base URL and the finished link will appear here.
        </p>
      )}

      <button
        type="button"
        onClick={handleCopy}
        disabled={copyDisabled || isWorking}
        className="mt-4 rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
      >
        {isWorking ? "Copying..." : "Copy URL"}
      </button>

      {confirmation && (
        <p className="mt-3 text-sm text-green-300">{confirmation}</p>
      )}
      {fallbackHint && (
        <p className="mt-3 text-sm text-amber-300">{fallbackHint}</p>
      )}
      {saveError && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {saveError}
        </p>
      )}

      {warnings.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-bold text-amber-300">Heads up</h3>
          <ul className="mt-2 space-y-2">
            {warnings.map((warning, index) => (
              <li
                key={`${warning.field}-${index}`}
                className="text-sm text-gray-300"
              >
                {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default PreviewPanel;
