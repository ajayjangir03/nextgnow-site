import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleGrid from '@/components/ArticleGrid'
import RadarAnimation from '@/components/RadarAnimation'
import SpectrumAIWidget from '@/components/SpectrumAIWidget'

const DOMAINS = [
  {
    icon: '🛰️',
    label: '6G + AI',
    color: 'text-violet-400',
    border: 'hover:border-violet-500/40',
    glow: 'hover:shadow-[0_8px_32px_rgba(139,92,246,.15)]',
    bg: 'group-hover:bg-violet-500/5',
    href: '/?filter=6G',
    desc: 'AI-native networks, RIS, THz comms, ISAC and IMT-2030 research.',
    tag: 'IMT-2030',
    tagColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  {
    icon: '📡',
    label: '5G NR',
    color: 'text-blue-400',
    border: 'hover:border-blue-500/40',
    glow: 'hover:shadow-[0_8px_32px_rgba(59,130,246,.15)]',
    bg: 'group-hover:bg-blue-500/5',
    href: '/?filter=5G',
    desc: 'Physical layer, MIMO, 5G Core, O-RAN, protocols and call flows.',
    tag: '3GPP Rel-19',
    tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    icon: '🔬',
    label: 'Log Analysis',
    color: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-[0_8px_32px_rgba(16,185,129,.15)]',
    bg: 'group-hover:bg-emerald-500/5',
    href: '/log-analysis/',
    desc: 'Decode 5G/4G protocol logs, NAS traces and packet captures.',
    tag: 'AI-Powered',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    icon: '📋',
    label: '3GPP Releases',
    color: 'text-amber-400',
    border: 'hover:border-amber-500/40',
    glow: 'hover:shadow-[0_8px_32px_rgba(245,158,11,.15)]',
    bg: 'group-hover:bg-amber-500/5',
    href: '/?filter=3GPP',
    desc: 'Release 17, 18, 19 features explained clearly for engineers.',
    tag: 'Rel-17 → 19',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
]

const STATS = [
  { num: '10+',    lbl: 'Articles Published' },
  { num: 'Daily',  lbl: 'New Posts at 8AM IST' },
  { num: '7+',     lbl: 'Topic Categories' },
  { num: 'Rel-19', lbl: '3GPP Current Release' },
]

const TOOLS = [
  {
    icon: '🤖', name: 'SpectrumAI', desc: 'Your AI-powered 5G NR & 6G expert. Ask anything — grounded in 3GPP specs.', href: '/speciq/',
    badge: 'AI Live', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', accent: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: '🔍', name: 'Spec Decoder', desc: 'Paste any 3GPP TS/TR clause and get plain-English expert decoding.', href: '/speciq/#decoder',
    badge: 'Free Tool', badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20', accent: 'from-blue-500/10 to-violet-500/10',
  },
  {
    icon: '📊', name: 'Log Analyzer', desc: 'Upload telecom logs — NAS, RRC, NGAP — for AI-assisted analysis.', href: '/log-analysis/',
    badge: 'Beta', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', accent: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    icon: '🔄', name: 'Call Flow Viewer', desc: 'Visual step-by-step 5G signaling flows: Registration, PDU Session, Handover.', href: '/?filter=Call Flow',
    badge: 'Interactive', badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20', accent: 'from-violet-500/10 to-blue-500/10',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <Header />

      {/* ── TICKER ── */}
      <div className="bg-ng-blue2/80 backdrop-blur-sm border-b border-ng-blue2/50 h-8 flex items-center overflow-hidden relative z-10">
        <div className="bg-ng-blue2 font-mono text-[10px] font-bold tracking-widest text-white px-4 h-full flex items-center uppercase flex-shrink-0 border-r border-white/10">
          Live Feed
        </div>
        <div className="flex overflow-hidden flex-1">
          <div className="ticker-anim flex gap-10 items-center whitespace-nowrap px-6">
            {['6G IMT-2030 KPIs finalised by ITU-R', '3GPP Release 19 timeline set for June 2026',
              'Rakuten Symphony Open RAN expands to 7 countries', 'Qualcomm demos 6G AI-native prototype at MWC 2026',
              'NTIA clears 2.7 GHz band for 6G deployment', 'Open RAN shifts from trials to commercial scale in 2026',
              '6G IMT-2030 KPIs finalised by ITU-R', '3GPP Release 19 timeline set for June 2026',
              'Rakuten Symphony Open RAN expands to 7 countries', 'Qualcomm demos 6G AI-native prototype at MWC 2026'].map((item, i) => (
              <span key={i} className="text-[11px] text-white/85 flex items-center gap-2.5 cursor-pointer hover:text-white">
                <span className="w-1 h-1 rounded-full bg-white/40" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="pt-16 pb-12 overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">

              {/* Left */}
              <div className="fade-up">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2.5 bg-ng-blue/10 border border-ng-blue/25 text-ng-blue text-[11px] font-bold tracking-[.08em] uppercase px-4 py-1.5 rounded-full mb-7 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-ng-green shadow-[0_0_8px_#10B981] animate-pulse" />
                  Telecom Intelligence Platform · Updated Daily
                </div>

                {/* Headline */}
                <h1 className="font-display font-extrabold text-[52px] leading-[1.05] tracking-[-1.5px] text-ng-t0 mb-6">
                  Tomorrow&apos;s{' '}
                  <span className="relative">
                    <span className="grad-text">Telecom</span>
                  </span>
                  <br />
                  Explained{' '}
                  <span className="grad-text">Today</span>
                </h1>

                <p className="text-[16px] text-ng-t2 leading-[1.8] font-light max-w-[480px] mb-10">
                  Deep technical learning for 5G NR, 6G, O-RAN and 3GPP specs — with daily articles, AI-powered tools and real engineering insights.
                </p>

                {/* CTAs */}
                <div className="flex gap-3 flex-wrap mb-12">
                  <Link href="/#articles"
                    className="inline-flex items-center gap-2 text-white font-semibold text-[14px] px-6 py-3.5 rounded-xl grad-bg shadow-[0_6px_24px_rgba(59,130,246,.35)] hover:shadow-[0_10px_36px_rgba(59,130,246,.5)] hover:-translate-y-0.5 transition-all duration-200 font-body">
                    Explore Articles
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <Link href="/speciq/"
                    className="inline-flex items-center gap-2 text-ng-t1 font-medium text-[14px] px-6 py-3.5 rounded-xl border border-ng-bdr2 bg-ng-bg2 hover:border-ng-bdr3 hover:bg-ng-bg3 hover:text-ng-t0 transition-all duration-200 font-body">
                    <svg className="w-4 h-4 text-ng-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
                    </svg>
                    Ask SpectrumAI
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-8 border-t border-ng-bdr">
                  {STATS.map(s => (
                    <div key={s.lbl}>
                      <div className="font-display font-extrabold text-[26px] text-ng-blue leading-none">{s.num}</div>
                      <div className="text-[11px] text-ng-t4 mt-1.5 font-medium tracking-wide uppercase font-mono">{s.lbl}</div>
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

        {/* ══════════════════════════════════
            DOMAIN CARDS
        ══════════════════════════════════ */}
        <section className="py-12 border-t border-ng-bdr">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-ng-bdr" />
              <span className="font-mono text-[11px] text-ng-t4 tracking-widest uppercase px-3">Core Technology Domains</span>
              <div className="h-px flex-1 bg-ng-bdr" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {DOMAINS.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className={`group ng-card p-6 flex flex-col gap-4 ${d.border} ${d.glow} transition-all duration-250`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${d.bg} transition-all duration-250 opacity-0 group-hover:opacity-100`}/>
                  <div className="relative">
                    <div className="text-3xl mb-3">{d.icon}</div>
                    <div className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border w-fit mb-3 ${d.tagColor}`}>
                      {d.tag}
                    </div>
                    <h3 className={`font-display font-bold text-[16px] mb-2 transition-colors ${d.color}`}>{d.label}</h3>
                    <p className="text-[13px] text-ng-t3 leading-relaxed font-light">{d.desc}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-[12px] font-medium mt-auto ${d.color}`}>
                    Explore
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            ARTICLES
        ══════════════════════════════════ */}
        <ArticleGrid />

        {/* ══════════════════════════════════
            TOOLS
        ══════════════════════════════════ */}
        <section className="py-16 border-t border-ng-bdr bg-ng-bg1" id="tools">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-12 bg-ng-grad" />
                  <span className="font-mono text-[11px] text-ng-t4 tracking-widest uppercase">Power Tools</span>
                </div>
                <h2 className="font-display font-bold text-3xl text-ng-t0 tracking-tight">Tools for Engineers</h2>
              </div>
              <Link href="/tools/" className="text-[13px] text-ng-t3 hover:text-ng-blue border border-ng-bdr hover:border-ng-blue/40 px-4 py-2 rounded-lg transition-all font-body">
                View all tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {TOOLS.map((tool) => (
                <Link key={tool.name} href={tool.href}
                  className="ng-card p-6 flex flex-col gap-4 hover:border-ng-bdr3 group">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-250`}/>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{tool.icon}</div>
                      <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border tracking-wide uppercase ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-[15px] text-ng-t0 mb-2">{tool.name}</h3>
                    <p className="text-[13px] text-ng-t3 leading-relaxed font-light">{tool.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-ng-blue mt-auto">
                    Open tool
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            ABOUT
        ══════════════════════════════════ */}
        <section className="py-16 border-t border-ng-bdr" id="about">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-ng-grad" />
                  <span className="font-mono text-[11px] text-ng-t4 tracking-widest uppercase">About NextGNow</span>
                </div>
                <h2 className="font-display font-bold text-3xl text-ng-t0 tracking-tight mb-6">
                  The Telecom<br/>Knowledge Platform
                </h2>
                <div className="space-y-4 text-[14px] text-ng-t2 leading-relaxed font-light">
                  <p>
                    <strong className="text-ng-t0 font-semibold">NextGNow</strong> is a modern telecom intelligence platform built for engineers, researchers and professionals who need to stay ahead of 5G NR, 6G and 3GPP developments.
                  </p>
                  <p>
                    We publish daily technical articles at 8 AM IST covering everything from physical layer fundamentals to cutting-edge 6G research — explained clearly with real engineering depth.
                  </p>
                  <p>
                    Our <span className="text-ng-cyan font-medium">SpectrumAI</span> assistant provides instant, spec-grounded answers to any telecom question, powered by deep 3GPP knowledge across Release 15 through Release 19 and beyond.
                  </p>
                </div>
                <div className="flex gap-3 mt-8 flex-wrap">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ng-t2 text-[13px] px-4 py-2.5 rounded-xl border border-ng-bdr2 hover:border-ng-blue/40 hover:text-ng-blue hover:bg-ng-blue/5 transition-all font-body">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Follow on LinkedIn
                  </a>
                  <a href="mailto:hello@nextgnow.in"
                    className="inline-flex items-center gap-2 text-ng-t2 text-[13px] px-4 py-2.5 rounded-xl border border-ng-bdr2 hover:border-ng-blue/40 hover:text-ng-blue hover:bg-ng-blue/5 transition-all font-body">
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '10+',     lbl: 'Articles Published',       sub: 'And growing daily',             color: 'text-ng-blue'   },
                  { num: 'Daily',   lbl: 'Fresh Content',             sub: 'Every morning at 8 AM IST',     color: 'text-ng-cyan'   },
                  { num: 'Rel-19',  lbl: 'Latest 3GPP Release',       sub: 'Always up to date',             color: 'text-violet-400'},
                  { num: '0',       lbl: 'Jargon or Fluff',           sub: 'Plain engineering English only', color: 'text-ng-green'  },
                ].map(s => (
                  <div key={s.lbl} className="ng-card p-6">
                    <div className={`font-display font-extrabold text-[32px] leading-none mb-2 ${s.color}`}>{s.num}</div>
                    <div className="text-[13px] font-semibold text-ng-t1 mb-1">{s.lbl}</div>
                    <div className="text-[11px] text-ng-t4">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <SpectrumAIWidget />
    </div>
  )
}
