import { z } from "zod"
import { TLDs } from "global-tld-list"

/**
 * Extracts the top-level domain (TLD) from an email address.
 * e.g. "user@example.com" -> "com", "user@mail.example.co.uk" -> "uk"
 */
function extractTld(email: string): string | null {
  const atIndex = email.lastIndexOf("@")
  if (atIndex === -1) return null
  const domain = email.slice(atIndex + 1).toLowerCase()
  const lastDot = domain.lastIndexOf(".")
  if (lastDot === -1) return null
  return domain.slice(lastDot + 1)
}

/**
 * Zod schema for email with TLD validation.
 * Rejects common typos like .clm instead of .com by validating against
 * the IANA list of valid top-level domains.
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .refine(
    (email) => {
      const tld = extractTld(email)
      if (!tld) return false
      return TLDs.isValid(tld)
    },
    {
      message:
        "Please check your email domain (e.g. use .com not .clm). Enter a valid email address.",
    }
  )
