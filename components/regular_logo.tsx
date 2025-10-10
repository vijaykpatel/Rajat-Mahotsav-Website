"use client"

import { CDN_ASSETS } from "@/lib/cdn-assets"

export default function RegularLogo() {
  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <img
        src={CDN_ASSETS.mainLogo}
        alt="Rajat Mahotsav Logo"
        className="max-w-[60vw] max-h-[45vh] w-auto h-auto object-contain"
      />
    </div>
  )
}