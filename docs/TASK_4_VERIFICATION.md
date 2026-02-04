# Task 4 Verification: Stats / Insights Backend (RPC or Server Route)

## Completed Work

### 4.1 SQL Function for Stats

**Migration**: `add_registrations_stats_rpc` (Supabase)

- **Function**: `public.get_registrations_stats(p_start_date, p_end_date)`
- **Returns**: Single JSON payload with all metrics
- **Security**: `SECURITY INVOKER` – RLS on `registrations` applies (caller must be authenticated `@nj.sgadi.us`)
- **Metrics**:
  - `total_registrations` – count of all rows
  - `unique_visitors` – composite dedupe by `first_name|last_name|email|mobile_number|age`
  - `counts_by_ghaam` – grouped counts (null/empty → "Unknown")
  - `counts_by_mandal` – grouped counts (null/empty → "Unknown")
  - `counts_by_arrival_date` – grouped by arrival date (null → "Unknown")
  - `counts_by_departure_date` – grouped by departure date (null → "Unknown")
  - `daily_expected_attendance` – for each date in range, count rows where `arrival_date <= d AND departure_date >= d`
  - `date_range` – `{ start, end }` used for the query

### 4.2 Null and Invalid Date Handling

- **Null ghaam/mandal**: `COALESCE(NULLIF(TRIM(ghaam), ''), 'Unknown')`
- **Null dates**: `COALESCE(arrival_date::text, 'Unknown')` for grouping; rows with null dates excluded from daily attendance
- **Date range bounds**: `greatest(p_start_date, '1970-01-01')` and `least(p_end_date, '2100-12-31')` to avoid invalid ranges

### API Route

**File**: `app/api/admin/stats/route.ts`

- GET endpoint; requires authenticated session with `@nj.sgadi.us`
- Query params: `start_date`, `end_date` (defaults: 2026-07-29, 2026-08-02)
- Calls `supabase.rpc('get_registrations_stats', { p_start_date, p_end_date })`
- Sets `Cache-Control: no-store`
- Returns 401 if not signed in, 403 if wrong domain

### Admin UI

**File**: `app/admin/registrations/AdminAuthenticatedView.tsx`

- Added "Test stats" button that fetches `/api/admin/stats`
- Displays JSON payload on success; error message on failure

---

## Supabase Read Test Results (Read-Only, No Writes)

### Test 1: 1-Row Read from Registrations

**Query** (direct SQL, read-only):

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

### Test 2: Stats RPC

**Query** (direct SQL, read-only):

```sql
SELECT public.get_registrations_stats('2026-07-29'::date, '2026-08-02'::date) AS stats;
```

**Result** (summary, full payload truncated):

```json
{
  "stats": {
    "total_registrations": 108,
    "unique_visitors": 108,
    "counts_by_ghaam": { "Mokhasan": 20, "Maninagar": 13, "Paliyad": 12, "..." },
    "counts_by_mandal": { "new-jersey": 25, "kentucky": 16, "Maninagar": 14, "..." },
    "counts_by_arrival_date": { "2026-07-27": 23, "2026-07-26": 22, "..." },
    "counts_by_departure_date": { "2026-08-02": 52, "2026-08-03": 28, "..." },
    "daily_expected_attendance": {
      "2026-07-29": 90,
      "2026-07-30": 93,
      "2026-07-31": 93,
      "2026-08-01": 92,
      "2026-08-02": 89
    },
    "date_range": { "start": "2026-07-29", "end": "2026-08-02" }
  }
}
```

### API Route Test (App Session)

**Endpoint**: `GET /api/admin/stats`

**Prerequisites**: Signed in with Google account ending in `@nj.sgadi.us`

**Expected 200** (authorized):

```json
{
  "success": true,
  "stats": { /* full stats payload */ }
}
```

**Expected 401** (not signed in): `{ "error": "Unauthorized", "message": "Sign in required" }`

**Expected 403** (wrong domain): `{ "error": "Forbidden", "message": "Admin domain (@nj.sgadi.us) required" }`

**Manual verification**:

1. Run `npm run dev`
2. Visit `http://localhost:3000/admin/registrations`
3. Sign in with `@nj.sgadi.us` Google account
4. Click "Test stats" button
5. Verify green success box with stats JSON

---

## Verification Steps

### 4.1 Single Call Returns All Metrics

1. Call `GET /api/admin/stats` (or RPC directly) with valid session
2. **Expected**: JSON with `total_registrations`, `unique_visitors`, `counts_by_ghaam`, `counts_by_mandal`, `counts_by_arrival_date`, `counts_by_departure_date`, `daily_expected_attendance`, `date_range`

### 4.2 Null Handling

- Rows with null `ghaam` or `mandal` appear under "Unknown"
- Rows with null `arrival_date` or `departure_date` are excluded from `daily_expected_attendance`
- No crash when nulls are present

### Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/api/admin/stats` is dynamic (ƒ)

---

## References

- Supabase RPC: [Database Functions](https://supabase.com/docs/guides/database/functions)
- Supabase Postgres best practices: `security-invoker`, explicit `search_path`, RLS
- Plan: `.cursor/plans/registration-admin-dashboard_8e4c088e.plan.md`
