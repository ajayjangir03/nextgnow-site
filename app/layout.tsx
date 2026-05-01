import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextGNow — 5G · 6G · 3GPP · Telecom Intelligence',
  description: 'NextGNow — deep technical telecom knowledge platform for 5G NR, 6G, 3GPP, O-RAN and AI-driven networks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="ng-mesh">{children}</body>
    </html>
  )
}
