import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const filename = request.nextUrl.searchParams.get('filename')

  if (!url || !filename) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const response = await fetch(url)
  const blob = await response.blob()

  return new NextResponse(blob, {
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
    },
  })
}
