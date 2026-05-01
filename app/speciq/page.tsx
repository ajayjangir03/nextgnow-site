import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SpectrumAIFull from './SpectrumAIFull'

export const metadata: Metadata = {
  title: 'SpectrumAI — 5G NR & 6G AI Expert | NextGNow',
  description: 'SpectrumAI by NextGNow — your AI-powered 5G NR, 6G and 3GPP expert. Ask anything, decode specs, explore topics.',
}

export default function SpecIQPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10">
        <SpectrumAIFull />
      </main>
      <Footer />
    </div>
  )
}
