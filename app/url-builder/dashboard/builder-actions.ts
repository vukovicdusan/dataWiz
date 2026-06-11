"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CHANNELS, UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";
import { buildUrl, normalizeBaseUrl } from "@/lib/utm/build";

export type BuilderActionResult = { ok: true } | { ok: false; error: string };

// Session-scoped auth + team lookup. All queries here run through RLS,
// so a member can only ever read or write their own team's rows.
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

export async function saveCustomValue(
  param: UtmParam,
  value: string
): Promise<BuilderActionResult> {
  try {
    if (!(UTM_PARAMS as readonly string[]).includes(param)) {
      return { ok: false, error: "Unknown parameter." };
    }
    const trimmed = value.trim();
    if (!trimmed) {
      return { ok: false, error: "Type a value first." };
    }

    const ctx = await requireSessionTeam();
    if (!ctx) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const { error } = await ctx.supabase.from("custom_values").insert({
      team_id: ctx.teamId,
      param,
      value: trimmed,
      created_by: ctx.userId,
    });
    // 23505 = unique violation: the team already has this value. Harmless.
    if (error && error.code !== "23505") {
      throw new Error(`Could not save the team value: ${error.message}`);
    }
    return { ok: true };
  } catch (err) {
    console.error("saveCustomValue failed:", err);
    return {
      ok: false,
      error: "Could not save the value. Please try again.",
    };
  }
}

export async function saveBaseUrl(
  value: string
): Promise<BuilderActionResult & { value?: string }> {
  try {
    const trimmed = value.trim();
    if (!trimmed) {
      return { ok: false, error: "Type a URL first." };
    }

    const normalized = normalizeBaseUrl(trimmed).url;

    const ctx = await requireSessionTeam();
    if (!ctx) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const { error } = await ctx.supabase.from("base_urls").insert({
      team_id: ctx.teamId,
      value: normalized,
      created_by: ctx.userId,
    });
    // 23505 = unique violation: the team already has this URL. Harmless.
    if (error && error.code !== "23505") {
      throw new Error(`Could not save the base URL: ${error.message}`);
    }
    return { ok: true, value: normalized };
  } catch (err) {
    console.error("saveBaseUrl failed:", err);
    return {
      ok: false,
      error: "Could not save the URL. Please try again.",
    };
  }
}

export type SaveUrlInput = {
  baseUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  /** Channel template id from lib/utm/channels.ts, or "" when none. */
  channel: string;
};

export async function saveGeneratedUrl(
  input: SaveUrlInput
): Promise<BuilderActionResult> {
  try {
    const baseUrl = input.baseUrl.trim();
    const source = input.source.trim();
    const medium = input.medium.trim();
    const campaign = input.campaign.trim();
    const term = input.term.trim();
    const content = input.content.trim();
    // Store only known channel ids; anything else becomes null so bad
    // client input can never invent a channel.
    const channelKey = input.channel.trim();
    const channel = CHANNELS.some((candidate) => candidate.id === channelKey)
      ? channelKey
      : null;
    if (!baseUrl || !source || !medium || !campaign) {
      return {
        ok: false,
        error: "Base URL, source, medium and campaign are all required.",
      };
    }

    // Recomputed with the same pure function the preview uses, so the
    // saved URL always matches what was copied.
    const fullUrl = buildUrl(baseUrl, {
      source,
      medium,
      campaign,
      term,
      content,
    });

    const ctx = await requireSessionTeam();
    if (!ctx) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    // Dedupe: identical full_url for this team means nothing to do.
    const { data: existing, error: lookupError } = await ctx.supabase
      .from("generated_urls")
      .select("id")
      .eq("team_id", ctx.teamId)
      .eq("full_url", fullUrl)
      .limit(1)
      .maybeSingle();
    if (lookupError) {
      throw new Error(`Could not check team history: ${lookupError.message}`);
    }
    if (existing) return { ok: true };

    const { error } = await ctx.supabase.from("generated_urls").insert({
      team_id: ctx.teamId,
      created_by: ctx.userId,
      base_url: normalizeBaseUrl(baseUrl).url,
      source,
      medium,
      campaign,
      term: term || null,
      content: content || null,
      full_url: fullUrl,
      channel,
    });
    if (error) {
      throw new Error(`Could not save to history: ${error.message}`);
    }
    // Refresh the dashboard so the new link shows up in History without a
    // manual reload. Only needed when a row was actually inserted (the
    // dedupe early-return above means history did not change).
    revalidatePath("/url-builder/dashboard");
    return { ok: true };
  } catch (err) {
    console.error("saveGeneratedUrl failed:", err);
    return {
      ok: false,
      error: "Could not save to history. Please try again.",
    };
  }
}
