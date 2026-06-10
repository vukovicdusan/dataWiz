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
): string {
  const fromName = fullName?.trim().split(/\s+/)[0];
  if (fromName) return fromName;
  const fromEmail = email?.split("@")[0];
  return fromEmail || "My";
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

  const { data: team, error: teamError } = await admin
    .from("teams")
    .insert({ name: `${firstName}'s team` })
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

// Deletes a team when its last member has departed. FK cascades remove the
// team's invites, custom values, and generated URLs.
export async function deleteTeamIfEmpty(teamId: string): Promise<void> {
  const admin = createAdminClient();
  const { count, error } = await admin
    .from("team_members")
    .select("user_id", { count: "exact", head: true })
    .eq("team_id", teamId);
  if (error) {
    throw new Error(`Could not count team members: ${error.message}`);
  }

  if (count === 0) {
    const { error: deleteError } = await admin
      .from("teams")
      .delete()
      .eq("id", teamId);
    if (deleteError) {
      throw new Error(`Could not delete the empty team: ${deleteError.message}`);
    }
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
