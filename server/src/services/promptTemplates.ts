import { SourceInputPayload, Language, ArticleStyle } from '../types.js';

export function buildAnalysisPrompt(payload: SourceInputPayload): string {
  return `You are a Senior Chief Sub-Editor and NLP Information Extraction Specialist at a leading newsroom (Malayala Manorama).
Your mission is to perform a rigorous, objective news intelligence extraction from the provided source material.

SOURCE TYPE: ${payload.sourceType}
SOURCE LANGUAGE: ${payload.sourceLanguage}
${payload.title ? `SOURCE TITLE: ${payload.title}` : ''}
${payload.editorialInstructions ? `EDITORIAL INSTRUCTIONS: ${payload.editorialInstructions}` : ''}

SOURCE CONTENT:
\"\"\"
${payload.content}
\"\"\"

Extract and structure all journalistic facts. DO NOT fabricate, hallucinate, or fill in gaps with assumptions. If information is missing or unclear, explicitly list it under "unclearOrMissing".

Respond strictly with a valid JSON object matching this exact schema:
{
  "mainEvent": "Clear 1-2 sentence core breaking news event",
  "mainSubject": "The central topic or subject matter",
  "fiveWs": {
    "who": "Key individuals, officials, victims, or groups involved",
    "what": "What happened or was announced",
    "when": "Exact time, day, date, or timeframe mentioned",
    "where": "Precise location, city, district, venue, or online platform",
    "why": "Underlying cause, motive, or stated rationale (or 'Not specified in source' if absent)",
    "how": "Mechanism, procedure, or manner of occurrence"
  },
  "entities": {
    "names": ["Full names and designations of people mentioned"],
    "places": ["Towns, cities, states, landmarks, venues"],
    "organizations": ["Agencies, parties, departments, institutions"],
    "dates": ["All specific dates or calendar references"],
    "numbersAndStats": ["Statistics, monetary figures, metrics, percentages, counts"],
    "directQuotes": ["Verbatim or primary quotations with attribution if present"],
    "supportingDetails": ["Crucial contextual facts, background details, milestones"],
    "unclearOrMissing": ["Gaps in the source, unconfirmed claims, or details that need reporter follow-up"]
  },
  "summaryPointCount": 5
}`;
}

export function buildArticleGenerationPrompt(
  payload: SourceInputPayload,
  targetLang: Language,
  analysisJson?: string
): string {
  const languageInstructions: Record<Language, string> = {
    ml: `Generate the article strictly in natural, professional, publication-ready MALAYALAM (മലയാളം).
Follow Malayala Manorama's editorial standards:
- Use formal Malayalam journalistic phrasing ("പ്രസ്താവിച്ചു", "വ്യക്തമാക്കി", "ചൂണ്ടിക്കാട്ടി", "അറിയിച്ചു").
- Avoid unnatural direct English transliterations or clumsy machine translations.
- Correctly transliterate proper nouns and designations into Malayalam script (e.g. ഐഎസ്ആർഒ, തിരുവനന്തപുരം, മുഖ്യമന്ത്രി).
- Maintain authoritative, respectful tone with active and inverted-pyramid flow.`,
    en: `Generate the article strictly in polished, publication-ready Newsroom ENGLISH (Onmanorama style).
- Clear inverted pyramid lead paragraph.
- Crisp, active voice, professional journalistic style.
- Accurate quotes, attributions, designations, and numbers.`,
    hi: `Generate the article strictly in standard, publication-ready HINDI journalism (हिंदी).
- Follow national broadsheet Hindi news conventions and clear paragraph flow.
- Proper Hindi headline style and formal journalistic vocabulary.`,
    ta: `Generate the article strictly in polished, publication-ready TAMIL journalism (தமிழ்).
- Follow standard Tamil broadsheet news conventions (e.g. "தெரிவித்தார்", "குறிப்பிட்டார்", "அறிவித்தார்").
- Transliterate proper nouns accurately into Tamil script.
- Maintain formal, objective inverted-pyramid structure.`,
    te: `Generate the article strictly in polished, publication-ready TELUGU journalism (తెలుగు).
- Follow standard Telugu broadsheet news conventions (e.g. "వెల్లడించారు", "పేర్కొన్నారు", "స్పష్టం చేశారు").
- Transliterate proper nouns accurately into Telugu script.
- Maintain formal, objective inverted-pyramid structure.`
  };

  const styleInstructions: Record<ArticleStyle, string> = {
    standard: `Style: STANDARD NEWS REPORT. Punchy, factual, inverted pyramid structure with the most critical breaking information in the opening paragraph.`,
    formal: `Style: FORMAL NEWS REPORT. Highly authoritative, objective, detailed documentation with official statements, procedural details, and exact chronologies.`,
    feature: `Style: FEATURE-STYLE ARTICLE. Engaging human-interest lead, rich contextual narrative, character focus, and thoughtful conclusion while keeping 100% of factual accuracy.`
  };

  return `You are an elite Senior Multilingual News Editor at Manorama AI Desk.
Generate a structured, publication-ready news article based EXCLUSIVELY on the provided source information.

TARGET LANGUAGE: ${targetLang}
${styleInstructions[payload.articleStyle]}
${languageInstructions[targetLang]}

${payload.editorialInstructions ? `SPECIAL EDITORIAL INSTRUCTIONS: ${payload.editorialInstructions}` : ''}
${payload.title ? `PROPOSED WORKING TITLE: ${payload.title}` : ''}

SOURCE MATERIAL:
\"\"\"
${payload.content}
\"\"\"

${analysisJson ? `EXTRACTED SOURCE INTELLIGENCE:\n${analysisJson}\n` : ''}

CRITICAL JOURNALISTIC INTEGRITY RULES:
1. HEADLINE MUST MATCH CONTENT: The generated headline and 3 alternatives MUST represent the true subject of the SOURCE MATERIAL. If a proposed working title contradicts or does not match the story content, ignore the working title and generate a new, highly accurate headline matching the source.
2. Inverted pyramid lead: First paragraph must answer the key Who, What, Where, When.
3. Absolutely DO NOT fabricate quotes, people, numbers, causes, or locations.
4. If an explanation is not in the source, DO NOT invent one.
4. Preserve all numbers, statistics, dates, and official names faithfully.
5. Create 3 distinct alternative headlines (e.g. breaking style, concise broadsheet style, SEO/digital style).
6. Provide a concise 2-sentence summary/standfirst.
7. Organize the body into 3 to 6 logical paragraphs with smooth journalistic transitions.
8. Relevant tags/keywords in target language.

Respond strictly with a valid JSON object matching this exact schema:
{
  "headline": "Compelling, journalistic headline in target language",
  "alternativeHeadlines": [
    "Alternative Headline 1 (Direct/Broadsheet)",
    "Alternative Headline 2 (Digital/SEO)",
    "Alternative Headline 3 (Short/Punchy)"
  ],
  "summary": "Crisp 1-2 sentence standfirst/summary in target language",
  "leadParagraph": "Impactful lead paragraph following the inverted pyramid rule",
  "bodyParagraphs": [
    "First body paragraph expanding on key details",
    "Second body paragraph with context, numbers or quotes",
    "Third body paragraph with supporting background"
  ],
  "closingParagraph": "Concluding sentence or paragraph on next steps / ongoing investigation / follow up",
  "keywords": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "style": "${payload.articleStyle}",
  "targetLanguage": "${targetLang}",
  "wordCount": 320,
  "readingTimeMinutes": 2
}`;
}

