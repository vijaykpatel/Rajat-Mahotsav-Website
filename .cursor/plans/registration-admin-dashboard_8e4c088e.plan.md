---
name: registration-admin-dashboard
overview: Add a private, Google-authenticated admin dashboard for registrations with strong RLS gating, server-side insights, paginated data browsing, CSV export, and denied-domain logging while keeping the site’s visual style consistent.
todos:
  - id: auth-rls
    content: Add Google auth, tighten RLS for read access
    status: pending
  - id: stats-api
    content: Build server-side stats + cumulative attendance
    status: pending
  - id: admin-ui
    content: Build admin UI + charts + lazy table
    status: pending
  - id: deny-log
    content: Add denied-domain logging table + flow
    status: pending
  - id: csv-export
    content: Implement CSV export route + button
    status: pending
isProject: false
---

# Private Registration Dashboard Plan

## Context Summary

- The registration data lives in Supabase table `public.registrations` with columns: `first_name`, `middle_name`, `last_name`, `email`, `mobile_number`, `ghaam`, `mandal`, `arrival_date`, `departure_date`, `age`, `country`, `phone_country_code`.
- RLS is enabled but there are permissive policies allowing `anon` to `SELECT` and `UPDATE`, which currently exposes the data.
- Auth requirement: Google sign-in; allow only emails ending in `@nj.sgadi.us`.
- Domain-only validation is required; no allowlist.

## Feature Overview

- **Private admin portal** at `/admin/registrations` with Google sign-in and domain-only access.
- **Server-rendered stats dashboard** (no client refetch on table pagination).
- **Insights-first view** with arrivals/departures/cumulative attendance and top ghaam/mandal.
- **Lazy-loaded data table** with pagination and page size controls.
- **CSV export** for full dataset downloads.
- **Denied-domain logging** for auditing rejected access attempts.

## Plan

1. **Security & Auth (Supabase + Next.js)**
  - Enable Google OAuth in Supabase project; configure the redirect URLs to the app domain(s).
  - Add server-side Supabase auth support (e.g. `@supabase/ssr`) and create a server client utility (new `utils/supabase/server.ts`) to read the session from cookies.
  - Gate a new admin route (proposed `/admin/registrations`) using server-side session checks. If not signed in, show a sign-in screen; if signed in but domain invalid, show an unauthorized page with a timed redirect to `/`.
  - **Tighten RLS** on `public.registrations`:
    - Remove/replace the permissive `anon can read` policy.
    - Add `SELECT` policy for authenticated users whose email ends with `@nj.sgadi.us`.
    - Keep `INSERT` policy for `anon` so public registration continues.
    - Keep existing `anon` UPDATE policy for now.
  - Use Supabase best practices for security and RLS (`security-*` rules).
2. **Admin Dashboard UX & Theme Consistency**
  - Build `app/admin/registrations/page.tsx` and reuse the existing `StandardPageHeader` and theme classes from the site to keep consistent typography/spacing (e.g. `standard-page-title`, `page-header-spacing`).
  - Provide a minimal “Access required” view (Google sign-in button) before loading any data.
  - Provide a dedicated `app/admin/registrations/unauthorized/page.tsx` or inline state to explain the access restriction and redirect to `/`.
3. **Insights-first Dashboard (server-side, aggregated queries)**
  - Create a server endpoint or RPC for dashboard stats that returns:
    - Total registrations.
    - Unique visitor count based on the combined fields: `first_name`, `last_name`, `email`, `mobile_number`, `age` (dedupe by this composite).
    - Counts by `ghaam` and by `mandal`.
    - Counts by `arrival_date` and by `departure_date`.
    - **Daily expected attendance (cumulative)**: for each event date, count rows where `arrival_date <= date` AND `departure_date >= date`.
  - Implement with efficient SQL (single RPC returning a JSON payload) to minimize round-trips and avoid fetching raw rows unnecessarily.
  - For charts, use existing `recharts` dependency to render bar/line charts (e.g., arrivals, departures, in-house cumulative).
4. **Paginated Table (lazy-loaded)**
  - Do **not** load rows by default. Provide a “Load registrations” button to fetch the first page on demand.
  - Add pagination controls with selectable page sizes (25/50/100) and use keyset or range pagination ordered by `id` (descending).
  - Use Supabase `select` with explicit columns only and optional total count for pagination.
  - Pagination should only refresh the table area; dashboard stats remain cached in memory and are not re-fetched on page changes.
5. **CSV Export (full dataset)**
  - Add `app/api/registrations/export/route.ts` to stream a CSV export of the table.
  - The route should validate the user’s session and domain on the server, then query data in chunks to avoid memory spikes.
  - Return `Content-Disposition: attachment` with a timestamped filename.
6. **Performance & Indexing (Supabase best practices)**
  - Add indexes to support filters/aggregates: `arrival_date`, `departure_date`, `ghaam`, `mandal`, `age`, `email`, `mobile_number` (prioritize those used in GROUP BY and range checks).
  - Avoid `SELECT *` and avoid large offsets where possible (use keyset pagination for scalability).
  - Add `cache-control: no-store` for private data routes.
7. **Denied-domain logging**
  - Add a `admin_access_denied` table with fields like `email`, `full_name`, `provider`, `attempted_at`, `user_agent`, `ip` (if available server-side).
  - Insert a record when a signed-in user fails the domain check before redirecting.
  - Ensure this insert is server-side only and not exposed to clients.
8. **Edge cases & UX hardening**
  - Handle missing/invalid date fields gracefully in stats.
  - Ensure `null` values are grouped into an “Unknown” bucket.
  - When the user signs out, clear the table view and return to the sign-in state.

## Key Files / Areas

- Registration insert logic: `[/Users/vijay/Developer/Rajat-Mahotsav-Website/app/registration/page.tsx](/Users/vijay/Developer/Rajat-Mahotsav-Website/app/registration/page.tsx)`
- Supabase client: `[/Users/vijay/Developer/Rajat-Mahotsav-Website/utils/supabase/client.ts](/Users/vijay/Developer/Rajat-Mahotsav-Website/utils/supabase/client.ts)`
- New admin UI: `app/admin/registrations/page.tsx`
- New unauthorized view: `app/admin/registrations/unauthorized/page.tsx` (or inline state)
- New server route: `app/api/registrations/export/route.ts`
- New server auth helper: `utils/supabase/server.ts`
- Supabase SQL migration for RLS + indexes

## Decisions / Assumptions (can adjust)

- Use `public.registrations` as the primary table (not `registrations_dev`).
- Domain-only gating (`@nj.sgadi.us`) without explicit allowlist.
- Default age buckets: 0–12, 13–17, 18–24, 25–34, 35–44, 45–54, 55–64, 65+.
- Admin route: `/admin/registrations`.

## Open questions (if you want to change)

- None at this time.

