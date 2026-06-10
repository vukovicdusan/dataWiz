import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type TeamMemberProfile = {
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  email: string;
};

export type TeamWithMembers = {
  id: string;
  name: string;
  members: TeamMemberProfile[];
};

export function firstNameFrom(
  fullName: string | null | undefined,
  email: string | null | undefined
): string | null {
  const fromName = fullName?.trim().split(/\s+/)[0];
  if (fromName) return fromName;
  return email?.split("@")[0] || null;
}

// Creates/refreshes the profile row from the Google identity.
export async function ensureProfile(user: User): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.from("profiles").upsert({
    id: user.id,
    email: user.email ?? "",
    full_name: (user.user_metadata?.full_name as string | undefined) ?? null,
    avatar_url: (user.user_metadata?.avatar_url as string | undefined) ?? null,
  });
  if (error) {
    throw new Error(`Could not save your profile: ${error.message}`);
  }
}

// Creates "{first name}'s team" and the membership row. Returns the team id.
export async function createPersonalTeam(user: User): Promise<string> {
  const admin = createAdminClient();
  const firstName = firstNameFrom(
    user.user_metadata?.full_name as string | undefined,
    user.email
  );
  const teamName = firstName ? `${firstName}'s team` : "My team";

  const { data: team, error: teamError } = await admin
    .from("teams")
    .insert({ name: teamName })
    .select("id")
    .single();
  if (teamError || !team) {
    throw new Error(
      `Could not create a personal team: ${teamError?.message ?? "no row returned"}`
    );
  }

  const { error: memberError } = await admin
    .from("team_members")
    .insert({ team_id: team.id as string, user_id: user.id });
  if (memberError) {
    // Clean up the just-created team; it has no members either way.
    await admin.from("teams").delete().eq("id", team.id as string);

    // Unique violation on the user_id primary key: a concurrent request
    // already gave this user a team — use that one instead of failing.
    if (memberError.code === "23505") {
      const { data: existing } = await admin
        .from("team_members")
        .select("team_id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (existing) return existing.team_id as string;
    }
    throw new Error(`Could not join the personal team: ${memberError.message}`);
  }

  return team.id as string;
}

// First-sign-in bootstrap: ensure profile exists, and create a personal team
// if the user has no membership yet. Cheap indexed lookup on repeat visits.
export async function ensureProfileAndTeam(user: User): Promise<void> {
  await ensureProfile(user);

  const admin = createAdminClient();
  const { data: membership, error } = await admin
    .from("team_members")
    .select("team_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    throw new Error(`Could not check your team membership: ${error.message}`);
  }

  if (!membership) {
    await createPersonalTeam(user);
  }
}

// Deletes a team when its last member has departed. Atomic in SQL (see the
// delete_team_if_empty migration) so a concurrent join can't be cascaded
// away. FK cascades remove the team's invites, custom values, and URLs.
export async function deleteTeamIfEmpty(teamId: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.rpc("delete_team_if_empty", {
    target_team_id: teamId,
  });
  if (error) {
    throw new Error(`Could not clean up the empty team: ${error.message}`);
  }
}

// Dashboard read. Uses the cookie-bound server client ON PURPOSE so these
// queries pass through RLS — a member can only ever see their own team.
export async function getTeamWithMembers(
  userId: string
): Promise<TeamWithMembers | null> {
  const supabase = createClient();

  const { data: membership, error: membershipError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (membershipError) {
    throw new Error(
      `Could not load your team membership: ${membershipError.message}`
    );
  }
  if (!membership) return null;

  const teamId = membership.team_id as string;

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id, name")
    .eq("id", teamId)
    .maybeSingle();
  if (teamError) {
    throw new Error(`Could not load your team: ${teamError.message}`);
  }
  if (!team) return null;

  const { data: memberRows, error: membersError } = await supabase
    .from("team_members")
    .select("user_id, joined_at")
    .eq("team_id", teamId)
    .order("joined_at", { ascending: true });
  if (membersError) {
    throw new Error(`Could not load team members: ${membersError.message}`);
  }

  const userIds = (memberRows ?? []).map((row) => row.user_id as string);

  const { data: profileRows, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, email")
    .in("id", userIds);
  if (profilesError) {
    throw new Error(`Could not load member profiles: ${profilesError.message}`);
  }

  const profileById = new Map<
    string,
    { full_name: string | null; avatar_url: string | null; email: string }
  >();
  (profileRows ?? []).forEach((row) => {
    profileById.set(row.id as string, {
      full_name: (row.full_name as string | null) ?? null,
      avatar_url: (row.avatar_url as string | null) ?? null,
      email: (row.email as string) ?? "",
    });
  });

  const members: TeamMemberProfile[] = userIds.map((id) => {
    const profile = profileById.get(id);
    return {
      userId: id,
      fullName: profile?.full_name ?? null,
      avatarUrl: profile?.avatar_url ?? null,
      email: profile?.email ?? "",
    };
  });

  return { id: team.id as string, name: team.name as string, members };
}
