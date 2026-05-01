'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  {
    label: '6G + AI',
    items: [
      { label: 'All 6G + AI Articles', href: '/?filter=6G', dot: '#8B5CF6' },
      { label: '6G Research & IMT-2030', href: '/?filter=6G', dot: '#8B5CF6' },
      { label: 'AI-Native Networks',    href: '/?filter=6G', dot: '#06B6D4' },
      { label: 'RIS & THz Comms',       href: '/?filter=6G', dot: '#06B6D4' },
      { label: 'ISAC',                  href: '/?filter=6G', dot: '#8B5CF6' },
    ],
  },
  {
    label: '5G',
    items: [
      { label: 'All 5G Articles',       href: '/?filter=5G', dot: '#3B82F6' },
      { label: '5G NR Physical Layer',  href: '/?filter=5G', dot: '#3B82F6' },
      { label: '5G Core & SBA',         href: '/?filter=5G', dot: '#3B82F6' },
      { label: 'O-RAN & Open RAN',      href: '/?filter=Open RAN', dot: '#F59E0B' },
      { label: 'Call Flows',            href: '/?filter=Call Flow', dot: '#14B8A6' },
    ],
  },
  {
    label: 'Log Analysis',
    href: '/log-analysis/',
  },
  {
    label: '3GPP Releases',
    items: [
      { label: 'All 3GPP Articles', href: '/?filter=3GPP', dot: '#10B981' },
      { label: 'Release 19 (Current)', href: '/?filter=3GPP', dot: '#10B981', badge: 'LATEST' },
      { label: 'Release 18',        href: '/?filter=3GPP', dot: '#10B981' },
      { label: 'Release 17',        href: '/?filter=3GPP', dot: '#10B981' },
      { label: 'Upcoming Study Items', href: '/?filter=Future Tech', dot: '#F59E0B' },
    ],
  },
  {
    label: 'Latest Articles',
    href: '/#articles',
  },
  {
    label: 'Tools',
    items: [
      { label: 'SpectrumAI Assistant',  href: '/speciq/',        dot: '#06B6D4', badge: 'AI' },
      { label: 'Spec Decoder',          href: '/speciq/#decoder', dot: '#3B82F6' },
      { label: 'Log Analyzer',          href: '/log-analysis/',   dot: '#10B981' },
      { label: 'Call Flow Viewer',      href: '/?filter=Call Flow', dot: '#14B8A6' },
    ],
  },
  {
    label: 'About',
    href: '/#about',
  },
]