export function buildFactGuardPrompt(sourceContent: string, articleText: string, targetLanguage: Language): string {
  return `You are the Chief Fact & Verification Editor for Manorama AI Desk ("SOURCE FACT GUARD").
Your job is to cross-examine a generated news article in ${targetLanguage} against the original source text.

SOURCE TEXT:
\"\"\"
${sourceContent}
\"\"\"

GENERATED ARTICLE:
\"\"\"
${articleText}
\"\"\"

Check the following categories:
- Names & Designations
- Locations & Places
- Dates & Timelines
- Numbers, Statistics, Counts, & Currency
- Organizations & Agencies
- Direct & Indirect Quotes
- Core Factual Claims
- Missing Significant Source Information

For each finding, classify the status strictly as one of:
1. "supported" — Factually affirmed by the source text.
2. "needs_verification" — Ambiguous, slightly rephrased, or context differs.
3. "unsupported" — Statement, name, number, or claim NOT found in or contradicted by source (potential hallucination).
4. "missing_detail" — A vital fact from source was omitted in the article.

Respond strictly with a valid JSON object matching this schema:
{
  "summary": {
    "totalChecked": 8,
    "supportedCount": 6,
    "needsVerificationCount": 1,
    "unsupportedCount": 1,
    "missingDetailsCount": 0,
    "overallIntegrityScore": 88
  },
  "items": [
    {
      "id": "fact-1",
      "category": "name",
      "statement": "The exact statement or entity from the article",
      "sourceReference": "Corresponding quote or excerpt from original source (or 'None' if missing)",
      "status": "supported",
      "explanation": "Why this status was assigned"
    }
  ],
  "checkedAt": "${new Date().toISOString()}"
}`;
}

export function buildRefinePrompt(action: string, text: string, targetLanguage: Language, context?: string): string {
  return `You are a Senior Copy Editor at Manorama AI Desk.
Perform the following editorial action on the text while PRESERVING 100% of factual meaning and names:

ACTION: ${action} (Options: 'headline', 'tone', 'grammar', 'shorten', 'expand')
TARGET LANGUAGE: ${targetLanguage}
${context ? `ARTICLE CONTEXT:\n${context}\n` : ''}

INPUT TEXT:
\"\"\"
${text}
\"\"\"

GUIDELINES:
- If action is 'headline': Provide 3 punchy, publication-grade headline options in ${targetLanguage}.
- If action is 'tone': Eliminate sensationalism or passive weakness, make it authoritative, objective newsroom tone.
- If action is 'grammar': Correct grammar, punctuation, and typographical flow in ${targetLanguage}.
- If action is 'shorten': Condense by ~30% while keeping every single hard fact, number, and name.
- If action is 'expand': Add journalistic transition words and clarity without inventing unstated facts.

Respond strictly with a valid JSON object:
{
  "refinedText": "The improved text",
  "alternatives": ["Optional alternative 1", "Optional alternative 2"],
  "changeSummary": "1 sentence explanation of what was enhanced"
}`;
}
