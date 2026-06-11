// Pure CSV export helpers: date-range predicate, RFC 4180 escaping, the
// CSV document builder, and the download filename. Runs in the browser.

import {
  channelLabel,
  creatorLabel,
  formatEntryDate,
  type HistoryEntry,
} from "@/lib/history/types";

export type ExportRange =
  | { kind: "all" }
  | { kind: "yearToDate" }
  | { kind: "year"; year: number }
  | { kind: "month"; year: number; month: number } // month: 1-12
  | { kind: "custom"; from: string; to: string }; // "YYYY-MM-DD" or ""

/**
 * True when the entry's creation date (viewer's timezone) falls inside the
 * range. Custom bounds are inclusive whole days; an empty bound is open.
 */
export function inRange(
  entry: HistoryEntry,
  range: ExportRange,
  now: Date = new Date()
): boolean {
  const created = new Date(entry.createdAt);
  switch (range.kind) {
    case "all":
      return true;
    case "yearToDate":
      // Any entry in the current year is by definition "to date"; comparing
      // against the viewer's clock could drop a just-created row when the
      // local clock runs behind the database server.
      return created.getFullYear() === now.getFullYear();
    case "year":
      return created.getFullYear() === range.year;
    case "month":
      return (
        created.getFullYear() === range.year &&
        created.getMonth() + 1 === range.month
      );
    case "custom": {
      if (range.from) {
        const from = new Date(`${range.from}T00:00:00`);
        if (created.getTime() < from.getTime()) return false;
      }
      if (range.to) {
        const to = new Date(`${range.to}T23:59:59.999`);
        if (created.getTime() > to.getTime()) return false;
      }
      return true;
    }
  }
}

/**
 * RFC 4180 quoting plus spreadsheet formula neutralization: values starting
 * with =, +, -, @, tab, or CR get an apostrophe prefix so team-authored data
 * (campaign names, creator names) can never execute as a formula when the
 * CSV is opened in Excel or Google Sheets.
 */
export function csvEscape(value: string): string {
  let v = value;
  if (/^[=+\-@\t\r]/.test(v)) {
    v = `'${v}`;
  }
  if (/[",\r\n]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export const CSV_HEADERS: readonly string[] = [
  "Date",
  "Created by",
  "Channel",
  "Base URL",
  "Source",
  "Medium",
  "Campaign",
  "Term",
  "Content",
  "Full URL",
];

/**
 * Builds the CSV text with CRLF line endings per RFC 4180. Null channel,
 * term, and content become empty cells (cleaner in spreadsheets than a
 * placeholder glyph).
 */
export function buildCsv(entries: readonly HistoryEntry[]): string {
  const lines = [CSV_HEADERS.map(csvEscape).join(",")];
  entries.forEach((entry) => {
    lines.push(
      [
        formatEntryDate(entry.createdAt),
        creatorLabel(entry),
        entry.channel ? channelLabel(entry.channel) : "",
        entry.baseUrl,
        entry.source,
        entry.medium,
        entry.campaign,
        entry.term ?? "",
        entry.content ?? "",
        entry.fullUrl,
      ]
        .map(csvEscape)
        .join(",")
    );
  });
  return lines.join("\r\n") + "\r\n";
}

/** datawiz-utm-history-YYYY-MM-DD.csv using the viewer's local date. */
export function exportFilename(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `datawiz-utm-history-${year}-${month}-${day}.csv`;
}
