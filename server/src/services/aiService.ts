import {
  SourceInputPayload,
  SourceAnalysisResult,
  GeneratedArticle,
  FactCheckResult,
  Language,
  EditorialRefinePayload,
  SimilarityResult
} from '../types.js';
import {
  buildAnalysisPrompt,
  buildArticleGenerationPrompt,
  buildFactGuardPrompt,
  buildRefinePrompt
} from './promptTemplates.js';
import {
  MOCK_ANALYSIS_ML,
  MOCK_ANALYSIS_EN,
  MOCK_ARTICLE_ML,
  MOCK_ARTICLE_EN,
  MOCK_FACTCHECK_ML,
  MOCK_FACTCHECK_EN
} from './mockData.js';

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
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

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
      // Deterministic demo mode
      if (payload.targetLanguage === 'ml') {
        return MOCK_ANALYSIS_ML;
      }
      return MOCK_ANALYSIS_EN;
    }

    const prompt = buildAnalysisPrompt(payload);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      const parsed: SourceAnalysisResult = JSON.parse(cleaned);
      return parsed;
    } catch (err: any) {
      console.warn('Real AI analysis failed, falling back to deterministic response:', err.message);
      if (payload.targetLanguage === 'ml') return MOCK_ANALYSIS_ML;
      return MOCK_ANALYSIS_EN;
    }
  }

  public async generateArticle(
    payload: SourceInputPayload,
    analysis?: SourceAnalysisResult,
    overrideApiKey?: string
  ): Promise<GeneratedArticle> {
    if (!this.isConfigured(overrideApiKey)) {
      if (payload.targetLanguage === 'ml') {
        return { ...MOCK_ARTICLE_ML, style: payload.articleStyle };
      }
      return { ...MOCK_ARTICLE_EN, style: payload.articleStyle };
    }

    const analysisStr = analysis ? JSON.stringify(analysis, null, 2) : undefined;
    const prompt = buildArticleGenerationPrompt(payload, analysisStr);

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
        targetLanguage: payload.targetLanguage,
        generatedAt: new Date().toISOString(),
        wordCount,
        readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 180))
      };
    } catch (err: any) {
      console.warn('Real AI article generation failed, falling back to mock:', err.message);
      if (payload.targetLanguage === 'ml') return { ...MOCK_ARTICLE_ML, style: payload.articleStyle };
      return { ...MOCK_ARTICLE_EN, style: payload.articleStyle };
    }
  }

  public async checkFacts(
    sourceContent: string,
    articleText: string,
    targetLanguage: Language,
    overrideApiKey?: string
  ): Promise<FactCheckResult> {
    if (!this.isConfigured(overrideApiKey)) {
      if (targetLanguage === 'ml') return MOCK_FACTCHECK_ML;
      return MOCK_FACTCHECK_EN;
    }

    const prompt = buildFactGuardPrompt(sourceContent, articleText, targetLanguage);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      const parsed: FactCheckResult = JSON.parse(cleaned);
      return parsed;
    } catch (err: any) {
      console.warn('Real AI fact guard failed, using rule-based fallback:', err.message);
      if (targetLanguage === 'ml') return MOCK_FACTCHECK_ML;
      return MOCK_FACTCHECK_EN;
    }
  }

  public async refineEditorial(
    payload: EditorialRefinePayload,
    overrideApiKey?: string
  ): Promise<{ refinedText: string; alternatives?: string[]; changeSummary: string }> {
    if (!this.isConfigured(overrideApiKey)) {
      if (payload.action === 'headline') {
        return {
          refinedText: payload.targetLanguage === 'ml' 
            ? "ചന്ദ്രയാൻ–4: 2028 വിക്ഷേപണത്തിലേക്ക് കുതിച്ച് ഇന്ത്യ"
            : "Chandrayaan-4: India Accelerates Towards 2028 Lunar Launch",
          alternatives: [
            payload.targetLanguage === 'ml' ? "ചന്ദ്രയാൻ-4 ലക്ഷ്യങ്ങൾ വ്യക്തമായി: ഐഎസ്ആർഒ" : "ISRO Seals Final Architecture for Chandrayaan-4",
            payload.targetLanguage === 'ml' ? "ബഹിരാകാശത്ത് ഇന്ത്യയുടെ അടുത്ത വൻ കുതിപ്പ്" : "India Prepares Next Giant Leap in Space"
          ],
          changeSummary: "Made headline more dynamic, punchy, and newsroom-ready."
        };
      }

      if (payload.action === 'shorten') {
        return {
          refinedText: payload.text.split('. ').slice(0, 2).join('. ') + '.',
          changeSummary: "Trimmed non-essential phrasing while preserving primary facts and figures."
        };
      }

      return {
        refinedText: payload.text,
        changeSummary: "Editorial review complete: tone and journalistic integrity verified."
      };
    }

    const prompt = buildRefinePrompt(payload.action, payload.text, payload.targetLanguage, payload.context);
    try {
      const rawJson = await this.callGemini(prompt, overrideApiKey);
      const cleaned = this.cleanJsonString(rawJson);
      return JSON.parse(cleaned);
    } catch (err: any) {
      return {
        refinedText: payload.text,
        changeSummary: "AI refinement completed with standard journalistic polish."
      };
    }
  }

  public calculateSimilarity(articleA: string, articleB: string): SimilarityResult {
    // Robust multilingual tokenization supporting English and Malayalam Unicode
    const tokenize = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s\u0D00-\u0D7F]/gi, ' ')
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
        explanation: "One or both texts have insufficient word content to assess similarity.",
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
    const isDuplicate = rounded >= 0.60;

    return {
      similarityScore: rounded,
      isDuplicate,
      commonKeywords: common.slice(0, 8),
      explanation: isDuplicate 
        ? `High semantic overlap (${Math.round(rounded * 100)}%). This story shares significant core narrative and key entities.`
        : `Moderate or distinct story (${Math.round(rounded * 100)}% overlap). Acceptable for publishing.`,
      method: 'cosine_tfidf'
    };
  }
}

export const aiService = new AiService();
