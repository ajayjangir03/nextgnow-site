import { Article, getCategoryStyle } from '@/lib/types'

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  const style = getCategoryStyle(article.category)

  return (
    <a
      href={article.url}
      className="ng-card article-card flex flex-col p-6 text-decoration-none fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Category badge */}
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[.08em] uppercase px-2.5 py-1 rounded-md border mb-4 w-fit font-mono ${style.bg} ${style.text} ${style.border}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
        {article.category}
      </span>

      {/* Title */}
      <h3 className="font-display font-bold text-[15px] text-ng-t0 leading-snug mb-3 tracking-tight group-hover:text-ng-blue transition-colors flex-grow-0">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-[13px] text-ng-t3 leading-relaxed flex-1 mb-5 font-light line-clamp-3">
        {(article.excerpt || '').substring(0, 140)}{(article.excerpt || '').length > 140 ? '…' : ''}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-ng-bdr mt-auto">
        <span className="text-[11px] text-ng-t4 font-body">{article.date} · 5 min read</span>
        <span className="text-[12px] font-medium flex items-center gap-1 transition-all duration-150" style={{ color: style.dot }}>
          Read
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </a>
  )
}
