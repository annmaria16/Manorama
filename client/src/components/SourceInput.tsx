import React from 'react';
import { SourceInputData, SourceType, Language, ArticleStyle } from '../types';
import { SAMPLE_STORIES } from '../utils/sampleData';
import { FileText, Sparkles, BookOpen, Layers, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SourceInputProps {
  data: SourceInputData;
  onChange: (data: SourceInputData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SourceInput: React.FC<SourceInputProps> = ({
  data,
  onChange,
  onSubmit,
  isLoading
}) => {
  const charCount = data.content.length;
  const wordCount = data.content.trim() ? data.content.trim().split(/\s+/).length : 0;
  const isTooShort = charCount > 0 && charCount < 25;
  const isTooLong = charCount > 50000;
  const isValid = charCount >= 25 && !isTooLong;

  const handleSampleLoad = (sampleId: string) => {
    const sample = SAMPLE_STORIES.find(s => s.id === sampleId);
    if (sample) {
      onChange({ ...sample.data });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sample presets bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold text-sm">
            <BookOpen className="w-4 h-4 text-red-600" />
            <span>Demonstration Samples (One-Click Preload)</span>
          </div>
          <span className="text-xs text-slate-500">
            Pre-loaded realistic Kerala newsroom transcripts & notes
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_STORIES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSampleLoad(s.id)}
              className="text-left px-3 py-2 text-xs font-medium bg-white hover:bg-red-50 hover:border-red-300 border border-slate-200 rounded-lg text-slate-700 transition flex items-center justify-between shadow-2xs group"
            >
              <span className="truncate pr-1 group-hover:text-red-700">{s.label}</span>
              <span className="shrink-0 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {s.data.targetLanguage}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-red-600" />
            <span>Stage 1: Source Material Workspace</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Input raw interview transcripts, reporter notes, draft stories, or news agency briefs.
          </p>
        </div>

        {/* Source Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Source Material Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'transcript', label: 'Interview Transcript', desc: 'Q&A dialogue or speech' },
              { id: 'notes', label: 'Interview Notes', desc: 'Reporter shorthand & bullet points' },
              { id: 'draft', label: 'Draft Article', desc: 'Unpolished preliminary copy' },
              { id: 'brief', label: 'News Brief', desc: 'Short agency release or memo' }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => onChange({ ...data, sourceType: type.id as SourceType })}
                className={`text-left p-3 rounded-lg border text-xs transition ${
                  data.sourceType === type.id
                    ? 'border-red-600 bg-red-50/60 text-red-950 font-semibold ring-2 ring-red-600/10'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="font-bold">{type.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Configurations Grid: Title, Languages, Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Source Title */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Source Title / Topic <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={e => onChange({ ...data, title: e.target.value })}
              placeholder="e.g. ISRO Chairman Press Briefing at Thiruvananthapuram"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          {/* Source Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Source Language
            </label>
            <input
              type="text"
              value={data.sourceLanguage}
              onChange={e => onChange({ ...data, sourceLanguage: e.target.value })}
              placeholder="e.g. English or Malayalam"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          {/* Target Language */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Publication Language
            </label>
            <select
              value={data.targetLanguage}
              onChange={e => onChange({ ...data, targetLanguage: e.target.value as Language })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition font-medium"
            >
              <option value="ml">Malayalam (മലയാളം - Manorama Online / Print)</option>
              <option value="en">English (Onmanorama)</option>
              <option value="hi">Hindi (हिंदी - National)</option>
            </select>
          </div>

          {/* Article Style */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Article Journalistic Style
            </label>
            <select
              value={data.articleStyle}
              onChange={e => onChange({ ...data, articleStyle: e.target.value as ArticleStyle })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition font-medium"
            >
              <option value="standard">Standard News Report (Inverted Pyramid)</option>
              <option value="formal">Formal News Report (Detailed & Procedural)</option>
              <option value="feature">Feature-Style Article (Narrative Context)</option>
            </select>
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Source Content Material <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-500 font-medium">
                {wordCount} words
              </span>
              <span className={`font-semibold ${isTooShort ? 'text-amber-600' : isTooLong ? 'text-red-600' : 'text-slate-600'}`}>
                {charCount.toLocaleString()} / 50,000 chars
              </span>
            </div>
          </div>
          <textarea
            rows={10}
            value={data.content}
            onChange={e => onChange({ ...data, content: e.target.value })}
            placeholder="Paste or write your raw interview transcript, reporter shorthand, draft article, or news brief here..."
            className={`w-full p-4 text-sm font-mono border rounded-xl focus:outline-hidden transition leading-relaxed ${
              isTooShort
                ? 'border-amber-300 focus:ring-2 focus:ring-amber-400 bg-amber-50/20'
                : isTooLong
                ? 'border-red-400 focus:ring-2 focus:ring-red-400 bg-red-50/20'
                : 'border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50'
            }`}
          />
          {isTooShort && (
            <p className="text-xs text-amber-600 mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Input is too brief. Please enter at least 25 characters of source text.</span>
            </p>
          )}
          {isTooLong && (
            <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Input exceeds maximum allowable 50,000 characters. Please condense source text.</span>
            </p>
          )}
        </div>

        {/* Additional Editorial Instructions */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Additional Editorial Instructions <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={data.editorialInstructions}
            onChange={e => onChange({ ...data, editorialInstructions: e.target.value })}
            placeholder="e.g. Highlight the timeline prominently, keep tone strictly objective, quote the chief directly"
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        {/* Submit Action */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="text-xs text-slate-500 hidden sm:block">
            Next: AI extracts structured 5Ws+1H and verified entity facts before generating the article.
          </div>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isLoading}
            className={`px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center space-x-2 transition ${
              isValid && !isLoading
                ? 'bg-red-600 hover:bg-red-700 active:scale-[0.98]'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Extracting Story Intelligence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Source & Extract Intelligence</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
