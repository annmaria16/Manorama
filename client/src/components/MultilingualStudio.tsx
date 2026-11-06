import React, { useState } from 'react';
import {
  Language,
  GeneratedArticle,
  LanguageGenerationStatus,
  FactCheckResult,
  MainNavSection
} from '../types';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Edit3,
  Eye,
  Columns,
  List,
  Sparkles,
  ShieldCheck,
  Clock,
  Type,
  FileText
} from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/htmlExporter';

interface MultilingualStudioProps {
  multilingualResults: Record<Language, LanguageGenerationStatus>;
  activeLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onUpdateArticle: (lang: Language, updated: GeneratedArticle) => void;
  onRetryLanguage: (lang: Language) => void;
  onNavigateToEditor: (lang: Language) => void;
  onNavigateToPreview: (lang: Language) => void;
  onNavigateToFactGuard: (lang: Language) => void;
  isRetrying: boolean;
}

const LANGUAGES_META: { code: Language; name: string; nativeName: string; fontClass: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', fontClass: 'font-serif', flag: '🇬🇧' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', fontClass: 'font-malayalam', flag: '🌴' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', fontClass: 'font-hindi', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', fontClass: 'font-tamil', flag: '🏛️' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', fontClass: 'font-telugu', flag: '🪔' }
];

