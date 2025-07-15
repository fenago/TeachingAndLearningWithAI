import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}

// Font
export const contentType = 'image/png'

// Route segment config
export const runtime = 'edge'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#8B5CF6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          position: 'relative',
        }}
      >
        {/* Book shape */}
        <div style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          background: 'white',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#8B5CF6',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
          transform: 'rotate(-5deg)'
        }}>
          PS
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also define the ImageResponse's width and height.
      ...size,
    }
  )
}