export default function Header() {
  const [mobOpen, setMobOpen] = useState(false)
  const [srchOpen, setSrchOpen] = useState(false)
  const [srchQ, setSrchQ] = useState('')
  const [srchResults, setSrchResults] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch('/articles.json').then(r => r.json()).then(d => setArticles(d.articles || []))
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setSrchOpen(true) }
      if (e.key === 'Escape') { setSrchOpen(false); setMobOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => {
    if (!srchQ.trim()) { setSrchResults([]); return }
    const q = srchQ.toLowerCase()
    setSrchResults(
      articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.excerpt || '').toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ).slice(0, 7)
    )
  }, [srchQ, articles])

  return (
    <>
      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ng-bg/95 backdrop-blur-xl border-b border-ng-bdr shadow-[0_4px_32px_rgba(0,0,0,.5)]' : 'bg-ng-bg/70 backdrop-blur-md border-b border-ng-bdr/50'}`}>
        <div className="max-w-[1360px] mx-auto px-6 h-[62px] flex items-center gap-0">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mr-8 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-[10px] grad-bg flex items-center justify-center flex-shrink-0 spectrum-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-extrabold text-[19px] leading-none text-ng-t0 tracking-tight group-hover:text-white transition-colors">
                NextG<span className="text-ng-cyan">Now</span>
              </div>
              <div className="font-mono text-[9px] text-ng-t4 tracking-widest mt-[3px]">TELECOM INTELLIGENCE</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map((item) =>
              item.items ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 text-[13px] font-medium text-ng-t2 px-3 py-2 rounded-lg hover:text-ng-t0 hover:bg-ng-bg3 transition-all duration-150 font-body whitespace-nowrap">
                    {item.label}
                    <svg className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-ng-bg2 border border-ng-bdr2 rounded-2xl p-2 min-w-[220px] hidden group-hover:block z-50 shadow-[0_20px_60px_rgba(0,0,0,.8)]">
                    <div className="font-mono text-[10px] font-medium tracking-widest uppercase text-ng-t4 px-3 py-2 mb-1">
                      {item.label}
                    </div>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-ng-t2 hover:text-ng-t0 hover:bg-ng-bg3 transition-all duration-150 whitespace-nowrap"
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sub.dot }} />
                        <span className="flex-1">{sub.label}</span>
                        {'badge' in sub && sub.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono tracking-wide ${sub.badge === 'AI' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'}`}>
                            {sub.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="text-[13px] font-medium text-ng-t2 px-3 py-2 rounded-lg hover:text-ng-t0 hover:bg-ng-bg3 transition-all duration-150 font-body whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Search btn */}
            <button
              onClick={() => setSrchOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-ng-bg2 border border-ng-bdr2 text-ng-t3 hover:text-ng-t1 hover:border-ng-bdr3 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 font-body"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-ng-bg3 border border-ng-bdr2 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            {/* Socials */}
            <div className="hidden md:flex items-center gap-1.5">
              {[
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
                { href: 'https://x.com', label: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-ng-t4 hover:text-ng-blue hover:border-ng-blue/40 hover:bg-ng-blue/10 transition-all duration-150">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>

            {/* SpectrumAI button */}
            <Link
              href="/speciq/"
              className="hidden sm:flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-2 rounded-xl spectrum-glow font-body whitespace-nowrap transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
              </svg>
              SpectrumAI
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex flex-col items-center justify-center gap-[5px] transition-all duration-150 hover:border-ng-bdr3"
            >
              <span className="block w-[18px] h-[1.5px] bg-ng-t2 rounded-full" />
              <span className="block w-[18px] h-[1.5px] bg-ng-t2 rounded-full" />
              <span className="block w-[12px] h-[1.5px] bg-ng-t2 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE NAV ── */}
      <div className={`mob-overlay ${mobOpen ? 'open' : ''}`} onClick={() => setMobOpen(false)} />
      <div className={`mob-nav ${mobOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-5 border-b border-ng-bdr">
          <Link href="/" onClick={() => setMobOpen(false)} className="font-display font-extrabold text-lg text-ng-t0">
            NextG<span className="text-ng-cyan">Now</span>
          </Link>
          <button onClick={() => setMobOpen(false)} className="w-8 h-8 rounded-lg border border-ng-bdr2 flex items-center justify-center text-ng-t3 hover:text-ng-t0 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <div key={item.label}>
              {item.items ? (
                <>
                  <div className="font-mono text-[10px] font-medium tracking-widest uppercase text-ng-t4 px-3 py-2 mt-3 mb-1">{item.label}</div>
                  {item.items.map((sub) => (
                    <Link key={sub.label} href={sub.href} onClick={() => setMobOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] text-ng-t2 hover:text-ng-t0 hover:bg-ng-bg3 transition-all duration-150">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: sub.dot }} />
                      {sub.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link href={item.href!} onClick={() => setMobOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-[14px] font-medium text-ng-t2 hover:text-ng-t0 hover:bg-ng-bg3 transition-all duration-150">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-ng-bdr">
            <Link href="/speciq/" onClick={() => setMobOpen(false)}
              className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl grad-bg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
              </svg>
              SpectrumAI Assistant
            </Link>
          </div>
        </nav>
      </div>

      {/* ── SEARCH MODAL ── */}
      {srchOpen && (
        <div className="search-overlay" onClick={(e) => e.target === e.currentTarget && setSrchOpen(false)}>
          <div className="w-full max-w-[600px] bg-ng-bg2 border border-ng-bdr2 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,.9)]">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-ng-bdr">
              <svg className="w-5 h-5 text-ng-t3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search articles, topics, specs…"
                value={srchQ}
                onChange={e => setSrchQ(e.target.value)}
                className="flex-1 bg-transparent text-ng-t0 text-[15px] outline-none placeholder:text-ng-t4 font-body"
              />
              <button onClick={() => setSrchOpen(false)}
                className="font-mono text-[11px] bg-ng-bg3 border border-ng-bdr2 text-ng-t3 hover:text-ng-t1 px-2 py-1 rounded-md transition-colors">
                ESC
              </button>
            </div>
            <div className="text-[12px] text-ng-t4 px-5 py-2.5">
              {srchResults.length > 0 ? `${srchResults.length} result${srchResults.length !== 1 ? 's' : ''} found` : srchQ ? 'No results' : 'Type to search · Ctrl+K to open anytime'}
            </div>
            <div className="max-h-[400px] overflow-y-auto p-2">
              {srchResults.length === 0 && srchQ && (
                <div className="text-ng-t3 text-[13px] px-4 py-8 text-center">No results for &ldquo;{srchQ}&rdquo;</div>
              )}
              {srchResults.map((a, i) => (
                <a key={i} href={a.url} onClick={() => setSrchOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-ng-bg3 transition-colors cursor-pointer">
                  <div className="text-[13px] font-semibold text-ng-t0 mb-1 leading-tight">{a.title}</div>
                  <div className="flex items-center gap-2 text-[11px] text-ng-t4">
                    <span>{a.category}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
