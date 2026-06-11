"use client";

import { useEffect, useRef, useState } from "react";

type BaseUrlFieldProps = {
  value: string;
  savedUrls: string[];
  onChange: (value: string) => void;
  onSave: (value: string) => Promise<{ ok: boolean; error?: string }>;
  onSaved: (normalized: string) => void;
};

const BaseUrlField = ({
  value,
  savedUrls,
  onChange,
  onSave,
  onSaved,
}: BaseUrlFieldProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (fieldRef.current && !fieldRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const trimmed = value.trim();

  // Normalize client-side (same pure function used server-side) to check
  // whether the normalized form is already in the list.
  const normalizedTrimmed = (() => {
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  })();

  const canSave =
    trimmed !== "" && !savedUrls.includes(normalizedTrimmed);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await onSave(trimmed);
      if (result.ok) {
        setIsSaved(true);
        onSaved(normalizedTrimmed);
      } else {
        setSaveError(result.error ?? "Could not save the URL. Please try again.");
      }
    } catch {
      setSaveError("Could not save the URL. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div ref={fieldRef} className="relative">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor="base-url"
          className="text-sm font-bold text-gray-200"
        >
          Base URL <span className="text-primaryAccent">*</span>
        </label>
        {canSave && (
          <span className="group relative inline-flex">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1 text-xs font-bold text-primaryAccent transition hover:text-primaryAccent/80 disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
              <svg
                aria-hidden="true"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
            <span
              role="tooltip"
              className="pointer-events-none absolute right-0 top-full z-40 mt-1 hidden w-60 rounded-md border border-secondaryBg/60 bg-secondaryAccent p-2 text-xs font-normal normal-case text-gray-200 shadow-2xl group-hover:block group-focus-within:block"
            >
              Saves this URL to your dropdown list, so it can be picked next
              time instead of retyping it.
            </span>
          </span>
        )}
      </div>

      <input
        id="base-url"
        type="text"
        value={value}
        onChange={(event) => {
          setSaveError(null);
          setIsSaved(false);
          onChange(event.target.value);
        }}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        placeholder="https://example.com/page"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="base-url-options"
        className="mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none"
      />

      {isOpen && savedUrls.length > 0 && (
        <ul
          id="base-url-options"
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-secondaryBg/60 bg-secondaryAccent p-1 shadow-2xl"
        >
          <li>
            <p className="px-3 py-1 text-xs uppercase tracking-wide text-gray-400">
              Saved URLs
            </p>
            <ul>
              {savedUrls.map((url) => (
                <li key={url}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={url === value}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setSaveError(null);
                      setIsSaved(false);
                      onChange(url);
                      setIsOpen(false);
                    }}
                    className="block w-full rounded px-3 py-1.5 text-left text-sm text-gray-200 transition hover:bg-primaryAccent/30"
                  >
                    {url}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}

      <p className="mt-1 text-xs text-gray-400">
        Only tag links that point to other websites, never your own internal
        links.
      </p>

      {isSaved && (
        <p role="status" className="mt-1 text-xs text-green-300">
          Saved. This URL is now in your dropdown list.
        </p>
      )}

      {saveError && (
        <p role="alert" className="mt-1 text-xs text-red-300">
          {saveError}
        </p>
      )}
    </div>
  );
};

export default BaseUrlField;
