"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type HistoryActionResult = { ok: true } | { ok: false; error: string };

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

// PostgREST encodes .in() filters in the request URL, so long id lists
// are deleted in chunks to stay under URL length limits.
const DELETE_CHUNK_SIZE = 100;

/**
 * Permanently deletes history rows by id for the caller's team. Used by
 * both the per-row trash button (one id) and the bulk "Delete N filtered
 * links" button (all currently visible ids). Any team member may delete
 * any of the team's rows; RLS (members_delete_team_generated_urls) is
 * the enforcement, the .eq("team_id") below is belt and braces.
 */
export async function deleteHistoryLinks(
  ids: string[]
): Promise<HistoryActionResult> {
  try {
    const cleaned = Array.from(
      new Set(
        (Array.isArray(ids) ? ids : [])
          .map((id) => String(id).trim())
          .filter(Boolean)
      )
    );
    if (cleaned.length === 0) {
      return { ok: false, error: "Nothing to delete." };
    }

    const ctx = await requireSessionTeam();
    if (!ctx) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    let deleted = 0;
    for (let i = 0; i < cleaned.length; i += DELETE_CHUNK_SIZE) {
      const chunk = cleaned.slice(i, i + DELETE_CHUNK_SIZE);
      const { data, error } = await ctx.supabase
        .from("generated_urls")
        .delete()
        .in("id", chunk)
        .eq("team_id", ctx.teamId)
        .select("id");
      if (error) {
        throw new Error(`Could not delete from history: ${error.message}`);
      }
      deleted += (data ?? []).length;
    }

    // RLS turns forbidden deletes into 0-row no-ops (and a missing DELETE
    // policy would too). Report that instead of pretending it worked.
    if (deleted === 0) {
      return {
        ok: false,
        error: "Could not delete. Please reload the page and try again.",
      };
    }

    // Same refresh pattern as saveGeneratedUrl: revalidating the current
    // route makes the server action response carry a fresh page payload,
    // so the deleted rows disappear without a manual reload. The dashboard
    // is revalidated too because its suggestion dropdowns and consistency
    // warnings derive from the same history.
    revalidatePath("/url-builder/history");
    revalidatePath("/url-builder/dashboard");
    return { ok: true };
  } catch (err) {
    console.error("deleteHistoryLinks failed:", err);
    return { ok: false, error: "Could not delete. Please try again." };
  }
}
