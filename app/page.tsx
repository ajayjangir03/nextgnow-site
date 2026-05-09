'use client'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroVisual from '@/components/HeroVisual'
const SpectrumPanel = dynamic(()=>import('@/components/SpectrumPanel'),{ssr:false})

const STATS=[
  {val:'1.2K+',lbl:'Tech Articles'},
  {val:'280+', lbl:'Experts'},
  {val:'50+',  lbl:'3GPP Specs'},
  {val:'10K+', lbl:'Community Members'},
]

const ARTICLES=[
  {tag:'6G + AI',   tagC:'#C4B5FD',tagBg:'rgba(167,139,250,.15)',tagBdr:'rgba(167,139,250,.25)',
   imgBg:'radial-gradient(ellipse at 40% 60%,rgba(109,40,217,.65),rgba(49,10,120,.45),rgba(8,9,25,.95))',
   dots:['rgba(167,139,250,.7)','rgba(129,140,248,.5)','rgba(167,139,250,.6)','rgba(99,102,241,.8)','rgba(139,92,246,.7)','rgba(167,139,250,.5)'],
   title:'AI-Native Air Interface for 6G',
   excerpt:'How AI is reshaping PHY, MAC and network intelligence for 2030 and beyond.',
   author:'Dr. Elena Kim',date:'May 24, 2024',av:'EK',avC:'linear-gradient(135deg,#7C3AED,#4F46E5)'},
  {tag:'5G',        tagC:'#93C5FD',tagBg:'rgba(96,165,250,.15)',tagBdr:'rgba(96,165,250,.25)',
   imgBg:'radial-gradient(ellipse at 50% 65%,rgba(30,64,175,.65),rgba(7,22,80,.5),rgba(8,9,25,.95))',
   dots:['rgba(96,165,250,.7)','rgba(59,130,246,.5)','rgba(147,197,253,.6)','rgba(96,165,250,.8)','rgba(59,130,246,.6)','rgba(96,165,250,.4)'],
   title:'5G Advanced: Evolution Not Revolution',
   excerpt:'Key enhancements in Rel-18 and what they mean for operators.',
   author:'Rahul Iyer',date:'May 20, 2024',av:'RI',avC:'linear-gradient(135deg,#1D4ED8,#3B82F6)'},
  {tag:'Log Analysis',tagC:'#6EE7B7',tagBg:'rgba(52,211,153,.15)',tagBdr:'rgba(52,211,153,.25)',
   imgBg:'radial-gradient(ellipse at 50% 50%,rgba(5,70,55,.65),rgba(2,30,20,.5),rgba(8,9,25,.95))',
   dots:['rgba(52,211,153,.7)','rgba(16,185,129,.5)','rgba(52,211,153,.8)','rgba(16,185,129,.6)','rgba(52,211,153,.5)','rgba(16,185,129,.7)'],
   title:'Smart Log Analysis with SpectrumAI',
   excerpt:'Detect anomalies faster using AI/ML on network logs.',
   author:'Priya Nair',date:'May 18, 2024',av:'PN',avC:'linear-gradient(135deg,#059669,#34D399)'},
  {tag:'3GPP',      tagC:'#FCD34D',tagBg:'rgba(252,211,77,.12)',tagBdr:'rgba(252,211,77,.22)',
   imgBg:'radial-gradient(ellipse at 50% 60%,rgba(120,53,15,.55),rgba(60,20,5,.45),rgba(8,9,25,.95))',
   dots:['rgba(252,211,77,.7)','rgba(245,158,11,.5)','rgba(252,211,77,.6)','rgba(245,158,11,.8)','rgba(252,211,77,.5)','rgba(245,158,11,.6)'],
   title:'Deep Dive into 3GPP Rel-18 (Part 1)',
   excerpt:'Core network enhancements and new capabilities.',
   author:'Marco Bianchi',date:'May 16, 2024',av:'MB',avC:'linear-gradient(135deg,#B45309,#F59E0B)'},
]

