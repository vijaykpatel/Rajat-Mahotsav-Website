-- RPC for filtered, paginated registrations with text search
-- Applied: via Supabase MCP apply_migration
-- Ref: admin-registrations-filter-search plan, supabase-postgres-best-practices
-- Uses parameterized queries; strpos for substring search (avoids LIKE wildcard injection)

-- See Supabase project for full migration SQL (get_registrations_filtered, get_registrations_distinct_values)
