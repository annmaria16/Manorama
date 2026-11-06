import { test, describe } from 'node:test';
import assert from 'node:assert';
import { aiService } from '../src/services/aiService.js';
import { sourceInputSchema } from '../src/middleware/validation.js';

describe('Manorama AI Desk Backend & Logic Tests', () => {
  test('Similarity engine calculates high score for identical stories', () => {
    const text1 = "ISRO Chief S. Somanath announced Chandrayaan-4 will launch in 2028 with docking technology in Thiruvananthapuram.";
    const text2 = "ISRO Chairman S. Somanath confirmed the 2028 launch of Chandrayaan-4 involving space docking technology at Thiruvananthapuram.";
    
    const result = aiService.calculateSimilarity(text1, text2);
    assert.ok(result.similarityScore >= 0.50, `Expected score >= 0.50, got ${result.similarityScore}`);
    assert.ok(result.commonKeywords.length >= 3);
  });

  test('Similarity engine handles Malayalam Unicode text correctly', () => {
    const textMl1 = "ചന്ദ്രയാൻ-4 ദൗത്യം 2028-ൽ വിക്ഷേപിക്കുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് തിരുവനന്തപുരത്ത് അറിയിച്ചു.";
    const textMl2 = "ചന്ദ്രയാൻ 4 വിക്ഷേപണം 2028 ൽ നടക്കുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ സോമനാഥ് വ്യക്തമാക്കി.";
    
    const result = aiService.calculateSimilarity(textMl1, textMl2);
    assert.ok(result.similarityScore >= 0.50, `Expected Malayalam score >= 0.50, got ${result.similarityScore}`);
    assert.ok(result.commonKeywords.length > 0);
  });

  test('Input validation rejects empty or too short text', () => {
    const invalidPayload = {
      sourceType: 'transcript',
      sourceLanguage: 'en',
      targetLanguage: 'ml',
      articleStyle: 'standard',
      content: 'Too short'
    };

    const res = sourceInputSchema.safeParse(invalidPayload);
    assert.strictEqual(res.success, false);
  });

  test('Input validation accepts valid Malayalam/English payload', () => {
    const validPayload = {
      title: "ISRO Lunar Mission Press Brief",
      sourceType: 'transcript',
      sourceLanguage: 'English',
      targetLanguage: 'ml',
      articleStyle: 'standard',
      content: "This is a detailed interview transcript regarding the upcoming space exploration programs and future launches of the national space agency."
    };

    const res = sourceInputSchema.safeParse(validPayload);
    assert.strictEqual(res.success, true);
  });

  test('Deterministic fallback produces well-structured Malayalam article', async () => {
    const payload = {
      sourceType: 'transcript' as const,
      sourceLanguage: 'en',
      targetLanguage: 'ml' as const,
      articleStyle: 'standard' as const,
      content: "ISRO Chairman S. Somanath announced that Chandrayaan-4 will be launched in 2028 to retrieve moon samples."
    };

    const article = await aiService.generateArticle(payload);
    assert.ok(article.headline.length > 10);
    assert.strictEqual(article.targetLanguage, 'ml');
    assert.ok(article.bodyParagraphs.length >= 3);
  });
});
