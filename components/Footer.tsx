import Link from 'next/link'

const COLS = {
  Topics: [
    '6G + AI', '5G', 'Log Analysis', '3GPP Releases', 'Call Flows', 'Open RAN',
  ],
  Tools: [
    'SpectrumAI', 'Spec Decoder', 'Log Analyzer', 'Call Flow Viewer',
  ],
  Platform: [
    'Latest Articles', 'About', 'Contact',
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#132033] bg-[#060D1C] relative z-10">
      <div className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-[10px] grad-bg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <span className="font-['Syne'] font-extrabold text-[19px] text-[#F8FAFC] tracking-tight">
                NextG<span className="text-[#06B6D4]">Now</span>
              </span>
            </div>
            <p className="text-[13px] text-[#64748B] leading-relaxed mb-6 max-w-[260px] font-light">
              Tomorrow&apos;s telecom, explained today. Deep technical knowledge for engineers and professionals.
            </p>
            <div className="flex gap-2">
              {[
                { href: 'https://linkedin.com', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: 'https://x.com', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#1C324F] bg-[#0A1628] flex items-center justify-center text-[#475569] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <div className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase text-[#475569] mb-4">
                {title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-[#64748B] hover:text-[#F8FAFC] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#132033] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#475569]">
            © {new Date().getFullYear()} NextGNow · nextgnow.in · All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use'].map((l) => (
              <a key={l} href="#" className="text-[12px] text-[#475569] hover:text-[#94A3B8] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
