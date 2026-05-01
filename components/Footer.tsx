const LINKS = {
  Topics:   ['6G + AI','5G','Log Analysis','3GPP Releases','Call Flows','Open RAN'],
  Tools:    ['SpectrumAI','Spec Decoder','Log Analyzer','Call Flow Viewer'],
  Platform: ['Latest Articles','About','Contact'],
}

const SOC = [
  { href:'https://linkedin.com', d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { href:'https://x.com',        d:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
]

export default function Footer() {
  return (
    <footer style={{borderTop:'1px solid #0F1D30', background:'#03060E'}}>
      <div style={{maxWidth:1280, margin:'0 auto', padding:'56px 32px 32px'}}>

        {/* Top grid */}
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:40, marginBottom:48}} className="footer-grid">
          <style>{`@media(min-width:768px){ .footer-grid{ grid-template-columns: 2fr 1fr 1fr 1fr !important; gap:48px !important; } }`}</style>

          {/* Brand */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:14}}>
              <div style={{width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#3B82F6,#06B6D4)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              </div>
              <span style={{fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:17, color:'#F8FAFC'}}>
                NextG<span style={{color:'#06B6D4'}}>Now</span>
              </span>
            </div>
            <p style={{fontSize:13, color:'#475569', lineHeight:1.75, fontWeight:300, maxWidth:240, margin:'0 0 20px'}}>
              Tomorrow&apos;s telecom, explained today. Deep technical knowledge for engineers and professionals.
            </p>
            <div style={{display:'flex', gap:6}}>
              {SOC.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{width:32, height:32, borderRadius:8, border:'1px solid #1C324F', background:'#080F1E', display:'flex', alignItems:'center', justifyContent:'center', color:'#475569', transition:'all .2s', textDecoration:'none'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <p style={{fontFamily:'JetBrains Mono,monospace', fontSize:10, color:'#334155', letterSpacing:'.1em', textTransform:'uppercase', margin:'0 0 16px'}}>
                {title}
              </p>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {links.map(l => (
                  <a key={l} href="#" style={{fontSize:13, color:'#64748B', textDecoration:'none', transition:'color .15s'}}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{paddingTop:24, borderTop:'1px solid #0F1D30', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12}}>
          <p style={{fontSize:12, color:'#334155', margin:0}}>
            © {new Date().getFullYear()} NextGNow · nextgnow.in · All rights reserved
          </p>
          <div style={{display:'flex', gap:20}}>
            {['Privacy Policy','Terms of Use'].map(l => (
              <a key={l} href="#" style={{fontSize:12, color:'#334155', textDecoration:'none'}}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
