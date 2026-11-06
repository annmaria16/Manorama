import test from 'node:test';
import assert from 'node:assert';
import { aiService } from '../src/services/aiService.js';
import { db } from '../src/db/database.js';

test('Dynamic Story Processing: Story A vs Story B Verification', async () => {
  // Story A: Pathanamthitta Heavy Rain & School Closure
  const payloadStoryA = {
    title: 'Pathanamthitta District Declares School Holiday Due to Torrential Rain',
    sourceType: 'brief' as const,
    sourceLanguage: 'en',
    articleStyle: 'standard' as const,
    content: 'Pathanamthitta district administration declared a holiday for all educational institutions on Friday due to torrential rains and rising water levels. District Collector S. Premkumar issued the order following heavy downpours in the catchment areas. Relief camps have been opened in vulnerable taluks where 450 people have been relocated.'
  };

  // Story B: Kozhikode Medical College Emergency Care Inauguration
  const payloadStoryB = {
    title: 'Kozhikode Medical College Inaugurates State-of-the-Art Emergency Facility',
    sourceType: 'draft' as const,
    sourceLanguage: 'en',
    articleStyle: 'standard' as const,
    content: 'Kozhikode Medical College inaugurated a state-of-the-art 120-bed emergency care facility today. Health Minister Veena George dedicated the trauma care complex constructed at Rs 45 crore. The unit includes robotic surgical suites and a round-the-clock intensive care triage team.'
  };

  // 1. Generate Story A
  const resultA = await aiService.generateAllLanguages(payloadStoryA);
  assert.ok(resultA.storyId, 'Story A must have a unique story ID');
  assert.ok(resultA.results.en.article?.headline.includes('Pathanamthitta') || resultA.results.en.article?.headline.includes('Holiday'));
  assert.ok(resultA.results.ml.article?.headline.includes('പത്തനംതിട്ട') || resultA.results.ml.article?.headline.includes('മഴ') || resultA.results.ml.article?.headline.includes('അവധി'));

  // 2. Generate Story B
  const resultB = await aiService.generateAllLanguages(payloadStoryB);
  assert.ok(resultB.storyId, 'Story B must have a unique story ID');
  assert.notStrictEqual(resultA.storyId, resultB.storyId, 'Story A and Story B must have distinct story IDs');
  assert.ok(resultB.results.en.article?.headline.includes('Kozhikode') || resultB.results.en.article?.headline.includes('Emergency'));
  assert.ok(resultB.results.ml.article?.headline.includes('കോഴിക്കോട്') || resultB.results.ml.article?.headline.includes('ചികിത്സ') || resultB.results.ml.article?.headline.includes('അത്യാഹിത'));

  // 3. Verify Story A and Story B are completely distinct (no hardcoded reuse)
  assert.notStrictEqual(resultA.results.en.article?.headline, resultB.results.en.article?.headline);
  assert.notStrictEqual(resultA.results.ml.article?.headline, resultB.results.ml.article?.headline);
  assert.notStrictEqual(resultA.results.en.article?.summary, resultB.results.en.article?.summary);
  assert.notStrictEqual(resultA.sourceAnalysis.mainSubject, resultB.sourceAnalysis.mainSubject);

  // Cosine similarity check between Story A and Story B
  const similarity = aiService.calculateSimilarity(
    resultA.results.en.article?.leadParagraph || '',
    resultB.results.en.article?.leadParagraph || ''
  );
  assert.strictEqual(similarity.isDuplicate, false, 'Story A and Story B must not be classified as duplicates');
  assert.ok(similarity.similarityScore < 0.35, `Similarity score (${similarity.similarityScore}) should be low between distinct topics`);

  // 4. Verify Database Isolation and Persistence
  const storedA = db.getStory(resultA.storyId!);
  const storedB = db.getStory(resultB.storyId!);

  assert.ok(storedA, 'Story A must exist in SQLite database');
  assert.ok(storedB, 'Story B must exist in SQLite database');
  assert.strictEqual(storedA.source.content, payloadStoryA.content);
  assert.strictEqual(storedB.source.content, payloadStoryB.content);

  // 5. Verify User Edit on Story A does not touch Story B
  const updatedHeadlineA = 'EMERGENCY UPDATE: Red Alert Issued in Pathanamthitta as Rivers Swell';
  const updatedArticleA = {
    ...storedA.results.en.article,
    headline: updatedHeadlineA
  };

  db.updateArticle(resultA.storyId!, 'en', updatedArticleA);

  const reloadedA = db.getStory(resultA.storyId!);
  const reloadedB = db.getStory(resultB.storyId!);

  assert.strictEqual(reloadedA.results.en.article.headline, updatedHeadlineA, 'Story A must reflect the edited headline');
  assert.notStrictEqual(reloadedB.results.en.article.headline, updatedHeadlineA, 'Story B must remain untouched');
});

