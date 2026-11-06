import { Router, Request, Response } from 'express';
import { aiService, ALL_LANGUAGES } from '../services/aiService.js';
import { db } from '../db/database.js';
import {
  validateBody,
  sourceInputSchema,
  singleLanguageSchema,
  factCheckSchema,
  editorialRefineSchema,
  similaritySchema
} from '../middleware/validation.js';

export const newsDeskRouter = Router();

function getApiKeyFromReq(req: Request): string | undefined {
  const headerKey = req.headers['x-gemini-key'];
  if (typeof headerKey === 'string' && headerKey.trim().length > 10) {
    return headerKey.trim();
  }
  return undefined;
}

// System Status Endpoint
newsDeskRouter.get('/status', (req: Request, res: Response) => {
  const clientKey = getApiKeyFromReq(req);
  const isKeyConfigured = aiService.isConfigured(clientKey);

  res.json({
    status: 'online',
    appName: 'Manorama AI Desk',
    version: '2.0.0-PRO',
    mode: isKeyConfigured ? 'live_ai' : 'demo_mode',
    configuredModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    supportedLanguages: ALL_LANGUAGES,
    timestamp: new Date().toISOString()
  });
});

// Stage 2: Source Analysis
newsDeskRouter.post('/analyze', validateBody(sourceInputSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const analysis = await aiService.analyzeSource(req.body, clientKey);
    res.json({
      success: true,
      data: analysis,
      isDemo: !aiService.isConfigured(clientKey)
    });
  } catch (error: any) {
    console.error('Error during source analysis:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze source content.'
    });
  }
});

// MAJOR MANDATORY FEATURE: AUTOMATIC MULTILINGUAL 5-LANGUAGE PIPELINE
newsDeskRouter.post('/generate-multilingual', validateBody(sourceInputSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const preExtractedAnalysis = req.body.analysis;
    const response = await aiService.generateAllLanguages(req.body, preExtractedAnalysis, clientKey);

    res.json({
      success: true,
      data: response
    });
  } catch (error: any) {
    console.error('Error during multilingual generation:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate multilingual news articles.'
    });
  }
});

// RETRY / REGENERATE SINGLE LANGUAGE
newsDeskRouter.post('/generate-single', validateBody(singleLanguageSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const targetLang = req.body.targetLanguage;
    const analysis = req.body.analysis;

    const article = await aiService.generateArticleForLanguage(req.body, targetLang, analysis, clientKey);
    const fullArticleText = `${article.headline}\n\n${article.summary}\n\n${article.leadParagraph}\n\n${article.bodyParagraphs.join('\n\n')}`;
    const factCheck = await aiService.checkFacts(req.body.content, fullArticleText, targetLang, clientKey);

    res.json({
      success: true,
      data: {
        language: targetLang,
        article,
        factCheck,
        status: 'completed'
      },
      isDemo: !aiService.isConfigured(clientKey)
    });
  } catch (error: any) {
    console.error('Error generating single language:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate language version.'
    });
  }
});

// Stage 5: Source Fact Guard
newsDeskRouter.post('/fact-check', validateBody(factCheckSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const { sourceContent, articleText, targetLanguage } = req.body;
    const factCheckResult = await aiService.checkFacts(sourceContent, articleText, targetLanguage, clientKey);
    res.json({
      success: true,
      data: factCheckResult,
      isDemo: !aiService.isConfigured(clientKey)
    });
  } catch (error: any) {
    console.error('Error during fact check:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to complete Source Fact Guard verification.'
    });
  }
});

// Editorial Refine
newsDeskRouter.post('/refine', validateBody(editorialRefineSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const result = await aiService.refineEditorial(req.body, clientKey);
    res.json({
      success: true,
      data: result,
      isDemo: !aiService.isConfigured(clientKey)
    });
  } catch (error: any) {
    console.error('Error during editorial refinement:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to refine text.'
    });
  }
});

// Duplicate Detection & Cosine Similarity
newsDeskRouter.post('/similarity', validateBody(similaritySchema), (req: Request, res: Response) => {
  try {
    const { articleA, articleB } = req.body;
    const result = aiService.calculateSimilarity(articleA, articleB);
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Error during similarity check:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to calculate similarity.'
    });
  }
});

// Database: List all stories
newsDeskRouter.get('/stories', (_req: Request, res: Response) => {
  try {
    const stories = db.listAllStories();
    res.json({
      success: true,
      data: stories
    });
  } catch (error: any) {
    console.error('Error listing stories:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to list stories from database.'
    });
  }
});

// Database: Get a single story by ID with all articles & fact-checks
newsDeskRouter.get('/stories/:storyId', (req: Request, res: Response) => {
  try {
    const story = db.getStory(req.params.storyId);
    if (!story) {
      return res.status(404).json({
        success: false,
        error: `Story with ID ${req.params.storyId} not found.`
      });
    }
    res.json({
      success: true,
      data: story
    });
  } catch (error: any) {
    console.error('Error retrieving story:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve story from database.'
    });
  }
});

// Database: Save user edits for a specific language
newsDeskRouter.put('/stories/:storyId/languages/:lang', (req: Request, res: Response) => {
  try {
    const { storyId, lang } = req.params;
    db.updateArticle(storyId, lang as any, req.body);
    res.json({
      success: true,
      message: `Updated ${lang} article in story ${storyId}`
    });
  } catch (error: any) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update article in database.'
    });
  }
});
