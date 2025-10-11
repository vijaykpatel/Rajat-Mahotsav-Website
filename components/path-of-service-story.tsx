"use client"

import { motion } from "framer-motion"

const sections = [
  {
    title: "The Path of Service",
    subtitle: "How Swaminarayan Bhagwan's Example and Sacred Texts Guide Our Community Service",
    content: "For millions of followers, the life and teachings of Swaminarayan Bhagwan provide a profound blueprint for integrating spirituality and social service. His personal example of selfless service (seva) and specific injunctions recorded in sacred texts form the theological bedrock for humanitarian work within the Swaminarayan tradition. Beyond mere charity, this service is a spiritual practice—a form of devotion (bhakti) that purifies the soul and brings one closer to God."
  },
  {
    title: "A Life Dedicated to the Suffering",
    content: "From a young age, Swaminarayan Bhagwan demonstrated a deep sense of compassion for the needy. During His seven-year pilgrimage as the young ascetic Nilkanth Varni, He encountered a sick preacher named Sevakram in a remote forest. Despite His own intense austerities, which often left Him fasting, Nilkanth nursed the preacher back to health for two months, carrying his belongings when he was too weak to walk. This incident, recorded in the Vachanamrut, exemplifies Swaminarayan Bhagwan's attitude of detached compassion—a worldly engagement in the service of others while remaining spiritually disengaged from personal comforts."
  },
  {
    title: "Compassion in Action",
    content: "Later, as a spiritual leader, He continued to prioritize helping those in distress. During the devastating famine of 1812–1813, Swaminarayan Bhagwan organized free food distribution centers across 18 villages. He personally participated in the relief efforts, and inspired His followers to donate their own grains to the hungry. A hymn written by Premanand Swami during Swaminarayan Bhagwan's time captures His compassionate nature:",
    quote: "The master's nature is extremely compassionate, He is deeply moved by the suffering of others"
  },
  {
    title: "A Scriptural Mandate for Community Service",
    content: "Swaminarayan Bhagwan established a tradition of service through teachings and written commands found in scriptures (shastras) from His lifetime. The Shikshapatri, a code of conduct written in 1826, includes directives for community service such as being charitable to the poor (verse 83), serving the ailing (verse 139), establishing educational institutions (verse 132), and providing disaster relief (verse 119).",
    additionalContent: "The Vachanamrut, a compilation of Swaminarayan Bhagwan's discourses from 1819 to 1829, explains that service for God and His devotees is a spiritual action that constitutes devotion and earns God's grace. The Bhaktachintamani by Nishkulanand Swami also highlights Swaminarayan Bhagwan's compassionate actions and humanitarian efforts."
  },
  {
    title: "Service as a Spiritual Partnership",
    content: "The Swaminarayan tradition teaches that following these scriptural commands transforms good deeds into acts of devotion. Swaminarayan Bhagwan taught that meeting basic human needs is necessary for spiritual progress, making community service an essential part of spiritual life. This legacy continues today through the Maninagar Shree Swaminarayan Gadi Sansthan and its Mandirs across the globe that undertake humanitarian projects, reflecting the belief that integrating service and spirituality leads to personal growth and liberation. Through volunteerism, healthcare, and disaster relief, devotees embody Swaminarayan Bhagwan's teachings."
  }
]

export function PathOfServiceStory() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-20">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          {section.subtitle && (
            <h3 className="text-lg md:text-xl text-orange-600 font-semibold mb-3 text-center">
              {section.subtitle}
            </h3>
          )}
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 text-center leading-tight">
            {section.title}
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            {section.content}
          </p>

          {section.quote && (
            <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 italic text-xl text-gray-800 bg-orange-50/50 rounded-r-lg">
              "{section.quote}"
            </blockquote>
          )}

          {section.additionalContent && (
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {section.additionalContent}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
