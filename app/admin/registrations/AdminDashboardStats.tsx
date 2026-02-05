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
  List,
} from "lucide-react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/molecules/dialog"
import type { RegistrationsStats } from "./types"
import { mandalStoredToDisplay } from "@/lib/mandal-options"
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

function objToAllItems(
  obj: Record<string, number>,
  displayFn: (name: string) => string = (n) => n
): { name: string; displayName: string; count: number }[] {
  return Object.entries(obj)
    .map(([name, count]) => ({
      name,
      displayName: displayFn(name),
      count,
    }))
    .sort((a, b) => b.count - a.count)
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
  const accentColor = "#b91c1c" // darker red - good contrast on light bg
  const gridColor = "rgb(254 215 170 / 0.6)" // reg border - softer grid

  const allGhaam = useMemo(
    () => objToAllItems(stats.counts_by_ghaam),
    [stats.counts_by_ghaam]
  )
  const allMandal = useMemo(
    () =>
      objToAllItems(stats.counts_by_mandal, (n) => mandalStoredToDisplay(n)),
    [stats.counts_by_mandal]
  )

  return (
    <div className="mt-8 space-y-8 max-w-6xl mx-auto">
      {/* Header bar with user + sign out */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl admin-card"
      >
        <div>
          <p className="reg-text-primary font-medium">
            Signed in as{" "}
            <span className="text-[rgb(13,19,45)] font-semibold">{userEmail}</span>
          </p>
          <p className="text-sm reg-text-secondary mt-1">
            Event dates: {stats.date_range.start} → {stats.date_range.end}
          </p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 admin-btn-outline"
          aria-label="Sign out"
        >
          <LogOut className="size-4" aria-hidden />
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
          icon={<Users className="size-6" aria-hidden />}
          label="Total Registrations"
          value={stats.total_registrations}
        />
        <StatCard
          icon={<UserCheck className="size-6" aria-hidden />}
          label="Unique Visitors"
          value={stats.unique_visitors}
        />
        <StatCard
          icon={<Calendar className="size-6" aria-hidden />}
          label="Date Range"
          value={`${formatShortDate(stats.date_range.start)} – ${formatShortDate(stats.date_range.end)}`}
          isText
        />
        <StatCard
          icon={<TrendingUp className="size-6" aria-hidden />}
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
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Arrivals by Date
          </h3>
          <div className="h-64 flex justify-center items-center w-full">
            <ResponsiveContainer width="100%" height="100%" className="min-w-0">
              <BarChart data={arrivalsData} margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid rgb(254 215 170)",
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
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Departures by Date
          </h3>
          <div className="h-64 flex justify-center items-center w-full">
            <ResponsiveContainer width="100%" height="100%" className="min-w-0">
              <BarChart data={departuresData} margin={{ top: 8, right: 16, left: 16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid rgb(254 215 170)",
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
        className="p-6 rounded-2xl admin-card"
      >
        <h3 className="text-lg font-semibold reg-text-primary mb-4">
          Daily Expected Attendance (Cumulative)
        </h3>
        <div className="h-72 flex justify-center items-center w-full">
          <ResponsiveContainer width="100%" height="100%" className="min-w-0">
            <LineChart
              data={dailyAttendanceData}
              margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "rgb(31 41 55)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid rgb(254 215 170)",
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
          className="p-6 rounded-2xl admin-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold reg-text-primary">
              Top Ghaam
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="admin-btn-outline rounded-full px-4 py-2 text-sm shrink-0"
                  aria-label="View all ghaam counts"
                >
                  <List className="size-4" aria-hidden />
                  View all ({allGhaam.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col sm:rounded-2xl admin-card border-2 border-[rgb(254,215,170)] overscroll-contain">
                <DialogHeader>
                  <DialogTitle className="reg-text-primary">
                    All Ghaam Counts
                  </DialogTitle>
                </DialogHeader>
                <ul
                  className="overflow-y-auto space-y-2 pr-2 -mr-2"
                  aria-label="Full ghaam counts list"
                >
                  {allGhaam.map((item, i) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between text-sm reg-text-primary py-1.5 border-b border-[rgb(254,215,170)]/50 last:border-0"
                    >
                      <span>{i + 1}. {item.displayName}</span>
                      <span className="font-semibold tabular-nums">{item.count}</span>
                    </li>
                  ))}
                  {allGhaam.length === 0 && (
                    <li className="reg-text-secondary text-sm py-4">No data</li>
                  )}
                </ul>
              </DialogContent>
            </Dialog>
          </div>
          <ul className="space-y-2">
            {topGhaam.map((item, i) => (
              <li
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="reg-text-primary">
                  {i + 1}. {item.name}
                </span>
                <span className="font-medium tabular-nums text-[rgb(13,19,45)]">
                  {item.count}
                </span>
              </li>
            ))}
            {topGhaam.length === 0 && (
              <li className="reg-text-secondary text-sm">No data</li>
            )}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl admin-card"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold reg-text-primary">
              Top Mandal
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="admin-btn-outline rounded-full px-4 py-2 text-sm shrink-0"
                  aria-label="View all mandal counts"
                >
                  <List className="size-4" aria-hidden />
                  View all ({allMandal.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col sm:rounded-2xl admin-card border-2 border-[rgb(254,215,170)] overscroll-contain">
                <DialogHeader>
                  <DialogTitle className="reg-text-primary">
                    All Mandal Counts
                  </DialogTitle>
                </DialogHeader>
                <ul
                  className="overflow-y-auto space-y-2 pr-2 -mr-2"
                  aria-label="Full mandal counts list"
                >
                  {allMandal.map((item, i) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between text-sm reg-text-primary py-1.5 border-b border-[rgb(254,215,170)]/50 last:border-0"
                    >
                      <span>{i + 1}. {item.displayName}</span>
                      <span className="font-semibold tabular-nums">{item.count}</span>
                    </li>
                  ))}
                  {allMandal.length === 0 && (
                    <li className="reg-text-secondary text-sm py-4">No data</li>
                  )}
                </ul>
              </DialogContent>
            </Dialog>
          </div>
          <ul className="space-y-2">
            {topMandal.map((item, i) => (
              <li
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="reg-text-primary">
                  {i + 1}. {mandalStoredToDisplay(item.name)}
                </span>
                <span className="font-medium tabular-nums text-[rgb(13,19,45)]">
                  {item.count}
                </span>
              </li>
            ))}
            {topMandal.length === 0 && (
              <li className="reg-text-secondary text-sm">No data</li>
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
    <div className="p-5 rounded-xl admin-card flex items-start gap-4">
      <div className="shrink-0 p-2 rounded-lg bg-[rgb(249,115,22)]/15 text-[rgb(185,28,28)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium reg-text-secondary uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xl font-bold reg-text-primary mt-1 tabular-nums">
          {isText ? value : Number(value).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
