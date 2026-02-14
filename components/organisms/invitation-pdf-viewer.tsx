"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, ExternalLink, ScanLine, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

type InvitationLanguage = "english" | "gujarati"

type ViewerStatus = "loading" | "ready" | "error"

type ViewerState = {
  pageNumber: number
  totalPages: number
  zoom: number
  fitScale: number
  status: ViewerStatus
  errorMessage?: string
}

type InvitationPdfViewerProps = {
  filePath: string
  title: string
  languageKey: InvitationLanguage
}

type PdfRenderTask = {
  cancel: () => void
  promise: Promise<void>
}

type PdfPage = {
  getViewport: (options: { scale: number }) => { width: number; height: number }
  render: (options: {
    canvasContext: CanvasRenderingContext2D
    viewport: { width: number; height: number }
    transform?: number[]
    background?: string
  }) => PdfRenderTask
}

type PdfDocument = {
  numPages: number
  getPage: (pageNumber: number) => Promise<PdfPage>
  destroy: () => Promise<void>
}

type PdfLoadingTask = {
  promise: Promise<PdfDocument>
  destroy: () => void
}

type PdfJsModule = {
  GlobalWorkerOptions?: { workerSrc: string }
  getDocument: (source: string | { url: string }) => PdfLoadingTask
}

const MIN_ZOOM = 0.7
const MAX_ZOOM = 2.6
const ZOOM_STEP = 0.2
const SIDE_PADDING = 24

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const isAbortLikeError = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return false
  }

  const name = "name" in error ? String((error as { name?: string }).name ?? "") : ""
  const message = "message" in error ? String((error as { message?: string }).message ?? "") : ""
  const value = `${name} ${message}`.toLowerCase()

  return (
    value.includes("abort") ||
    value.includes("cancel") ||
    value.includes("destroy") ||
    value.includes("worker")
  )
}

const initialViewerState: ViewerState = {
  pageNumber: 1,
  totalPages: 0,
  zoom: 1,
  fitScale: 1,
  status: "loading",
}

