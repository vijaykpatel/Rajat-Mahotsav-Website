# Task 2 Verification: RLS Tightening + Admin Domain Gate

## Completed Work

### 2.1 SQL Migration for RLS Updates

**Migration**: `rls_tighten_registrations_admin_domain` (applied via Supabase MCP)

**Changes**:
- **Removed**: `anon can read` policy (permissive anon SELECT on `public.registrations`)
- **Added**: `admin_domain_select` policy for `authenticated` role:
  - `USING ((select auth.email())::text ilike '%@nj.sgadi.us')`
  - Uses `(select auth.email())` per security-rls-performance: avoids per-row function calls

**Preserved**:
- `Allow anonymous inserts` – anon INSERT (public registration form)
- `anon can update` – public UPDATE
- `daily-cron-job-read` – keep-alive-cron-role SELECT

### 2.2 Reusable Domain-Check Helper

**File**: `lib/admin-auth.ts`

**Exports**:
- `isAllowedAdminDomain(email)` – returns true if email ends with `@nj.sgadi.us` (case-insensitive)
- `isAdminDomainUser(user)` – returns true if user has allowed domain email

**Usage**: `app/admin/registrations/page.tsx` now uses `isAdminDomainUser(user)` instead of inline check.

## Verification Steps

### 2.1 RLS Verification (Supabase MCP execute_sql)

| Test | Role | JWT email | Expected | Result |
|------|------|-----------|----------|--------|
| 1 | `anon` | — | 0 rows | ✓ `anon_row_count: 0` |
| 2 | `authenticated` | `a***@nj.sgadi.us` | 1 row (limited) | ✓ `{id:1, first_name:"V***", email:"..."}` |
| 3 | `authenticated` | `u***@gmail.com` | 0 rows | ✓ `denied_row_count: 0` |

**SQL used** (run via Supabase MCP):

```sql
-- Test 1: anon
SET ROLE anon;
SELECT COUNT(*) AS anon_row_count FROM public.registrations;
RESET ROLE;

-- Test 2: authenticated @nj.sgadi.us
SET ROLE authenticated;
SET request.jwt.claims = '{"email": "a***@nj.sgadi.us", "sub": "test-uuid"}';
SELECT id, first_name, email FROM public.registrations LIMIT 1;
RESET request.jwt.claims;
RESET ROLE;

-- Test 3: authenticated wrong domain
SET ROLE authenticated;
SET request.jwt.claims = '{"email": "u***@gmail.com", "sub": "test-uuid"}';
SELECT COUNT(*) AS denied_row_count FROM public.registrations;
RESET request.jwt.claims;
RESET ROLE;
```

**Manual checks** (optional):

- Public registration still works: `anon` INSERT remains allowed; registration form continues to work

### 2.2 Domain Helper Verification

```ts
import { isAllowedAdminDomain, isAdminDomainUser } from "@/lib/admin-auth"

// Valid domain
isAllowedAdminDomain("a***@nj.sgadi.us")     // true
isAllowedAdminDomain("A***@NJ.SGADI.US")     // true

// Invalid
isAllowedAdminDomain("u***@gmail.com")       // false
isAllowedAdminDomain(null)                    // false
isAllowedAdminDomain(undefined)               // false

isAdminDomainUser({ email: "a***@nj.sgadi.us" })  // true
isAdminDomainUser({ email: "u***@gmail.com" })    // false
isAdminDomainUser(null)                            // false
```

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/admin/registrations` remains dynamic (ƒ)
