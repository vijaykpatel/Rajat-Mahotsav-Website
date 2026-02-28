/**
 * Mandal options used in registration form dropdowns.
 * Stored format: display.toLowerCase().replace(/ /g, '-') (e.g. "New Jersey" → "new-jersey")
 *
 * @see app/registration/page.tsx (getMandals)
 */

const MANDAL_OPTIONS_BY_COUNTRY: Record<string, string[]> = {
  england: ["Bolton", "London"],
  usa: [
    "Alabama",
    "California",
    "Chicago",
    "Delaware",
    "Georgia",
    "Horseheads",
    "Kentucky",
    "New Jersey",
    "Ocala",
    "Ohio",
    "Seattle",
    "Tennessee",
    "Virginia",
  ],
}

/** Fixed mandals for india, australia, canada, kenya (country selects mandal) */
const SPECIAL_COUNTRY_MANDALS: Record<string, string> = {
  india: "Maninagar",
  australia: "Perth",
  canada: "Toronto",
  kenya: "Nairobi",
}

/** Build stored → display map from all mandal options */
function buildStoredToDisplayMap(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const mandals of Object.values(MANDAL_OPTIONS_BY_COUNTRY)) {
    for (const m of mandals) {
      map[toStoredValue(m)] = m
    }
  }
  for (const display of Object.values(SPECIAL_COUNTRY_MANDALS)) {
    map[toStoredValue(display)] = display
  }
  return map
}

function toStoredValue(display: string): string {
  return display.toLowerCase().replace(/ /g, "-")
}

const STORED_TO_DISPLAY = buildStoredToDisplayMap()

/**
 * Converts a stored mandal value (e.g. "new-jersey") back to display form (e.g. "New Jersey").
 * Returns the original value if no mapping exists (e.g. legacy, "Unknown", or custom values).
 */
export function mandalStoredToDisplay(
  stored: string | null | undefined
): string {
  if (!stored || typeof stored !== "string") return "—"
  const trimmed = stored.trim()
  if (!trimmed) return "—"
  return STORED_TO_DISPLAY[trimmed.toLowerCase()] ?? trimmed
}

/** All mandal values in stored format for filter dropdowns (e.g. "new-jersey") */
export function getAllMandalOptionsStored(): string[] {
  const stored = new Set<string>()
  for (const mandals of Object.values(MANDAL_OPTIONS_BY_COUNTRY)) {
    for (const m of mandals) {
      stored.add(toStoredValue(m))
    }
  }
  for (const display of Object.values(SPECIAL_COUNTRY_MANDALS)) {
    stored.add(toStoredValue(display))
  }
  return Array.from(stored).sort()
}

export { MANDAL_OPTIONS_BY_COUNTRY, SPECIAL_COUNTRY_MANDALS }
