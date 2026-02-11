import './globals.css'

export const metadata = {
  title: 'EcoTrack – Community Tool Sharing Marketplace',
  description: 'Share tools. Save money. Reduce waste.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
