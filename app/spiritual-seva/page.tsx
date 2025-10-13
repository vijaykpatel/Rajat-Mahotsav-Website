"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { StandardPageHeader } from "@/components/standard-page-header"
import { useDeviceType } from "@/hooks/use-device-type"
import { Clock, Footprints, BookOpenText } from "lucide-react"
import { GiPrayerBeads } from "react-icons/gi"
import { PiHandsPraying } from "react-icons/pi"
import { ImageMarquee } from "@/components/image-marquee"
import { SevaSubmissionForm } from "@/components/seva-submission-form"
import "@/styles/community-service-theme.css"

const sevaGoals = [
  { icon: GiPrayerBeads, label: "Malas", target: 250, description: "Meditational Prayer Beads" },
  { icon: Clock, label: "Dhyaan", target: 250, description: "Fully body Meditation", suffix: "min" },
  { icon: Footprints, label: "Pradakshinas", target: 250, description: "Clockwise devotion around the sihasan" },
  { icon: PiHandsPraying, label: "Dandvats", target: 250, description: "Physical devoation to Lord Swaminarayan" },
  { icon: Footprints, label: "Padyatras", target: 25, description: "Walks to the Mandir" },
]

const parayans = [
  { 
    icon: BookOpenText, 
    title: "Sadachar Sandesh", 
    description: "Teachings of Acharya Shree Purushottampriyadasji Swamishree Maharaj",
    gujaratiLink: "https://www.swaminarayangadi.com/publications/books/scriptures/english/sadachar-sandesh-gujarati",
    englishLink: "https://www.swaminarayangadi.com/publications/books/scriptures/english/sadachar-sandesh-english"
  },
  { 
    icon: BookOpenText, 
    title: "Harignanamrut Kavya", 
    description: "Kirtans composed by Jeevanpran Shree Muktajeevan Swamibapa",
    gujaratiLink: "https://www.swaminarayangadi.com/publications/books/kirtanbooks/gujarati/shree-harignanamurt-kavya-amrut-bindu-1",
    gujaratiLink2: "https://www.swaminarayangadi.com/publications/books/kirtanbooks/gujarati/shree-harignanamurt-kavya-amrut-bindu-2",
    gujaratiLink3: "https://www.swaminarayangadi.com/publications/books/kirtanbooks/gujarati/shree-harignanamurt-kavya-amrut-bindu-3",
    gujaratiLink4: "https://www.swaminarayangadi.com/publications/books/kirtanbooks/gujarati/shree-harignanamurt-kavya-amrut-bindu-4",
    englishLink: "https://www.swaminarayangadi.com/publications/books/kirtanbooks/transliteration/shree-harignanamrut-kavya-transliteration"
  },
  { 
    icon: BookOpenText, 
    title: "Bapashree ni Vato", 
    description: "Discourses by Jeevanpran Shree Abji Bapashree",
    gujaratiLink: "https://www.swaminarayangadi.com/publications/books/scriptures/gujarati/shree-abji-bapashree-ni-vato-bhag-1",
    gujaratiLink2: "https://www.swaminarayangadi.com/publications/books/scriptures/gujarati/shree-abji-bapashree-ni-vato-bhag-2",
    englishLink: "https://www.swaminarayangadi.com/publications/books/scriptures/english/shree-abji-bapashree-ni-vato-part-1-english",
    englishLink2: "https://www.swaminarayangadi.com/publications/books/scriptures/english/shree-abji-bapashree-ni-vato-part-2-english"
  },
]

const firstRowImages = [
  { src: "https://placehold.co/600x400/orange/white?text=Spiritual+Seva+1", alt: "Spiritual Seva 1" },
  { src: "https://placehold.co/600x400/red/white?text=Spiritual+Seva+2", alt: "Spiritual Seva 2" },
  { src: "https://placehold.co/600x400/orange/white?text=Spiritual+Seva+3", alt: "Spiritual Seva 3" },
  { src: "https://placehold.co/600x400/red/white?text=Spiritual+Seva+4", alt: "Spiritual Seva 4" },
  { src: "https://placehold.co/600x400/orange/white?text=Spiritual+Seva+5", alt: "Spiritual Seva 5" },
]

const secondRowImages = [
  { src: "https://placehold.co/600x400/red/white?text=Spiritual+Seva+6", alt: "Spiritual Seva 6" },
  { src: "https://placehold.co/600x400/orange/white?text=Spiritual+Seva+7", alt: "Spiritual Seva 7" },
  { src: "https://placehold.co/600x400/red/white?text=Spiritual+Seva+8", alt: "Spiritual Seva 8" },
  { src: "https://placehold.co/600x400/orange/white?text=Spiritual+Seva+9", alt: "Spiritual Seva 9" },
  { src: "https://placehold.co/600x400/red/white?text=Spiritual+Seva+10", alt: "Spiritual Seva 10" },
]

