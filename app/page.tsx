import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RadarAnimation from '@/components/RadarAnimation'

const DOMAINS = [
  {
    icon: '🛰️', label: '6G + AI',
    desc: 'AI-native networks, RIS, THz communications, ISAC and IMT-2030 research.',
    tag: 'IMT-2030', tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    accent: 'hover:border-violet-500/40 hover:shadow-[0_8px_32px_rgba(139,92,246,.12)]',
  },
  {
    icon: '📡', label: '5G',
    desc: 'Physical layer, massive MIMO, 5G Core, O-RAN, protocols and call flows.',
    tag: '3GPP Rel-19', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accent: 'hover:border-blue-500/40 hover:shadow-[0_8px_32px_rgba(59,130,246,.12)]',
  },
  {
    icon: '🔬', label: 'Log Analysis',
    desc: 'Decode 5G NAS, RRC, NGAP and SBI protocol logs with AI-assisted analysis.',
    tag: 'AI-Powered', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accent: 'hover:border-emerald-500/40 hover:shadow-[0_8px_32px_rgba(16,185,129,.12)]',
  },
  {
    icon: '📋', label: '3GPP Releases',
    desc: 'Release 17, 18 and 19 features explained clearly for practising engineers.',
    tag: 'Rel-17 → 19', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accent: 'hover:border-amber-500/40 hover:shadow-[0_8px_32px_rgba(245,158,11,.12)]',
  },
]

