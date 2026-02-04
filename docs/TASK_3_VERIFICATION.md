# Task 3 Verification: Admin Route Gate + Unauthorized UX

## Completed Work

### 3.1 Admin Route and Sign-in Screen

**File**: `app/admin/registrations/page.tsx`

- Server check: `createClient()` → `getUser()` before any data fetch
- If no session: shows Google sign-in via `AdminSignIn` component
- If session + `@nj.sgadi.us`: shows authenticated state with `AdminAuthenticatedView`
- If session + wrong domain: `redirect("/admin/registrations/unauthorized")`
- No data fetched until user is authenticated and domain-valid
- Uses `StandardPageHeader`, `page-bg-extend`, `preset-*` theme classes

### 3.2 Unauthorized State

**Files**:
- `app/admin/registrations/unauthorized/page.tsx` – server page with `force-dynamic`
- `app/admin/registrations/unauthorized/UnauthorizedClient.tsx` – client component

- If authenticated but bad domain: user is redirected to `/admin/registrations/unauthorized`
- Shows "Access Denied" with `StandardPageHeader`
- Countdown timer (5 seconds) before auto-redirect to `/`
- "Return home now" button for immediate redirect
- Styling matches site theme: `page-bg-extend`, `preset-light-gray`, `preset-charcoal`, etc.

### Read-only Supabase Test

**File**: `app/api/admin/test-read/route.ts`

- GET endpoint for Supabase connectivity and RLS verification
- Requires authenticated session with `@nj.sgadi.us` domain
- **Read-only**: `SELECT` 1 row from `public.registrations` (no writes)
- Explicit columns: `id, first_name, last_name, email, ghaam, mandal, arrival_date, departure_date`
- Returns 401 if not signed in, 403 if wrong domain
- Sets `Cache-Control: no-store` per security best practices

**Admin UI**: "Test connection" button on authenticated admin page calls this endpoint and displays result.

---

## Supabase Read Test Results

### Direct SQL (Supabase MCP)

Query executed against `public.registrations`:

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
  "first_name": "H***",
  "last_name": "R***",
  "email": "r***@***.***",
  "ghaam": "R***",
  "mandal": "M***",
  "arrival_date": "2026-07-24",
  "departure_date": "2026-08-01"
}
```

### API Route Test (App Session)

**Endpoint**: `GET /api/admin/test-read`

**Prerequisites**: Signed in with Google account ending in `@nj.sgadi.us`

**Expected 200 response** (when authorized):

```json
{
  "success": true,
  "message": "Read-only test: 1 row from registrations",
  "row": {
    "id": 111,
    "first_name": "H***",
    "last_name": "R***",
    "email": "r***@***.***",
    "ghaam": "R***",
    "mandal": "M***",
    "arrival_date": "2026-07-24",
    "departure_date": "2026-08-01"
  },
  "rowCount": 1
}
```

**Expected 401** (not signed in): `{ "error": "Unauthorized", "message": "Sign in required" }`

**Verified** (curl without session):
```bash
curl -s http://localhost:3001/api/admin/test-read
# {"error":"Unauthorized","message":"Sign in required"}
```

**Expected 403** (wrong domain): `{ "error": "Forbidden", "message": "Admin domain (@nj.sgadi.us) required" }`

**Manual verification**:
1. Run `npm run dev`
2. Visit `http://localhost:3000/admin/registrations`
3. Sign in with `@nj.sgadi.us` Google account
4. Click "Test connection" button
5. Verify green success box with JSON payload containing 1 row

---

## Verification Steps

### 3.1 Unauthenticated User

1. Sign out (or use incognito)
2. Visit `http://localhost:3000/admin/registrations`
3. **Expected**: Sign-in view with "Sign in with Google" button; no registration data fetched

### 3.2 Unauthorized User (Wrong Domain)

1. Sign in with a Google account that does **not** end in `@nj.sgadi.us`
2. Visit `http://localhost:3000/admin/registrations`
3. **Expected**: Redirect to `/admin/registrations/unauthorized`
4. **Expected**: "Access Denied" page with 5-second countdown and "Return home now" button
5. **Expected**: Auto-redirect to `/` after 5 seconds (or immediately if button clicked)

### 3.3 Authorized User

1. Sign in with `@nj.sgadi.us` Google account
2. Visit `http://localhost:3000/admin/registrations`
3. **Expected**: "Registrations Admin" page with authenticated email
4. **Expected**: "Test connection" button; clicking it returns 1 row from registrations (read-only)

---

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/admin/registrations` is dynamic (ƒ)
- `/admin/registrations/unauthorized` is dynamic (ƒ)
- `/api/admin/test-read` is dynamic (ƒ)
