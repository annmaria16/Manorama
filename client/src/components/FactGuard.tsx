import React from 'react';
import { FactCheckResult, FactStatus, Language } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  HelpCircle,
  RefreshCw,
  Globe
} from 'lucide-react';

interface FactGuardProps {
  factCheck: FactCheckResult;
  activeLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
  onRecheck: () => void;
  isLoading: boolean;
}

export const FactGuard: React.FC<FactGuardProps> = ({
  factCheck,
  activeLanguage,
  onSelectLanguage,
  availableLanguages,
  onRecheck,
  isLoading
}) => {
  const { summary, items } = factCheck;

  const getStatusBadge = (status: FactStatus) => {
    switch (status) {
      case 'supported':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supported by Source</span>
          </span>
        );
      case 'needs_verification':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Needs Verification</span>
          </span>
        );
      case 'unsupported':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Potentially Unsupported</span>
          </span>
        );
      case 'missing_detail':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Source Detail Missing</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Auditing Language Edition:
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

      {/* Top Banner & Integrity Score */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Source Fact Guard &bull; {availableLanguages.find(l => l.code === activeLanguage)?.name} Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Factual Fidelity & Verification Engine
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Cross-examines each statement, proper noun, metric, date, and quote against the original source transcript.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center min-w-[110px]">
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                {summary.overallIntegrityScore}%
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Fidelity Score
              </div>
            </div>

            <button
              onClick={onRecheck}
              disabled={isLoading}
              className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center space-x-1.5"
              title="Re-run Verification"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Re-verify</span>
            </button>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <div className="text-xs font-bold text-emerald-800">Supported by Source</div>
            <div className="text-xl font-black text-emerald-900">{summary.supportedCount}</div>
          </div>
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
            <div className="text-xs font-bold text-amber-800">Needs Verification</div>
            <div className="text-xl font-black text-amber-900">{summary.needsVerificationCount}</div>
          </div>
          <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
            <div className="text-xs font-bold text-rose-800">Potentially Unsupported</div>
            <div className="text-xl font-black text-rose-900">{summary.unsupportedCount}</div>
          </div>
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
            <div className="text-xs font-bold text-blue-800">Source Detail Missing</div>
            <div className="text-xl font-black text-blue-900">{summary.missingDetailsCount}</div>
          </div>
        </div>
      </div>

      {/* Mandatory Journalistic Guardrail Disclaimer */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs flex items-start space-x-3">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Editorial Integrity Notice:</strong> Source Fact Guard checks fidelity strictly against the supplied source text. It does not certify external real-world truth or replace reporter verification.
        </div>
      </div>

      {/* Detailed Fact Items */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Factual Audit Items ({items.length})
        </h3>

        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {item.category}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {item.statement}
                </span>
              </div>
              <div>{getStatusBadge(item.status)}</div>
            </div>

            {/* Source Reference & Findings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  Source Reference Excerpt:
                </span>
                <p className="italic text-slate-700 font-mono text-[11px] bg-white p-2 rounded border border-slate-200">
                  "{item.sourceReference || 'None in source'}"
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  Audit Findings:
                </span>
                <p className="text-slate-800">{item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