export function InvitationPdfViewer({ filePath, title, languageKey }: InvitationPdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pdfDocumentRef = useRef<PdfDocument | null>(null)
  const renderTaskRef = useRef<PdfRenderTask | null>(null)
  const pdfJsRef = useRef<PdfJsModule | null>(null)

  const [viewerState, setViewerState] = useState<ViewerState>(initialViewerState)
  const [basePageWidth, setBasePageWidth] = useState(0)
  const [retryNonce, setRetryNonce] = useState(0)

  const computeFitScale = useCallback((pageWidth: number) => {
    const containerWidth = containerRef.current?.clientWidth ?? pageWidth
    const availableWidth = Math.max(containerWidth - SIDE_PADDING, 240)
    return clamp(availableWidth / pageWidth, 0.35, 2.8)
  }, [])

  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
        renderTaskRef.current = null
      }
      if (pdfDocumentRef.current) {
        void pdfDocumentRef.current.destroy().catch(() => undefined)
        pdfDocumentRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let isCancelled = false
    let loadingTask: PdfLoadingTask | null = null
    let previousDocument: PdfDocument | null = null

    const loadDocument = async () => {
      setViewerState(initialViewerState)
      setBasePageWidth(0)

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
        renderTaskRef.current = null
      }

      if (pdfDocumentRef.current) {
        previousDocument = pdfDocumentRef.current
        pdfDocumentRef.current = null
      }

      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          if (!pdfJsRef.current) {
            const module = await import("pdfjs-dist/webpack")
            const pdfJs = ((module as { default?: unknown }).default ?? module) as unknown as PdfJsModule
            if (pdfJs.GlobalWorkerOptions) {
              pdfJs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js"
            }
            pdfJsRef.current = pdfJs
          }

          loadingTask = pdfJsRef.current.getDocument(filePath)
          const pdfDocument = await loadingTask.promise

          if (isCancelled) {
            await pdfDocument.destroy()
            return
          }

          pdfDocumentRef.current = pdfDocument
          if (previousDocument) {
            void previousDocument.destroy().catch(() => undefined)
            previousDocument = null
          }

          const firstPage = await pdfDocument.getPage(1)
          if (isCancelled) {
            return
          }

          const width = firstPage.getViewport({ scale: 1 }).width
          const fitScale = computeFitScale(width)

          setBasePageWidth(width)
          setViewerState({
            pageNumber: 1,
            totalPages: pdfDocument.numPages,
            zoom: 1,
            fitScale,
            status: "loading",
          })

          return
        } catch (error: unknown) {
          if (isCancelled) {
            return
          }

          if (attempt === 0 && isAbortLikeError(error)) {
            await new Promise((resolve) => window.setTimeout(resolve, 80))
            continue
          }

          setViewerState((prev) => ({
            ...prev,
            status: "error",
            errorMessage: "Unable to load invitation preview. Please use Open or Download.",
          }))
          return
        }
      }
    }

    void loadDocument()

    return () => {
      isCancelled = true
      if (loadingTask) {
        try {
          loadingTask.destroy()
        } catch {
          // noop
        }
      }
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
        renderTaskRef.current = null
      }
      if (previousDocument) {
  }, [computeFitScale, filePath])
        previousDocument = null
      }
    }
  }, [computeFitScale, filePath, retryNonce])

  useEffect(() => {
    if (!basePageWidth || !containerRef.current) {
      return
    }

    const target = containerRef.current
    let frame = 0

    const updateScale = () => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const nextScale = computeFitScale(basePageWidth)
        setViewerState((prev) => {
          if (Math.abs(prev.fitScale - nextScale) < 0.01) {
            return prev
          }

          return {
            ...prev,
            fitScale: nextScale,
          }
        })
      })
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(target)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [basePageWidth, computeFitScale])

  useEffect(() => {
    const pdfDocument = pdfDocumentRef.current
    const canvas = canvasRef.current

    if (!pdfDocument || !canvas || viewerState.totalPages === 0) {
      return
    }

    let isCancelled = false

    const renderPage = async () => {
      setViewerState((prev) => (prev.status === "error" ? prev : { ...prev, status: "loading" }))

      try {
        const page = await pdfDocument.getPage(viewerState.pageNumber)
        if (isCancelled) {
          return
        }

        const viewport = page.getViewport({ scale: viewerState.fitScale * viewerState.zoom })
        const context = canvas.getContext("2d", { alpha: false })

        if (!context) {
          throw new Error("Canvas context not available")
        }

        const pixelRatio = window.devicePixelRatio || 1
        canvas.width = Math.floor(viewport.width * pixelRatio)
        canvas.height = Math.floor(viewport.height * pixelRatio)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel()
          renderTaskRef.current = null
        }

        const renderTask = page.render({
          canvasContext: context,
          viewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
          background: "#ffffff",
        })

        renderTaskRef.current = renderTask
        await renderTask.promise

        if (isCancelled) {
          return
        }

        setViewerState((prev) => ({
          ...prev,
          status: "ready",
          errorMessage: undefined,
        }))
      } catch (error: unknown) {
        if (isCancelled) {
          return
        }

        const errorName = typeof error === "object" && error !== null && "name" in error
          ? String((error as { name: string }).name)
          : ""

        if (errorName === "RenderingCancelledException" || isAbortLikeError(error)) {
          return
        }

        setViewerState((prev) => ({
          ...prev,
          status: "error",
          errorMessage: "Unable to render invitation preview. Please use Open or Download.",
        }))
      }
    }

    void renderPage()

    return () => {
      isCancelled = true
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
        renderTaskRef.current = null
      }
    }
  }, [viewerState.fitScale, viewerState.pageNumber, viewerState.totalPages, viewerState.zoom])

  const canGoPrev = viewerState.pageNumber > 1
  const canGoNext = viewerState.pageNumber < viewerState.totalPages

  const downloadFileName = useMemo(() => {
    const normalizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    return `${normalizedTitle || "invitation"}-${languageKey}.pdf`
  }, [languageKey, title])

  const goToPreviousPage = () => {
    setViewerState((prev) => ({
      ...prev,
      pageNumber: clamp(prev.pageNumber - 1, 1, Math.max(prev.totalPages, 1)),
    }))
  }

  const goToNextPage = () => {
    setViewerState((prev) => ({
      ...prev,
      pageNumber: clamp(prev.pageNumber + 1, 1, Math.max(prev.totalPages, 1)),
    }))
  }

  const zoomIn = () => {
    setViewerState((prev) => ({
      ...prev,
      zoom: clamp(prev.zoom + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM),
    }))
  }

  const zoomOut = () => {
    setViewerState((prev) => ({
      ...prev,
      zoom: clamp(prev.zoom - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM),
    }))
  }

  const fitToWidth = () => {
    setViewerState((prev) => ({ ...prev, zoom: 1 }))
  }

  const openInNewTab = () => {
    window.open(filePath, "_blank", "noopener,noreferrer")
  }

  const downloadPdf = () => {
    const anchor = document.createElement("a")
    anchor.href = filePath
    anchor.download = downloadFileName
    anchor.rel = "noopener"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  const isError = viewerState.status === "error"
  const isLoading = viewerState.status === "loading"

  return (
    <div
      id="invitation-viewer-panel"
      className="invitation-viewer relative overflow-hidden rounded-2xl"
      aria-label={`${title} invitation PDF viewer`}
    >
      <div className="invitation-pdf-toolbar sticky top-0 z-20">
        <div className="invitation-pdf-controls invitation-pdf-controls-left invitation-pdf-pagination invitation-pdf-pagination-top">
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={goToPreviousPage}
            disabled={!canGoPrev || isError}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={goToNextPage}
            disabled={!canGoNext || isError}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="invitation-pdf-page-indicator invitation-pdf-page-indicator-top" aria-live="polite">
          Page {Math.min(viewerState.pageNumber, Math.max(viewerState.totalPages, 1))} of {Math.max(viewerState.totalPages, 1)}
        </div>

        <div className="invitation-pdf-controls invitation-pdf-controls-right">
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={zoomOut}
            disabled={viewerState.zoom <= MIN_ZOOM || isError}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={zoomIn}
            disabled={viewerState.zoom >= MAX_ZOOM || isError}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={fitToWidth}
            disabled={isError}
            aria-label="Fit to width"
          >
            <ScanLine size={16} />
            <span>Fit</span>
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={openInNewTab}
            aria-label="Open PDF in new tab"
          >
            <ExternalLink size={16} />
            <span>Open</span>
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={downloadPdf}
            aria-label="Download PDF"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div ref={containerRef} className="invitation-pdf-canvas-wrap" aria-busy={isLoading}>
        {isError ? (
          <div className="invitation-pdf-error-state">
            <p>{viewerState.errorMessage}</p>
            <div className="invitation-pdf-error-actions">
              <button type="button" className="invitation-pdf-btn" onClick={() => setRetryNonce((value) => value + 1)}>
                Retry
              </button>
              <button type="button" className="invitation-pdf-btn" onClick={openInNewTab}>
                Open
              </button>
              <button type="button" className="invitation-pdf-btn" onClick={downloadPdf}>
                Download
              </button>
            </div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={cn("invitation-pdf-canvas", isLoading && "invitation-pdf-canvas-loading")}
            role="img"
            aria-label={`${title} invitation page ${viewerState.pageNumber}`}
          />
        )}

        <AnimatePresence>
          {isLoading && !isError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="invitation-pdf-loading-overlay"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="invitation-loading-ring" />
                <p className="text-sm font-medium text-slate-600">Loading invitation document</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="invitation-pdf-mobile-nav">
        <div className="invitation-pdf-controls invitation-pdf-pagination invitation-pdf-pagination-bottom">
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={goToPreviousPage}
            disabled={!canGoPrev || isError}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>
          <button
            type="button"
            className="invitation-pdf-btn"
            onClick={goToNextPage}
            disabled={!canGoNext || isError}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="invitation-pdf-page-indicator invitation-pdf-page-indicator-bottom" aria-live="polite">
          Page {Math.min(viewerState.pageNumber, Math.max(viewerState.totalPages, 1))} of {Math.max(viewerState.totalPages, 1)}
        </div>
      </div>
    </div>
  )
}
