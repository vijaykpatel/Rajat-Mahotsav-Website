"use client"

import { useState } from "react"
import { Play } from "lucide-react"

export default function AashirwadVideoPlayer() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-start pt-28 md:pt-36 gap-16 pb-16 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(30,58,138,0.1),transparent_50%)] pointer-events-none" />
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-[1.5]">સુવર્ણ યુગ નો રજત મહોત્સવ</h1>
        <h2 className="text-5xl md:text-7xl font-semibold text-white">A Silver Celebration of a Golden Era</h2>
      </div>
      <div className="w-full max-w-6xl px-4">
        <div className="rounded-xl overflow-hidden relative" style={{ paddingTop: "56.42633228840125%" }}>
          {!videoLoaded ? (
            <div 
              className="absolute inset-0 bg-black flex items-center justify-center cursor-pointer group"
              onClick={() => setVideoLoaded(true)}
              style={{ 
                backgroundImage: 'url(https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/thumbnails/thumbnail.gif?time=95s&duration=4s)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                <Play size={40} className="text-black ml-1" fill="currentColor" />
              </div>
            </div>
          ) : (
            <iframe
              src="https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/iframe?autoplay=true"
              style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  )
}
