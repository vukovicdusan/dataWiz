import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";

export type UtmValues = Record<UtmParam, string>;

/** True when the value contains a {{...}} platform variable. */
export function containsPlatformVariable(value: string): boolean {
  return /\{\{.*?\}\}/.test(value);
}

/** True when the value contains a [...] manual placeholder. */
export function containsManualPlaceholder(value: string): boolean {
  return /\[.*?\]/.test(value);
}

/** Trims the base URL and prepends https:// when the protocol is missing. */
export function normalizeBaseUrl(baseUrl: string): {
  url: string;
  assumedHttps: boolean;
} {
  const trimmed = baseUrl.trim();
  if (!trimmed) return { url: "", assumedHttps: false };
  if (/^https?:\/\//i.test(trimmed)) return { url: trimmed, assumedHttps: false };
  return { url: `https://${trimmed}`, assumedHttps: true };
}

/**
 * Percent-encodes a UTM value, except values containing {{...}} platform
 * variables, which ad platforms must receive verbatim (pipes included).
 */
export function encodeUtmValue(value: string): string {
  return containsPlatformVariable(value) ? value : encodeURIComponent(value);
}

/**
 * Builds only the utm_* query string, no domain and no leading "?", e.g.
 * "utm_source=facebook&utm_medium=paid_social". Returns "" when every value
 * is empty. Empty values (required or optional) are simply omitted; the UI
 * separately disables the copy buttons until required fields are filled.
 */
export function buildQueryString(values: UtmValues): string {
  return UTM_PARAMS.map((param) => ({
    param,
    value: (values[param] ?? "").trim(),
  }))
    .filter(({ value }) => value !== "")
    .map(({ param, value }) => `utm_${param}=${encodeUtmValue(value)}`)
    .join("&");
}

/**
 * Assembles the full tagged URL. Returns "" when the base URL is empty.
 */
export function buildUrl(baseUrl: string, values: UtmValues): string {
  const { url } = normalizeBaseUrl(baseUrl);
  if (!url) return "";

  // Split off any fragment so the query string lands before it.
  const hashIndex = url.indexOf("#");
  const preFragment = hashIndex === -1 ? url : url.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : url.slice(hashIndex);

  // Strip a stray trailing `?` or `&` before deciding the separator.
  const base = preFragment.replace(/[?&]$/, "");

  const query = buildQueryString(values);

  if (!query) return `${base}${fragment}`;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}${query}${fragment}`;
}
