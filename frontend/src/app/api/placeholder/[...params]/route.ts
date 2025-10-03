import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const [width, height] = params.params;
  
  // Default values
  const w = parseInt(width) || 32;
  const h = parseInt(height) || 32;
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f1f5f9"/>
      <rect x="10%" y="10%" width="80%" height="80%" fill="#e2e8f0"/>
      <circle cx="50%" cy="40%" r="15%" fill="#94a3b8"/>
      <rect x="25%" y="65%" width="50%" height="10%" fill="#94a3b8"/>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}


