import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ng: {
          bg:    '#03060E',
          bg1:   '#060D1C',
          bg2:   '#0A1628',
          bg3:   '#101E38',
          bg4:   '#172540',
          bdr:   '#132033',
          bdr2:  '#1C324F',
          bdr3:  '#234070',
          blue:  '#3B82F6',
          blue2: '#1D4ED8',
          cyan:  '#06B6D4',
          green: '#10B981',
          amber: '#F59E0B',
          purp:  '#8B5CF6',
          red:   '#EF4444',
          t0:    '#F8FAFC',
          t1:    '#CBD5E1',
          t2:    '#94A3B8',
          t3:    '#64748B',
          t4:    '#475569',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'ng-grad': 'linear-gradient(135deg, #3B82F6, #06B6D4)',
        'ng-grad-v': 'linear-gradient(180deg, #3B82F6, #06B6D4)',
        'ng-mesh': `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,.14), transparent),
          linear-gradient(rgba(59,130,246,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,.025) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'mesh': '100% 100%, 56px 56px, 56px 56px',
      },
      animation: {
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'ticker':      'ticker 30s linear infinite',
        'radar-spin':  'radarSpin 4s linear infinite',
        'ring-pulse':  'ringPulse 3s ease-in-out infinite',
        'fade-up':     'fadeUp .4s ease both',
        'glow':        'glow 2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        radarSpin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ringPulse: {
          '0%,100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':     { opacity: '0.7', transform: 'scale(1.02)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,.3)' },
          '50%':     { boxShadow: '0 0 40px rgba(59,130,246,.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
