// Shared shape of one History entry plus tiny formatters. Pure module ON
// PURPOSE (no React, no Supabase) so server fetch code, client components,
// and the CSV builder all share one definition.

import { CHANNELS } from "@/lib/utm/channels";

export type HistoryEntry = {
  id: string;
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string | null;
  content: string | null;
  fullUrl: string;
  /** Channel template id (e.g. "meta-ads"); null for pre-Phase-4 rows. */
  channel: string | null;
  creatorName: string | null;
  creatorEmail: string | null;
  /** ISO timestamp (generated_urls.created_at). */
  createdAt: string;
};

// Channels removed from the builder whose History rows must keep their
// human label. The database still holds the old id.
const LEGACY_CHANNEL_LABELS: Record<string, string> = {
  "weed-maps": "Weed Maps",
};

/**
 * Badge text for a channel id. Null (pre-Phase-4 rows) renders as the
 * design-approved placeholder glyph. Team channel labels win (so renamed
 * channels show the new name, and tombstoned team channels keep their
 * last label); then built-ins, then removed legacy channels, then the
 * raw id so data is never hidden.
 */
export function channelLabel(
  channel: string | null,
  teamLabels?: Record<string, string>
): string {
  if (!channel) return "—";
  return (
    teamLabels?.[channel] ??
    CHANNELS.find((candidate) => candidate.id === channel)?.label ??
    LEGACY_CHANNEL_LABELS[channel] ??
    channel
  );
}

/** "Name (email)" like the Team page member list; degrades gracefully. */
export function creatorLabel(entry: HistoryEntry): string {
  if (entry.creatorName && entry.creatorEmail) {
    return `${entry.creatorName} (${entry.creatorEmail})`;
  }
  return entry.creatorName ?? entry.creatorEmail ?? "Unknown";
}

/** "Jun 11, 2026" in the viewer's local timezone. */
export function formatEntryDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
