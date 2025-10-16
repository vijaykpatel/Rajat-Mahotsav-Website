"use client"

import { motion } from "framer-motion"
import { getR2Image } from "@/lib/cdn-assets"
import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    title: "750 Kilograms of Pure Gold",
    description:
      "Our beloved Prem Murti Acharya Shree Purushottampriyadasji Swamishree Maharaj traditionally weighed all three divine marble idols against 750 kilograms of pure gold and then ceremonially installed them into the sacred sihasan. Never before had such a magnificent Suvarna Tula taken place, creating a timeless memory that will endure for generations.",
    image: getR2Image("/main/2001_2.JPG"),
  },
  {
    title: "A Historic Moment",
    description:
      "The five-day grand opening Murti Pratishtha Mahotsav, featuring spiritual discourses, Indian cultural dance and music, honorable guests, fireworks, and a vibrant parade, is still remembered as one of the most remarkable events in the history of our sansthan. The unwavering dedication of volunteers, whose tireless efforts and collective contributions made the construction of this temple possible, remains a lasting testament to the devotion and vision of our beloved Prem Murti Acharya Swamishree Maharaj and the entire Swaminarayan community.",
    image: getR2Image("/main/2001_3.JPG"),
  },
]

export default function PratisthaStory({ children }: { children?: React.ReactNode }) {
  const [rowsVisible, setRowsVisible] = useState<boolean[]>([false, false, false])
  const [animDuration, setAnimDuration] = useState(1.2)
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // hex values ar faster in gsap a lot
  // --page-bg
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        backgroundColor: '#F3F3F3',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: isMobile ? 'top -175%' : 'top -80%',
          end: isMobile ? '+=50%' : '+=50%',
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
          start: isMobile ? 'top -175%' : 'top -70%',
          end: isMobile ? '+=30%' : '+=20%',
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
        <div ref={sectionRef} className="w-full py-32 pb-40">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 xl:space-y-36 mb-20">
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
      </div>
      {children}
    </div>
  )
}
