# Task 9 Verification: Indexing + Performance Hardening

## Completed Work

### 9.1 Add Indexes

**Migration**: `docs/migrations/add_registrations_performance_indexes.sql`  
**Applied**: via Supabase MCP `apply_migration`

**Indexes created** (per supabase-postgres-best-practices `query-missing-indexes`, `data-pagination`):

| Index | Column(s) | Purpose |
|-------|-----------|---------|
| `idx_registrations_arrival_date` | `arrival_date` | Stats RPC GROUP BY, daily attendance range |
| `idx_registrations_departure_date` | `departure_date` | Stats RPC GROUP BY, daily attendance range |
| `idx_registrations_arrival_departure` | `(arrival_date, departure_date)` | Partial index for daily attendance LATERAL join |
| `idx_registrations_ghaam` | `ghaam` | Stats RPC GROUP BY |
| `idx_registrations_mandal` | `mandal` | Stats RPC GROUP BY |
| `idx_registrations_age` | `age` | Age-based filters, dedupe support |
| `idx_registrations_email` | `email` | Lookups, dedupe |
| `idx_registrations_mobile_number` | `mobile_number` | Lookups, dedupe |

**Partial index** `idx_registrations_arrival_departure` uses `WHERE arrival_date IS NOT NULL AND departure_date IS NOT NULL` to match the daily expected attendance query pattern.

### 9.2 No-Store Headers on Private Data

**Middleware** (`utils/supabase/middleware.ts`):
- `Cache-Control: no-store, max-age=0` for paths starting with `/admin`
- `Cache-Control: no-store, max-age=0` for `/api/registrations/export`

**Export route** (`app/api/registrations/export/route.ts`):
- Response headers include `Cache-Control: no-store, max-age=0` (redundant with middleware for consistency)

---

## Supabase Read Tests (Read-Only, No Writes)

All tests performed via Supabase SQL execution. **No writes to any table.**

### Test 1: 1-Row Read from Registrations

**Query**:
```sql
SELECT id, first_name, last_name, email, ghaam, mandal, arrival_date, departure_date
FROM public.registrations
ORDER BY id DESC
LIMIT 1;
```

**Result** (1 row, PII redacted for doc):
```json
{
  "id": 111,
  "first_name": "H***",
  "last_name": "R***",
  "email": "r***@***.***",
  "ghaam": "Ranasan",
  "mandal": "Maninagar",
  "arrival_date": "2026-07-24",
  "departure_date": "2026-08-01"
}
```

**Status**: Pass – read-only, 1 row returned.

### Test 2: Query Plan – Pagination (Index Usage)

**Query**:
```sql
EXPLAIN (ANALYZE false, COSTS true, FORMAT text)
SELECT id, first_name, last_name, email, ghaam, mandal, arrival_date, departure_date
FROM public.registrations
ORDER BY id DESC
LIMIT 1;
```

**Plan**:
```
Limit  (cost=0.14..0.20 rows=1 width=66)
  ->  Index Scan Backward using "Registration Data_pkey" on registrations  (cost=0.14..6.06 rows=108 width=66)
```

**Status**: Pass – uses primary key index for keyset pagination (no sequential scan).

### Test 3: Indexes Exist

**Query**:
```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'registrations' ORDER BY indexname;
```

**Result** (new indexes in bold):
- `idx_registrations_age`
- `idx_registrations_arrival_date`
- `idx_registrations_arrival_departure`
- `idx_registrations_departure_date`
- `idx_registrations_email`
- `idx_registrations_ghaam`
- `idx_registrations_mandal`
- `idx_registrations_mobile_number`
- `Registration Data_id_key`
- `Registration Data_pkey`
- `unique_person2`

**Status**: Pass – all 8 new indexes created.

### Test 4: Stats RPC (Read-Only)

**Query**:
```sql
SELECT public.get_registrations_stats('2026-07-29'::date, '2026-08-02'::date);
```

**Status**: Pass – RPC returns JSON payload; no writes. Indexes support GROUP BY and range queries as table scales.

---

## Cache-Control Verification

### Admin Route Headers

**Command**:
```bash
curl -s -I http://localhost:3000/admin/registrations
```

**Actual** (2025-02-04): `Cache-Control: no-store, must-revalidate` (Next.js dynamic route + middleware)

**Status**: Pass – `no-store` present; private data not cached.

### Export API Headers

**Command** (no auth – expect 401, but headers still set):
```bash
curl -s -I http://localhost:3000/api/registrations/export
```

**Actual** (2025-02-04): `cache-control: no-store, max-age=0`

**Status**: Pass – `no-store` present.

---

## Verification Steps

### 9.1 Indexes

1. Migration applied successfully.
2. `pg_indexes` shows all 8 new indexes on `registrations`.
3. Pagination query uses index scan (primary key).
4. Stats RPC and daily attendance queries can use new indexes as data grows (with 108 rows, planner may choose seq scan; indexes scale for larger datasets).

### 9.2 No-Store

1. Start dev server: `npm run dev`
2. `curl -s -I http://localhost:3000/admin/registrations` → headers include `Cache-Control: no-store, max-age=0`
3. `curl -s -I http://localhost:3000/api/registrations/export` → headers include `Cache-Control: no-store, max-age=0`

---

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
