/**
 * Admin domain gate: only @nj.sgadi.us emails are allowed admin access.
 * Used by server-side admin routes and API handlers.
 */

const ALLOWED_DOMAIN = "@nj.sgadi.us"

/**
 * Checks if the given email is allowed for admin access.
 * @param email - User email (e.g. from session.user.email)
 * @returns true if email ends with @nj.sgadi.us (case-insensitive), false otherwise
 */
export function isAllowedAdminDomain(email: string | null | undefined): boolean {
  if (!email || typeof email !== "string") return false
  return email.toLowerCase().endsWith(ALLOWED_DOMAIN.toLowerCase())
}

/**
 * Type for objects with an optional email property (e.g. Supabase User).
 */
type WithEmail = { email?: string | null }

/**
 * Checks if the given user has an allowed admin domain email.
 * @param user - User object with optional email (e.g. from session.user)
 * @returns true if user exists and email ends with @nj.sgadi.us, false otherwise
 */
export function isAdminDomainUser(user: WithEmail | null | undefined): boolean {
  return isAllowedAdminDomain(user?.email)
}
