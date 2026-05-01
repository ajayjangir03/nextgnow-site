'use client'
import { useState, useRef, useEffect } from 'react'

const SYS = `You are SpectrumAI — the AI assistant for NextGNow.in, an elite 5G NR and 6G knowledge platform. You are a wireless communications expert with 15+ years of industry experience and deep 3GPP specification knowledge (Release 15 through Release 19 and IMT-2030).

Expertise: 5G NR physical layer, massive MIMO, 5G Core SBA, O-RAN, network slicing, URLLC/IIoT, PDCP/RLC/MAC protocols, NGAP/F1AP/E1AP interfaces, 5G security (TS 33.501), 6G/THz/RIS/ISAC/NTN.

Rules:
- Always cite 3GPP TS/TR numbers and sections
- Three layers: simple analogy → technical depth → spec precision
- Flag [STANDARDIZED Rel-XX] | [UNDER STUDY] | [VENDOR-SPECIFIC]
- Never confuse gNB/eNB, NR/LTE, 5GC/EPC, SA/NSA, FR1/FR2
- Keep responses focused and well-structured
- You represent NextGNow.in — be the most helpful telecom AI available`

const QUICK = ['5G NR Numerology', 'PDCCH Blind Decoding', 'Network Slicing', 'O-RAN Architecture']

interface Msg { role: 'user' | 'assistant'; content: string }

function fmt(t: string) {
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong class="text-ng-t0 font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g,'<code class="bg-ng-cyan/10 text-ng-cyan px-1.5 py-0.5 rounded text-[.82em] font-mono">$1</code>')
    .replace(/^## (.+)$/gm,'<div class="text-blue-400 font-semibold mt-3 mb-1 text-[.88em] tracking-wide">$1</div>')
    .replace(/^# (.+)$/gm,'<div class="text-blue-400 font-bold mt-3 mb-1">$1</div>')
    .replace(/\n/g,'<br/>')
}

export default function SpectrumAIWidget() {
  const [open, setOpen]     = useState(false)
  const [msgs, setMsgs]     = useState<Msg[]>([])
  const [input, setInput]   = useState('')
  const [busy, setBusy]     = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const endRef  = useRef<HTMLDivElement>(null)
  const inpRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])
  useEffect(() => { if (open) setTimeout(() => inpRef.current?.focus(), 260) }, [open])

  const send = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || busy) return
    setShowQuick(false)
    setInput('')
    setBusy(true)
    const newMsgs: Msg[] = [...msgs, { role: 'user', content: q }]
    setMsgs(newMsgs)
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYS,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      const reply = data.content[0].text
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: '⚠️ Connection error. Please try again.' }])
    }
    setBusy(false)
  }

  return (
    <>
      {/* Panel */}
      <div className={`widget-panel ${open ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-ng-bdr bg-ng-bg flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg grad-bg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-[13px] text-ng-t0">SpectrumAI</div>
              <div className="font-mono text-[10px] text-ng-t4">5G NR · 6G · 3GPP Expert</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/speciq/" className="font-mono text-[10px] text-ng-t3 hover:text-ng-cyan transition-colors px-2 py-1 rounded border border-ng-bdr hover:border-ng-cyan/40">
              Full view
            </a>
            <button onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-ng-t4 hover:text-ng-t0 hover:border-ng-bdr3 transition-all text-[15px]">
              ×
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-[13px]">
          {msgs.length === 0 && (
            <div className="py-3">
              <div className="flex items-start gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-[13px] flex-shrink-0">📡</div>
                <div className="bg-ng-bg2 border border-ng-bdr rounded-xl rounded-tl-none p-3 text-ng-t1 leading-relaxed">
                  Hi! I&apos;m <strong className="text-ng-t0">SpectrumAI</strong> — your 5G NR & 6G expert.<br/><br/>
                  Ask me anything about 3GPP specs, O-RAN, URLLC, 6G, or any telecom topic. Every answer is spec-grounded. 📡
                </div>
              </div>
              {showQuick && (
                <div className="flex flex-wrap gap-1.5">
                  {QUICK.map(q => (
                    <button key={q} onClick={() => send(q)}
                      className="px-3 py-1.5 rounded-2xl border border-ng-bdr text-ng-t3 text-[11px] hover:border-ng-blue/50 hover:text-ng-blue bg-ng-bg2 hover:bg-ng-blue/5 transition-all font-body">
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {msgs.map((m, i) => (
            <div key={i} className={`flex items-start gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[12px] flex-shrink-0 ${
                m.role === 'user'
                  ? 'border-ng-blue/30 bg-ng-blue/10'
                  : 'border-ng-bdr2 bg-ng-bg2'
              }`}>
                {m.role === 'user' ? '👤' : '📡'}
              </div>
              <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-ng-t1 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-ng-blue/12 border border-ng-blue/20 rounded-tr-none'
                  : 'bg-ng-bg2 border border-ng-bdr rounded-tl-none'
              }`}
                dangerouslySetInnerHTML={{ __html: fmt(m.content) }}
              />
            </div>
          ))}

          {busy && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-[12px] flex-shrink-0">📡</div>
              <div className="bg-ng-bg2 border border-ng-bdr rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-ng-blue animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-ng-bdr bg-ng-bg flex-shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inpRef}
              rows={1}
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,100)+'px' }}
              onKeyDown={e => { if (e.key==='Enter'&&!e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Ask about 5G NR, 6G, 3GPP…"
              className="flex-1 bg-ng-bg2 border border-ng-bdr2 rounded-xl px-3 py-2.5 text-ng-t0 text-[13px] outline-none resize-none overflow-hidden transition-colors focus:border-ng-blue placeholder:text-ng-t4 font-body leading-snug"
              style={{ minHeight: '40px', maxHeight: '100px' }}
              disabled={busy}
            />
            <button
              onClick={() => send()}
              disabled={busy || !input.trim()}
              className="w-10 h-10 rounded-xl grad-bg flex items-center justify-center text-white flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="widget-fab">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2.5 text-white font-semibold text-[13px] px-4 py-3 rounded-2xl spectrum-glow transition-all duration-200 hover:scale-105 active:scale-95 font-body"
          style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2a10 10 0 1 0 10 10"/><path d="m16 8 4-4m0 0-4 4m4-4v4m-4-4h4"/>
          </svg>
          {open ? 'Close' : 'SpectrumAI'}
        </button>
      </div>
    </>
  )
}
