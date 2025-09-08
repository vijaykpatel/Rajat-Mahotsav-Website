"use client"

import Image from "next/image"
import { useDeviceType } from "@/hooks/use-device-type"

export default function Logo() {
  const deviceType = useDeviceType()
  
  const logoClasses = deviceType === 'mobile' 
    ? "max-w-[80vw] max-h-full w-auto h-auto object-contain landscape:max-w-[50vw] landscape:max-h-[40vh]"
    : "max-w-[80vw] max-h-full w-auto h-auto object-contain"

  return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <Image
        src="/LinenLogo.png"
        alt="Rajat Mahotsav Logo"
        width={350}
        height={225}
        className={logoClasses}
        priority
      />
    </div>
  )
}