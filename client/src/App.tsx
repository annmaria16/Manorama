import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorkflowStepper, WorkflowStage } from './components/WorkflowStepper';
import { SourceInput } from './components/SourceInput';
import { SourceAnalysis } from './components/SourceAnalysis';
import { FactGuard } from './components/FactGuard';
import { EditorialEditor } from './components/EditorialEditor';
import { PublicationPreview } from './components/PublicationPreview';
import { HeadlineStudio } from './components/HeadlineStudio';
import { DuplicateDetector } from './components/DuplicateDetector';
import { SettingsModal } from './components/SettingsModal';
import { SourceInputData, SourceAnalysisResult, GeneratedArticle, FactCheckResult } from './types';
import { SAMPLE_STORIES } from './utils/sampleData';
import { analyzeSource, generateArticle, checkFacts, fetchSystemStatus } from './utils/api';
import { AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export function App() {
  // Initialize with Sample 1 (ISRO Transcript) so the evaluator can immediately test
  const [sourceData, setSourceData] = useState<SourceInputData>(SAMPLE_STORIES[0].data);
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('source');
  
  const [analysis, setAnalysis] = useState<SourceAnalysisResult | null>(null);
  const [article, setArticle] = useState<GeneratedArticle | null>(null);
  const [factCheck, setFactCheck] = useState<FactCheckResult | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

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

  // Stage 1 -> 2: Analyze Source
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await analyzeSource(sourceData);
      setAnalysis(res.data);
      setIsDemo(res.isDemo);
      setCurrentStage('analysis');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze source material');
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 2 -> 3: Generate Article & auto-run Fact Guard
  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const articleRes = await generateArticle(sourceData, analysis || undefined);
      setArticle(articleRes.data);
      setIsDemo(articleRes.isDemo);

      // Immediately run Stage 5: Source Fact Guard on the generated article
      const fullArticleText = `${articleRes.data.headline}\n\n${articleRes.data.summary}\n\n${articleRes.data.leadParagraph}\n\n${articleRes.data.bodyParagraphs.join('\n\n')}`;
      const factRes = await checkFacts(sourceData.content, fullArticleText, sourceData.targetLanguage);
      setFactCheck(factRes.data);

      setCurrentStage('editor');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate article');
    } finally {
      setIsLoading(false);
    }
  };

  // Re-run Fact Check after manual edits
  const handleRecheckFacts = async () => {
    if (!article) return;
    setIsLoading(true);
    setError(null);
    try {
      const fullArticleText = `${article.headline}\n\n${article.summary}\n\n${article.leadParagraph}\n\n${article.bodyParagraphs.join('\n\n')}`;
      const factRes = await checkFacts(sourceData.content, fullArticleText, sourceData.targetLanguage);
      setFactCheck(factRes.data);
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
    setArticle(null);
    setFactCheck(null);
    setCurrentStage('source');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <Header
        isDemo={isDemo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={handleReset}
      />

      {/* Workflow Navigation */}
      <WorkflowStepper
        currentStage={currentStage}
        onSelectStage={setCurrentStage}
        hasAnalysis={Boolean(analysis)}
        hasArticle={Boolean(article)}
        hasFactCheck={Boolean(factCheck)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grow w-full">
        {/* Error notification banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="grow">
              <strong className="font-bold">Execution Error:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dynamic Stage Rendering */}
        {currentStage === 'source' && (
          <SourceInput
            data={sourceData}
            onChange={setSourceData}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />
        )}

        {currentStage === 'analysis' && analysis && (
          <SourceAnalysis
            analysis={analysis}
            onProceedToGenerate={handleGenerate}
            isLoading={isLoading}
            targetLanguage={sourceData.targetLanguage}
          />
        )}

        {currentStage === 'generate' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Ready to Generate Multilingual News Article
            </h2>
            <p className="text-xs text-slate-500">
              Transforming structured source intelligence into publication-ready journalism in{' '}
              <strong>{sourceData.targetLanguage === 'ml' ? 'Malayalam' : 'English'}</strong>.
            </p>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              {isLoading ? 'Transforming Story...' : 'Generate Article Now'}
            </button>
          </div>
        )}

        {currentStage === 'factguard' && factCheck && (
          <FactGuard
            factCheck={factCheck}
            onRecheck={handleRecheckFacts}
            isLoading={isLoading}
          />
        )}

        {currentStage === 'editor' && article && (
          <div className="space-y-8">
            <EditorialEditor
              article={article}
              onChange={setArticle}
              targetLanguage={sourceData.targetLanguage}
            />

            {/* Priority A Features: Headline Studio & Duplicate Detector */}
            <HeadlineStudio
              article={article}
              onApplyHeadline={hl => setArticle({ ...article, headline: hl })}
              targetLanguage={sourceData.targetLanguage}
            />

            <DuplicateDetector currentArticle={article} />

            {/* Proceed to Final Preview Button */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Editorial polish complete? View TV broadcast and newspaper publication layouts.
              </span>
              <button
                onClick={() => setCurrentStage('preview')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>Open Publication Previews</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStage === 'preview' && article && (
          <PublicationPreview article={article} />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            MANORAMA AI DESK &bull; Full-Stack Multilingual Newsroom Intelligence Studio
          </p>
          <p className="text-[11px] text-slate-400">
            Independent assessment prototype built for Software Engineer Intern evaluation &bull; Not an official Malayala Manorama product.
          </p>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onKeyUpdated={checkStatus}
      />
    </div>
  );
}

export default App;
