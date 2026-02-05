"use client"

import { useMemo, useRef, useEffect } from "react"
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
  ReferenceArea,
} from "recharts"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import {
  Users,
  Calendar,
  TrendingUp,
  LogOut,
  MapPin,
} from "lucide-react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/molecules/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { X, ChevronRight } from "lucide-react"
import type { RegistrationsStats } from "./types"
import { mandalStoredToDisplay } from "@/lib/mandal-options"
import { format } from "date-fns"

function formatShortDate(iso: string): string {
  if (!iso || iso === "Unknown") return iso
  try {
    const d = new Date(iso + "T12:00:00")
    if (Number.isNaN(d.getTime())) return iso
    return format(d, "M/d")
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

// Core event dates for highlighting on graphs
const CORE_EVENT_START = "2026-07-27"
const CORE_EVENT_END = "2026-08-02"

// Helper to find the first and last data labels that fall within the core event range
// Returns null if no data falls within the range
function getCoreEventBounds(
  data: { date: string; label: string }[]
): { x1: string; x2: string } | null {
  const inRange = data.filter(
    (d) => d.date >= CORE_EVENT_START && d.date <= CORE_EVENT_END
  )
  if (inRange.length === 0) return null
  return { x1: inRange[0].label, x2: inRange[inRange.length - 1].label }
}

// Custom tooltip component for charts
function CustomTooltip({ active, payload, label, valueLabel }: any) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white/95 backdrop-blur-sm border-2 border-[rgb(254,215,170)] rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-600 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-[rgb(13,19,45)]">
        {valueLabel}: <span className="tabular-nums">{payload[0].value.toLocaleString()}</span>
      </p>
    </div>
  )
}

interface AdminDashboardStatsProps {
  stats: RegistrationsStats
  userEmail: string
}

