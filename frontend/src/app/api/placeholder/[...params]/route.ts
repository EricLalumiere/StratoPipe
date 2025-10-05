import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  try {
    const { params: paramArray } = await params
    const [width, height] = paramArray
    
    // Validate dimensions
    const w = parseInt(width) || 100
    const h = parseInt(height) || 100
    
    // Create a simple SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle" dy=".3em">
          ${w}×${h}
        </text>
      </svg>
    `
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    return new NextResponse('Error generating placeholder', { status: 500 })
  }
}