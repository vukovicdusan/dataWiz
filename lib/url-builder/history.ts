import { createClient } from "@/lib/supabase/server";
import type { HistoryEntry } from "@/lib/history/types";

// Full team history for the dashboard History card, newest first. Reads
// through the session client ON PURPOSE so RLS scopes both queries to the
// caller's team. Creators who left the team are no longer visible through
// the profiles policy and render as "Unknown".
export async function getTeamHistory(): Promise<HistoryEntry[]> {
  const supabase = createClient();

  const { data: rows, error } = await supabase
    .from("generated_urls")
    .select(
      "id, created_by, base_url, source, medium, campaign, term, content, channel, full_url, created_at"
    )
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(`Could not load team history: ${error.message}`);
  }

  const creatorIds = Array.from(
    new Set(
      (rows ?? [])
        .map((row) => row.created_by as string | null)
        .filter((id): id is string => Boolean(id))
    )
  );

  const profileById = new Map<
    string,
    { fullName: string | null; email: string | null }
  >();
  if (creatorIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", creatorIds);
    if (profilesError) {
      throw new Error(
        `Could not load creator profiles: ${profilesError.message}`
      );
    }
    (profiles ?? []).forEach((row) => {
      profileById.set(row.id as string, {
        fullName: (row.full_name as string | null) ?? null,
        email: (row.email as string | null) ?? null,
      });
    });
  }

  return (rows ?? []).map((row) => {
    const profile = row.created_by
      ? profileById.get(row.created_by as string)
      : undefined;
    return {
      id: row.id as string,
      baseUrl: row.base_url as string,
      source: row.source as string,
      medium: row.medium as string,
      campaign: row.campaign as string,
      term: (row.term as string | null) ?? null,
      content: (row.content as string | null) ?? null,
      fullUrl: row.full_url as string,
      channel: (row.channel as string | null) ?? null,
      creatorName: profile?.fullName ?? null,
      creatorEmail: profile?.email ?? null,
      createdAt: row.created_at as string,
    };
  });
}
