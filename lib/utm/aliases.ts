// Alias groups for utm_source and utm_medium: different names teams use
// for the same platform or medium (fb vs facebook, paid vs cpc). Every
// value is stored pre-normalized (lowercase, underscores instead of
// hyphens) so it can be compared directly against consistencyKey output
// in lib/utm/validate.ts. Extend a group or add a new array to cover
// more synonyms; no other file needs to change.

export type AliasParam = "source" | "medium";

const SOURCE_GROUPS: readonly (readonly string[])[] = [
  ["facebook", "fb"],
  ["instagram", "ig", "insta"],
  ["youtube", "yt"],
  ["twitter", "x"],
  ["linkedin", "li"],
  ["google", "goog"],
  ["tiktok", "tt"],
  ["newsletter", "email_newsletter"],
];

const MEDIUM_GROUPS: readonly (readonly string[])[] = [
  ["cpc", "ppc", "paid"],
  ["paid_social", "paidsocial"],
  ["email", "e_mail"],
  ["social", "organic_social"],
  ["referral", "ref"],
  ["display", "banner"],
  ["affiliate", "aff"],
];

const GROUPS: Record<AliasParam, readonly (readonly string[])[]> = {
  source: SOURCE_GROUPS,
  medium: MEDIUM_GROUPS,
};

/**
 * The alias group containing the normalized value for this parameter,
 * or null when the value belongs to no group (or the param has none).
 */
export function aliasGroupFor(
  param: AliasParam,
  normalizedValue: string
): readonly string[] | null {
  return (
    GROUPS[param].find((group) => group.includes(normalizedValue)) ?? null
  );
}
