"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CHANNELS, UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";
import {
  TEAM_CHANNEL_COLUMNS,
  type TeamChannelRow,
} from "@/lib/url-builder/teamChannels";

export type ChannelActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Your change was not saved.";
const SESSION_ERROR = "Your session has expired. Please sign in again.";
const STALE_ERROR =
  "The channel list changed. Please reload the page and try again.";
const LAST_VISIBLE_ERROR =
  "Keep at least one channel visible. The builder needs one to work.";

const NAME_MAX = 60;
const VALUE_MAX = 200;

// Session-scoped auth + team lookup, same shape as builder-actions.ts.
// Duplicated on purpose: "use server" files may only export async server
// actions, so the helper cannot be shared by exporting it from there.
async function requireSessionTeam(): Promise<{
  supabase: ReturnType<typeof createClient>;
  userId: string;
  teamId: string;
} | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership, error } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    throw new Error(`Could not check your team membership: ${error.message}`);
  }
  if (!membership) return null;

  return { supabase, userId: user.id, teamId: membership.team_id as string };
}

type Ctx = NonNullable<Awaited<ReturnType<typeof requireSessionTeam>>>;

async function loadRows(ctx: Ctx): Promise<TeamChannelRow[]> {
  const { data, error } = await ctx.supabase
    .from("team_channels")
    .select(TEAM_CHANNEL_COLUMNS)
    .eq("team_id", ctx.teamId)
    .order("position", { ascending: true })
    .order("channel_key", { ascending: true });
  if (error) {
    throw new Error(`Could not load team channels: ${error.message}`);
  }
  return (data ?? []) as TeamChannelRow[];
}

/**
 * First mutating action on the Channels page seeds all built-ins into
 * team_channels (positions 0-14). Seed first, then apply the action; if
 * seeding fails the action fails. Returns current rows incl. tombstones.
 */
async function ensureSeeded(ctx: Ctx): Promise<TeamChannelRow[]> {
  const existing = await loadRows(ctx);
  if (existing.length > 0) return existing;

  const seedRows = CHANNELS.map((template, index) => ({
    team_id: ctx.teamId,
    channel_key: template.id,
    label: template.label,
    notice_only: template.noticeOnly,
    is_builtin: true,
    position: index,
    visible: true,
    deleted: false,
    source: template.defaults.source ?? null,
    medium: template.defaults.medium ?? null,
    campaign: template.defaults.campaign ?? null,
    term: template.defaults.term ?? null,
    content: template.defaults.content ?? null,
  }));
  const { error } = await ctx.supabase.from("team_channels").insert(seedRows);
  // 23505: another team member seeded concurrently. Reload and continue.
  if (error && error.code !== "23505") {
    throw new Error(`Could not seed team channels: ${error.message}`);
  }
  return loadRows(ctx);
}

function cleanKeys(keys: string[]): string[] {
  return Array.from(
    new Set(
      (Array.isArray(keys) ? keys : [])
        .map((key) => String(key).trim())
        .filter(Boolean)
    )
  );
}

// The Channels page, the dashboard dropdown, and History labels all
// derive from team_channels, so refresh all three after every mutation.
function refreshChannelPages() {
  revalidatePath("/url-builder/channels");
  revalidatePath("/url-builder/dashboard");
  revalidatePath("/url-builder/history");
}

