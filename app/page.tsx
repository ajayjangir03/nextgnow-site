'use client'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroVisual from '@/components/HeroVisual'
const SpectrumFAB = dynamic(() => import('@/components/SpectrumFAB'), { ssr: false })

/* ── DATA ── */
const STATS = [
  { val: '1.2K+', lbl: 'Tech Articles'      },
  { val: '280+',  lbl: 'Experts'             },
  { val: '50+',   lbl: '3GPP Specs'          },
  { val: '10K+',  lbl: 'Community Members'   },
]

const COMING_ARTICLES = [
  { title: 'AI-Native Air Interface for 6G',          cat: '6G + AI',      icon: '🛰️', color: '#A78BFA', bg: 'rgba(139,92,246,.12)'  },
  { title: '5G Advanced: Evolution Not Revolution',   cat: '5G',           icon: '📡', color: '#60A5FA', bg: 'rgba(59,130,246,.12)'   },
  { title: 'Smart Log Analysis with SpectrumAI',      cat: 'Log Analysis', icon: '📊', color: '#34D399', bg: 'rgba(16,185,129,.12)'   },
  { title: 'Deep Dive into 3GPP Rel-19 (Part 1)',     cat: '3GPP',         icon: '📋', color: '#FCD34D', bg: 'rgba(252,211,77,.1)'    },
  { title: 'O-RAN Architecture Explained',            cat: 'Open RAN',     icon: '🌐', color: '#F472B6', bg: 'rgba(244,114,182,.1)'   },
  { title: 'Network Slicing: End-to-End Guide',       cat: '5G Core',      icon: '🔗', color: '#FB923C', bg: 'rgba(251,146,60,.1)'    },
]

const COMING_FEATURES = [
  { icon: '🌐', title: 'IMT-2030',         sub: 'The global vision for 6G',         badge: 'Coming Q4 2026', badgeC: '#C4B5FD', badgeBg: 'rgba(167,139,250,.15)', badgeBdr: 'rgba(167,139,250,.25)', imgC: 'linear-gradient(135deg,rgba(109,40,217,.3),rgba(99,102,241,.2))' },
  { icon: '📋', title: '3GPP Rel-19',      sub: 'Detailed coverage & analysis',     badge: '', imgC: 'linear-gradient(135deg,rgba(30,64,175,.3),rgba(59,130,246,.2))' },
  { icon: '🤖', title: 'AI Log Analysis',  sub: 'Advanced insights & automation',   badge: '', imgC: 'linear-gradient(135deg,rgba(157,23,77,.25),rgba(236,72,153,.15))' },
]

const DOMAINS = [
  { icon: '📡', label: 'Radio Access\nNetwork (RAN)', c: '#60A5FA' },
  { icon: '🏗️', label: 'Core Network\n& Edge',        c: '#818CF8' },
  { icon: '🔗', label: 'Transport\nNetworks',          c: '#34D399' },
  { icon: '📱', label: 'Devices &\nChipsets',          c: '#FB923C' },
  { icon: '🤖', label: 'AI/ML in\nTelecom',            c: '#F472B6' },
  { icon: '🔒', label: 'Security &\nPrivacy',          c: '#FBBF24' },
]

const TOOLS = [
  { icon: '🤖', name: 'SpectrumAI Assistant',  desc: 'AI-powered 5G & 6G expert grounded in 3GPP specifications.'         },
  { icon: '🔍', name: 'Spec Decoder',          desc: 'Paste any 3GPP TS/TR clause — get plain-English expert decoding.'    },
  { icon: '📊', name: 'Log Analyzer',          desc: 'Upload NAS, RRC or NGAP logs for AI-assisted protocol analysis.'     },
  { icon: '🔄', name: 'Call Flow Viewer',      desc: 'Visual step-by-step 5G signalling flows with spec references.'       },
]

