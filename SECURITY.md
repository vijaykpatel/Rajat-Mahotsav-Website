# Security Policy

## Security Status

This repository has undergone a security audit. Critical vulnerabilities have been addressed, but there are still recommended improvements before deploying to production.

## Fixed Security Issues

✅ **SSRF Vulnerability (CRITICAL)** - Fixed in `app/api/download/route.ts`
- Added URL allowlist validation
- Implemented HTTPS-only enforcement
- Added private IP range blocking
- Implemented file size limits and timeouts

✅ **XSS Vulnerability (HIGH)** - Fixed in `components/organisms/standard-page-header.tsx`
- Removed `dangerouslySetInnerHTML` usage
- Sanitized all user input rendering

✅ **Information Disclosure (MEDIUM)** - Fixed in multiple files
- Removed sensitive console.log statements
- Cleaned up PII logging in registration forms

✅ **Security Headers (MEDIUM)** - Added in `next.config.mjs`
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy configured

## Remaining Security Recommendations

### HIGH PRIORITY (Before Production Deployment)

#### 1. Authentication & Authorization
**Status:** ⚠️ Not Implemented

All API routes are currently unauthenticated:
- `/api/generate-upload-ursl`
- `/api/generate-cs-personal-submision-upload-urls`
- `/api/download`

**Recommendation:**
```typescript
// Example middleware for authentication
export async function middleware(request: NextRequest) {
  // Implement session validation
  // Add rate limiting
  // Verify user permissions
}
```

#### 2. Supabase Row Level Security (RLS)
**Status:** ⚠️ Unknown (Verify in Supabase Dashboard)

Tables requiring RLS policies:
- `registrations`
- `spiritual_seva_submission`
- `community_seva_records`
- `personal_seva_submission`

**Recommendation:**
- Enable RLS on all tables in Supabase
- Create policies to restrict read/write access
- Test policies thoroughly before production

#### 3. Rate Limiting
**Status:** ⚠️ Not Implemented

**Recommendation:**
```typescript
// Using Vercel Rate Limiting or similar
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})
```

#### 4. File Upload Security
**Status:** ⚠️ Partially Implemented

Current issues:
- Client-controlled content-type
- No server-side file validation
- No malware scanning

**Recommendation:**
- Validate file magic bytes server-side
- Implement file type allowlist
- Add virus scanning (e.g., ClamAV)
- Randomize uploaded filenames
- Set strict file size limits

#### 5. CSRF Protection
**Status:** ⚠️ Not Implemented

**Recommendation:**
```typescript
// Add CSRF tokens to all forms
// Verify tokens in API routes
// Use SameSite cookie attributes
```

### MEDIUM PRIORITY

#### 6. Input Validation
**Status:** ⚠️ Client-side Only

Current validation uses Zod schemas client-side only.

**Recommendation:**
- Duplicate all Zod validations in API routes
- Never trust client-side validation
- Sanitize all inputs before database insertion

#### 7. Content Security Policy (CSP)
**Status:** ⚠️ Not Implemented

**Recommendation:**
Add CSP header to `next.config.mjs`:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; ..."
}
```

Note: Requires careful configuration due to external resources (Cloudflare CDN, Supabase, etc.)

#### 8. Environment Variables
**Status:** ✅ Properly Configured

Good practices in place:
- `.env` files in `.gitignore`
- `.env.local` used for local secrets (gitignored)
- No hardcoded secrets found

**Recommendation:**
- Rotate R2 credentials regularly
- Use different credentials for dev/staging/prod
- Consider using secret management service

### LOW PRIORITY

#### 9. Dependency Security
**Status:** ⚠️ Unknown

**Recommendation:**
```bash
# Regularly check for vulnerabilities
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

#### 10. Build Configuration
**Status:** ⚠️ Warnings Ignored

Current settings ignore TypeScript and ESLint errors:
```javascript
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true },
```

**Recommendation:**
- Fix all TypeScript errors
- Enable linting
- Address all warnings

## SQL Injection Protection

**Status:** ✅ Protected by Supabase SDK

All database queries use Supabase SDK with parameterized queries, which prevents SQL injection.

**Important:** Never use raw SQL queries or concatenate user input into queries.

## Data Privacy

**Status:** ⚠️ Needs Attention

The application collects Personally Identifiable Information (PII):
- Names, email addresses, phone numbers
- Location data (country, mandal)
- Religious activity information

**Recommendations:**
1. Add Privacy Policy page
2. Implement GDPR compliance measures
3. Add user data deletion capability
4. Implement data retention policies
5. Add cookie consent banner if using cookies
6. Encrypt sensitive data at rest

## Security Testing

Before going to production, perform:

1. **Penetration Testing**
   - Test all API endpoints
   - Attempt SQL injection, XSS, CSRF
   - Test file upload security
   - Verify authentication bypasses

2. **Dependency Audit**
   ```bash
   npm audit
   ```

3. **Static Analysis**
   ```bash
   npm run lint
   # Consider adding: ESLint security plugins
   ```

4. **Manual Code Review**
   - Review all API routes
   - Check for hardcoded secrets
   - Verify input validation
   - Review error handling

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [your-email]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Checklist for Production

Before making the repository public and deploying:

- [x] Fix SSRF vulnerability
- [x] Fix XSS vulnerability
- [x] Remove sensitive logging
- [x] Add security headers
- [x] Use .env.local for local secrets
- [ ] Implement authentication on API routes
- [ ] Configure Supabase RLS policies
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Add server-side input validation
- [ ] Add file upload validation
- [ ] Configure Content Security Policy
- [ ] Add Privacy Policy
- [ ] Run security testing
- [ ] Fix all TypeScript/ESLint errors
- [ ] Update dependencies (`npm audit`)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Cloudflare R2 Security](https://developers.cloudflare.com/r2/security/)

## Last Security Audit

- **Date:** 2026-01-26
- **Audited By:** Automated security scan
- **Critical Issues Found:** 2 (Fixed)
- **High Severity Issues:** 5 (2 Fixed, 3 Recommendations)
- **Medium Severity Issues:** 4 (2 Fixed, 2 Recommendations)

---

**Note:** This is a portfolio project. While security improvements have been made, it should not be deployed to production without implementing all recommended security measures above.
