import { createClient } from "@/lib/supabase/server";
import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";

export type TeamHistoryValues = Record<UtmParam, string[]>;

// Values the team has used before, per UTM param: recent generated URLs
// first, then saved team values. Read through the session client ON PURPOSE
// so RLS limits rows to the caller's team. Feeds the consistency warning
// (e.g. "summer-sale" vs an earlier "summer_sale").
export async function getTeamHistoryValues(): Promise<TeamHistoryValues> {
  const supabase = createClient();

  const [urlsResult, customResult] = await Promise.all([
    supabase
      .from("generated_urls")
      .select("source, medium, campaign, term, content")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase.from("custom_values").select("param, value"),
  ]);
  if (urlsResult.error) {
    throw new Error(`Could not load URL history: ${urlsResult.error.message}`);
  }
  if (customResult.error) {
    throw new Error(
      `Could not load team values: ${customResult.error.message}`
    );
  }

  const result = Object.fromEntries(
    UTM_PARAMS.map((param) => [param, [] as string[]])
  ) as TeamHistoryValues;
  const add = (param: UtmParam, value: string | null) => {
    if (value && !result[param].includes(value)) result[param].push(value);
  };

  (urlsResult.data ?? []).forEach((row) => {
    add("source", row.source as string | null);
    add("medium", row.medium as string | null);
    add("campaign", row.campaign as string | null);
    add("term", row.term as string | null);
    add("content", row.content as string | null);
  });
  (customResult.data ?? []).forEach((row) => {
    add(row.param as UtmParam, row.value as string | null);
  });

  return result;
}
