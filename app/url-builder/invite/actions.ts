"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deleteTeamIfEmpty,
  ensureProfile,
} from "@/lib/url-builder/teams";

// base64url token: 43 chars for 32 bytes; accept a sane range.
const TokenSchema = z.string().regex(/^[A-Za-z0-9_-]{20,128}$/);

export type JoinResult = { ok: true } | { ok: false; error: string };

const INVALID_LINK_MESSAGE =
  "This invite link is no longer valid. Ask your teammate for a new one.";

export async function joinTeam(rawToken: string): Promise<JoinResult> {
  try {
    const parsedToken = TokenSchema.safeParse(rawToken);
    if (!parsedToken.success) {
      return { ok: false, error: INVALID_LINK_MESSAGE };
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "Please sign in first, then try again." };
    }

    const admin = createAdminClient();
    const { data: invite, error: inviteError } = await admin
      .from("invites")
      .select("team_id, revoked, expires_at")
      .eq("token", parsedToken.data)
      .maybeSingle();
    if (inviteError) {
      throw new Error(`Could not look up the invite: ${inviteError.message}`);
    }
    if (
      !invite ||
      invite.revoked ||
      new Date(invite.expires_at as string) < new Date()
    ) {
      return { ok: false, error: INVALID_LINK_MESSAGE };
    }

    const inviteTeamId = invite.team_id as string;

    // A brand-new user joining via invite gets a profile but NO personal
    // team — they go straight onto the inviting team.
    await ensureProfile(user);

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

    // Already on this team: no-op (the caller sends the user to the dashboard).
    if (membership && (membership.team_id as string) === inviteTeamId) {
      return { ok: true };
    }

    if (membership) {
      // Single UPDATE keyed on the user_id primary key: the switch is atomic,
      // so a failure can never leave the user without a team.
      const { error: switchError } = await admin
        .from("team_members")
        .update({ team_id: inviteTeamId, joined_at: new Date().toISOString() })
        .eq("user_id", user.id);
      if (switchError) {
        throw new Error(`Could not switch teams: ${switchError.message}`);
      }
      await deleteTeamIfEmpty(membership.team_id as string);
    } else {
      const { error: joinError } = await admin
        .from("team_members")
        .insert({ team_id: inviteTeamId, user_id: user.id });
      if (joinError) {
        throw new Error(`Could not join the team: ${joinError.message}`);
      }
    }

    return { ok: true };
  } catch (err) {
    console.error("joinTeam failed:", err);
    return {
      ok: false,
      error: "Joining the team did not work. Please try again.",
    };
  }
}
