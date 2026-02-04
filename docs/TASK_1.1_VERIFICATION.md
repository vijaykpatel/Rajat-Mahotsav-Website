# Task 1.1 Verification: Supabase Google OAuth + Server Client Foundation

## Completed Work

### 1. Server-side Supabase client (`utils/supabase/server.ts`)
- Uses `@supabase/ssr` `createServerClient`
- Reads session from cookies via `next/headers` `cookies()`
- Supports both `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Throws if env vars missing (server-only)

### 2. Browser Supabase client (`utils/supabase/client.ts`)
- Migrated from `@supabase/supabase-js` to `@supabase/ssr` `createBrowserClient`
- Uses cookies for auth (SSR-compatible)
- Placeholder values for build when env missing (no throw)

### 3. Auth callback route (`app/auth/callback/route.ts`)
- Exchanges OAuth `code` for session via `exchangeCodeForSession`
- Redirects to `next` param or `/`
- Handles `x-forwarded-host` for production

### 4. Middleware (`middleware.ts` + `utils/supabase/middleware.ts`)
- Calls `getClaims()` to refresh session and sync cookies
- Sets `Cache-Control: no-store` for `/admin` routes

### 5. Admin sign-in page (`app/admin/registrations/page.tsx`)
- Server check: `createClient()` → `getUser()`
- If no session: shows Google sign-in button
- If session + `@nj.sgadi.us`: shows authenticated state
- If session + wrong domain: redirects to `/admin/registrations/unauthorized`

### 6. Documentation
- `docs/SUPABASE_GOOGLE_OAUTH_SETUP.md` – dashboard config steps

## Verification Steps

1. **Prerequisites**
   - Configure Google OAuth in Supabase (see `docs/SUPABASE_GOOGLE_OAUTH_SETUP.md`)
   - Add redirect URLs in Supabase: `http://localhost:3000/auth/callback`, `https://njrajatmahotsav.com/auth/callback`
   - `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and key

2. **Run dev server**
   ```bash
   npm run dev
   ```

3. **Test OAuth flow**
   - Visit `http://localhost:3000/admin/registrations`
   - Click "Sign in with Google"
   - Complete Google consent
   - Should redirect to `/admin/registrations` with session

4. **Verify session**
   - Page shows "Authenticated as {email}"
   - DevTools → Application → Cookies: `sb-*-auth-token` present

5. **Verify server-side session**
   - Disable JavaScript and reload `/admin/registrations`
   - If previously signed in, page should still show authenticated state (server reads cookies)

## Build Verification

```bash
npm run build
```

- Build succeeds (exit 0)
- `/admin/registrations` is dynamic (ƒ)
- `/auth/callback` is dynamic (ƒ)
