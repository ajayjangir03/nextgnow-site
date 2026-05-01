'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  {
    label: '6G + AI',
    children: [
      { label: 'All 6G + AI', href: '#', dot: '#8B5CF6' },
      { label: 'AI-Native Networks', href: '#', dot: '#06B6D4' },
      { label: 'RIS & THz', href: '#', dot: '#8B5CF6' },
      { label: 'ISAC', href: '#', dot: '#06B6D4' },
      { label: 'IMT-2030 Research', href: '#', dot: '#8B5CF6' },
    ],
  },
  {
    label: '5G',
    children: [
      { label: 'All 5G', href: '#', dot: '#3B82F6' },
      { label: '5G NR Physical Layer', href: '#', dot: '#3B82F6' },
      { label: '5G Core & SBA', href: '#', dot: '#3B82F6' },
      { label: 'O-RAN', href: '#', dot: '#F59E0B' },
      { label: 'Call Flows', href: '#', dot: '#14B8A6' },
    ],
  },
  { label: 'Log Analysis', href: '#' },
  {
    label: '3GPP Releases',
    children: [
      { label: 'Release 19', href: '#', dot: '#10B981', badge: 'LATEST' },
      { label: 'Release 18', href: '#', dot: '#10B981' },
      { label: 'Release 17', href: '#', dot: '#10B981' },
      { label: 'Upcoming Study Items', href: '#', dot: '#F59E0B' },
    ],
  },
  { label: 'Latest Articles', href: '#' },
  {
    label: 'Tools',
    children: [
      { label: 'SpectrumAI Assistant', href: '#', dot: '#06B6D4', badge: 'AI' },
      { label: 'Spec Decoder', href: '#', dot: '#3B82F6' },
      { label: 'Log Analyzer', href: '#', dot: '#10B981' },
      { label: 'Call Flow Viewer', href: '#', dot: '#14B8A6' },
    ],
  },
  { label: 'About', href: '#' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobOpen, setMobOpen]   = useState(false)
  const [srchOpen, setSrchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSrchOpen(true) }
      if (e.key === 'Escape') { setSrchOpen(false); setMobOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#03060E]/95 backdrop-blur-xl border-b border-[#132033] shadow-[0_4px_32px_rgba(0,0,0,.6)]'
            : 'bg-[#03060E]/70 backdrop-blur-md border-b border-[#132033]/50'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 h-[62px] flex items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mr-8 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-[10px] grad-bg flex items-center justify-center btn-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div>
              <div className="font-['Syne'] font-extrabold text-[19px] leading-none text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">
                NextG<span className="text-[#06B6D4]">Now</span>
              </div>
              <div className="font-['JetBrains_Mono'] text-[9px] text-[#475569] tracking-widest mt-[3px] uppercase">
                Telecom Intelligence
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 text-[13px] font-medium text-[#94A3B8] px-3 py-2 rounded-lg hover:text-[#F8FAFC] hover:bg-[#101E38] transition-all duration-150 whitespace-nowrap">
                    {item.label}
                    <svg className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-[#0A1628] border border-[#1C324F] rounded-2xl p-2 min-w-[210px] hidden group-hover:block z-50 shadow-[0_20px_60px_rgba(0,0,0,.8)]">
                    <div className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase text-[#475569] px-3 py-2 mb-1">
                      {item.label}
                    </div>
                    {item.children.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101E38] transition-all duration-150 whitespace-nowrap"
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sub.dot }} />
                        <span className="flex-1">{sub.label}</span>
                        {sub.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-['JetBrains_Mono'] tracking-wide border ${sub.badge === 'AI' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                            {sub.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] font-medium text-[#94A3B8] px-3 py-2 rounded-lg hover:text-[#F8FAFC] hover:bg-[#101E38] transition-all duration-150 whitespace-nowrap"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">

            {/* Search */}
            <button
              onClick={() => setSrchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#0A1628] border border-[#1C324F] text-[#64748B] hover:text-[#CBD5E1] hover:border-[#234070] px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Search</span>
              <kbd className="font-['JetBrains_Mono'] text-[10px] bg-[#101E38] border border-[#1C324F] px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            {/* Socials */}
            <div className="hidden md:flex items-center gap-1.5">
              {[
                { href: 'https://linkedin.com', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: 'https://x.com', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#1C324F] bg-[#0A1628] flex items-center justify-center text-[#475569] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/8 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
                </a>
              ))}
            </div>

            {/* SpectrumAI CTA */}
            <a
              href="#"
              className="hidden sm:flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-2 rounded-xl btn-glow transition-all duration-200 hover:scale-105 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
              </svg>
              SpectrumAI
            </a>

            {/* Hamburger */}
            <button onClick={() => setMobOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg border border-[#1C324F] bg-[#0A1628] flex flex-col items-center justify-center gap-[5px] hover:border-[#234070] transition-all">
              <span className="block w-[18px] h-[1.5px] bg-[#94A3B8] rounded-full"/>
              <span className="block w-[18px] h-[1.5px] bg-[#94A3B8] rounded-full"/>
              <span className="block w-[12px] h-[1.5px] bg-[#94A3B8] rounded-full"/>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE NAV ── */}
      <div className={`mob-overlay ${mobOpen ? 'open' : ''}`} onClick={() => setMobOpen(false)} />
      <div className={`mob-nav ${mobOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-5 border-b border-[#132033]">
          <span className="font-['Syne'] font-extrabold text-lg text-[#F8FAFC]">
            NextG<span className="text-[#06B6D4]">Now</span>
          </span>
          <button onClick={() => setMobOpen(false)}
            className="w-8 h-8 rounded-lg border border-[#1C324F] flex items-center justify-center text-[#64748B] hover:text-[#F8FAFC] transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="p-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <div className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase text-[#475569] px-3 py-2 mt-4 mb-1">
                    {item.label}
                  </div>
                  {item.children.map((sub) => (
                    <a key={sub.label} href={sub.href} onClick={() => setMobOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101E38] transition-all">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sub.dot }} />
                      {sub.label}
                    </a>
                  ))}
                </>
              ) : (
                <a href={item.href} onClick={() => setMobOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-[14px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101E38] transition-all">
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <div className="mt-6 pt-6 border-t border-[#132033]">
            <a href="#"
              className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl grad-bg">
              SpectrumAI Assistant
            </a>
          </div>
        </div>
      </div>

      {/* ── SEARCH MODAL ── */}
      {srchOpen && (
        <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && setSrchOpen(false)}>
          <div className="w-full max-w-[580px] bg-[#0A1628] border border-[#1C324F] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,.9)]">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#132033]">
              <svg className="w-5 h-5 text-[#64748B] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search coming soon…"
                className="flex-1 bg-transparent text-[#F8FAFC] text-[15px] outline-none placeholder:text-[#475569]"
                readOnly
              />
              <button onClick={() => setSrchOpen(false)}
                className="font-['JetBrains_Mono'] text-[11px] bg-[#101E38] border border-[#1C324F] text-[#64748B] hover:text-[#CBD5E1] px-2 py-1 rounded-md transition-colors">
                ESC
              </button>
            </div>
            <div className="px-5 py-8 text-center text-[#475569] text-[13px]">
              Search will be available once content is ready.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