const TOOLS = [
  { icon: '🤖', name: 'SpectrumAI',       desc: 'Your AI-powered 5G NR & 6G expert grounded in 3GPP specs.',  badge: 'Coming Soon' },
  { icon: '🔍', name: 'Spec Decoder',     desc: 'Paste any 3GPP TS/TR clause, get plain-English expert decoding.', badge: 'Coming Soon' },
  { icon: '📊', name: 'Log Analyzer',     desc: 'AI-assisted decoding of NAS, RRC, NGAP and SBI protocol logs.', badge: 'Coming Soon' },
  { icon: '🔄', name: 'Call Flow Viewer', desc: 'Visual step-by-step 5G signalling: Registration, PDU Session, Handover.', badge: 'Coming Soon' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative z-10">

        {/* ══ HERO ══ */}
        <section className="pt-16 pb-14 overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-16 items-center">

              {/* Left */}
              <div className="fade-up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#3B82F6] text-[11px] font-bold tracking-[.08em] uppercase px-4 py-1.5 rounded-full mb-7 font-['JetBrains_Mono']">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" style={{ boxShadow:'0 0 8px #10B981' }} />
                  Telecom Intelligence Platform
                </div>

                {/* Headline */}
                <h1 className="font-['Syne'] font-extrabold text-[52px] leading-[1.05] tracking-[-1.5px] text-[#F8FAFC] mb-6">
                  Tomorrow&apos;s{' '}
                  <span className="grad-text">Telecom</span>
                  <br />
                  Explained{' '}
                  <span className="grad-text">Today</span>
                </h1>

                <p className="text-[16px] text-[#94A3B8] leading-[1.8] font-light max-w-[460px] mb-10">
                  Deep technical knowledge for 5G NR, 6G, O-RAN and 3GPP specifications — with AI-powered tools and real engineering insights.
                </p>

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap mb-12">
                  <a href="#"
                    className="inline-flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-3.5 rounded-xl grad-bg btn-glow hover:-translate-y-0.5 transition-all duration-200">
                    Explore Articles
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <a href="#"
                    className="inline-flex items-center gap-2 text-[#CBD5E1] font-medium text-[14px] px-6 py-3.5 rounded-xl border border-[#1C324F] bg-[#0A1628] hover:border-[#234070] hover:text-[#F8FAFC] transition-all duration-200">
                    <svg className="w-4 h-4 text-[#06B6D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
                    </svg>
                    Ask SpectrumAI
                  </a>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-8 border-t border-[#132033] flex-wrap">
                  {[
                    { num: '5G+6G', lbl: 'Core Topics'       },
                    { num: 'Daily', lbl: 'Fresh Content'      },
                    { num: 'Rel-19', lbl: '3GPP Release'      },
                    { num: 'Free',   lbl: 'Always'            },
                  ].map((s) => (
                    <div key={s.lbl}>
                      <div className="font-['Syne'] font-extrabold text-[26px] text-[#3B82F6] leading-none">{s.num}</div>
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#475569] mt-1.5 tracking-widest uppercase">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Radar */}
              <div className="hidden lg:block fade-up-1">
                <RadarAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* ══ DOMAINS ══ */}
        <section className="py-14 border-t border-[#132033]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-[#132033]"/>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#475569] tracking-widest uppercase px-2">Core Domains</span>
              <div className="h-px flex-1 bg-[#132033]"/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {DOMAINS.map((d) => (
                <div key={d.label} className={`ng-card p-6 flex flex-col gap-4 cursor-pointer ${d.accent} transition-all duration-200`}>
                  <div className="text-[2rem] mb-1">{d.icon}</div>
                  <div className={`font-['JetBrains_Mono'] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border w-fit ${d.tagColor}`}>
                    {d.tag}
                  </div>
                  <h3 className="font-['Syne'] font-bold text-[16px] text-[#F8FAFC]">{d.label}</h3>
                  <p className="text-[13px] text-[#64748B] leading-relaxed font-light">{d.desc}</p>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#3B82F6] mt-auto">
                    Coming soon
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ARTICLES PLACEHOLDER ══ */}
        <section className="py-14 border-t border-[#132033]" id="articles">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-10" style={{ background:'linear-gradient(135deg,#3B82F6,#06B6D4)' }}/>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#475569] tracking-widest uppercase">Daily Intelligence</span>
                </div>
                <h2 className="font-['Syne'] font-bold text-[28px] text-[#F8FAFC] tracking-tight">Latest Articles</h2>
              </div>
            </div>

            {/* Empty state — clean, no filler content */}
            <div className="ng-card p-16 text-center">
              <div className="text-[48px] mb-5">📡</div>
              <h3 className="font-['Syne'] font-bold text-[20px] text-[#94A3B8] mb-3">Articles Coming Soon</h3>
              <p className="text-[14px] text-[#475569] max-w-[380px] mx-auto leading-relaxed font-light">
                Daily 5G, 6G and 3GPP technical articles will appear here. Check back soon.
              </p>
            </div>
          </div>
        </section>

        {/* ══ TOOLS ══ */}
        <section className="py-14 border-t border-[#132033] bg-[#060D1C]" id="tools">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-10" style={{ background:'linear-gradient(135deg,#3B82F6,#06B6D4)' }}/>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#475569] tracking-widest uppercase">Power Tools</span>
              </div>
              <h2 className="font-['Syne'] font-bold text-[28px] text-[#F8FAFC] tracking-tight">Tools for Engineers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {TOOLS.map((t) => (
                <div key={t.name} className="ng-card p-6 flex flex-col gap-4 opacity-70 cursor-not-allowed">
                  <div className="flex items-start justify-between">
                    <div className="text-[2rem]">{t.icon}</div>
                    <span className="font-['JetBrains_Mono'] text-[9px] font-bold px-2 py-0.5 rounded border bg-[#101E38] text-[#475569] border-[#1C324F] tracking-wide uppercase">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="font-['Syne'] font-bold text-[15px] text-[#94A3B8]">{t.name}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed font-light">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="py-14 border-t border-[#132033]" id="about">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10" style={{ background:'linear-gradient(135deg,#3B82F6,#06B6D4)' }}/>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#475569] tracking-widest uppercase">About NextGNow</span>
                </div>
                <h2 className="font-['Syne'] font-bold text-[30px] text-[#F8FAFC] tracking-tight mb-6 leading-tight">
                  The Telecom<br/>Knowledge Platform
                </h2>
                <div className="space-y-4 text-[14px] text-[#94A3B8] leading-[1.85] font-light">
                  <p>
                    <strong className="text-[#F8FAFC] font-semibold">NextGNow</strong> is a modern telecom intelligence platform built for engineers, researchers and professionals who need to stay ahead of 5G NR, 6G and 3GPP developments.
                  </p>
                  <p>
                    We publish technical content covering everything from physical layer fundamentals to cutting-edge 6G research — explained clearly with real engineering depth.
                  </p>
                  <p>
                    Our <span className="text-[#06B6D4] font-medium">SpectrumAI</span> assistant provides instant, spec-grounded answers powered by deep 3GPP knowledge across Release 15 through Release 19 and beyond.
                  </p>
                </div>
                <div className="flex gap-3 mt-8 flex-wrap">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#94A3B8] text-[13px] px-4 py-2.5 rounded-xl border border-[#1C324F] hover:border-[#3B82F6]/40 hover:text-[#3B82F6] transition-all">
                    Follow on LinkedIn
                  </a>
                  <a href="mailto:hello@nextgnow.in"
                    className="inline-flex items-center gap-2 text-[#94A3B8] text-[13px] px-4 py-2.5 rounded-xl border border-[#1C324F] hover:border-[#3B82F6]/40 hover:text-[#3B82F6] transition-all">
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 fade-up-1">
                {[
                  { num: '5G + 6G',  lbl: 'Core Technology Focus',  sub: 'From NR to IMT-2030',         color: 'text-[#3B82F6]' },
                  { num: 'Daily',    lbl: 'Fresh Content',           sub: 'Technical depth every day',   color: 'text-[#06B6D4]' },
                  { num: 'Rel-19',   lbl: 'Latest 3GPP Release',    sub: 'Always up to date',            color: 'text-violet-400' },
                  { num: 'Free',     lbl: 'Always Open Access',      sub: 'No paywalls, ever',           color: 'text-[#10B981]' },
                ].map((s) => (
                  <div key={s.lbl} className="ng-card p-6">
                    <div className={`font-['Syne'] font-extrabold text-[30px] leading-none mb-2 ${s.color}`}>{s.num}</div>
                    <div className="text-[13px] font-semibold text-[#CBD5E1] mb-1">{s.lbl}</div>
                    <div className="text-[11px] text-[#475569]">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
