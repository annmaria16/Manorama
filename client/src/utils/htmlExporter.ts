import { GeneratedArticle, Language } from '../types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const LANGUAGE_DETAILS: Record<Language, { name: string; nativeName: string; pubName: string; fontStack: string }> = {
  ml: {
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    pubName: 'Manorama Online / മലയാള മനോരമ',
    fontStack: '"Anek Malayalam", "Noto Serif Malayalam", "Manjari", "Gayathri", sans-serif'
  },
  en: {
    name: 'English',
    nativeName: 'English',
    pubName: 'Onmanorama',
    fontStack: 'Merriweather, Georgia, Cambria, "Times New Roman", serif'
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिंदी',
    pubName: 'Manorama National Hindi',
    fontStack: '"Anek Devanagari", "Noto Sans Devanagari", sans-serif'
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    pubName: 'Manorama Tamil Special',
    fontStack: '"Anek Tamil", "Noto Sans Tamil", sans-serif'
  },
  te: {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    pubName: 'Manorama Telugu Special',
    fontStack: '"Anek Telugu", "Noto Sans Telugu", sans-serif'
  }
};

export function generateStandaloneHtml(article: GeneratedArticle): string {
  const meta = LANGUAGE_DETAILS[article.targetLanguage] || LANGUAGE_DETAILS.en;
  const dateStr = new Date(article.generatedAt || Date.now()).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const escapedHeadline = escapeHtml(article.headline);
  const escapedSummary = escapeHtml(article.summary);
  const escapedLead = escapeHtml(article.leadParagraph);
  const escapedBody = article.bodyParagraphs.map(p => `<p class="body-p">${escapeHtml(p)}</p>`).join('\n');
  const escapedClosing = article.closingParagraph ? `<p class="body-p closing-p">${escapeHtml(article.closingParagraph)}</p>` : '';
  const escapedKeywords = (article.keywords || [])
    .map(k => `<span class="tag">#${escapeHtml(k)}</span>`)
    .join(' ');

  return `<!DOCTYPE html>
<html lang="${article.targetLanguage}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedHeadline} | ${meta.pubName}</title>
  <meta name="description" content="${escapedSummary}">
  <meta name="generator" content="Manorama AI Desk Studio">
  <meta name="author" content="Manorama Special Bureau">
  <style>
    /* Standalone Offline CSS - Zero External Dependencies */
    :root {
      --primary-red: #D9232D;
      --deep-navy: #0F1E36;
      --text-main: #1E293B;
      --text-muted: #64748B;
      --border-color: #E2E8F0;
      --bg-cream: #F8FAFC;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ${meta.fontStack};
      line-height: 1.8;
      color: var(--text-main);
      background-color: var(--bg-cream);
      padding: 0;
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    .top-bar {
      background-color: var(--primary-red);
      color: #ffffff;
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }

    .brand-title {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-badge {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .container {
      max-width: 840px;
      margin: 40px auto;
      background: #ffffff;
      padding: 50px;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(15, 30, 54, 0.07);
      border: 1px solid var(--border-color);
    }

    .article-meta-header {
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 24px;
      margin-bottom: 30px;
    }

    .lang-pill {
      display: inline-block;
      background-color: #FEE2E2;
      color: var(--primary-red);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 16px;
    }

    .headline {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.3;
      color: var(--deep-navy);
      margin-bottom: 20px;
      letter-spacing: -0.5px;
    }

    .standfirst {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.65;
      color: #334155;
      border-left: 4px solid var(--primary-red);
      padding-left: 18px;
      margin-bottom: 26px;
      background-color: #FFF5F5;
      padding-top: 12px;
      padding-bottom: 12px;
      border-radius: 0 8px 8px 0;
    }

    .byline-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--text-muted);
      padding-top: 14px;
      border-top: 1px dashed var(--border-color);
    }

    .article-content {
      font-size: 1.125rem;
      color: #1E293B;
    }

    .lead-paragraph {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.8;
      color: #0F172A;
      margin-bottom: 26px;
    }

    .body-p {
      margin-bottom: 22px;
      text-align: justify;
      hyphens: auto;
    }

    .closing-p {
      padding-top: 14px;
      border-top: 1px solid var(--border-color);
      font-style: italic;
      color: #475569;
    }

    .tags-container {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background: #F1F5F9;
      color: #475569;
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .footer {
      max-width: 840px;
      margin: 20px auto 60px;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    @media print {
      body {
        background: #ffffff;
      }
      .container {
        box-shadow: none;
        border: none;
        padding: 0;
        margin: 0;
        max-width: 100%;
      }
      .top-bar, .footer {
        display: none;
      }
    }

    @media (max-width: 640px) {
      .container {
        padding: 24px 18px;
        margin: 16px 12px;
      }
      .headline {
        font-size: 1.7rem;
      }
      .standfirst {
        font-size: 1.05rem;
      }
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="brand-title">
      <span>${meta.pubName}</span>
    </div>
    <div class="brand-badge">Manorama AI Desk &bull; ${meta.nativeName} Offline Edition</div>
  </header>

  <main class="container">
    <article>
      <header class="article-meta-header">
        <span class="lang-pill">${meta.name} (${meta.nativeName}) Journalism</span>
        <h1 class="headline">${escapedHeadline}</h1>
        <div class="standfirst">${escapedSummary}</div>
        <div class="byline-row">
          <span><strong>Bureau:</strong> Manorama Multilingual Newsroom</span>
          <span><strong>Published:</strong> ${dateStr}</span>
          <span><strong>Metrics:</strong> ${article.wordCount} words &bull; ${article.readingTimeMinutes} min read</span>
        </div>
      </header>

      <section class="article-content">
        <p class="lead-paragraph">${escapedLead}</p>
        ${escapedBody}
        ${escapedClosing}
      </section>

      ${article.keywords && article.keywords.length > 0 ? `
      <div class="tags-container">
        ${escapedKeywords}
      </div>` : ''}
    </article>
  </main>

  <footer class="footer">
    <p>Generated by <strong>Manorama AI Desk</strong> &bull; Intelligent Multilingual Newsroom Studio</p>
    <p>Preserves native journalistic conventions &bull; Standalone HTML offline format</p>
  </footer>
</body>
</html>`;
}

export function downloadStandaloneHtml(article: GeneratedArticle): void {
  const htmlContent = generateStandaloneHtml(article);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const safeTitle = article.headline
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30) || 'news-article';

  const filename = `manorama-${article.targetLanguage}-${safeTitle}-${Date.now().toString().slice(-4)}.html`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
