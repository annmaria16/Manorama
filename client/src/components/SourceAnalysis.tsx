import React from 'react';
import { SourceAnalysisResult } from '../types';
import {
  Cpu,
  Sparkles,
  Users,
  MapPin,
  Building2,
  Calendar,
  Hash,
  Quote,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface SourceAnalysisProps {
  analysis: SourceAnalysisResult;
  onProceedToGenerate: () => void;
  isLoading: boolean;
  targetLanguage: string;
}

export const SourceAnalysis: React.FC<SourceAnalysisProps> = ({
  analysis,
  onProceedToGenerate,
  isLoading,
  targetLanguage
}) => {
  const { fiveWs, entities, mainEvent, mainSubject } = analysis;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Stage 2: Source-to-Story Intelligence</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {mainSubject || 'Editorial Fact Extraction & Intelligence'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              {mainEvent}
            </p>
          </div>

          <button
            onClick={onProceedToGenerate}
            disabled={isLoading}
            className="shrink-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center space-x-2 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating {targetLanguage === 'ml' ? 'Malayalam' : 'English'} Article...</span>
              </>
            ) : (
              <>
                <span>Generate News Article</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5 Ws and 1 H Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-red-600" />
          <span>The Core 5 Ws & 1 H (Journalistic Foundation)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">WHO</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.who || 'Not specified'}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">WHAT</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.what || 'Not specified'}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">WHEN</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.when || 'Not specified'}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">WHERE</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.where || 'Not specified'}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">WHY</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.why || 'Not specified in source'}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">HOW</span>
            <p className="text-sm font-semibold text-slate-800 mt-1">{fiveWs.how || 'Not specified in source'}</p>
          </div>
        </div>
      </div>

      {/* Extracted Named Entities & Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: People, Places, Organizations, Numbers */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-red-600" />
            <span>Structured Entities & Key Metrics</span>
          </h3>

          {/* Names */}
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 mb-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Names & Designations</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entities.names.length > 0 ? (
                entities.names.map((n, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-xs font-medium">
                    {n}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No specific names extracted</span>
              )}
            </div>
          </div>

          {/* Places */}
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Locations & Venues</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entities.places.length > 0 ? (
                entities.places.map((p, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-medium">
                    {p}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No locations extracted</span>
              )}
            </div>
          </div>

          {/* Organizations */}
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 mb-2">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Organizations & Agencies</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entities.organizations.length > 0 ? (
                entities.organizations.map((org, i) => (
                  <span key={i} className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-md text-xs font-medium">
                    {org}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No organizations extracted</span>
              )}
            </div>
          </div>

          {/* Numbers & Stats */}
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 mb-2">
              <Hash className="w-3.5 h-3.5 text-amber-600" />
              <span>Numbers, Counts & Statistics</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {entities.numbersAndStats.length > 0 ? (
                entities.numbersAndStats.map((num, i) => (
                  <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-semibold">
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No numbers or metrics found</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Direct Quotes, Supporting Details, Unclear/Missing Info */}
        <div className="space-y-6">
          {/* Direct Quotes Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Quote className="w-4 h-4 text-red-600" />
              <span>Direct Quotations (Preserved Verbatim)</span>
            </h3>
            <div className="space-y-2">
              {entities.directQuotes.length > 0 ? (
                entities.directQuotes.map((q, i) => (
                  <div key={i} className="p-3 bg-red-50/40 border-l-3 border-red-500 rounded-r-lg text-xs italic text-slate-800 font-medium">
                    {q}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No verbatim quotations found in source.</p>
              )}
            </div>
          </div>

          {/* Unclear or Missing Information Box (Journalistic Safeguard) */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Unclear or Missing Information (No Fabrication)</span>
            </div>
            <p className="text-xs text-amber-900/80 mb-3">
              The AI identified these gaps in the source text. In accordance with newsroom standards, these will NOT be fabricated or assumed:
            </p>
            <ul className="space-y-1.5">
              {entities.unclearOrMissing.length > 0 ? (
                entities.unclearOrMissing.map((gap, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-amber-950 font-medium">
                    <span className="text-amber-500 font-bold">&bull;</span>
                    <span>{gap}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-500 italic">All primary journalistic facts were explicitly documented in the source.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
