'use client'
import { useState } from 'react'

const LOG_TYPES = ['NAS / Non-Access Stratum', 'RRC / Radio Resource Control', 'NGAP / N2 Interface', 'F1AP / F1 Interface', 'PDCP / RLC / MAC', 'HTTP/2 SBI (5G Core)', 'Auto-detect']
const EXAMPLES: Record<string, string> = {
  NAS: `[NAS][0.000] UE->NW: Registration Request
  5GS Registration type: Initial Registration
  SUCI: suci-0-001-01-0000-0-0-0000000001
  UE security capability: EA0 EA1_128 EA2_128 IA1_128 IA2_128
  Requested NSSAI: S-NSSAI 01-000001

[NAS][0.012] NW->UE: Authentication Request
  Authentication challenge: RAND=A3B4C5D6... AUTN=F1E2D3C4...

[NAS][0.025] UE->NW: Authentication Response
  RES*: 7A8B9C0D1E2F3A4B

[NAS][0.038] NW->UE: Security Mode Command
  NAS security algorithms: EA2_128 IA2_128
  Replayed UE security capabilities

[NAS][0.051] UE->NW: Security Mode Complete
[NAS][0.064] NW->UE: Registration Accept
  5G-GUTI: MCC=001 MNC=01 AMF-ID=0001 TMSI=12345678`,

  NGAP: `[NGAP][0.000] gNB->AMF: InitialUEMessage
  RAN-UE-NGAP-ID: 1001
  NAS-PDU: (Registration Request)
  UserLocationInformation: NR-CGI: {PLMN: 001-01, NR-Cell-ID: 0x12345}
  RRCEstablishmentCause: mo-Signalling

[NGAP][0.015] AMF->gNB: DownlinkNASTransport
  AMF-UE-NGAP-ID: 5001
  RAN-UE-NGAP-ID: 1001
  NAS-PDU: (Authentication Request)

[NGAP][0.055] AMF->gNB: InitialContextSetupRequest
  UE-Aggregate-MaximumBitrate: DL=1000000000 UL=100000000
  GUAMI: {PLMN: 001-01, AMF-Region: 1, AMF-Set: 1, AMF-Pointer: 1}
  PDUSessionResourceSetupListCxtReq: (PDU Session ID: 1)`
}

const SYS = `You are SpectrumAI, an expert telecom protocol engineer specializing in 5G NAS, RRC, NGAP, F1AP, and core network interfaces. Analyze the provided telecom log and:
1. Identify the protocol and message types present
2. Decode each message's key fields and their significance
3. Explain the overall flow and what it represents in the network
4. Highlight any anomalies, errors, or notable observations
5. Provide the relevant 3GPP spec reference (TS/TR number and section) for key procedures
Format your analysis clearly with sections for: Flow Summary, Message-by-Message Analysis, Key Observations, and Spec References.`

