"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { deleteTeamIfEmpty } from "@/lib/url-builder/teams";

export type DeleteAccountResult = { ok: true } | { ok: false; error: string };

export async function deleteAccount(): Promise<DeleteAccountResult> {
  try {
    // Verify the cookie session first; only the signed-in user can delete
    // their own account, and only their own.
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
    const teamId = membership ? (membership.team_id as string) : null;

    // 1. Delete the profile row. FK cascades remove the team_members row;
    //    created_by on invites, custom_values, generated_urls, and
    //    base_urls flips to NULL, so the creator renders as "Unknown"
    //    (the existing departed-member behavior).
    const { error: profileError } = await admin
      .from("profiles")
      .delete()
      .eq("id", user.id);
    if (profileError) {
      throw new Error(`Could not delete your profile: ${profileError.message}`);
    }

    // 2. Sole member: the team is empty now, so this removes it and, via
    //    FK cascades, its invites, custom values, base URLs, channels,
    //    and generated URL history. With members remaining it atomically
    //    deletes nothing and the team continues for them.
    if (teamId) {
      await deleteTeamIfEmpty(teamId);
    }

    // 3. LAST: remove the sign-in itself. Everything above may fail and
    //    leave a signed-in user whose next page load rebuilds a fresh
    //    profile and personal team (ensureProfileAndTeam). After this
    //    line the account is gone for good.
    const { error: authError } = await admin.auth.admin.deleteUser(user.id);
    if (authError) {
      throw new Error(`Could not delete your sign-in: ${authError.message}`);
    }

    return { ok: true };
  } catch (err) {
    console.error("deleteAccount failed:", err);
    return {
      ok: false,
      error:
        "Deleting your account did not work. You are still signed in and can try again.",
    };
  }
}
