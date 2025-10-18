"use client"

import { motion } from "framer-motion"
import { getR2Image } from "@/lib/cdn-assets"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Skiper54 } from "@/components/templates/skiper54"
import { getCloudflareImage } from "@/lib/cdn-assets"
import { useAudioContext } from '@/contexts/audio-context'

gsap.registerPlugin(ScrollTrigger)

const content = [
  {
    title: "In August 2001",
    description: (
      <>
        History was made and forever forged in gold with the installation of the divine murtis of <u>Shree Swaminarayan Bhagwan</u>, <u>Jeevanpran Shree Abji Bapashree</u>, and <u>Jeevanpran Shree Muktajeevan Swamibapa</u> at Shree Swaminarayan Temple in Secaucus, New Jersey. Located just five miles from New York City, the 22,500sq.ft. traditional Hindu temple began construction on a 3.7 acre lot in 1998. It is notably the first traditional shikhar-bandh mandir of the entire Swaminarayan faith on the East Coast and also the first established mandir of Maninagar Shree Swaminarayan Gadi Sansthan in North America.
      </>
    ),
    image: getR2Image("/main/2001_1.JPG"),
  },
  {
    title: "780 Kilograms of Pure Gold",
    description:
      "Our beloved Prem Murti Acharya Shree Purushottampriyadasji Swamishree Maharaj traditionally weighed all three divine marble idols against 780 kilograms of pure gold and then ceremonially installed them into the sacred sihasan. Never before had such a magnificent Suvarna Tula taken place, creating a timeless memory that will endure for generations.",
    image: getR2Image("/main/2001_2.JPG"),
  },
  {
    title: "A Historic Moment",
    description:
      "The five-day grand opening Murti Pratishtha Mahotsav, featuring spiritual discourses, Indian cultural dance and music, honorable guests, fireworks, and a vibrant parade, is still remembered as one of the most remarkable events in the history of our sansthan. The unwavering dedication of volunteers, whose tireless efforts and collective contributions made the construction of this temple possible, remains a lasting testament to the devotion and vision of our beloved Prem Murti Acharya Swamishree Maharaj and the entire Swaminarayan community.",
    image: getR2Image("/main/2001_3.JPG"),
  },
]

