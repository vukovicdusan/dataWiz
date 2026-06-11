"use client";

import { useEffect, useRef, useState } from "react";
import type { ResolvedChannel } from "@/lib/url-builder/teamChannels";

type ChannelPickerProps = {
  /** Visible team channels in dropdown order. */
  channels: ResolvedChannel[];
  /** Selected channel_key, or "" when none. */
  value: string;
  onChange: (key: string) => void;
};

const ChannelPicker = ({ channels, value, onChange }: ChannelPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
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
    channels.find((candidate) => candidate.key === value) ?? null;

  return (
    <div ref={pickerRef} className="relative">
      <button
        id="channel-picker"
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="channel-picker-options"
        className="mt-1 flex w-full items-center justify-between rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-left text-sm text-gray-200 focus:border-primaryAccent focus:outline-none"
      >
        <span className={selected ? "" : "text-gray-400"}>
          {selected ? selected.label : "Select a channel"}
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
          id="channel-picker-options"
          role="listbox"
          aria-label="Channel"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-secondaryBg/60 bg-secondaryAccent p-1 shadow-2xl"
        >
          {channels.map((candidate) => {
            const isSelected = candidate.key === value;
            return (
              <li key={candidate.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(candidate.key);
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

export default ChannelPicker;
