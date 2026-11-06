export type SourceType = 'transcript' | 'notes' | 'draft' | 'brief';
export type Language = 'en' | 'ml' | 'hi';
export type ArticleStyle = 'standard' | 'formal' | 'feature';

export interface SourceInputData {
  title: string;
  sourceType: SourceType;
  sourceLanguage: string;
  targetLanguage: Language;
  articleStyle: ArticleStyle;
  content: string;
  editorialInstructions: string;
}

export interface FiveWsAndH {
  who: string;
  what: string;
  when: string;
  where: string;
  why: string;
  how: string;
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
    overallIntegrityScore: number;
  };
  items: FactCheckItem[];
  checkedAt: string;
}

export interface SimilarityResult {
  similarityScore: number;
  isDuplicate: boolean;
  commonKeywords: string[];
  explanation: string;
  method: string;
}

export type PublicationMode = 
  | 'tv_broadcast'      // Manorama News (Reference pic 5 with lower-third and ticker!)
  | 'manorama_online'  // Malayalam Website
  | 'onmanorama'       // English Website
  | 'newspaper_ml'     // Malayala Manorama Malayalam Print Broadsheet
  | 'newspaper_en';    // Malayala Manorama English Print Broadsheet
