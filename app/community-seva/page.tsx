"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Heart, Users, Clock, MapPin, DollarSign, Send, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import LazyPhoneInput from "@/components/molecules/lazy-phone-input"
import { CountrySelector } from "@/components/molecules/country-selector"
import { useDeviceType } from "@/hooks/use-device-type"
import { ImageMarquee } from "@/components/organisms/image-marquee"
import { getCloudflareImage } from "@/lib/cdn-assets"
import { ProgressCounter } from "@/components/molecules/progress-counter"
import { BentoInitiatives } from "@/components/organisms/bento-initiatives"
import { AnimatedTextSection } from "@/components/organisms/animated-text-section"
import { useToast } from "@/hooks/use-toast"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { PathOfServiceStory } from "@/components/organisms/path-of-service-story"
import { Toaster } from "@/components/molecules/toaster"
import { supabase } from "@/utils/supabase/client"
import "@/styles/community-service-theme.css"
import "@/styles/registration-theme.css"

const firstRowImages = [
  { src: getCloudflareImage("001591ef-616d-40ae-7102-30f4bad78b00"), alt: "Community Service Event 1" }, // local police 5k
  { src: getCloudflareImage("79c313ad-200d-448f-4609-0b70f44ac500"), alt: "Community Service Event 1" }, // funds donation
  { src: getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"), alt: "Community Service Event 2" }, // hall bd
  { src: getCloudflareImage("1a01f892-a3ab-4715-496c-bd570de83b00"), alt: "Community Service Event 3" }, // food & toy
  { src: getCloudflareImage("428174c3-965c-4055-f941-381562cf8000"), alt: "Community Service Event 4" }, // t shirts raising
  { src: getCloudflareImage("b8af526f-08f9-4a68-9280-466597ed7400"), alt: "Community Service Event 5" }, // community lighting
  { src: getCloudflareImage("2725d2b7-fa9a-4300-356d-719da7932f00"), alt: "Community Service Event 11" }, // american cancer
  { src: getCloudflareImage("30526bd0-cd22-4496-bed1-f9e9451b3b00"), alt: "Community Service Event 13" }, // health camp 1
  { src: getCloudflareImage("782e5779-3834-4e09-ae43-24f174632200"), alt: "Community Service Event 15" }, // blood bus
  { src: getCloudflareImage("e78f5926-785f-4a48-0515-3cdf10216e00"), alt: "Community Service Event 17" }, // visa camp
]

const secondRowImages = [
  { src: getCloudflareImage("c80899d2-8dcb-4420-90ea-bea0c4b7fa00"), alt: "Community Service Event 6" }, //medshare
  { src: getCloudflareImage("d556615a-8d35-4506-b04a-4b359c5ef900"), alt: "Community Service Event 6" }, // tree planting
  { src: getCloudflareImage("eed0022e-457e-4949-cd9f-220c08971300"), alt: "Community Service Event 7" }, // 5k sharing network band
  { src: getCloudflareImage("e3d55165-9b4c-4313-7047-524f689bda00"), alt: "Community Service Event 8" }, // ladies hurrican relief
  { src: getCloudflareImage("0344f8a6-96d7-4885-8124-8c0851f02500"), alt: "Community Service Event 9" }, // earth day
  { src: getCloudflareImage("2f2f3c0b-c371-41c5-3e94-043fad0da700"), alt: "Community Service Event 10" }, // pizza
  { src: getCloudflareImage("df2179f1-cb42-4f5c-a542-5fc7cba05500"), alt: "Community Service Event 12" }, // ealry food drive
  { src: getCloudflareImage("6fb86845-e7a9-48ff-f1b8-88b28b6dc700"), alt: "Community Service Event 14" }, // health camp 2
  { src: getCloudflareImage("ee07b747-ecc9-4437-e620-348a2e9c8d00"), alt: "Community Service Event 16" }, // blood donation sign
]

const SevaFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").regex(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: z.string().min(1, "Last name is required").regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value && isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  activityName: z.string().min(1, "Activity name is required"),
  country: z.string().min(1, "Country is required"),
  mandal: z.string().min(1, "Mandal is required"),
  hoursVolunteered: z.string().min(1, "Hours are required").refine((val) => {
    const validHours = ["0.5", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    return validHours.includes(val)
  }, "Please select valid hours"),
})

