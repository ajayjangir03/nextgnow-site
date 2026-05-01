const NODES = [
  { cx: 72,  cy: 50,  label: '5G NR',  color: '#3B82F6', r: 4.5, delay: '0s'   },
  { cx: 168, cy: 30,  label: '6G',     color: '#8B5CF6', r: 5,   delay: '.4s'  },
  { cx: 208, cy: 78,  label: 'O-RAN',  color: '#F59E0B', r: 4,   delay: '.8s'  },
  { cx: 50,  cy: 142, label: '3GPP',   color: '#10B981', r: 4,   delay: '1.2s' },
  { cx: 182, cy: 168, label: 'URLLC',  color: '#06B6D4', r: 3.5, delay: '1.6s' },
  { cx: 98,  cy: 192, label: 'mmWave', color: '#8B5CF6', r: 3.5, delay: '2s'   },
  { cx: 62,  cy: 90,  label: 'NTN',    color: '#EF4444', r: 3,   delay: '2.4s' },
  { cx: 148, cy: 118, label: 'ISAC',   color: '#06B6D4', r: 3,   delay: '2.8s' },
]

export default function RadarAnimation() {
  const cx = 120, cy = 120

  return (
    <div style={{ position:'relative', width:'100%', maxWidth:'420px', aspectRatio:'1/1', margin:'0 auto', userSelect:'none' }}>
      {/* Glow behind */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle at 50% 50%, rgba(59,130,246,.07) 0%, transparent 65%)',
      }}/>

      <svg viewBox="0 0 240 240" style={{width:'100%',height:'100%'}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sweepG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3B82F6" stopOpacity=".4"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="ctrG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <clipPath id="radarClip"><circle cx={cx} cy={cy} r="108"/></clipPath>
        </defs>

        {/* Axis lines */}
        {[0,45,90,135].map(a => {
          const rad = a * Math.PI / 180
          return (
            <line key={a}
              x1={cx - 108*Math.sin(rad)} y1={cy - 108*Math.cos(rad)}
              x2={cx + 108*Math.sin(rad)} y2={cy + 108*Math.cos(rad)}
              stroke="rgba(59,130,246,0.06)" strokeWidth=".8"/>
          )
        })}

        {/* Rings */}
        {[38,72,108].map((r,i) => (
          <circle key={r} cx={cx} cy={cy} r={r}
            className={`ring-p${i+1}`}
            fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
        ))}

        {/* Dashed outer */}
        <circle cx={cx} cy={cy} r="116"
          fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth=".5" strokeDasharray="3 7"/>

        {/* Sweep arm */}
        <g clipPath="url(#radarClip)">
          <g className="radar-spin" style={{transformOrigin:`${cx}px ${cy}px`}}>
            <path
              d={`M${cx},${cy} L${cx},${cy-108} A108,108 0 0,1 ${cx+108*Math.sin(Math.PI/2.5)},${cy-108*Math.cos(Math.PI/2.5)} Z`}
              fill="url(#sweepG)"/>
            <line x1={cx} y1={cy} x2={cx} y2={cy-108}
              stroke="#3B82F6" strokeWidth="1.2" opacity=".7"/>
          </g>
        </g>

        {/* Center */}
        <circle cx={cx} cy={cy} r="5"  fill="url(#ctrG)"/>
        <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1"/>

        {/* Data nodes */}
        {NODES.map((n,i) => (
          <g key={i} className="node-blink" style={{animationDelay:n.delay}}>
            <circle cx={n.cx} cy={n.cy} r={n.r+5} fill={n.color} opacity=".07"/>
            <circle cx={n.cx} cy={n.cy} r={n.r}   fill={n.color} opacity=".9"/>
            <line x1={cx} y1={cy} x2={n.cx} y2={n.cy}
              stroke={n.color} strokeWidth=".5" opacity=".15"/>
            <text
              x={n.cx + (n.cx > cx ? n.r+5 : -(n.r+5))}
              y={n.cy + 3.5}
              fontSize="6.5"
              fontFamily="JetBrains Mono,monospace"
              fill={n.color}
              opacity=".85"
              textAnchor={n.cx > cx ? 'start' : 'end'}
            >{n.label}</text>
          </g>
        ))}

        {/* Tick marks */}
        {Array.from({length:36},(_,i) => {
          const a = i*10*Math.PI/180
          const inner = i%3===0 ? 110 : 109
          const outer = i%3===0 ? 117 : 113
          return (
            <line key={i}
              x1={cx+inner*Math.sin(a)} y1={cy-inner*Math.cos(a)}
              x2={cx+outer*Math.sin(a)} y2={cy-outer*Math.cos(a)}
              stroke="rgba(59,130,246,0.22)" strokeWidth={i%3===0?'1':'.5'}/>
          )
        })}
      </svg>

      {/* Frequency labels */}
      {[
        {text:'FR1', top:'6%',    left:'50%',  tx:'-50%', ty:'0',    color:'#3B82F6'},
        {text:'FR2', top:'50%',   right:'1%',  tx:'0',    ty:'-50%', color:'#8B5CF6'},
        {text:'THz', bottom:'6%', left:'50%',  tx:'-50%', ty:'0',    color:'#06B6D4'},
        {text:'Sub6',top:'50%',   left:'1%',   tx:'0',    ty:'-50%', color:'#10B981'},
      ].map((t,i) => (
        <div key={i} style={{
          position:'absolute', top:t.top, bottom:(t as any).bottom, left:(t as any).left, right:(t as any).right,
          transform:`translate(${t.tx},${t.ty})`,
          fontFamily:'JetBrains Mono,monospace', fontSize:'9px', fontWeight:500,
          padding:'2px 7px', borderRadius:'5px', border:`1px solid ${t.color}30`,
          color:t.color, background:`${t.color}10`, letterSpacing:'.05em',
        }}>
          {t.text}
        </div>
      ))}
    </div>
  )
}
