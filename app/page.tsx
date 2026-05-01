import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RadarAnimation from '@/components/RadarAnimation'

/* ── Data ── */
const DOMAINS = [
  {
    icon: '🛰️',
    label: '6G + AI',
    tag: 'IMT-2030',
    tagColor: { color:'#A78BFA', background:'rgba(139,92,246,.1)', borderColor:'rgba(139,92,246,.2)' },
    desc: 'AI-native networks, reconfigurable intelligent surfaces, THz communications and IMT-2030 research.',
    accentColor: 'rgba(139,92,246,.12)',
    hoverBorder: '#8B5CF6',
  },
  {
    icon: '📡',
    label: '5G',
    tag: '3GPP Rel-19',
    tagColor: { color:'#60A5FA', background:'rgba(59,130,246,.1)', borderColor:'rgba(59,130,246,.2)' },
    desc: 'NR physical layer, massive MIMO, 5G Core SBA, O-RAN, protocol stacks and detailed call flows.',
    accentColor: 'rgba(59,130,246,.12)',
    hoverBorder: '#3B82F6',
  },
  {
    icon: '🔬',
    label: 'Log Analysis',
    tag: 'AI-Powered',
    tagColor: { color:'#34D399', background:'rgba(16,185,129,.1)', borderColor:'rgba(16,185,129,.2)' },
    desc: 'Decode 5G NAS, RRC, NGAP and SBI logs with AI-assisted protocol analysis and spec citations.',
    accentColor: 'rgba(16,185,129,.12)',
    hoverBorder: '#10B981',
  },
  {
    icon: '📋',
    label: '3GPP Releases',
    tag: 'Rel-17 → 19',
    tagColor: { color:'#FCD34D', background:'rgba(245,158,11,.1)', borderColor:'rgba(245,158,11,.2)' },
    desc: 'Release 17, 18 and 19 features explained clearly — what changed, why it matters, spec references.',
    accentColor: 'rgba(245,158,11,.12)',
    hoverBorder: '#F59E0B',
  },
]

const TOOLS = [
  { icon:'🤖', name:'SpectrumAI',       desc:'AI-powered 5G NR & 6G assistant grounded in 3GPP specifications.'  },
  { icon:'🔍', name:'Spec Decoder',     desc:'Paste any 3GPP TS/TR clause — get plain-English expert decoding.'    },
  { icon:'📊', name:'Log Analyzer',     desc:'Upload NAS, RRC or NGAP logs for AI-assisted protocol analysis.'     },
  { icon:'🔄', name:'Call Flow Viewer', desc:'Visual step-by-step 5G signalling flows: Registration, PDU, Handover.'},
]

const STATS = [
  { value:'5G + 6G', label:'Core Focus'          },
  { value:'Rel-19',  label:'3GPP Current'         },
  { value:'Daily',   label:'New Content'          },
  { value:'Free',    label:'Always Open'          },
]

