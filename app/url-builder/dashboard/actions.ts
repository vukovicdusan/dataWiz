"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { findActiveInvite, replaceInvite } from "@/lib/url-builder/invites";
import {
  createPersonalTeam,
  deleteTeamIfEmpty,
} from "@/lib/url-builder/teams";

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

export type LeaveResult = { ok: true } | { ok: false; error: string };

export async function leaveTeam(): Promise<LeaveResult> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        ok: false,
        error: "Your session has expired. Please sign in again.",
      };
    }

    const admin = createAdminClient();
    const { data: membership, error: membershipError } = await admin
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (membershipError) {
      throw new Error(
        `Could not check your team membership: ${membershipError.message}`
      );
    }
    if (!membership) {
      return {
        ok: false,
        error: "You are not on a team right now. Reload the page.",
      };
    }

    const oldTeamId = membership.team_id as string;

    const { error: removeError } = await admin
      .from("team_members")
      .delete()
      .eq("user_id", user.id);
    if (removeError) {
      throw new Error(`Could not leave the team: ${removeError.message}`);
    }

    await deleteTeamIfEmpty(oldTeamId);
    await createPersonalTeam(user);

    return { ok: true };
  } catch (err) {
    console.error("leaveTeam failed:", err);
    return {
      ok: false,
      error: "Leaving the team did not work. Please try again.",
    };
  }
}
