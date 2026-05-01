import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroVisual from '@/components/HeroVisual'
import SpectrumPanel from '@/components/SpectrumPanel'

/* ─── DATA ─── */
const STATS=[
  {val:'1.2K+', lbl:'Tech Articles'},
  {val:'280+',  lbl:'Experts'},
  {val:'50+',   lbl:'3GPP Specs'},
  {val:'10K+',  lbl:'Community Members'},
]

const TOOLS=[
  {icon:'🤖',name:'SpectrumAI Assistant',      desc:'AI-powered spectrum insights and recommendations for smarter network decisions.',color:'#818CF8',bg:'rgba(99,102,241,.1)'},
  {icon:'📄',name:'Spec Decoder',               desc:'Decode and simplify 3GPP specifications with intelligent explanations.',         color:'#60A5FA',bg:'rgba(59,130,246,.1)'},
  {icon:'📊',name:'Log Analyzer',               desc:'Upload, parse, and analyze logs to detect issues faster with AI-driven insights.',color:'#34D399',bg:'rgba(16,185,129,.1)'},
  {icon:'🔄',name:'Call Flow Viewer',           desc:'Visualize call flows and signaling diagrams across network elements.',             color:'#FB923C',bg:'rgba(251,146,60,.1)'},
]

const ARTICLES=[
  {tag:'6G + AI',   tagClass:'tag-6g',  icon:'🌐',  title:'AI-Native Air Interface for 6G',          excerpt:'How AI is reshaping PHY, MAC and network intelligence for 2030 and beyond.',        author:'Dr. Elena Kim',  date:'May 24, 2025',  read:'6 min'},
  {tag:'5G',        tagClass:'tag-5g',  icon:'📡',  title:'5G Advanced: Evolution Not Revolution',   excerpt:'Key enhancements in Rel-18 and what they mean for operators.',                      author:'Rahul Iyer',     date:'May 20, 2025',  read:'7 min'},
  {tag:'Log Analysis',tagClass:'tag-log',icon:'📈', title:'Smart Log Analysis with SpectrumAI',      excerpt:'Detect anomalies faster using AI/ML on network logs.',                              author:'Priya Nair',     date:'May 18, 2025',  read:'5 min'},
  {tag:'3GPP',      tagClass:'tag-3gpp',icon:'📋',  title:'Deep Dive into 3GPP Rel-19 (Part 1)',    excerpt:'Core network enhancements and new capabilities coming in Release 19.',               author:'Marco Bianchi',  date:'May 16, 2025',  read:'8 min'},
  {tag:'ITU',       tagClass:'tag-itu', icon:'🏛️',  title:'ITU Framework for 6G Vision',             excerpt:'Exploring the ITU-R framework and recommended 6G capabilities for IMT-2030.',     author:'Sara Chen',      date:'May 14, 2025',  read:'6 min'},
  {tag:'Industry',  tagClass:'tag-news',icon:'📰',  title:'Global 5G Standalone Deployments Accelerate',excerpt:'Latest updates on 5G SA adoption and market trends worldwide.',              author:'James O\'Brien', date:'May 12, 2025',  read:'4 min'},
]

const DOMAINS=[
  {icon:'📡',label:'Radio Access\nNetwork (RAN)',     color:'#60A5FA'},
  {icon:'🏗️',label:'Core Network\n& Edge',            color:'#818CF8'},
  {icon:'🔗',label:'Transport\nNetworks',             color:'#34D399'},
  {icon:'📱',label:'Devices &\nChipsets',             color:'#FB923C'},
  {icon:'🤖',label:'AI/ML in\nTelecom',               color:'#F472B6'},
  {icon:'🔒',label:'Security &\nPrivacy',             color:'#FBBF24'},
]

const COMING=[
  {icon:'🌐',title:'IMT-2030',       sub:'The global vision for 6G',          badge:'Coming Q4 2026',color:'#818CF8',bg:'rgba(99,102,241,.12)'},
  {icon:'📋',title:'3GPP Rel-19',    sub:'Detailed coverage & analysis',       badge:'In Progress',  color:'#60A5FA',bg:'rgba(59,130,246,.12)'},
  {icon:'🤖',title:'AI-Powered Log Analysis',sub:'Advanced insights & automation',badge:'Beta Soon',color:'#34D399',bg:'rgba(16,185,129,.12)'},
]

