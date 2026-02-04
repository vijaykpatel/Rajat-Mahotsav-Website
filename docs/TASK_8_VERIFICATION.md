# Task 8 Verification: CSV Export

## Completed Work

### 8.1 Export Route

**File**: `app/api/registrations/export/route.ts`

- **Auth**: Server checks session via `createClient()` → `getUser()`
- **Domain gate**: `isAdminDomainUser(user)` – only `@nj.sgadi.us` allowed
- **401** if not signed in
- **403** if signed in but wrong domain
- **Cache-Control**: `no-store, max-age=0` per security best practices

### 8.2 Chunked CSV Streaming

- **Keyset pagination**: Uses `id > lastId` (no OFFSET) per `data-pagination` best practices
- **Chunk size**: 500 rows per batch to avoid memory spikes
- **Explicit columns**: `id, first_name, middle_name, last_name, email, mobile_number, phone_country_code, country, ghaam, mandal, arrival_date, departure_date, age` – no `SELECT *`
- **Streaming**: `ReadableStream` with `controller.enqueue()` per chunk
- **Content-Disposition**: `attachment; filename="registrations-YYYY-MM-DDTHHmmss.csv"`
- **CSV escaping**: RFC 4180 – quotes for commas/newlines; doubled quotes for embedded quotes
- **BOM**: `\uFEFF` for Excel UTF-8 compatibility

### Admin UI

**File**: `app/admin/registrations/AdminAuthenticatedView.tsx`

- Added "CSV Export" section with "Export CSV" button
- Links to `/api/registrations/export` – browser triggers download with session cookies
- Styling matches site theme: `preset-deep-navy`, `preset-pale-gray`, `preset-charcoal`

---

## Supabase Read Test Results (Read-Only, No Writes)

### Test 1: 1-Row Read from Registrations (Direct SQL)

**Query** (read-only, no writes):

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
  "ghaam": "R***",
  "mandal": "M***",
  "arrival_date": "2026-07-24",
  "departure_date": "2026-08-01"
}
```

**Status**: Pass – read-only, 1 row returned.

### Test 2: Export Route – Unauthorized (401)

**Endpoint**: `GET /api/registrations/export`

**Command** (no session cookies):

```bash
curl -s http://localhost:3000/api/registrations/export
# {"error":"Unauthorized","message":"Sign in required"}

curl -s -w "\nHTTP_CODE:%{http_code}" http://localhost:3000/api/registrations/export | tail -1
# HTTP_CODE:401
```

**Actual response** (401):

```json
{"error":"Unauthorized","message":"Sign in required"}
```

**Status**: Pass – unauthenticated requests receive 401.

### Test 3: Export Route – Forbidden (403)

**Prerequisite**: Signed in with Google account that does **not** end in `@nj.sgadi.us`

**Expected**: 403 with `{"error":"Forbidden","message":"Admin domain (@nj.sgadi.us) required"}`

**Status**: Manual verification – sign in with non-admin domain and visit export URL.

### Test 4: Export Route – Success (200, CSV stream)

**Prerequisite**: Signed in with `@nj.sgadi.us` Google account

**Expected**:
- 200 OK
- `Content-Type: text/csv; charset=utf-8`
- `Content-Disposition: attachment; filename="registrations-*.csv"`
- `Cache-Control: no-store, max-age=0`
- CSV body with header row and data rows

**Manual verification**:
1. Run `npm run dev`
2. Visit `http://localhost:3000/admin/registrations`
3. Sign in with `@nj.sgadi.us` Google account
4. Click "Export CSV" button
5. Verify CSV file downloads with correct columns and data

---

## Verification Steps

### 8.1 Unauthorized Users

1. **401 (not signed in)**:
   ```bash
   curl -s http://localhost:3000/api/registrations/export
   # {"error":"Unauthorized","message":"Sign in required"}
   ```

2. **403 (wrong domain)**: Sign in with non-`@nj.sgadi.us` account, then visit `/api/registrations/export` – expect 403.

### 8.2 Chunked Streaming

1. Sign in with `@nj.sgadi.us` account
2. Click "Export CSV" on admin page
3. Verify file downloads with timestamped filename
4. Open CSV – verify header row and data; no memory issues for large datasets

---

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/api/registrations/export` is dynamic (ƒ)
