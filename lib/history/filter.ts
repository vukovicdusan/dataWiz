// Pure filtering, search, sort, and year/month grouping for the History
// card. Everything here runs in the browser over the full loaded history.

import { channelLabel, type HistoryEntry } from "@/lib/history/types";

export type FilterKey =
  | "channel"
  | "source"
  | "medium"
  | "campaign"
  | "term"
  | "content";

export const FILTER_KEYS: readonly FilterKey[] = [
  "channel",
  "source",
  "medium",
  "campaign",
  "term",
  "content",
];

export const FILTER_LABELS: Record<FilterKey, string> = {
  channel: "Channel",
  source: "Source",
  medium: "Medium",
  campaign: "Campaign",
  term: "Term",
  content: "Content",
};

/** "" means "All" for that dropdown. The channel filter holds a channel id. */
export type HistoryFilters = Record<FilterKey, string>;

export const EMPTY_FILTERS: HistoryFilters = {
  channel: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};

function fieldValue(entry: HistoryEntry, key: FilterKey): string | null {
  switch (key) {
    case "channel":
      return entry.channel;
    case "source":
      return entry.source;
    case "medium":
      return entry.medium;
    case "campaign":
      return entry.campaign;
    case "term":
      return entry.term;
    case "content":
      return entry.content;
  }
}

/**
 * Distinct values present in history for one dropdown, sorted A-Z.
 * Null values (channel on old rows, empty term/content) are not options;
 * those rows only match that dropdown's "All" choice.
 */
export function filterOptions(
  entries: readonly HistoryEntry[],
  key: FilterKey
): string[] {
  const values = new Set<string>();
  entries.forEach((entry) => {
    const value = fieldValue(entry, key);
    if (value) values.add(value);
  });
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

/** All active filters must match (AND). */
export function matchesFilters(
  entry: HistoryEntry,
  filters: HistoryFilters
): boolean {
  return FILTER_KEYS.every(
    (key) => !filters[key] || fieldValue(entry, key) === filters[key]
  );
}

/**
 * Case-insensitive substring search across base URL, full URL, every UTM
 * value, the channel label, and the creator name and email.
 */
export function matchesSearch(
  entry: HistoryEntry,
  query: string,
  teamLabels?: Record<string, string>
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    entry.baseUrl,
    entry.fullUrl,
    entry.source,
    entry.medium,
    entry.campaign,
    entry.term ?? "",
    entry.content ?? "",
    entry.channel ? channelLabel(entry.channel, teamLabels) : "",
    entry.creatorName ?? "",
    entry.creatorEmail ?? "",
  ]
    .join("\n")
    .toLowerCase();
  return haystack.includes(needle);
}

export function hasActiveCriteria(
  filters: HistoryFilters,
  query: string
): boolean {
  return query.trim() !== "" || FILTER_KEYS.some((key) => filters[key] !== "");
}

export function applyCriteria(
  entries: readonly HistoryEntry[],
  filters: HistoryFilters,
  query: string,
  teamLabels?: Record<string, string>
): HistoryEntry[] {
  return entries.filter(
    (entry) =>
      matchesFilters(entry, filters) && matchesSearch(entry, query, teamLabels)
  );
}

// --- Year/month grouping ----------------------------------------------------

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type MonthGroup = {
  /** e.g. "2026-06" */
  key: string;
  monthName: string;
  entries: HistoryEntry[];
};

export type YearGroup = {
  /** e.g. "2026" */
  key: string;
  count: number;
  months: MonthGroup[];
};

/** "2026-06" for the entry's creation date in the viewer's timezone. */
export function monthKeyOf(entry: HistoryEntry): string {
  const date = new Date(entry.createdAt);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

/** Key of the month containing the newest entry, or null when empty. */
export function mostRecentMonthKey(
  entries: readonly HistoryEntry[]
): string | null {
  if (entries.length === 0) return null;
  const newest = entries.reduce((a, b) =>
    new Date(a.createdAt).getTime() >= new Date(b.createdAt).getTime() ? a : b
  );
  return monthKeyOf(newest);
}

/**
 * Groups entries year then month. Group order and row order inside each
 * month both follow `newestFirst`.
 */
export function groupByYearMonth(
  entries: readonly HistoryEntry[],
  newestFirst: boolean
): YearGroup[] {
  const sorted = [...entries].sort((a, b) => {
    const delta =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return newestFirst ? -delta : delta;
  });

  const years: YearGroup[] = [];
  sorted.forEach((entry) => {
    const date = new Date(entry.createdAt);
    const yearKey = String(date.getFullYear());
    let year = years[years.length - 1];
    if (!year || year.key !== yearKey) {
      year = { key: yearKey, count: 0, months: [] };
      years.push(year);
    }
    const key = monthKeyOf(entry);
    let month = year.months[year.months.length - 1];
    if (!month || month.key !== key) {
      month = { key, monthName: MONTH_NAMES[date.getMonth()], entries: [] };
      year.months.push(month);
    }
    month.entries.push(entry);
    year.count += 1;
  });
  return years;
}
