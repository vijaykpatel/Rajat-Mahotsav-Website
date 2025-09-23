"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input"
import { CalendarDate } from "@internationalized/date"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import RegistrationDatePicker from "@/components/registration-date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useNavbarHeight } from "@/hooks/use-navbar-height"
import Typewriter from "@/components/typewriter"
import BackgroundPaths from "@/components/floating-paths"
import { supabase } from "@/utils/supabase/client"


const FormSchema = z.object({
  firstName: z.string().min(1, "First name is required").regex(/^[A-Za-z]+$/, "First name must contain only letters"),
  middleName: z.string().optional().refine((val) => !val || /^[A-Za-z]+$/.test(val), "Middle name must contain only letters"),
  lastName: z.string().min(1, "Last name is required").regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  age: z.string().min(1, "Age is required").refine((val) => {
    const num = parseInt(val)
    return !isNaN(num) && num >= 1 && num <= 99
  }, "Age must be a number between 1 and 99"),
  ghaam: z.string().min(1, "Ghaam is required").regex(/^[A-Za-z]+$/, "Ghaam must contain only letters"),
  country: z.string().min(1, "Country is required"),
  mandal: z.string().min(1, "Mandal is required"),
  email: z.string().email("Invalid email address"),
  phoneCountryCode: z.string().min(1, "Phone country code is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value && isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  dateRange: z.object({
    start: z.any().refine((val) => val !== null, "Arrival date is required"),
    end: z.any().refine((val) => val !== null, "Departure date is required"),
  }).refine((data) => {
    if (data.start && data.end) {
      return data.end.compare(data.start) >= 0
    }
    return true
  }, {
    message: "Departure date must be on or after arrival date",
  }),
})

type FormData = z.infer<typeof FormSchema>

