import { GeneratedArticle, Language } from '../types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateStandaloneHtml(article: GeneratedArticle): string {
  const isMalayalam = article.targetLanguage === 'ml';
  const langName = isMalayalam ? 'Malayalam' : article.targetLanguage === 'hi' ? 'Hindi' : 'English';
  const publicationName = isMalayalam ? 'Manorama Online / മലയാള മനോരമ' : 'Onmanorama';
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
  <title>${escapedHeadline} | ${publicationName}</title>
  <meta name="description" content="${escapedSummary}">
  <meta name="generator" content="Manorama AI Desk">
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
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Anek Malayalam", "Manjari", "Gayathri", "Helvetica Neue", Arial, sans-serif;
      line-height: 1.75;
      color: var(--text-main);
      background-color: var(--bg-cream);
      padding: 0;
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    .top-bar {
      background-color: var(--primary-red);
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .brand-title {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }

    .brand-badge {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .container {
      max-width: 820px;
      margin: 40px auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(15, 30, 54, 0.06);
      border: 1px solid var(--border-color);
    }

    .article-meta-header {
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 20px;
      margin-bottom: 28px;
    }

    .category-pill {
      display: inline-block;
      background-color: #FEE2E2;
      color: var(--primary-red);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 14px;
    }

    .headline {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.25;
      color: var(--deep-navy);
      margin-bottom: 18px;
      letter-spacing: -0.5px;
    }

    .standfirst {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.6;
      color: #334155;
      border-left: 4px solid var(--primary-red);
      padding-left: 16px;
      margin-bottom: 24px;
      background-color: #FFF5F5;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 0 6px 6px 0;
    }

    .byline-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 0.85rem;
      color: var(--text-muted);
      padding-top: 12px;
      border-top: 1px dashed var(--border-color);
    }

    .article-content {
      font-size: 1.125rem;
      color: #1E293B;
    }

    .lead-paragraph {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.75;
      color: #0F172A;
      margin-bottom: 24px;
    }

    .body-p {
      margin-bottom: 20px;
      text-align: justify;
      hyphens: auto;
    }

    .closing-p {
      padding-top: 12px;
      border-top: 1px solid var(--border-color);
      font-style: italic;
      color: #475569;
    }

    .tags-container {
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background: #F1F5F9;
      color: #475569;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .footer {
      max-width: 820px;
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
        font-size: 1.65rem;
      }
      .standfirst {
        font-size: 1.05rem;
      }
    }
  </style>
</head>
<body>
  <header class="top-bar">
    <div class="brand-title">${publicationName}</div>
    <div class="brand-badge">Manorama AI Desk &bull; Offline Edition</div>
  </header>

  <main class="container">
    <article>
      <header class="article-meta-header">
        <span class="category-pill">${langName} Journalism</span>
        <h1 class="headline">${escapedHeadline}</h1>
        <div class="standfirst">${escapedSummary}</div>
        <div class="byline-row">
          <span><strong>Bureau:</strong> Manorama Special Newsroom</span>
          <span><strong>Published:</strong> ${dateStr}</span>
          <span><strong>Length:</strong> ${article.wordCount} words &bull; ${article.readingTimeMinutes} min read</span>
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
    <p>Generated by <strong>Manorama AI Desk</strong> &bull; Independent Newsroom Content Transformation Studio</p>
    <p>Preserves authentic Malayalam & English journalistic conventions &bull; Standalone HTML export format</p>
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
    .slice(0, 35) || 'news-article';

  const filename = `manorama-${article.targetLanguage}-${safeTitle}-${Date.now().toString().slice(-4)}.html`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
