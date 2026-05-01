'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: '6G + AI',         href: '#' },
  { label: '5G',              href: '#' },
  { label: 'Log Analysis',    href: '#' },
  { label: '3GPP Releases',   href: '#' },
  { label: 'Latest Articles', href: '#articles' },
  { label: 'Tools',           href: '#tools' },
  { label: 'About',           href: '#about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobOpen,  setMobOpen]  = useState(false)
  const [srchOpen, setSrchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
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
      <header className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#03060E]/96 backdrop-blur-xl border-b border-[#132033] shadow-[0_4px_24px_rgba(0,0,0,.5)]'
          : 'bg-[#03060E]/80 backdrop-blur-sm border-b border-[#132033]/40'
      }`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#3B82F6,#06B6D4)', boxShadow:'0 0 16px rgba(59,130,246,.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            </div>
            <span className="font-bold text-[17px] text-white tracking-tight" style={{fontFamily:'Syne,sans-serif'}}>
              NextG<span style={{color:'#06B6D4'}}>Now</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}
                className="text-[13.5px] font-medium px-3 py-2 rounded-lg transition-all duration-150 whitespace-nowrap"
                style={{color:'#94A3B8'}}
                onMouseEnter={e => { (e.target as HTMLElement).style.color='#fff'; (e.target as HTMLElement).style.background='rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color='#94A3B8'; (e.target as HTMLElement).style.background='transparent' }}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <button onClick={() => setSrchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-[13px] px-3 py-1.5 rounded-lg border transition-all duration-150"
              style={{color:'#64748B', background:'#0A1628', borderColor:'#1C324F'}}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Search</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded border" style={{fontFamily:'JetBrains Mono,monospace', background:'#132033', borderColor:'#1C324F', color:'#475569'}}>⌘K</kbd>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {[
                { href:'https://linkedin.com', d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href:'https://x.com', d:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-white/5"
                  style={{color:'#475569'}}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
                </a>
              ))}
            </div>

            <a href="#" className="hidden sm:flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all hover:opacity-90"
              style={{ background:'linear-gradient(135deg,#3B82F6,#06B6D4)', boxShadow:'0 2px 12px rgba(59,130,246,.3)' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
              </svg>
              SpectrumAI
            </a>

            <button onClick={() => setMobOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg border flex flex-col items-center justify-center gap-[5px] transition-all"
              style={{background:'#0A1628', borderColor:'#1C324F'}}>
              <span className="block w-4 h-[1.5px] rounded-full" style={{background:'#94A3B8'}}/>
              <span className="block w-4 h-[1.5px] rounded-full" style={{background:'#94A3B8'}}/>
              <span className="block w-2.5 h-[1.5px] rounded-full" style={{background:'#64748B'}}/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div onClick={() => setMobOpen(false)}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{background:'rgba(0,0,0,0.6)', opacity: mobOpen ? 1 : 0, pointerEvents: mobOpen ? 'auto' : 'none'}} />

      {/* Mobile nav */}
      <div className="fixed top-0 right-0 bottom-0 w-72 z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
        style={{ background:'#060D1C', borderLeft:'1px solid #132033', transform: mobOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="flex items-center justify-between px-5 h-16 flex-shrink-0" style={{borderBottom:'1px solid #132033'}}>
          <span className="font-bold text-[17px] text-white" style={{fontFamily:'Syne,sans-serif'}}>
            NextG<span style={{color:'#06B6D4'}}>Now</span>
          </span>
          <button onClick={() => setMobOpen(false)}
            className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors"
            style={{borderColor:'#1C324F', color:'#64748B'}}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-0.5 flex-1">
          <p className="text-[10px] px-3 pt-3 pb-2 tracking-widest uppercase" style={{fontFamily:'JetBrains Mono,monospace', color:'#475569'}}>Navigation</p>
          {NAV.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMobOpen(false)}
              className="text-[14px] font-medium px-3 py-2.5 rounded-lg transition-all"
              style={{color:'#94A3B8'}}
              onMouseEnter={e => { (e.target as HTMLElement).style.color='#fff'; (e.target as HTMLElement).style.background='rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color='#94A3B8'; (e.target as HTMLElement).style.background='transparent' }}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 flex-shrink-0" style={{borderTop:'1px solid #132033'}}>
          <a href="#" className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-[14px]"
            style={{background:'linear-gradient(135deg,#3B82F6,#06B6D4)'}}>
            SpectrumAI Assistant
          </a>
        </div>
      </div>

      {/* Search modal */}
      {srchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4"
          style={{background:'rgba(3,6,14,0.92)', backdropFilter:'blur(12px)'}}
          onClick={(e) => e.target === e.currentTarget && setSrchOpen(false)}>
          <div className="w-full max-w-[540px] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.8)]"
            style={{background:'#0A1628', border:'1px solid #1C324F'}}>
            <div className="flex items-center gap-3 px-4 py-3.5" style={{borderBottom:'1px solid #132033'}}>
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input autoFocus type="text" placeholder="Search coming soon…"
                className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-[#475569]" readOnly />
              <button onClick={() => setSrchOpen(false)}
                className="text-[11px] px-2 py-1 rounded border transition-colors"
                style={{fontFamily:'JetBrains Mono,monospace', background:'#132033', borderColor:'#1C324F', color:'#64748B'}}>ESC</button>
            </div>
            <p className="px-4 py-6 text-center text-[13px]" style={{color:'#475569'}}>
              Search will be available once content is live.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