/* ── RESPONSIVE STYLES ── */
const rs = `
  /* ── HERO ── */
  .hero-grid { display: grid; grid-template-columns: 1fr; gap: 28px; align-items: center; }
  @media(min-width: 768px) { .hero-grid { grid-template-columns: 1fr 1fr; gap: 0; } }

  .hero-vis { display: none; }
  @media(min-width: 768px) { .hero-vis { display: block !important; } }

  .hero-h1 { font-size: clamp(28px, 5vw, 52px); }
  .hero-sub { font-size: clamp(13px, 2vw, 15px); max-width: 420px; }
  .hero-btns { flex-wrap: wrap; gap: 10px; }

  .stats-row { gap: 16px; }
  @media(min-width: 480px) { .stats-row { gap: 24px; } }

  /* ── CONTENT COLUMNS ── */
  .content-cols { grid-template-columns: 1fr; }
  @media(min-width: 900px) { .content-cols { grid-template-columns: 1fr 270px !important; } }

  /* ── ARTICLE GRID ── */
  .articles-grid { grid-template-columns: 1fr; }
  @media(min-width: 480px) { .articles-grid { grid-template-columns: repeat(2, 1fr) !important; } }
  @media(min-width: 900px) { .articles-grid { grid-template-columns: repeat(3, 1fr) !important; } }

  /* ── TOOLS GRID ── */
  .tools-grid { grid-template-columns: 1fr; }
  @media(min-width: 480px) { .tools-grid { grid-template-columns: repeat(2, 1fr) !important; } }
  @media(min-width: 900px) { .tools-grid { grid-template-columns: repeat(4, 1fr) !important; } }

  /* ── DOMAIN ROW ── */
  .domain-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  @media(min-width: 480px) { .domain-row { grid-template-columns: repeat(3, 1fr) !important; } }
  @media(min-width: 900px) { .domain-row { grid-template-columns: repeat(6, 1fr) !important; } }

  /* ── ABOUT GRID ── */
  .about-grid { grid-template-columns: 1fr; }
  @media(min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr !important; gap: 64px !important; } }

  .stat-cards { grid-template-columns: repeat(2, 1fr); }

  /* ── HERO CARD PADDING ── */
  .hero-pad { padding: 24px 20px 22px; }
  @media(min-width: 640px) { .hero-pad { padding: 32px 32px 28px !important; } }

  /* ── SECTION PADDING ── */
  .sec-pad { padding: 0 16px; }
  @media(min-width: 1024px) { .sec-pad { padding: 0 20px !important; } }
`

