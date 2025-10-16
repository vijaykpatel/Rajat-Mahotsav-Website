import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { Instrument_Serif } from "next/font/google"
import { Noto_Sans_Gujarati } from "next/font/google"
import { ThemeProvider } from "@/components/atoms/theme-provider"
import { Navigation } from "@/components/organisms/navigation"
import StickyFooter from "@/components/organisms/sticky-footer"
import { ScrollToTop } from "@/components/atoms/scroll-to-top"
import { FloatingMenuButton } from "@/components/organisms/floating-menu-button"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "block",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "block",
})

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "700"],
  variable: "--font-gujarati",
  display: "block",
})





export const metadata: Metadata = {
  title: "New Jersey Rajat Mahotsav",
  description: "Shree Swaminarayan Temple Secaucus, NJ Celebrates its Rajat Mahotsav from July 29, 2026 - August 02, 2026.",
  generator: "v0.app",
  icons: {
    icon: "https://https://cdn.njrajatmahotsav.com/main_logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0D132D" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-navbutton-color" content="#0D132D" />
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
  --font-gujarati: ${notoGujarati.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable} ${notoGujarati.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <Navigation />
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <StickyFooter />
          </div>
          <ScrollToTop />
          <FloatingMenuButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