export default function LogAnalyzerClient() {
  const [logText, setLogText] = useState('')
  const [logType, setLogType] = useState('Auto-detect')
  const [result, setResult]   = useState('')
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!logText.trim() || loading) return
    setLoading(true); setResult('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1500,
          system: SYS,
          messages: [{ role: 'user', content: `Log type: ${logType}\n\nTelecom Log:\n${logText}` }]
        })
      })
      const d = await res.json()
      if (d.error) throw new Error(d.error.message)
      setResult(d.content[0].text)
    } catch (e: any) {
      setResult(`⚠️ Error: ${e.message}`)
    }
    setLoading(false)
  }

  function fmt(t: string) {
    return t
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong class="text-ng-t0 font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g,'<code class="bg-ng-cyan/10 text-ng-cyan px-1.5 py-0.5 rounded text-[.82em] font-mono">$1</code>')
      .replace(/^## (.+)$/gm,'<div class="text-emerald-400 font-semibold mt-5 mb-2 text-sm tracking-wide border-b border-ng-bdr pb-1">$1</div>')
      .replace(/^# (.+)$/gm,'<div class="text-emerald-400 font-bold mt-4 mb-2 text-base">$1</div>')
      .replace(/^- (.+)$/gm,'<div class="flex gap-2 my-1"><span class="text-ng-t4 flex-shrink-0">•</span><span>$1</span></div>')
      .replace(/\n/g,'<br/>')
  }

  return (
    <div className="max-w-[1360px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold tracking-[.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered Protocol Analysis
        </div>
        <h1 className="font-display font-extrabold text-[42px] leading-tight tracking-tight text-ng-t0 mb-3">
          Telecom <span className="grad-text">Log Analyzer</span>
        </h1>
        <p className="text-[15px] text-ng-t2 font-light max-w-[580px] leading-relaxed">
          Paste 5G NAS, RRC, NGAP, F1AP or SBI logs — get AI-powered protocol analysis with field decoding, flow explanation and 3GPP spec references.
        </p>
      </div>

      {/* Supported protocols */}
      <div className="flex gap-2 flex-wrap mb-8">
        {['NAS (Non-Access Stratum)', 'RRC', 'NGAP / N2', 'F1AP / F1', 'PDCP / RLC / MAC', 'HTTP/2 SBI', 'Wireshark Export'].map(p => (
          <span key={p} className="font-mono text-[10px] text-ng-t3 border border-ng-bdr px-3 py-1 rounded-full bg-ng-bg2">{p}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase">📋 Paste Log Output</div>
            <select
              value={logType}
              onChange={e => setLogType(e.target.value)}
              className="bg-ng-bg2 border border-ng-bdr2 text-ng-t2 text-[12px] px-3 py-1.5 rounded-lg outline-none font-mono cursor-pointer hover:border-ng-bdr3 transition-colors"
            >
              {LOG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <textarea
            value={logText}
            onChange={e => setLogText(e.target.value)}
            placeholder={"Paste your telecom log here...\n\nSupported formats:\n• 5G NAS Registration / PDU Session traces\n• NGAP / N2 interface messages\n• RRC protocol logs\n• Wireshark / Tshark exports\n• 5G Core SBI HTTP/2 traces"}
            className="bg-ng-bg2 border border-ng-bdr2 rounded-xl p-4 text-ng-t1 font-mono text-[12.5px] leading-relaxed resize-none outline-none transition-colors focus:border-ng-green placeholder:text-ng-t4"
            style={{ minHeight: '300px' }}
          />

          <button
            onClick={analyze}
            disabled={loading || !logText.trim()}
            className="py-3.5 rounded-xl text-white font-semibold text-[14px] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform font-body flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)' }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Log…
              </>
            ) : (
              <>
                🔬 Analyze Protocol Log
              </>
            )}
          </button>

          {/* Quick examples */}
          <div>
            <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase mb-3">Load Example Log</div>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(EXAMPLES).map(k => (
                <button key={k} onClick={() => { setLogText(EXAMPLES[k]); setLogType(k === 'NAS' ? 'NAS / Non-Access Stratum' : 'NGAP / N2 Interface') }}
                  className="px-4 py-2 rounded-lg border border-ng-bdr bg-ng-bg2 text-ng-t3 text-[12px] hover:border-emerald-500/40 hover:text-emerald-400 transition-all font-mono">
                  {k} Example
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <div className="font-mono text-[10px] text-ng-t4 tracking-widest uppercase">🔬 Protocol Analysis</div>
          <div className="ng-card p-5 text-[13.5px] text-ng-t1 leading-[1.8] overflow-y-auto flex-1" style={{ minHeight: '420px' }}>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-ng-t3">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-emerald-500/40 animate-ping" style={{ animationDelay: '.2s' }} />
                  <div className="absolute inset-4 rounded-full bg-emerald-500/20 animate-pulse" />
                </div>
                <div className="font-mono text-[12px] text-emerald-400">Decoding protocol messages…</div>
                <div className="font-mono text-[10px] text-ng-t4">Cross-referencing 3GPP specifications</div>
              </div>
            ) : result ? (
              <div dangerouslySetInnerHTML={{ __html: fmt(result) }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-ng-t4 text-center">
                <span className="text-5xl">🔬</span>
                <div className="font-medium text-ng-t3 text-[14px]">Analysis results appear here</div>
                <div className="text-[12px] max-w-[240px] leading-relaxed">
                  Paste a telecom log and click Analyze to get AI-powered protocol decoding
                </div>
              </div>
            )}
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '⚡', label: 'Instant Analysis', desc: 'Results in seconds' },
              { icon: '📚', label: '3GPP Referenced', desc: 'TS/TR citations included' },
              { icon: '🔒', label: 'Private', desc: 'Logs not stored' },
            ].map(c => (
              <div key={c.label} className="ng-card p-3 text-center">
                <div className="text-lg mb-1">{c.icon}</div>
                <div className="text-[11px] font-semibold text-ng-t1">{c.label}</div>
                <div className="text-[10px] text-ng-t4">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
