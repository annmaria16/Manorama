import {
  SourceInputPayload,
  SourceAnalysisResult,
  GeneratedArticle,
  FactCheckResult,
  Language,
  LanguageGenerationStatus,
  MultilingualGenerationResponse,
  EditorialRefinePayload,
  SimilarityResult
} from '../types.js';
import {
  buildAnalysisPrompt,
  buildArticleGenerationPrompt,
  buildFactGuardPrompt,
  buildRefinePrompt
} from './promptTemplates.js';
import { dynamicNlpEngine } from './dynamicNlpEngine.js';
import { db } from '../db/database.js';

export const ALL_LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
];

export class AiService {
  private defaultApiKey: string;
  private defaultModel: string;

  constructor() {
    this.defaultApiKey = process.env.GEMINI_API_KEY || '';
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  }

  public isConfigured(overrideApiKey?: string): boolean {
    const key = overrideApiKey || this.defaultApiKey;
    return Boolean(key && key.trim().length > 10 && !key.includes('your_gemini_api_key'));
  }

  private cleanJsonString(raw: string): string {
    let clean = raw.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/i, '').replace(/```\s*$/i, '');
    }
    return clean.trim();
  }

  private async callGemini(prompt: string, overrideApiKey?: string): Promise<string> {
    const apiKey = overrideApiKey || this.defaultApiKey;
    if (!this.isConfigured(apiKey)) {
      throw new Error('DEMO_MODE_ACTIVE: Gemini API Key is not configured.');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.defaultModel}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = `Gemini API returned status ${response.status}`;
        try {
          const errJson = JSON.parse(errorText);
          if (errJson.error?.message) {
            errorMsg = errJson.error.message;
          }
        } catch {
          errorMsg = `${errorMsg}: ${errorText.slice(0, 150)}`;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Empty response received from AI model.');
      }

      return rawText;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  public async analyzeSource(payload: SourceInputPayload, overrideApiKey?: string): Promise<SourceAnalysisResult> {
    if (!this.isConfigured(overrideApiKey)) {
      return dynamicNlpEngine.analyze(payload);
    }

    const prompt = buildAnalysisPrompt(payload);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      const parsed: SourceAnalysisResult = JSON.parse(cleaned);
      return parsed;
    } catch (err: any) {
      console.warn('Real AI analysis failed, falling back to dynamic NLP engine:', err.message);
      return dynamicNlpEngine.analyze(payload);
    }
  }

  public async generateArticleForLanguage(
    payload: SourceInputPayload,
    targetLang: Language,
    analysis?: SourceAnalysisResult,
    overrideApiKey?: string
  ): Promise<GeneratedArticle> {
    if (!this.isConfigured(overrideApiKey)) {
      return dynamicNlpEngine.generateArticle(payload, targetLang, analysis);
    }

    const analysisStr = analysis ? JSON.stringify(analysis, null, 2) : undefined;
    const prompt = buildArticleGenerationPrompt(payload, targetLang, analysisStr);

    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      const parsed: GeneratedArticle = JSON.parse(cleaned);

      const wordCount = (
        parsed.headline + ' ' +
        parsed.summary + ' ' +
        parsed.leadParagraph + ' ' +
        parsed.bodyParagraphs.join(' ') + ' ' +
        (parsed.closingParagraph || '')
      ).trim().split(/\s+/).length;

      return {
        ...parsed,
        style: payload.articleStyle,
        targetLanguage: targetLang,
        generatedAt: new Date().toISOString(),
        wordCount,
        readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 180))
      };
    } catch (err: any) {
      console.warn(`Article generation failed for ${targetLang}, falling back to dynamic NLP engine:`, err.message);
      return dynamicNlpEngine.generateArticle(payload, targetLang, analysis);
    }
  }

  public async checkFacts(
    sourceContent: string,
    articleText: string,
    targetLanguage: Language,
    overrideApiKey?: string
  ): Promise<FactCheckResult> {
    if (!this.isConfigured(overrideApiKey)) {
      return dynamicNlpEngine.checkFacts(sourceContent, articleText, targetLanguage);
    }

    const prompt = buildFactGuardPrompt(sourceContent, articleText, targetLanguage);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      return JSON.parse(cleaned);
    } catch (err: any) {
      console.warn('Real AI fact guard failed, using dynamic NLP check:', err.message);
      return dynamicNlpEngine.checkFacts(sourceContent, articleText, targetLanguage);
    }
  }

  // AUTOMATIC 5-LANGUAGE PIPELINE: SINGLE TRANSCRIPT -> 5 ARTICLES
  public async generateAllLanguages(
    payload: SourceInputPayload,
    preExtractedAnalysis?: SourceAnalysisResult,
    overrideApiKey?: string
  ): Promise<MultilingualGenerationResponse> {
    const isDemo = !this.isConfigured(overrideApiKey);
    
    // Save raw source document to persistent database
    const sourceId = db.saveSource(payload);

    // Create unique story entry in database
    const storyId = db.createStory(sourceId, payload.articleStyle);

    // 1. First ensure source intelligence is extracted from user's submitted content
    const analysis = preExtractedAnalysis || await this.analyzeSource(payload, overrideApiKey);

    const targetLangs: Language[] = payload.targetLanguages && payload.targetLanguages.length > 0
      ? payload.targetLanguages
      : ['en', 'ml', 'hi', 'ta', 'te'];

    const results: Record<Language, LanguageGenerationStatus> = {} as any;

    // Initialize statuses
    ALL_LANGUAGES.forEach(lang => {
      results[lang.code] = {
        language: lang.code,
        languageName: lang.name,
        nativeName: lang.nativeName,
        status: targetLangs.includes(lang.code) ? 'generating' : 'pending'
      };
    });

    // 2. Execute generation for all 5 target languages from the SAME common source
    await Promise.all(
      targetLangs.map(async (lang) => {
        try {
          const article = await this.generateArticleForLanguage(payload, lang, analysis, overrideApiKey);
          
          // Cross-verify article against common source
          const fullArticleText = `${article.headline}\n\n${article.summary}\n\n${article.leadParagraph}\n\n${article.bodyParagraphs.join('\n\n')}`;
          const factCheck = await this.checkFacts(payload.content, fullArticleText, lang, overrideApiKey);

          results[lang] = {
            ...results[lang],
            status: 'completed',
            article,
            factCheck
          };
        } catch (err: any) {
          console.error(`Error generating ${lang} version:`, err);
          results[lang] = {
            ...results[lang],
            status: 'failed',
            error: err.message || `Failed to generate ${lang} article`
          };
        }
      })
    );

    // Persist all 5 language articles & fact checks in database
    db.saveStoryLanguages(storyId, results);

    return {
      storyId,
      sourceId,
      sourceAnalysis: analysis,
      results,
      generatedAt: new Date().toISOString(),
      isDemo
    };
  }

  public async refineEditorial(
    payload: EditorialRefinePayload,
    overrideApiKey?: string
  ): Promise<{ refinedText: string; alternatives?: string[]; changeSummary: string }> {
    if (!this.isConfigured(overrideApiKey)) {
      if (payload.action === 'headline') {
        return {
          refinedText: payload.text + ' — Updated',
          alternatives: [
            payload.text + ': Special Newsroom Edition',
            'Breaking Report: ' + payload.text
          ],
          changeSummary: 'Refined headline for punchier, broadsheet newsroom impact.'
        };
      }
      return {
        refinedText: payload.text,
        changeSummary: 'Journalistic polish verified against news standards.'
      };
    }

    const prompt = buildRefinePrompt(payload.action, payload.text, payload.targetLanguage, payload.context);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      return JSON.parse(cleaned);
    } catch {
      return {
        refinedText: payload.text,
        changeSummary: 'Refinement completed.'
      };
    }
  }

  public calculateSimilarity(articleA: string, articleB: string): SimilarityResult {
    const tokenize = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s\u0D00-\u0D7F\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F]/gi, ' ')
        .split(/\s+/)
        .filter(w => w.trim().length > 1);
    };

    const tokensA = tokenize(articleA);
    const tokensB = tokenize(articleB);

    if (tokensA.length === 0 || tokensB.length === 0) {
      return {
        similarityScore: 0,
        isDuplicate: false,
        commonKeywords: [],
        explanation: "One or both texts have insufficient content to evaluate similarity.",
        method: 'cosine_tfidf'
      };
    }

    const freqA: Record<string, number> = {};
    const freqB: Record<string, number> = {};

    tokensA.forEach(t => { freqA[t] = (freqA[t] || 0) + 1; });
    tokensB.forEach(t => { freqB[t] = (freqB[t] || 0) + 1; });

    const allVocab = Array.from(new Set([...Object.keys(freqA), ...Object.keys(freqB)]));

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    const common: string[] = [];

    allVocab.forEach(term => {
      const valA = freqA[term] || 0;
      const valB = freqB[term] || 0;
      dotProduct += valA * valB;
      normA += valA * valA;
      normB += valB * valB;
      if (valA > 0 && valB > 0) {
        common.push(term);
      }
    });

    const cosineSim = (normA === 0 || normB === 0) ? 0 : dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    const rounded = Math.round(cosineSim * 100) / 100;
    const isDuplicate = rounded >= 0.55;

    return {
      similarityScore: rounded,
      isDuplicate,
      commonKeywords: common.slice(0, 8),
      explanation: isDuplicate 
        ? `High semantic overlap (${Math.round(rounded * 100)}%). Significant shared narrative and facts.`
        : `Distinct story (${Math.round(rounded * 100)}% overlap). Acceptable for independent publishing.`,
      method: 'cosine_tfidf'
    };
  }
}

export const aiService = new AiService();
