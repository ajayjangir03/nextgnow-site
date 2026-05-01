const SOC=[
  {href:'https://linkedin.com',d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'},
  {href:'https://x.com',d:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z'},
  {href:'https://youtube.com',d:'M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z'},
  {href:'https://github.com',d:'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z'},
]

export default function Footer(){
  return(
    <footer style={{borderTop:'1px solid rgba(99,102,241,.1)',background:'rgba(6,8,16,.9)'}}>
      <div style={{maxWidth:1440,margin:'0 auto',padding:'36px 24px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
        {/* Brand */}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:'linear-gradient(135deg,#3B82F6,#6366F1,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 16V4l14 12V4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:15,color:'#fff'}}>NextG<span style={{color:'#818CF8'}}>Now</span></div>
            <div style={{fontSize:11,color:'#475569'}}>Tomorrow&apos;s Telecom, Today</div>
          </div>
        </div>

        {/* Center links */}
        <div style={{display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
          {[{label:'About',href:'#about'},{label:'Privacy',href:'#'},{label:'Contact',href:'mailto:hello@nextgnow.in'}].map(l=>(
            <a key={l.label} href={l.href} style={{fontSize:13,color:'#64748B',textDecoration:'none',display:'flex',alignItems:'center',gap:6,transition:'color .15s'}}>
              {l.label}
            </a>
          ))}
          <span style={{fontSize:12,color:'#334155'}}>Follow us</span>
        </div>

        {/* Socials */}
        <div style={{display:'flex',gap:8}}>
          {SOC.map((s,i)=>(
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{width:34,height:34,borderRadius:9,background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.18)',display:'flex',alignItems:'center',justifyContent:'center',color:'#818CF8',transition:'all .2s',textDecoration:'none'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
            </a>
          ))}
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(99,102,241,.06)',padding:'12px 24px',textAlign:'center',fontSize:11.5,color:'#334155'}}>
        © {new Date().getFullYear()} NextGNow · nextgnow.in · All rights reserved
      </div>
    </footer>
  )
}