async function fetchCommunityStats() {
  const [communityRes, personalRes] = await Promise.all([
    supabase
      .from('community_seva_records')
      .select('volunteer_hours, meals_served, community_events, funds_raised'),
    supabase
      .from('personal_seva_submission')
      .select('volunteer_hours')
  ])
  
  const communityTotals = communityRes.data
    ? communityRes.data.reduce((acc, record) => ({
        volunteer_hours: acc.volunteer_hours + (record.volunteer_hours || 0),
        meals_served: acc.meals_served + (record.meals_served || 0),
        community_events: acc.community_events + (record.community_events || 0),
        funds_raised: acc.funds_raised + (record.funds_raised || 0)
      }), { volunteer_hours: 0, meals_served: 0, community_events: 0, funds_raised: 0 })
    : { volunteer_hours: 0, meals_served: 0, community_events: 0, funds_raised: 0 }

  const personalVolunteerHours = personalRes.data
    ? personalRes.data.reduce((sum, record) => sum + (record.volunteer_hours || 0), 0)
    : 0
  
  return {
    ...communityTotals,
    volunteer_hours: communityTotals.volunteer_hours + personalVolunteerHours,
  }
}

type SevaFormData = z.infer<typeof SevaFormSchema>

export default function CommunityServicePage() {
  const [statsData, setStatsData] = useState({ volunteer_hours: 0, meals_served: 0, community_events: 0, funds_raised: 0 })
  const [sevaFormData, setSevaFormData] = useState({
    country: "",
    mandal: "",
  })
  const { toast } = useToast()

  const deviceType = useDeviceType()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSevaSubmitting, setIsSevaSubmitting] = useState(false)

  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const {
    control: sevaControl,
    handleSubmit: handleSevaSubmit,
    formState: { errors: sevaErrors },
    setValue: setSevaValue,
    reset: resetSevaForm,
  } = useForm<SevaFormData>({
    resolver: zodResolver(SevaFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      activityName: "",
      country: "",
      mandal: "",
      hoursVolunteered: "",
    },
  })

  const onSevaSubmit = async (data: SevaFormData) => {
    setIsSevaSubmitting(true)
    try {
      let nationalNumber = data.phone
      if (data.phone && isValidPhoneNumber(data.phone)) {
        const parsed = parsePhoneNumber(data.phone)
        if (parsed) nationalNumber = parsed.nationalNumber
      }

      const dbData = {
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_number: nationalNumber,
        country: data.country,
        mandal: data.mandal,
        activity_name: data.activityName,
        volunteer_hours: parseFloat(data.hoursVolunteered),
      }

      const { error } = await supabase.from('personal_seva_submission').insert([dbData])

      if (!error) {
        toast({
          title: `Seva recorded, ${data.firstName}!`,
          description: "Jay Shree Swaminarayan. Thank you for your contribution.",
          className: "bg-green-500 text-white border-green-400 shadow-xl font-medium",
        })
        resetSevaForm()
      } else {
        throw error
      }
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Please check your connection and try again.",
        className: "bg-red-500 text-white border-red-400 shadow-xl font-medium",
      })
    } finally {
      setIsSevaSubmitting(false)
    }
  }

  const updateSevaFormData = (field: keyof typeof sevaFormData, value: string) => {
    setSevaFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSevaValue(field, value)
  }

  const getMandals = (country: string) => {
    const mandalOptions: { [key: string]: string[] } = {
      "england": [
        "Bolton",
        "London"
      ],
      "usa": [
        "Alabama",
        "California",
        "Chicago",
        "Delaware",
        "Georgia",
        "Horseheads",
        "Kentucky",
        "New Jersey",
        "Ocala",
        "Ohio",
        "Seattle",
        "Tennessee",
        "Toronto"
      ]
    }
    return mandalOptions[country] || []
  }

  const specialMandalCountries = ["india", "australia", "canada", "kenya"]
  const isSpecialMandalCountry = (country: string) => {
    return specialMandalCountries.includes(country)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    fetchCommunityStats().then(setStatsData)
    return () => clearTimeout(timer)
  }, [])

  const communityStats = [
    {
      icon: Clock,
      label: "Volunteer Hours",
      current: statsData.volunteer_hours,
      target: 2500,
      suffix: "hrs"
    },
    {
      icon: Users,
      label: "Meals Served",
      current: statsData.meals_served,
      target: 10000,
      suffix: ""
    },
    {
      icon: Heart,
      label: "Community Events",
      current: statsData.community_events,
      target: 25,
      suffix: ""
    },
    {
      icon: DollarSign,
      label: "Funds Raised",
      current: statsData.funds_raised,
      target: 25000,
      prefix: "$",
      suffix: "",
      formatWithComma: true
    }
  ]

  return (
    <div 
      className={`w-full community-page-bg page-bg-extend transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      data-page="community-service"
    >
      <style jsx>{`
        [data-navbar] {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
      
      {/* Section 1: Hero + Our Community in Action */}
        <div className="z-10">
          {/* Hero Content */}
          <div className="">
            <StandardPageHeader
              title="Community Seva"
              subtitle="Seva in Action"
              description=""
              isLoaded={isLoaded}
            />
            
            {/* Custom Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="text-left text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed space-y-1">
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Devotion.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Compassion.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Community.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Selfless Service.</p>
              </div>
            </motion.div>
            
            {/* Additional Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center px-4 mt-8"
            >
              <p className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-5xl">
                Inspired by the core teachings of Swaminarayan Bhagwan, the countless examples of compassion and selflessness from Acharya Shree Purushottampriyadasji Swamishree Maharaj, and the guiding vision of unity from Acharya Shree Jitendriyapriyadasji Swamiji Maharaj, we celebrate our Rajat Mahotsav (25th Anniversary) by doing what Swaminarayan Bhagwan held near and dear; seva, selfless service.
              </p>
            </motion.div>
          </div>
        </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 py-8">
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
                >
                  Our Progress Towards Our Rajat Mahotsav Goals
                </motion.h2>
                {/* <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl community-text-secondary"
                >
                  Together, we're making a difference in our community. Here's a live tracker of us on our way to meeting our Rajat Mahotsav Community Service Goals!
                </motion.p> */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityStats.map((stat, index) => (
                  <ProgressCounter
                    key={stat.label}
                    {...stat}
                    delay={index * 0.2}
                    inView={isStatsInView}
                  />
                ))}
              </div>
          </motion.div>
      </div>
      
      {/* Sections 2 & 3: Why We Serve + Our 25-Year Mission - With snap */}
      <AnimatedTextSection />
      
      {/* Section 4: Community Initiatives + Impact Statistics + Mission in Action */}
      <section className="min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pb-20 space-y-20">

          {/* Support Our Mission - Donations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl mb-6 font-bold community-text-primary mb-4"
              >
                Support Our Mission
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-2xl lg:text-3xl font-semibold text-orange-600 mb-6"
              >
                Volunteer With Us
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl community-text-secondary max-w-4xl mb-6 mx-auto leading-relaxed"
              >
                There are many ways to get involved, from joining our organized community seva events to helping out in your own community in Swaminarayan Bhagwan's name. If you've completed community service on your own, please let us know by filling out the form below. Your efforts count towards our collective goal!
              </motion.p>
            </div>
            
            {/* Record Your Seva Form */}
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-white/20 to-red-200/30 rounded-[2rem] blur-xl opacity-40 will-change-transform"></div>
                <div className="relative">
                  <Card className="reg-card rounded-3xl overflow-hidden relative">
                    <CardHeader className="text-center pb-6 lg:pb-8">
                      <CardTitle className="text-xl lg:text-2xl font-semibold reg-text-primary">Personal Seva Submission</CardTitle>
                      <CardDescription className="reg-text-secondary text-base">Please fill in your details to record your seva</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSevaSubmit(onSevaSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="reg-label">First Name *</Label>
                            <Controller
                              name="firstName"
                              control={sevaControl}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  id="firstName"
                                  type="text"
                                  placeholder="First name"
                                  className="reg-input rounded-md"
                                />
                              )}
                            />
                            {sevaErrors.firstName && (
                              <p className="reg-error-text">{sevaErrors.firstName.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="reg-label">Last Name *</Label>
                            <Controller
                              name="lastName"
                              control={sevaControl}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  id="lastName"
                                  type="text"
                                  placeholder="Last name"
                                  className="reg-input rounded-md"
                                />
                              )}
                            />
                            {sevaErrors.lastName && (
                              <p className="reg-error-text">{sevaErrors.lastName.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="reg-label">Phone Number *</Label>
                          <Controller
                            name="phone"
                            control={sevaControl}
                            render={({ field }) => (
                              <LazyPhoneInput
                                value={field.value}
                                id="phone"
                                placeholder="Enter a phone number"
                                defaultCountry="US"
                                onChange={field.onChange}
                              />
                            )}
                          />
                          {sevaErrors.phone && (
                            <p className="reg-error-text">{sevaErrors.phone.message}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country" className="reg-label">Country *</Label>
                            <Controller
                              name="country"
                              control={sevaControl}
                              render={({ field }) => (
                                <CountrySelector
                                  value={field.value}
                                  onChange={(value) => {
                                    field.onChange(value)
                                    updateSevaFormData("country", value)
                                    if (value === "india") {
                                      updateSevaFormData("mandal", "Maninagar")
                                      setSevaValue("mandal", "Maninagar", { shouldValidate: true })
                                    } else if (value === "australia") {
                                      updateSevaFormData("mandal", "Sydney")
                                      setSevaValue("mandal", "Sydney", { shouldValidate: true })
                                    } else if (value === "canada") {
                                      updateSevaFormData("mandal", "Toronto")
                                      setSevaValue("mandal", "Toronto", { shouldValidate: true })
                                    } else if (value === "kenya") {
                                      updateSevaFormData("mandal", "Nairobi")
                                      setSevaValue("mandal", "Nairobi", { shouldValidate: true })
                                    } else {
                                      updateSevaFormData("mandal", "")
                                      setSevaValue("mandal", "", { shouldValidate: true })
                                    }
                                  }}
                                  placeholder="Select your country"
                                />
                              )}
                            />
                            {sevaErrors.country && (
                              <p className="reg-error-text">{sevaErrors.country.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mandal" className="reg-label">Mandal *</Label>
                            <Controller
                              name="mandal"
                              control={sevaControl}
                              render={({ field }) =>
                                isSpecialMandalCountry(sevaFormData.country) ? (
                                  <Input
                                    {...field}
                                    value={sevaFormData.mandal}
                                    disabled
                                    className="reg-input rounded-md"
                                  />
                                ) : (
                                  <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value)
                                      setSevaValue("mandal", value, { shouldValidate: true })
                                    }}
                                    disabled={!sevaFormData.country}
                                  >
                                    <SelectTrigger className="reg-input rounded-md">
                                      <SelectValue placeholder={sevaFormData.country ? "Select mandal" : "Select country first"} />
                                    </SelectTrigger>
                                    <SelectContent className="reg-popover rounded-xl">
                                      {getMandals(sevaFormData.country).map((mandal) => (
                                        <SelectItem key={mandal} value={mandal.toLowerCase().replace(/ /g, '-')} className="reg-popover-item rounded-lg">
                                          {mandal}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )
                              }
                            />
                            {sevaErrors.mandal && (
                              <p className="reg-error-text">{sevaErrors.mandal.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="activityName" className="reg-label">Activity Name *</Label>
                            <Controller
                              name="activityName"
                              control={sevaControl}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  id="activityName"
                                  type="text"
                                  placeholder="e.g. Local food bank volunteering"
                                  className="reg-input rounded-md"
                                />
                              )}
                            />
                            {sevaErrors.activityName && (
                              <p className="reg-error-text">{sevaErrors.activityName.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hoursVolunteered" className="reg-label">Hours Volunteered *</Label>
                            <Controller
                              name="hoursVolunteered"
                              control={sevaControl}
                              render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger className="reg-input rounded-md">
                                    <SelectValue placeholder="Select hours volunteered" />
                                  </SelectTrigger>
                                  <SelectContent className="reg-popover rounded-xl">
                                    <SelectItem value="0.5" className="reg-popover-item rounded-lg">0.5 hours</SelectItem>
                                    <SelectItem value="1" className="reg-popover-item rounded-lg">1 hour</SelectItem>
                                    <SelectItem value="2" className="reg-popover-item rounded-lg">2 hours</SelectItem>
                                    <SelectItem value="3" className="reg-popover-item rounded-lg">3 hours</SelectItem>
                                    <SelectItem value="4" className="reg-popover-item rounded-lg">4 hours</SelectItem>
                                    <SelectItem value="5" className="reg-popover-item rounded-lg">5 hours</SelectItem>
                                    <SelectItem value="6" className="reg-popover-item rounded-lg">6 hours</SelectItem>
                                    <SelectItem value="7" className="reg-popover-item rounded-lg">7 hours</SelectItem>
                                    <SelectItem value="8" className="reg-popover-item rounded-lg">8 hours</SelectItem>
                                    <SelectItem value="9" className="reg-popover-item rounded-lg">9 hours</SelectItem>
                                    <SelectItem value="10" className="reg-popover-item rounded-lg">10 hours</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {sevaErrors.hoursVolunteered && (
                              <p className="reg-error-text">{sevaErrors.hoursVolunteered.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 space-y-4">
                          <button
                            type="submit"
                            disabled={isSevaSubmitting}
                            className="reg-button relative w-full h-14 inline-flex items-center justify-center text-center px-4 py-2 text-base rounded-lg overflow-hidden"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent transform transition-transform duration-500 ${isSevaSubmitting ? 'translate-y-0' : 'translate-y-full'}`}></div>
                            <div className="relative z-10 flex items-center justify-center gap-2">
                              {isSevaSubmitting ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  Please wait
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5" />
                                  Submit Seva
                                </>
                              )}
                            </div>
                          </button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
            
            <div className="text-center mt-20 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl lg:text-3xl font-semibold text-orange-600"
              >
                Your Gift, Doubled
              </motion.p>  
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl p-8 border-2 border-orange-200"
              >
                <div className="space-y-6 text-lg community-text-secondary leading-relaxed">
                  <p>
                    A few generous donors have stepped forward to match every dollar donated, up to $10,000. That means your $50 becomes $100. Your $250 becomes $500. Every contribution you make will have twice the impact in feeding the hungry, sheltering the homeless, and caring for our community.
                  </p>
                  <p className="font-semibold text-orange-600">
                    Together, we can turn $10,000 into $20,000—and reach our full goal of $25,000 to fund a year of transformative service.
                  </p>
                  <p>
                    Your financial support helps us purchase supplies, organize events, and reach more people in need. Every dollar goes directly toward feeding, sheltering, and caring for our community.
                  </p>
                  <p className="font-semibold">
                    This is your chance to double your impact. Will you help us unlock this match?
                  </p>
                </div>
                
                <div className="flex justify-center mt-8">
                  <a
                    href="https://ssssmusa.breezechms.com/give/online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-orange-700 hover:to-red-700"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    DONATE NOW - DOUBLE YOUR IMPACT
                  </a>
                </div>
                
                <div className="mt-8 pt-8 border-t-2 border-orange-200">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 text-center">
                    Where Your Support Goes
                  </h3>
                  <ul className="space-y-2 text-lg community-text-secondary">
                    <li className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Homeless shelter care kits with essential hygiene items</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Hot meals for families facing food insecurity</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Health camps and wellness programs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Environmental restoration projects</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Educational support for underserved youth</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-base community-text-secondary text-center mt-8 italic">
                  All donations are tax-deductible. The matching gift is available on a first-come, first-served basis until we reach the $10,000 match limit. We're grateful for any amount you can share.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission in Action - YouTube Shorts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
              >
                Our Mission in Action
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg community-text-secondary"
              >
                Highlights from our recent community service events
              </motion.p>
            </div>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl shadow-xl p-6 max-w-sm flex flex-col items-center border-2 border-gray-200 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[9/16] max-h-[560px] w-full max-w-[315px]">
                  <iframe
                    src="https://www.youtube.com/embed/_sRpl5rM-M8?rel=0&modestbranding=1"
                    title="Community Service Event"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-center text-sm community-text-secondary leading-relaxed">
                  Shree Swaminarayan Gadi Secaucus Temple celebrates 25 years while supporting the local Secaucus PD fundraiser for Special Olympics NJ with a 5k run.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl shadow-xl p-6 max-w-sm flex flex-col items-center border-2 border-gray-200 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[9/16] max-h-[560px] w-full max-w-[315px]">
                  <iframe
                    src="https://www.youtube.com/embed/eJPBUDgnb2A?rel=0&modestbranding=1"
                    title="Community Service Event"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-center text-sm community-text-secondary leading-relaxed">
                  Shree Swaminarayan Temple - Secaucus, New Jersey partnered with Beat to Breathe to host a CPR workshop. Fifty volunteers gathered in Shree Muktajeevan Swamibapa Community Hall to learn life saving medical skills.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div>
          <PathOfServiceStory />
        </div>

        <div className="pb-20">
          <ImageMarquee firstRow={firstRowImages} secondRow={secondRowImages} />
        </div>
      </section>
      <Toaster />
    </div>
  )
}