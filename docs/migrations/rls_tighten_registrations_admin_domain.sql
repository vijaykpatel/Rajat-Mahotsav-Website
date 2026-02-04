-- RLS Tightening: Lock down registrations SELECT to authenticated @nj.sgadi.us only
-- Applied: via Supabase MCP apply_migration
-- Ref: security-rls-basics, security-rls-performance (wrap auth calls in SELECT for performance)

-- 1. Drop the permissive anon SELECT policy
DROP POLICY IF EXISTS "anon can read" ON public.registrations;

-- 2. Add SELECT policy for authenticated users with @nj.sgadi.us email domain
-- Uses (select auth.email()) to avoid per-row function calls (RLS performance best practice)
CREATE POLICY "admin_domain_select"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (
    (select auth.email())::text ilike '%@nj.sgadi.us'
  );

-- Keep: "Allow anonymous inserts" (anon INSERT)
-- Keep: "anon can update" (public UPDATE)
-- Keep: "daily-cron-job-read" (keep-alive-cron-role SELECT)
