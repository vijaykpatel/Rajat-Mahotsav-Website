/**
 * Registration form date range - matches the selectable options in the date picker.
 * Used by admin stats API defaults and registration-date-picker min/max.
 *
 * @see components/molecules/registration-date-picker.tsx (minValue, maxValue)
 */
export const REGISTRATION_DATE_RANGE = {
  /** Earliest selectable arrival date (YYYY-MM-DD) */
  start: "2026-07-23",
  /** Latest selectable departure date (YYYY-MM-DD) */
  end: "2026-08-08",
} as const
