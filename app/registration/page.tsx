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
import { Send, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CountrySelector } from "@/components/ui/country-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LazyPhoneInput from "@/components/lazy-phone-input"
import LazyDatePicker from "@/components/lazy-date-picker"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

import { useDeviceType } from "@/hooks/use-device-type"
import { supabase } from "@/utils/supabase/client"
import { motion } from "framer-motion"
import "@/styles/registration-theme.css"


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

  const deviceType = useDeviceType()
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
    mode: "onBlur",
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
      
      console.log('Attempting to upsert:', dbData)
      
      // First, check if record exists
      const { data: existingRecord } = await supabase
        .from('registrations_dev')
        .select('id')
        .eq('first_name', dbData.first_name)
        .eq('age', dbData.age)
        .eq('email', dbData.email)
        .eq('mobile_number', dbData.mobile_number)
        .maybeSingle()
      
      let error = null
      
      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('registrations_dev')
          .update(dbData)
          .eq('id', existingRecord.id)
        error = updateError
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('registrations_dev')
          .insert([dbData])
        error = insertError
      }
        
      console.log('Supabase response:', { error })
      
      if (!error) {
        const isUpdate = existingRecord !== null
        toast({
          title: isUpdate ? `Updated existing registration, ${data.firstName}!` : `Successfully registered, ${data.firstName}!`,
          description: "Jay Shree Swaminarayan",
          className: "bg-green-500 text-white border-green-400 shadow-xl font-medium",
        })
      } else {
        toast({
          title: "Registration failed",
          description: error.message,
          className: "bg-red-500 text-white border-red-400 shadow-xl font-medium",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your connection and try again.",
        className: "bg-red-500 text-white border-red-400 shadow-xl font-medium",
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
      <div className={`min-h-[calc(100vh+200px)] w-full reg-page-bg page-bg-extend transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} data-page="registration">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-bottom-spacing">
        {/* Title */}
        <div className="text-center page-header-spacing">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="standard-page-title reg-title"
          >
            Register yourself for the Rajat Mahotsav!
          </motion.h1>
        </div>

        {/* Desktop Layout: Side by side, Mobile: Stacked */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
          {/* Important Instructions - Left Third on Desktop */}
          <div className={`lg:col-span-1 transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          } mt-8 lg:mt-0 px-4 lg:px-0`} style={{ transitionDelay: '400ms' }}>
            <div className="reg-important-card rounded-xl p-4 lg:p-6 relative lg:sticky lg:top-8">
              <h3 className="text-center reg-text-primary font-semibold text-xl lg:text-2xl mb-4">Important</h3>
              <div className="space-y-3 text-justify">
                <p className="reg-text-secondary leading-relaxed text-sm lg:text-base">
                  Please register yourself and share with everyone you know is coming!
                </p>
                <p className="reg-text-secondary leading-relaxed text-sm lg:text-base">
                  If you are registering a family member or friend, please ensure <span className="reg-text-highlight underline">the combination of first name, age, phone number, and email are unique</span>.
                </p>
                <p className="reg-text-secondary leading-relaxed text-sm lg:text-base">
                  Registering with the same combination of the above 4 fields will overwrite any previous registrations with matching fields.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Form - Right Two-Thirds on Desktop */}
          <div className="lg:col-span-2 relative mt-8 lg:mt-0">
            {/* Subtle glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-white/20 to-red-200/30 rounded-[2rem] blur-xl opacity-40 will-change-transform"></div>
            <div className={`relative transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <Card className="reg-card rounded-3xl overflow-hidden relative">

                <CardHeader className="text-center pb-6 lg:pb-8">
                  <CardTitle className="text-2xl lg:text-3xl font-semibold reg-text-primary">Registration Form</CardTitle>
                  <CardDescription className="reg-text-secondary">Please fill in your details to register</CardDescription>
                </CardHeader>
                
                <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="reg-label">First Name *</Label>
                  <Controller
                    name="firstName"
                    control={control}
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
                  {errors.firstName && (
                    <p className="reg-error-text">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Middle Name */}
                <div className="space-y-2">
                  <Label htmlFor="middleName" className="reg-label">Middle Name</Label>
                  <Controller
                    name="middleName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="middleName"
                        type="text"
                        placeholder="Middle name"
                        className="reg-input rounded-md"
                      />
                    )}
                  />
                  {errors.middleName && (
                    <p className="reg-error-text">{errors.middleName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="reg-label">Last Name *</Label>
                  <Controller
                    name="lastName"
                    control={control}
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
                  {errors.lastName && (
                    <p className="reg-error-text">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="reg-label">Age *</Label>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        className="reg-input rounded-md"
                      />
                    )}
                  />
                  {errors.age && (
                    <p className="reg-error-text">{errors.age.message}</p>
                  )}
                </div>

                {/* Ghaam */}
                <div className="space-y-2">
                  <Label htmlFor="ghaam" className="reg-label">Ghaam *</Label>
                  <Controller
                    name="ghaam"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="ghaam"
                        type="text"
                        placeholder="Enter your ghaam"
                        className="reg-input rounded-md"
                      />
                    )}
                  />
                  {errors.ghaam && (
                    <p className="reg-error-text">{errors.ghaam.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="reg-label">Country *</Label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <CountrySelector
                        value={field.value}
                        onChange={(value) => {
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
                        }}
                        placeholder="Select your country"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="reg-error-text">{errors.country.message}</p>
                  )}
                </div>

                {/* Mandal */}
                <div className="space-y-2">
                  <Label htmlFor="mandal" className="reg-label">Mandal *</Label>
                  <Controller
                    name="mandal"
                    control={control}
                    render={({ field }) => (
                      (formData.country === "india" || formData.country === "australia" || formData.country === "canada" || formData.country === "kenya") ? (
                        <Input
                          {...field}
                          value={formData.mandal}
                          disabled
                          className="reg-input rounded-md"
                        />
                      ) : (
                        <Select value={field.value} onValueChange={field.onChange} disabled={!formData.country}>
                          <SelectTrigger className="reg-input rounded-md">
                            <SelectValue placeholder={formData.country ? "Select mandal" : "Select country first"} />
                          </SelectTrigger>
                          <SelectContent className="reg-popover rounded-xl">
                            {getMandals(formData.country).map((mandal) => (
                              <SelectItem key={mandal} value={mandal.toLowerCase().replace(/ /g, '-')} className="reg-popover-item rounded-lg">{mandal}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    )}
                  />
                  {errors.mandal && (
                    <p className="reg-error-text">{errors.mandal.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="reg-label">Email Address *</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="reg-input rounded-md"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="reg-error-text">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="reg-label">Phone Number *</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <LazyPhoneInput
                        value={field.value}
                        id="phone"
                        placeholder="Enter a phone number"
                        defaultCountry={phoneCountry as any}
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
                    <p className="reg-error-text">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Date Range Picker */}
              <Controller
                name="dateRange"
                control={control}
                render={({ field }) => (
                  <LazyDatePicker
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.dateRange?.message}
                  />
                )}
              />

              <div className="pt-4 space-y-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="reg-button relative w-full h-14 inline-flex items-center justify-center text-center px-4 py-2 text-base rounded-lg overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent transform transition-transform duration-500 ${isSubmitting ? 'translate-y-0' : 'translate-y-full'}`}></div>
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Register
                      </>
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
      </div>
      <Toaster />
    </>
  )
}