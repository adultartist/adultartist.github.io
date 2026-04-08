import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// MDX 檔案放置的目錄
const articlesDirectory = path.join(process.cwd(), 'src', 'content', 'articles');

export type ArticleFrontmatter = {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  isPinned: boolean;
  readTime?: string;
};

export type ArticleData = ArticleFrontmatter & {
  content: string;
};

/**
 * 自動從純文字擷取摘要（去除 HTML 或 MD 標籤後的前 100 字）
 */
function generateExcerpt(content: string): string {
  // 簡易去除 Markdown `#`, `>` 等符號與 HTML 標籤
  const plainText = content
    .replace(/<[^>]*>?/gm, '')
    .replace(/[#*>_~`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return plainText.length > 100 
    ? plainText.substring(0, 100) + '...'
    : plainText;
}

/**
 * 讀取所有文章
 */
export function getArticles(): ArticleFrontmatter[] {
  // 確認目錄存在
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      // 移除副檔名作為 ID
      const id = fileName.replace(/\.mdx?$/, '');

      // 讀取檔案內容
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // 解析 frontmatter (使用 gray-matter)
      const matterResult = matter(fileContents);
      
      const frontmatter = matterResult.data as Partial<ArticleFrontmatter>;

      return {
        id,
        title: frontmatter.title || '無標題',
        date: frontmatter.date || '1970-01-01',
        category: frontmatter.category || '未分類',
        excerpt: frontmatter.excerpt || generateExcerpt(matterResult.content),
        isPinned: frontmatter.isPinned || false,
        readTime: frontmatter.readTime || '5 min read',
      } as ArticleFrontmatter;
    });

  // 依照日期由新到舊排序
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 根據 ID 讀取單一文章的完整內容 (包含內文)
 */
export function getArticleById(id: string): ArticleData | null {
  const fullPathMdx = path.join(articlesDirectory, `${id}.mdx`);
  const fullPathMd = path.join(articlesDirectory, `${id}.md`);
  
  let fileContents = '';
  
  if (fs.existsSync(fullPathMdx)) {
    fileContents = fs.readFileSync(fullPathMdx, 'utf8');
  } else if (fs.existsSync(fullPathMd)) {
    fileContents = fs.readFileSync(fullPathMd, 'utf8');
  } else {
    return null;
  }

  const matterResult = matter(fileContents);
  const frontmatter = matterResult.data as Partial<ArticleFrontmatter>;
  
  return {
    id,
    title: frontmatter.title || '無標題',
    date: frontmatter.date || '1970-01-01',
    category: frontmatter.category || '未分類',
    excerpt: frontmatter.excerpt || generateExcerpt(matterResult.content),
    isPinned: frontmatter.isPinned || false,
    readTime: frontmatter.readTime || '5 min read',
    content: matterResult.content
  };
}
