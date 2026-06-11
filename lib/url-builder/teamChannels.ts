import type { createClient } from "@/lib/supabase/server";
import { CHANNELS, UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";

type ServerClient = ReturnType<typeof createClient>;

/**
 * One channel as the UI consumes it. Built from a team_channels row for
 * customized teams, or straight from the built-in CHANNELS list for
 * uncustomized teams. The Channels page receives the full list (hidden
 * included); dashboard consumers filter to `visible`.
 */
export type ResolvedChannel = {
  key: string;
  label: string;
  noticeOnly: boolean;
  visible: boolean;
  isBuiltin: boolean;
  defaults: Partial<Record<UtmParam, string>>;
};

/** Raw team_channels row shape shared with the server actions. */
export type TeamChannelRow = {
  channel_key: string;
  label: string;
  notice_only: boolean;
  is_builtin: boolean;
  position: number;
  visible: boolean;
  deleted: boolean;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
};

export const TEAM_CHANNEL_COLUMNS =
  "channel_key, label, notice_only, is_builtin, position, visible, deleted, source, medium, campaign, term, content";

function rowDefaults(row: TeamChannelRow): Partial<Record<UtmParam, string>> {
  const defaults: Partial<Record<UtmParam, string>> = {};
  UTM_PARAMS.forEach((param) => {
    const value = row[param];
    if (value) defaults[param] = value;
  });
  return defaults;
}

function builtinAsResolved(
  template: (typeof CHANNELS)[number]
): ResolvedChannel {
  return {
    key: template.id,
    label: template.label,
    noticeOnly: template.noticeOnly,
    visible: true,
    isBuiltin: true,
    defaults: { ...template.defaults },
  };
}

/**
 * The team's channel list in dropdown order.
 *
 * - Zero rows: the team never customized; return the built-in CHANNELS
 *   exactly (customized: false). Nothing changes for these teams.
 * - Otherwise (merge rule): non-deleted rows ordered by position, then
 *   any built-in ids absent from the table (deleted OR live) appended
 *   at the end in built-in order, visible. This is what makes future
 *   built-ins auto-appear while deleted built-ins stay gone.
 */
export async function getTeamChannels(
  supabase: ServerClient,
  teamId: string
): Promise<{ customized: boolean; channels: ResolvedChannel[] }> {
  const { data, error } = await supabase
    .from("team_channels")
    .select(TEAM_CHANNEL_COLUMNS)
    .eq("team_id", teamId)
    .order("position", { ascending: true })
    .order("channel_key", { ascending: true });
  if (error) {
    throw new Error(`Could not load team channels: ${error.message}`);
  }
  const rows = (data ?? []) as TeamChannelRow[];

  if (rows.length === 0) {
    return { customized: false, channels: CHANNELS.map(builtinAsResolved) };
  }

  const knownKeys = new Set(rows.map((row) => row.channel_key));
  const channels: ResolvedChannel[] = rows
    .filter((row) => !row.deleted)
    .map((row) => ({
      key: row.channel_key,
      label: row.label,
      noticeOnly: row.notice_only,
      visible: row.visible,
      isBuiltin: row.is_builtin,
      defaults: rowDefaults(row),
    }));
  CHANNELS.forEach((template) => {
    if (!knownKeys.has(template.id)) {
      channels.push(builtinAsResolved(template));
    }
  });
  return { customized: true, channels };
}

/**
 * channel_key -> label for EVERY team row, tombstoned and hidden rows
 * included on purpose: History must keep showing a name for channels
 * that were renamed or deleted.
 */
export async function getTeamChannelLabels(
  supabase: ServerClient,
  teamId: string
): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("team_channels")
    .select("channel_key, label")
    .eq("team_id", teamId);
  if (error) {
    throw new Error(`Could not load team channel labels: ${error.message}`);
  }
  const labels: Record<string, string> = {};
  (data ?? []).forEach((row) => {
    labels[row.channel_key as string] = row.label as string;
  });
  return labels;
}
