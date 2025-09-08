"use client"

import Image from "next/image"

export default function Logo() {
  return (
    <div className="text-center mb-4 lg:mb-6">
      <Image
        src="/LinenLogo.png"
        alt="Rajat Mahotsav Logo"
        width={400}
        height={250}
        className="mx-auto w-[400px] md:w-[500px] lg:w-[800px] h-auto"
        priority
      />
    </div>
  )
}