"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleFrontmatter } from "@/lib/articles";

export default function RecentArticlesDisplay({ articles }: { articles: ArticleFrontmatter[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(articles.length / itemsPerPage) || 1;
  const currentRecentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return articles.slice(start, start + itemsPerPage);
  }, [articles, currentPage]);

  return (
    <section id="recent" className="container mx-auto px-6">
      <h2 className="text-3xl font-bold font-mono text-text-title mb-8 border-b border-white/10 pb-4 inline-block">
        # RECENT_LOGS
      </h2>
      
      <div className="space-y-4">
        {currentRecentData.map(article => (
          <Link key={article.id} href={`/article/${article.id}`} className="block">
            <div className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-white/5 rounded-xl bg-transparent hover:border-accent-cyan/50 hover:bg-white/5 transition-all">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-bold text-text-title mb-2 group-hover:text-accent-cyan transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-text-body mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-text-comment font-mono text-sm">{article.date}</span>
                  <span className="text-white/20">|</span>
                  <span className="text-xs text-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <ArrowRight className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all mt-4 sm:mt-0" />
            </div>
          </Link>
        ))}
        {currentRecentData.length === 0 && (
          <div className="text-text-muted font-mono py-8">No recent logs found...</div>
        )}
      </div>

      {/* 分頁器 */}
      {articles.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-12 font-mono">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors text-text-muted"
          >
            &lt; PREV
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-accent-cyan text-base-dark font-bold' 
                    : 'text-text-muted hover:bg-white/10'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors text-text-muted"
          >
            NEXT &gt;
          </button>
        </div>
      )}
    </section>
  );
}
