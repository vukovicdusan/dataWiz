-- Case-insensitive uniqueness for saved base URLs: "https://Example.com" and
-- "https://example.com" are the same destination and must not both be saved.
alter table public.base_urls
  drop constraint base_urls_team_id_value_key;

create unique index base_urls_team_value_ci_key
  on public.base_urls (team_id, lower(value));