const COMING=[
  {icon:'🌐',title:'IMT-2030',sub:'The global vision for 6G',badge:'Coming Q4 2026',badgeC:'#C4B5FD',badgeBg:'rgba(167,139,250,.15)',badgeBdr:'rgba(167,139,250,.25)',imgC:'linear-gradient(135deg,rgba(109,40,217,.3),rgba(99,102,241,.2))'},
  {icon:'📋',title:'3GPP Rel-19',sub:'Detailed coverage & analysis',badge:'',imgC:'linear-gradient(135deg,rgba(30,64,175,.3),rgba(59,130,246,.2))'},
  {icon:'🤖',title:'AI-Powered\nLog Analysis',sub:'Advanced insights & automation',badge:'',imgC:'linear-gradient(135deg,rgba(157,23,77,.25),rgba(236,72,153,.15))'},
]

const DOMAINS=[
  {icon:'📡',label:['Radio Access','Network (RAN)'],c:'#60A5FA'},
  {icon:'🏗️',label:['Core Network','& Edge'],c:'#818CF8'},
  {icon:'🔗',label:['Transport','Networks'],c:'#34D399'},
  {icon:'📱',label:['Devices &','Chipsets'],c:'#FB923C'},
  {icon:'🤖',label:['AI/ML in','Telecom'],c:'#F472B6'},
  {icon:'🔒',label:['Security &','Privacy'],c:'#FBBF24'},
]

/* Article card image */
function ArticleImg({a}:{a:typeof ARTICLES[0]}){
  const positions=[[15,30],[42,55],[68,25],[25,70],[55,65],[80,40]]
  return(
    <div style={{height:110,position:'relative',background:a.imgBg,overflow:'hidden',flexShrink:0}}>
      {/* Network dot pattern */}
      {a.dots.map((c,i)=>(
        <div key={i} style={{position:'absolute',width:4,height:4,borderRadius:'50%',background:c,
          left:`${positions[i][0]}%`,top:`${positions[i][1]}%`}}/>
      ))}
      {/* Waveform for log analysis */}
      {a.tag==='Log Analysis'&&(
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:.45}}>
          <svg viewBox="0 0 120 36" style={{width:'80%'}} xmlns="http://www.w3.org/2000/svg">
            <polyline points="0,18 12,12 22,26 34,6 46,22 56,14 66,20 80,4 92,28 104,16 120,18" fill="none" stroke="#34D399" strokeWidth="1.8"/>
          </svg>
        </div>
      )}
      {/* 5G text for 5G card */}
      {a.tag==='5G'&&(
        <div style={{position:'absolute',top:'28%',left:'50%',transform:'translate(-50%,-50%)',fontSize:24,fontWeight:900,color:'rgba(147,197,253,.35)',fontFamily:'Syne,sans-serif',letterSpacing:-1}}>5G</div>
      )}
      {/* 6G glow for 6G card */}
      {a.tag==='6G + AI'&&(
        <div style={{position:'absolute',top:'35%',left:'55%',transform:'translate(-50%,-50%)',fontSize:20,fontWeight:900,color:'rgba(196,181,253,.3)',fontFamily:'Syne,sans-serif',letterSpacing:-1}}>6G</div>
      )}
      {/* Category tag */}
      <span style={{position:'absolute',top:10,left:10,fontSize:9.5,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'3px 9px',borderRadius:5,color:a.tagC,background:a.tagBg,border:`1px solid ${a.tagBdr}`,fontFamily:'JetBrains Mono,monospace'}}>{a.tag}</span>
      {/* Bookmark */}
      <button style={{position:'absolute',top:9,right:9,background:'rgba(0,0,0,.45)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(255,255,255,.45)'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
    </div>
  )
}

