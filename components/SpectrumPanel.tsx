'use client'
import {useState,useRef,useEffect} from 'react'

const SYS=`You are SpectrumAI — the AI assistant for NextGNow.in, an elite 5G NR and 6G knowledge platform. You are a wireless communications expert with 15+ years experience and deep 3GPP knowledge (Release 15–19, IMT-2030). Always cite TS/TR numbers. Three layers: analogy → technical → spec-level. Flag [STANDARDIZED] | [UNDER STUDY] | [VENDOR-SPECIFIC]. Never confuse gNB/eNB, NR/LTE, 5GC/EPC.`

const QUICK = [
  {icon:'⚡',text:'Explain 6G Vision in simple terms'},
  {icon:'📋',text:"What's new in 3GPP Rel-19?"},
  {icon:'📊',text:'Analyze a log excerpt'},
]
const CHIPS = ['6G Architecture','AI/ML in RAN','Massive MIMO','TS 38,300','Network Slicing']

type Msg={role:'user'|'assistant';text:string}

function fmt(t:string){
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#E2EEFF">$1</strong>')
    .replace(/`([^`]+)`/g,'<code style="background:rgba(6,182,212,.12);color:#67E8F9;padding:1px 6px;border-radius:4px;font-size:.84em">$1</code>')
    .replace(/\n/g,'<br/>')
}

export default function SpectrumPanel(){
  const [msgs,setMsgs]=useState<Msg[]>([])
  const [inp,setInp]=useState('')
  const [busy,setBusy]=useState(false)
  const endRef=useRef<HTMLDivElement>(null)

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])

  async function send(text?:string){
    const q=(text||inp).trim()
    if(!q||busy)return
    setInp('');setBusy(true)
    const next:Msg[]=[...msgs,{role:'user',text:q}]
    setMsgs(next)
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:900,system:SYS,
          messages:next.map(m=>({role:m.role,content:m.text}))})
      })
      const d=await r.json()
      if(d.error)throw new Error(d.error.message)
      setMsgs(p=>[...p,{role:'assistant',text:d.content[0].text}])
    }catch{
      setMsgs(p=>[...p,{role:'assistant',text:'⚠️ Connection error. Please try again.'}])
    }
    setBusy(false)
  }

  return(
    <div className="spectrum-panel" style={{height:'100%',minHeight:560}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 16px',borderBottom:'1px solid rgba(99,102,241,.12)',flexShrink:0}}>
        <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>
          🤖
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:700,color:'#fff',fontFamily:'Syne,sans-serif',letterSpacing:'-.2px'}}>SpectrumAI Assistant</div>
          <div style={{display:'flex',alignItems:'center',gap:5,marginTop:2}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 6px #10B981'}}/>
            <span style={{fontSize:11,color:'#10B981'}}>Online</span>
          </div>
        </div>
        <button style={{background:'none',border:'none',color:'#475569',cursor:'pointer',fontSize:18,lineHeight:1,padding:4}}>⋯</button>
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'14px 14px 8px',display:'flex',flexDirection:'column',gap:10}}>
        {/* Welcome */}
        {msgs.length===0&&(
          <div style={{display:'flex',alignItems:'flex-start',gap:8}}>
            <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>🤖</div>
            <div className="bubble-ai">
              Hello! I&apos;m SpectrumAI, your telecom engineering assistant. How can I help you today?
            </div>
          </div>
        )}

        {/* Chat messages */}
        {msgs.map((m,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,flexDirection:m.role==='user'?'row-reverse':'row'}}>
            <div style={{width:26,height:26,borderRadius:7,background:m.role==='user'?'rgba(59,130,246,.25)':'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,flexShrink:0}}>
              {m.role==='user'?'👤':'🤖'}
            </div>
            <div className={m.role==='user'?'bubble-user':'bubble-ai'} style={{maxWidth:'82%'}}
              dangerouslySetInnerHTML={{__html:fmt(m.text)}}/>
          </div>
        ))}

        {busy&&(
          <div style={{display:'flex',alignItems:'flex-start',gap:8}}>
            <div style={{width:26,height:26,borderRadius:7,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11}}>🤖</div>
            <div className="bubble-ai" style={{display:'flex',gap:4,alignItems:'center'}}>
              {[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:'50%',background:'#818CF8',display:'block',animation:'dotPop 1.4s ease-in-out infinite',animationDelay:`${i*.2}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Quick prompts (only when no messages) */}
      {msgs.length===0&&(
        <div style={{padding:'4px 14px 12px',display:'flex',flexDirection:'column',gap:6}}>
          {QUICK.map(q=>(
            <button key={q.text} onClick={()=>send(q.text)} style={{
              display:'flex',alignItems:'center',gap:8,
              background:'rgba(99,102,241,.08)',border:'1px solid rgba(99,102,241,.18)',
              borderRadius:9,padding:'9px 12px',cursor:'pointer',textAlign:'left',
              color:'#C4B5FD',fontSize:12.5,transition:'all .15s',
            }}>
              <span style={{fontSize:14}}>{q.icon}</span>{q.text}
            </button>
          ))}
        </div>
      )}

      {/* Chips */}
      {msgs.length===0&&(
        <div style={{padding:'0 14px 12px'}}>
          <div style={{fontSize:11,color:'#475569',marginBottom:7,fontFamily:'JetBrains Mono,monospace',letterSpacing:'.04em'}}>Try asking about:</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
            {CHIPS.map(c=>(
              <button key={c} className="chip" onClick={()=>send(c)} style={{fontSize:11}}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{padding:'10px 12px 14px',borderTop:'1px solid rgba(99,102,241,.1)',flexShrink:0}}>
        <div style={{display:'flex',gap:8,alignItems:'flex-end',background:'rgba(255,255,255,.04)',border:'1px solid rgba(99,102,241,.18)',borderRadius:11,padding:'8px 10px',transition:'border-color .15s'}}>
          <input value={inp} onChange={e=>setInp(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
            placeholder="Ask SpectrumAI…"
            disabled={busy}
            style={{flex:1,background:'none',border:'none',outline:'none',color:'#E2EEFF',fontSize:13,lineHeight:1.5,resize:'none'}}/>
          <button onClick={()=>send()} disabled={busy||!inp.trim()} style={{
            width:30,height:30,borderRadius:8,flexShrink:0,
            background:'linear-gradient(135deg,#3B82F6,#6366F1)',
            border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
            opacity:busy||!inp.trim()?.0:1,transition:'opacity .15s',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <p style={{fontSize:10.5,color:'#334155',textAlign:'center',marginTop:7,fontFamily:'DM Sans,sans-serif'}}>
          SpectrumAI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}
