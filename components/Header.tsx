'use client'
import {useState,useEffect} from 'react'
import Link from 'next/link'

const NAV = [
  {label:'6G + AI',         href:'#',         icon:'🛰️'},
  {label:'5G',              href:'#',         icon:'📡'},
  {label:'Log Analysis',    href:'#tools',    icon:'📊'},
  {label:'3GPP Releases',   href:'#',         icon:'📋'},
  {label:'Latest Articles', href:'#articles', icon:'📰'},
  {label:'Tools',           href:'#tools',    icon:'🔧'},
  {label:'About',           href:'#about',    icon:'ℹ️'},
]

export default function Header({active='6G + AI'}:{active?:string}){
  const [scrolled,setScrolled]=useState(false)
  const [mob,setMob]=useState(false)
  const [srch,setSrch]=useState(false)

  useEffect(()=>{
    const s=()=>setScrolled(window.scrollY>6)
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
    {/* ── HEADER ── */}
    <header style={{
      position:'sticky',top:0,zIndex:50,
      background:scrolled?'rgba(8,11,20,.96)':'rgba(8,11,20,.82)',
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(99,102,241,.12)',
      transition:'all .2s',
    }}>
      <div style={{maxWidth:1440,margin:'0 auto',padding:'0 24px',height:62,display:'flex',alignItems:'center',gap:24}}>

        {/* Logo */}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0}}>
          {/* N icon — matching Image 1 */}
          <div style={{
            width:36,height:36,borderRadius:10,
            background:'linear-gradient(135deg,#3B82F6,#6366F1,#8B5CF6)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
            boxShadow:'0 0 20px rgba(99,102,241,.4)',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 16V4l14 12V4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:16,color:'#fff',lineHeight:1.1,letterSpacing:'-.3px'}}>
              NextG<span style={{color:'#818CF8'}}>Now</span>
            </div>
            <div style={{fontSize:10,color:'#4B5563',fontFamily:'DM Sans,sans-serif',letterSpacing:'.02em',marginTop:1}}>
              Engineering the Future. Together.
            </div>
          </div>
        </Link>

        {/* Desktop Nav — centered */}
        <nav style={{flex:1,display:'flex',justifyContent:'center',gap:4}} className="hide-mob">
          {NAV.map(item=>(
            <a key={item.label} href={item.href} style={{
              display:'flex',alignItems:'center',gap:5,
              fontSize:13.5,fontWeight:500,padding:'7px 12px',borderRadius:8,
              color:item.label===active?'#fff':'#94A3B8',
              background:item.label===active?'rgba(99,102,241,.12)':'transparent',
              textDecoration:'none',transition:'all .15s',position:'relative',
              borderBottom:item.label===active?'2px solid #818CF8':'2px solid transparent',
              whiteSpace:'nowrap',
            }}>
              {item.label}
            </a>
          ))}
          <style>{`.hide-mob{display:none} @media(min-width:1080px){.hide-mob{display:flex!important}}`}</style>
        </nav>

        {/* Right actions */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginLeft:'auto',flexShrink:0}}>
          {/* Search */}
          <button onClick={()=>setSrch(true)} style={{
            display:'flex',alignItems:'center',gap:8,
            background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',
            color:'#64748B',padding:'7px 14px',borderRadius:9,fontSize:13,cursor:'pointer',
            transition:'all .15s',
          }} className="srch-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span>Search NextGNow...</span>
            <style>{`.srch-btn{display:none} @media(min-width:640px){.srch-btn{display:flex!important}}`}</style>
          </button>

          {/* Icons */}
          {[
            {icon:<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>, label:'Notifications'},
            {icon:<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>, label:'Bookmarks'},
          ].map(b=>(
            <button key={b.label} title={b.label} style={{
              width:34,height:34,borderRadius:9,border:'1px solid rgba(255,255,255,.08)',
              background:'rgba(255,255,255,.03)',display:'flex',alignItems:'center',justifyContent:'center',
              cursor:'pointer',color:'#64748B',transition:'all .15s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {b.icon}
              </svg>
            </button>
          ))}

          {/* User avatar */}
          <div style={{
            width:34,height:34,borderRadius:9,
            background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:12,fontWeight:700,color:'#fff',cursor:'pointer',
            fontFamily:'Syne,sans-serif',
          }}>SG</div>

          {/* Hamburger */}
          <button onClick={()=>setMob(true)} style={{
            width:34,height:34,borderRadius:9,border:'1px solid rgba(255,255,255,.08)',
            background:'rgba(255,255,255,.03)',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',gap:5,cursor:'pointer',
          }} className="ham-btn">
            <span style={{width:16,height:1.5,background:'#94A3B8',borderRadius:2,display:'block'}}/>
            <span style={{width:16,height:1.5,background:'#94A3B8',borderRadius:2,display:'block'}}/>
            <span style={{width:10,height:1.5,background:'#64748B',borderRadius:2,display:'block'}}/>
            <style>{`.ham-btn{display:flex!important} @media(min-width:1080px){.ham-btn{display:none!important}}`}</style>
          </button>
        </div>
      </div>
    </header>

    {/* ── MOBILE NAV ── */}
    {mob&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:998,backdropFilter:'blur(4px)'}} onClick={()=>setMob(false)}/>}
    <div style={{
      position:'fixed',top:0,right:0,bottom:0,width:280,zIndex:999,
      background:'#0B0F1E',borderLeft:'1px solid rgba(99,102,241,.2)',
      transform:mob?'translateX(0)':'translateX(100%)',transition:'transform .3s cubic-bezier(.16,1,.3,1)',
      display:'flex',flexDirection:'column',
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:'1px solid rgba(99,102,241,.1)'}}>
        <span style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:16,color:'#fff'}}>NextG<span style={{color:'#818CF8'}}>Now</span></span>
        <button onClick={()=>setMob(false)} style={{background:'none',border:'none',color:'#64748B',cursor:'pointer',fontSize:20}}>✕</button>
      </div>
      <nav style={{flex:1,padding:16,display:'flex',flexDirection:'column',gap:2}}>
        {NAV.map(item=>(
          <a key={item.label} href={item.href} onClick={()=>setMob(false)} style={{
            display:'flex',alignItems:'center',gap:10,fontSize:14,fontWeight:500,
            color:'#94A3B8',padding:'10px 14px',borderRadius:10,textDecoration:'none',transition:'all .15s',
          }}>
            <span style={{fontSize:16}}>{item.icon}</span>{item.label}
          </a>
        ))}
      </nav>
    </div>

    {/* ── SEARCH ── */}
    {srch&&(
      <div style={{position:'fixed',inset:0,background:'rgba(8,11,20,.92)',backdropFilter:'blur(16px)',zIndex:999,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh',padding:'15vh 20px 20px'}}
        onClick={e=>e.target===e.currentTarget&&setSrch(false)}>
        <div style={{width:'100%',maxWidth:580,background:'#0F1629',border:'1px solid rgba(99,102,241,.25)',borderRadius:16,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,.8)'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',borderBottom:'1px solid rgba(99,102,241,.1)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input autoFocus placeholder="Search articles, specs, tools…" style={{flex:1,background:'none',border:'none',color:'#fff',fontSize:15,outline:'none'}} readOnly/>
            <button onClick={()=>setSrch(false)} style={{fontFamily:'JetBrains Mono,monospace',fontSize:11,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'#64748B',padding:'3px 8px',borderRadius:5,cursor:'pointer'}}>ESC</button>
          </div>
          <p style={{padding:'20px',fontSize:13,color:'#475569',textAlign:'center'}}>Search will be available once content goes live.</p>
        </div>
      </div>
    )}
    </>
  )
}
