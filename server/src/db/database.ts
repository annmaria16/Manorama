import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import {
  SourceInputPayload,
  ArticleStyle,
  Language,
  GeneratedArticle,
  FactCheckResult,
  LanguageGenerationStatus
} from '../types.js';

class NewsDeskDatabase {
  private db: DatabaseSync;

  constructor() {
    const dbDir = path.resolve('data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.join(dbDir, 'newsdesk.sqlite');
    this.db = new DatabaseSync(dbPath);
    this.init();
  }

  private init(): void {
    // Enable WAL mode, busy timeout & foreign keys
    this.db.exec('PRAGMA journal_mode = WAL;');
    this.db.exec('PRAGMA busy_timeout = 10000;');
    this.db.exec('PRAGMA foreign_keys = ON;');
    
    // Create schema
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sources (
        id TEXT PRIMARY KEY,
        title TEXT,
        source_type TEXT NOT NULL,
        source_language TEXT NOT NULL,
        content TEXT NOT NULL,
        editorial_instructions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS stories (
        id TEXT PRIMARY KEY,
        source_id TEXT NOT NULL,
        style TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        story_id TEXT NOT NULL,
        language TEXT NOT NULL,
        headline TEXT NOT NULL,
        alternative_headlines TEXT,
        summary TEXT NOT NULL,
        lead_paragraph TEXT NOT NULL,
        body_paragraphs TEXT NOT NULL,
        closing_paragraph TEXT,
        keywords TEXT,
        word_count INTEGER DEFAULT 0,
        reading_time_minutes INTEGER DEFAULT 1,
        is_published INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
        UNIQUE(story_id, language)
      );

      CREATE TABLE IF NOT EXISTS fact_checks (
        id TEXT PRIMARY KEY,
        story_id TEXT NOT NULL,
        language TEXT NOT NULL,
        overall_score INTEGER NOT NULL,
        supported_count INTEGER DEFAULT 0,
        needs_verification_count INTEGER DEFAULT 0,
        unsupported_count INTEGER DEFAULT 0,
        missing_count INTEGER DEFAULT 0,
        items_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
        UNIQUE(story_id, language)
      );
    `);
  }

  public saveSource(payload: SourceInputPayload): string {
    const sourceId = `src_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const stmt = this.db.prepare(`
      INSERT INTO sources (id, title, source_type, source_language, content, editorial_instructions)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      sourceId,
      payload.title || '',
      payload.sourceType,
      payload.sourceLanguage,
      payload.content,
      payload.editorialInstructions || ''
    );
    return sourceId;
  }

  public createStory(sourceId: string, style: ArticleStyle): string {
    const storyId = `story_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const stmt = this.db.prepare(`
      INSERT INTO stories (id, source_id, style)
      VALUES (?, ?, ?)
    `);
    stmt.run(storyId, sourceId, style);
    return storyId;
  }

  public saveStoryLanguages(
    storyId: string,
    results: Record<Language, LanguageGenerationStatus>
  ): void {
    // Transactional save for all 5 languages
    this.db.exec('BEGIN TRANSACTION');
    try {
      const artStmt = this.db.prepare(`
        INSERT OR REPLACE INTO articles (
          id, story_id, language, headline, alternative_headlines, summary,
          lead_paragraph, body_paragraphs, closing_paragraph, keywords,
          word_count, reading_time_minutes, is_published, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
      `);

      const factStmt = this.db.prepare(`
        INSERT OR REPLACE INTO fact_checks (
          id, story_id, language, overall_score, supported_count,
          needs_verification_count, unsupported_count, missing_count, items_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const lang of Object.keys(results) as Language[]) {
        const item = results[lang];
        if (item.article) {
          const artId = `art_${storyId}_${lang}`;
          artStmt.run(
            artId,
            storyId,
            lang,
            item.article.headline,
            JSON.stringify(item.article.alternativeHeadlines || []),
            item.article.summary,
            item.article.leadParagraph,
            JSON.stringify(item.article.bodyParagraphs || []),
            item.article.closingParagraph || '',
            JSON.stringify(item.article.keywords || []),
            item.article.wordCount || 0,
            item.article.readingTimeMinutes || 1
          );
        }

        if (item.factCheck) {
          const fcId = `fc_${storyId}_${lang}`;
          factStmt.run(
            fcId,
            storyId,
            lang,
            item.factCheck.summary.overallIntegrityScore,
            item.factCheck.summary.supportedCount,
            item.factCheck.summary.needsVerificationCount,
            item.factCheck.summary.unsupportedCount,
            item.factCheck.summary.missingDetailsCount,
            JSON.stringify(item.factCheck.items)
          );
        }
      }

      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  public updateArticle(storyId: string, language: Language, updated: GeneratedArticle): void {
    const stmt = this.db.prepare(`
      UPDATE articles
      SET headline = ?, alternative_headlines = ?, summary = ?,
          lead_paragraph = ?, body_paragraphs = ?, closing_paragraph = ?,
          keywords = ?, word_count = ?, reading_time_minutes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE story_id = ? AND language = ?
    `);

    stmt.run(
      updated.headline,
      JSON.stringify(updated.alternativeHeadlines || []),
      updated.summary,
      updated.leadParagraph,
      JSON.stringify(updated.bodyParagraphs || []),
      updated.closingParagraph || '',
      JSON.stringify(updated.keywords || []),
      updated.wordCount,
      updated.readingTimeMinutes,
      storyId,
      language
    );
  }

  public listAllStories(): any[] {
    const rows = this.db.prepare(`
      SELECT 
        s.id AS story_id,
        s.style,
        s.created_at,
        s.updated_at,
        src.id AS source_id,
        src.title,
        src.source_type,
        src.source_language,
        substr(src.content, 1, 140) AS content_preview,
        (SELECT COUNT(*) FROM articles a WHERE a.story_id = s.id) AS language_count,
        (SELECT headline FROM articles a WHERE a.story_id = s.id AND a.language = 'en') AS headline_en,
        (SELECT headline FROM articles a WHERE a.story_id = s.id AND a.language = 'ml') AS headline_ml
      FROM stories s
      JOIN sources src ON s.source_id = src.id
      ORDER BY s.created_at DESC
    `).all();

    return rows;
  }

  public getStory(storyId: string): any {
    const storyRow = this.db.prepare(`
      SELECT s.*, src.title, src.source_type, src.source_language, src.content, src.editorial_instructions
      FROM stories s
      JOIN sources src ON s.source_id = src.id
      WHERE s.id = ?
    `).get(storyId) as any;

    if (!storyRow) return null;

    const articleRows = this.db.prepare(`
      SELECT * FROM articles WHERE story_id = ?
    `).all(storyId) as any[];

    const factRows = this.db.prepare(`
      SELECT * FROM fact_checks WHERE story_id = ?
    `).all(storyId) as any[];

    const results: Record<string, any> = {};

    articleRows.forEach(row => {
      const fc = factRows.find(f => f.language === row.language);
      results[row.language] = {
        language: row.language,
        status: 'completed',
        article: {
          headline: row.headline,
          alternativeHeadlines: JSON.parse(row.alternative_headlines || '[]'),
          summary: row.summary,
          leadParagraph: row.lead_paragraph,
          bodyParagraphs: JSON.parse(row.body_paragraphs || '[]'),
          closingParagraph: row.closing_paragraph,
          keywords: JSON.parse(row.keywords || '[]'),
          style: storyRow.style,
          targetLanguage: row.language,
          generatedAt: row.updated_at,
          wordCount: row.word_count,
          readingTimeMinutes: row.reading_time_minutes
        },
        factCheck: fc ? {
          summary: {
            totalChecked: fc.supported_count + fc.needs_verification_count + fc.unsupported_count + fc.missing_count,
            supportedCount: fc.supported_count,
            needsVerificationCount: fc.needs_verification_count,
            unsupportedCount: fc.unsupported_count,
            missingDetailsCount: fc.missing_count,
            overallIntegrityScore: fc.overall_score
          },
          items: JSON.parse(fc.items_json || '[]'),
          checkedAt: fc.created_at
        } : undefined
      };
    });

    return {
      storyId,
      source: {
        id: storyRow.source_id,
        title: storyRow.title,
        sourceType: storyRow.source_type,
        sourceLanguage: storyRow.source_language,
        content: storyRow.content,
        editorialInstructions: storyRow.editorial_instructions
      },
      results,
      createdAt: storyRow.created_at,
      updatedAt: storyRow.updated_at
    };
  }
}

export const db = new NewsDeskDatabase();