export default function HomePage(){
  return(
    <div className="page-root" style={{position:'relative'}}>
      <Header/>
      <div style={{position:'relative',zIndex:1}}>
        {/* PAGE COLUMNS */}
        <div style={{maxWidth:1440,margin:'0 auto',padding:'0 16px',display:'grid',gridTemplateColumns:'1fr',gap:14}} className="page-cols">
          <style>{`@media(min-width:1200px){.page-cols{grid-template-columns:1fr 330px!important}}`}</style>

          {/* ── LEFT MAIN ── */}
          <main style={{display:'flex',flexDirection:'column',gap:14,paddingTop:14,minWidth:0}}>

            {/* HERO CARD */}
            <div style={{background:'rgba(11,13,30,.85)',border:'1px solid rgba(99,102,241,.14)',borderRadius:18,overflow:'hidden',backdropFilter:'blur(12px)'}}>
              <div style={{padding:'32px 32px 28px',display:'grid',gridTemplateColumns:'1fr',gap:0,alignItems:'center'}} className="hero-g">
                <style>{`@media(min-width:768px){.hero-g{grid-template-columns:1fr 1fr!important;gap:0}}`}</style>

                {/* Left */}
                <div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:7,background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.22)',borderRadius:20,padding:'4px 13px',marginBottom:22}}>
                    <span style={{width:6,height:6,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 8px #10B981',flexShrink:0}}/>
                    <span style={{fontSize:11,fontFamily:'JetBrains Mono,monospace',color:'#A78BFA',letterSpacing:'.06em',textTransform:'uppercase'}}>Telecom Intelligence Platform</span>
                  </div>
                  <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:900,fontSize:'clamp(30px,4vw,50px)',lineHeight:1.06,letterSpacing:'-1.5px',color:'#fff',marginBottom:16}}>
                    Tomorrow&apos;s Telecom<br/>
                    <span className="gt-purple">Explained Today</span>
                  </h1>
                  <p style={{fontSize:14,fontWeight:300,color:'#64748B',lineHeight:1.75,maxWidth:400,marginBottom:26}}>
                    AI-powered tools and expert insights for building the next generation of connected intelligence.
                  </p>
                  <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:28}}>
                    <a href="#" style={{display:'inline-flex',alignItems:'center',gap:7,background:'#3B82F6',color:'#fff',fontWeight:600,fontSize:13.5,padding:'11px 22px',borderRadius:10,textDecoration:'none',boxShadow:'0 4px 18px rgba(59,130,246,.4)'}}>
                      Explore 6G + AI
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#" style={{display:'inline-flex',alignItems:'center',background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.13)',color:'#CBD5E1',fontWeight:500,fontSize:13.5,padding:'11px 22px',borderRadius:10,textDecoration:'none'}}>
                      Browse All Articles
                    </a>
                  </div>
                  <div style={{display:'flex',gap:22,flexWrap:'wrap',paddingTop:20,borderTop:'1px solid rgba(99,102,241,.1)'}}>
                    {STATS.map(s=>(
                      <div key={s.lbl}>
                        <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:20,color:'#3B82F6',lineHeight:1}}>{s.val}</div>
                        <div style={{fontSize:11,color:'#475569',marginTop:4}}>{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: 6G Visual */}
                <div className="hero-vis">
                  <style>{`.hero-vis{display:none}@media(min-width:768px){.hero-vis{display:block!important}}`}</style>
                  <HeroVisual/>
                </div>
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div style={{display:'grid',gridTemplateColumns:'1fr',gap:14}} className="btm-g">
              <style>{`@media(min-width:860px){.btm-g{grid-template-columns:1fr 285px!important}}`}</style>

              {/* LATEST INSIGHTS */}
              <section id="latest">
                <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#F1F5F9',marginBottom:12,letterSpacing:'-.2px'}}>Latest Insights</h2>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))',gap:11}}>
                  {ARTICLES.map((a,i)=>(
                    <div key={i} style={{background:'rgba(11,13,30,.9)',border:'1px solid rgba(99,102,241,.12)',borderRadius:13,overflow:'hidden',display:'flex',flexDirection:'column',cursor:'pointer',transition:'all .2s'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.cssText+='border-color:rgba(99,102,241,.3);transform:translateY(-2px)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.12)';(e.currentTarget as HTMLElement).style.transform='none'}}>
                      <ArticleImg a={a}/>
                      <div style={{padding:'12px 13px 13px',flex:1,display:'flex',flexDirection:'column'}}>
                        <h3 style={{fontFamily:'Syne,sans-serif',fontSize:12.5,fontWeight:700,color:'#E2E8F0',lineHeight:1.4,marginBottom:6,letterSpacing:'-.15px'}}>{a.title}</h3>
                        <p style={{fontSize:11.5,color:'#4B5563',lineHeight:1.55,fontWeight:300,flex:1,marginBottom:10}}>{a.excerpt}</p>
                        <div style={{display:'flex',alignItems:'center',gap:7,paddingTop:9,borderTop:'1px solid rgba(99,102,241,.08)'}}>
                          <div style={{width:22,height:22,borderRadius:6,background:a.avC,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8.5,fontWeight:700,color:'#fff',fontFamily:'Syne,sans-serif',flexShrink:0}}>{a.av}</div>
                          <span style={{fontSize:10.5,color:'#475569',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.author}</span>
                          <span style={{fontSize:10,color:'#374151',fontFamily:'JetBrains Mono,monospace',flexShrink:0}}>{a.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* COMING SOON */}
              <section>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                  <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#F1F5F9',letterSpacing:'-.2px'}}>Coming Soon</h2>
                  <a href="#" style={{fontSize:12,color:'#6366F1',textDecoration:'none',display:'flex',alignItems:'center',gap:3}}>
                    View roadmap
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                  </a>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:9}}>
                  {COMING.map((c,i)=>(
                    <div key={i} style={{background:'rgba(11,13,30,.9)',border:'1px solid rgba(99,102,241,.12)',borderRadius:12,padding:'13px 14px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all .2s'}}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.28)'}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.12)'}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:13,color:'#E2E8F0',marginBottom:3,letterSpacing:'-.15px'}}>{c.title.replace('\n',' ')}</div>
                        <div style={{fontSize:11.5,color:'#4B5563',fontWeight:300}}>{c.sub}</div>
                        {c.badge&&<span style={{display:'inline-block',marginTop:6,fontSize:9,fontFamily:'JetBrains Mono,monospace',fontWeight:600,color:c.badgeC,background:c.badgeBg,border:`1px solid ${c.badgeBdr}`,padding:'2px 8px',borderRadius:4}}>{c.badge}</span>}
                      </div>
                      <div style={{width:46,height:46,borderRadius:10,background:c.imgC,border:'1px solid rgba(99,102,241,.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{c.icon}</div>
                    </div>
                  ))}
                  <div style={{background:'rgba(11,13,30,.9)',border:'1px solid rgba(99,102,241,.12)',borderRadius:12,padding:'13px 14px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',transition:'all .2s'}}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.28)'}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.12)'}>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:13,color:'#E2E8F0',marginBottom:2}}>More Modules</div>
                      <div style={{fontSize:11.5,color:'#4B5563',fontWeight:300}}>Stay tuned for more updates</div>
                    </div>
                    <div style={{width:34,height:34,borderRadius:8,background:'rgba(99,102,241,.08)',border:'1px solid rgba(99,102,241,.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'#64748B',fontSize:16}}>···</div>
                  </div>
                </div>
              </section>
            </div>

            {/* EXPLORE BY DOMAIN */}
            <section id="tools" style={{paddingBottom:16}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:16,color:'#F1F5F9',marginBottom:12,letterSpacing:'-.2px'}}>Explore by Domain</h2>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {DOMAINS.map((d,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,background:'rgba(11,13,30,.9)',border:'1px solid rgba(99,102,241,.12)',borderRadius:11,padding:'10px 15px',cursor:'pointer',transition:'all .2s',flex:'1 1 138px'}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${d.c}55`;(e.currentTarget as HTMLElement).style.background='rgba(99,102,241,.07)'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(99,102,241,.12)';(e.currentTarget as HTMLElement).style.background='rgba(11,13,30,.9)'}}>
                    <div style={{width:34,height:34,borderRadius:9,background:`${d.c}18`,border:`1px solid ${d.c}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,flexShrink:0}}>{d.icon}</div>
                    <div style={{fontSize:12,fontWeight:500,color:'#94A3B8',lineHeight:1.38}}>
                      {d.label.map((l,li)=><div key={li}>{l}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

          {/* ── RIGHT: SPECTRUMIA SIDEBAR ── */}
          <aside style={{paddingTop:14}} className="ai-side">
            <style>{`.ai-side{display:none}@media(min-width:1200px){.ai-side{display:block!important;position:sticky;top:70px}}`}</style>
            <SpectrumPanel/>
          </aside>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