export default function HomePage(){
  return(
    <div className="page-root">
      <Header/>

      {/* ── TICKER ── */}
      <div style={{background:'rgba(99,102,241,.1)',borderBottom:'1px solid rgba(99,102,241,.15)',height:32,overflow:'hidden',display:'flex',alignItems:'center'}}>
        <div style={{background:'rgba(99,102,241,.3)',padding:'0 16px',height:'100%',display:'flex',alignItems:'center',flexShrink:0,fontSize:10,fontFamily:'JetBrains Mono,monospace',color:'#A78BFA',letterSpacing:'.06em',textTransform:'uppercase',borderRight:'1px solid rgba(99,102,241,.2)'}}>Live</div>
        <div style={{overflow:'hidden',flex:1}}>
          <div className="ticker-t" style={{display:'flex',gap:40,paddingLeft:24,whiteSpace:'nowrap',alignItems:'center'}}>
            {['3GPP Rel-19 timeline confirmed for 2026','6G IMT-2030 KPIs finalized by ITU-R','Open RAN moves to commercial scale globally','Qualcomm unveils AI-native 6G prototype','NTIA clears 2.7 GHz spectrum for 6G','5G SA deployments accelerate across Asia',
              '3GPP Rel-19 timeline confirmed for 2026','6G IMT-2030 KPIs finalized by ITU-R','Open RAN moves to commercial scale globally','Qualcomm unveils AI-native 6G prototype','NTIA clears 2.7 GHz spectrum for 6G','5G SA deployments accelerate across Asia'].map((t,i)=>(
              <span key={i} style={{fontSize:11.5,color:'rgba(196,181,253,.75)',display:'flex',alignItems:'center',gap:8}}>
                <span style={{width:3,height:3,borderRadius:'50%',background:'rgba(129,140,248,.4)',flexShrink:0}}/>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: content + sidebar ── */}
      <div style={{maxWidth:1440,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'1fr',gap:24}} className="main-layout">
        <style>{`@media(min-width:1200px){.main-layout{grid-template-columns:1fr 340px!important;align-items:start}}`}</style>

        {/* ── LEFT: MAIN CONTENT ── */}
        <main>

          {/* HERO */}
          <section style={{padding:'40px 0 32px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr',gap:32,alignItems:'center'}} className="hero-g">
              <style>{`@media(min-width:768px){.hero-g{grid-template-columns:1fr 1fr!important;gap:48px!important}}`}</style>

              {/* Left text */}
              <div className="anim-up">
                <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:20,background:'rgba(99,102,241,.12)',border:'1px solid rgba(99,102,241,.22)',borderRadius:20,padding:'5px 14px'}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 8px #10B981',flexShrink:0}}/>
                  <span style={{fontSize:11,fontFamily:'JetBrains Mono,monospace',color:'#A78BFA',letterSpacing:'.06em',textTransform:'uppercase'}}>Telecom Intelligence Platform</span>
                </div>

                <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(34px,4.5vw,52px)',lineHeight:1.08,letterSpacing:'-1.2px',color:'#fff',marginBottom:16}}>
                  Tomorrow&apos;s<br/>
                  Telecom{' '}
                  <span className="gt">Explained Today</span>
                </h1>

                <p style={{fontSize:15,fontWeight:300,color:'#94A3B8',lineHeight:1.75,maxWidth:420,marginBottom:28}}>
                  AI-powered tools and expert insights for building the next generation of connected intelligence.
                </p>

                {/* CTA row */}
                <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:32}}>
                  <a href="#" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,#3B82F6,#6366F1)',color:'#fff',fontWeight:600,fontSize:14,padding:'12px 22px',borderRadius:11,textDecoration:'none',boxShadow:'0 4px 20px rgba(99,102,241,.4)',transition:'all .2s'}}>
                    Explore 6G + AI
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <a href="#articles" style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'#CBD5E1',fontWeight:500,fontSize:14,padding:'12px 22px',borderRadius:11,textDecoration:'none',transition:'all .2s'}}>
                    Browse All Articles
                  </a>
                </div>

                {/* Stats */}
                <div style={{display:'flex',gap:28,flexWrap:'wrap',paddingTop:24,borderTop:'1px solid rgba(99,102,241,.12)'}}>
                  {STATS.map(s=>(
                    <div key={s.lbl}>
                      <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:22,color:'#818CF8',lineHeight:1}}>{s.val}</div>
                      <div style={{fontSize:12,color:'#475569',marginTop:4}}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: 6G visual */}
              <div className="anim-up-1 hero-vis">
                <style>{`.hero-vis{display:none} @media(min-width:768px){.hero-vis{display:block!important}}`}</style>
                <HeroVisual/>
              </div>
            </div>
          </section>

          {/* FEATURED TOOLS */}
          <section style={{borderTop:'1px solid rgba(99,102,241,.1)',padding:'32px 0'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'#fff',letterSpacing:'-.3px'}}>Featured Tools</h2>
              <span style={{fontSize:12,color:'#6366F1',fontWeight:500,fontFamily:'JetBrains Mono,monospace'}}>(Coming Soon)</span>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
              {TOOLS.map(t=>(
                <div key={t.name} className="tool-card" style={{opacity:.75,cursor:'not-allowed'}}>
                  <div style={{width:42,height:42,borderRadius:11,background:t.bg,border:`1px solid ${t.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>
                    {t.icon}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:5}}>
                      <div style={{fontSize:14,fontWeight:600,color:'#E2E8F0',fontFamily:'Syne,sans-serif',letterSpacing:'-.2px'}}>{t.name}</div>
                      <span style={{fontSize:9,fontFamily:'JetBrains Mono,monospace',background:'rgba(99,102,241,.15)',color:'#818CF8',border:'1px solid rgba(99,102,241,.2)',padding:'2px 7px',borderRadius:5,whiteSpace:'nowrap',flexShrink:0,marginLeft:8}}>Coming Soon</span>
                    </div>
                    <div style={{fontSize:12.5,color:'#64748B',lineHeight:1.55,fontWeight:300}}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LATEST ARTICLES */}
          <section id="articles" style={{borderTop:'1px solid rgba(99,102,241,.1)',padding:'32px 0'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:3,height:22,borderRadius:2,background:'linear-gradient(180deg,#3B82F6,#8B5CF6)'}}/>
                <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'#fff',letterSpacing:'-.3px'}}>Latest Articles</h2>
              </div>
              <a href="#" style={{fontSize:13,color:'#818CF8',textDecoration:'none',display:'flex',alignItems:'center',gap:5}}>
                View all articles
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:14}}>
              {ARTICLES.map((a,i)=>(
                <div key={i} className="article-card">
                  {/* Image area */}
                  <div className="article-img" style={{background:`radial-gradient(circle at 50% 60%,${
                    a.tagClass==='tag-6g'?'rgba(139,92,246,.25)':
                    a.tagClass==='tag-5g'?'rgba(59,130,246,.25)':
                    a.tagClass==='tag-log'?'rgba(16,185,129,.25)':
                    a.tagClass==='tag-3gpp'?'rgba(245,158,11,.2)':
                    a.tagClass==='tag-itu'?'rgba(236,72,153,.2)':'rgba(6,182,212,.2)'
                  },rgba(12,17,35,.8))`}}>
                    <span style={{fontSize:44,opacity:.7}}>{a.icon}</span>
                  </div>
                  {/* Content */}
                  <div style={{padding:'16px 18px 18px',display:'flex',flexDirection:'column',flex:1}}>
                    <span className={`tag ${a.tagClass}`} style={{fontSize:9.5,fontFamily:'JetBrains Mono,monospace',fontWeight:600,letterSpacing:'.07em',textTransform:'uppercase',padding:'3px 9px',borderRadius:5,border:'1px solid',marginBottom:10,width:'fit-content'}}>
                      {a.tag}
                    </span>
                    <h3 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14.5,color:'#E2E8F0',lineHeight:1.4,margin:'0 0 8px',letterSpacing:'-.2px'}}>{a.title}</h3>
                    <p style={{fontSize:12.5,color:'#64748B',lineHeight:1.6,fontWeight:300,margin:'0 0 14px',flex:1}}>{a.excerpt}</p>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid rgba(99,102,241,.08)'}}>
                      <div style={{display:'flex',alignItems:'center',gap:7}}>
                        <div style={{width:22,height:22,borderRadius:6,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff',fontWeight:700}}>
                          {a.author.split(' ').map(w=>w[0]).join('').slice(0,2)}
                        </div>
                        <span style={{fontSize:11.5,color:'#64748B'}}>{a.author}</span>
                      </div>
                      <span style={{fontSize:11,color:'#475569',fontFamily:'JetBrains Mono,monospace'}}>{a.date} · {a.read}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPLORE BY DOMAIN */}
          <section style={{borderTop:'1px solid rgba(99,102,241,.1)',padding:'32px 0'}}>
            <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'#fff',letterSpacing:'-.3px',marginBottom:20}}>Explore by Domain</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:10}}>
              {DOMAINS.map(d=>(
                <div key={d.label} className="domain-box">
                  <div style={{width:44,height:44,borderRadius:12,background:`${d.color}18`,border:`1px solid ${d.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>
                    {d.icon}
                  </div>
                  <div style={{fontSize:12,fontWeight:500,color:'#94A3B8',lineHeight:1.45,textAlign:'center'}}>
                    {d.label.split('\n').map((l,i)=><span key={i} style={{display:'block'}}>{l}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COMING SOON */}
          <section style={{borderTop:'1px solid rgba(99,102,241,.1)',padding:'32px 0'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'#fff',letterSpacing:'-.3px'}}>Coming Soon</h2>
              <a href="#" style={{fontSize:12.5,color:'#818CF8',textDecoration:'none',display:'flex',alignItems:'center',gap:4}}>
                View roadmap
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {COMING.map(c=>(
                <div key={c.title} className="cs-card">
                  <div style={{width:48,height:48,borderRadius:12,background:c.bg,border:`1px solid ${c.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>
                    {c.icon}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14.5,fontWeight:700,color:'#E2E8F0',fontFamily:'Syne,sans-serif',letterSpacing:'-.2px',marginBottom:3}}>{c.title}</div>
                    <div style={{fontSize:12.5,color:'#64748B',fontWeight:300}}>{c.sub}</div>
                  </div>
                  <span style={{fontSize:9.5,fontFamily:'JetBrains Mono,monospace',background:c.bg,color:c.color,border:`1px solid ${c.color}30`,padding:'4px 9px',borderRadius:6,whiteSpace:'nowrap',flexShrink:0}}>
                    {c.badge}
                  </span>
                </div>
              ))}

              <div className="cs-card" style={{justifyContent:'center',cursor:'pointer',borderStyle:'dashed',borderColor:'rgba(99,102,241,.15)'}}>
                <div style={{width:32,height:32,borderRadius:8,background:'rgba(99,102,241,.1)',display:'flex',alignItems:'center',justifyContent:'center',marginRight:8}}>
                  <span style={{fontSize:16}}>⋯</span>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'#94A3B8'}}>More Modules</div>
                  <div style={{fontSize:12,color:'#475569'}}>Stay tuned for more updates</div>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ── RIGHT SIDEBAR: SpectrumAI ── */}
        <aside style={{paddingTop:40}} className="spectrum-sidebar">
          <style>{`.spectrum-sidebar{display:none} @media(min-width:1200px){.spectrum-sidebar{display:block!important;position:sticky;top:80px}}`}</style>
          <SpectrumPanel/>
        </aside>

      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{borderTop:'1px solid rgba(99,102,241,.1)',padding:'56px 0',background:'rgba(8,11,20,.6)'}}>
        <div style={{maxWidth:1440,margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'1fr',gap:40}} className="about-g">
          <style>{`@media(min-width:900px){.about-g{grid-template-columns:1fr 1fr!important;gap:80px!important;alignItems:center}}`}</style>
          <div>
            <div style={{fontSize:11,fontFamily:'JetBrains Mono,monospace',color:'#6366F1',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:10}}>About NextGNow</div>
            <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(26px,3vw,36px)',color:'#fff',letterSpacing:'-1px',marginBottom:20,lineHeight:1.15}}>
              The Telecom<br/><span className="gt">Knowledge Platform</span>
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {[
                '<strong style="color:#E2E8F0">NextGNow</strong> is a modern telecom intelligence platform built for engineers, researchers and professionals who need to stay ahead of 5G NR, 6G and 3GPP developments.',
                'We publish technical content covering everything from physical layer fundamentals to cutting-edge 6G research — explained with real engineering depth.',
                'Our <span style="color:#818CF8;fontWeight:500">SpectrumAI</span> assistant provides instant, spec-grounded answers powered by deep 3GPP knowledge across Release 15 through Release 19 and beyond.',
              ].map((p,i)=>(
                <p key={i} style={{fontSize:14.5,color:'#94A3B8',lineHeight:1.8,fontWeight:300,margin:0}} dangerouslySetInnerHTML={{__html:p}}/>
              ))}
            </div>
            <div style={{display:'flex',gap:10,marginTop:24,flexWrap:'wrap'}}>
              {['Follow on LinkedIn','Follow on X','Contact Us'].map(l=>(
                <a key={l} href={l.startsWith('Contact')?'mailto:hello@nextgnow.in':'https://linkedin.com'}
                  style={{fontSize:13,color:'#94A3B8',padding:'9px 16px',borderRadius:9,border:'1px solid rgba(99,102,241,.18)',textDecoration:'none',transition:'all .2s',background:'rgba(99,102,241,.06)'}}>
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {[
              {v:'5G+6G', l:'Technology Focus',   s:'From NR to IMT-2030',       c:'#818CF8'},
              {v:'Daily', l:'Fresh Content',       s:'Technical depth every day', c:'#60A5FA'},
              {v:'Rel-19',l:'3GPP Current Release',s:'Always up to date',         c:'#34D399'},
              {v:'Free',  l:'Always Open Access',  s:'No paywalls, ever',         c:'#FB923C'},
            ].map(s=>(
              <div key={s.l} style={{background:'rgba(12,17,35,.8)',border:'1px solid rgba(99,102,241,.12)',borderRadius:14,padding:20}}>
                <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:28,color:s.c,lineHeight:1,marginBottom:6}}>{s.v}</div>
                <div style={{fontSize:13,fontWeight:600,color:'#CBD5E1',marginBottom:3}}>{s.l}</div>
                <div style={{fontSize:11.5,color:'#475569'}}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
