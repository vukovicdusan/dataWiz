"use client";

import { useMemo, useState } from "react";
import type { HistoryEntry } from "@/lib/history/types";
import {
  buildCsv,
  exportFilename,
  inRange,
  type ExportRange,
} from "@/lib/history/csv";

type ExportDialogProps = {
  /** Full team history (unfiltered). */
  entries: HistoryEntry[];
  /** History after the card's current filters and search. */
  filteredEntries: HistoryEntry[];
  onClose: () => void;
};

const MONTH_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const fieldClass =
  "rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-2 py-1 text-xs text-gray-200 focus:border-primaryAccent focus:outline-none";

const ExportDialog = ({
  entries,
  filteredEntries,
  onClose,
}: ExportDialogProps) => {
  const years = useMemo(() => {
    const present = new Set<number>();
    entries.forEach((entry) =>
      present.add(new Date(entry.createdAt).getFullYear())
    );
    const list = Array.from(present).sort((a, b) => b - a);
    return list.length > 0 ? list : [new Date().getFullYear()];
  }, [entries]);

  const [kind, setKind] = useState<ExportRange["kind"]>("all");
  const [year, setYear] = useState(years[0]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthYear, setMonthYear] = useState(years[0]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [applyFilters, setApplyFilters] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Picking any option clears a stale "nothing exported" message.
  const pickKind = (next: ExportRange["kind"]) => {
    setKind(next);
    setMessage(null);
  };

  const handleExport = () => {
    const range: ExportRange =
      kind === "all"
        ? { kind: "all" }
        : kind === "yearToDate"
          ? { kind: "yearToDate" }
          : kind === "year"
            ? { kind: "year", year }
            : kind === "month"
              ? { kind: "month", year: monthYear, month }
              : { kind: "custom", from, to };

    const source = applyFilters ? filteredEntries : entries;
    const rows = source.filter((entry) => inRange(entry, range));
    if (rows.length === 0) {
      setMessage(
        "No links in that range. Pick a different range and try again."
      );
      return;
    }

    // "﻿" byte order mark so Excel detects UTF-8.
    const blob = new Blob(["﻿", buildCsv(rows)], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFilename();
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg/80 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Export history to CSV"
        className="w-full max-w-md rounded-2xl border border-secondaryBg/60 bg-secondaryAccent p-8 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">Export history to CSV</h2>

        <div className="mt-4 space-y-2.5 text-sm text-gray-200">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="export-range"
              checked={kind === "all"}
              onChange={() => pickKind("all")}
            />
            All time
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="export-range"
              checked={kind === "yearToDate"}
              onChange={() => pickKind("yearToDate")}
            />
            This year to date
          </label>
          <label className="flex flex-wrap items-center gap-2">
            <input
              type="radio"
              name="export-range"
              checked={kind === "year"}
              onChange={() => pickKind("year")}
            />
            A specific year
            <select
              aria-label="Year"
              value={year}
              onChange={(event) => {
                setYear(Number(event.target.value));
                pickKind("year");
              }}
              className={fieldClass}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-wrap items-center gap-2">
            <input
              type="radio"
              name="export-range"
              checked={kind === "month"}
              onChange={() => pickKind("month")}
            />
            A specific month
            <select
              aria-label="Month"
              value={month}
              onChange={(event) => {
                setMonth(Number(event.target.value));
                pickKind("month");
              }}
              className={fieldClass}
            >
              {MONTH_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Year of the month"
              value={monthYear}
              onChange={(event) => {
                setMonthYear(Number(event.target.value));
                pickKind("month");
              }}
              className={fieldClass}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-wrap items-center gap-2">
            <input
              type="radio"
              name="export-range"
              checked={kind === "custom"}
              onChange={() => pickKind("custom")}
            />
            Custom range
            <input
              type="date"
              aria-label="From date"
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                pickKind("custom");
              }}
              className={fieldClass}
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              aria-label="To date"
              value={to}
              onChange={(event) => {
                setTo(event.target.value);
                pickKind("custom");
              }}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="mt-5 flex items-center gap-2 border-t border-secondaryBg/40 pt-4 text-sm text-gray-200">
          <input
            type="checkbox"
            checked={applyFilters}
            onChange={(event) => setApplyFilters(event.target.checked)}
          />
          Apply my current filters and search
        </label>

        {message && (
          <p role="alert" className="mt-4 text-sm text-amber-300">
            {message}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-secondaryBg/60 px-4 py-2 text-sm font-bold text-gray-200 transition hover:bg-secondaryBg/30"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-md bg-primaryAccent px-4 py-2 text-sm font-bold text-white transition hover:bg-primaryAccent/80"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;
