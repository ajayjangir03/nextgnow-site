import Link from 'next/link'

const LINKS = {
  Topics:  [
    { label: '6G + AI',         href: '/?filter=6G'        },
    { label: '5G',              href: '/?filter=5G'        },
    { label: 'Log Analysis',    href: '/log-analysis/'     },
    { label: '3GPP Releases',   href: '/?filter=3GPP'      },
    { label: 'Call Flows',      href: '/?filter=Call Flow' },
    { label: 'Open RAN',        href: '/?filter=Open RAN'  },
  ],
  Tools: [
    { label: 'SpectrumAI',      href: '/speciq/'           },
    { label: 'Spec Decoder',    href: '/speciq/#decoder'   },
    { label: 'Log Analyzer',    href: '/log-analysis/'     },
    { label: 'All Tools',       href: '/tools/'            },
  ],
  Platform: [
    { label: 'Latest Articles', href: '/#articles'         },
    { label: 'About NextGNow',  href: '/#about'            },
    { label: 'Contact',         href: 'mailto:hello@nextgnow.in' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-ng-bdr bg-ng-bg1 relative z-10 mt-0">
      <div className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-[10px] grad-bg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 12h2m16 0h2M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <span className="font-display font-extrabold text-[19px] text-ng-t0 tracking-tight">NextG<span className="text-ng-cyan">Now</span></span>
            </Link>
            <p className="text-[13px] text-ng-t3 leading-relaxed mb-5 font-light max-w-[280px]">
              Tomorrow&apos;s telecom, explained today. Daily 5G, 6G and 3GPP intelligence for engineers and professionals.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
                { label: 'X', href: 'https://x.com', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-ng-bdr2 bg-ng-bg2 flex items-center justify-center text-ng-t4 hover:text-ng-blue hover:border-ng-blue/40 hover:bg-ng-blue/8 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="font-mono text-[10px] font-medium tracking-widest uppercase text-ng-t4 mb-4">{title}</div>
              <ul className="flex flex-col gap-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="text-[13px] text-ng-t3 hover:text-ng-t0 transition-colors font-body">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ng-bdr flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-ng-t4">
            © {new Date().getFullYear()} NextGNow · nextgnow.in · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Use'].map(l => (
              <a key={l} href="#" className="text-[12px] text-ng-t4 hover:text-ng-t2 transition-colors">{l}</a>
            ))}
            <span className="text-[12px] text-ng-t4">· AI by <span className="text-ng-cyan">SpectrumAI</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
