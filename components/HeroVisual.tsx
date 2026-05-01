'use client'

/* 6G holographic sphere — matching Image 1 aesthetic */
const LABELS = [
  {text:'AI Native',        angle:0,   r:130, color:'#A78BFA'},
  {text:'Terahertz\nSpectrum', angle:60,  r:125, color:'#60A5FA'},
  {text:'Ultra Low\nLatency',  angle:120, r:128, color:'#34D399'},
  {text:'Integrated\nSensing', angle:180, r:130, color:'#F472B6'},
  {text:'Sustainable\nNetworks',angle:240,r:125, color:'#FB923C'},
]

export default function HeroVisual(){
  return(
    <div style={{position:'relative',width:'100%',maxWidth:440,aspectRatio:'1/1',margin:'0 auto',userSelect:'none'}}>
      {/* Outer glow */}
      <div style={{position:'absolute',inset:-40,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%)',pointerEvents:'none'}}/>

      <svg viewBox="0 0 400 400" style={{width:'100%',height:'100%',overflow:'visible'}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g6g" cx="50%" cy="40%" r="55%">
            <stop offset="0%"  stopColor="#A78BFA" stopOpacity=".9"/>
            <stop offset="40%" stopColor="#3B82F6" stopOpacity=".8"/>
            <stop offset="100%"stopColor="#06B6D4" stopOpacity=".3"/>
          </radialGradient>
          <radialGradient id="gcore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#fff" stopOpacity=".15"/>
            <stop offset="100%"stopColor="#A78BFA" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="gfloor" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#3B82F6" stopOpacity=".6"/>
            <stop offset="100%"stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Orbit rings */}
        {[90,118,148].map((r,i)=>(
          <ellipse key={r} cx="200" cy="200" rx={r} ry={r*.38}
            fill="none" stroke="rgba(99,102,241,.18)" strokeWidth="1"
            style={{animation:`orbit${i%2===0?'1':'2'} ${16+i*4}s linear infinite`,transformOrigin:'200px 200px'}}/>
        ))}
        <style>{`
          @keyframes orbit1{from{transform:rotate(-20deg)}to{transform:rotate(340deg)}}
          @keyframes orbit2{from{transform:rotate(20deg)}to{transform:rotate(-340deg)}}
          @keyframes floatNum{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
          @keyframes ringPulse{0%,100%{opacity:.3}50%{opacity:.7}}
        `}</style>

        {/* Outer sphere circle */}
        <circle cx="200" cy="200" r="92" fill="url(#g6g)" opacity=".18"
          style={{animation:'ringPulse 4s ease-in-out infinite'}}/>
        <circle cx="200" cy="200" r="92" fill="none" stroke="rgba(139,92,246,.35)" strokeWidth="1.5"/>

        {/* Inner glow */}
        <circle cx="200" cy="200" r="62" fill="url(#gcore)"/>

        {/* 6G text */}
        <text x="200" y="215" textAnchor="middle" fontSize="58" fontFamily="Syne,sans-serif"
          fontWeight="800" fill="url(#g6g)" filter="url(#glow)"
          style={{animation:'floatNum 4s ease-in-out infinite'}}>
          6G
        </text>

        {/* Base glow floor */}
        <ellipse cx="200" cy="300" rx="80" ry="18" fill="url(#gfloor)" opacity=".5"/>

        {/* Vertical pillar beam */}
        <line x1="200" y1="295" x2="200" y2="360" stroke="url(#g6g)" strokeWidth="1.5" opacity=".4"/>
        <ellipse cx="200" cy="360" rx="40" ry="8" fill="none" stroke="rgba(59,130,246,.3)" strokeWidth="1"/>

        {/* Tech dots on orbit */}
        {LABELS.map((l,i)=>{
          const rad = l.angle*Math.PI/180
          const cx  = 200 + l.r*Math.cos(rad)
          const cy  = 200 + (l.r*.38)*Math.sin(rad)
          return(
            <g key={i}>
              <circle cx={cx} cy={cy} r="5" fill={l.color} opacity=".85" filter="url(#glow)"/>
              <circle cx={cx} cy={cy} r="9" fill={l.color} opacity=".15"/>
              <line x1="200" y1="200" x2={cx} y2={cy} stroke={l.color} strokeWidth=".6" opacity=".2" strokeDasharray="3 4"/>
              {l.text.split('\n').map((line,li)=>(
                <text key={li} x={cx+(cx>200?16:-16)} y={cy-8+(li*14)}
                  fontSize="10" fontFamily="DM Sans,sans-serif" fontWeight="600"
                  fill={l.color} opacity=".9"
                  textAnchor={cx>200?'start':'end'}>
                  {line}
                </text>
              ))}
            </g>
          )
        })}

        {/* Connection ring nodes */}
        {[45,135,225,315].map((a,i)=>{
          const r2=i%2===0?105:80
          const rx=200+r2*Math.cos(a*Math.PI/180)
          const ry=200+r2*.4*Math.sin(a*Math.PI/180)
          return<circle key={a} cx={rx} cy={ry} r="3" fill="rgba(99,102,241,.6)"/>
        })}
      </svg>
    </div>
  )
}
