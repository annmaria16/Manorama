import React from 'react';
import { Language, GeneratedArticle, LanguageGenerationStatus } from '../types';
import { Download, FileText, CheckCircle2, ShieldCheck, Globe, Printer } from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/htmlExporter';

interface ExportCenterProps {
  multilingualResults: Record<Language, LanguageGenerationStatus>;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

export const ExportCenter: React.FC<ExportCenterProps> = ({
  multilingualResults,
  availableLanguages
}) => {
  const handleDownloadAll = () => {
    availableLanguages.forEach(l => {
      const art = multilingualResults[l.code]?.article;
      if (art) {
        downloadStandaloneHtml(art);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Download className="w-3.5 h-3.5" />
            <span>Standalone HTML Publishing & Export Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Export Publication-Ready Articles
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Download individual standalone HTML files or all five language editions at once. Files are 100% self-contained with embedded CSS and open offline with native Unicode typography.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center space-x-2 active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download All 5 Languages</span>
        </button>
      </div>

      {/* Grid of 5 Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableLanguages.map(l => {
          const item = multilingualResults[l.code];
          const art = item?.article;

          return (
            <div
              key={l.code}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-lg bg-red-50 text-[#D9232D] font-bold text-xs flex items-center justify-center uppercase">
                      {l.code}
                    </span>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.nativeName}</div>
                    </div>
                  </div>

                  {art ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Ready
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                      Pending
                    </span>
                  )}
                </div>

                {art ? (
                  <>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                      {art.headline}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {art.wordCount} words &bull; {art.readingTimeMinutes} min read
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 italic py-4">Article has not been generated yet.</p>
                )}
              </div>

              {art && (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => downloadStandaloneHtml(art)}
                    className="w-full px-4 py-2.5 bg-slate-900 hover:bg-[#D9232D] text-white font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Standalone HTML</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Offline Assurance Callout */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Offline Resilience Guarantee:</strong> Each downloaded file includes internal responsive styling, HTML metadata with the correct language tag (`lang="ml"`, `lang="ta"`, `lang="te"`), and sanitized text content to protect against HTML injection. Files open reliably on any device without internet connectivity.
        </div>
      </div>
    </div>
  );
};
