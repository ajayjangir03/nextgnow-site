'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const SYS = `You are SpectrumAI — the AI assistant for NextGNow.in, an elite 5G NR and 6G knowledge platform. You are a wireless communications expert with 15+ years of industry experience and deep 3GPP specification knowledge (Release 15 through Release 19 and IMT-2030).

Expertise covers: 5G NR physical layer (numerology, frame structure, OFDM, PDSCH/PUSCH/PDCCH/PUCCH/PRACH, HARQ, LDPC/Polar), massive MIMO & beamforming (Type I/II codebooks, CSI-RS, SRS, beam management), 5G Core SBA (AMF/SMF/UPF/PCF/UDM/AUSF/NRF/NSSF, N1-N6 interfaces), O-RAN (O-DU/O-CU/O-RU, Near-RT RIC, Non-RT RIC, xApps, E2 interface), Network Slicing (NSSF, S-NSSAI), URLLC/IIoT (mini-slots, configured grants, PDCP duplication), 5G security (TS 33.501, 5G-AKA, SUCI/SUPI), 6G/IMT-2030 (THz, RIS, ISAC, AI-native, NTN).

Rules: Always cite 3GPP TS/TR numbers and sections. Three layers: simple analogy → technical depth → spec precision. Flag [STANDARDIZED Rel-XX] | [UNDER STUDY] | [VENDOR-SPECIFIC]. Never confuse gNB/eNB, NR/LTE, 5GC/EPC. Be the most helpful telecom AI available.`

const TOPICS = [
  { id:'nr-phy',   icon:'📡', title:'5G NR Physical Layer',       tag:'TS 38.211/212', desc:'Frame structure, numerology, OFDM, channel coding, reference signals' },
  { id:'mimo',     icon:'🔭', title:'Massive MIMO & Beamforming', tag:'TS 38.214/331', desc:'Type I/II codebooks, CSI-RS, SRS, beam management P1/P2/P3' },
  { id:'5gc',      icon:'🏗️', title:'5G Core Architecture',       tag:'TS 23.501/502', desc:'AMF, SMF, UPF, SBA interfaces, N1/N2/N3/N4/N6, PDU sessions' },
  { id:'oran',     icon:'🌐', title:'O-RAN Architecture',         tag:'O-RAN Alliance', desc:'O-DU, O-CU, O-RU, Near-RT RIC, Non-RT RIC, xApps, E2 interface' },
  { id:'slicing',  icon:'🍰', title:'Network Slicing',            tag:'TS 23.501/530', desc:'NSSF, S-NSSAI, NSSP, slice selection, end-to-end isolation' },
  { id:'urllc',    icon:'⚡', title:'URLLC & Low Latency',        tag:'TS 38.300/321', desc:'Mini-slots, configured grants, PDCP duplication, IIoT/TSN' },
  { id:'ntn',      icon:'🛰️', title:'Non-Terrestrial Networks',   tag:'TS 38.821/811', desc:'LEO/MEO satellites, HAPS, NTN-NR, timing and Doppler challenges' },
  { id:'6g-ris',   icon:'🔮', title:'6G & RIS',                   tag:'IMT-2030', desc:'Reconfigurable intelligent surfaces, THz comms, AI-native air interface' },
  { id:'security', icon:'🔒', title:'5G Security Framework',      tag:'TS 33.501', desc:'5G-AKA, SUCI/SUPI, NAS/AS security, SEPP, network slice security' },
  { id:'qos',      icon:'📊', title:'QoS & SDAP Framework',       tag:'TS 23.501/300', desc:'5QI, GBR/non-GBR, reflective QoS, AMBR, SDAP mapping rules' },
  { id:'ca-dc',    icon:'📶', title:'Carrier Aggregation & DC',   tag:'TS 38.331/340', desc:'EN-DC, NR-DC, NE-DC, SCG/MCG configurations, inter-band CA' },
  { id:'isac',     icon:'📻', title:'ISAC — Sensing & Comm',      tag:'3GPP Rel-19', desc:'Integrated sensing and communication, 6G sensing KPIs, waveforms' },
]

const EXAMPLES = [
  'The UE shall monitor PDCCH candidates in every slot within the search space sets configured by higher layers, where the number of PDCCH candidates per slot is given by Table 10.1-2.',
  'For FR2, the UE is not expected to support simultaneous reception of NR cells on different bands with different UL timing advance values unless explicitly reported.',
  'The scheduling offset K0 is defined as the slot offset between the slot containing the DL assignment DCI and the slot for the scheduled PDSCH, where K0 ∈ {0,1,...,32}.',
]

const QUICK = [
  'Explain 5G NR numerology and subcarrier spacing options',
  'What is PDCCH blind decoding? How does search space work?',
  'How does 5G network slicing work end-to-end?',
  'Explain O-RAN: O-DU, O-CU-CP, O-RU and the E2 interface',
  'Compare URLLC vs eMBB requirements and design trade-offs',
  'Walk me through a 5G SA registration call flow step by step',
]

type Tab = 'chat' | 'topics' | 'decoder'
interface Msg { role: 'user' | 'assistant'; content: string }

function fmt(t: string) {
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong class="text-ng-t0 font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g,'<code class="bg-ng-cyan/10 text-ng-cyan px-1.5 py-0.5 rounded text-[.82em] font-mono">$1</code>')
    .replace(/^## (.+)$/gm,'<div class="text-blue-400 font-semibold mt-3 mb-1 text-sm tracking-wide">$1</div>')
    .replace(/^# (.+)$/gm,'<div class="text-blue-400 font-bold mt-3 mb-1">$1</div>')
    .replace(/\n/g,'<br/>')
}

async function callAI(messages: Msg[]) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYS, messages }),
  })
  const d = await res.json()
  if (d.error) throw new Error(d.error.message)
  return d.content[0].text as string
}

export default function SpectrumAIFull() {
  const [tab, setTab]               = useState<Tab>('chat')
  const [msgs, setMsgs]             = useState<Msg[]>([])
  const [input, setInput]           = useState('')
  const [busy, setBusy]             = useState(false)
  const [showQuick, setShowQuick]   = useState(true)
  const [topicDetail, setTopicDetail] = useState<{ topic: typeof TOPICS[0]; content: string } | null>(null)
  const [topicLoading, setTopicLoading] = useState<string | null>(null)
  const [specInput, setSpecInput]   = useState('')
  const [specOutput, setSpecOutput] = useState('')
  const [specLoading, setSpecLoading] = useState(false)
  const endRef   = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const sendChat = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || busy) return
    setShowQuick(false)
    setInput('')
    setBusy(true)
    const next: Msg[] = [...msgs, { role: 'user', content: q }]
    setMsgs(next)
    try {
      const r = await callAI(next)
      setMsgs(p => [...p, { role: 'assistant', content: r }])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: '⚠️ Connection error. Please try again.' }])
    }
    setBusy(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const loadTopic = async (tp: typeof TOPICS[0]) => {
    setTopicLoading(tp.id)
    try {
      const r = await callAI([{ role: 'user', content: `Comprehensive expert explanation of "${tp.title}" (3GPP ref: ${tp.tag}).\n\n1) SIMPLE ANALOGY for a beginner\n2) TECHNICAL DEPTH: key parameters, procedures, protocol behaviors\n3) 3GPP SPEC REFERENCES: exact TS/TR numbers and sections\n4) REAL-WORLD DEPLOYMENT: caveats, vendor differences, gotchas\n\nBe thorough and cite specs throughout.` }])
      setTopicDetail({ topic: tp, content: r })
    } catch { /* ignore */ }
    setTopicLoading(null)
  }

  const decodeSpec = async () => {
    if (!specInput.trim() || specLoading) return
    setSpecLoading(true); setSpecOutput('')
    try {
      const r = await callAI([{ role: 'user', content: `Decode this 3GPP specification text:\n\n"${specInput}"\n\n1) PLAIN ENGLISH: What does this clause say?\n2) TECHNICAL WHY: Why does this requirement exist?\n3) SPEC CONTEXT: Related TS/TR references\n4) REAL-WORLD IMPACT: Effect on UE behavior or network design\n5) GOTCHAS: Common misunderstandings or edge cases` }])
      setSpecOutput(r)
    } catch { setSpecOutput('⚠️ Error. Please try again.') }
    setSpecLoading(false)
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'chat',    label: 'AI Expert Chat',  icon: '💬' },
    { id: 'topics',  label: 'Topic Explorer',  icon: '🗂️' },
    { id: 'decoder', label: 'Spec Decoder',    icon: '🔍' },
  ]

  return (
    <div className="max-w-[1360px] mx-auto px-6 py-10">

      {/* Page header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-ng-blue/10 border border-ng-blue/25 text-ng-blue text-[11px] font-bold tracking-[.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-ng-green animate-pulse" />
          AI Live · 3GPP Spec-Grounded
        </div>
        <h1 className="font-display font-extrabold text-[42px] leading-tight tracking-tight text-ng-t0 mb-3">
          Spectrum<span className="grad-text">AI</span> Assistant
        </h1>
        <p className="text-[15px] text-ng-t2 font-light max-w-[560px] leading-relaxed">
          Your elite 5G NR & 6G expert. Ask anything — from physical layer numerology to 6G RIS architecture. Every answer grounded in 3GPP specifications.
        </p>
        <div className="flex gap-2 flex-wrap mt-5">
          {['3GPP Rel-15→19', 'IMT-2030 / 6G', 'O-RAN Alliance', 'Spec Decoder'].map(badge => (
            <span key={badge} className="font-mono text-[10px] text-ng-t3 border border-ng-bdr px-3 py-1 rounded-full bg-ng-bg2">{badge}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-ng-bdr">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 text-[13px] font-medium border-b-2 -mb-px transition-all font-body ${
              tab === t.id
                ? 'text-ng-blue border-ng-blue'
                : 'text-ng-t3 border-transparent hover:text-ng-t1'
            }`}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* ── CHAT TAB ── */}
      {tab === 'chat' && (
        <div className="ng-card flex flex-col" style={{ height: '640px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 text-[13.5px]">
            {msgs.length === 0 && (
              <div className="py-2">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-base flex-shrink-0">📡</div>
                  <div className="bg-ng-bg2 border border-ng-bdr rounded-2xl rounded-tl-none p-4 text-ng-t1 leading-relaxed max-w-[75%]">
                    <strong className="text-ng-t0">Welcome to SpectrumAI</strong> 🛰️<br/><br/>
                    I&apos;m your 5G NR & 6G expert with deep 3GPP knowledge. Use the quick prompts below or ask me anything!
                  </div>
                </div>
                {showQuick && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {QUICK.map(q => (
                      <button key={q} onClick={() => sendChat(q)}
                        className="text-left px-4 py-3 rounded-xl border border-ng-bdr bg-ng-bg2 text-ng-t2 text-[12.5px] hover:border-ng-bdr2 hover:text-ng-t0 hover:bg-ng-bg3 transition-all font-body leading-snug">
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center text-[13px] flex-shrink-0 ${
                  m.role === 'user' ? 'border-ng-blue/30 bg-ng-blue/10' : 'border-ng-bdr2 bg-ng-bg2'}`}>
                  {m.role === 'user' ? '👤' : '📡'}
                </div>
                <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-ng-t1 leading-relaxed ${
                  m.role === 'user' ? 'bg-ng-blue/12 border border-ng-blue/20 rounded-tr-none' : 'bg-ng-bg2 border border-ng-bdr rounded-tl-none'
                }`} dangerouslySetInnerHTML={{ __html: fmt(m.content) }} />
              </div>
            ))}
            {busy && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-[13px]">📡</div>
                <div className="bg-ng-bg2 border border-ng-bdr rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-ng-blue animate-bounce" style={{animationDelay:`${i*.18}s`}}/>)}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-ng-bdr bg-ng-bg flex-shrink-0 rounded-b-2xl">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,120)+'px' }}
                onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat()} }}
                placeholder="Ask about 5G NR, 6G, O-RAN, 3GPP specs…"
                className="flex-1 bg-ng-bg2 border border-ng-bdr2 rounded-xl px-4 py-3 text-ng-t0 text-[14px] outline-none resize-none overflow-hidden transition-colors focus:border-ng-blue placeholder:text-ng-t4 font-body"
                style={{ minHeight:'44px', maxHeight:'120px' }}
                disabled={busy}
              />
              <button onClick={() => sendChat()} disabled={busy||!input.trim()}
                className="h-[44px] px-5 rounded-xl grad-bg text-white font-semibold text-[13px] flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform flex-shrink-0 font-body">
                Send
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOPICS TAB ── */}
      {tab === 'topics' && (
        <div>
          {topicDetail ? (
            <div className="ng-card p-8">
              <button onClick={() => setTopicDetail(null)}
                className="inline-flex items-center gap-2 text-ng-t3 hover:text-ng-t0 border border-ng-bdr hover:border-ng-bdr2 px-4 py-2 rounded-lg text-[13px] mb-6 transition-all font-body">
                ← Back to Topics
              </button>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-ng-bdr">
                <span className="text-[40px]">{topicDetail.topic.icon}</span>
                <div>
                  <div className="font-display font-bold text-xl text-ng-t0 tracking-tight">{topicDetail.topic.title}</div>
                  <div className="font-mono text-[11px] text-ng-cyan mt-1">{topicDetail.topic.tag}</div>
                </div>
              </div>
              <div className="text-[14px] text-ng-t1 leading-[1.8] max-w-[820px]"
                dangerouslySetInnerHTML={{ __html: fmt(topicDetail.content) }} />
              <button onClick={() => { setTopicDetail(null); setTab('chat'); sendChat(`Deep-dive into ${topicDetail.topic.title}`) }}
                className="mt-6 inline-flex items-center gap-2 text-ng-blue border border-ng-blue/30 bg-ng-blue/8 hover:bg-ng-blue/15 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all font-body">
                💬 Continue in Chat →
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-display font-bold text-2xl text-ng-t0 mb-2">3GPP Knowledge Domains</h2>
                <p className="text-[14px] text-ng-t3">Click any domain for an AI-powered deep-dive with spec citations and deployment insights.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {TOPICS.map(tp => (
                  <button key={tp.id} onClick={() => loadTopic(tp)}
                    className="ng-card p-5 text-left hover:border-ng-bdr3 group transition-all duration-200 disabled:opacity-60"
                    disabled={topicLoading === tp.id}>
                    <div className="text-2xl mb-3">{tp.icon}</div>
                    <div className="font-mono text-[10px] text-ng-cyan mb-2 tracking-wide">{tp.tag}</div>
                    <div className="font-display font-bold text-[14px] text-ng-t0 mb-2 group-hover:text-ng-blue transition-colors">{tp.title}</div>
                    <div className="text-[12px] text-ng-t4 leading-relaxed">{tp.desc}</div>
                    {topicLoading === tp.id && (
                      <div className="mt-3 flex gap-1.5">
                        {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-ng-blue animate-bounce" style={{animationDelay:`${i*.18}s`}}/>)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── DECODER TAB ── */}
      {tab === 'decoder' && (
        <div>
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl text-ng-t0 mb-2">3GPP Spec Decoder</h2>
            <p className="text-[14px] text-ng-t3">Paste any 3GPP TS/TR clause — get plain-English expert explanation with real-world implications.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase">📋 Paste 3GPP Spec Text</div>
              <textarea
                value={specInput}
                onChange={e => setSpecInput(e.target.value)}
                placeholder={'Paste any 3GPP TS/TR clause here...\n\nExample (TS 38.211 §4.3):\n"The UE shall assume that the reference point for the timing of downlink signals..."'}
                className="bg-ng-bg2 border border-ng-bdr2 rounded-xl p-4 text-ng-t1 font-mono text-[13px] leading-relaxed resize-none outline-none transition-colors focus:border-ng-blue placeholder:text-ng-t4"
                style={{ minHeight: '220px' }}
              />
              <button onClick={decodeSpec} disabled={specLoading || !specInput.trim()}
                className="grad-bg text-white font-semibold py-3 rounded-xl text-[13px] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform font-body">
                {specLoading ? '⏳ Decoding...' : '🔍 Decode Specification'}
              </button>
              <div>
                <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase mb-3">Quick Examples</div>
                <div className="flex flex-col gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button key={i} onClick={() => setSpecInput(ex)}
                      className="text-left p-3 rounded-lg border border-ng-bdr bg-ng-bg2 text-ng-t3 text-[12px] hover:border-ng-bdr2 hover:text-ng-t1 transition-all font-mono leading-snug">
                      📄 Example {i+1}: {ex.substring(0, 65)}…
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase">💡 Expert Explanation</div>
              <div className="ng-card flex-1 p-5 text-[14px] text-ng-t1 leading-[1.8] overflow-y-auto" style={{ minHeight: '360px' }}>
                {specLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-ng-t3">
                    <div className="w-48 h-0.5 overflow-hidden rounded-full bg-ng-bdr">
                      <div className="h-full bg-ng-grad animate-[scanAnim_1.6s_ease-in-out_infinite]" style={{ width: '60%' }}/>
                    </div>
                    <div className="font-mono text-[12px] text-ng-blue">Analyzing 3GPP specification…</div>
                    <div className="font-mono text-[10px] text-ng-t4">Cross-referencing TS/TR database</div>
                  </div>
                ) : specOutput ? (
                  <div dangerouslySetInnerHTML={{ __html: fmt(specOutput) }} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-ng-t4 text-center">
                    <span className="text-4xl">📡</span>
                    <div className="font-medium text-ng-t3">Decoded explanation appears here</div>
                    <div className="text-[12px]">Paste spec text and click Decode</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
