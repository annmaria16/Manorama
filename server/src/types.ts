export type SourceType = 'transcript' | 'notes' | 'draft' | 'brief';
export type Language = 'en' | 'ml' | 'hi' | 'ta' | 'te';
export type ArticleStyle = 'standard' | 'formal' | 'feature';

export interface SourceInputPayload {
  title?: string;
  sourceType: SourceType;
  sourceLanguage: string;
  articleStyle: ArticleStyle;
  content: string;
  editorialInstructions?: string;
  targetLanguages?: Language[]; // defaults to all 5: ['en', 'ml', 'hi', 'ta', 'te']
}

export interface ExtractedEntities {
  names: string[];
  places: string[];
  organizations: string[];
  dates: string[];
  numbersAndStats: string[];
  directQuotes: string[];
  supportingDetails: string[];
  unclearOrMissing: string[];
}

export interface FiveWsAndH {
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  how: string;
}

export interface SourceAnalysisResult {
  mainEvent: string;
  mainSubject: string;
  fiveWs: FiveWsAndH;
  entities: ExtractedEntities;
  summaryPointCount: number;
}

export interface GeneratedArticle {
  headline: string;
  alternativeHeadlines: string[];
  summary: string;
  leadParagraph: string;
  bodyParagraphs: string[];
  closingParagraph?: string;
  keywords: string[];
  style: ArticleStyle;
  targetLanguage: Language;
  generatedAt: string;
  wordCount: number;
  readingTimeMinutes: number;
}

export type FactStatus = 'supported' | 'needs_verification' | 'unsupported' | 'missing_detail';

export interface FactCheckItem {
  id: string;
  category: 'name' | 'location' | 'date' | 'number' | 'organization' | 'quote' | 'claim' | 'missing_info';
  statement: string;
  sourceReference: string;
  status: FactStatus;
  explanation: string;
}

export interface FactCheckResult {
  summary: {
    totalChecked: number;
    supportedCount: number;
    needsVerificationCount: number;
    unsupportedCount: number;
    missingDetailsCount: number;
    overallIntegrityScore: number; // 0 to 100
  };
  items: FactCheckItem[];
  checkedAt: string;
}

export interface LanguageGenerationStatus {
  language: Language;
  languageName: string;
  nativeName: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  article?: GeneratedArticle;
  factCheck?: FactCheckResult;
  error?: string;
}

export interface MultilingualGenerationResponse {
  storyId?: string;
  sourceId?: string;
  sourceAnalysis: SourceAnalysisResult;
  results: Record<Language, LanguageGenerationStatus>;
  generatedAt: string;
  isDemo: boolean;
}

export interface EditorialRefinePayload {
  action: 'headline' | 'tone' | 'grammar' | 'shorten' | 'expand';
  text: string;
  targetLanguage: Language;
  context?: string;
}

export interface SimilarityCheckPayload {
  articleA: string;
  articleB: string;
}

export interface SimilarityResult {
  similarityScore: number; // 0 to 1
  isDuplicate: boolean;
  commonKeywords: string[];
  explanation: string;
  method: 'cosine_tfidf' | 'gemini_embedding';
}
