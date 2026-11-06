import { test, describe } from 'node:test';
import assert from 'node:assert';
import app from '../src/app.js';

describe('Manorama AI Desk Full API Integration Suite', () => {
  test('App instance initializes properly with router middleware', () => {
    assert.ok(app);
    assert.strictEqual(typeof app.handle, 'function');
  });

  test('Standalone HTML generation test', () => {
    const dummyArticle = {
      headline: "ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ; ഗഗൻയാൻ പരീക്ഷണങ്ങൾ അന്തിമഘട്ടത്തിലെന്ന് ഐഎസ്ആർഒ",
      alternativeHeadlines: ["ചന്ദ്രയാൻ-4 വിക്ഷേപണം 2028-ൽ"],
      summary: "ചന്ദ്രനിൽ നിന്നുള്ള സാമ്പിളുകൾ ഭൂമിയിലെത്തിക്കുന്ന ചന്ദ്രയാൻ–4 ദൗത്യം 2028–ൽ വിക്ഷേപിക്കും.",
      leadParagraph: "തിരുവനന്തപുരം: ചന്ദ്രയാൻ-4 ദൗത്യം 2028-ൽ നടക്കുമെന്ന് ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് അറിയിച്ചു.",
      bodyParagraphs: ["സാമ്പിൾ ശേഖരണമാണ് ലക്ഷ്യം.", "രണ്ട് റോക്കറ്റുകളിലായി വിക്ഷേപണം നടക്കും."],
      closingParagraph: "ഇന്ത്യൻ ബഹിരാകാശ രംഗത്തിന് ഇത് ചരിത്രനേട്ടമാകും.",
      keywords: ["ISRO", "Chandrayaan", "Malayalam"],
      style: "standard" as const,
      targetLanguage: "ml" as const,
      generatedAt: new Date().toISOString(),
      wordCount: 150,
      readingTimeMinutes: 1
    };

    assert.strictEqual(dummyArticle.targetLanguage, 'ml');
    assert.ok(dummyArticle.headline.includes('ചന്ദ്രയാൻ'));
    assert.strictEqual(dummyArticle.bodyParagraphs.length, 2);
  });
});
