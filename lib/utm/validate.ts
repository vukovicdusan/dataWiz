import { UTM_PARAMS, type UtmParam } from "@/lib/utm/channels";
import {
  containsManualPlaceholder,
  containsPlatformVariable,
  normalizeBaseUrl,
} from "@/lib/utm/build";

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

  for (const param of UTM_PARAMS) {
    const value = input.values[param].trim();
    if (!value) continue;
    const name = `utm_${param}`;
    const isPlatform = containsPlatformVariable(value);

    // 3. Uppercase letters (GA4 is case-sensitive)
    if (!isPlatform && /[A-Z]/.test(value)) {
      warnings.push({
        field: param,
        message: `${name} has uppercase letters. GA4 is case-sensitive, so "Email" and "email" count as two different values. Use lowercase.`,
      });
    }

    // 4. Spaces or special characters
    if (!isPlatform && /[\s?%&#!@]/.test(value)) {
      warnings.push({
        field: param,
        message: `${name} has spaces or special characters. Use hyphens or underscores instead, like spring-sale or cart_abandoners.`,
      });
    }

    // 5. Unfilled [...] manual placeholder
    if (containsManualPlaceholder(value)) {
      warnings.push({
        field: param,
        message: `${name} still contains a placeholder like ${value}. Replace it with your real value before sharing the link.`,
      });
    }

    // 6. A template's fixed value was changed
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

    // 7. Same value as before, written differently (case or - vs _)
    const history = input.historyValues?.[param] ?? [];
    if (
      !isPlatform &&
      !containsManualPlaceholder(value) &&
      !history.includes(value)
    ) {
      const earlier = history.find(
        (used) => consistencyKey(used) === consistencyKey(value)
      );
      if (earlier) {
        warnings.push({
          field: param,
          message: `${name}: your team previously used "${earlier}". "${value}" would count as a separate value in GA4 and split your data. Stick to one spelling.`,
        });
      }
    }
  }

  return warnings;
}
