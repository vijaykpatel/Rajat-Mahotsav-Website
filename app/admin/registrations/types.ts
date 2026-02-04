/**
 * Stats payload from get_registrations_stats RPC.
 * @see docs/migrations/add_registrations_stats_rpc.sql
 */
export interface RegistrationsStats {
  total_registrations: number
  unique_visitors: number
  counts_by_ghaam: Record<string, number>
  counts_by_mandal: Record<string, number>
  counts_by_arrival_date: Record<string, number>
  counts_by_departure_date: Record<string, number>
  daily_expected_attendance: Record<string, number>
  date_range: { start: string; end: string }
}

/** Chart data point for arrivals/departures by date */
export interface DateCountPoint {
  date: string
  count: number
  label: string
}

/** Chart data point for daily attendance */
export interface DailyAttendancePoint {
  date: string
  attendance: number
  label: string
}
