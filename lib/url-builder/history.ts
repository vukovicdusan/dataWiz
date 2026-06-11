import { createClient } from "@/lib/supabase/server";
import type { HistoryEntry } from "@/lib/history/types";

// Full team history for the dashboard History card, newest first. Reads
// through the session client ON PURPOSE so RLS scopes both queries to the
// caller's team. Creators who left the team are no longer visible through
// the profiles policy and render as "Unknown".
export async function getTeamHistory(): Promise<HistoryEntry[]> {
  const supabase = createClient();

  const PAGE_SIZE = 1000;
  type UrlRow = {
    id: string;
    created_by: string | null;
    base_url: string;
    source: string;
    medium: string;
    campaign: string;
    term: string | null;
    content: string | null;
    channel: string | null;
    full_url: string;
    created_at: string;
  };

  // PostgREST silently caps a single response at 1000 rows, so page through
  // explicitly: History and the CSV export must really see the full history.
  const rows: UrlRow[] = [];
  for (;;) {
    const { data, error } = await supabase
      .from("generated_urls")
      .select(
        "id, created_by, base_url, source, medium, campaign, term, content, channel, full_url, created_at"
      )
      .order("created_at", { ascending: false })
      .range(rows.length, rows.length + PAGE_SIZE - 1);
    if (error) {
      throw new Error(`Could not load team history: ${error.message}`);
    }
    rows.push(...((data ?? []) as UrlRow[]));
    if (!data || data.length < PAGE_SIZE) break;
  }

  const creatorIds = Array.from(
    new Set(
      rows
        .map((row) => row.created_by)
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

  return rows.map((row) => {
    const profile = row.created_by
      ? profileById.get(row.created_by)
      : undefined;
    return {
      id: row.id,
      baseUrl: row.base_url,
      source: row.source,
      medium: row.medium,
      campaign: row.campaign,
      term: row.term,
      content: row.content,
      fullUrl: row.full_url,
      channel: row.channel,
      creatorName: profile?.fullName ?? null,
      creatorEmail: profile?.email ?? null,
      createdAt: row.created_at,
    };
  });
}
