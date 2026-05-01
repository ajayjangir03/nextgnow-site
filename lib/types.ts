export interface Article {
  title:    string
  slug:     string
  url:      string
  category: string
  excerpt:  string
  date:     string
  tags:     string[]
  type:     'auto' | 'manual'
}

export interface ArticlesData {
  articles: Article[]
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Latest News':       { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: '#10B981' },
  'Concept Guide':     { bg: 'bg-violet-500/10',  text: 'text-violet-400',  border: 'border-violet-500/20',  dot: '#8B5CF6' },
  'Protocol Deep Dive':{ bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20',    dot: '#3B82F6' },
  'Industry Trends':   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20',   dot: '#F59E0B' },
  'Interview Prep':    { bg: 'bg-red-500/10',      text: 'text-red-400',     border: 'border-red-500/20',     dot: '#EF4444' },
  'Future Tech':       { bg: 'bg-cyan-500/10',     text: 'text-cyan-400',    border: 'border-cyan-500/20',    dot: '#06B6D4' },
  'Call Flow':         { bg: 'bg-teal-500/10',     text: 'text-teal-400',    border: 'border-teal-500/20',    dot: '#14B8A6' },
  '5G':                { bg: 'bg-blue-500/10',     text: 'text-blue-400',    border: 'border-blue-500/20',    dot: '#3B82F6' },
  '6G':                { bg: 'bg-violet-500/10',   text: 'text-violet-400',  border: 'border-violet-500/20',  dot: '#8B5CF6' },
  'Open RAN':          { bg: 'bg-amber-500/10',    text: 'text-amber-400',   border: 'border-amber-500/20',   dot: '#F59E0B' },
}

export function getCategoryStyle(category: string) {
  return CATEGORY_COLORS[category] ?? {
    bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: '#3B82F6',
  }
}

export const ALL_FILTERS = [
  'All', 'Latest News', 'Concept Guide', 'Protocol Deep Dive',
  'Industry Trends', 'Interview Prep', 'Future Tech', 'Call Flow',
]
