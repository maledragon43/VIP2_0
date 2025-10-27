import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import PricingSection from '@/components/home/PricingSection'
import CTASection from '@/components/home/CTASection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'VIP 2.0 - Instant Video Connections & Social Discovery',
  description: 'Meet new people instantly through live video chat. VIP 2.0 connects you with real people through our fun VIP Spin mechanic. Chat, laugh, match, and build meaningful connections.',
  openGraph: {
    title: 'VIP 2.0 - Instant Video Connections & Social Discovery',
    description: 'Meet new people instantly through live video chat. Connect through our fun VIP Spin mechanic.',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
