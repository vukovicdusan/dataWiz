import { createClient } from "@/lib/supabase/server";
import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";

export type TeamCustomValues = Record<UtmParam, string[]>;

// Dashboard read. Uses the cookie-bound server client ON PURPOSE so the
// query passes through RLS: a member only ever sees their own team's values.
export async function getTeamCustomValues(): Promise<TeamCustomValues> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("custom_values")
    .select("param, value")
    .order("value", { ascending: true });
  if (error) {
    throw new Error(`Could not load team values: ${error.message}`);
  }

  const result = Object.fromEntries(
    UTM_PARAMS.map((param) => [param, [] as string[]])
  ) as TeamCustomValues;
  (data ?? []).forEach((row) => {
    const param = row.param as UtmParam;
    if (result[param]) result[param].push(row.value as string);
  });
  return result;
}
