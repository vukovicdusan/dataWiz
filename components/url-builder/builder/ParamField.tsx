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
};

type DropdownGroup = { heading: string; options: string[] };

const ParamField = ({
  param,
  required,
  value,
  onChange,
  templateDefault,
  exampleValues,
  teamValues,
  onSaveForTeam,
}: ParamFieldProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  // Dropdown sections, deduped in priority order: template, examples, team.
  const seen = new Set<string>();
  const groups: DropdownGroup[] = [];
  const addGroup = (heading: string, candidates: readonly string[]) => {
    const options = candidates.filter((option) => {
      if (!option || seen.has(option)) return false;
      seen.add(option);
      return true;
    });
    if (options.length > 0) groups.push({ heading, options });
  };
  addGroup("Channel template", templateDefault ? [templateDefault] : []);
  addGroup("Examples", exampleValues);
  addGroup("Team values", teamValues);

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
      if (!result.ok) setSaveError(result.error);
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
          <button
            type="button"
            onClick={handleSaveForTeam}
            disabled={isSaving}
            className="text-xs font-bold text-primaryAccent transition hover:text-primaryAccent/80 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "+ Save for team"}
          </button>
        )}
      </div>

      <input
        id={`utm-field-${param}`}
        type="text"
        value={value}
        onChange={(event) => {
          setSaveError(null);
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
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={option === value}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                      className="block w-full rounded px-3 py-1.5 text-left text-sm text-gray-200 transition hover:bg-primaryAccent/30"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {isEdited && (
        <p className="mt-1 text-xs text-amber-300">
          {isFixedDefault
            ? `This channel's template uses ${templateDefault} here. `
            : ""}
          <button
            type="button"
            onClick={() => onChange(templateDefault ?? "")}
            className="font-bold underline transition hover:text-amber-200"
          >
            Reset to template
          </button>
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
