import { ImageResponse } from 'next/og'

export const alt = 'Wisdom City Homes and Apartment — Clear power. Clear fees. Written promises.'
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
          padding: 80,
          background: 'linear-gradient(135deg, #0B1426 0%, #121D36 60%, #0B7A72 100%)',
          color: '#F4F7FB',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: '#19D3C5', color: '#0B1426', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 700 }}>
            W
          </div>
          <div style={{ fontSize: 30, color: '#A9B4C8' }}>Benin City, Nigeria</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 40, lineHeight: 1.05 }}>Wisdom City Homes and Apartment</div>
        <div style={{ fontSize: 36, marginTop: 28, color: '#19D3C5' }}>Clear power. Clear fees. Written promises.</div>
      </div>
    ),
    size,
  )
}
