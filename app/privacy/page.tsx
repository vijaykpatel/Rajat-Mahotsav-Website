"use client"

import { useState, useEffect } from "react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"

export default function PrivacyPolicyPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing max-w-4xl">
        <StandardPageHeader
          title="Privacy Policy"
          description="Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you use our website and register for events."
          isLoaded={isLoaded}
        />

        <div className="prose prose-lg max-w-none bg-white rounded-xl shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              When you register for the NJ Rajat Mahotsav 2026, we collect personal information including your name, age, email address, phone number, country, mandal affiliation, and arrival/departure dates. This information is necessary to process your registration and communicate important event updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information you provide to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Process your event registration</li>
              <li>Communicate event schedules, updates, and important announcements</li>
              <li>Coordinate accommodations and logistics</li>
              <li>Improve our services and event planning</li>
              <li>Maintain records for organizational purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption and security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Your information is only shared with authorized temple staff and volunteers who need access to coordinate the event. We may share aggregated, non-personally identifiable information for statistical purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request corrections to your information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your personal information, please contact us through our <a href="/contact" className="text-orange-600 hover:text-orange-700 underline">Contact page</a>.
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600 italic">
              Last updated: February 2026. Shree Swaminarayan Temple Secaucus reserves the right to update this privacy policy as needed. Continued use of our services constitutes acceptance of any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
