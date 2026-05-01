'use client'
import { useState, useEffect } from 'react'
import { Article, ALL_FILTERS, getCategoryStyle } from '@/lib/types'
import ArticleCard from './ArticleCard'

export default function ArticleGrid() {
  const [articles, setArticles]   = useState<Article[]>([])
  const [filter, setFilter]       = useState('All')
  const [loading, setLoading]     = useState(true)
  const [visible, setVisible]     = useState(9)

  useEffect(() => {
    fetch('/articles.json')
      .then(r => r.json())
      .then(d => { setArticles(d.articles || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? articles : articles.filter(a => a.category === filter)
  const shown    = filtered.slice(0, visible)

  return (
    <section id="articles" className="py-16 relative z-10">
      <div className="max-w-[1360px] mx-auto px-6">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-12 bg-ng-grad" />
              <span className="font-mono text-[11px] text-ng-t4 tracking-widest uppercase">Daily Intelligence</span>
            </div>
            <h2 className="font-display font-bold text-3xl text-ng-t0 tracking-tight">Latest Articles</h2>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-ng-t4">
            <div className="w-1.5 h-1.5 rounded-full bg-ng-green animate-pulse" />
            Published daily · 8:00 AM IST
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap mb-8">
          {ALL_FILTERS.map(f => {
            const active = f === filter
            const style  = f !== 'All' ? getCategoryStyle(f) : null
            return (
              <button
                key={f}
                onClick={() => { setFilter(f); setVisible(9) }}
                className={`px-4 py-2 rounded-xl text-[12px] font-medium font-body transition-all duration-150 border ${
                  active
                    ? style
                      ? `${style.bg} ${style.text} ${style.border}`
                      : 'bg-ng-blue/15 text-ng-blue border-ng-blue/30'
                    : 'bg-ng-bg2 text-ng-t3 border-ng-bdr hover:border-ng-bdr2 hover:text-ng-t1'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="ng-card p-6 animate-pulse">
                <div className="h-5 bg-ng-bg4 rounded w-24 mb-4"/>
                <div className="h-4 bg-ng-bg4 rounded w-full mb-2"/>
                <div className="h-4 bg-ng-bg4 rounded w-4/5 mb-4"/>
                <div className="h-12 bg-ng-bg4 rounded w-full mb-4"/>
                <div className="h-3 bg-ng-bg4 rounded w-1/2"/>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-ng-t2 mb-2">No {filter} articles yet</h3>
            <p className="text-ng-t4 text-sm">More content coming soon. Check back tomorrow!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {shown.map((a, i) => (
                <ArticleCard key={a.slug} article={a} index={i} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisible(v => v + 9)}
                  className="px-8 py-3 rounded-xl border border-ng-bdr2 text-ng-t2 hover:text-ng-t0 hover:border-ng-blue/40 hover:bg-ng-blue/5 text-[14px] font-medium transition-all duration-200 font-body"
                >
                  Load more articles
                  <span className="ml-2 text-ng-t4 text-[12px]">({filtered.length - visible} remaining)</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
