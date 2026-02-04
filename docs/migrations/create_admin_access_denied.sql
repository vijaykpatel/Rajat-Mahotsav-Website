-- Task 5.1: Audit table for rejected admin access attempts (denied-domain logging)
-- security-rls: RLS enabled; only service_role can insert (no anon/authenticated policies)
-- schema-primary-keys: bigint identity for sequential IDs
-- Applied via Supabase MCP: create_admin_access_denied_table

create table if not exists public.admin_access_denied (
  id bigint generated always as identity primary key,
  email text not null,
  full_name text,
  provider text,
  attempted_at timestamptz not null default now(),
  user_agent text,
  ip text
);

comment on table public.admin_access_denied is 'Audit log of admin access attempts denied due to invalid domain (@nj.sgadi.us required)';

-- RLS: restrict access; only service_role (server-side) can insert
alter table public.admin_access_denied enable row level security;

-- No policies for anon or authenticated: only service_role bypasses RLS
-- Service role is used server-side for audit inserts; clients cannot read or write
