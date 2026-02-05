-- Task 9.1: Add indexes for stats RPC, pagination, and filters
-- Applied: via Supabase MCP apply_migration
-- Ref: supabase-postgres-best-practices (query-missing-indexes, data-pagination)
-- Columns used in: GROUP BY, range checks (arrival_date <= x AND departure_date >= y), lookups

-- Date columns: stats RPC groups by these; daily_attendance uses range on both
CREATE INDEX IF NOT EXISTS idx_registrations_arrival_date
  ON public.registrations (arrival_date);

CREATE INDEX IF NOT EXISTS idx_registrations_departure_date
  ON public.registrations (departure_date);

-- Composite for daily expected attendance LATERAL join (arrival_date <= d AND departure_date >= d)
CREATE INDEX IF NOT EXISTS idx_registrations_arrival_departure
  ON public.registrations (arrival_date, departure_date)
  WHERE arrival_date IS NOT NULL AND departure_date IS NOT NULL;

-- Categorical columns: stats RPC groups by these
CREATE INDEX IF NOT EXISTS idx_registrations_ghaam
  ON public.registrations (ghaam);

CREATE INDEX IF NOT EXISTS idx_registrations_mandal
  ON public.registrations (mandal);

-- Age: used in unique_person2 composite; supports age-based filters
CREATE INDEX IF NOT EXISTS idx_registrations_age
  ON public.registrations (age);

-- Lookup columns: email and mobile for dedupe and search
CREATE INDEX IF NOT EXISTS idx_registrations_email
  ON public.registrations (email);

CREATE INDEX IF NOT EXISTS idx_registrations_mobile_number
  ON public.registrations (mobile_number);