export default function SpiritualSevaPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const deviceType = useDeviceType()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      data-page="spiritual-seva"
    >
      
      <section className="min-h-screen">
        <div className="relative z-10">
          <div className="mb-36">
            <StandardPageHeader
              title="Rajat Mahotsav Spiritual Initiative"
              subtitle="Bhakti, Dharma, Gnyan, Vairagya"
              description="In celebration of our Temple's Rajat Mahotsav, devotees are coming together in a collective spiritual endeavor that extends far beyond a single event. We are transforming this momentous milestone into a year-round journey of spiritual growth, using this celebration as a catalyst to deepen our devotion and strengthen our eternal bond with God. Through dedicated niyams and seva, and by embracing the four pillars of Bhakti, Gnyan, Dharma, and Vairagya, we commit to sustaining this spiritual momentum throughout the year, ensuring that the divine inspiration of our Rajat Mahotsav becomes a lasting foundation for our path toward God."
              isLoaded={isLoaded}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="w-full mb-20"
          >
            <ImageMarquee firstRow={firstRowImages} secondRow={secondRowImages} />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
            <div className="space-y-8">
              <div className="max-w-4xl mx-auto space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
                >
                  Monthly Spiritual Goals
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify"
                >
                  Over a ten-month period (October 2025 – July 2026), each haribhakt is encouraged to complete monthly spiritual goals — including 250 Malas, 250 minutes of Dhyan, 250 Pradakshinas, 250 Dandvats, and 25 Padyatras to the Mandir.
                </motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {sevaGoals.map((goal, index) => {
                  const Icon = goal.icon
                  return (
                    <motion.div
                      key={goal.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02] h-full">
                        <div className="text-center space-y-4">
                          <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                              <Icon className="h-8 w-8 community-text-accent" />
                            </div>
                          </div>
                          <div className="text-3xl lg:text-4xl font-bold community-text-primary">
                            {goal.target}
                            {goal.suffix && <span className="text-lg ml-1">{goal.suffix}</span>}
                          </div>
                          <h4 className="text-lg font-semibold community-text-primary">
                            {goal.label}
                          </h4>
                          <p className="text-sm community-text-secondary">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-4xl mx-auto space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
                >
                  Sacred Scripture Parayans
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify"
                >
                  In addition, devotees are inspired to complete Parayans of sacred scriptures such as Sadachar Sandesh, Harignanamrut Kavya, and Bapashree ni Vato, further enriching their spiritual journey.
                </motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {parayans.map((parayan, index) => {
                  const Icon = parayan.icon
                  return (
                    <motion.div
                      key={parayan.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out p-6 hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col">
                        <div className="text-center space-y-4 flex-1">
                          <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                              <Icon className="h-8 w-8 community-text-accent" />
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold community-text-primary">
                            {parayan.title}
                          </h4>
                          <p className="text-sm community-text-secondary">
                            {parayan.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            {(parayan.gujaratiLink2 || parayan.gujaratiLink3 || parayan.gujaratiLink4) ? (
                              <>
                                <span className="text-sm font-medium text-gray-700">ભાગ:</span>
                                <a href={parayan.gujaratiLink} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">1</a>
                                {parayan.gujaratiLink2 && <a href={parayan.gujaratiLink2} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">2</a>}
                                {parayan.gujaratiLink3 && <a href={parayan.gujaratiLink3} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">3</a>}
                                {parayan.gujaratiLink4 && <a href={parayan.gujaratiLink4} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">4</a>}
                              </>
                            ) : (
                              <a href={parayan.gujaratiLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline transition-colors">ગુજરાતી</a>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {parayan.englishLink2 ? (
                              <>
                                <span className="text-sm font-medium text-gray-700">Part:</span>
                                <a href={parayan.englishLink} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">1</a>
                                <a href={parayan.englishLink2} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-sm font-semibold transition-colors">2</a>
                              </>
                            ) : (
                              <a href={parayan.englishLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline transition-colors">English</a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-8 mt-20">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-200"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
                    Seva Tracking & Checkpoint
                  </h3>
                  <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
                    <p>
                      We will begin collecting seva submissions soon to track our collective spiritual progress throughout the Rajat Mahotsav period.
                    </p>
                    <p>
                      <span className="font-bold text-orange-600">January 1st Checkpoint:</span> We will conduct a live review of individual totals, serving as an important milestone to celebrate seva completed and inspire continued dedication to our spiritual goals.
                    </p>
                    <p>
                      This checkpoint will help motivate everyone to maintain momentum and complete their monthly seva targets as we journey together toward our collective spiritual aspirations.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* <div className="space-y-8 mt-20">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
              >
                Submit Your Seva
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <SevaSubmissionForm />
              </motion.div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}
