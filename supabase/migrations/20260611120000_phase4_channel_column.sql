-- Phase 4: record which channel template generated each URL.
-- Nullable ON PURPOSE: rows created before Phase 4 keep null and the UI
-- shows a placeholder badge. No backfill: inferring channel from
-- source/medium is ambiguous (several channels share medium "cpc").

alter table public.generated_urls
  add column channel text;
