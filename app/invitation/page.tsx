"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Languages } from "lucide-react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { cn } from "@/lib/utils"
import "@/styles/invitation-theme.css"

type InvitationLanguage = "english" | "gujarati"

const invitationDocuments = [
  {
    key: "english" as const,
    label: "English",
    subtitle: "Formal invitation",
    filePath: "/invitations/rajat-invitation-english.pdf",
  },
  {
    key: "gujarati" as const,
    label: "ગુજરાતી",
    subtitle: "આધિકારિક નિમંત્રણ",
    filePath: "/invitations/rajat-invitation-gujarati.pdf",
  },
]

export default function InvitationPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<InvitationLanguage>("english")
  const [isViewerLoading, setIsViewerLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 260)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIsViewerLoading(true)
  }, [activeLanguage])

  const activeDocument = useMemo(
    () => invitationDocuments.find((doc) => doc.key === activeLanguage) ?? invitationDocuments[0],
    [activeLanguage]
  )

  const viewerSrc = `${activeDocument.filePath}#toolbar=1&navpanes=0&view=FitH`

  return (
    <div className="min-h-screen invitation-page-bg page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing">
        <StandardPageHeader
          title="Invitation"
          subtitle="Browse the Rajat Pratishtha Mahotsav invitation in English or Gujarati"
          description="Use the language toggle below to switch the live PDF viewer without leaving the website."
          isLoaded={isLoaded}
        />

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="invitation-shell mx-auto max-w-6xl rounded-[2rem] p-4 md:p-6"
        >
          <div className="invitation-toolbar mb-4 flex flex-col gap-3 rounded-2xl p-3 md:flex-row md:items-center md:justify-between md:p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-orange-600 shadow-sm">
                <Languages size={18} aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-slate-700">Invitation Language</p>
                <p className="text-xs text-slate-500">Switch instantly between both official PDFs</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/60 p-1.5 shadow-inner" role="group" aria-label="Invitation language">
              {invitationDocuments.map((document) => {
                const isActive = document.key === activeLanguage

                return (
                  <button
                    key={document.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveLanguage(document.key)}
                    className={cn(
                      "min-h-11 rounded-lg px-3 py-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "text-slate-700 hover:bg-white/90 hover:text-slate-900"
                    )}
                  >
                    <span className="block text-sm font-semibold leading-none">{document.label}</span>
                    <span className={cn("mt-1 block text-xs", isActive ? "text-white/90" : "text-slate-500")}>
                      {document.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id="invitation-viewer-panel"
            className="invitation-viewer relative overflow-hidden rounded-2xl"
            aria-label={`${activeDocument.label} invitation PDF viewer`}
          >
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeDocument.key}
                title={`${activeDocument.label} formal invitation PDF`}
                src={viewerSrc}
                className="h-[72vh] min-h-[420px] w-full bg-white md:min-h-[760px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onLoad={() => setIsViewerLoading(false)}
              />
            </AnimatePresence>

            <AnimatePresence>
              {isViewerLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-orange-50/90 to-white/90 backdrop-blur-[1px]"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="invitation-loading-ring" />
                    <p className="text-sm font-medium text-slate-600">Loading invitation document</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 md:text-sm">
            <FileText size={16} className="text-orange-500" aria-hidden />
            <span>
              Viewing: <strong className="font-semibold text-slate-800">{activeDocument.label}</strong>
            </span>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
