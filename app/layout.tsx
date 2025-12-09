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
import { AudioPlayer } from "@/components/audio-player"
import { AudioProvider } from "@/contexts/audio-context"
import { LoadingProvider } from "@/hooks/use-loading"
import { getCloudflareImage } from "@/lib/cdn-assets"
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
  display: "block",
})

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "700"],
  variable: "--font-gujarati",
  display: "block",
})





export const metadata: Metadata = {
  title: "Shree Swaminarayan Temple Secaucus, New Jersey Rajat Mahotsav",
  description: "Shree Swaminarayan Temple Secaucus, NJ Celebrates its Rajat Mahotsav from July 27, 2026 - August 02, 2026.",
  generator: "v0.app",
  icons: {
    icon: "https://cdn.njrajatmahotsav.com/main_logo.png",
  },
  openGraph: {
    title: "Shree Swaminarayan Temple Secaucus, New Jersey Rajat Mahotsav",
    description: "Shree Swaminarayan Temple Secaucus, NJ Celebrates its Rajat Mahotsav from July 27, 2026 - August 02, 2026.",
    url: "https://njrajatmahotsav.com",
    siteName: "Shree Swaminarayan Temple Secaucus, New Jersey Rajat Mahotsav",
    images: [
      {
        url: getCloudflareImage("5aeb6c7e-f6ea-45b1-da4a-823279172400"),
        width: 1200,
        height: 630,
        alt: "Shree Swaminarayan Temple Secaucus, New Jersey Rajat Mahotsav",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Swaminarayan Temple Secaucus, New Jersey Rajat Mahotsav",
    description: "Shree Swaminarayan Temple Secaucus, NJ Celebrates its Rajat Mahotsav from July 27, 2026 - August 02, 2026.",
    images: [getCloudflareImage("5aeb6c7e-f6ea-45b1-da4a-823279172400")],
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
        {/* bg-title-section-bg / preset-deep-navy */}
        <meta name="theme-color" content="#0D132D" />
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
  --font-gujarati: ${notoGujarati.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable} ${notoGujarati.variable}`} suppressHydrationWarning>
        <LoadingProvider>
          <AudioProvider>
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
              <AudioPlayer />
            </ThemeProvider>
          </AudioProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