export default function PratisthaStory() {
  const [rowsVisible, setRowsVisible] = useState<boolean[]>([false, false, false])
  const [videoSectionVisible, setVideoSectionVisible] = useState(false)
  const [closingTextVisible, setClosingTextVisible] = useState(false)
  const [invitationVisible, setInvitationVisible] = useState(false)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const closingTextRef = useRef<HTMLDivElement>(null)
  const invitationRef = useRef<HTMLDivElement>(null)
  const [animDuration, setAnimDuration] = useState(1.2)
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
<<<<<<< HEAD
  const { fadeToVolume, fadeOut, play } = useAudioContext()
=======
  const { fadeToVolume, fadeOut, play, hasUserConsent } = useAudioContext()
>>>>>>> fad1d91 (v1.01)

  useEffect(() => {
    setAnimDuration(window.innerWidth < 768 ? 0.8 : 1.2)
  }, [])

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observers = rowRefs.current.map((row, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setRowsVisible(prev => {
            const newState = [...prev]
            newState[index] = entry.isIntersecting
            return newState
          })
        },
        { threshold: isMobile ? 0.3 : 0.5 }
      )
      if (row) observer.observe(row)
      return observer
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVideoSectionVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (videoSectionRef.current) observer.observe(videoSectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setClosingTextVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (closingTextRef.current) observer.observe(closingTextRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInvitationVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (invitationRef.current) observer.observe(invitationRef.current)
    return () => observer.disconnect()
  }, [])

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
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => fadeToVolume(0.3, 1500),
      onLeave: () => fadeToVolume(1, 1500),
      onEnterBack: () => fadeToVolume(0.3, 1500),
      onLeaveBack: () => fadeToVolume(1, 1500),
    })

    const videoTrigger = ScrollTrigger.create({
      trigger: videoSectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => fadeOut(1500),
      onLeaveBack: () => play(),
    })

    return () => {
      sectionTrigger.kill()
      videoTrigger.kill()
    }
  }, [fadeToVolume, fadeOut, play])

  // hex values ar faster in gsap a lot
  // --page-bg
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        backgroundColor: '#F3F3F3',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: isMobile ? 'top -175%' : 'top -120%',
          end: isMobile ? '+=30%' : '+=35%',
          scrub: isMobile ? 1: 1,
        },
      });
      
      gsap.fromTo('.text-transition', {
          color: '#f1f5f9' // slate-100 starting color
        },
        {
        color: '#293340',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: isMobile ? 'top -175%' : 'top -120%',
          end: isMobile ? '+=30%' : '+=35%',
          scrub: isMobile ? 1: 1,
        },
      });

      //       gsap.fromTo('.text-transition', {
      //     color: 'var(--text-transition-start)'
      //   },
      //   {
      //   color: 'var(--main-text)',
      //   scrollTrigger: {
      //     trigger: triggerRef.current,
      //     start: isMobile ? 'top -175%' : 'top -80%',
      //     end: isMobile ? '+=50%' : '+=50%',
      //     scrub: isMobile ? 1: 1,
      //   },
      // });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-title-section-bg relative">
      <div ref={triggerRef} style={{ minHeight: '120vh' }}>
        <div ref={sectionRef} className="w-full py-32 pb-8">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold text-slate-100 text-transition text-center mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
            lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)'
          }}
        >
          Opening the doors to Shree Swaminarayan Temple - Secaucus, NJ
        </motion.h2>
        
        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 xl:space-y-36">
        {content.map((item, index) => (
          <div
            key={index}
            ref={el => rowRefs.current[index] = el}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={rowsVisible[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: animDuration, ease: "easeOut" }}
              className="flex-1 order-1"
            >
              <h2 
                className="font-bold text-slate-100 text-transition mb-4 md:mb-6"
                style={{
                  fontSize: 'clamp(1.87rem, 6vw, 3.5rem)',
                  lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                {item.title}
              </h2>
              <p 
                className="text-slate-300 text-transition"
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                  lineHeight: 'clamp(1.4, 1.3 + 0.5vw, 1.6)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                {item.description}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={rowsVisible[index] ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: animDuration, ease: "easeOut" }}
              className="w-full md:w-[50%] order-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        ))}
        </div>
      </div>
      
      {/* Video Section - Separate */}
      <div ref={videoSectionRef} className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold text-slate-100 text-transition text-center mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)'
          }}
        >
          Suvarna Yug no Rajat Mahotsav
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={videoSectionVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: animDuration, ease: "easeOut" }}
            className="w-full md:w-[50%] order-2 md:order-1"
          >
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl" 
              style={{ position: 'relative', paddingTop: '56.42633228840125%' }}
            >
              <iframe
                src="https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/iframe?poster=https%3A%2F%2Fcustomer-kss5h1dwt4mkz0x3.cloudflarestream.com%2F6f4c127cc7b339c9b1b7875c1dc8e745%2Fthumbnails%2Fthumbnail.gif%3Ftime%3D28s%26duration%3D3s&defaultQuality=1080p"
                loading="lazy"
                style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            </div>
          </motion.div>
          
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: animDuration, ease: "easeOut" }}
            className="flex-1 order-1 md:order-2"
          >
            <h2 
              className="font-bold text-slate-100 text-transition mb-4 md:mb-6"
              style={{
                fontSize: 'clamp(1.87rem, 6vw, 3.5rem)',
                lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}
            >
              25 Years in Secaucus
            </h2>            
            <p 
              className="text-slate-300 text-transition"
              style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                lineHeight: 'clamp(1.4, 1.3 + 0.5vw, 1.6)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              What unfolded afterwards was a golden era of the growth of the faith and the flourishing of the supreme teachings and philosophy of Lord Shree Swaminarayanbapa Swamibapa, not only in New Jersey, but all throughout North America.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Closing Text */}
      <div ref={closingTextRef} className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20 pt-8 md:pt-12 pb-16 md:pb-20">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={closingTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-bold text-slate-100 text-transition text-left md:text-center mb-8 md:mb-10"
          style={{
            fontSize: 'clamp(1.87rem, 6vw, 3.5rem)',
            lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)'
          }}
        >
          Growth in America
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={closingTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-slate-300 text-transition text-left md:text-center"
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
            lineHeight: 'clamp(1.4, 1.3 + 0.5vw, 1.6)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          The Karan Satsang throughout America flourished magnificently after the Suvarna Tula Murti Pratishta, truly ushering in a golden era of growth for the entire Swaminarayan faith across North America. Temples and mandals sprouted abundantly from coast to coast, New York to Los Angeles, Toronto to Florida, as the seeds planted by Jeevanpran Shree Muktajeevan Swamibapa were lovingly nurtured by His divine successor, Acharya Swamishree Maharaj. Today, this thriving garden continues to flourish under the inspired guidance of Acharya Shree Jitendriyapriyadasji Swamiji Maharaj.
        </motion.p>
      </div>
      
      {/* Carousel */}
      <div className="w-full py-8 md:py-12">
        <Skiper54 images={mandalImages} />
      </div>
      
      {/* Final Invitation Text */}
      <div ref={invitationRef} className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-16 md:py-20">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={invitationVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-bold text-slate-100 text-transition text-left md:text-center mb-8 md:mb-10"
          style={{
            fontSize: 'clamp(1.87rem, 6vw, 3.5rem)',
            lineHeight: 'clamp(1.2, 1.1 + 0.5vw, 1.3)'
          }}
        >
          A Celebration of a Lifetime
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={invitationVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-slate-300 text-transition text-left md:text-center space-y-6 md:space-y-8"
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
            lineHeight: 'clamp(1.4, 1.3 + 0.5vw, 1.6)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          <p>
            The Shree Ghanshyam Maharaj Rajat Pratishta Mahotsav, which will take place from July 25 through August 2, 2026, will celebrate the 25th anniversary of the murti pratishtha of Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa, and the opening of Shree Swaminarayan Temple - Secaucus, New Jersey.
          </p>
          <p>
            This grand occasion will celebrate the past twenty-five years of faith, community, and fellowship at our temple, with scripture recitals, divine blessings from Acharya Swamiji Maharaj, cultural programs, special women's events, and a sports shibir.
          </p>
          <p>
            We pray to Lord Swaminarayanbapa Swamibapa to bless our efforts as we celebrate this momentous occasion. Through His divine guidance, grace, and strength, the devotees of Shree Swaminarayan Temple - Secaucus, NJ are honored to host an unforgettable mahotsav.
          </p>
          <p>
            As this temple holds a special place in the hearts of devotees all throughout North America and the world, the members of Shree Swaminarayan Temple - Secaucus, New Jersey, invite you and your family to be part of this Rajat Mahotsav.
          </p>
        </motion.div>
      </div>
        </div>
      </div>
    </div>
  )
}
