import {
  SourceInputData,
  SourceAnalysisResult,
  GeneratedArticle,
  FactCheckResult,
  SimilarityResult,
  Language,
  MultilingualGenerationResponse,
  LanguageGenerationStatus
} from '../types';

const API_BASE = '/api';

export function getStoredApiKey(): string {
  return localStorage.getItem('manorama_gemini_key') || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem('manorama_gemini_key', key.trim());
}

export function clearStoredApiKey(): void {
  localStorage.removeItem('manorama_gemini_key');
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  const key = getStoredApiKey();
  if (key) {
    headers['x-gemini-key'] = key;
  }
  return headers;
}

export async function fetchSystemStatus() {
  const res = await fetch(`${API_BASE}/status`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch system status');
  return res.json();
}

export async function analyzeSource(data: SourceInputData): Promise<{ data: SourceAnalysisResult; isDemo: boolean }> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Failed to analyze source material');
  }
  return { data: body.data, isDemo: body.isDemo };
}

// AUTOMATIC 5-LANGUAGE PIPELINE
export async function generateMultilingual(
  data: SourceInputData,
  analysis?: SourceAnalysisResult
): Promise<MultilingualGenerationResponse> {
  const res = await fetch(`${API_BASE}/generate-multilingual`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ ...data, analysis })
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Failed to generate multilingual news articles');
  }
  return body.data;
}

// RETRY A SINGLE LANGUAGE VERSION
export async function retrySingleLanguage(
  data: SourceInputData,
  targetLanguage: Language,
  analysis?: SourceAnalysisResult
): Promise<{ data: LanguageGenerationStatus; isDemo: boolean }> {
  const res = await fetch(`${API_BASE}/generate-single`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ ...data, targetLanguage, analysis })
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || `Failed to regenerate ${targetLanguage} article`);
  }
  return { data: body.data, isDemo: body.isDemo };
}

export async function checkFacts(
  sourceContent: string,
  articleText: string,
  targetLanguage: Language
): Promise<{ data: FactCheckResult; isDemo: boolean }> {
  const res = await fetch(`${API_BASE}/fact-check`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ sourceContent, articleText, targetLanguage })
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Failed to verify facts with Source Fact Guard');
  }
  return { data: body.data, isDemo: body.isDemo };
}

export async function refineEditorial(
  action: 'headline' | 'tone' | 'grammar' | 'shorten' | 'expand',
  text: string,
  targetLanguage: Language,
  context?: string
): Promise<{ refinedText: string; alternatives?: string[]; changeSummary: string; isDemo: boolean }> {
  const res = await fetch(`${API_BASE}/refine`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ action, text, targetLanguage, context })
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Editorial refinement failed');
  }
  return { ...body.data, isDemo: body.isDemo };
}

export async function checkSimilarity(articleA: string, articleB: string): Promise<SimilarityResult> {
  const res = await fetch(`${API_BASE}/similarity`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ articleA, articleB })
  });

  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Failed to calculate article similarity');
  }
  return body.data;
}

// DATABASE PERSISTENCE API CALLS
export async function fetchStories(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/stories`, {
    headers: getHeaders()
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || 'Failed to fetch saved stories');
  }
  return body.data;
}

export async function fetchStory(storyId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/stories/${storyId}`, {
    headers: getHeaders()
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || `Failed to fetch story ${storyId}`);
  }
  return body.data;
}

export async function updateArticleInDb(
  storyId: string,
  language: Language,
  article: GeneratedArticle
): Promise<void> {
  const res = await fetch(`${API_BASE}/stories/${storyId}/languages/${language}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(article)
  });
  const body = await res.json();
  if (!res.ok || !body.success) {
    throw new Error(body.error || `Failed to update ${language} article in database`);
  }
}
