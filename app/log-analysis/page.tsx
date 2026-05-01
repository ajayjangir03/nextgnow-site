import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LogAnalyzerClient from './LogAnalyzerClient'

export const metadata: Metadata = {
  title: 'Telecom Log Analysis — NextGNow',
  description: 'AI-powered 5G NAS, RRC, NGAP and protocol log analysis. Decode telecom traces instantly.',
}

export default function LogAnalysisPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10">
        <LogAnalyzerClient />
      </main>
      <Footer />
    </div>
  )
}
