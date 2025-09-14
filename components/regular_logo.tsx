"use client"

import Image from "next/image"

export default function RegularLogo() {
  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <Image
        src="/main_logo.png"
        alt="Rajat Mahotsav Logo"
        width={312.5}
        height={200}
        className="max-w-[60vw] max-h-[45vh] w-auto h-auto object-contain"
        priority
      />
    </div>
  )
}