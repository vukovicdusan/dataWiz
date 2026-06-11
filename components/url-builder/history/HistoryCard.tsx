"use client";

import { useEffect, useMemo, useState } from "react";
import { channelLabel, type HistoryEntry } from "@/lib/history/types";
import {
  EMPTY_FILTERS,
  FILTER_KEYS,
  FILTER_LABELS,
  applyCriteria,
  filterOptions,
  groupByYearMonth,
  hasActiveCriteria,
  mostRecentMonthKey,
  type FilterKey,
  type HistoryFilters,
  type YearGroup,
} from "@/lib/history/filter";
import HistoryRow from "@/components/url-builder/history/HistoryRow";
import ExportDialog from "@/components/url-builder/history/ExportDialog";

type HistoryCardProps = {
  entries: HistoryEntry[];
  loadFailed: boolean;
};

const inputClass =
  "rounded-md border border-secondaryBg/60 bg-primaryBg/60 px-3 py-2 text-sm text-gray-200 focus:border-primaryAccent focus:outline-none";

const linkCount = (count: number) => (count === 1 ? "1 link" : `${count} links`);

const HistoryCard = ({ entries, loadFailed }: HistoryCardProps) => {
  const [filters, setFilters] = useState<HistoryFilters>(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const [newestFirst, setNewestFirst] = useState(true);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // The year/month groups and row dates use the viewer's local timezone,
  // which can differ from the server's during SSR. Render them only after
  // mount so the HTML never disagrees with the hydrated output.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const criteriaActive = hasActiveCriteria(filters, search);
  const visibleEntries = useMemo(
    () => applyCriteria(entries, filters, search),
    [entries, filters, search]
  );
  const groups = useMemo(
    () => groupByYearMonth(visibleEntries, newestFirst),
    [visibleEntries, newestFirst]
  );
  const defaultMonthKey = useMemo(() => mostRecentMonthKey(entries), [entries]);
  const optionsByKey = useMemo(() => {
    const options = {} as Record<FilterKey, string[]>;
    FILTER_KEYS.forEach((key) => {
      options[key] = filterOptions(entries, key);
    });
    // Channel options are displayed as labels, so order them by label too.
    options.channel = [...options.channel].sort((a, b) =>
      channelLabel(a).localeCompare(channelLabel(b))
    );
    return options;
  }, [entries]);

  const clearAll = () => {
    setFilters(EMPTY_FILTERS);
    setSearch("");
  };

  const matchCount = visibleEntries.length;

  return (
    <section className="w-full rounded-2xl border border-secondaryBg/60 bg-secondaryAccent/20 p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-200">
          History
        </h2>
        {!loadFailed && entries.length > 0 && (
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="rounded-md bg-primaryAccent px-4 py-2 text-sm font-bold text-white transition hover:bg-primaryAccent/80"
          >
            Export CSV
          </button>
        )}
      </div>

      {loadFailed ? (
        <p role="alert" className="mt-6 text-sm text-red-300">
          We could not load your team history. Please reload the page to try
          again.
        </p>
      ) : entries.length === 0 ? (
        <div className="mt-6 py-6 text-center">
          <p className="text-sm text-gray-400">No links yet.</p>
          <p className="mt-1.5 text-sm text-gray-500">
            Generate your first URL above and it will show up here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {FILTER_KEYS.map((key) => (
              <select
                key={key}
                aria-label={`Filter by ${FILTER_LABELS[key].toLowerCase()}`}
                value={filters[key]}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    [key]: event.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="">{FILTER_LABELS[key]}: All</option>
                {optionsByKey[key].map((option) => (
                  <option key={option} value={option}>
                    {key === "channel" ? channelLabel(option) : option}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search links, values, or people..."
              aria-label="Search history"
              className={`min-w-[220px] flex-1 ${inputClass}`}
            />
            <button
              type="button"
              onClick={() => setNewestFirst((previous) => !previous)}
              aria-label={newestFirst ? "Sorted newest first. Switch to oldest first." : "Sorted oldest first. Switch to newest first."}
              className="rounded-md border border-secondaryBg/60 px-3 py-2 text-sm text-gray-200 transition hover:bg-secondaryBg/30"
            >
              {newestFirst ? "Newest first" : "Oldest first"}
            </button>
            <span className="text-xs text-gray-400">
              {matchCount === 1 ? "1 link matches" : `${matchCount} links match`}
            </span>
            {criteriaActive && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-blue-300 underline transition hover:text-blue-200"
              >
                Clear all
              </button>
            )}
          </div>

          {matchCount === 0 ? (
            <div className="mt-6 py-6 text-center">
              <p className="text-sm text-gray-400">
                No links match your filters.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-1.5 text-sm text-blue-300 underline transition hover:text-blue-200"
              >
                Clear filters
              </button>
            </div>
          ) : !mounted ? (
            <p className="mt-6 text-sm text-gray-400">Loading history...</p>
          ) : (
            <GroupList
              key={FILTER_KEYS.map((key) => filters[key]).join(" ") + " " + search.trim().toLowerCase()}
              groups={groups}
              criteriaActive={criteriaActive}
              defaultMonthKey={defaultMonthKey}
            />
          )}
        </>
      )}

      {isExportOpen && (
        <ExportDialog
          entries={entries}
          filteredEntries={visibleEntries}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </section>
  );
};

type GroupListProps = {
  groups: YearGroup[];
  criteriaActive: boolean;
  defaultMonthKey: string | null;
};

const GroupList = ({
  groups,
  criteriaActive,
  defaultMonthKey,
}: GroupListProps) => {
  // Manual open/close choices, keyed by year ("2026") or month ("2026-06").
  // The parent remounts this component (via key) when criteria change, so
  // the expansion defaults reapply after every filter or search change.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  const defaultYearKey = defaultMonthKey ? defaultMonthKey.slice(0, 4) : null;
  const isOpen = (key: string, fallback: boolean) =>
    overrides[key] ?? fallback;
  const toggle = (key: string, fallback: boolean) =>
    setOverrides((previous) => ({
      ...previous,
      [key]: !(previous[key] ?? fallback),
    }));

  return (
    <div className="mt-5 space-y-2.5">
      {groups.map((year) => {
        const yearDefault = criteriaActive || year.key === defaultYearKey;
        const yearOpen = isOpen(year.key, yearDefault);
        return (
          <div
            key={year.key}
            className="overflow-hidden rounded-xl border border-secondaryBg/50"
          >
            <button
              type="button"
              onClick={() => toggle(year.key, yearDefault)}
              aria-expanded={yearOpen}
              className="flex w-full items-center justify-between bg-secondaryAccent/50 px-3.5 py-2.5 text-sm font-bold text-gray-200"
            >
              <span>
                {yearOpen ? "▾" : "▸"} {year.key}
              </span>
              <span className="text-xs font-normal text-gray-400">
                {linkCount(year.count)}
              </span>
            </button>
            {yearOpen && (
              <div className="px-3.5">
                {year.months.map((month) => {
                  const monthDefault =
                    criteriaActive || month.key === defaultMonthKey;
                  const monthOpen = isOpen(month.key, monthDefault);
                  return (
                    <div
                      key={month.key}
                      className="border-t border-secondaryBg/30 first:border-t-0"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(month.key, monthDefault)}
                        aria-expanded={monthOpen}
                        className="flex w-full items-center justify-between py-2.5 text-sm font-bold text-gray-300"
                      >
                        <span>
                          {monthOpen ? "▾" : "▸"} {month.monthName}
                        </span>
                        <span className="text-xs font-normal text-gray-400">
                          {linkCount(month.entries.length)}
                        </span>
                      </button>
                      {monthOpen && (
                        <ul className="border-t border-secondaryBg/30">
                          {month.entries.map((entry) => (
                            <HistoryRow key={entry.id} entry={entry} />
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryCard;
