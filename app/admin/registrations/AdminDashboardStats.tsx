"use client"

import { useMemo, useRef, useEffect, lazy, Suspense, type ReactNode } from "react"
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
import type { RegistrationsStats } from "./types"

const AdminDashboardCharts = lazy(() => import("./AdminDashboardCharts"))

interface AdminDashboardStatsProps {
  stats: RegistrationsStats
  userEmail: string
}

export function AdminDashboardStats({ stats, userEmail }: AdminDashboardStatsProps) {
  const router = useRouter()
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, margin: "-50px" })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // Find the peak day for average daily attendance
  const peakAttendance = useMemo(() => {
    const values = Object.values(stats.daily_expected_attendance)
    return values.length > 0 ? Math.max(...values) : 0
  }, [stats.daily_expected_attendance])

  // Calculate average registration per day (excluding unknown)
  const avgDailyArrivals = useMemo(() => {
    const values = Object.values(stats.counts_by_arrival_date)
    if (values.length === 0) return 0
    const total = values.reduce((sum, count) => sum + count, 0)
    return Math.round(total / values.length)
  }, [stats.counts_by_arrival_date])

  const uniqueGhaamCount = useMemo(
    () => Object.keys(stats.counts_by_ghaam).length,
    [stats.counts_by_ghaam]
  )

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
          value={uniqueGhaamCount}
          inView={isInView}
          delay={0.3}
        />
      </motion.div>

      <Suspense fallback={<ChartsSkeleton />}>
        <AdminDashboardCharts stats={stats} />
      </Suspense>
    </div>
  )
}

function ChartsSkeleton() {
  return (
    <>
      <div className="p-6 rounded-2xl admin-card animate-pulse">
        <div className="h-4 w-56 bg-orange-100 rounded mb-4" />
        <div className="h-64 rounded-xl bg-orange-100/70" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl admin-card animate-pulse">
          <div className="h-4 w-40 bg-orange-100 rounded mb-4" />
          <div className="h-56 rounded-xl bg-orange-100/70" />
        </div>
        <div className="p-6 rounded-2xl admin-card animate-pulse">
          <div className="h-4 w-44 bg-orange-100 rounded mb-4" />
          <div className="h-56 rounded-xl bg-orange-100/70" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl admin-card animate-pulse">
          <div className="h-4 w-48 bg-orange-100 rounded mb-4" />
          <div className="h-40 rounded-xl bg-orange-100/70" />
        </div>
        <div className="p-6 rounded-2xl admin-card animate-pulse">
          <div className="h-4 w-52 bg-orange-100 rounded mb-4" />
          <div className="h-40 rounded-xl bg-orange-100/70" />
        </div>
      </div>
    </>
  )
}

function AnimatedStatCard({
  icon,
  label,
  value,
  inView,
  delay = 0,
}: {
  icon: ReactNode
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
