"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { findActiveInvite, replaceInvite } from "@/lib/url-builder/invites";

export type InviteResult =
  | { ok: true; token: string; expiresAt: string }
  | { ok: false; error: string };

// Verifies the cookie session, then resolves the caller's team membership
// with the service-role client. Returns null when either is missing.
async function requireMembership(): Promise<{
  userId: string;
  teamId: string;
} | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data: membership, error } = await admin
    .from("team_members")
    .select("team_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    throw new Error(`Could not check your team membership: ${error.message}`);
  }
  if (!membership) return null;

  return { userId: user.id, teamId: membership.team_id as string };
}

export async function getOrCreateInvite(): Promise<InviteResult> {
  try {
    const member = await requireMembership();
    if (!member) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const existing = await findActiveInvite(member.teamId);
    const invite =
      existing ?? (await replaceInvite(member.teamId, member.userId));
    return { ok: true, token: invite.token, expiresAt: invite.expiresAt };
  } catch (err) {
    console.error("getOrCreateInvite failed:", err);
    return {
      ok: false,
      error: "Could not load the invite link. Please try again.",
    };
  }
}

export async function regenerateInvite(): Promise<InviteResult> {
  try {
    const member = await requireMembership();
    if (!member) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const invite = await replaceInvite(member.teamId, member.userId);
    return { ok: true, token: invite.token, expiresAt: invite.expiresAt };
  } catch (err) {
    console.error("regenerateInvite failed:", err);
    return {
      ok: false,
      error: "Could not create a new invite link. Please try again.",
    };
  }
}
