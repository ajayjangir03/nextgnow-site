/**
 * TelecomGPT Widget — NextGNow.in
 * Floating AI chat assistant powered by Claude.
 * Drop one <script> tag on any page.
 */
(function () {
  'use strict';

  var SYS = "You are TelecomGPT — the AI assistant for NextGNow.in, an elite 5G NR and 6G knowledge platform. You are a wireless communications expert with 15+ years of industry experience and deep 3GPP specification knowledge (Release 15 through Release 19 and IMT-2030).\n\nYour expertise:\n• 5G NR: frame structure, numerology, OFDM, PDSCH/PUSCH/PDCCH/PUCCH/PRACH, HARQ, LDPC/Polar coding\n• MIMO & Beamforming: massive MIMO, Type I/II codebooks, CSI-RS, SRS, beam management\n• 5G Core (SBA): AMF, SMF, UPF, PCF, UDM, AUSF, NRF — N1/N2/N3/N4/N6 interfaces\n• Protocols: PDCP, RLC, MAC, PHY, NAS, NGAP, F1AP, E1AP, GTP-U, SDAP\n• O-RAN: O-DU, O-CU, O-RU, Near-RT RIC, Non-RT RIC, xApps, rApps, E2 interface\n• Network Slicing: NSSF, S-NSSAI, NSSP, end-to-end slicing\n• URLLC/IIoT: mini-slots, configured grants, PDCP duplication, TSN\n• Security: 5G-AKA, SUCI/SUPI, NAS/AS security, TS 33.501\n• 6G/IMT-2030: THz, RIS, ISAC, AI-native air interface, NTN (LEO/MEO/HAPS), cell-free MIMO\n\nStyle rules:\n- Always cite 3GPP TS/TR numbers and sections (e.g. TS 38.211 §4.3)\n- Three layers: simple analogy → technical depth → spec-level precision\n- Flag: [STANDARDIZED Rel-XX] | [UNDER STUDY] | [VENDOR-SPECIFIC]\n- Share real-world deployment caveats\n- Never confuse gNB/eNB, NR/LTE, 5GC/EPC, SA/NSA, FR1/FR2\n- Keep responses clear and well-structured with bullet points\n- You represent NextGNow.in — be helpful, precise, and engaging";

  var history = [];
  var isOpen = false;
  var isBusy = false;

  /* ── Inject Styles ── */
  var css = document.createElement('style');
  css.textContent = [
    '#tgpt-btn{position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;align-items:center;gap:10px;cursor:pointer;border:none;background:none;padding:0}',
    '#tgpt-fab{width:52px;height:52px;border-radius:16px;background:#3b82f6;box-shadow:0 4px 20px rgba(59,130,246,.4);display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}',
    '#tgpt-btn:hover #tgpt-fab{background:#2563eb;box-shadow:0 6px 28px rgba(59,130,246,.55);transform:translateY(-2px)}',
    '#tgpt-label{background:rgba(10,15,30,.92);backdrop-filter:blur(12px);border:1px solid #334155;color:#cbd5e1;font-family:Inter,sans-serif;font-size:13px;font-weight:500;padding:7px 14px;border-radius:10px;white-space:nowrap;transition:all .2s}',
    '#tgpt-btn:hover #tgpt-label{border-color:#3b82f6;color:#f1f5f9}',

    '#tgpt-panel{position:fixed;bottom:90px;right:24px;z-index:9001;width:384px;max-height:580px;background:#0a0f1e;border:1px solid #334155;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.7);display:flex;flex-direction:column;overflow:hidden;transform:translateY(12px) scale(.97);opacity:0;pointer-events:none;transition:all .25s cubic-bezier(.16,1,.3,1)}',
    '#tgpt-panel.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all}',

    '#tgpt-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1e293b;background:#030712;flex-shrink:0}',
    '#tgpt-hdr-left{display:flex;align-items:center;gap:10px}',
    '#tgpt-hdr-icon{width:32px;height:32px;border-radius:9px;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);display:flex;align-items:center;justify-content:center}',
    '#tgpt-hdr-name{font-family:Inter,sans-serif;font-size:14px;font-weight:700;color:#f1f5f9;letter-spacing:-.2px}',
    '#tgpt-hdr-sub{font-family:Inter,sans-serif;font-size:11px;color:#64748b;margin-top:1px}',
    '#tgpt-close{width:28px;height:28px;border-radius:8px;border:1px solid #334155;background:#0f172a;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;font-size:16px;line-height:1;transition:all .15s;flex-shrink:0}',
    '#tgpt-close:hover{border-color:#3b82f6;color:#f1f5f9;background:#1e293b}',

    '#tgpt-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px}',
    '#tgpt-msgs::-webkit-scrollbar{width:3px}',
    '#tgpt-msgs::-webkit-scrollbar-track{background:transparent}',
    '#tgpt-msgs::-webkit-scrollbar-thumb{background:#1e293b;border-radius:2px}',

    '.tgpt-row{display:flex;gap:8px;align-items:flex-start;animation:tgptFadeUp .25s ease}',
    '.tgpt-row.user{flex-direction:row-reverse}',
    '@keyframes tgptFadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',
    '.tgpt-av{width:28px;height:28px;border-radius:8px;border:1px solid #1e293b;background:#0f172a;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}',
    '.tgpt-av.u{background:rgba(59,130,246,.15);border-color:rgba(59,130,246,.3)}',
    '.tgpt-bubble{max-width:82%;padding:9px 12px;border-radius:12px;border:1px solid #1e293b;background:#0f172a;font-family:Inter,sans-serif;font-size:13px;line-height:1.65;color:#cbd5e1;word-break:break-word}',
    '.tgpt-bubble.u{background:rgba(59,130,246,.12);border-color:rgba(59,130,246,.25);color:#e2e8f0}',
    '.tgpt-bubble code{background:rgba(6,182,212,.1);padding:1px 5px;border-radius:4px;font-family:monospace;color:#22d3ee;font-size:.85em}',
    '.tgpt-bubble strong{color:#f1f5f9;font-weight:600}',
    '.tgpt-bubble .tgpt-sec{color:#60a5fa;font-weight:600;display:block;margin:8px 0 3px;font-size:.85em;letter-spacing:.3px}',

    '.tgpt-dots{display:flex;gap:4px;align-items:center;padding:2px 0}',
    '.tgpt-dots span{width:5px;height:5px;border-radius:50%;background:#3b82f6;animation:tgptDot 1.4s ease-in-out infinite}',
    '.tgpt-dots span:nth-child(2){animation-delay:.2s}',
    '.tgpt-dots span:nth-child(3){animation-delay:.4s}',
    '@keyframes tgptDot{0%,100%{transform:scale(.7);opacity:.4}50%{transform:scale(1.15);opacity:1}}',

    '#tgpt-quick{padding:8px 14px;display:flex;gap:6px;flex-wrap:wrap;border-top:1px solid rgba(30,41,59,.8)}',
    '.tgpt-qbtn{padding:4px 10px;border-radius:16px;border:1px solid #1e293b;background:transparent;color:#64748b;font-size:11px;font-family:Inter,sans-serif;cursor:pointer;transition:all .15s;white-space:nowrap}',
    '.tgpt-qbtn:hover{border-color:#3b82f6;color:#60a5fa;background:rgba(59,130,246,.08)}',

    '#tgpt-irow{padding:10px 14px 14px;display:flex;gap:8px;border-top:1px solid #1e293b;background:#030712;flex-shrink:0}',
    '#tgpt-inp{flex:1;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:9px 12px;color:#e2e8f0;font-family:Inter,sans-serif;font-size:13px;resize:none;overflow:hidden;transition:border-color .2s;line-height:1.5}',
    '#tgpt-inp:focus{outline:none;border-color:#3b82f6}',
    '#tgpt-inp::placeholder{color:#475569}',
    '#tgpt-send{width:36px;height:36px;border-radius:9px;border:1px solid rgba(59,130,246,.5);background:rgba(59,130,246,.15);color:#60a5fa;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;align-self:flex-end}',
    '#tgpt-send:hover{background:rgba(59,130,246,.3);border-color:#3b82f6}',
    '#tgpt-send:disabled{opacity:.4;cursor:not-allowed}',

    '#tgpt-fulllink{display:block;text-align:center;padding:10px;font-family:Inter,sans-serif;font-size:12px;color:#475569;text-decoration:none;border-top:1px solid #0f172a;transition:color .15s;background:#030712}',
    '#tgpt-fulllink:hover{color:#60a5fa}',

    '@media(max-width:480px){#tgpt-panel{right:12px;left:12px;width:auto;bottom:80px}#tgpt-label{display:none}}',
  ].join('');
  document.head.appendChild(css);

  /* ── Build DOM ── */
  var wrap = document.createElement('div');
  wrap.id = 'tgpt-wrap';
  wrap.innerHTML =
    '<button id="tgpt-btn" onclick="tgptToggle()" title="Ask TelecomGPT">' +
      '<span id="tgpt-label">Ask TelecomGPT</span>' +
      '<div id="tgpt-fab">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2"/>' +
          '<path d="M8 12h8M12 8v8"/>' +
        '</svg>' +
      '</div>' +
    '</button>' +
    '<div id="tgpt-panel">' +
      '<div id="tgpt-hdr">' +
        '<div id="tgpt-hdr-left">' +
          '<div id="tgpt-hdr-icon">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
            '</svg>' +
          '</div>' +
          '<div>' +
            '<div id="tgpt-hdr-name">TelecomGPT</div>' +
            '<div id="tgpt-hdr-sub">5G NR · 6G · 3GPP Expert</div>' +
          '</div>' +
        '</div>' +
        '<div id="tgpt-close" onclick="tgptToggle()">×</div>' +
      '</div>' +
      '<div id="tgpt-msgs"></div>' +
      '<div id="tgpt-quick">' +
        '<button class="tgpt-qbtn" onclick="tgptQ(\'Explain 5G NR numerology\')">NR Numerology</button>' +
        '<button class="tgpt-qbtn" onclick="tgptQ(\'What is PDCCH blind decoding?\')">PDCCH</button>' +
        '<button class="tgpt-qbtn" onclick="tgptQ(\'How does network slicing work?\')">Slicing</button>' +
        '<button class="tgpt-qbtn" onclick="tgptQ(\'Explain O-RAN architecture\')">O-RAN</button>' +
      '</div>' +
      '<div id="tgpt-irow">' +
        '<textarea id="tgpt-inp" rows="1" placeholder="Ask about 5G NR, 6G, 3GPP specs..."></textarea>' +
        '<button id="tgpt-send" onclick="tgptSend()" title="Send">➤</button>' +
      '</div>' +
      '<a id="tgpt-fulllink" href="/ai-chat.html">Open full AI assistant →</a>' +
    '</div>';
  document.body.appendChild(wrap);

  /* ── Welcome message ── */
  tgptAddMsg('ai', 'Hi! I\'m <strong>TelecomGPT</strong> — your 5G NR & 6G expert.\n\nAsk me anything about 3GPP specs, O-RAN, network slicing, URLLC, 6G, or any telecom topic. I\'ll cite the relevant TS/TR references.');

  /* ── Toggle ── */
  window.tgptToggle = function () {
    isOpen = !isOpen;
    document.getElementById('tgpt-panel').classList.toggle('open', isOpen);
    document.getElementById('tgpt-label').textContent = isOpen ? 'Close' : 'Ask TelecomGPT';
    if (isOpen) setTimeout(function () { document.getElementById('tgpt-inp').focus(); }, 260);
  };

  /* ── Quick prompts ── */
  window.tgptQ = function (text) {
    document.getElementById('tgpt-inp').value = text;
    tgptSend();
  };

  /* ── Format text ── */
  function fmt(t) {
    return t
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^(#{1,3}) (.+)$/gm, '<span class="tgpt-sec">$2</span>')
      .replace(/\n/g, '<br>');
  }

  /* ── Add message ── */
  function tgptAddMsg(role, text) {
    var msgs = document.getElementById('tgpt-msgs');
    var row = document.createElement('div');
    row.className = 'tgpt-row' + (role === 'user' ? ' user' : '');
    var av = document.createElement('div');
    av.className = 'tgpt-av' + (role === 'user' ? ' u' : '');
    av.textContent = role === 'user' ? '👤' : '📡';
    var bbl = document.createElement('div');
    bbl.className = 'tgpt-bubble' + (role === 'user' ? ' u' : '');
    bbl.innerHTML = fmt(text);
    if (role === 'user') { row.appendChild(bbl); row.appendChild(av); }
    else { row.appendChild(av); row.appendChild(bbl); }
    msgs.appendChild(row);
    msgs.scrollTop = msgs.scrollHeight;
    return bbl;
  }

  /* ── Typing indicator ── */
  var typingRow = null;
  function showTyping() {
    var msgs = document.getElementById('tgpt-msgs');
    typingRow = document.createElement('div');
    typingRow.className = 'tgpt-row';
    var av = document.createElement('div');
    av.className = 'tgpt-av';
    av.textContent = '📡';
    var bbl = document.createElement('div');
    bbl.className = 'tgpt-bubble';
    bbl.innerHTML = '<div class="tgpt-dots"><span></span><span></span><span></span></div>';
    typingRow.appendChild(av);
    typingRow.appendChild(bbl);
    msgs.appendChild(typingRow);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function hideTyping() {
    if (typingRow) { typingRow.remove(); typingRow = null; }
  }

  /* ── Send ── */
  window.tgptSend = async function () {
    if (isBusy) return;
    var inp = document.getElementById('tgpt-inp');
    var text = inp.value.trim();
    if (!text) return;
    document.getElementById('tgpt-quick').style.display = 'none';
    inp.value = '';
    inp.style.height = 'auto';
    isBusy = true;
    document.getElementById('tgpt-send').disabled = true;
    history.push({ role: 'user', content: text });
    tgptAddMsg('user', text);
    showTyping();
    try {
      var res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYS,
          messages: history
        })
      });
      var data = await res.json();
      if (data.error) throw new Error(data.error.message);
      var reply = data.content[0].text;
      hideTyping();
      history.push({ role: 'assistant', content: reply });
      tgptAddMsg('ai', reply);
    } catch (e) {
      hideTyping();
      tgptAddMsg('ai', '⚠️ Connection error. Please try again.');
    }
    isBusy = false;
    document.getElementById('tgpt-send').disabled = false;
    inp.focus();
  };

  /* ── Input auto-resize + Enter key ── */
  document.addEventListener('DOMContentLoaded', function () {});
  setTimeout(function () {
    var inp = document.getElementById('tgpt-inp');
    if (!inp) return;
    inp.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); tgptSend(); }
    });
  }, 100);

})();
