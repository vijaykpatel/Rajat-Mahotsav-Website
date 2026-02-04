# Registration Admin Dashboard - Detailed Task List

Source plan: `.cursor/plans/registration-admin-dashboard_8e4c088e.plan.md`

## Task List (Ordered)

### 1) Supabase Auth + Server Client Foundation
**Goal**: Ensure server-side session access and Google OAuth configuration.

1.1 **Configure Supabase Google OAuth**
- **Scope**: Supabase project settings.
- **Work**: Enable Google provider, set redirect URLs for local and prod app domains.
- **Verify**: OAuth flow completes and returns a Supabase session.

1.2 **Create server-side Supabase client**
- **Code**: `utils/supabase/server.ts`
- **Work**: Implement server client using `@supabase/ssr` (or equivalent) reading cookies.
- **Verify**: Server component can read current session without client JS.

**Depends on**: none  
**Blocks**: 2, 3, 5

---

### 2) RLS Tightening + Admin Domain Gate
**Goal**: Lock down registrations to only authenticated `@nj.sgadi.us`.

2.1 **Write SQL migration for RLS updates**
- **Scope**: Supabase SQL migration.
- **Work**:
  - Remove permissive `anon SELECT` policy on `public.registrations`.
  - Add `SELECT` policy for authenticated users with `email LIKE '%@nj.sgadi.us'`.
  - Keep `INSERT` for `anon`; keep existing `anon UPDATE`.
- **Verify**:
  - `anon` cannot read registrations.
  - Authenticated `@nj.sgadi.us` can read.

2.2 **Create reusable domain-check helper**
- **Code**: new server helper (e.g., `lib/admin-auth.ts` or in `utils/supabase/server.ts`).
- **Work**: Check session user email ends with `@nj.sgadi.us`.
- **Verify**: Invalid domain returns false for auth users.

**Depends on**: 1.2  
**Blocks**: 3, 5

---

### 3) Admin Route Gate + Unauthorized UX
**Goal**: Secure `/admin/registrations` and add access-required / unauthorized states.

3.1 **Add admin route and sign-in screen**
- **Code**: `app/admin/registrations/page.tsx`
- **Work**: Server check session; show Google sign-in if no session.
- **Verify**: Unauthenticated user sees sign-in view; no data fetched.

3.2 **Add unauthorized state**
- **Code**: `app/admin/registrations/unauthorized/page.tsx` or inline.
- **Work**: If authenticated but bad domain, show message and redirect to `/` after a timeout.
- **Verify**: Auth user with non-matching domain gets denied UI and redirect.

**Depends on**: 1.2, 2.2  
**Blocks**: 4, 5, 7

---

### 4) Stats / Insights Backend (RPC or Server Route)
**Goal**: Provide aggregated stats without client refetch.

4.1 **Create SQL function or server endpoint for stats**
- **Scope**: Supabase SQL (RPC) or Next server route.
- **Work**:
  - Total registrations.
  - Unique visitors (composite of fields).
  - Counts by `ghaam`, `mandal`.
  - Counts by `arrival_date`, `departure_date`.
  - Daily expected attendance (cumulative by date range).
- **Verify**: Single call returns JSON payload with all metrics.

4.2 **Handle nulls and invalid dates**
- **Work**: Group nulls as “Unknown”; skip invalid dates in range calcs.
- **Verify**: Stats endpoint works with null fields; no crash.

**Depends on**: 2.1  
**Blocks**: 6

---

### 5) Denied-Domain Logging
**Goal**: Audit rejected admin access attempts.

5.1 **Create `admin_access_denied` table**
- **Scope**: Supabase SQL.
- **Fields**: `email`, `full_name`, `provider`, `attempted_at`, `user_agent`, `ip` (if available).
- **Verify**: Table exists; inserts succeed.

5.2 **Insert log on domain rejection**
- **Code**: server-only path in admin route.
- **Work**: When session exists but domain invalid, insert row before redirect.
- **Verify**: Log entry created for denied access.

**Depends on**: 1.2, 2.2, 3.2  
**Blocks**: none

---

### 6) Admin Dashboard UI (Stats + Charts)
**Goal**: Build consistent UI with site theme and insights-first layout.

6.1 **Create stats view layout**
- **Code**: `app/admin/registrations/page.tsx` or components.
- **Work**: Use `StandardPageHeader`, `standard-page-title`, `page-header-spacing`.
- **Verify**: Visual matches existing site theme.

6.2 **Render charts with `recharts`**
- **Work**: Bar/line charts for arrivals, departures, cumulative attendance.
- **Verify**: Charts render using stats payload with no client refetch.

**Depends on**: 4.1  
**Blocks**: 8

---

### 7) Paginated Table (Lazy Load)
**Goal**: Avoid heavy load; only fetch table on demand.

7.1 **Add “Load registrations” button**
- **Work**: Table data remains empty until user opts in.
- **Verify**: Initial admin page load does not query rows.

7.2 **Implement pagination**
- **Work**:
  - Page size 25/50/100.
  - Keyset or range pagination ordered by `id` desc.
  - Select explicit columns only.
- **Verify**: Page controls update table; stats remain unchanged.

**Depends on**: 3.1, 2.1  
**Blocks**: 8

---

### 8) CSV Export
**Goal**: Secure full dataset export in chunks.

8.1 **Add export route**
- **Code**: `app/api/registrations/export/route.ts`
- **Work**: Server checks session + domain before export.
- **Verify**: Unauthorized users get 401/403.

8.2 **Chunked CSV streaming**
- **Work**: Stream dataset in chunks; set `Content-Disposition` with timestamp filename.
- **Verify**: Large exports succeed without memory spikes.

**Depends on**: 1.2, 2.2  
**Blocks**: 9

---

### 9) Indexing + Performance Hardening
**Goal**: Scale stats and pagination.

9.1 **Add indexes**
- **Work**: Add indexes for `arrival_date`, `departure_date`, `ghaam`, `mandal`, `age`, `email`, `mobile_number`.
- **Verify**: Migration completes; query plans show index usage.

9.2 **No-store headers on private data**
- **Work**: Add `cache-control: no-store` for admin routes and export.
- **Verify**: Response headers contain `no-store`.

**Depends on**: 4.1, 7.2, 8.1  
**Blocks**: 10

---

### 10) UX Edge Cases + Sign-out Handling
**Goal**: Clean UX and correct state resets.

10.1 **Null/Unknown handling in UI**
- **Work**: Show “Unknown” bucket for missing values.
- **Verify**: Charts/tables do not break on nulls.

10.2 **Sign-out resets admin view**
- **Work**: Clear table data and return to sign-in UI.
- **Verify**: After sign-out, no private data visible.

**Depends on**: 6, 7  
**Blocks**: none
