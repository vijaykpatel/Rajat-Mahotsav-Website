# Task 5 Verification: Denied-Domain Logging

## Completed Work

### 5.1 Create `admin_access_denied` table

**Migration**: Applied via Supabase MCP

- **Table**: `public.admin_access_denied`
- **Columns**:
  - `id` bigint generated always as identity primary key
  - `email` text not null
  - `full_name` text
  - `provider` text
  - `attempted_at` timestamptz not null default now()
  - `user_agent` text
  - `ip` text
- **RLS**: Enabled; no policies for anon/authenticated (only service_role can insert/read)
- **Best practices**: `schema-primary-keys` (bigint identity), `security-rls-basics` (RLS enabled)

### 5.2 Insert log on domain rejection

**Files**:
- `utils/supabase/admin.ts` – Server-only Supabase client using `SUPABASE_SERVICE_ROLE_KEY`
- `lib/admin-access-log.ts` – `logAdminAccessDenied(user, requestContext)` helper
- `app/admin/registrations/page.tsx` – Calls `logAdminAccessDenied` before redirect when domain invalid

**Flow**:
1. User is authenticated but email does not end with `@nj.sgadi.us`
2. Server reads `user-agent` and `x-forwarded-for`/`x-real-ip` from request headers
3. `logAdminAccessDenied` inserts row into `admin_access_denied` via admin client
4. Redirect to `/admin/registrations/unauthorized`

**Environment**: Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (from Supabase Dashboard → Settings → API → service_role key). Required for denied-domain logging.

---

## Supabase Read Test Results (Read-Only, Limit 1 Row)

### Direct SQL (Supabase MCP)

**Query 1 – `public.registrations`**:

```sql
SELECT id, first_name, last_name, email, ghaam, mandal, arrival_date, departure_date
FROM public.registrations
ORDER BY id DESC
LIMIT 1;
```

**Result** (1 row):

```json
{
  "id": 111,
  "first_name": "Het",
  "last_name": "Raval",
  "email": "ravalhet43@gmail.com",
  "ghaam": "Ranasan",
  "mandal": "Maninagar",
  "arrival_date": "2026-07-24",
  "departure_date": "2026-08-01"
}
```

**Query 2 – `public.admin_access_denied`**:

```sql
SELECT id, email, full_name, provider, attempted_at, user_agent, ip
FROM public.admin_access_denied
ORDER BY id DESC
LIMIT 1;
```

**Result**: `[]` (empty – no denied attempts yet; table exists and is readable)

### API Route Tests (Read-Only)

**Endpoint 1**: `GET /api/admin/test-read` (registrations)

- Requires: Authenticated session with `@nj.sgadi.us`
- Action: Reads 1 row from `public.registrations`
- No writes

**Endpoint 2**: `GET /api/admin/test-read-denied-log` (admin_access_denied)

- Requires: Authenticated session with `@nj.sgadi.us`
- Action: Reads 1 row from `public.admin_access_denied` via admin client
- No writes

**Expected 200** (when authorized):

```json
{
  "success": true,
  "message": "Read-only test: 1 row from admin_access_denied",
  "row": null,
  "rowCount": 0
}
```

(When rows exist, `row` will contain the latest denied attempt.)

**Verified 401** (not signed in):

```bash
curl -s http://localhost:3000/api/admin/test-read-denied-log
# {"error":"Unauthorized","message":"Sign in required"}

curl -s http://localhost:3000/api/admin/test-read
# {"error":"Unauthorized","message":"Sign in required"}
```

**Expected 403** (wrong domain): `{ "error": "Forbidden", "message": "Admin domain (@nj.sgadi.us) required" }`

**Expected 500** (missing `SUPABASE_SERVICE_ROLE_KEY`): `{ "error": "Admin client not configured", "hint": "Set SUPABASE_SERVICE_ROLE_KEY in .env.local" }`

---

## Verification Steps

### 5.1 Table exists

1. Supabase Dashboard → Table Editor → `admin_access_denied` exists
2. Or run MCP SQL: `SELECT 1 FROM public.admin_access_denied LIMIT 1` (no error)

### 5.2 Log on domain rejection

1. Sign in with a Google account that does **not** end in `@nj.sgadi.us`
2. Visit `http://localhost:3000/admin/registrations`
3. **Expected**: Redirect to `/admin/registrations/unauthorized`
4. In Supabase: `SELECT * FROM admin_access_denied ORDER BY id DESC LIMIT 1`
5. **Expected**: New row with your email, full_name, provider, attempted_at, user_agent, ip

### 5.3 Read tests (no writes)

1. Sign in with `@nj.sgadi.us` account
2. Visit `/admin/registrations`
3. Click **Test connection** → 1 row from registrations
4. Click **Test denied log** → 1 row from admin_access_denied (or `row: null` if empty)

---

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/admin/registrations` is dynamic (ƒ)
- `/api/admin/test-read-denied-log` is dynamic (ƒ)
