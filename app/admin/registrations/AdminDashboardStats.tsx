"use client"

import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import type { RegistrationsStats } from "./types"
import { format } from "date-fns"

function formatShortDate(iso: string): string {
  if (!iso || iso === "Unknown") return iso
  try {
    const d = new Date(iso + "T12:00:00")
    if (Number.isNaN(d.getTime())) return iso
    return format(d, "MMM d")
  } catch {
    return iso
  }
}

function objToSortedChartData(
  obj: Record<string, number>,
  excludeUnknown = false
): { date: string; count: number; label: string }[] {
  return Object.entries(obj)
    .filter(([k]) => !excludeUnknown || k !== "Unknown")
    .map(([date, count]) => ({
      date,
      count,
      label: formatShortDate(date),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

function objToTopItems(
  obj: Record<string, number>,
  limit: number
): { name: string; count: number }[] {
  return Object.entries(obj)
    .filter(([k]) => k !== "Unknown")
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

interface AdminDashboardStatsProps {
  stats: RegistrationsStats
  userEmail: string
}

export function AdminDashboardStats({ stats, userEmail }: AdminDashboardStatsProps) {
  const router = useRouter()

  const arrivalsData = useMemo(
    () => objToSortedChartData(stats.counts_by_arrival_date),
    [stats.counts_by_arrival_date]
  )
  const departuresData = useMemo(
    () => objToSortedChartData(stats.counts_by_departure_date),
    [stats.counts_by_departure_date]
  )
  const dailyAttendanceData = useMemo(
    () =>
      objToSortedChartData(stats.daily_expected_attendance, true).map((d) => ({
        ...d,
        attendance: d.count,
      })),
    [stats.daily_expected_attendance]
  )
  const topGhaam = useMemo(
    () => objToTopItems(stats.counts_by_ghaam, 8),
    [stats.counts_by_ghaam]
  )
  const topMandal = useMemo(
    () => objToTopItems(stats.counts_by_mandal, 8),
    [stats.counts_by_mandal]
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const chartColor = "#0D132D" // preset-deep-navy
  const accentColor = "#B50000" // preset-red
  const gridColor = "#D9DEE8" // preset-pale-gray

  return (
    <div className="mt-8 space-y-8 max-w-6xl mx-auto">
      {/* Header bar with user + sign out */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
      >
        <div>
          <p className="text-preset-charcoal font-medium">
            Signed in as{" "}
            <span className="text-preset-deep-navy font-semibold">{userEmail}</span>
          </p>
          <p className="text-sm text-preset-bluish-gray mt-1">
            Event dates: {stats.date_range.start} → {stats.date_range.end}
          </p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium border-preset-deep-navy text-preset-deep-navy hover:bg-preset-deep-navy hover:text-white transition-colors"
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<Users className="size-6" />}
          label="Total Registrations"
          value={stats.total_registrations}
        />
        <StatCard
          icon={<UserCheck className="size-6" />}
          label="Unique Visitors"
          value={stats.unique_visitors}
        />
        <StatCard
          icon={<Calendar className="size-6" />}
          label="Date Range"
          value={`${formatShortDate(stats.date_range.start)} – ${formatShortDate(stats.date_range.end)}`}
          isText
        />
        <StatCard
          icon={<TrendingUp className="size-6" />}
          label="Peak Daily Attendance"
          value={
            dailyAttendanceData.length > 0
              ? Math.max(...dailyAttendanceData.map((d) => d.attendance))
              : 0
          }
        />
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Arrivals by date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
        >
          <h3 className="text-lg font-semibold text-preset-charcoal mb-4">
            Arrivals by Date
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrivalsData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#293340" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#293340" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #D9DEE8",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [value, "Arrivals"]}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="count" fill={chartColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Departures by date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
        >
          <h3 className="text-lg font-semibold text-preset-charcoal mb-4">
            Departures by Date
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departuresData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#293340" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#293340" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #D9DEE8",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [value, "Departures"]}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="count" fill={accentColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Daily expected attendance - full width */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
      >
        <h3 className="text-lg font-semibold text-preset-charcoal mb-4">
          Daily Expected Attendance (Cumulative)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyAttendanceData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#293340" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#293340" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #D9DEE8",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [value, "Attendance"]}
                labelFormatter={(label) => label}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke={chartColor}
                strokeWidth={2}
                dot={{ fill: chartColor, r: 4 }}
                activeDot={{ r: 6 }}
                name="Expected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Ghaam & Mandal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
        >
          <h3 className="text-lg font-semibold text-preset-charcoal mb-4">
            Top Ghaam
          </h3>
          <ul className="space-y-2">
            {topGhaam.map((item, i) => (
              <li
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-preset-charcoal">
                  {i + 1}. {item.name}
                </span>
                <span className="font-medium text-preset-deep-navy">
                  {item.count}
                </span>
              </li>
            ))}
            {topGhaam.length === 0 && (
              <li className="text-preset-bluish-gray text-sm">No data</li>
            )}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
        >
          <h3 className="text-lg font-semibold text-preset-charcoal mb-4">
            Top Mandal
          </h3>
          <ul className="space-y-2">
            {topMandal.map((item, i) => (
              <li
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-preset-charcoal">
                  {i + 1}. {item.name}
                </span>
                <span className="font-medium text-preset-deep-navy">
                  {item.count}
                </span>
              </li>
            ))}
            {topMandal.length === 0 && (
              <li className="text-preset-bluish-gray text-sm">No data</li>
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  isText = false,
}: {
  icon: React.ReactNode
  label: string
  value: number | string
  isText?: boolean
}) {
  return (
    <div className="p-5 rounded-xl bg-white/90 border border-preset-pale-gray shadow-sm flex items-start gap-4">
      <div className="shrink-0 p-2 rounded-lg bg-preset-deep-navy/10 text-preset-deep-navy">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-preset-bluish-gray uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xl font-bold text-preset-charcoal mt-1">
          {isText ? value : Number(value).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
