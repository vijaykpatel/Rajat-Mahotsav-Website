"use client"

import Image from "next/image"

export default function Logo() {
  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <Image
        src="/LinenLogo.png"
        alt="Rajat Mahotsav Logo"
        width={350}
        height={225}
        className="max-w-[80vw] max-h-full w-auto h-auto object-contain"
        priority
      />
    </div>
  )
}