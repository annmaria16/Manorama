import { test, describe } from 'node:test';
import assert from 'node:assert';
import { aiService } from '../src/services/aiService.js';
import { sourceInputSchema } from '../src/middleware/validation.js';

describe('Manorama AI Desk Backend & Multilingual Tests', () => {
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
      articleStyle: 'standard',
      content: 'Too short'
    };

    const res = sourceInputSchema.safeParse(invalidPayload);
    assert.strictEqual(res.success, false);
  });

  test('Input validation accepts valid multilingual payload', () => {
    const validPayload = {
      title: "ISRO Lunar Mission Press Brief",
      sourceType: 'transcript',
      sourceLanguage: 'English',
      articleStyle: 'standard',
      content: "This is a detailed interview transcript regarding the upcoming space exploration programs and future launches of the national space agency."
    };

    const res = sourceInputSchema.safeParse(validPayload);
    assert.strictEqual(res.success, true);
  });

  test('Automatic 5-Language generation pipeline generates all 5 languages simultaneously', async () => {
    const payload = {
      sourceType: 'transcript' as const,
      sourceLanguage: 'en',
      articleStyle: 'standard' as const,
      content: "ISRO Chairman S. Somanath announced that Chandrayaan-4 will be launched in 2028 to retrieve moon samples."
    };

    const response = await aiService.generateAllLanguages(payload);
    assert.ok(response.sourceAnalysis);
    assert.strictEqual(response.results.en.status, 'completed');
    assert.strictEqual(response.results.ml.status, 'completed');
    assert.strictEqual(response.results.hi.status, 'completed');
    assert.strictEqual(response.results.ta.status, 'completed');
    assert.strictEqual(response.results.te.status, 'completed');

    // Verify Malayalam script
    assert.ok(response.results.ml.article?.headline.includes('ചന്ദ്ര'));
    // Verify Tamil script
    assert.ok(response.results.ta.article?.headline.includes('சந்திர'));
    // Verify Telugu script
    assert.ok(response.results.te.article?.headline.includes('చంద్ర'));
    // Verify Hindi script
    assert.ok(response.results.hi.article?.headline.includes('चंद्र'));
  });
});
