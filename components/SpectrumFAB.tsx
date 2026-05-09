'use client'
import { useState, useRef, useEffect } from 'react'

const SYS = `You are SpectrumAI — the AI assistant for NextGNow.in. You are a wireless communications expert with deep 3GPP knowledge (Release 15–19, IMT-2030). Always cite TS/TR numbers. Three layers: analogy → technical → spec-level. Be concise and helpful.`

const QUICK = [
  { icon: '⚡', text: 'Explain 6G Vision in simple terms' },
  { icon: '📋', text: "What's new in 3GPP Rel-19?" },
  { icon: '📈', text: 'Analyze this log excerpt' },
]
const CHIPS = ['6G Architecture', 'AI/ML in RAN', 'Massive MIMO', 'TS 38,300', 'Network Slicing']

type Msg = { role: 'user' | 'assistant'; text: string }

function fmtText(t: string) {
  return t
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E2EEFF">$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,.15);color:#A5B4FC;padding:1px 5px;border-radius:4px;font-size:.83em">$1</code>')
    .replace(/\n/g, '<br/>')
}

/* ── ANIMATION CSS injected once ── */
const ANIM_CSS = `
@keyframes fabPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.5),0 8px 32px rgba(99,102,241,.4)}50%{box-shadow:0 0 0 10px rgba(99,102,241,0),0 8px 32px rgba(99,102,241,.5)}}
@keyframes panelSlide{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes sheetSlide{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes hintPop{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
.fab-pulse{animation:fabPulse 3s ease-in-out infinite}
.panel-slide{animation:panelSlide .25s cubic-bezier(.16,1,.3,1) both}
.sheet-slide{animation:sheetSlide .3s cubic-bezier(.16,1,.3,1) both}
.hint-pop{animation:hintPop .4s ease both}
`

