# UTM Tagging Guide (reference)

Distilled from the DataWiz Analytics "UTM Tagging Guide" PDF. This file is the source of truth for the URL builder's channel templates, dropdown defaults, and validation warnings.

## The five parameters

| Parameter | Question it answers | Requirement | Example values |
|---|---|---|---|
| `utm_source` | Where is the traffic coming from? | **Required** | `google`, `bing`, `facebook`, `twitter`, `newsletter`, `linkedin` |
| `utm_medium` | What channel type brought the user? (largest bucket) | **Required** | `cpc`, `organic`, `affiliate`, `social`, `email`, `referral`, `display` |
| `utm_campaign` | What are you promoting? | **Required** | `summer_campaign`, `black_friday`, `new_product_release`, `webinar_q3` |
| `utm_term` | Which keyword / targeting option? | Recommended | `males_over25`, `cart_abandoners`, `basketball_fans_boston`, `running_shoes` |
| `utm_content` | Which ad variation / creative? | Recommended | `short_copy`, `social_proof`, `dynamic_video`, `hero_banner`, `cta_button` |

URL anatomy: `https://yoursite.com/page?utm_source=...&utm_medium=...&utm_campaign=...&utm_term=...&utm_content=...`

## Channel templates

Value types:
- **Fixed** — use exactly as written.
- **Platform variable** — `{{...}}` auto-populated by the ad platform at click time (keep verbatim in the URL).
- **Manual variable** — `[...]` filled in by the user when creating the link.

| Channel | source | medium | campaign | term | content |
|---|---|---|---|---|---|
| Google Ads | — | — | — | — | — |
| Meta Ads | `meta` | `cpc` | `{{campaign.name}}` | `{{adset.name}}\|{{placement}}` | `{{ad.name}}` |
| Surfside | `surfside` | `display` | `{{source id}}` | `{{strategy id}}\|{{placement id}}` | `{{creative id}}` |
| Email | `alpine` | `email` | `[email_type]` | `[audience_segment]` | `[variant]` |
| Social Media | `[platform_name]` | `social` | `[post_name]` | — | — |
| Google My Business | `gmb` | `listing` | `[location]` | — | — |
| Weed Maps | `weed_maps` | `listing` | `[location]` | — | — |
| Apple Maps | `apple_maps` | `listing` | `[location]` | — | — |
| Other Listings | `other_listing` | `listing` | `[location]` | — | — |

**Google Ads:** auto-tagged via GCLID — do **not** add UTM parameters. The builder must show this notice and skip generation for this channel.

## Best practices (drive the builder's warnings)

1. **Consistent naming** — one spelling per concept; never let `facebook` and `fb` coexist. (Team custom values exist for this.)
2. **Always lowercase** — UTMs are case-sensitive in GA4; `Facebook`, `facebook`, `FACEBOOK` are three different sources.
3. **Never tag internal links** — UTMs on internal links overwrite the original source and inflate sessions.
4. **No spaces or special characters** — avoid `? % & # ! @` and spaces. Use hyphens (`spring-sale`) or underscores when two words form one concept (`cart_abandoners`).
5. **Verify URL shorteners preserve UTMs.**
6. **No PII in tags** — tagged URLs end up in logs and browser history; assume public.
7. **Don't repeat information across parameters** — if source is `facebook`, don't put "facebook" in the campaign too.
8. **Test before every launch.**

## The four most expensive mistakes

1. Inconsistent capitalization fragments data (GA4 treats `Email` and `email` as different mediums).
2. Tagging internal navigation destroys upstream attribution.
3. Swapping source and medium — source is *who* sent the traffic (`facebook`, `google`, `newsletter`); medium is *how* it arrived (`cpc`, `email`, `social`).
4. Skipping the pre-launch test.
