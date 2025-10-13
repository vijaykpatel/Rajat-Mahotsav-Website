import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import { Noto_Music } from "next/font/google"
import { Lato } from "next/font/google"
import { Antonio } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import StickyFooter from "@/components/sticky-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingMenuButton } from "@/components/floating-menu-button"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const notoMusic = Noto_Music({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-music",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
})

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
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
        <meta name="theme-color" content="rgba(248, 248, 248, 0.85)" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-navbutton-color" content="rgba(248, 248, 248, 0.85)" />
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
  --font-noto-music: ${notoMusic.variable};
  --font-lato: ${lato.variable};
  --font-antonio: ${antonio.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable} ${notoMusic.variable} ${lato.variable} ${antonio.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
