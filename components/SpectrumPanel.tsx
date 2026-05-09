'use client'
import {useState,useRef,useEffect} from 'react'

const SYS=`You are SpectrumAI — the AI assistant for NextGNow.in. You are a wireless communications expert with deep 3GPP knowledge (Release 15–19, IMT-2030). Always cite TS/TR numbers. Be concise, spec-grounded, and helpful.`
const QUICK=[
  {icon:'⚡',text:'Explain 6G Vision in simple terms'},
  {icon:'📋',text:"What's new in 3GPP Rel-18?"},
  {icon:'📈',text:'Analyze this log excerpt'},
]
const CHIPS=['6G Architecture','AI/ML in RAN','Massive MIMO','TS 38,300','Network Slicing']

type Msg={role:'user'|'assistant';text:string}
function fmt(t:string){
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#E2EEFF">$1</strong>')
    .replace(/`([^`]+)`/g,'<code style="background:rgba(99,102,241,.15);color:#A5B4FC;padding:1px 5px;border-radius:4px;font-size:.83em">$1</code>')
    .replace(/\n/g,'<br/>')
}

export default function SpectrumPanel(){
  const [msgs,setMsgs]=useState<Msg[]>([])
  const [inp,setInp]=useState('')
  const [busy,setBusy]=useState(false)
  const endRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'})},[msgs])

  async function send(text?:string){
    const q=(text||inp).trim(); if(!q||busy)return
    setInp(''); setBusy(true)
    const next:Msg[]=[...msgs,{role:'user',text:q}]; setMsgs(next)
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:800,system:SYS,
          messages:next.map(m=>({role:m.role,content:m.text}))})
      })
      const d=await r.json()
      if(d.error)throw new Error(d.error.message)
      setMsgs(p=>[...p,{role:'assistant',text:d.content[0].text}])
    }catch{
      setMsgs(p=>[...p,{role:'assistant',text:'⚠️ Error. Please try again.'}])
    }
    setBusy(false)
  }

  return(
    <div style={{
      background:'rgba(10,12,28,.95)',
      border:'1px solid rgba(99,102,241,.18)',
      borderRadius:16,
      display:'flex',flexDirection:'column',
      height:'100%',minHeight:560,
      overflow:'hidden',
    }}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'13px 14px',borderBottom:'1px solid rgba(99,102,241,.12)',flexShrink:0}}>
        <div style={{width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#4F46E5,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>🤖</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13.5,fontWeight:700,color:'#fff',fontFamily:'Syne,sans-serif',letterSpacing:'-.2px'}}>SpectrumAI Assistant</div>
          <div style={{display:'flex',alignItems:'center',gap:5,marginTop:2}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 6px #10B981'}}/>
            <span style={{fontSize:11,color:'#10B981'}}>Online</span>
          </div>
        </div>
        <button style={{background:'none',border:'none',color:'#475569',cursor:'pointer',fontSize:17,padding:4}}>···</button>
        <button style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:7,width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#64748B',fontSize:14,lineHeight:1}}>×</button>
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:'auto',padding:'12px 12px 6px',display:'flex',flexDirection:'column',gap:10}}>
        {/* Welcome bubble */}
        {msgs.length===0&&(
          <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
            <div style={{width:26,height:26,borderRadius:7,background:'linear-gradient(135deg,#4F46E5,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>🤖</div>
            <div style={{background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.16)',borderRadius:'10px 10px 10px 3px',padding:'10px 13px',fontSize:13,color:'#C8D6F0',lineHeight:1.6,maxWidth:'84%'}}>
              Hello! I&apos;m SpectrumAI, your telecom engineering assistant. How can I help you today?
            </div>
          </div>
        )}

        {msgs.map((m,i)=>(
          <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start',flexDirection:m.role==='user'?'row-reverse':'row'}}>
            <div style={{width:24,height:24,borderRadius:6,background:m.role==='user'?'rgba(59,130,246,.25)':'linear-gradient(135deg,#4F46E5,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,flexShrink:0}}>
              {m.role==='user'?'👤':'🤖'}
            </div>
            <div style={{
              background:m.role==='user'?'rgba(59,130,246,.15)':'rgba(99,102,241,.1)',
              border:m.role==='user'?'1px solid rgba(59,130,246,.22)':'1px solid rgba(99,102,241,.16)',
              borderRadius:m.role==='user'?'10px 10px 3px 10px':'10px 10px 10px 3px',
              padding:'9px 12px',fontSize:13,color:'#C8D6F0',lineHeight:1.6,maxWidth:'84%',
            }} dangerouslySetInnerHTML={{__html:fmt(m.text)}}/>
          </div>
        ))}

        {busy&&(
          <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
            <div style={{width:24,height:24,borderRadius:6,background:'linear-gradient(135deg,#4F46E5,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,flexShrink:0}}>🤖</div>
            <div style={{background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.16)',borderRadius:'10px 10px 10px 3px',padding:'12px 14px',display:'flex',gap:4,alignItems:'center'}}>
              {[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:'50%',background:'#818CF8',display:'block',animation:'dotPop 1.4s ease-in-out infinite',animationDelay:`${i*.2}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Quick prompts */}
      {msgs.length===0&&(
        <div style={{padding:'4px 12px 10px',display:'flex',flexDirection:'column',gap:5}}>
          {QUICK.map(q=>(
            <button key={q.text} onClick={()=>send(q.text)} style={{
              display:'flex',alignItems:'center',gap:8,
              background:'rgba(99,102,241,.07)',border:'1px solid rgba(99,102,241,.16)',
              borderRadius:9,padding:'8px 12px',cursor:'pointer',textAlign:'left',
              color:'#A5B4FC',fontSize:12.5,transition:'all .15s',
            }}>
              <span style={{fontSize:13}}>{q.icon}</span>{q.text}
            </button>
          ))}
        </div>
      )}

      {/* Topic chips */}
      {msgs.length===0&&(
        <div style={{padding:'0 12px 10px'}}>
          <div style={{fontSize:11,color:'#3D4A6B',marginBottom:6,fontFamily:'JetBrains Mono,monospace',letterSpacing:'.03em'}}>Try asking about:</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
            {CHIPS.map(c=>(
              <button key={c} onClick={()=>send(c)} style={{
                background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.09)',
                borderRadius:16,padding:'4px 10px',fontSize:11.5,color:'#64748B',cursor:'pointer',
                transition:'all .15s',
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{padding:'10px 12px 13px',borderTop:'1px solid rgba(99,102,241,.1)',flexShrink:0}}>
        <div style={{display:'flex',gap:8,alignItems:'flex-end',background:'rgba(255,255,255,.04)',border:'1px solid rgba(99,102,241,.16)',borderRadius:11,padding:'8px 10px'}}>
          <input value={inp} onChange={e=>setInp(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}
            placeholder="Ask SpectrumAI…" disabled={busy}
            style={{flex:1,background:'none',border:'none',outline:'none',color:'#E2EEFF',fontSize:13,lineHeight:1.4}}/>
          <button onClick={()=>send()} disabled={busy||!inp.trim()} style={{
            width:30,height:30,borderRadius:8,flexShrink:0,
            background:'linear-gradient(135deg,#4F46E5,#6366F1)',
            border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
            opacity:busy||!inp.trim()?.4:1,transition:'opacity .15s',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <p style={{fontSize:10.5,color:'#2A3550',textAlign:'center',marginTop:7}}>SpectrumAI can make mistakes. Verify important information.</p>
      </div>
    </div>
  )
}
