'use client'

const NODES = [
  { cx: 72,  cy: 48,  label: '5G NR',    color: '#3B82F6', r: 5  },
  { cx: 168, cy: 28,  label: '6G',        color: '#8B5CF6', r: 6  },
  { cx: 215, cy: 72,  label: 'O-RAN',     color: '#F59E0B', r: 4.5},
  { cx: 48,  cy: 145, label: '3GPP',      color: '#10B981', r: 4  },
  { cx: 185, cy: 168, label: 'URLLC',     color: '#06B6D4', r: 4  },
  { cx: 100, cy: 190, label: 'mmWave',    color: '#8B5CF6', r: 3.5},
  { cx: 58,  cy: 90,  label: 'NTN',       color: '#EF4444', r: 3.5},
  { cx: 148, cy: 120, label: 'ISAC',      color: '#06B6D4', r: 3  },
]

export default function RadarAnimation() {
  const cx = 120, cy = 120, r3 = 108, r2 = 72, r1 = 38

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,.1) 0%, transparent 70%)',
      }}/>

      <svg viewBox="0 0 240 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Sweep gradient */}
          <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3B82F6" stopOpacity=".5"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx={cx} cy={cy} r={r3}/>
          </clipPath>
        </defs>

        {/* Grid cross lines */}
        <line x1={cx} y1={cy - r3} x2={cx} y2={cy + r3} stroke="rgba(59,130,246,.1)" strokeWidth=".8"/>
        <line x1={cx - r3} y1={cy} x2={cx + r3} y2={cy} stroke="rgba(59,130,246,.1)" strokeWidth=".8"/>
        <line x1={cx - r3*.71} y1={cy - r3*.71} x2={cx + r3*.71} y2={cy + r3*.71} stroke="rgba(59,130,246,.06)" strokeWidth=".8"/>
        <line x1={cx + r3*.71} y1={cy - r3*.71} x2={cx - r3*.71} y2={cy + r3*.71} stroke="rgba(59,130,246,.06)" strokeWidth=".8"/>

        {/* Concentric rings */}
        <circle cx={cx} cy={cy} r={r1} className="ring-pulse"  fill="none" stroke="rgba(59,130,246,.25)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r2} className="ring-pulse2" fill="none" stroke="rgba(59,130,246,.18)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r3} className="ring-pulse3" fill="none" stroke="rgba(59,130,246,.12)" strokeWidth="1"/>

        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r={r3 + 8} fill="none" stroke="rgba(59,130,246,.05)" strokeWidth=".5" strokeDasharray="4 6"/>

        {/* Spinning sweep — clipped to radar circle */}
        <g clipPath="url(#circleClip)">
          <g className="radar-spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <path
              d={`M${cx},${cy} L${cx},${cy - r3} A${r3},${r3} 0 0,1 ${cx + r3 * Math.sin(Math.PI / 3)},${cy - r3 * Math.cos(Math.PI / 3)} Z`}
              fill="url(#sweepGrad)"
              opacity=".7"
            />
            {/* Leading edge line */}
            <line x1={cx} y1={cy} x2={cx} y2={cy - r3} stroke="#3B82F6" strokeWidth="1.5" opacity=".8"/>
          </g>
        </g>

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={5} fill="url(#lineGrad)"/>
        <circle cx={cx} cy={cy} r={9} fill="none" stroke="rgba(59,130,246,.3)" strokeWidth="1"/>

        {/* Data nodes */}
        {NODES.map((n, i) => (
          <g key={i} className="dot-blink" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={n.cx} cy={n.cy} r={n.r + 4} fill={n.color} opacity=".1"/>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity=".9"/>
            <line x1={cx} y1={cy} x2={n.cx} y2={n.cy} stroke={n.color} strokeWidth=".6" opacity=".2"/>
            <text
              x={n.cx + (n.cx > cx ? n.r + 5 : -(n.r + 5))}
              y={n.cy + 4}
              fontSize="7"
              fontFamily="JetBrains Mono, monospace"
              fill={n.color}
              opacity=".9"
              textAnchor={n.cx > cx ? 'start' : 'end'}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Tick marks on outer ring */}
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (i * 10 * Math.PI) / 180
          const inner = i % 3 === 0 ? r3 + 2 : r3 + 1
          const outer = i % 3 === 0 ? r3 + 7 : r3 + 4
          return (
            <line
              key={i}
              x1={cx + inner * Math.sin(angle)} y1={cy - inner * Math.cos(angle)}
              x2={cx + outer * Math.sin(angle)} y2={cy - outer * Math.cos(angle)}
              stroke="rgba(59,130,246,.3)" strokeWidth={i % 3 === 0 ? '1' : '.5'}
            />
          )
        })}
      </svg>

      {/* Frequency labels floating around */}
      {[
        { text: 'FR1',  top: '8%',  left: '50%',  clr: '#3B82F6'  },
        { text: 'FR2',  top: '50%', right: '4%',  clr: '#8B5CF6'  },
        { text: 'THz',  bottom: '10%', left: '48%', clr: '#06B6D4' },
        { text: 'Sub6', top: '50%', left: '4%',   clr: '#10B981'  },
      ].map((tag, i) => (
        <div
          key={i}
          className="absolute font-mono text-[9px] font-medium px-1.5 py-0.5 rounded border"
          style={{
            ...tag,
            color: tag.clr,
            borderColor: `${tag.clr}33`,
            background: `${tag.clr}11`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {tag.text}
        </div>
      ))}
    </div>
  )
}
