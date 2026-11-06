-- Manorama AI Desk SQL Schema (PostgreSQL & SQLite Compatible)

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
  alternative_headlines TEXT, -- JSON array string
  summary TEXT NOT NULL,
  lead_paragraph TEXT NOT NULL,
  body_paragraphs TEXT NOT NULL, -- JSON array string
  closing_paragraph TEXT,
  keywords TEXT, -- JSON array string
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