export default function SpectrumFAB() {
  const [open, setOpen]   = useState(false)
  const [msgs, setMsgs]   = useState<Msg[]>([])
  const [inp, setInp]     = useState('')
  const [busy, setBusy]   = useState(false)
  const [hint, setHint]   = useState(true)
  const [isMob, setIsMob] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inpRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const check = () => setIsMob(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    const t = setTimeout(() => setHint(false), 5000)
    return () => { window.removeEventListener('resize', check); clearTimeout(t) }
  }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])
  useEffect(() => { if (open) setTimeout(() => inpRef.current?.focus(), 300) }, [open])

  async function send(text?: string) {
    const q = (text || inp).trim()
    if (!q || busy) return
    setInp(''); setBusy(true)
    const next: Msg[] = [...msgs, { role: 'user', text: q }]
    setMsgs(next)
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 900,
          system: SYS,
          messages: next.map(m => ({ role: m.role, content: m.text })),
        }),
      })
      const d = await r.json()
      if (d.error) throw new Error(d.error.message)
      setMsgs(p => [...p, { role: 'assistant', text: d.content[0].text }])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', text: '⚠️ Connection error. Please try again.' }])
    }
    setBusy(false)
  }

  /* Shared panel styles */
  const panelStyle: React.CSSProperties = {
    background: 'rgba(10,12,28,.97)',
    border: '1px solid rgba(99,102,241,.2)',
    borderRadius: isMob ? '20px 20px 0 0' : 18,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,.75)',
    ...(isMob
      ? { position: 'fixed' as const, bottom: 0, left: 0, right: 0, height: '88vh', zIndex: 1001 }
      : { position: 'fixed' as const, bottom: 90, right: 24, width: 375, height: 570, zIndex: 1001 }
    ),
  }

  return (
    <>
      {/* Inject animation keyframes once */}
      <style>{ANIM_CSS}</style>

      {/* Backdrop (mobile only) */}
      {open && isMob && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
        }}/>
      )}

      {/* ── PANEL ── */}
      {open && (
        <div style={panelStyle} className={isMob ? 'sheet-slide' : 'panel-slide'}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10,
            padding: '13px 14px', borderBottom: '1px solid rgba(99,102,241,.12)',
            flexShrink: 0, background: 'rgba(8,9,22,.8)' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9,
              background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff',
                fontFamily: 'Syne,sans-serif', letterSpacing: '-.2px' }}>
                SpectrumAI Assistant
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%',
                  background: '#10B981', boxShadow: '0 0 6px #10B981' }}/>
                <span style={{ fontSize: 11, color: '#10B981' }}>Online · 5G/6G Expert</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748B', fontSize: 16, lineHeight: '1',
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 6px',
            display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.length === 0 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7,
                  background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, flexShrink: 0 }}>🤖</div>
                <div style={{ background: 'rgba(99,102,241,.1)',
                  border: '1px solid rgba(99,102,241,.16)',
                  borderRadius: '10px 10px 10px 3px',
                  padding: '10px 13px', fontSize: 13, color: '#C8D6F0',
                  lineHeight: 1.6, maxWidth: '85%' }}>
                  Hello! I&apos;m SpectrumAI, your telecom engineering assistant. How can I help you today?
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6,
                  background: m.role === 'user' ? 'rgba(59,130,246,.25)' : 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, flexShrink: 0 }}>
                  {m.role === 'user' ? '👤' : '🤖'}
                </div>
                <div style={{
                  background: m.role === 'user' ? 'rgba(59,130,246,.15)' : 'rgba(99,102,241,.1)',
                  border: m.role === 'user' ? '1px solid rgba(59,130,246,.22)' : '1px solid rgba(99,102,241,.16)',
                  borderRadius: m.role === 'user' ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
                  padding: '9px 12px', fontSize: 13, color: '#C8D6F0', lineHeight: 1.6, maxWidth: '84%',
                }} dangerouslySetInnerHTML={{ __html: fmtText(m.text) }}/>
              </div>
            ))}

            {busy && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6,
                  background: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>🤖</div>
                <div style={{ background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.16)',
                  borderRadius: '10px 10px 10px 3px', padding: '12px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#818CF8',
                      display: 'block', animation: `dotPop 1.4s ease-in-out ${i * .2}s infinite` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>

          {/* Quick prompts */}
          {msgs.length === 0 && (
            <div style={{ padding: '4px 12px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {QUICK.map(q => (
                <button key={q.text} onClick={() => send(q.text)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(99,102,241,.07)', border: '1px solid rgba(99,102,241,.16)',
                  borderRadius: 9, padding: '8px 12px', cursor: 'pointer', textAlign: 'left',
                  color: '#A5B4FC', fontSize: 12.5, transition: 'all .15s',
                }}>
                  <span style={{ fontSize: 13 }}>{q.icon}</span>{q.text}
                </button>
              ))}
            </div>
          )}

          {/* Chips */}
          {msgs.length === 0 && (
            <div style={{ padding: '0 12px 10px' }}>
              <div style={{ fontSize: 11, color: '#3D4A6B', marginBottom: 6,
                fontFamily: 'JetBrains Mono,monospace' }}>Try asking about:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {CHIPS.map(c => (
                  <button key={c} onClick={() => send(c)} style={{
                    background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)',
                    borderRadius: 16, padding: '4px 10px', fontSize: 11.5,
                    color: '#64748B', cursor: 'pointer',
                  }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px 14px', borderTop: '1px solid rgba(99,102,241,.1)',
            flexShrink: 0, background: 'rgba(8,9,22,.5)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center',
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(99,102,241,.18)',
              borderRadius: 12, padding: '8px 10px' }}>
              <input ref={inpRef} value={inp} onChange={e => setInp(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }}}
                placeholder="Ask SpectrumAI…" disabled={busy}
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: '#E2EEFF', fontSize: 13 }}/>
              <button onClick={() => send()} disabled={busy || !inp.trim()} style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg,#4F46E5,#6366F1)',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                opacity: busy || !inp.trim() ? .4 : 1,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <p style={{ fontSize: 10.5, color: '#2A3550', textAlign: 'center', marginTop: 7 }}>
              SpectrumAI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      )}

      {/* ── FAB BUTTON ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
        display: 'flex', alignItems: 'center', gap: 10, flexDirection: 'row-reverse' }}>

        {/* Hint tooltip */}
        {hint && !open && (
          <div className="hint-pop" style={{
            background: 'rgba(10,12,28,.95)', border: '1px solid rgba(99,102,241,.28)',
            borderRadius: 10, padding: '8px 14px', color: '#C4B5FD',
            fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
            boxShadow: '0 8px 32px rgba(0,0,0,.5)',
          }}>
            Ask SpectrumAI 👋
          </div>
        )}

        <button
          onClick={() => { setOpen(o => !o); setHint(false) }}
          title={open ? 'Close SpectrumAI' : 'Ask SpectrumAI'}
          className={!open ? 'fab-pulse' : ''}
          style={{
            width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: open
              ? 'rgba(30,30,50,.9)'
              : 'linear-gradient(135deg,#4F46E5,#7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s', flexShrink: 0,
            boxShadow: open ? '0 4px 16px rgba(0,0,0,.4)' : '0 8px 32px rgba(99,102,241,.5)',
          }}>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="9" fill="rgba(255,255,255,.12)"/>
              <circle cx="16" cy="16" r="5" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="16" r="2" fill="white"/>
              <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="rgba(255,255,255,.65)"
                strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8"
                stroke="rgba(255,255,255,.45)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
