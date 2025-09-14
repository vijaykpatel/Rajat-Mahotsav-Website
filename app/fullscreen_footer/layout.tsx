import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

export default function FullscreenFooterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  )
}