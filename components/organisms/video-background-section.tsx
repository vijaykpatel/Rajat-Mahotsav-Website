"use client"

import Script from "next/script"
import { useDeviceType } from "@/hooks/use-device-type"

export default function VideoBackgroundSection() {
  const deviceType = useDeviceType()
  const isMobile = deviceType === "mobile"
  
  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden bg-preset-deep-navy">
        <iframe
          src={isMobile 
            ? "https://player.vimeo.com/video/1128421563?badge=0&autopause=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
            : "https://player.vimeo.com/video/1128421609?badge=0&autopause=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none"
          style={{ 
            width: "177.78vh",
            height: "100vh",
            minWidth: "100vw",
            minHeight: "56.25vw"
          }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Mandir-drone-shots"
        />
      </div>
      <Script src="https://player.vimeo.com/api/player.js" />
    </>
  )
}