/* ── Page ── */
export default function HomePage() {
  return (
    <div className="page-bg" style={{minHeight:'100vh'}}>
      <Header />

      <main>

        {/* ═══════════════════════════════
            HERO
        ═══════════════════════════════ */}
        <section style={{padding:'80px 0 72px', overflow:'hidden'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'grid', gridTemplateColumns:'1fr', gap:48, alignItems:'center'}}
            className="hero-grid">
            <style>{`
              @media(min-width:1024px){ .hero-grid{ grid-template-columns:1fr 420px !important; gap:80px !important; } }
              @media(max-width:640px) { .hero-section-padding{ padding:56px 0 48px !important; } }
            `}</style>

            {/* Left */}
            <div className="anim-in">
              {/* Eyebrow */}
              <div style={{display:'inline-flex', alignItems:'center', gap:8, marginBottom:28}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'#10B981', boxShadow:'0 0 10px #10B981', flexShrink:0, animation:'nodeBlink 2s ease-in-out infinite'}}/>
                <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, fontWeight:500, letterSpacing:'.08em', textTransform:'uppercase', color:'#64748B'}}>
                  Telecom Intelligence Platform
                </span>
              </div>

              {/* Headline */}
              <h1 style={{fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(38px,5vw,58px)', lineHeight:1.08, letterSpacing:'-1.5px', color:'#F8FAFC', marginBottom:20}}>
                Tomorrow&apos;s<br/>
                <span className="grad-text">Telecom</span>{' '}Explained<br/>
                <span className="grad-text">Today</span>
              </h1>

              {/* Sub */}
              <p style={{fontSize:16, fontWeight:300, color:'#94A3B8', lineHeight:1.8, maxWidth:480, marginBottom:36}}>
                Deep technical knowledge for 5G NR, 6G, O-RAN and 3GPP specifications — with AI-powered tools and real engineering insights, published daily.
              </p>

              {/* CTAs */}
              <div style={{display:'flex', gap:12, flexWrap:'wrap', marginBottom:48}}>
                <a href="#articles" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'linear-gradient(135deg,#3B82F6,#06B6D4)',
                  color:'#fff', fontWeight:600, fontSize:14, padding:'13px 24px',
                  borderRadius:12, textDecoration:'none',
                  boxShadow:'0 6px 24px rgba(59,130,246,.35)',
                  transition:'all .2s ease',
                }}>
                  Explore Articles
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#tools" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'transparent', color:'#CBD5E1',
                  fontWeight:500, fontSize:14, padding:'13px 24px',
                  borderRadius:12, textDecoration:'none',
                  border:'1px solid #1C324F',
                  transition:'all .2s ease',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
                  </svg>
                  View Tools
                </a>
              </div>

              {/* Stats row */}
              <div style={{display:'flex', gap:32, paddingTop:28, borderTop:'1px solid #0F1D30', flexWrap:'wrap'}}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <div style={{fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:24, color:'#3B82F6', lineHeight:1}}>{s.value}</div>
                    <div style={{fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#475569', marginTop:5, letterSpacing:'.07em', textTransform:'uppercase'}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Radar (desktop only) */}
            <div className="anim-in-1 lg-hide-radar">
              <style>{`.lg-hide-radar { display:none; } @media(min-width:1024px){ .lg-hide-radar{ display:block !important; } }`}</style>
              <RadarAnimation />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            DOMAIN CARDS
        ═══════════════════════════════ */}
        <section style={{borderTop:'1px solid #0F1D30', padding:'64px 0'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 32px'}}>

            {/* Section label */}
            <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:40}}>
              <div style={{height:1, flex:1, background:'#0F1D30'}}/>
              <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#334155', letterSpacing:'.1em', textTransform:'uppercase', whiteSpace:'nowrap'}}>
                What we cover
              </span>
              <div style={{height:1, flex:1, background:'#0F1D30'}}/>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16}}>
              {DOMAINS.map(d => (
                <div
                  key={d.label}
                  className="card"
                  style={{padding:24, cursor:'pointer', position:'relative', overflow:'hidden'}}
                >
                  {/* Top accent bar */}
                  <div style={{position:'absolute', top:0, left:0, right:0, height:2,
                    background:`linear-gradient(90deg,${d.hoverBorder},transparent)`, opacity:.6}}/>

                  <div style={{fontSize:28, marginBottom:14}}>{d.icon}</div>

                  <span className="tag" style={d.tagColor}>{d.tag}</span>

                  <h3 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:17, color:'#F1F5F9',
                    margin:'12px 0 8px', letterSpacing:'-.3px'}}>{d.label}</h3>

                  <p style={{fontSize:13.5, color:'#64748B', lineHeight:1.65, fontWeight:300, margin:'0 0 16px'}}>{d.desc}</p>

                  <span style={{display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:500, color:d.hoverBorder}}>
                    Coming soon
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            LATEST ARTICLES
        ═══════════════════════════════ */}
        <section id="articles" style={{borderTop:'1px solid #0F1D30', padding:'64px 0'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 32px'}}>

            {/* Header */}
            <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36, flexWrap:'wrap', gap:16}}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <div style={{width:28, height:2, borderRadius:2, background:'linear-gradient(90deg,#3B82F6,#06B6D4)'}}/>
                  <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', letterSpacing:'.08em', textTransform:'uppercase'}}>Daily Intelligence</span>
                </div>
                <h2 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:26, color:'#F1F5F9', letterSpacing:'-.5px', margin:0}}>Latest Articles</h2>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'#10B981', boxShadow:'0 0 8px #10B981'}}/>
                <span style={{fontSize:12, color:'#475569', fontFamily:'JetBrains Mono,monospace'}}>Published daily</span>
              </div>
            </div>

            {/* Empty state */}
            <div className="card" style={{padding:'72px 32px', textAlign:'center'}}>
              <div style={{width:56, height:56, borderRadius:16, background:'rgba(59,130,246,.08)', border:'1px solid rgba(59,130,246,.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:24}}>
                📡
              </div>
              <h3 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:20, color:'#94A3B8', margin:'0 0 10px'}}>
                Articles Coming Soon
              </h3>
              <p style={{fontSize:14, color:'#475569', maxWidth:360, margin:'0 auto', lineHeight:1.7, fontWeight:300}}>
                Daily 5G, 6G and 3GPP technical articles will appear here. We publish every morning.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            TOOLS
        ═══════════════════════════════ */}
        <section id="tools" style={{borderTop:'1px solid #0F1D30', padding:'64px 0', background:'rgba(6,13,28,.5)'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 32px'}}>

            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
              <div style={{width:28, height:2, borderRadius:2, background:'linear-gradient(90deg,#3B82F6,#06B6D4)'}}/>
              <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', letterSpacing:'.08em', textTransform:'uppercase'}}>Power Tools</span>
            </div>
            <h2 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:26, color:'#F1F5F9', letterSpacing:'-.5px', margin:'0 0 36px'}}>Tools for Engineers</h2>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16}}>
              {TOOLS.map(t => (
                <div key={t.name} className="card" style={{padding:24, opacity:.65, cursor:'not-allowed'}}>
                  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16}}>
                    <div style={{fontSize:26}}>{t.icon}</div>
                    <span className="tag" style={{color:'#475569', background:'rgba(255,255,255,.04)', borderColor:'#1C324F', fontSize:9}}>Coming Soon</span>
                  </div>
                  <h3 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:16, color:'#94A3B8', margin:'0 0 8px', letterSpacing:'-.2px'}}>{t.name}</h3>
                  <p style={{fontSize:13, color:'#475569', lineHeight:1.65, fontWeight:300, margin:0}}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            ABOUT
        ═══════════════════════════════ */}
        <section id="about" style={{borderTop:'1px solid #0F1D30', padding:'64px 0'}}>
          <div style={{maxWidth:1280, margin:'0 auto', padding:'0 32px'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:48}} className="about-grid">
              <style>{`@media(min-width:1024px){ .about-grid{ grid-template-columns:1fr 1fr !important; gap:80px !important; align-items:center; } }`}</style>

              {/* Text */}
              <div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <div style={{width:28, height:2, borderRadius:2, background:'linear-gradient(90deg,#3B82F6,#06B6D4)'}}/>
                  <span style={{fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'#475569', letterSpacing:'.08em', textTransform:'uppercase'}}>About NextGNow</span>
                </div>
                <h2 style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:28, color:'#F1F5F9', letterSpacing:'-.5px', margin:'0 0 24px', lineHeight:1.2}}>
                  The Telecom<br/>Knowledge Platform
                </h2>
                <div style={{display:'flex', flexDirection:'column', gap:14}}>
                  <p style={{fontSize:14.5, color:'#94A3B8', lineHeight:1.8, fontWeight:300, margin:0}}>
                    <strong style={{color:'#F1F5F9', fontWeight:600}}>NextGNow</strong> is a modern telecom intelligence platform built for engineers, researchers and professionals who need to stay ahead of 5G NR, 6G and 3GPP developments.
                  </p>
                  <p style={{fontSize:14.5, color:'#94A3B8', lineHeight:1.8, fontWeight:300, margin:0}}>
                    We publish technical content covering everything from physical layer fundamentals to cutting-edge 6G research — explained with real engineering depth and zero jargon.
                  </p>
                  <p style={{fontSize:14.5, color:'#94A3B8', lineHeight:1.8, fontWeight:300, margin:0}}>
                    Our <span style={{color:'#06B6D4', fontWeight:500}}>SpectrumAI</span> assistant provides instant, spec-grounded answers powered by deep 3GPP knowledge across Release 15 through Release 19 and beyond.
                  </p>
                </div>
                <div style={{display:'flex', gap:10, marginTop:28, flexWrap:'wrap'}}>
                  {[
                    { label:'Follow on LinkedIn', href:'https://linkedin.com' },
                    { label:'Contact Us',         href:'mailto:hello@nextgnow.in' },
                  ].map(l => (
                    <a key={l.label} href={l.href}
                      style={{
                        fontSize:13, color:'#94A3B8', padding:'9px 18px',
                        borderRadius:10, border:'1px solid #1C324F',
                        textDecoration:'none', transition:'all .2s',
                      }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Stat cards */}
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {[
                  { num:'5G+6G',  lbl:'Technology Focus',    sub:'From NR to IMT-2030',          color:'#3B82F6' },
                  { num:'Daily',  lbl:'Fresh Content',        sub:'Technical depth every day',    color:'#06B6D4' },
                  { num:'Rel-19', lbl:'3GPP Release',         sub:'Always up to date',            color:'#A78BFA' },
                  { num:'Zero',   lbl:'Jargon or Fluff',      sub:'Plain English, always',        color:'#10B981' },
                ].map(s => (
                  <div key={s.lbl} className="card" style={{padding:20}}>
                    <div style={{fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:28, color:s.color, lineHeight:1, marginBottom:6}}>{s.num}</div>
                    <div style={{fontSize:13, fontWeight:600, color:'#CBD5E1', marginBottom:3}}>{s.lbl}</div>
                    <div style={{fontSize:11.5, color:'#475569', fontWeight:300}}>{s.sub}</div>
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
