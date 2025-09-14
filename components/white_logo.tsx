"use client"

import Image from "next/image"

export default function WhiteLogo() {
  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <Image
        src="/white_logo.png"
        alt="Rajat Mahotsav Logo"
        width={312.5}
        height={200}
        className="max-w-[60vw] max-h-[50vh] w-auto h-auto object-contain"
        priority
      />
    </div>
  )
}