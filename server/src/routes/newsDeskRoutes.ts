import { Router, Request, Response } from 'express';
import { aiService } from '../services/aiService.js';
import {
  validateBody,
  sourceInputSchema,
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
    version: '1.0.0',
    mode: isKeyConfigured ? 'live_ai' : 'demo_mode',
    configuredModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    supportedLanguages: [
      { code: 'en', name: 'English', publication: 'Onmanorama' },
      { code: 'ml', name: 'Malayalam (മലയാളം)', publication: 'Manorama Online / Malayala Manorama' },
      { code: 'hi', name: 'Hindi (हिंदी)', publication: 'Manorama National' }
    ],
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

// Stage 3 & 4: Article Generation
newsDeskRouter.post('/generate', validateBody(sourceInputSchema), async (req: Request, res: Response) => {
  try {
    const clientKey = getApiKeyFromReq(req);
    const analysis = req.body.analysis; // optional pre-extracted analysis passed from client
    const article = await aiService.generateArticle(req.body, analysis, clientKey);
    res.json({
      success: true,
      data: article,
      isDemo: !aiService.isConfigured(clientKey)
    });
  } catch (error: any) {
    console.error('Error during article generation:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate news article.'
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

// Stage 6: Editorial Refinement
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

// Priority A/B: Duplicate Story & Cosine Similarity Detection
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
