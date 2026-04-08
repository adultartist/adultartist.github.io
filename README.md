# Adult Artist | 翻譯家 / 內容創作者 - 個人官方網站

這是一個專為「Adult Artist」量身打造的個人官方網站與數位內容空間。整體風格採用深邃的 **暗黑科技風 (Hacker/Cyberpunk Aesthetic)**，並提供順暢的瀏覽與互動體驗。

### 🛠 開發技術棧
- **Next.js (App Router)**：擔任全站核心架構與路由管理。
- **Tailwind CSS**：高度客製化設計系統，打造黑客終端機視覺。
- **Framer Motion**：提供文章頁面流暢的「靈魂拷問」等過渡互動動畫。

---

## 📂 目錄結構說明

以下是整理過後的專案核心結構：

```text
adultartist.github.io/
├── _archive/                # [備份] 存放舊版 HTML 檔案，不參與 Next.js 編譯
├── public/                  # 存放全域靜態資源 (如圖片、favicon)
├── src/
│   ├── app/                 # 核心頁面與路由 (Page Routing)
│   │   ├── article/[id]/    # 文章獨立內頁 (動態路由)
│   │   ├── globals.css      # 全域樣式庫與 Tailwind Token 設定
│   │   └── page.tsx         # 網站首頁
│   │
│   ├── components/          # React 元件庫
│   │   ├── layout/          # 排版相關元件 (如未來獨立的 Navbar, Footer)
│   │   └── ui/              # 互動介面元件 (DecodeText, SoulSearching 等特效)
│   │
│   └── content/
│       └── articles/        # 📝 [寫作區] 未來所有 Markdown (MDX) 文章都會存放在這裡！
│
├── next.config.mjs          # Next.js 核心設定
├── tailwind.config.ts       # Tailwind 樣式設計系統設定
└── package.json             # 專案依賴與腳本
```

---

## 🚀 本地開發與啟動指令

如果你需要啟動伺服器進行開發預覽，請打開終端機 (Terminal) 並輸入：

```bash
# 啟動本地開發伺服器 (附帶熱更新 HMR)
npm run dev
```

如果你需要將整份網站打包成靜態檔案 (供部署至 GitHub Pages 等服務)：

```bash
# 生成 Production 靜態版本 (預設為 export 輸出)
npm run build
```

---

## 📝 如何發佈新文章？

未來的文章系統已經設計為友善的檔案讀取模式，不需再透過改動 `page.tsx` 程式碼來發佈文章。請依照以下步驟新增：

### 1. 檔案要存放在哪裡？
所有新文章請存放至 `src/content/articles/` 資料夾下。

### 2. 副檔名要用什麼？
請使用 `.mdx` (建議，支援 React 互動元件) 或 `.md` 作為副檔名。檔案名稱建議使用英文小寫或數字建立唯一 ID，例如 `my-first-post.mdx`。

### 3. 文章的 Meta 資訊 (Frontmatter) 格式
每篇新文章的**最上方**，都必須放置一塊用 `---` 夾住的區域，這被稱為 Frontmatter。它用來告訴系統這篇文章的基本屬性。

**範例模板：**

\`\`\`mdx
---
title: "你的新文章標題寫在這裡"
date: "2026-04-10"
category: "心得隨筆"
excerpt: "這是一段簡潔的摘要，會顯示在首頁的文章列表上。如果不填寫這行，系統也會自動幫你從內文抓前 100 字。"
isPinned: false
---

這裡開始寫你的 Markdown 內文...

你可以使用標準的 `## 標題` 或 `> 引用文字` 來排版！
如果你採用了 `.mdx`，甚至可以直接在這邊呼叫 `<SoulSearching />`！
\`\`\`

- 若 `isPinned: true` -> 會自動出現在首頁的「# PINNED_ARTICLES」區塊。
- 若 `isPinned: false` -> 會依據 `date` 日期排序，自動進入「# RECENT_LOGS」區塊並自動分頁！
