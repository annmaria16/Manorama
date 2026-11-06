import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NewsroomOverview } from './components/NewsroomOverview';
import { SourceInput } from './components/SourceInput';
import { SourceAnalysis } from './components/SourceAnalysis';
import { MultilingualStudio } from './components/MultilingualStudio';
import { EditorialEditor } from './components/EditorialEditor';
import { PublicationPreview } from './components/PublicationPreview';
import { FactGuard } from './components/FactGuard';
import { ExportCenter } from './components/ExportCenter';
import { HeadlineStudio } from './components/HeadlineStudio';
import { DuplicateDetector } from './components/DuplicateDetector';
import { SettingsModal } from './components/SettingsModal';
import { SavedStoriesModal } from './components/SavedStoriesModal';
import {
  MainNavSection,
  SourceInputData,
  SourceAnalysisResult,
  Language,
  GeneratedArticle,
  LanguageGenerationStatus
} from './types';
import { SAMPLE_STORIES } from './utils/sampleData';
import {
  analyzeSource,
  generateMultilingual,
  retrySingleLanguage,
  checkFacts,
  fetchSystemStatus,
  updateArticleInDb
} from './utils/api';
import { AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

const AVAILABLE_LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
];

export function App() {
  const [currentSection, setCurrentSection] = useState<MainNavSection>('overview');
  const [activeLanguage, setActiveLanguage] = useState<Language>('ml');
  const [activeStoryId, setActiveStoryId] = useState<string | undefined>(undefined);

  const [sourceData, setSourceData] = useState<SourceInputData>(SAMPLE_STORIES[0].data);
  const [analysis, setAnalysis] = useState<SourceAnalysisResult | null>(null);

  // 5-Language Results State
  const [multilingualResults, setMultilingualResults] = useState<Record<Language, LanguageGenerationStatus>>({} as any);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);

  const checkStatus = () => {
    fetchSystemStatus()
      .then(res => {
        setIsDemo(res.mode === 'demo_mode');
      })
      .catch(() => {
        setIsDemo(true);
      });
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const hasArticles = Boolean(
    multilingualResults.en?.article ||
    multilingualResults.ml?.article ||
    multilingualResults.hi?.article
  );

  // 1. Analyze Source
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await analyzeSource(sourceData);
      setAnalysis(res.data);
      setIsDemo(res.isDemo);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze source material');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. AUTOMATIC 5-LANGUAGE PIPELINE EXECUTION
  const handleGenerateAllLanguages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await generateMultilingual(sourceData, analysis || undefined);
      setAnalysis(res.sourceAnalysis);
      setMultilingualResults(res.results);
      setActiveStoryId(res.storyId);
      setIsDemo(res.isDemo);
      setCurrentSection('multilingual');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Multilingual generation pipeline failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Retry a single language if needed
  const handleRetryLanguage = async (lang: Language) => {
    setIsRetrying(true);
    try {
      const res = await retrySingleLanguage(sourceData, lang, analysis || undefined);
      setMultilingualResults(prev => ({
        ...prev,
        [lang]: res.data
      }));
    } catch (err: any) {
      console.error(err);
      setError(err.message || `Failed to regenerate ${lang} edition.`);
    } finally {
      setIsRetrying(false);
    }
  };

  // 4. Update an article in state and persist to database
  const handleUpdateArticle = (lang: Language, updated: GeneratedArticle) => {
    setMultilingualResults(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        article: updated
      }
    }));

    // Persist user modifications to database
    if (activeStoryId) {
      updateArticleInDb(activeStoryId, lang, updated).catch(err => {
        console.warn('Could not persist edit to database:', err);
      });
    }
  };

  // 5. Load a saved story from database archive
  const handleSelectSavedStory = (storyData: any) => {
    if (!storyData) return;
    setActiveStoryId(storyData.storyId);
    if (storyData.source) {
      setSourceData({
        title: storyData.source.title || '',
        sourceType: storyData.source.sourceType || 'transcript',
        sourceLanguage: storyData.source.sourceLanguage || 'en',
        articleStyle: storyData.source.style || 'standard',
        content: storyData.source.content || '',
        editorialInstructions: storyData.source.editorialInstructions || '',
        targetLanguages: ['en', 'ml', 'hi', 'ta', 'te']
      });
    }
    if (storyData.results) {
      setMultilingualResults(storyData.results);
    }
    setCurrentSection('multilingual');
  };

  // 5. Recheck facts for the active language
  const handleRecheckFacts = async () => {
    const currentArt = multilingualResults[activeLanguage]?.article;
    if (!currentArt) return;
    setIsLoading(true);
    try {
      const fullText = `${currentArt.headline}\n\n${currentArt.summary}\n\n${currentArt.leadParagraph}\n\n${currentArt.bodyParagraphs.join('\n\n')}`;
      const res = await checkFacts(sourceData.content, fullText, activeLanguage);
      setMultilingualResults(prev => ({
        ...prev,
        [activeLanguage]: {
          ...prev[activeLanguage],
          factCheck: res.data
        }
      }));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Fact check failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSourceData(SAMPLE_STORIES[0].data);
    setAnalysis(null);
    setMultilingualResults({} as any);
    setCurrentSection('overview');
    setError(null);
  };

  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_STORIES.find(s => s.id === sampleId);
    if (sample) {
      setSourceData({ ...sample.data });
      setAnalysis(null);
      setMultilingualResults({} as any);
    }
  };

  const activeArticle = multilingualResults[activeLanguage]?.article || multilingualResults.ml?.article || multilingualResults.en?.article;
  const activeFactCheck = multilingualResults[activeLanguage]?.factCheck || multilingualResults.ml?.factCheck;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans selection:bg-[#D9232D] selection:text-white">
      {/* Top Newsroom Header */}
      <Header
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        isDemo={isDemo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={handleReset}
        hasArticles={hasArticles}
        onOpenSavedStories={() => setIsArchiveOpen(true)}
      />

      {/* Main Newsroom Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grow w-full">
        {/* Error notification banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-3 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="grow">
              <strong className="font-bold">Newsroom System Alert:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* SECTION 1: OVERVIEW / HOME */}
        {currentSection === 'overview' && (
          <NewsroomOverview
            onNavigate={setCurrentSection}
            onLoadSample={handleLoadSample}
            hasArticles={hasArticles}
          />
        )}

        {/* SECTION 2: CREATE NEWS ARTICLE (SOURCE INPUT & ANALYSIS) */}
        {currentSection === 'create' && (
          <div className="space-y-8">
            <SourceInput
              data={sourceData}
              onChange={setSourceData}
              onSubmit={handleGenerateAllLanguages}
              isLoading={isLoading}
            />

            {analysis && (
              <SourceAnalysis
                analysis={analysis}
                onProceedToGenerate={handleGenerateAllLanguages}
                isLoading={isLoading}
                targetLanguage={activeLanguage}
              />
            )}
          </div>
        )}

        {/* SECTION 3: MULTILINGUAL ARTICLES (5 LANGUAGES AUTOMATIC) */}
        {currentSection === 'multilingual' && (
          <MultilingualStudio
            multilingualResults={multilingualResults}
            activeLanguage={activeLanguage}
            onSelectLanguage={setActiveLanguage}
            onUpdateArticle={handleUpdateArticle}
            onRetryLanguage={handleRetryLanguage}
            onNavigateToEditor={lang => {
              setActiveLanguage(lang);
              setCurrentSection('editor');
            }}
            onNavigateToPreview={lang => {
              setActiveLanguage(lang);
              setCurrentSection('preview');
            }}
            onNavigateToFactGuard={lang => {
              setActiveLanguage(lang);
              setCurrentSection('factguard');
            }}
            isRetrying={isRetrying}
          />
        )}

        {/* SECTION 4: ARTICLE EDITOR */}
        {currentSection === 'editor' && (
          <div className="space-y-8">
            {activeArticle ? (
              <>
                <EditorialEditor
                  article={activeArticle}
                  activeLanguage={activeLanguage}
                  onSelectLanguage={setActiveLanguage}
                  onChange={updated => handleUpdateArticle(activeLanguage, updated)}
                  onNavigateToPreview={() => setCurrentSection('preview')}
                  availableLanguages={AVAILABLE_LANGUAGES}
                />

                <HeadlineStudio
                  article={activeArticle}
                  onApplyHeadline={hl => handleUpdateArticle(activeLanguage, { ...activeArticle, headline: hl })}
                  targetLanguage={activeLanguage}
                />

                <DuplicateDetector currentArticle={activeArticle} />
              </>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                <p className="text-slate-500 text-sm">
                  No article available for editing. Start by creating a story.
                </p>
                <button
                  onClick={() => setCurrentSection('create')}
                  className="px-5 py-2.5 bg-[#D9232D] text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Create Story Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* SECTION 5: SOURCE FACT GUARD */}
        {currentSection === 'factguard' && (
          <div>
            {activeFactCheck ? (
              <FactGuard
                factCheck={activeFactCheck}
                activeLanguage={activeLanguage}
                onSelectLanguage={setActiveLanguage}
                availableLanguages={AVAILABLE_LANGUAGES}
                onRecheck={handleRecheckFacts}
                isLoading={isLoading}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                Please generate an article first to view the factual cross-examination.
              </div>
            )}
          </div>
        )}

        {/* SECTION 6: PUBLICATION PREVIEW */}
        {currentSection === 'preview' && (
          <div>
            {activeArticle ? (
              <PublicationPreview
                article={activeArticle}
                activeLanguage={activeLanguage}
                onSelectLanguage={setActiveLanguage}
                availableLanguages={AVAILABLE_LANGUAGES}
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                Please generate an article first to view multi-medium publication previews.
              </div>
            )}
          </div>
        )}

        {/* SECTION 7: EXPORT / DOWNLOADS */}
        {currentSection === 'export' && (
          <ExportCenter
            multilingualResults={multilingualResults}
            availableLanguages={AVAILABLE_LANGUAGES}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-700">
            MANORAMA AI DESK &bull; Automatic 5-Language Newsroom Content Studio
          </p>
          <p className="text-[11px] text-slate-400">
            Independent Software Engineer Intern Assessment Prototype &bull; Designed for Malayala Manorama Evaluation
          </p>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onKeyUpdated={checkStatus}
      />

      {/* Database Saved Stories Modal */}
      <SavedStoriesModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectStory={handleSelectSavedStory}
        activeStoryId={activeStoryId}
      />
    </div>
  );
}

export default App;