export function AdminDashboardStats({ stats, userEmail }: AdminDashboardStatsProps) {
  const router = useRouter()
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, margin: "-50px" })

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

  // Chart colors - warm on-theme palette
  const arrivalBarColor = "#ea580c" // orange-600
  const lineColor = "#0D132D" // preset-deep-navy
  const gridColor = "rgb(254 215 170 / 0.4)" // softer grid
  const coreEventShade = "rgb(254 215 170 / 0.25)" // shaded region for core dates

  const allGhaam = useMemo(
    () => objToAllItems(stats.counts_by_ghaam),
    [stats.counts_by_ghaam]
  )
  const allMandal = useMemo(
    () =>
      objToAllItems(stats.counts_by_mandal, (n) => mandalStoredToDisplay(n)),
    [stats.counts_by_mandal]
  )

  // Find the peak day for average daily attendance
  const peakAttendance = dailyAttendanceData.length > 0
    ? Math.max(...dailyAttendanceData.map((d) => d.attendance))
    : 0
  
  // Calculate average registration per day (excluding unknown)
  const avgDailyArrivals = arrivalsData.length > 0
    ? Math.round(arrivalsData.reduce((sum, d) => sum + d.count, 0) / arrivalsData.length)
    : 0

  // Compute core event shading bounds for each chart based on actual data
  const arrivalsBounds = useMemo(() => getCoreEventBounds(arrivalsData), [arrivalsData])
  const departuresBounds = useMemo(() => getCoreEventBounds(departuresData), [departuresData])
  const attendanceBounds = useMemo(() => getCoreEventBounds(dailyAttendanceData), [dailyAttendanceData])

  return (
    <div ref={statsRef} className="space-y-6 max-w-6xl mx-auto">
      {/* Header bar with user + sign out */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl admin-card"
      >
        <div>
          <p className="reg-text-primary font-medium">
            Signed in as{" "}
            <span className="text-[rgb(13,19,45)] font-semibold">{userEmail}</span>
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
        <AnimatedStatCard
          icon={<Users className="size-6" aria-hidden />}
          label="Total Registrations"
          value={stats.total_registrations}
          inView={isInView}
          delay={0}
        />
        <AnimatedStatCard
          icon={<TrendingUp className="size-6" aria-hidden />}
          label="Peak Daily Attendance"
          value={peakAttendance}
          inView={isInView}
          delay={0.1}
        />
        <AnimatedStatCard
          icon={<Calendar className="size-6" aria-hidden />}
          label="Avg Daily Arrivals"
          value={avgDailyArrivals}
          inView={isInView}
          delay={0.2}
        />
        <AnimatedStatCard
          icon={<MapPin className="size-6" aria-hidden />}
          label="Unique Ghaams"
          value={allGhaam.length}
          inView={isInView}
          delay={0.3}
        />
      </motion.div>

      {/* Daily expected attendance - full width (moved above arrivals/departures) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-6 rounded-2xl admin-card"
      >
        <h3 className="text-lg font-semibold reg-text-primary mb-4">
          Daily Expected Attendance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyAttendanceData}
              margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
            >
              {/* Core event shading */}
              {attendanceBounds && (
                <ReferenceArea
                  x1={attendanceBounds.x1}
                  x2={attendanceBounds.x2}
                  fill={coreEventShade}
                  fillOpacity={1}
                />
              )}
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "rgb(55 65 81)", fontWeight: 500 }}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgb(75 85 99)" }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip valueLabel="Attendees" />} cursor={{ stroke: "rgb(254 215 170)", strokeWidth: 1 }} />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke={lineColor}
                strokeWidth={2.5}
                dot={{ fill: lineColor, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: lineColor, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs reg-text-secondary mt-3 text-center">
          Shaded area: Core event dates (Jul 27 – Aug 2)
        </p>
      </motion.div>

      {/* Charts row - Arrivals & Departures */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Arrivals by date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Arrivals by Date
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={arrivalsData} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                {/* Core event shading */}
                {arrivalsBounds && (
                  <ReferenceArea
                    x1={arrivalsBounds.x1}
                    x2={arrivalsBounds.x2}
                    fill={coreEventShade}
                    fillOpacity={1}
                  />
                )}
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "rgb(55 65 81)", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={45}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgb(75 85 99)" }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip content={<CustomTooltip valueLabel="Arrivals" />} cursor={false} />
                <Bar 
                  dataKey="count" 
                  fill={arrivalBarColor} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Departures by date */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Departures by Date
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departuresData} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                {/* Core event shading */}
                {departuresBounds && (
                  <ReferenceArea
                    x1={departuresBounds.x1}
                    x2={departuresBounds.x2}
                    fill={coreEventShade}
                    fillOpacity={1}
                  />
                )}
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "rgb(55 65 81)", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={45}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "rgb(75 85 99)" }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip content={<CustomTooltip valueLabel="Departures" />} cursor={false} />
                <Bar 
                  dataKey="count" 
                  fill={arrivalBarColor} 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Highest Attendees by Ghaam & Mandal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Highest Attendees by Ghaam
          </h3>
          {/* Table style list for top ghaam */}
          <div className="overflow-hidden rounded-lg border-2 border-[rgb(254,215,170)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[rgb(254,215,170)] bg-orange-50/50">
                  <th className="text-center py-2.5 px-2 font-semibold reg-text-secondary w-10">#</th>
                  <th className="text-left py-2.5 px-3 font-semibold reg-text-primary">Ghaam</th>
                  <th className="text-right py-2.5 px-3 font-semibold reg-text-primary">Count</th>
                </tr>
              </thead>
              <tbody>
                {topGhaam.map((item, i) => (
                  <tr
                    key={item.name}
                    className={`border-b border-[rgb(254,215,170)]/40 last:border-b-0 ${
                      i % 2 === 0 ? "bg-white" : "bg-orange-50/60"
                    }`}
                  >
                    <td className="py-2 px-2 text-center text-xs font-medium reg-text-secondary tabular-nums">
                      {i + 1}
                    </td>
                    <td className="py-2 px-3 reg-text-primary font-medium">
                      {item.name}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-[rgb(13,19,45)]">
                      {item.count.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {topGhaam.length === 0 && (
                  <tr>
                    <td colSpan={3} className="reg-text-secondary text-sm py-4 text-center">No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* View all link */}
          {allGhaam.length > 8 && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg border border-transparent hover:border-orange-200 transition-all duration-200 group cursor-pointer"
                  aria-label="View all ghaam counts"
                >
                  View all {allGhaam.length} ghaams
                  <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 border-0 bg-transparent shadow-none [&>button]:hidden">
                <VisuallyHidden.Root>
                  <DialogTitle>All Ghaam Counts</DialogTitle>
                </VisuallyHidden.Root>
                <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-[rgb(254,215,170)] shadow-2xl flex flex-col max-h-[85vh]">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[rgb(254,215,170)] bg-gradient-to-r from-orange-50 to-red-50 shrink-0">
                    <div>
                      <h2 className="text-lg font-semibold reg-text-primary">
                        All Ghaam Counts
                      </h2>
                      <p className="text-xs reg-text-secondary mt-0.5">
                        {allGhaam.length} total ghaams
                      </p>
                    </div>
                    <DialogClose asChild>
                      <button
                        className="p-2 rounded-full hover:bg-orange-100 transition-colors"
                        aria-label="Close dialog"
                      >
                        <X className="size-5 text-gray-500" />
                      </button>
                    </DialogClose>
                  </div>
                  {/* Table */}
                  <div className="overflow-y-auto flex-1 admin-scrollbar overscroll-contain">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-orange-50/95 backdrop-blur-sm">
                        <tr className="border-b-2 border-[rgb(254,215,170)]">
                          <th className="text-center py-3 px-3 font-semibold reg-text-secondary w-14">#</th>
                          <th className="text-left py-3 px-3 font-semibold reg-text-primary">Ghaam</th>
                          <th className="text-right py-3 px-4 font-semibold reg-text-primary">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allGhaam.map((item, i) => (
                          <tr
                            key={item.name}
                            className={`border-b border-[rgb(254,215,170)]/40 last:border-b-0 ${
                              i % 2 === 0 ? "bg-white" : "bg-orange-50/60"
                            }`}
                          >
                            <td className="py-2.5 px-3 text-center text-xs font-medium reg-text-secondary tabular-nums">
                              {i + 1}
                            </td>
                            <td className="py-2.5 px-3 reg-text-primary font-medium">
                              {item.displayName}
                            </td>
                            <td className="py-2.5 px-4 text-right font-semibold tabular-nums text-[rgb(13,19,45)]">
                              {item.count.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        {allGhaam.length === 0 && (
                          <tr>
                            <td colSpan={3} className="reg-text-secondary text-sm py-8 text-center">No data</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl admin-card"
        >
          <h3 className="text-lg font-semibold reg-text-primary mb-4">
            Highest Attendees by Mandal
          </h3>
          {/* Table style list for top mandal */}
          <div className="overflow-hidden rounded-lg border-2 border-[rgb(254,215,170)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[rgb(254,215,170)] bg-orange-50/50">
                  <th className="text-center py-2.5 px-2 font-semibold reg-text-secondary w-10">#</th>
                  <th className="text-left py-2.5 px-3 font-semibold reg-text-primary">Mandal</th>
                  <th className="text-right py-2.5 px-3 font-semibold reg-text-primary">Count</th>
                </tr>
              </thead>
              <tbody>
                {topMandal.map((item, i) => (
                  <tr
                    key={item.name}
                    className={`border-b border-[rgb(254,215,170)]/40 last:border-b-0 ${
                      i % 2 === 0 ? "bg-white" : "bg-orange-50/60"
                    }`}
                  >
                    <td className="py-2 px-2 text-center text-xs font-medium reg-text-secondary tabular-nums">
                      {i + 1}
                    </td>
                    <td className="py-2 px-3 reg-text-primary font-medium">
                      {mandalStoredToDisplay(item.name)}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-[rgb(13,19,45)]">
                      {item.count.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {topMandal.length === 0 && (
                  <tr>
                    <td colSpan={3} className="reg-text-secondary text-sm py-4 text-center">No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* View all link */}
          {allMandal.length > 8 && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg border border-transparent hover:border-orange-200 transition-all duration-200 group cursor-pointer"
                  aria-label="View all mandal counts"
                >
                  View all {allMandal.length} mandals
                  <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 border-0 bg-transparent shadow-none [&>button]:hidden">
                <VisuallyHidden.Root>
                  <DialogTitle>All Mandal Counts</DialogTitle>
                </VisuallyHidden.Root>
                <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-[rgb(254,215,170)] shadow-2xl flex flex-col max-h-[85vh]">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[rgb(254,215,170)] bg-gradient-to-r from-orange-50 to-red-50 shrink-0">
                    <div>
                      <h2 className="text-lg font-semibold reg-text-primary">
                        All Mandal Counts
                      </h2>
                      <p className="text-xs reg-text-secondary mt-0.5">
                        {allMandal.length} total mandals
                      </p>
                    </div>
                    <DialogClose asChild>
                      <button
                        className="p-2 rounded-full hover:bg-orange-100 transition-colors"
                        aria-label="Close dialog"
                      >
                        <X className="size-5 text-gray-500" />
                      </button>
                    </DialogClose>
                  </div>
                  {/* Table */}
                  <div className="overflow-y-auto flex-1 admin-scrollbar overscroll-contain">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-orange-50/95 backdrop-blur-sm">
                        <tr className="border-b-2 border-[rgb(254,215,170)]">
                          <th className="text-center py-3 px-3 font-semibold reg-text-secondary w-14">#</th>
                          <th className="text-left py-3 px-3 font-semibold reg-text-primary">Mandal</th>
                          <th className="text-right py-3 px-4 font-semibold reg-text-primary">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allMandal.map((item, i) => (
                          <tr
                            key={item.name}
                            className={`border-b border-[rgb(254,215,170)]/40 last:border-b-0 ${
                              i % 2 === 0 ? "bg-white" : "bg-orange-50/60"
                            }`}
                          >
                            <td className="py-2.5 px-3 text-center text-xs font-medium reg-text-secondary tabular-nums">
                              {i + 1}
                            </td>
                            <td className="py-2.5 px-3 reg-text-primary font-medium">
                              {item.displayName}
                            </td>
                            <td className="py-2.5 px-4 text-right font-semibold tabular-nums text-[rgb(13,19,45)]">
                              {item.count.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        {allMandal.length === 0 && (
                          <tr>
                            <td colSpan={3} className="reg-text-secondary text-sm py-8 text-center">No data</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function AnimatedStatCard({
  icon,
  label,
  value,
  inView,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  value: number
  inView: boolean
  delay?: number
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const formatted = useTransform(rounded, (latest) => latest.toLocaleString())

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.8,
        delay: delay,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [count, value, delay, inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay }}
      className="p-5 rounded-xl admin-card flex items-start gap-4"
    >
      <div className="shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 text-[rgb(185,28,28)]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium reg-text-secondary uppercase tracking-wide">
          {label}
        </p>
        <motion.p className="text-2xl font-bold reg-text-primary mt-1 tabular-nums">
          {formatted}
        </motion.p>
      </div>
    </motion.div>
  )
}
