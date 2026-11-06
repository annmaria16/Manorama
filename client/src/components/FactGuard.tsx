import React from 'react';
import { FactCheckResult, FactStatus } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  HelpCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface FactGuardProps {
  factCheck: FactCheckResult;
  onRecheck: () => void;
  isLoading: boolean;
}

export const FactGuard: React.FC<FactGuardProps> = ({
  factCheck,
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
      {/* Top Banner & Integrity Score */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Stage 5: Source Fact Guard</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Factual Fidelity & Verification Engine
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Cross-examines each entity, metric, date, and statement in the generated article against the original source text.
            </p>
          </div>

          <div className="flex items-center space-x-6 shrink-0">
            {/* Score circle */}
            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {summary.overallIntegrityScore}%
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Fidelity Score
                </div>
              </div>
            </div>

            <button
              onClick={onRecheck}
              disabled={isLoading}
              className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
              title="Re-run Verification"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Re-verify</span>
            </button>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
            <div className="text-xs font-bold text-emerald-800">Supported</div>
            <div className="text-xl font-extrabold text-emerald-900">{summary.supportedCount}</div>
          </div>
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
            <div className="text-xs font-bold text-amber-800">Needs Review</div>
            <div className="text-xl font-extrabold text-amber-900">{summary.needsVerificationCount}</div>
          </div>
          <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg">
            <div className="text-xs font-bold text-rose-800">Unsupported</div>
            <div className="text-xl font-extrabold text-rose-900">{summary.unsupportedCount}</div>
          </div>
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
            <div className="text-xs font-bold text-blue-800">Missing Details</div>
            <div className="text-xl font-extrabold text-blue-900">{summary.missingDetailsCount}</div>
          </div>
        </div>
      </div>

      {/* Mandatory Journalistic Guardrail Disclaimer */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900 text-xs flex items-start space-x-3">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Editorial Integrity Notice:</strong> Source Fact Guard checks strictly whether claims and entities are affirmed by the provided source text. It does not certify real-world truth or replace reporter diligence.
        </div>
      </div>

      {/* Detailed Fact Items */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Verified Cross-Check Items ({items.length})
        </h3>

        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3"
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

            {/* Source Reference & Explanation */}
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
