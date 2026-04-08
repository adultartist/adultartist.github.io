import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, Terminal } from "lucide-react";
import SoulSearching from "@/components/ui/SoulSearching";
import DecodeText from "@/components/ui/DecodeText";
import { getArticleById, getArticles } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({ id: article.id }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  // 設定傳遞給 MDX 的自定義組件與原生標籤樣式
  const mdxComponents = {
    SoulSearching,
    DecodeText,
    Terminal,
    h2: (props: any) => <h2 className="text-2xl mt-12 mb-6 text-accent-cyan font-bold font-mono" {...props} />,
    h3: (props: any) => <h3 className="text-xl mt-8 mb-4 font-bold font-mono text-text-title" {...props} />,
    p: (props: any) => <p className="text-text-body leading-relaxed mb-6" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-accent-orange pl-6 italic text-text-muted my-6" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-6 space-y-2 mb-6 text-text-body" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-text-body" {...props} />,
    li: (props: any) => <li className="my-1" {...props} />,
    code: (props: any) => <code className="text-accent-orange bg-white/5 px-1 py-0.5 rounded" {...props} />,
    strong: (props: any) => <strong className="text-accent-cyan font-bold" {...props} />,
  };

  return (
    <article className="container mx-auto px-6 max-w-3xl pt-20 pb-32">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan font-mono text-sm mb-12 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform border border-transparent group-hover:border-accent-cyan rounded bg-black/40" />
        // RETURN_TO_BASE
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-title tracking-tight mb-6 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-text-muted font-mono text-sm border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {article.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {article.readTime}
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className="text-xs text-accent-orange bg-accent-orange/10 px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
        </div>
      </header>

      <div>
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>
      
      <footer className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-sm font-mono text-text-muted">
        <div>ID: {params.id}</div>
        <div>status: FINISHED</div>
      </footer>
    </article>
  );
}
