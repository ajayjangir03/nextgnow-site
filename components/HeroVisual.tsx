/* 6G Holographic sphere — exact recreation of Image 1 */
const NODES=[
  {id:'ai',  x:280,y:48,  icon:'🧠',label:'AI Native',     color:'#A78BFA',lx:280,ly:22, anchor:'middle' as const},
  {id:'thz', x:96, y:158, icon:'📶',label:'Terahertz\nSpectrum', color:'#60A5FA',lx:42,ly:162,anchor:'end' as const},
  {id:'int', x:464,y:158, icon:'🎯',label:'Integrated\nSensing',  color:'#34D399',lx:520,ly:162,anchor:'start' as const},
  {id:'lat', x:130,y:285, icon:'⚡',label:'Ultra Low\nLatency',   color:'#FB923C',lx:68, ly:285,anchor:'end' as const},
  {id:'sus', x:430,y:285, icon:'🌿',label:'Sustainable\nNetworks',color:'#F472B6',lx:494,ly:285,anchor:'start' as const},
]

export default function HeroVisual(){
  return(
    <div style={{position:'relative',width:'100%',maxWidth:540,height:380,margin:'0 auto',userSelect:'none'}}>
      <svg viewBox="0 0 560 380" style={{width:'100%',height:'100%',overflow:'visible'}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 6G text gradient */}
          <linearGradient id="g6g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA"/>
            <stop offset="50%" stopColor="#818CF8"/>
            <stop offset="100%" stopColor="#A78BFA"/>
          </linearGradient>
          {/* central glow */}
          <radialGradient id="cglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity=".35"/>
            <stop offset="60%" stopColor="#3B82F6" stopOpacity=".12"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          {/* base platform glow */}
          <radialGradient id="baseglow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity=".8"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </radialGradient>
          {/* bg glow */}
          <radialGradient id="bgglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity=".12"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          {/* node glow */}
          <filter id="nglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="tglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="sphereClip">
            <ellipse cx="280" cy="195" rx="230" ry="165"/>
          </clipPath>
        </defs>

        {/* Background sphere glow */}
        <ellipse cx="280" cy="195" rx="220" ry="160" fill="url(#bgglow)"/>

        {/* ORBIT RINGS — 4 ellipses at different tilts */}
        {/* Outer ring */}
        <ellipse cx="280" cy="195" rx="220" ry="90" fill="none"
          stroke="rgba(99,102,241,.2)" strokeWidth="1" className="r-pulse1"/>
        {/* Mid ring */}
        <ellipse cx="280" cy="195" rx="175" ry="70" fill="none"
          stroke="rgba(99,102,241,.25)" strokeWidth="1" className="r-pulse2"/>
        {/* Inner ring */}
        <ellipse cx="280" cy="195" rx="125" ry="50" fill="none"
          stroke="rgba(129,140,248,.3)" strokeWidth="1" className="r-pulse3"/>
        {/* Tilt ring */}
        <ellipse cx="280" cy="195" rx="160" ry="55" fill="none"
          stroke="rgba(99,102,241,.15)" strokeWidth="1"
          transform="rotate(-25 280 195)" className="r-pulse4"/>

        {/* Dashed outer orbit */}
        <ellipse cx="280" cy="195" rx="235" ry="100" fill="none"
          stroke="rgba(99,102,241,.08)" strokeWidth="1" strokeDasharray="5 8"/>

        {/* Central glow core */}
        <ellipse cx="280" cy="195" rx="130" ry="90" fill="url(#cglow)"/>

        {/* Node connecting lines — thin, low opacity */}
        {NODES.map(n=>(
          <line key={n.id} x1="280" y1="195" x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth=".7" opacity=".25" strokeDasharray="4 5"/>
        ))}

        {/* 6G text — the centrepiece */}
        <text x="280" y="228" textAnchor="middle"
          fontSize="105" fontFamily="Syne,sans-serif" fontWeight="900"
          fill="url(#g6g)" letterSpacing="-4"
          filter="url(#tglow)"
          className="glow-6g">
          6G
        </text>

        {/* Base platform */}
        <ellipse cx="280" cy="316" rx="88" ry="14" fill="url(#baseglow)" opacity=".55"/>
        {/* Vertical beam */}
        <line x1="280" y1="290" x2="280" y2="316" stroke="url(#g6g)" strokeWidth="1.5" opacity=".4"/>
        {/* Platform ring */}
        <ellipse cx="280" cy="316" rx="48" ry="8" fill="none"
          stroke="rgba(59,130,246,.35)" strokeWidth="1"/>

        {/* Floating particles */}
        {[[160,120],[390,100],[195,260],[365,255],[250,85],[315,90],[145,195],[415,195]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2}
            fill={i%2===0?'rgba(129,140,248,.5)':'rgba(167,139,250,.4)'}
            style={{animation:`floatNode ${3+i*.4}s ease-in-out infinite`,animationDelay:`${i*.35}s`}}/>
        ))}

        {/* NODES */}
        {NODES.map(n=>(
          <g key={n.id} filter="url(#nglow)" className="node-float"
            style={{animationDelay:`${NODES.indexOf(n)*.5}s`}}>
            {/* Outer glow ring */}
            <circle cx={n.x} cy={n.y} r="20" fill={n.color} opacity=".1"/>
            <circle cx={n.x} cy={n.y} r="14" fill={n.color} opacity=".15"/>
            {/* Icon circle */}
            <circle cx={n.x} cy={n.y} r="10" fill="rgba(13,15,35,.9)"
              stroke={n.color} strokeWidth="1.5"/>
            {/* Icon text */}
            <text x={n.x} y={n.y+4} textAnchor="middle" fontSize="10">{n.icon}</text>
            {/* Label */}
            {n.label.split('\n').map((line,li)=>(
              <text key={li} x={n.lx} y={n.ly+(li*13)}
                textAnchor={n.anchor} fontSize="9.5"
                fontFamily="DM Sans,sans-serif" fontWeight="600"
                fill={n.color} opacity=".9">
                {line}
              </text>
            ))}
          </g>
        ))}

        {/* Extra orbit dots */}
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad=deg*Math.PI/180
          const ex=280+175*Math.cos(rad), ey=195+70*Math.sin(rad)
          return<circle key={i} cx={ex} cy={ey} r="2.5"
            fill="rgba(129,140,248,.5)" opacity=".7"/>
        })}
      </svg>
    </div>
  )
}