export async function reorderChannels(
  orderedKeys: string[]
): Promise<ChannelActionResult> {
  try {
    const keys = (Array.isArray(orderedKeys) ? orderedKeys : [])
      .map((key) => String(key).trim())
      .filter(Boolean);
    if (keys.length === 0 || new Set(keys).size !== keys.length) {
      return { ok: false, error: GENERIC_ERROR };
    }

    const ctx = await requireSessionTeam();
    if (!ctx) return { ok: false, error: SESSION_ERROR };

    const rows = await ensureSeeded(ctx);
    const active = rows.filter((row) => !row.deleted);
    const activeKeys = new Set(active.map((row) => row.channel_key));
    if (
      keys.length !== active.length ||
      keys.some((key) => !activeKeys.has(key))
    ) {
      return { ok: false, error: STALE_ERROR };
    }

    for (let index = 0; index < keys.length; index += 1) {
      const { error } = await ctx.supabase
        .from("team_channels")
        .update({ position: index })
        .eq("team_id", ctx.teamId)
        .eq("channel_key", keys[index]);
      if (error) {
        throw new Error(`Could not save the channel order: ${error.message}`);
      }
    }

    refreshChannelPages();
    return { ok: true };
  } catch (err) {
    console.error("reorderChannels failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function setChannelsVisibility(
  keys: string[],
  visible: boolean
): Promise<ChannelActionResult> {
  try {
    const cleaned = cleanKeys(keys);
    if (cleaned.length === 0) return { ok: false, error: GENERIC_ERROR };

    const ctx = await requireSessionTeam();
    if (!ctx) return { ok: false, error: SESSION_ERROR };

    const rows = await ensureSeeded(ctx);
    const active = rows.filter((row) => !row.deleted);
    const keySet = new Set(cleaned);
    if (cleaned.some((key) => !active.some((row) => row.channel_key === key))) {
      return { ok: false, error: STALE_ERROR };
    }
    if (!visible) {
      const remainVisible = active.filter(
        (row) => row.visible && !keySet.has(row.channel_key)
      ).length;
      if (remainVisible === 0) {
        return { ok: false, error: LAST_VISIBLE_ERROR };
      }
    }

    const { error } = await ctx.supabase
      .from("team_channels")
      .update({ visible })
      .eq("team_id", ctx.teamId)
      .eq("deleted", false)
      .in("channel_key", cleaned);
    if (error) {
      throw new Error(`Could not update channel visibility: ${error.message}`);
    }

    refreshChannelPages();
    return { ok: true };
  } catch (err) {
    console.error("setChannelsVisibility failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Tombstones channels (built-in AND custom): deleted=true keeps the row
 * and its label so History stays readable and deleted built-ins do not
 * reappear via the merge rule. "Restore default channels" is the only
 * thing that hard-deletes rows.
 */
export async function deleteChannels(
  keys: string[]
): Promise<ChannelActionResult> {
  try {
    const cleaned = cleanKeys(keys);
    if (cleaned.length === 0) return { ok: false, error: GENERIC_ERROR };

    const ctx = await requireSessionTeam();
    if (!ctx) return { ok: false, error: SESSION_ERROR };

    const rows = await ensureSeeded(ctx);
    const active = rows.filter((row) => !row.deleted);
    const keySet = new Set(cleaned);
    if (cleaned.some((key) => !active.some((row) => row.channel_key === key))) {
      return { ok: false, error: STALE_ERROR };
    }
    const remainVisible = active.filter(
      (row) => row.visible && !keySet.has(row.channel_key)
    ).length;
    if (remainVisible === 0) {
      return { ok: false, error: LAST_VISIBLE_ERROR };
    }

    const { error } = await ctx.supabase
      .from("team_channels")
      .update({ deleted: true, visible: false })
      .eq("team_id", ctx.teamId)
      .in("channel_key", cleaned);
    if (error) {
      throw new Error(`Could not delete channels: ${error.message}`);
    }

    refreshChannelPages();
    return { ok: true };
  } catch (err) {
    console.error("deleteChannels failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}

export type ChannelUpsertPayload = {
  /** channel_key to edit, or null to create a custom channel. */
  key: string | null;
  name: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

export async function upsertChannel(
  payload: ChannelUpsertPayload
): Promise<ChannelActionResult> {
  try {
    const name = String(payload.name ?? "").trim();
    if (!name) return { ok: false, error: "Enter a channel name." };
    if (name.length > NAME_MAX) {
      return {
        ok: false,
        error: `Channel names can be at most ${NAME_MAX} characters.`,
      };
    }
    const values: Record<UtmParam, string> = {
      source: String(payload.source ?? "").trim(),
      medium: String(payload.medium ?? "").trim(),
      campaign: String(payload.campaign ?? "").trim(),
      term: String(payload.term ?? "").trim(),
      content: String(payload.content ?? "").trim(),
    };
    // {{...}} and [...] placeholders are allowed verbatim, same as the
    // built-in templates; only length is limited.
    if (UTM_PARAMS.some((param) => values[param].length > VALUE_MAX)) {
      return {
        ok: false,
        error: `Template values can be at most ${VALUE_MAX} characters.`,
      };
    }

    const ctx = await requireSessionTeam();
    if (!ctx) return { ok: false, error: SESSION_ERROR };

    const rows = await ensureSeeded(ctx);
    const active = rows.filter((row) => !row.deleted);

    const key = payload.key === null ? null : String(payload.key).trim();
    // Case-insensitive label uniqueness among non-deleted rows only.
    // Tombstones keep their labels and must not block reuse.
    const duplicate = active.some(
      (row) =>
        row.channel_key !== key &&
        row.label.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
      return { ok: false, error: "A channel with this name already exists." };
    }

    if (key) {
      const row = active.find((candidate) => candidate.channel_key === key);
      if (!row) return { ok: false, error: STALE_ERROR };
      // Google Ads (notice_only) generates no UTM values, so only the
      // name is editable for it.
      const update = row.notice_only
        ? { label: name }
        : {
            label: name,
            source: values.source || null,
            medium: values.medium || null,
            campaign: values.campaign || null,
            term: values.term || null,
            content: values.content || null,
          };
      const { error } = await ctx.supabase
        .from("team_channels")
        .update(update)
        .eq("team_id", ctx.teamId)
        .eq("channel_key", key);
      if (error) {
        throw new Error(`Could not save the channel: ${error.message}`);
      }
    } else {
      const nextPosition =
        rows.reduce((max, row) => Math.max(max, row.position), -1) + 1;
      const { error } = await ctx.supabase.from("team_channels").insert({
        team_id: ctx.teamId,
        channel_key: `custom-${randomUUID().slice(0, 8)}`,
        label: name,
        notice_only: false,
        is_builtin: false,
        position: nextPosition,
        visible: true,
        deleted: false,
        source: values.source || null,
        medium: values.medium || null,
        campaign: values.campaign || null,
        term: values.term || null,
        content: values.content || null,
      });
      // 23505 = the generated key collided (vanishingly rare). Retry-able.
      if (error && error.code === "23505") {
        return {
          ok: false,
          error: "Could not create the channel. Please try again.",
        };
      }
      if (error) {
        throw new Error(`Could not create the channel: ${error.message}`);
      }
    }

    refreshChannelPages();
    return { ok: true };
  } catch (err) {
    console.error("upsertChannel failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Back to the factory list: hard-delete ALL of the team's rows, which
 * returns the team to the uncustomized state (built-in CHANNELS).
 * Custom channels are gone permanently; History keeps showing their raw
 * key as a last resort via channelLabel's fallback chain.
 */
export async function restoreDefaultChannels(): Promise<ChannelActionResult> {
  try {
    const ctx = await requireSessionTeam();
    if (!ctx) return { ok: false, error: SESSION_ERROR };

    const { error } = await ctx.supabase
      .from("team_channels")
      .delete()
      .eq("team_id", ctx.teamId);
    if (error) {
      throw new Error(`Could not restore defaults: ${error.message}`);
    }

    refreshChannelPages();
    return { ok: true };
  } catch (err) {
    console.error("restoreDefaultChannels failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
