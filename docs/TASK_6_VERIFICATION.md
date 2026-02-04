# Task 6 Verification: Admin Dashboard UI (Stats + Charts)

## Completed Work

### 6.1 Stats View Layout

**Files**:
- `app/admin/registrations/page.tsx` – Server component fetches stats via RPC, passes to dashboard
- `app/admin/registrations/AdminDashboardStats.tsx` – Client component with stats layout
- `app/admin/registrations/types.ts` – TypeScript types for stats payload

**Layout**:
- Uses `StandardPageHeader`, `standard-page-title`, `page-header-spacing` (via page structure)
- Theme: `preset-deep-navy`, `preset-light-gray`, `preset-charcoal`, `preset-pale-gray`, `preset-red`
- Summary cards: Total Registrations, Unique Visitors, Date Range, Peak Daily Attendance
- Responsive grid layout with `max-w-6xl mx-auto`

### 6.2 Charts with Recharts

**Charts**:
1. **Arrivals by Date** – Bar chart (preset-deep-navy)
2. **Departures by Date** – Bar chart (preset-red)
3. **Daily Expected Attendance (Cumulative)** – Line chart (preset-deep-navy)
4. **Top Ghaam** – Ranked list (top 8)
5. **Top Mandal** – Ranked list (top 8)

**Data flow**:
- Stats fetched server-side in `page.tsx` via `supabase.rpc("get_registrations_stats", ...)`
- Single RPC call; no client refetch on load
- Uses `REGISTRATION_DATE_RANGE` from `lib/registration-date-range.ts`

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

**Result** (1 row, PII redacted):
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

**Status**: ✅ Pass – Read succeeded, 1 row returned.

### Test 2: Stats RPC

**Query**:
```sql
SELECT public.get_registrations_stats('2026-07-29'::date, '2026-08-02'::date) AS stats;
```

**Result** (summary):
```json
{
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
```

**Status**: ✅ Pass – RPC returned full stats payload.

### Test 3: API Routes (Manual)

**Endpoints**:
- `GET /api/admin/test-read` – 1 row from registrations (requires `@nj.sgadi.us` session)
- `GET /api/admin/stats` – Stats RPC (requires `@nj.sgadi.us` session)

**Verification**:
1. Run `npm run dev`
2. Visit `http://localhost:3000/admin/registrations`
3. Sign in with `@nj.sgadi.us` Google account
4. Dashboard loads with stats cards and charts
5. No client refetch – stats rendered from server-passed props

---

## Foundation Verification (Task 1)

### Server Client (`utils/supabase/server.ts`)

- Uses `@supabase/ssr` `createServerClient`
- Reads session from cookies via `next/headers` `cookies()`
- Throws if env vars missing

### Auth Flow

- Admin page checks `supabase.auth.getUser()` server-side
- Domain gate: `isAdminDomainUser(user)` for `@nj.sgadi.us`
- Unauthorized users redirected to `/admin/registrations/unauthorized`

---

## Verification Checklist

- [x] 6.1 Stats view layout uses StandardPageHeader, theme classes
- [x] 6.2 Charts render (arrivals, departures, daily attendance, top ghaam/mandal)
- [x] Stats fetched server-side, no client refetch
- [x] Supabase 1-row read test (read-only)
- [x] Stats RPC test (read-only)
- [x] No writes to any table during tests

---

## References

- Plan: `.cursor/plans/registration-admin-dashboard_8e4c088e.plan.md`
- Task list: `.cursor/plans/registration-admin-dashboard_tasks.md`
- Stats RPC: `docs/migrations/add_registrations_stats_rpc.sql`
- Task 4 verification: `docs/TASK_4_VERIFICATION.md`
