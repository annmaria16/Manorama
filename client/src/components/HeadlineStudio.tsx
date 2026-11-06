import React, { useState } from 'react';
import { GeneratedArticle, Language } from '../types';
import { Sparkles, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { refineEditorial } from '../utils/api';

interface HeadlineStudioProps {
  article: GeneratedArticle;
  onApplyHeadline: (headline: string) => void;
  targetLanguage: Language;
}

export const HeadlineStudio: React.FC<HeadlineStudioProps> = ({
  article,
  onApplyHeadline,
  targetLanguage
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [headlineOptions, setHeadlineOptions] = useState<string[]>([
    article.headline,
    ...(article.alternativeHeadlines || [])
  ]);

  const handleGenerateMore = async () => {
    setIsGenerating(true);
    try {
      const res = await refineEditorial(
        'headline',
        article.headline,
        targetLanguage,
        article.summary
      );
      const newItems = [res.refinedText, ...(res.alternatives || [])];
      setHeadlineOptions(Array.from(new Set([...headlineOptions, ...newItems])));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3 h-3 text-red-600" />
            <span>Priority A: AI Headline Studio</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Curate High-Impact Journalistic Headlines
          </h3>
        </div>

        <button
          onClick={handleGenerateMore}
          disabled={isGenerating}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Generate More Options</span>
        </button>
      </div>

      <div className="space-y-2">
        {headlineOptions.map((opt, i) => {
          const isCurrent = opt === article.headline;
          return (
            <div
              key={i}
              className={`p-3 rounded-lg border transition flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'border-red-500 bg-red-50/40 text-red-950 font-bold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-800 font-medium'
              }`}
            >
              <div className="grow text-xs sm:text-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase mr-2">
                  Option {i + 1}
                </span>
                <span>{opt}</span>
              </div>

              {isCurrent ? (
                <span className="shrink-0 flex items-center space-x-1 text-xs text-red-700 font-bold bg-white px-2 py-1 rounded border border-red-200 shadow-2xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>Active</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onApplyHeadline(opt)}
                  className="shrink-0 px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-red-700 hover:bg-red-50 rounded transition flex items-center space-x-1"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

