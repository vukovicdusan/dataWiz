import { createClient } from "@/lib/supabase/server";

// Dashboard read. Uses the cookie-bound server client ON PURPOSE so the
// query passes through RLS: a member only ever sees their own team's values.
export async function getTeamBaseUrls(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("base_urls")
    .select("value")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(`Could not load team base URLs: ${error.message}`);
  }
  return (data ?? []).map((row) => row.value as string);
}
