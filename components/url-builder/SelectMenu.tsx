"use client";

import { useEffect, useRef, useState } from "react";

export type SelectMenuOption = {
  value: string;
  label: string;
};

type SelectMenuProps = {
  /** Trigger button id, so an external <label htmlFor> can target it. */
  id: string;
  /** Options in display order. Values must be unique. */
  options: SelectMenuOption[];
  /** Value of the selected option. A value with no match shows the placeholder. */
  value: string;
  onChange: (value: string) => void;
  /** Muted trigger text shown when no option matches the current value. */
  placeholder: string;
  /** Accessible name for the option list. */
  ariaLabel: string;
  /** Accessible name for the trigger. Omit when an external label points at id. */
  triggerAriaLabel?: string;
  /** Extra classes appended to the trigger button, e.g. "mt-1". */
  triggerClassName?: string;
};

// Shared single-select listbox: the dark dropdown look used by the
// builder's Channel picker and the History filters. Extracted from
// ChannelPicker in Phase 8 so the two can never drift apart.
const SelectMenu = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  triggerAriaLabel,
  triggerClassName,
}: SelectMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selected =
    options.find((candidate) => candidate.value === value) ?? null;

  return (
    <div ref={menuRef} className="relative">
      <button
        id={id}
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        aria-label={triggerAriaLabel}
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-left text-sm text-gray-200 focus:border-primaryAccent focus:outline-none ${
          triggerClassName ?? ""
        }`}
      >
        <span className={`truncate ${selected ? "" : "text-gray-400"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-gray-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={`${id}-options`}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-secondaryBg/60 bg-secondaryAccent p-1 shadow-2xl"
        >
          {options.map((candidate) => {
            const isSelected = candidate.value === value;
            return (
              <li key={candidate.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(candidate.value);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="flex w-full items-center justify-between rounded px-3 py-1.5 text-left text-sm text-gray-200 transition hover:bg-primaryAccent/30"
                >
                  <span className="truncate">{candidate.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-primaryAccent"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectMenu;
