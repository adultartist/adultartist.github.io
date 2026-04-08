import Link from "next/link";
import { Terminal } from "lucide-react";
import DecodeText from "@/components/ui/DecodeText";
import SoulSearching from "@/components/ui/SoulSearching";
import RecentArticlesDisplay from "@/components/ui/RecentArticlesDisplay";
import { getArticles } from "@/lib/articles";

export default async function Home() {
  const articles = getArticles();
  // 置頂文章按照 id 字母順序排列 (p1, p2, p3...)，以確保首頁固定順序
  const pinnedArticles = articles
    .filter(a => a.isPinned)
    .sort((a, b) => a.id.localeCompare(b.id));
  const recentArticles = articles.filter(a => !a.isPinned);

  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* Hero 區塊 */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-cyan/10 via-base-dark to-base-dark z-0"></div>
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-mono text-text-title tracking-tighter mb-6">
            <DecodeText text="探索語言與藝術的交界" />
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-mono">
            // Developer_ // Writer_ // Translator_
          </p>
        </div>
      </section>

      {/* About 區塊 */}
      <section id="about" className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold font-mono text-accent-cyan flex items-center gap-4">
              <Terminal size={32} />
              ABOUT.exe
            </h2>
            <p className="text-text-body text-lg leading-relaxed">
              哈囉！我是 Adult Artist，一名用翻譯幫助大家理解成人內容的藝術家。我深信每件作品背後都有其獨特的魅力與故事，透過精準且富有溫度的在地化翻譯，我希望能打破語言的隔閡，帶領大家更深入探索這些作品背後的藝術境界。
            </p>
            <div className="flex flex-wrap gap-3">
              {['日中翻譯', '英中翻譯', '在地化 (Localization)', '文化解析', '內容創作'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm leading-6">
            <div className="flex px-4 py-2 bg-black/40 border-b border-white/10 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-6 text-[#d4d4d4]">
              <p><span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">creator</span> = {'{'}</p>
              <p className="pl-6"><span className="text-[#9cdcfe]">name</span>: <span className="text-[#ce9178]">&apos;Adult Artist&apos;</span>,</p>
              <p className="pl-6"><span className="text-[#9cdcfe]">title</span>: <span className="text-[#ce9178]">&apos;翻譯家 / 內容創作者&apos;</span>,</p>
              <p className="pl-6"><span className="text-[#9cdcfe]">status</span>: <span className="text-[#ce9178]">&apos;Translating && Creating&apos;</span>,</p>
              <p className="pl-6"><span className="text-[#9cdcfe]">focused</span>: <span className="text-[#569cd6]">true</span></p>
              <p>{'};'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 互動組件展示 */}
      <section className="container mx-auto px-6">
        <SoulSearching />
      </section>

      {/* 置頂文章 */}
      <section id="pinned" className="container mx-auto px-6">
        <h2 className="text-3xl font-bold font-mono text-text-title mb-8 border-b border-white/10 pb-4 inline-block">
          # PINNED_ARTICLES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pinnedArticles.map(article => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <div className="group h-full p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-1">
                <div className="text-accent-orange text-xs font-mono mb-3">{article.date}</div>
                <h3 className="text-xl font-bold text-text-title mb-4 group-hover:text-accent-cyan transition-colors">
                  {article.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-text-comment bg-black/40 px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 近期文章 */}
      <RecentArticlesDisplay articles={recentArticles} />
    </div>
  );
}
