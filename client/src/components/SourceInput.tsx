import React from 'react';
import { SourceInputData, SourceType, ArticleStyle, Language } from '../types';
import { SAMPLE_STORIES } from '../utils/sampleData';
import {
  FileText,
  Sparkles,
  BookOpen,
  Layers,
  AlertCircle,
  CheckCircle2,
  Globe,
  ArrowRight
} from 'lucide-react';

interface SourceInputProps {
  data: SourceInputData;
  onChange: (data: SourceInputData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const FIVE_LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
];

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
      {/* 1. Preload Sample Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-red-600" />
            <span>Demonstration Samples (One-Click Preload)</span>
          </div>
          <span className="text-xs text-slate-500">
            Real newsroom interview transcripts & notes
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_STORIES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSampleLoad(s.id)}
              className="text-left px-3.5 py-2.5 text-xs font-semibold bg-slate-50 hover:bg-red-50 hover:border-red-300 border border-slate-200 rounded-xl text-slate-700 transition flex items-center justify-between group"
            >
              <span className="truncate pr-1 group-hover:text-red-700">{s.label}</span>
              <span className="shrink-0 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                {s.sourceType}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D9232D] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Step 1: Source Material Workspace</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Input Raw Information & Define Editorial Parameters
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Provide interview transcripts, notes, drafts, or briefs. The engine will extract intelligence and generate 5 language editions in one operation.
          </p>
        </div>

        {/* Source Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Source Material Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'transcript', label: 'Interview Transcript', desc: 'Verbatim Q&A dialogue or speech' },
              { id: 'notes', label: 'Interview Notes', desc: 'Reporter shorthand & bullet points' },
              { id: 'draft', label: 'Draft Article', desc: 'Preliminary unpolished copy' },
              { id: 'brief', label: 'News Brief', desc: 'Short agency release or memo' }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => onChange({ ...data, sourceType: type.id as SourceType })}
                className={`text-left p-3.5 rounded-xl border text-xs transition ${
                  data.sourceType === type.id
                    ? 'border-[#D9232D] bg-red-50/60 text-red-950 font-bold ring-2 ring-red-600/10'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="font-extrabold">{type.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Configurations: Title, Source Lang, Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Source Title / Working Headline <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={e => onChange({ ...data, title: e.target.value })}
              placeholder="e.g. Exclusive Interview with ISRO Chairman S. Somanath on Moon Sample Return"
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Source Material Language
            </label>
            <input
              type="text"
              value={data.sourceLanguage}
              onChange={e => onChange({ ...data, sourceLanguage: e.target.value })}
              placeholder="e.g. English or Malayalam"
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 transition font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Journalistic Article Style
            </label>
            <select
              value={data.articleStyle}
              onChange={e => onChange({ ...data, articleStyle: e.target.value as ArticleStyle })}
              className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 transition font-semibold"
            >
              <option value="standard">Standard News Report (Inverted Pyramid Lead + Core Body)</option>
              <option value="formal">Formal News Report (Authoritative Documentation + Official Quotes)</option>
              <option value="feature">Feature-Style Article (Contextual Narrative + Detailed Exploration)</option>
            </select>
          </div>
        </div>

        {/* AUTOMATIC 5-LANGUAGE PIPELINE TARGET INDICATOR */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-red-600" />
              <span>Target Newsroom Output: 5 Simultaneous Languages</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Auto-Multilingual
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            {FIVE_LANGUAGES.map(lang => (
              <div
                key={lang.code}
                className="bg-white border border-slate-200 rounded-lg p-2 text-center shadow-2xs"
              >
                <div className="text-xs font-bold text-slate-900">{lang.name}</div>
                <div className="text-[11px] font-semibold text-red-700">{lang.nativeName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Source Material Content <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-500 font-semibold">{wordCount} words</span>
              <span className={`font-bold ${isTooShort ? 'text-amber-600' : isTooLong ? 'text-red-600' : 'text-slate-600'}`}>
                {charCount.toLocaleString()} / 50,000 chars
              </span>
            </div>
          </div>
          <textarea
            rows={10}
            value={data.content}
            onChange={e => onChange({ ...data, content: e.target.value })}
            placeholder="Paste your raw interview transcript, reporter shorthand, draft article, or news brief here..."
            className={`w-full p-4 text-sm font-mono border rounded-xl focus:outline-hidden transition leading-relaxed ${
              isTooShort
                ? 'border-amber-300 focus:ring-2 focus:ring-amber-400 bg-amber-50/20'
                : isTooLong
                ? 'border-red-400 focus:ring-2 focus:ring-red-400 bg-red-50/20'
                : 'border-slate-300 focus:ring-2 focus:ring-red-500 bg-slate-50/50'
            }`}
          />
          {isTooShort && (
            <p className="text-xs text-amber-600 mt-1 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Input is too brief. Please enter at least 25 characters of source text.</span>
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
            placeholder="e.g. Focus on the 2028 timeline, keep tone authoritative, quote the chief verbatim"
            className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 transition font-medium"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-100">
          <div className="text-xs text-slate-500 hidden sm:block">
            Next: AI extracts structured 5Ws+1H and generates articles in all 5 languages in one workflow.
          </div>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isLoading}
            className={`px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-md flex items-center space-x-2 transition ${
              isValid && !isLoading
                ? 'bg-[#D9232D] hover:bg-[#B71C1C] active:scale-95'
                : 'bg-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing 5-Language Newsroom Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Extract Story Intelligence & Generate 5 Languages</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