export default function RegistrationPage() {
  const { toast } = useToast()
  const { dynamicPadding } = useNavbarHeight()
  const [formData, setFormData] = useState({
    country: "",
    mandal: ""
  })
  const [phoneCountry, setPhoneCountry] = useState<string>("US")


  const getPhoneCountryFromCountry = (country: string) => {
    const countryMap: { [key: string]: string } = {
      "australia": "AU",
      "canada": "CA", 
      "england": "GB",
      "india": "IN",
      "kenya": "KE",
      "usa": "US"
    }
    return countryMap[country] || "US"
  }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      ghaam: "",
      country: "",
      mandal: "",
      email: "",
      phoneCountryCode: "",
      phone: "",
      dateRange: { start: null, end: null }
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    console.log('Environment check:', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
    
    try {
      let nationalNumber = data.phone
      if (data.phone && isValidPhoneNumber(data.phone)) {
        try {
          const parsed = parsePhoneNumber(data.phone)
          if (parsed) {
            nationalNumber = parsed.nationalNumber
          }
        } catch (error) {
          console.log("Phone parsing error:", error)
        }
      }
      
      const dbData = {
        first_name: data.firstName,
        middle_name: data.middleName || null,
        last_name: data.lastName,
        age: parseInt(data.age),
        ghaam: data.ghaam,
        country: data.country,
        mandal: data.mandal,
        email: data.email,
        phone_country_code: data.phoneCountryCode,
        mobile_number: nationalNumber,
        arrival_date: data.dateRange.start?.toString(),
        departure_date: data.dateRange.end?.toString()
      }
      
      console.log('Attempting to insert:', dbData)
      
      const { error } = await supabase
        .from('registrations_dev')
        .insert([dbData])
        
      console.log('Supabase response:', { error })
      
      if (!error) {
        toast({
          title: `Successfully registered, ${data.firstName}!`,
          description: "Jay Shree Swaminarayan",
          className: "bg-green-600/90 text-white border-green-400/50 shadow-2xl backdrop-blur-lg font-medium",
        })
      } else {
        toast({
          title: "Registration failed",
          description: error.message,
          className: "bg-red-600/90 text-white border-red-400/50 shadow-2xl backdrop-blur-lg font-medium",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your connection and try again.",
        className: "bg-red-600/90 text-white border-red-400/50 shadow-2xl backdrop-blur-lg font-medium",
      })
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field as keyof FormData, value)
  }

  const getMandals = (country: string) => {
    const mandalOptions = {
      "england": ["Bolton", "London"],
      "usa": ["Alabama", "California", "Chicago", "Delaware", "Georgia", "Horseheads", "Kentucky", "New Jersey", "Ocala", "Ohio", "Seattle", "Tennessee", "Toronto"]
    }
    return mandalOptions[country as keyof typeof mandalOptions] || []
  }

  // Set loaded after component mounts with delay for mobile optimization
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Scrollable Background and Content */}
      <div className={`registration-container relative min-h-screen transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} data-page="registration" style={{paddingTop: dynamicPadding, minHeight: '100vh', backgroundImage: 'url(/blackpad.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/15 via-blue-200/15 to-blue-300/10"></div>
        <div className="hidden md:block">
          <BackgroundPaths />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Title with Typewriter Animation */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Typewriter 
              text="Register yourself for the Rajat Mahotsav!"
              speed={70}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 drop-shadow-2xl md:whitespace-nowrap"
            />
          </div>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mt-2 drop-shadow-lg px-4 leading-relaxed transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            Please register yourself and share with everyone you know is coming!
          </p>
        </div>

        {/* Registration Form */}
        <div className="relative">
          {/* Preloaded glow effect - always visible */}
          <div className="absolute -inset-8 bg-gradient-to-r from-red-500/30 via-white/30 to-blue-600/30 rounded-[3rem] blur-2xl opacity-60 will-change-transform"></div>
          <div className={`relative transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Card className="backdrop-blur-xl bg-white/10 border-4 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-3xl overflow-hidden relative">

            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-semibold text-white">Registration Form</CardTitle>
              <CardDescription className="text-gray-300">Please fill in your details to register</CardDescription>
            </CardHeader>
            
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-medium text-white">First Name *</Label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Middle Name */}
                <div className="space-y-2">
                  <Label htmlFor="middleName" className="text-base font-medium text-white">Middle Name</Label>
                  <Controller
                    name="middleName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="middleName"
                        type="text"
                        placeholder="Middle name"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.middleName && (
                    <p className="text-red-400 text-sm">{errors.middleName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-medium text-white">Last Name *</Label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-base font-medium text-white">Age *</Label>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.age && (
                    <p className="text-red-400 text-sm">{errors.age.message}</p>
                  )}
                </div>

                {/* Ghaam */}
                <div className="space-y-2">
                  <Label htmlFor="ghaam" className="text-base font-medium text-white">Ghaam *</Label>
                  <Controller
                    name="ghaam"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="ghaam"
                        type="text"
                        placeholder="Enter your ghaam"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.ghaam && (
                    <p className="text-red-400 text-sm">{errors.ghaam.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-base font-medium text-white">Country *</Label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={(value) => {
                        field.onChange(value)
                        updateFormData("country", value)
                        
                        // Set phone country based on selected country
                        const newPhoneCountry = getPhoneCountryFromCountry(value)
                        setPhoneCountry(newPhoneCountry)
                        
                        if (value === "india") {
                          updateFormData("mandal", "Maninagar")
                          setValue("mandal", "Maninagar", { shouldValidate: true })
                        } else if (value === "australia") {
                          updateFormData("mandal", "Sydney")
                          setValue("mandal", "Sydney", { shouldValidate: true })
                        } else if (value === "canada") {
                          updateFormData("mandal", "Toronto")
                          setValue("mandal", "Toronto", { shouldValidate: true })
                        } else if (value === "kenya") {
                          updateFormData("mandal", "Nairobi")
                          setValue("mandal", "Nairobi", { shouldValidate: true })
                        } else {
                          updateFormData("mandal", "")
                          setValue("mandal", "", { shouldValidate: true })
                        }
                      }}>
                        <SelectTrigger className="h-14 text-base bg-white/20 border-white/30 text-white backdrop-blur-sm">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="backdrop-blur-xl bg-white/10 border-4 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-xl">
                          <SelectItem value="australia" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇦🇺 Australia</SelectItem>
                          <SelectItem value="canada" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇨🇦 Canada</SelectItem>
                          <SelectItem value="england" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇬🇧 England</SelectItem>
                          <SelectItem value="india" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇮🇳 India</SelectItem>
                          <SelectItem value="kenya" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇰🇪 Kenya</SelectItem>
                          <SelectItem value="usa" className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">🇺🇸 United States</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-400 text-sm">{errors.country.message}</p>
                  )}
                </div>

                {/* Mandal */}
                <div className="space-y-2">
                  <Label htmlFor="mandal" className="text-base font-medium text-white">Mandal *</Label>
                  <Controller
                    name="mandal"
                    control={control}
                    render={({ field }) => (
                      (formData.country === "india" || formData.country === "australia" || formData.country === "canada" || formData.country === "kenya") ? (
                        <Input
                          {...field}
                          value={formData.mandal}
                          disabled
                          className="h-14 text-base bg-white/10 border-white/30 text-white/70 backdrop-blur-sm cursor-not-allowed"
                        />
                      ) : (
                        <Select value={field.value} onValueChange={field.onChange} disabled={!formData.country}>
                          <SelectTrigger className="h-14 text-base bg-white/20 border-white/30 text-white backdrop-blur-sm">
                            <SelectValue placeholder={formData.country ? "Select mandal" : "Select country first"} />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-xl bg-white/10 border-4 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-xl">
                            {getMandals(formData.country).map((mandal) => (
                              <SelectItem key={mandal} value={mandal.toLowerCase().replace(/ /g, '-')} className="text-white hover:bg-white/20 focus:bg-white/20 transition-all duration-200">{mandal}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    )}
                  />
                  {errors.mandal && (
                    <p className="text-red-400 text-sm">{errors.mandal.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium text-white">Email Address *</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium text-white">Phone Number *</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        id="phone"
                        placeholder="Enter a phone number"
                        defaultCountry={phoneCountry as any}
                        key={phoneCountry}
                        onChange={(value) => {
                          field.onChange(value)
                          if (value && isValidPhoneNumber(value)) {
                            try {
                              const parsed = parsePhoneNumber(value)
                              if (parsed) {
                                setValue("phoneCountryCode", `+${parsed.countryCallingCode}`, { shouldValidate: true })
                              }
                            } catch (error) {
                              console.log("Phone parsing error:", error)
                            }
                          }
                        }}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Date Range Picker */}
              <Controller
                name="dateRange"
                control={control}
                render={({ field }) => (
                  <RegistrationDatePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.dateRange?.message}
                  />
                )}
              />

              <div className="pt-6 space-y-4">
                {/* Test Toast Button */}
                {/* <button 
                  type="button"
                  onClick={() => {
                    toast({
                      title: "Test Toast - Success!",
                      description: "This is how your registration confirmation will look with the improved design and larger fonts.",
                      className: "bg-green-600 text-white border-green-700 shadow-xl backdrop-blur-sm",
                    })
                  }}
                  className="relative w-full h-12 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center px-4 py-2 text-white text-sm rounded-lg bg-blue-600/80 border border-blue-500/50 backdrop-blur-sm shadow-lg hover:bg-blue-600 transition-all duration-300"
                >
                  🧪 Test Toast Preview
                </button> */}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="relative w-full h-14 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center px-4 py-2 text-white text-base rounded-lg bg-white/10 border border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none antialiased disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b from-white/30 to-white/20 transform transition-transform duration-500 ${isSubmitting ? 'translate-y-0' : 'translate-y-full'}`}></div>
                  <div className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <Send className="w-5 h-5" />
                    ) : (
                      "Register"
                    )}
                  </div>
                </button>
              </div>
            </form>
            </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}