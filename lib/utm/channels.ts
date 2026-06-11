// Channel templates and example values for the UTM builder.
// Single source of truth: docs/utm-guide.md. Do not edit values here
// without updating the guide (and vice versa).

export type UtmParam = "source" | "medium" | "campaign" | "term" | "content";

export const UTM_PARAMS: readonly UtmParam[] = [
  "source",
  "medium",
  "campaign",
  "term",
  "content",
];

export const REQUIRED_PARAMS: readonly UtmParam[] = [
  "source",
  "medium",
  "campaign",
];

export const OPTIONAL_PARAMS: readonly UtmParam[] = ["term", "content"];

export type ChannelId =
  | "google-ads"
  | "meta-ads"
  | "microsoft-ads"
  | "linkedin-ads"
  | "x-twitter-ads"
  | "tiktok-ads"
  | "openai-ads"
  | "snapchat-ads"
  | "pinterest-ads"
  | "surfside"
  | "email"
  | "social-media"
  | "google-my-business"
  | "weed-maps"
  | "apple-maps"
  | "custom";

export type ChannelTemplate = {
  id: ChannelId;
  label: string;
  /** Google Ads only: show the GCLID notice and generate nothing. */
  noticeOnly: boolean;
  /**
   * Prefill values. Fixed values are used as written. {{...}} platform
   * variables and [...] manual variables are kept verbatim (unencoded).
   */
  defaults: Partial<Record<UtmParam, string>>;
};

export const CHANNELS: readonly ChannelTemplate[] = [
  { id: "google-ads", label: "Google Ads", noticeOnly: true, defaults: {} },
  {
    id: "meta-ads",
    label: "Meta Ads",
    noticeOnly: false,
    defaults: {
      source: "meta",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "microsoft-ads",
    label: "Microsoft Ads",
    noticeOnly: false,
    defaults: {
      source: "microsoft",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "linkedin-ads",
    label: "LinkedIn Ads",
    noticeOnly: false,
    defaults: {
      source: "linkedin",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "x-twitter-ads",
    label: "X (Twitter) Ads",
    noticeOnly: false,
    defaults: {
      source: "twitter",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "tiktok-ads",
    label: "TikTok Ads",
    noticeOnly: false,
    defaults: {
      source: "tiktok",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "openai-ads",
    label: "Open AI Ads",
    noticeOnly: false,
    defaults: {
      source: "openai",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "snapchat-ads",
    label: "Snapchat Ads",
    noticeOnly: false,
    defaults: {
      source: "snapchat",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "pinterest-ads",
    label: "Pinterest Ads",
    noticeOnly: false,
    defaults: {
      source: "pinterest",
      medium: "cpc",
      campaign: "{{campaign.name}}",
      term: "{{adset.name}}|{{placement}}",
      content: "{{ad.name}}",
    },
  },
  {
    id: "surfside",
    label: "Surfside",
    noticeOnly: false,
    defaults: {
      source: "surfside",
      medium: "display",
      campaign: "{{source id}}",
      term: "{{strategy id}}|{{placement id}}",
      content: "{{creative id}}",
    },
  },
  {
    id: "email",
    label: "Email",
    noticeOnly: false,
    defaults: {
      source: "alpine",
      medium: "email",
      campaign: "[email_type]",
      term: "[audience_segment]",
      content: "[variant]",
    },
  },
  {
    id: "social-media",
    label: "Social Media",
    noticeOnly: false,
    defaults: {
      source: "[platform_name]",
      medium: "social",
      campaign: "[post_name]",
    },
  },
  {
    id: "google-my-business",
    label: "Google My Business",
    noticeOnly: false,
    defaults: { source: "gmb", medium: "listing", campaign: "[location]" },
  },
  {
    id: "weed-maps",
    label: "Weed Maps",
    noticeOnly: false,
    defaults: { source: "weed_maps", medium: "listing", campaign: "[location]" },
  },
  {
    id: "apple-maps",
    label: "Apple Maps",
    noticeOnly: false,
    defaults: {
      source: "apple_maps",
      medium: "listing",
      campaign: "[location]",
    },
  },
  { id: "custom", label: "Custom", noticeOnly: false, defaults: {} },
];

// Example values from the guide's parameter table; shown in every dropdown.
export const EXAMPLE_VALUES: Record<UtmParam, readonly string[]> = {
  source: ["google", "bing", "facebook", "twitter", "newsletter", "linkedin"],
  medium: ["cpc", "organic", "affiliate", "social", "email", "referral", "display"],
  campaign: [
    "summer_campaign",
    "black_friday",
    "new_product_release",
    "webinar_q3",
  ],
  term: [
    "males_over25",
    "cart_abandoners",
    "basketball_fans_boston",
    "running_shoes",
  ],
  content: [
    "short_copy",
    "social_proof",
    "dynamic_video",
    "hero_banner",
    "cta_button",
  ],
};
