const NODES = [
  { cx: 72,  cy: 48,  label: '5G NR',   color: '#3B82F6', r: 5   },
  { cx: 168, cy: 28,  label: '6G',       color: '#8B5CF6', r: 5.5 },
  { cx: 210, cy: 75,  label: 'O-RAN',    color: '#F59E0B', r: 4   },
  { cx: 50,  cy: 145, label: '3GPP',     color: '#10B981', r: 4   },
  { cx: 185, cy: 168, label: 'URLLC',    color: '#06B6D4', r: 4   },
  { cx: 100, cy: 190, label: 'mmWave',   color: '#8B5CF6', r: 3.5 },
  { cx: 60,  cy: 88,  label: 'NTN',      color: '#EF4444', r: 3.5 },
  { cx: 150, cy: 115, label: 'ISAC',     color: '#06B6D4', r: 3   },
]

export default function RadarAnimation() {
  const cx = 120, cy = 120, r1 = 38, r2 = 72, r3 = 108

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto select-none">
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,.08) 0%, transparent 68%)' }}
      />
      <svg viewBox="0 0 240 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sweepG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3B82F6" stopOpacity=".45"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="lineG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <clipPath id="clip">
            <circle cx={cx} cy={cy} r={r3}/>
          </clipPath>
        </defs>

        {/* Cross lines */}
        <line x1={cx} y1={cy-r3} x2={cx} y2={cy+r3} stroke="rgba(59,130,246,.08)" strokeWidth=".8"/>
        <line x1={cx-r3} y1={cy} x2={cx+r3} y2={cy} stroke="rgba(59,130,246,.08)" strokeWidth=".8"/>
        <line x1={cx-r3*.71} y1={cy-r3*.71} x2={cx+r3*.71} y2={cy+r3*.71} stroke="rgba(59,130,246,.05)" strokeWidth=".8"/>
        <line x1={cx+r3*.71} y1={cy-r3*.71} x2={cx-r3*.71} y2={cy+r3*.71} stroke="rgba(59,130,246,.05)" strokeWidth=".8"/>

        {/* Rings */}
        <circle cx={cx} cy={cy} r={r1} className="ring-p1" fill="none" stroke="rgba(59,130,246,.22)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r2} className="ring-p2" fill="none" stroke="rgba(59,130,246,.15)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r3} className="ring-p3" fill="none" stroke="rgba(59,130,246,.1)"  strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r3+7} fill="none" stroke="rgba(59,130,246,.04)" strokeWidth=".5" strokeDasharray="4 6"/>

        {/* Sweep */}
        <g clipPath="url(#clip)">
          <g className="radar-spin" style={{ transformOrigin:`${cx}px ${cy}px` }}>
            <path
              d={`M${cx},${cy} L${cx},${cy-r3} A${r3},${r3} 0 0,1 ${cx+r3*Math.sin(Math.PI/3)},${cy-r3*Math.cos(Math.PI/3)} Z`}
              fill="url(#sweepG)"
            />
            <line x1={cx} y1={cy} x2={cx} y2={cy-r3} stroke="#3B82F6" strokeWidth="1.5" opacity=".75"/>
          </g>
        </g>

        {/* Center */}
        <circle cx={cx} cy={cy} r={5}   fill="url(#lineG)"/>
        <circle cx={cx} cy={cy} r={9}   fill="none" stroke="rgba(59,130,246,.28)" strokeWidth="1"/>

        {/* Nodes */}
        {NODES.map((n, i) => (
          <g key={i} className="dot-blink" style={{ animationDelay:`${i*0.3}s` }}>
            <circle cx={n.cx} cy={n.cy} r={n.r+4} fill={n.color} opacity=".08"/>
            <circle cx={n.cx} cy={n.cy} r={n.r}   fill={n.color} opacity=".9"/>
            <line x1={cx} y1={cy} x2={n.cx} y2={n.cy} stroke={n.color} strokeWidth=".5" opacity=".15"/>
            <text
              x={n.cx + (n.cx > cx ? n.r+5 : -(n.r+5))}
              y={n.cy + 4}
              fontSize="7"
              fontFamily="JetBrains Mono, monospace"
              fill={n.color}
              opacity=".88"
              textAnchor={n.cx > cx ? 'start' : 'end'}
            >{n.label}</text>
          </g>
        ))}

        {/* Tick marks */}
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * 10 * Math.PI) / 180
          const inn = i % 3 === 0 ? r3+2 : r3+1
          const out = i % 3 === 0 ? r3+7 : r3+4
          return (
            <line key={i}
              x1={cx+inn*Math.sin(a)} y1={cy-inn*Math.cos(a)}
              x2={cx+out*Math.sin(a)} y2={cy-out*Math.cos(a)}
              stroke="rgba(59,130,246,.25)" strokeWidth={i%3===0?'1':'.5'}
            />
          )
        })}
      </svg>

      {/* Frequency tags */}
      {[
        { text:'FR1',  style:{ top:'7%',    left:'50%',   transform:'translateX(-50%)' }, color:'#3B82F6' },
        { text:'FR2',  style:{ top:'50%',   right:'2%',   transform:'translateY(-50%)' }, color:'#8B5CF6' },
        { text:'THz',  style:{ bottom:'8%', left:'50%',   transform:'translateX(-50%)' }, color:'#06B6D4' },
        { text:'Sub6', style:{ top:'50%',   left:'2%',    transform:'translateY(-50%)' }, color:'#10B981' },
      ].map((t, i) => (
        <div key={i}
          className="absolute font-['JetBrains_Mono'] text-[9px] font-medium px-1.5 py-0.5 rounded border"
          style={{ ...t.style, color:t.color, borderColor:`${t.color}33`, background:`${t.color}11` }}>
          {t.text}
        </div>
      ))}
    </div>
  )
}
