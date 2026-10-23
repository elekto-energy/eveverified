import { ImageResponse } from 'next/og'

// Site-wide social card. Replaces the former '/og-image.png' reference in
// app/layout.tsx, which pointed at a file that never existed in /public and
// so returned 404 for every share preview.
//
// Text is limited to the site name and the existing root <title> tagline.
// No product claim is introduced here.

export const alt = 'EVE Verified - Evidence Verification Engine'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#0b1120',
          color: '#e8eef6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 112,
              height: 112,
              borderRadius: 20,
              border: '2px solid #1e2d45',
              background: '#0f172a',
              color: '#60a5fa',
              fontSize: 80,
              fontStyle: 'italic',
              fontFamily: 'serif',
            }}
          >
            e
          </div>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: 2 }}>EVE Verified</div>
        </div>
        <div style={{ marginTop: 40, fontSize: 40, color: '#9fb0c8' }}>
          Evidence Verification Engine
        </div>
        <div style={{ marginTop: 72, fontSize: 28, color: '#60a5fa' }}>eveverified.com</div>
      </div>
    ),
    size,
  )
}
