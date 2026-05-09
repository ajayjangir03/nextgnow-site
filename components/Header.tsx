'use client'
import {useState,useEffect} from 'react'
import Link from 'next/link'

const NAV=[
  {label:'6G + AI',href:'#'},
  {label:'5G',href:'#'},
  {label:'Log Analysis',href:'#'},
  {label:'3GPP Releases',href:'#'},
  {label:'Latest Articles',href:'#latest'},
  {label:'Tools',href:'#tools'},
  {label:'About',href:'#about'},
]

export default function Header(){
  const [scrolled,setScrolled]=useState(false)
  const [mob,setMob]=useState(false)
  const [srch,setSrch]=useState(false)
  const [active,setActive]=useState('6G + AI')

  useEffect(()=>{
    const s=()=>setScrolled(window.scrollY>8)
    window.addEventListener('scroll',s)
    const k=(e:KeyboardEvent)=>{
      if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();setSrch(true)}
      if(e.key==='Escape'){setSrch(false);setMob(false)}
    }
    window.addEventListener('keydown',k)
    return()=>{window.removeEventListener('scroll',s);window.removeEventListener('keydown',k)}
  },[])

  return(
    <>
    <header style={{
      position:'sticky',top:0,zIndex:100,
      background:scrolled?'rgba(9,9,31,.97)':'rgba(9,9,31,.85)',
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(99,102,241,.14)',
      transition:'background .2s',
    }}>
      <div style={{maxWidth:1440,margin:'0 auto',padding:'0 20px',height:58,display:'flex',alignItems:'center',gap:20}}>

        {/* LOGO */}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0}}>
          <div style={{
            width:36,height:36,borderRadius:9,flexShrink:0,
            background:'linear-gradient(135deg,#3B82F6 0%,#6366F1 50%,#8B5CF6 100%)',
            display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:'0 0 18px rgba(99,102,241,.45)',
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3 16V4L17 16V4" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:16,color:'#fff',lineHeight:1.15,letterSpacing:'-.3px'}}>
              NextG<span style={{color:'#818CF8'}}>Now</span>
            </div>
            <div style={{fontSize:9,color:'#3D4A6B',letterSpacing:'.02em',marginTop:1}}>Engineering the Future. Together.</div>
          </div>
        </Link>

        {/* DESKTOP NAV — centered */}
        <nav style={{flex:1,display:'flex',justifyContent:'center',gap:2}} className="hide-lg">
          {NAV.map(n=>(
            <a key={n.label} href={n.href} onClick={()=>setActive(n.label)} style={{
              fontSize:13,fontWeight:500,padding:'6px 11px',
              color:active===n.label?'#fff':'#64748B',
              borderBottom:active===n.label?'2px solid #3B82F6':'2px solid transparent',
              textDecoration:'none',transition:'all .15s',whiteSpace:'nowrap',cursor:'pointer',
            }}>
              {n.label}
            </a>
          ))}
        </nav>
        <style>{`.hide-lg{display:none!important}@media(min-width:1080px){.hide-lg{display:flex!important}}`}</style>

        {/* RIGHT ACTIONS */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginLeft:'auto',flexShrink:0}}>
          {/* Search field */}
          <button onClick={()=>setSrch(true)} style={{
            display:'flex',alignItems:'center',gap:8,
            background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',
            borderRadius:9,padding:'6px 14px',cursor:'pointer',color:'#3D4A6B',
            fontSize:12,transition:'all .15s',
          }} className="hide-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search NextGNow...
          </button>
          {/* Bell */}
          <button style={{width:32,height:32,borderRadius:8,border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.04)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#64748B'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          {/* Bookmark */}
          <button style={{width:32,height:32,borderRadius:8,border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.04)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#64748B'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
          {/* Avatar */}
          <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:9,padding:'4px 10px 4px 5px',cursor:'pointer'}}>
            <div style={{width:26,height:26,borderRadius:7,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:800,color:'#fff',fontFamily:'Syne,sans-serif'}}>SG</div>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          {/* Hamburger */}
          <button onClick={()=>setMob(true)} style={{width:32,height:32,borderRadius:8,border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.04)',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:5,cursor:'pointer',color:'#64748B'}} className="mob-ham">
            <span style={{display:'block',width:15,height:1.5,background:'#94A3B8',borderRadius:2}}/>
            <span style={{display:'block',width:15,height:1.5,background:'#94A3B8',borderRadius:2}}/>
            <span style={{display:'block',width:10,height:1.5,background:'#64748B',borderRadius:2}}/>
          </button>
          <style>{`.mob-ham{display:none!important}@media(max-width:1079px){.mob-ham{display:flex!important}}`}</style>
        </div>
      </div>
    </header>

    {/* MOBILE NAV */}
    {mob&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:498,backdropFilter:'blur(4px)'}} onClick={()=>setMob(false)}/>}
    <div style={{position:'fixed',top:0,right:0,bottom:0,width:280,zIndex:499,background:'#0D0F22',borderLeft:'1px solid rgba(99,102,241,.2)',transform:mob?'translateX(0)':'translateX(100%)',transition:'transform .3s cubic-bezier(.16,1,.3,1)',display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:'1px solid rgba(99,102,241,.12)'}}>
        <span style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:16,color:'#fff'}}>NextG<span style={{color:'#818CF8'}}>Now</span></span>
        <button onClick={()=>setMob(false)} style={{background:'none',border:'none',color:'#64748B',cursor:'pointer',fontSize:20,lineHeight:1}}>×</button>
      </div>
      <nav style={{flex:1,padding:'12px',display:'flex',flexDirection:'column',gap:2}}>
        {NAV.map(n=>(
          <a key={n.label} href={n.href} onClick={()=>{setActive(n.label);setMob(false)}} style={{display:'block',fontSize:14,fontWeight:500,color:active===n.label?'#fff':'#94A3B8',padding:'10px 12px',borderRadius:9,textDecoration:'none',background:active===n.label?'rgba(99,102,241,.12)':'transparent'}}>
            {n.label}
          </a>
        ))}
      </nav>
    </div>

    {/* SEARCH */}
    {srch&&(
      <div style={{position:'fixed',inset:0,background:'rgba(9,9,31,.92)',backdropFilter:'blur(16px)',zIndex:999,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh',padding:'15vh 20px 20px'}} onClick={e=>e.target===e.currentTarget&&setSrch(false)}>
        <div style={{width:'100%',maxWidth:580,background:'#0D0F22',border:'1px solid rgba(99,102,241,.25)',borderRadius:16,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,.8)'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',borderBottom:'1px solid rgba(99,102,241,.1)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input autoFocus placeholder="Search articles, specs, tools…" style={{flex:1,background:'none',border:'none',color:'#fff',fontSize:15,outline:'none'}} readOnly/>
            <button onClick={()=>setSrch(false)} style={{fontFamily:'JetBrains Mono,monospace',fontSize:10,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'#64748B',padding:'3px 8px',borderRadius:5,cursor:'pointer'}}>ESC</button>
          </div>
          <p style={{padding:'20px',fontSize:13,color:'#475569',textAlign:'center'}}>Search will be available once content is live.</p>
        </div>
      </div>
    )}
    </>
  )
}
