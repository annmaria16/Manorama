import React, { useState, useEffect } from 'react';
import { GeneratedArticle, Language } from '../types';
import {
  Edit3,
  Undo2,
  Redo2,
  Sparkles,
  Scissors,
  CheckCircle,
  Hash,
  Type,
  Plus,
  Trash2,
  FileCheck,
  Zap,
  AlignLeft,
  Download,
  Eye,
  Globe
} from 'lucide-react';
import { refineEditorial } from '../utils/api';
import { downloadStandaloneHtml } from '../utils/htmlExporter';

interface EditorialEditorProps {
  article: GeneratedArticle;
  activeLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onChange: (updated: GeneratedArticle) => void;
  onNavigateToPreview: () => void;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

export const EditorialEditor: React.FC<EditorialEditorProps> = ({
  article,
  activeLanguage,
  onSelectLanguage,
  onChange,
  onNavigateToPreview,
  availableLanguages
}) => {
  const [history, setHistory] = useState<GeneratedArticle[]>([article]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [refiningAction, setRefiningAction] = useState<string | null>(null);
  const [refineFeedback, setRefineFeedback] = useState<string | null>(null);

  // Sync state when active language changes
  useEffect(() => {
    setHistory([article]);
    setHistoryIdx(0);
  }, [article.targetLanguage]);

  const pushState = (updated: GeneratedArticle) => {
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(updated);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
    onChange(updated);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      onChange(prev);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      onChange(next);
    }
  };

  // Metrics
  const fullText = `${article.headline} ${article.summary} ${article.leadParagraph} ${article.bodyParagraphs.join(' ')} ${article.closingParagraph || ''}`;
  const wordCount = fullText.trim() ? fullText.trim().split(/\s+/).length : 0;
  const charCount = fullText.length;
  const paragraphCount = 1 + article.bodyParagraphs.length + (article.closingParagraph ? 1 : 0);
  const headlineLength = article.headline.length;

  const triggerRefine = async (action: 'headline' | 'tone' | 'grammar' | 'shorten') => {
    setRefiningAction(action);
    setRefineFeedback(null);
    try {
      let targetText = '';
      if (action === 'headline') targetText = article.headline;
      else if (action === 'shorten') targetText = article.bodyParagraphs.join('\n\n');
      else targetText = `${article.leadParagraph}\n\n${article.bodyParagraphs.slice(0, 2).join('\n\n')}`;

      const res = await refineEditorial(action, targetText, article.targetLanguage, article.summary);

      if (action === 'headline') {
        const updated = {
          ...article,
          headline: res.refinedText,
          alternativeHeadlines: res.alternatives && res.alternatives.length > 0 ? res.alternatives : article.alternativeHeadlines
        };
        pushState(updated);
      } else if (action === 'shorten') {
        const shortenedParas = res.refinedText.split('\n\n').filter(p => p.trim());
        const updated = {
          ...article,
          bodyParagraphs: shortenedParas.length > 0 ? shortenedParas : article.bodyParagraphs
        };
        pushState(updated);
      }

      setRefineFeedback(res.changeSummary || 'Refinement applied.');
      setTimeout(() => setRefineFeedback(null), 5000);
    } catch (err: any) {
      console.error(err);
      setRefineFeedback('Refinement request failed.');
    } finally {
      setRefiningAction(null);
    }
  };

  const handleBodyParagraphChange = (index: number, val: string) => {
    const updated = [...article.bodyParagraphs];
    updated[index] = val;
    pushState({ ...article, bodyParagraphs: updated });
  };

  const handleAddParagraph = () => {
    const updated = [...article.bodyParagraphs, ''];
    pushState({ ...article, bodyParagraphs: updated });
  };

  const handleRemoveParagraph = (index: number) => {
    if (article.bodyParagraphs.length <= 1) return;
    const updated = article.bodyParagraphs.filter((_, i) => i !== index);
    pushState({ ...article, bodyParagraphs: updated });
  };

  return (
    <div className="space-y-6">
      {/* 1. LANGUAGE SELECTOR SWITCHER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Active Editing Edition:
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {availableLanguages.map(l => (
            <button
              key={l.code}
              onClick={() => onSelectLanguage(l.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeLanguage === l.code
                  ? 'bg-[#D9232D] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{l.name}</span>
              <span className="opacity-75">({l.nativeName})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. TOP METRICS & CONTROLS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Newsroom Sub-Editor Desk</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Editing: {availableLanguages.find(l => l.code === activeLanguage)?.name} ({availableLanguages.find(l => l.code === activeLanguage)?.nativeName})
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Changes update immediately across previews and standalone HTML export files.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleUndo}
              disabled={historyIdx === 0}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-semibold flex items-center space-x-1"
              title="Undo edit"
            >
              <Undo2 className="w-4 h-4" />
              <span>Undo</span>
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIdx === history.length - 1}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 text-xs font-semibold flex items-center space-x-1"
              title="Redo edit"
            >
              <Redo2 className="w-4 h-4" />
              <span>Redo</span>
            </button>

            <button
              onClick={onNavigateToPreview}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => downloadStandaloneHtml(article)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Total Words</span>
            <span className="text-lg font-bold text-slate-900">{wordCount}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Characters</span>
            <span className="text-lg font-bold text-slate-900">{charCount}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Paragraphs</span>
            <span className="text-lg font-bold text-slate-900">{paragraphCount}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-semibold block uppercase text-[10px]">Reading Time</span>
            <span className="text-lg font-bold text-slate-900">~{Math.max(1, Math.ceil(wordCount / 180))} min</span>
          </div>
        </div>

        {/* AI Assisted Quick Polish Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>AI Quick Polish for {availableLanguages.find(l => l.code === activeLanguage)?.name}:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerRefine('headline')}
              disabled={Boolean(refiningAction)}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-semibold transition flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ Regenerate Headline</span>
            </button>
            <button
              onClick={() => triggerRefine('tone')}
              disabled={Boolean(refiningAction)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition flex items-center space-x-1.5"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>🎯 Polish Journalistic Tone</span>
            </button>
            <button
              onClick={() => triggerRefine('grammar')}
              disabled={Boolean(refiningAction)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition flex items-center space-x-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>✍️ Improve Grammar & Flow</span>
            </button>
            <button
              onClick={() => triggerRefine('shorten')}
              disabled={Boolean(refiningAction)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold transition flex items-center space-x-1.5"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>✂️ Shorten Body Text</span>
            </button>
          </div>

          {refineFeedback && (
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{refineFeedback}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. HEADLINE EDITOR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
            <Type className="w-4 h-4 text-red-600" />
            <span>Primary Headline</span>
          </label>
          <span className="text-xs font-semibold text-slate-500">
            {headlineLength} characters
          </span>
        </div>

        <input
          type="text"
          value={article.headline}
          onChange={e => pushState({ ...article, headline: e.target.value })}
          className="w-full px-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 font-serif"
        />

        {article.alternativeHeadlines && article.alternativeHeadlines.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Alternative Options:
            </span>
            <div className="space-y-1.5">
              {article.alternativeHeadlines.map((alt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const old = article.headline;
                    const newAlts = article.alternativeHeadlines.map((h, i) => i === idx ? old : h);
                    pushState({ ...article, headline: alt, alternativeHeadlines: newAlts });
                  }}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-red-50 border border-slate-200 text-xs text-slate-700 font-medium transition flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{alt}</span>
                  <span className="shrink-0 text-[10px] text-red-600 font-bold">Use this &rarr;</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. SUMMARY / STANDFIRST */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Short Summary / Standfirst
        </label>
        <textarea
          rows={3}
          value={article.summary}
          onChange={e => pushState({ ...article, summary: e.target.value })}
          className="w-full p-3.5 text-sm font-medium text-slate-800 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 bg-slate-50/40 leading-relaxed"
        />
      </div>

      {/* 5. LEAD PARAGRAPH */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Lead Paragraph (Inverted Pyramid)
        </label>
        <textarea
          rows={4}
          value={article.leadParagraph}
          onChange={e => pushState({ ...article, leadParagraph: e.target.value })}
          className="w-full p-3.5 text-sm font-semibold text-slate-900 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 leading-relaxed"
        />
      </div>

      {/* 6. BODY PARAGRAPHS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Body Paragraphs ({article.bodyParagraphs.length})
          </label>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Paragraph</span>
          </button>
        </div>

        <div className="space-y-3">
          {article.bodyParagraphs.map((para, idx) => (
            <div key={idx} className="relative group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Paragraph {idx + 1}
                </span>
                {article.bodyParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(idx)}
                    className="text-slate-400 hover:text-red-600 transition p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <textarea
                rows={3}
                value={para}
                onChange={e => handleBodyParagraphChange(idx, e.target.value)}
                className="w-full p-3 text-sm text-slate-800 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 7. CLOSING PARAGRAPH */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Closing Paragraph (Optional)
        </label>
        <textarea
          rows={3}
          value={article.closingParagraph || ''}
          onChange={e => pushState({ ...article, closingParagraph: e.target.value })}
          className="w-full p-3.5 text-sm text-slate-800 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 leading-relaxed"
        />
      </div>

      {/* 8. TAGS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center space-x-1">
          <Hash className="w-4 h-4 text-red-600" />
          <span>Keywords & Index Tags</span>
        </label>
        <input
          type="text"
          value={(article.keywords || []).join(', ')}
          onChange={e => {
            const splitted = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
            pushState({ ...article, keywords: splitted });
          }}
          className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
};
