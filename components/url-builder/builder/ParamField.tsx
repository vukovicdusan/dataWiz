"use client";

import { useEffect, useRef, useState } from "react";
import type { UtmParam } from "@/lib/utm/channels";
import {
  containsManualPlaceholder,
  containsPlatformVariable,
} from "@/lib/utm/build";
import type { BuilderActionResult } from "@/app/url-builder/dashboard/builder-actions";

type ParamFieldProps = {
  param: UtmParam;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  /** The current channel's template value for this param, or null. */
  templateDefault: string | null;
  exampleValues: readonly string[];
  teamValues: string[];
  /** Persists the value for the team; parent updates teamValues on success. */
  onSaveForTeam: (value: string) => Promise<BuilderActionResult>;
  /** Deletes a saved team value; parent removes it from teamValues optimistically. */
  onDeleteForTeam: (value: string) => Promise<BuilderActionResult>;
  /** Always-visible helper note rendered under the input, with an "i" icon. */
  infoNote?: string;
};

type DropdownGroup = { heading: string; options: string[]; deletable?: boolean };

const ParamField = ({
  param,
  required,
  value,
  onChange,
  templateDefault,
  exampleValues,
  teamValues,
  onSaveForTeam,
  onDeleteForTeam,
  infoNote,
}: ParamFieldProps) => {
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

  const name = `utm_${param}`;
  const trimmed = value.trim();

  // Dropdown sections, deduped in priority order: template, saved, examples.
  const seen = new Set<string>();
  const groups: DropdownGroup[] = [];
  const addGroup = (
    heading: string,
    candidates: readonly string[],
    deletable?: boolean
  ) => {
    const options = candidates.filter((option) => {
      if (!option || seen.has(option)) return false;
      seen.add(option);
      return true;
    });
    if (options.length > 0) groups.push({ heading, options, deletable });
  };
  addGroup("Channel template", templateDefault ? [templateDefault] : []);
  addGroup("Saved values", teamValues, true);
  addGroup("Examples", exampleValues);

  const canSaveForTeam =
    trimmed !== "" &&
    !containsPlatformVariable(trimmed) &&
    !containsManualPlaceholder(trimmed) &&
    !seen.has(trimmed);

  const isEdited = templateDefault !== null && trimmed !== templateDefault;
  const isFixedDefault =
    templateDefault !== null &&
    !containsPlatformVariable(templateDefault) &&
    !containsManualPlaceholder(templateDefault);

  const handleSaveForTeam = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await onSaveForTeam(trimmed);
      if (result.ok) {
        setIsSaved(true);
      } else {
        setSaveError(result.error);
      }
    } catch {
      setSaveError("Could not save the value. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div ref={fieldRef} className="relative">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={`utm-field-${param}`}
          className="text-sm font-bold text-gray-200"
        >
          {name}
          {required ? <span className="text-primaryAccent"> *</span> : null}
        </label>
        {canSaveForTeam && (
          <span className="group relative inline-flex">
            <button
              type="button"
              onClick={handleSaveForTeam}
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
              Saves this value to your dropdown list, so it can be picked
              next time instead of retyping it.
            </span>
          </span>
        )}
      </div>

      <input
        id={`utm-field-${param}`}
        type="text"
        value={value}
        onChange={(event) => {
          setSaveError(null);
          setIsSaved(false);
          onChange(event.target.value);
        }}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`utm-options-${param}`}
        className="mt-1 w-full rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none"
      />

      {isOpen && groups.length > 0 && (
        <ul
          id={`utm-options-${param}`}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-secondaryBg/60 bg-secondaryAccent p-1 shadow-2xl"
        >
          {groups.map((group) => (
            <li key={group.heading}>
              <p className="px-3 py-1 text-xs uppercase tracking-wide text-gray-400">
                {group.heading}
              </p>
              <ul>
                {group.options.map((option) => (
                  <li
                    key={option}
                    className={group.deletable ? "flex items-center gap-1" : undefined}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === value}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setSaveError(null);
                        setIsSaved(false);
                        onChange(option);
                        setIsOpen(false);
                      }}
                      className={`block w-full rounded px-3 py-1.5 text-left text-sm text-gray-200 transition hover:bg-primaryAccent/30${
                        group.deletable ? " min-w-0 flex-1 truncate" : ""
                      }`}
                    >
                      {option}
                    </button>
                    {group.deletable && (
                      <button
                        type="button"
                        aria-label={`Delete saved value ${option}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={async (event) => {
                          event.stopPropagation();
                          setIsSaved(false);
                          setSaveError(null);
                          try {
                            const result = await onDeleteForTeam(option);
                            if (!result.ok) {
                              setSaveError(result.error);
                            }
                          } catch {
                            setSaveError(
                              "Could not delete the value. Please try again."
                            );
                          }
                        }}
                        className="shrink-0 rounded p-1.5 text-gray-400 transition hover:bg-red-500/20 hover:text-red-300"
                      >
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
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {infoNote && (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs text-gray-400">
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
            className="mt-px shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          {infoNote}
        </p>
      )}

      {isEdited && (
        <p className="mt-1 text-xs text-amber-300">
          {isFixedDefault
            ? `This channel's template uses ${templateDefault} here. `
            : ""}
          <button
            type="button"
            onClick={() => {
              setSaveError(null);
              setIsSaved(false);
              onChange(templateDefault ?? "");
            }}
            className="font-bold underline transition hover:text-amber-200"
          >
            Reset to template
          </button>
        </p>
      )}

      {isSaved && (
        <p role="status" className="mt-1 text-xs text-green-300">
          Saved. This value is now in your dropdown list.
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

export default ParamField;
