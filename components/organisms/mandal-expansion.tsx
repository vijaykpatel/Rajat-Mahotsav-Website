"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Skiper54 } from "@/components/templates/skiper54"
import { getCloudflareImage } from "@/lib/cdn-assets"

export default function MandalExpansionText() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const mandalImages = [
    { src: getCloudflareImage("bdf8b51a-570b-447d-7caa-9e30b94b4300"), alt: "Seattle Hari Mandir", title: "Seattle Hari Mandir" },
        { src: getCloudflareImage("a9c67756-fe7b-4518-9097-5f97219adb00"), alt: "Ocala Mandir Ground Breaking", title: "Ocala Mandir Ground Breaking" },
    { src: getCloudflareImage("e712a1af-45df-4b53-6ebd-a71bcc2d9e00"), alt: "Georgia Hari Mandir Murti Pratishta", title: "Georgia Hari Mandir Murti Pratishta"},
    { src: getCloudflareImage("05321c03-9773-44a0-d011-4ac2b7ccba00"), alt: "Chicago Murti Pratishta", title: "Chicago Murti Pratishta" },
    { src: getCloudflareImage("e22429be-2df7-40dc-7f8f-f4dfdd135e00"), alt: "Los Angeles Mandir Murti Pratishta", title: "Los Angeles Mandir Murti Pratishta" },
    { src: getCloudflareImage("606b2839-0750-4eee-719c-c37cdfb45f00"), alt: "Kentucky Mandir Murti Pratishta", title: "Kentucky Mandir Murti Pratishta" },
    { src: getCloudflareImage("33a475fc-4473-4641-7a61-8bb18069a300"), alt: "Delaware Mandir Murti Pratishta & Diamond Tula", title: "Delaware Mandir Murti Pratishta & Diamond Tula" },
    { src: getCloudflareImage("808c6572-2fba-4d68-0f57-1c641e583400"), alt: "Tennessee Hari Mandir Murti Pratishta", title: "Tennessee Hari Mandir Murti Pratishta" },
    { src: getCloudflareImage("0755116a-1b7d-41cb-4a46-1a0e09871500"), alt: "Toronto Mandir Murti Pratishta", title: "Toronto Mandir Murti Pratishta" },
    { src: getCloudflareImage("87a4268e-8c43-48a2-2d5a-36a7bd9d8b00"), alt: "Ohio Hari Mandir Murti Pratishta", title: "Ohio Hari Mandir Murti Pratishta" },
    { src: getCloudflareImage("311766d8-23da-4762-e5b9-634606bbfc00"), alt: "North America Convention 2015", title: "North America Convention 2015" },
    { src: getCloudflareImage("03ab5bfc-f774-434f-b710-c0739cd8d700"), alt: "Virginia Mandir Murti Pratishta", title: "Virginia Mandir Murti Pratishta" },
    { src: getCloudflareImage("42f7297b-9fac-4834-e3d2-df24f47d0300"), alt: "Ocala Mandir Murti Pratishta", title: "Ocala Mandir Murti Pratishta" },
    { src: getCloudflareImage("9f2d8425-226e-4013-5641-3463f7e1a000"), alt: "Tennessee Mandir Murti Pratishta", title: "Tennessee Mandir Murti Pratishta" },
    { src: getCloudflareImage("26b6c7da-4a70-4847-29b2-a31b27222a00"), alt: "Kentucky Shilanyas Ceremony", title: "Kentucky Shilanyas Ceremony" },

  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center justify-start">
      <div className="min-h-[50vh] flex items-center justify-center w-full py-16 md:py-20 px-4">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-lg md:text-xl max-w-4xl text-center leading-relaxed relative z-10 text-main-text"
      >
        What unfolded afterwards was a golden era of the growth of the faith and the flourishing of the supreme teachings and philosophy of Lord Shree Swaminarayanbapa Swamibapa, not only in New Jersey, but all throughout North America. Over a dozen new temples and mandals have sprouted from coast to coast, and the initial seeds planted by Jeevanpran Shree Muktajeevan Swamibapa, were lovingly and tirelessly sowed by His beloved heir, Acharya Shree Purushottampriya Swamishree Maharaj, all throughout North America. This garden bloomed by Acharya Swamishree Maharaj is now being devotedly tended to in the same manner by Acharya Shree Jitendriyapriyadasji Swamiji Maharaj, the inspirer of the Shree Ghanshyam Maharaj Rajat Pratishtha Mahotsav at Shree Swaminarayan Temple, New Jersey.
      </motion.p>
      </div>
      <Skiper54 images={mandalImages} />
    </div>
  )
}
