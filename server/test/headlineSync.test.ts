import test from 'node:test';
import assert from 'node:assert';
import { dynamicNlpEngine } from '../src/services/dynamicNlpEngine.js';
import { aiService } from '../src/services/aiService.js';

test('Dynamic Headline Synchronization: Heading changes when content changes', async () => {
  // Test case: Title has leftover ISRO headline, but content is student solar irrigation in Malayalam
  const payload = {
    title: 'Exclusive Interview with ISRO Chairman S. Somanath on Moon Sample Return & Gaganyaan',
    sourceType: 'brief' as const,
    sourceLanguage: 'ml',
    articleStyle: 'standard' as const,
    content: `# കർഷകർക്ക് സഹായമായി സൗരോർജ്ജത്തിൽ പ്രവർത്തിക്കുന്ന ജലസേചന സംവിധാനം വികസിപ്പിച്ച് വിദ്യാർത്ഥികൾ
**ആലപ്പുഴ:** കൃഷിയിടങ്ങളിൽ വെള്ളം കാര്യക്ഷമമായി ഉപയോഗിക്കാൻ സഹായിക്കുന്ന പുതിയ സംവിധാനം വിദ്യാർത്ഥികൾ വികസിപ്പിച്ചു. പരമ്പരാഗത വൈദ്യുതിയെ ആശ്രയിക്കാതെ സൗരോർജ്ജത്തിൽ പ്രവർത്തിക്കുന്നതാണ് ഇതിന്റെ പ്രധാന സവിശേഷത.`
  };

  // 1. Verify relevance check flags the title as mismatched
  const isRelevant = dynamicNlpEngine.isTitleRelevantToContent(payload.title, payload.content);
  assert.strictEqual(isRelevant, false, 'Stale ISRO title should be flagged as irrelevant to agriculture content');

  // 2. Extract headline directly from content
  const extractedHeadline = dynamicNlpEngine.extractHeadlineFromContent(payload.content);
  assert.strictEqual(
    extractedHeadline,
    'കർഷകർക്ക് സഹായമായി സൗരോർജ്ജത്തിൽ പ്രവർത്തിക്കുന്ന ജലസേചന സംവിധാനം വികസിപ്പിച്ച് വിദ്യാർത്ഥികൾ',
    'Headline should be extracted cleanly from markdown heading'
  );

  // 3. Generate 5-language response
  const response = await aiService.generateAllLanguages(payload);

  // 4. Verify Malayalam headline changed according to the content
  const mlArticle = response.results.ml.article;
  assert.ok(mlArticle, 'Malayalam article must be generated');
  assert.ok(
    !mlArticle.headline.includes('ISRO') && !mlArticle.headline.includes('Somanath'),
    'Malayalam headline must NOT contain leftover ISRO title'
  );
  assert.ok(
    mlArticle.headline.includes('കർഷകർ') || mlArticle.headline.includes('സൗരോർജ്ജ') || mlArticle.headline.includes('ജലസേചന'),
    `Malayalam headline should match the content topic. Got: ${mlArticle.headline}`
  );

  // Verify no raw markdown # or ** in headline or summary
  assert.ok(!mlArticle.headline.includes('#'));
  assert.ok(!mlArticle.summary.includes('#'));
  assert.ok(!mlArticle.leadParagraph.includes('**'));

  // 5. Verify English headline changed according to the content
  const enArticle = response.results.en.article;
  assert.ok(enArticle, 'English article must be generated');
  assert.ok(
    !enArticle.headline.includes('Somanath') && !enArticle.headline.includes('Gaganyaan'),
    'English headline must NOT contain leftover ISRO title'
  );
  assert.ok(
    enArticle.headline.includes('Solar') || enArticle.headline.includes('Irrigation') || enArticle.headline.includes('Farmers'),
    `English headline should reflect the new content. Got: ${enArticle.headline}`
  );
});

