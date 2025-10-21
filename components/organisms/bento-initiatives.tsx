"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/molecules/dialog"
import { Heart, Users, Utensils, Home, TreePine, Calendar } from "lucide-react"

const initiatives = [
  {
    id: 1,
    title: "Food Distribution",
    icon: Utensils,
    description: "Providing meals to those in need",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    className: "md:col-span-1",
    details: {
      overview: "Our food distribution program serves over 500 families weekly, providing nutritious meals and groceries to those facing food insecurity in our community.",
      achievements: [
        "10,000+ meals served this year",
        "15 distribution centers established",
        "200+ volunteer hours weekly",
        "Partnership with 8 local food banks"
      ],
      impact: "We've reduced food insecurity by 40% in our target neighborhoods and established sustainable partnerships with local grocery stores for regular donations."
    }
  },
  {
    id: 2,
    title: "Healthcare Outreach",
    icon: Heart,
    description: "Free health checkups and awareness",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    className: "md:col-span-1",
    details: {
      overview: "We organize monthly health camps providing free medical checkups, health screenings, and wellness education to underserved communities.",
      achievements: [
        "2,000+ people screened annually",
        "12 health camps organized",
        "50+ medical volunteers",
        "Early detection of 200+ health issues"
      ],
      impact: "Our health camps have led to early detection and treatment of various conditions, improving community health outcomes by 35%."
    }
  },
  {
    id: 3,
    title: "Environmental Care",
    icon: TreePine,
    description: "Community cleanup and tree planting",
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-50",
    className: "md:col-span-1",
    details: {
      overview: "Our environmental initiative focuses on community beautification, tree planting, and promoting sustainable practices among community members.",
      achievements: [
        "500+ trees planted",
        "25 community cleanups organized",
        "1,000+ volunteers participated",
        "10 parks adopted and maintained"
      ],
      impact: "We've improved air quality in our neighborhoods and created more green spaces for community enjoyment and environmental health."
    }
  },
  {
    id: 4,
    title: "Community Events",
    icon: Calendar,
    description: "Supporting local 5Ks and service events",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    className: "md:col-span-1",
    details: {
      overview: "We actively support and organize community events including charity 5K runs, neighborhood gatherings, and ongoing service opportunities that bring people together.",
      achievements: [
        "15+ community events hosted annually",
        "8 charity 5K runs organized",
        "3,000+ participants engaged",
        "$50,000+ raised for local causes"
      ],
      impact: "Our events have strengthened community bonds and raised significant funds for local charities while promoting health and wellness."
    }
  }
]

export function BentoInitiatives() {
  const [selectedInitiative, setSelectedInitiative] = useState<typeof initiatives[0] | null>(null)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl lg:text-4xl font-bold community-text-primary mb-4">
          Our Community Initiatives
        </h2>
        <p className="text-lg community-text-secondary max-w-2xl mx-auto">
          Discover the various ways we're making a positive impact in our community through dedicated service and compassion.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[20rem] max-w-7xl mx-auto">
        {initiatives.map((initiative, index) => {
          const Icon = initiative.icon
          return (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={initiative.className}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02] h-full">
                    <div className="text-center space-y-4 h-full flex flex-col justify-center">
                      <div className="flex justify-center">
                        <div className={`p-4 rounded-full bg-gradient-to-br ${initiative.color}`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold community-text-primary">
                          {initiative.title}
                        </h3>
                        <p className="community-text-secondary text-sm">
                          {initiative.description}
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-xs community-text-accent font-medium">
                          Click to learn more →
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0 bg-white rounded-2xl overflow-hidden">
                  <DialogTitle className="sr-only">{initiative.title}</DialogTitle>
                  {/* Image Header */}
                  <div className={`relative h-48 bg-gradient-to-br ${initiative.color} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <Icon className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold">{initiative.title}</h2>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 community-text-primary">Overview</h4>
                      <p className="community-text-secondary leading-relaxed">
                        {initiative.details.overview}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 community-text-primary">Key Achievements</h4>
                      <ul className="space-y-2">
                        {initiative.details.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center gap-2 community-text-secondary">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 community-text-primary">Community Impact</h4>
                      <p className="community-text-secondary leading-relaxed">
                        {initiative.details.impact}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}