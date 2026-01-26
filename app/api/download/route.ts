import { NextRequest, NextResponse } from 'next/server'

// Allowlist of permitted domains for download
const ALLOWED_DOMAINS = [
  'cdn.njrajatmahotsav.com',
  'imagedelivery.net',
]

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

function isUrlAllowed(urlString: string): boolean {
  try {
    const url = new URL(urlString)

    // Only allow HTTPS
    if (url.protocol !== 'https:') {
      return false
    }

    // Check if domain is in allowlist
    const hostname = url.hostname.toLowerCase()
    const isAllowed = ALLOWED_DOMAINS.some(domain =>
      hostname === domain || hostname.endsWith(`.${domain}`)
    )

    if (!isAllowed) {
      return false
    }

    // Block private IP ranges
    const privateIpPatterns = [
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^localhost$/i,
      /^0\.0\.0\.0$/,
      /^::1$/,
      /^fe80:/i,
    ]

    if (privateIpPatterns.some(pattern => pattern.test(hostname))) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const filename = request.nextUrl.searchParams.get('filename')

  if (!url || !filename) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Validate URL is from allowed domain
  if (!isUrlAllowed(url)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 })
  }

  // Sanitize filename to prevent path traversal
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')

  try {
    const response = await fetch(url, {
      // Set timeout
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: response.status })
    }

    // Check content length
    const contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
    }

    const blob = await response.blob()

    // Double-check blob size
    if (blob.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
    }

    return new NextResponse(blob, {
      headers: {
        'Content-Disposition': `attachment; filename="${sanitizedFilename}"`,
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
  }
}
