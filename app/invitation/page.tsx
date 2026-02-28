"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { InvitationPdfViewer } from "@/components/organisms/invitation-pdf-viewer"
import { cn } from "@/lib/utils"
import "@/styles/registration-theme.css"
import "@/styles/invitation-theme.css"

type InvitationLanguage = "english" | "gujarati"

const invitationDocuments = [
  {
    key: "english" as const,
    label: "English",
    filePath: "/invitations/rajat-invitation-english2.pdf",
  },
  {
    key: "gujarati" as const,
    label: "ગુજરાતી",
    filePath: "/invitations/rajat-invitation-gujarati.pdf",
  },
]

export default function InvitationPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<InvitationLanguage>("english")

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 260)
    return () => window.clearTimeout(timer)
  }, [])

  const activeDocument = useMemo(
    () => invitationDocuments.find((doc) => doc.key === activeLanguage) ?? invitationDocuments[0],
    [activeLanguage]
  )

  return (
    <div className="min-h-[calc(100vh+200px)] w-full reg-page-bg page-bg-extend" data-page="invitation">
      <div className="container mx-auto px-4 page-bottom-spacing">
        <StandardPageHeader
          title="Rajat Pratishtha Mahotsav Invitation"
          isLoaded={isLoaded}
        />

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="invitation-shell mx-auto max-w-6xl rounded-[2rem] p-4 md:p-6"
        >
          <div className="invitation-toolbar mb-4 flex justify-center rounded-2xl p-3 md:p-4">
            <div className="grid w-full max-w-md grid-cols-2 gap-3" role="group" aria-label="Invitation language">
              {invitationDocuments.map((document) => {
                const isActive = document.key === activeLanguage

                return (
                  <button
                    key={document.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveLanguage(document.key)}
                    className={cn(
                      "invitation-toggle-btn w-full inline-flex items-center justify-center px-4 py-2 text-center text-base rounded-lg",
                      isActive
                        ? "reg-button invitation-toggle-btn-active"
                        : "admin-btn-outline invitation-toggle-btn-inactive"
                    )}
                  >
                    <span className="block text-sm font-semibold leading-none">{document.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <InvitationPdfViewer
            filePath={activeDocument.filePath}
            title={`${activeDocument.label} formal invitation`}
            languageKey={activeDocument.key}
          />

          <p className="mt-4 text-center text-xs font-medium text-slate-600 md:text-sm">Showing {activeDocument.label} invitation</p>
        </motion.section>
      </div>
    </div>
  )
}
