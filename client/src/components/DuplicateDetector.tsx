import React, { useState } from 'react';
import { GeneratedArticle, SimilarityResult } from '../types';
import { Layers, Search, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { checkSimilarity } from '../utils/api';

interface DuplicateDetectorProps {
  currentArticle: GeneratedArticle;
}

export const DuplicateDetector: React.FC<DuplicateDetectorProps> = ({ currentArticle }) => {
  const [comparisonText, setComparisonText] = useState('');
  const [result, setResult] = useState<SimilarityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentStoryFull = `${currentArticle.headline}\n\n${currentArticle.summary}\n\n${currentArticle.leadParagraph}\n\n${currentArticle.bodyParagraphs.join('\n\n')}`;

  const handleCompare = async () => {
    if (!comparisonText.trim()) return;
    setIsLoading(true);
    try {
      const sim = await checkSimilarity(currentStoryFull, comparisonText);
      setResult(sim);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillSampleArchivedStory = () => {
    const sample = currentArticle.targetLanguage === 'ml'
      ? "ചന്ദ്രയാൻ 4 ദൗത്യം 2028-ൽ വിക്ഷേപിക്കും. ഐഎസ്ആർഒ ചെയർമാൻ എസ്. സോമനാഥ് തിരുവനന്തപുരത്ത് നടന്ന വാർത്താസമ്മേളനത്തിൽ അറിയിച്ചു. ബഹിരാകാശത്ത് ഡോക്കിങ് സാങ്കേതികവിദ്യ പരീക്ഷിക്കുമെന്നും ചന്ദ്രനിൽ നിന്ന് മണ്ണും പാറയും ഭൂമിയിലെത്തിക്കുമെന്നും അദ്ദേഹം പറഞ്ഞു."
      : "ISRO Chairman S. Somanath has confirmed that the Chandrayaan-4 lunar sample return mission is targeted for 2028. Speaking at Thiruvananthapuram, he said the mission will test space docking technology using two separate rocket launches.";
    setComparisonText(sample);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-1">
            <Layers className="w-3 h-3 text-blue-600" />
            <span>Priority A: Duplicate Story & Plagiarism Guard</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Cross-Check Against Existing Wire or Archived News
          </h3>
        </div>

        <button
          onClick={handleFillSampleArchivedStory}
          className="text-xs text-blue-700 hover:underline font-semibold"
        >
          Insert Wire Comparison Sample
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Uses tokenized Cosine TF-IDF vector similarity with native Malayalam and English Unicode support.
      </p>

      <div>
        <textarea
          rows={3}
          value={comparisonText}
          onChange={e => setComparisonText(e.target.value)}
          placeholder="Paste previous published story or wire agency copy to check for duplicate narrative overlap..."
          className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCompare}
          disabled={!comparisonText.trim() || isLoading}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition flex items-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Overlap...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Check Story Overlap</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-xl border bg-slate-50 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">Semantic Overlap Score:</span>
            <div className="flex items-center space-x-2">
              <span className={`text-base font-extrabold ${result.isDuplicate ? 'text-red-600' : 'text-emerald-600'}`}>
                {Math.round(result.similarityScore * 100)}%
              </span>
              {result.isDuplicate ? (
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                  Potential Duplicate
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Distinct Story
                </span>
              )}
            </div>
          </div>

          {/* Progress meter */}
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                result.isDuplicate ? 'bg-red-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.round(result.similarityScore * 100)}%` }}
            />
          </div>

          <p className="text-slate-600">{result.explanation}</p>

          {result.commonKeywords && result.commonKeywords.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Common Overlapping Keywords:
              </span>
              <div className="flex flex-wrap gap-1">
                {result.commonKeywords.map((w, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 text-[11px] font-mono">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

