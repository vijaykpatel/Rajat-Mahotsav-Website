-- Composite indexes for filtered keyset pagination
-- Applied: via Supabase MCP apply_migration
-- Ref: supabase-postgres-best-practices (query-composite-indexes)
-- Supports WHERE ghaam = X ORDER BY id DESC, etc.

CREATE INDEX IF NOT EXISTS idx_registrations_ghaam_id
  ON public.registrations (ghaam, id)
  WHERE ghaam IS NOT NULL AND trim(ghaam) != '';

CREATE INDEX IF NOT EXISTS idx_registrations_mandal_id
  ON public.registrations (mandal, id)
  WHERE mandal IS NOT NULL AND trim(mandal) != '';

CREATE INDEX IF NOT EXISTS idx_registrations_arrival_id
  ON public.registrations (arrival_date, id)
  WHERE arrival_date IS NOT NULL;
