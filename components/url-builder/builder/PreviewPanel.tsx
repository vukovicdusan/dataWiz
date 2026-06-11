"use client";

import { useEffect, useRef, useState } from "react";
import type { Warning } from "@/lib/utm/validate";
import type { BuilderActionResult } from "@/app/url-builder/dashboard/builder-actions";

type PreviewPanelProps = {
  fullUrl: string;
  /** Only the utm_* query string, no domain and no leading "?". */
  queryString: string;
  warnings: Warning[];
  copyDisabled: boolean;
  /** Saves the URL to team history (server action wired by BuilderForm). */
  onCopy: () => Promise<BuilderActionResult>;
};

const PreviewPanel = ({
  fullUrl,
  queryString,
  warnings,
  copyDisabled,
  onCopy,
}: PreviewPanelProps) => {
  const previewRef = useRef<HTMLParagraphElement>(null);
  const [working, setWorking] = useState<"url" | "params" | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [fallbackHint, setFallbackHint] = useState<string | null>(null);
  const [paramsFallbackText, setParamsFallbackText] = useState<string | null>(null);

  // The URL changed, so any earlier "Copied..." message no longer describes it.
  useEffect(() => {
    setConfirmation(null);
    setSaveError(null);
    setFallbackHint(null);
    setParamsFallbackText(null);
  }, [fullUrl, queryString]);

  const selectPreview = () => {
    const node = previewRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleCopy = async (kind: "url" | "params") => {
    if (working) return;
    setWorking(kind);
    setConfirmation(null);
    setSaveError(null);
    setFallbackHint(null);
    setParamsFallbackText(null);

    // Clipboard first: a later save failure must never cost the user the copy.
    const text = kind === "url" ? fullUrl : queryString;
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      if (kind === "url") {
        selectPreview();
        setFallbackHint(
          "Copying is blocked in this browser. The link is selected for you, press Cmd+C (Ctrl+C on Windows) to copy it."
        );
      } else {
        setFallbackHint(
          "Copying is blocked in this browser. Select the text below and press Cmd+C (Ctrl+C on Windows) to copy it."
        );
        setParamsFallbackText(queryString);
      }
    }

    // Both buttons record the full URL to History (approved default).
    try {
      const result = await onCopy();
      if (result.ok) {
        setConfirmation(
          copied ? "Copied and saved to history." : "Saved to history."
        );
      } else {
        setSaveError(copied ? `Copied. ${result.error}` : result.error);
      }
    } catch {
      setSaveError(
        copied
          ? "Copied. Could not reach the server to save to history."
          : "Could not reach the server to save to history."
      );
    } finally {
      setWorking(null);
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

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleCopy("url")}
          disabled={copyDisabled || working !== null}
          className="rounded-md bg-primaryAccent px-5 py-2.5 font-bold text-white transition hover:bg-primaryAccent/80 disabled:opacity-60"
        >
          {working === "url" ? "Copying..." : "Copy URL"}
        </button>
        <button
          type="button"
          onClick={() => handleCopy("params")}
          disabled={copyDisabled || working !== null}
          className="rounded-md border border-primaryAccent px-5 py-2.5 font-bold text-primaryAccent transition hover:bg-primaryAccent/20 disabled:opacity-60"
        >
          {working === "params" ? "Copying..." : "Copy UTM Params"}
        </button>
      </div>

      {confirmation && (
        <p role="status" className="mt-3 text-sm text-green-300">
          {confirmation}
        </p>
      )}
      {fallbackHint && (
        <>
          <p role="status" className="mt-3 text-sm text-amber-300">
            {fallbackHint}
          </p>
          {paramsFallbackText && (
            <p className="mt-2 select-all break-all rounded-md border border-secondaryBg/60 bg-black/30 px-3 py-2 font-mono text-sm text-gray-200">
              {paramsFallbackText}
            </p>
          )}
        </>
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
