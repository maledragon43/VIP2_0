import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'VIP 2.0 - Instant Video Connections & Social Discovery',
    template: '%s | VIP 2.0'
  },
  description: 'Meet new people instantly through live video chat. VIP 2.0 connects you with real people through our fun VIP Spin mechanic. Chat, laugh, match, and build meaningful connections.',
  keywords: [
    'video chat',
    'social discovery',
    'meet new people',
    'live video',
    'instant connection',
    'social app',
    'video dating',
    'random chat',
    'VIP spin',
    'social networking'
  ],
  authors: [{ name: 'VIP 2.0 Team' }],
  creator: 'VIP 2.0',
  publisher: 'VIP 2.0',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vip2.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vip2.app',
    title: 'VIP 2.0 - Instant Video Connections & Social Discovery',
    description: 'Meet new people instantly through live video chat. Connect through our fun VIP Spin mechanic.',
    siteName: 'VIP 2.0',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VIP 2.0 - Instant Video Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIP 2.0 - Instant Video Connections & Social Discovery',
    description: 'Meet new people instantly through live video chat. Connect through our fun VIP Spin mechanic.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d946ef" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'VIP 2.0',
              description: 'Instant video connections and social discovery app',
              url: 'https://vip2.app',
              applicationCategory: 'SocialNetworkingApplication',
              operatingSystem: 'Web, iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-vip-50 to-primary-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
