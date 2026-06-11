import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";
import {
  containsManualPlaceholder,
  containsPlatformVariable,
  normalizeBaseUrl,
} from "@/lib/utm/build";
import { aliasGroupFor } from "@/lib/utm/aliases";

export type Warning = {
  field: UtmParam | "baseUrl";
  message: string;
};

export type WarningInput = {
  baseUrl: string;
  values: Record<UtmParam, string>;
  templateDefaults: Partial<Record<UtmParam, string>>;
  /** Values the team used before (history + saved team values), per param. */
  historyValues?: Partial<Record<UtmParam, readonly string[]>>;
};

// Case and hyphen/underscore differences are the classic GA4 data-splitters,
// so "Summer-Sale" and "summer_sale" normalize to the same key.
function consistencyKey(value: string): string {
  return value.trim().toLowerCase().replace(/-/g, "_");
}

// A complete public website address has at least one dot and ends in a
// TLD-like label of two or more letters ("datawiz.rs", "example.co.uk").
// "accesspilot" or "localhost" fail this check; the warning is advisory,
// never blocking (internal hosts and unusual TLDs stay usable).
function hostLooksComplete(hostname: string): boolean {
  const labels = hostname.split(".");
  if (labels.length < 2) return false;
  if (labels.some((label) => label.length === 0)) return false;
  return /^[a-zA-Z]{2,}$/.test(labels[labels.length - 1]);
}

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export function collectWarnings(input: WarningInput): Warning[] {
  const warnings: Warning[] = [];
  const baseUrl = input.baseUrl.trim();

  // 1. Base URL missing http(s)://
  if (baseUrl && normalizeBaseUrl(baseUrl).assumedHttps) {
    warnings.push({
      field: "baseUrl",
      message:
        "Your base URL has no http:// or https://, so the preview assumes https://.",
    });
  }

  // 2. Base URL already carries utm_ parameters
  if (baseUrl.toLowerCase().includes("utm_")) {
    warnings.push({
      field: "baseUrl",
      message:
        "Your base URL already contains utm_ parameters. Adding more would tag the link twice and confuse your reports.",
    });
  }

  // 3. Host does not look like a complete website address
  if (baseUrl) {
    const hostname = hostnameOf(normalizeBaseUrl(baseUrl).url);
    if (!hostname || !hostLooksComplete(hostname)) {
      const shown = hostname || baseUrl;
      warnings.push({
        field: "baseUrl",
        message: `"${shown}" does not look like a complete website address. It is missing an ending like .com or .io. Double-check it before sharing the link.`,
      });
    }
  }

  for (const param of UTM_PARAMS) {
    const value = input.values[param].trim();
    if (!value) continue;
    const name = `utm_${param}`;
    const isPlatform = containsPlatformVariable(value);

    // 4. Uppercase letters (GA4 is case-sensitive)
    if (!isPlatform && /[A-Z]/.test(value)) {
      warnings.push({
        field: param,
        message: `${name} has uppercase letters. GA4 is case-sensitive, so "Email" and "email" count as two different values. Use lowercase.`,
      });
    }

    // 5. Spaces or special characters
    if (!isPlatform && /[\s?%&#!@]/.test(value)) {
      warnings.push({
        field: param,
        message: `${name} has spaces or special characters. Use hyphens or underscores instead, like spring-sale or cart_abandoners.`,
      });
    }

    // 6. Unfilled [...] manual placeholder
    if (containsManualPlaceholder(value)) {
      warnings.push({
        field: param,
        message: `${name} still contains a placeholder like ${value}. Replace it with your real value before sharing the link.`,
      });
    }

    // 7. A template's fixed value was changed
    const templateDefault = input.templateDefaults[param];
    if (
      templateDefault &&
      !containsPlatformVariable(templateDefault) &&
      !containsManualPlaceholder(templateDefault) &&
      value !== templateDefault
    ) {
      warnings.push({
        field: param,
        message: `${name} normally uses "${templateDefault}" for this channel. A different value can split this channel's data in reports.`,
      });
    }

    // 8. Same value as before, written differently (case or - vs _)
    const history = input.historyValues?.[param] ?? [];
    const exactMatch = history.includes(value);
    let spellingWarned = false;
    if (
      !isPlatform &&
      !containsManualPlaceholder(value) &&
      !exactMatch
    ) {
      const earlier = history.find(
        (used) => consistencyKey(used) === consistencyKey(value)
      );
      if (earlier) {
        spellingWarned = true;
        warnings.push({
          field: param,
          message: `${name}: "${earlier}" was used in earlier links. "${value}" would count as a separate value in GA4 and split your data. Stick to one spelling.`,
        });
      }
    }

    // 9. Different alias for the same platform or medium used earlier
    // (fb vs facebook, paid vs cpc). History-based only: no nagging when
    // there is no conflict with previously generated URLs. Skipped when the
    // typed value already appears in history exactly (no conflict), or when
    // rule 8 already warned for this parameter (contradictory advice otherwise).
    if (
      (param === "source" || param === "medium") &&
      !isPlatform &&
      !containsManualPlaceholder(value) &&
      !spellingWarned &&
      !exactMatch
    ) {
      const key = consistencyKey(value);
      const group = aliasGroupFor(param, key);
      if (group) {
        const earlierAlias = history.find((used) => {
          const usedKey = consistencyKey(used);
          return usedKey !== key && group.includes(usedKey);
        });
        if (earlierAlias) {
          const noun = param === "source" ? "platform" : "medium";
          warnings.push({
            field: param,
            message: `${name}: "${value}" and "${earlierAlias}" usually mean the same ${noun}. Based on your previously generated URLs you used "${earlierAlias}". Using both splits your data in reports. Stick to "${earlierAlias}".`,
          });
        }
      }
    }
  }

  return warnings;
}