export const MultilingualStudio: React.FC<MultilingualStudioProps> = ({
  multilingualResults,
  activeLanguage,
  onSelectLanguage,
  onUpdateArticle,
  onRetryLanguage,
  onNavigateToEditor,
  onNavigateToPreview,
  onNavigateToFactGuard,
  isRetrying
}) => {
  const [viewMode, setViewMode] = useState<'tabs' | 'comparison'>('tabs');

  const activeResult = multilingualResults[activeLanguage];
  const activeArticle = activeResult?.article;
  const activeFactCheck = activeResult?.factCheck;

  const handleDownloadAll = () => {
    LANGUAGES_META.forEach(meta => {
      const item = multilingualResults[meta.code];
      if (item?.article) {
        downloadStandaloneHtml(item.article);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP CONTROL BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D9232D] text-xs font-bold uppercase tracking-wider mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Multilingual Editorial Studio (5 Simultaneous Languages)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Single-Source Multilingual Newsroom
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              All five editions were generated directly from the common source material. Switch tabs to inspect, edit, verify, or download each language edition.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => setViewMode('tabs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  viewMode === 'tabs' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Tabbed View</span>
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                  viewMode === 'comparison' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>5-Language Comparison</span>
              </button>
            </div>

            {/* Batch Download Button */}
            <button
              onClick={handleDownloadAll}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-1.5 active:scale-95"
              title="Download Standalone HTML for all 5 languages"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All 5 (HTML)</span>
            </button>
          </div>
        </div>

        {/* 2. FIVE LANGUAGE STATUS TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {LANGUAGES_META.map(meta => {
            const statusObj = multilingualResults[meta.code];
            const isCompleted = statusObj?.status === 'completed';
            const isFailed = statusObj?.status === 'failed';
            const isGenerating = statusObj?.status === 'generating';
            const isActive = activeLanguage === meta.code;

            return (
              <button
                key={meta.code}
                onClick={() => onSelectLanguage(meta.code)}
                className={`text-left p-3 rounded-xl border transition relative ${
                  isActive
                    ? 'border-[#D9232D] bg-red-50/50 ring-2 ring-red-600/10 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                    <span>{meta.flag}</span>
                    <span>{meta.name}</span>
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isFailed && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                  {isGenerating && (
                    <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>

                <div className="text-sm font-extrabold text-[#0F1E36]">
                  {meta.nativeName}
                </div>

                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{statusObj?.article?.wordCount || 0} words</span>
                  <span className={`font-semibold uppercase ${isCompleted ? 'text-emerald-700' : isFailed ? 'text-rose-700' : 'text-slate-400'}`}>
                    {statusObj?.status || 'Pending'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: TABBED LANGUAGE WORKSPACE                                         */}
      {/* ========================================================================= */}
      {viewMode === 'tabs' && (
        <div className="space-y-6">
          {activeResult?.status === 'failed' ? (
            <div className="bg-white border border-rose-200 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Generation for {LANGUAGES_META.find(m => m.code === activeLanguage)?.name} Failed
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {activeResult.error || 'The model did not return a valid article for this language.'}
              </p>
              <button
                onClick={() => onRetryLanguage(activeLanguage)}
                disabled={isRetrying}
                className="px-5 py-2.5 bg-[#D9232D] hover:bg-[#B71C1C] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5 mx-auto"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>Retry Only This Language</span>
              </button>
            </div>
          ) : activeArticle ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Language Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-[#B71C1C]">
                      {LANGUAGES_META.find(m => m.code === activeLanguage)?.name} Edition
                    </span>
                    <span className="text-xs text-slate-500">
                      &bull; {activeArticle.wordCount} words &bull; {activeArticle.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2 font-serif">
                    {activeArticle.headline}
                  </h3>
                </div>

                {/* Quick actions for this language */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigateToEditor(activeLanguage)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Open in Editor</span>
                  </button>

                  <button
                    onClick={() => onNavigateToPreview(activeLanguage)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Publication Preview</span>
                  </button>

                  <button
                    onClick={() => downloadStandaloneHtml(activeArticle)}
                    className="px-3.5 py-2 rounded-xl bg-[#D9232D] hover:bg-[#B71C1C] text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Standalone HTML</span>
                  </button>
                </div>
              </div>

              {/* Standfirst */}
              <div className="p-4 bg-red-50/40 border-l-4 border-[#D9232D] rounded-r-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 block mb-1">
                  Standfirst / Summary
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {activeArticle.summary}
                </p>
              </div>

              {/* Lead & Body Paragraphs */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Lead Paragraph (Inverted Pyramid)
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {activeArticle.leadParagraph}
                  </p>
                </div>

                {activeArticle.bodyParagraphs.map((para, i) => (
                  <div key={i} className="text-sm sm:text-base text-slate-800 leading-relaxed text-justify">
                    {para}
                  </div>
                ))}

                {activeArticle.closingParagraph && (
                  <div className="p-4 bg-slate-50 rounded-xl border-l-2 border-slate-300 italic text-sm text-slate-700">
                    {activeArticle.closingParagraph}
                  </div>
                )}
              </div>

              {/* Keywords */}
              {activeArticle.keywords && activeArticle.keywords.length > 0 && (
                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-2 uppercase self-center">Tags:</span>
                  {activeArticle.keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Language Fact Guard preview */}
              {activeFactCheck && (
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">
                      Source Fact Guard: {activeFactCheck.summary.overallIntegrityScore}% Fidelity
                    </span>
                    <span className="text-slate-500">
                      ({activeFactCheck.summary.supportedCount} verified claims, {activeFactCheck.summary.unsupportedCount} unsupported)
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigateToFactGuard(activeLanguage)}
                    className="font-bold text-[#D9232D] hover:underline"
                  >
                    View Verification Audit &rarr;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
              No article available for this language. Click 'Create Article' to start.
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SIDE-BY-SIDE 5-LANGUAGE COMPARISON                                */}
      {/* ========================================================================= */}
      {viewMode === 'comparison' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 tracking-tight">
              5-Language Headline & Lead Comparison (Cross-Language Consistency)
            </h3>
            <span className="text-xs text-slate-500">
              Generated from the single original source material
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {LANGUAGES_META.map(meta => {
              const res = multilingualResults[meta.code];
              const art = res?.article;

              return (
                <div
                  key={meta.code}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                        <span>{meta.flag}</span>
                        <span>{meta.name}</span>
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {meta.code}
                      </span>
                    </div>

                    {art ? (
                      <>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {art.headline}
                        </h4>
                        <p className="text-[11px] text-slate-600 line-clamp-4 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                          {art.leadParagraph}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No article generated</p>
                    )}
                  </div>

                  {art && (
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-semibold">{art.wordCount} words</span>
                      <button
                        onClick={() => {
                          onSelectLanguage(meta.code);
                          setViewMode('tabs');
                        }}
                        className="text-[#D9232D] font-bold hover:underline"
                      >
                        Inspect &rarr;
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