export default function HomePage() {
  return (
    <div className="page-root" style={{ position: 'relative' }}>
      <style>{rs}</style>
      <Header />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── MAX WIDTH WRAPPER ── */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '14px 12px 0' }} className="sec-pad">

          {/* ═══════════════════════════════
              HERO CARD
          ═══════════════════════════════ */}
          <div style={{
            background: 'rgba(11,13,30,.85)',
            border: '1px solid rgba(99,102,241,.14)',
            borderRadius: 18,
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            marginBottom: 14,
          }}>
            <div className="hero-grid hero-pad">
              {/* Left text */}
              <div>
                {/* Eyebrow */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.22)',
                  borderRadius: 20, padding: '4px 13px', marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%',
                    background: '#10B981', boxShadow: '0 0 8px #10B981', flexShrink: 0 }}/>
                  <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace',
                    color: '#A78BFA', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                    Telecom Intelligence Platform
                  </span>
                </div>

                <h1 className="hero-h1" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900,
                  lineHeight: 1.06, letterSpacing: '-1.5px', color: '#fff', marginBottom: 14 }}>
                  Tomorrow&apos;s Telecom<br/>
                  <span className="gt-purple">Explained Today</span>
                </h1>

                <p className="hero-sub" style={{ fontWeight: 300, color: '#64748B',
                  lineHeight: 1.75, marginBottom: 24 }}>
                  AI-powered tools and expert insights for building the next generation of connected intelligence.
                </p>

                <div className="hero-btns" style={{ display: 'flex', marginBottom: 26 }}>
                  <a href="#articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: '#3B82F6', color: '#fff', fontWeight: 600, fontSize: 14,
                    padding: '11px 22px', borderRadius: 10, textDecoration: 'none',
                    boxShadow: '0 4px 18px rgba(59,130,246,.4)', whiteSpace: 'nowrap' }}>
                    Explore 6G + AI
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <a href="#tools" style={{ display: 'inline-flex', alignItems: 'center',
                    background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)',
                    color: '#CBD5E1', fontWeight: 500, fontSize: 14,
                    padding: '11px 22px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Browse Tools
                  </a>
                </div>

                {/* Stats */}
                <div className="stats-row" style={{ display: 'flex', flexWrap: 'wrap',
                  paddingTop: 20, borderTop: '1px solid rgba(99,102,241,.1)' }}>
                  {STATS.map(s => (
                    <div key={s.lbl}>
                      <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800,
                        fontSize: 20, color: '#3B82F6', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: 6G visual */}
              <div className="hero-vis">
                <HeroVisual />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════
              CONTENT GRID: main + sidebar
          ═══════════════════════════════ */}
          <div className="content-cols" style={{ display: 'grid', gap: 14, marginBottom: 14 }}>

            {/* ── MAIN COLUMN ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>

              {/* ARTICLES — COMING SOON */}
              <section id="articles">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17,
                    color: '#F1F5F9', letterSpacing: '-.3px' }}>Latest Articles</h2>
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10,
                    color: '#4F46E5', background: 'rgba(99,102,241,.1)',
                    border: '1px solid rgba(99,102,241,.22)', borderRadius: 20,
                    padding: '3px 12px', letterSpacing: '.05em' }}>COMING SOON</span>
                </div>

                <div className="articles-grid" style={{ display: 'grid', gap: 11 }}>
                  {COMING_ARTICLES.map((a, i) => (
                    <div key={i} style={{
                      background: 'rgba(11,13,30,.9)',
                      border: '1px solid rgba(99,102,241,.12)',
                      borderRadius: 13, overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      opacity: .7,
                    }}>
                      {/* Placeholder image */}
                      <div style={{ height: 100, background: `radial-gradient(ellipse at 40% 50%, ${a.bg}, rgba(8,9,25,.95))`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', flexShrink: 0 }}>
                        <span style={{ fontSize: 36, opacity: .4 }}>{a.icon}</span>
                        <span style={{ position: 'absolute', top: 10, left: 10,
                          fontSize: 9, fontFamily: 'JetBrains Mono,monospace', fontWeight: 700,
                          letterSpacing: '.06em', textTransform: 'uppercase',
                          padding: '3px 9px', borderRadius: 5,
                          color: a.color, background: `${a.color}20`,
                          border: `1px solid ${a.color}35` }}>
                          {a.cat}
                        </span>
                        <span style={{ position: 'absolute', top: 10, right: 10,
                          fontSize: 8.5, fontFamily: 'JetBrains Mono,monospace',
                          color: '#4F46E5', background: 'rgba(99,102,241,.15)',
                          border: '1px solid rgba(99,102,241,.25)',
                          padding: '2px 8px', borderRadius: 4 }}>
                          Coming Soon
                        </span>
                      </div>
                      {/* Skeleton content */}
                      <div style={{ padding: '12px 13px 14px' }}>
                        <div className="skeleton" style={{ height: 10, width: '85%', marginBottom: 8 }}/>
                        <div className="skeleton" style={{ height: 8,  width: '100%',marginBottom: 5 }}/>
                        <div className="skeleton" style={{ height: 8,  width: '65%', marginBottom: 14 }}/>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                          paddingTop: 10, borderTop: '1px solid rgba(99,102,241,.08)' }}>
                          <div className="skeleton" style={{ width: 22, height: 22, borderRadius: 6 }}/>
                          <div className="skeleton" style={{ height: 8, width: 80 }}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* TOOLS — COMING SOON */}
              <section id="tools">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17,
                    color: '#F1F5F9', letterSpacing: '-.3px' }}>Featured Tools</h2>
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10,
                    color: '#4F46E5', background: 'rgba(99,102,241,.1)',
                    border: '1px solid rgba(99,102,241,.22)', borderRadius: 20,
                    padding: '3px 12px', letterSpacing: '.05em' }}>COMING SOON</span>
                </div>
                <div className="tools-grid" style={{ display: 'grid', gap: 10 }}>
                  {TOOLS.map(t => (
                    <div key={t.name} style={{
                      background: 'rgba(11,13,30,.9)',
                      border: '1px solid rgba(99,102,241,.12)',
                      borderRadius: 13, padding: '16px',
                      opacity: .65, cursor: 'not-allowed',
                    }}>
                      <div style={{ fontSize: 26, marginBottom: 10 }}>{t.icon}</div>
                      <div style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', marginBottom: 6, gap: 8 }}>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700,
                          fontSize: 14, color: '#94A3B8', letterSpacing: '-.2px' }}>{t.name}</div>
                        <span style={{ fontSize: 8.5, fontFamily: 'JetBrains Mono,monospace',
                          color: '#475569', background: 'rgba(255,255,255,.04)',
                          border: '1px solid rgba(255,255,255,.08)',
                          padding: '2px 7px', borderRadius: 4, flexShrink: 0 }}>Soon</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: '#4B5563', lineHeight: 1.55,
                        fontWeight: 300 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* EXPLORE BY DOMAIN */}
              <section>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17,
                  color: '#F1F5F9', letterSpacing: '-.3px', marginBottom: 14 }}>
                  Explore by Domain
                </h2>
                <div className="domain-row">
                  {DOMAINS.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 8, padding: '14px 10px',
                      background: 'rgba(11,13,30,.9)',
                      border: '1px solid rgba(99,102,241,.12)',
                      borderRadius: 12, cursor: 'pointer',
                      transition: 'all .2s', textAlign: 'center',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${d.c}55`; el.style.background = 'rgba(99,102,241,.07)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(99,102,241,.12)'; el.style.background = 'rgba(11,13,30,.9)' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 9,
                        background: `${d.c}18`, border: `1px solid ${d.c}28`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18 }}>{d.icon}</div>
                      <div style={{ fontSize: 11.5, fontWeight: 500, color: '#94A3B8',
                        lineHeight: 1.35 }}>
                        {d.label.split('\n').map((l, li) => <div key={li}>{l}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── SIDEBAR: COMING SOON ── */}
            <aside>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17,
                color: '#F1F5F9', letterSpacing: '-.3px', marginBottom: 14 }}>Coming Soon</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {COMING_FEATURES.map((c, i) => (
                  <div key={i} style={{ background: 'rgba(11,13,30,.9)',
                    border: '1px solid rgba(99,102,241,.12)',
                    borderRadius: 12, padding: '13px 14px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all .2s', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,.28)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,.12)'}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700,
                        fontSize: 13.5, color: '#E2E8F0', marginBottom: 3,
                        letterSpacing: '-.15px' }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: '#4B5563', fontWeight: 300 }}>{c.sub}</div>
                      {c.badge && (
                        <span style={{ display: 'inline-block', marginTop: 6, fontSize: 9,
                          fontFamily: 'JetBrains Mono,monospace', fontWeight: 600,
                          color: c.badgeC, background: c.badgeBg,
                          border: `1px solid ${c.badgeBdr}`,
                          padding: '2px 8px', borderRadius: 4 }}>{c.badge}</span>
                      )}
                    </div>
                    <div style={{ width: 46, height: 46, borderRadius: 10,
                      background: c.imgC, border: '1px solid rgba(99,102,241,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  </div>
                ))}

                {/* More Modules */}
                <div style={{ background: 'rgba(11,13,30,.9)',
                  border: '1px solid rgba(99,102,241,.12)',
                  borderRadius: 12, padding: '13px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', transition: 'all .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,.28)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,.12)'}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700,
                      fontSize: 13.5, color: '#E2E8F0', marginBottom: 2 }}>More Modules</div>
                    <div style={{ fontSize: 12, color: '#4B5563' }}>Stay tuned for more updates</div>
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#64748B', fontSize: 16 }}>···</div>
                </div>
              </div>
            </aside>
          </div>

          {/* ═══════════════════════════════
              ABOUT
          ═══════════════════════════════ */}
          <section id="about" style={{ borderTop: '1px solid rgba(99,102,241,.1)',
            padding: '48px 0 56px', marginTop: 14 }}>
            <div className="about-grid" style={{ display: 'grid', gap: 40 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono,monospace',
                  color: '#6366F1', letterSpacing: '.08em', textTransform: 'uppercase',
                  marginBottom: 10 }}>About NextGNow</div>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800,
                  fontSize: 'clamp(24px,3vw,34px)', color: '#fff',
                  letterSpacing: '-1px', marginBottom: 20, lineHeight: 1.15 }}>
                  The Telecom<br/><span className="gt-purple">Knowledge Platform</span>
                </h2>
                {[
                  '<strong style="color:#E2E8F0">NextGNow</strong> is a modern telecom intelligence platform built for engineers, researchers and professionals who need to stay ahead of 5G NR, 6G and 3GPP developments.',
                  'We publish technical content covering everything from physical layer fundamentals to cutting-edge 6G research — explained with real engineering depth and zero jargon.',
                  'Our <span style="color:#818CF8;font-weight:500">SpectrumAI</span> assistant (click the icon below-right) provides instant, spec-grounded answers powered by deep 3GPP knowledge across Release 15 through Release 19 and beyond.',
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.8,
                    fontWeight: 300, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: p }}/>
                ))}
                <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                  {['Follow on LinkedIn', 'Follow on X', 'Contact Us'].map(l => (
                    <a key={l} href={l.startsWith('Contact') ? 'mailto:hello@nextgnow.in' : 'https://linkedin.com'}
                      style={{ fontSize: 13, color: '#94A3B8', padding: '9px 16px',
                        borderRadius: 10, border: '1px solid rgba(99,102,241,.18)',
                        textDecoration: 'none', background: 'rgba(99,102,241,.06)',
                        transition: 'all .2s' }}>
                      {l}
                    </a>
                  ))}
                </div>
              </div>

              <div className="stat-cards" style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
                {[
                  { v: '5G+6G',  l: 'Technology Focus',   s: 'From NR to IMT-2030',        c: '#3B82F6' },
                  { v: 'Daily',  l: 'Fresh Content',       s: 'Technical depth every day',  c: '#06B6D4' },
                  { v: 'Rel-19', l: '3GPP Release',        s: 'Always up to date',          c: '#A78BFA' },
                  { v: 'Free',   l: 'Always Open Access',  s: 'No paywalls ever',           c: '#10B981' },
                ].map(s => (
                  <div key={s.l} style={{ background: 'rgba(11,13,30,.9)',
                    border: '1px solid rgba(99,102,241,.12)', borderRadius: 14, padding: 20 }}>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800,
                      fontSize: 28, color: s.c, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#CBD5E1',
                      marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontSize: 11.5, color: '#475569' }}>{s.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />

      {/* ── SPECTRUMIA FAB (floating, closed by default) ── */}
      <SpectrumFAB />
    </div>
  )
}
