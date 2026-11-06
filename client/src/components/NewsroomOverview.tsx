import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Globe,
  Tv,
  Newspaper,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  BookOpen,
  Zap,
  TrendingUp
} from 'lucide-react';
import { MainNavSection } from '../types';

interface NewsroomOverviewProps {
  onNavigate: (section: MainNavSection) => void;
  onLoadSample: (sampleId: string) => void;
  hasArticles: boolean;
}

export const NewsroomOverview: React.FC<NewsroomOverviewProps> = ({
  onNavigate,
  onLoadSample,
  hasArticles
}) => {
  return (
    <div className="space-y-8">
      {/* 1. TOP NEWSROOM HERO BANNER (Inspired by Manorama Online Desktop Reference 1 & 2) */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F1E36] via-[#19396D] to-[#0A1128] text-white p-6 sm:p-10 shadow-xl border border-slate-700">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Next-Generation Editorial Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            One Transcript. <span className="text-[#D9232D]">Five Languages.</span> Publication-Ready Journalism.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Transform raw interview transcripts, shorthand field notes, and wire briefs into structured news stories in <strong>English, Malayalam, Hindi, Tamil, and Telugu</strong> simultaneously—fully verified by <strong>Source Fact Guard</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3.5 bg-[#D9232D] hover:bg-[#B71C1C] text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center space-x-2 active:scale-95"
            >
              <span>Launch Article Creator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {hasArticles && (
              <button
                onClick={() => onNavigate('multilingual')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition flex items-center space-x-2"
              >
                <span>Open 5-Language Studio</span>
              </button>
            )}
          </div>
        </div>

        {/* Floating badge */}
        <div className="hidden lg:block absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center max-w-xs">
          <div className="w-12 h-12 rounded-xl bg-white p-2 mx-auto mb-2 shadow-md">
            <img src="/logos/manorama_ai_desk_logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">AUTOMATIC MULTILINGUAL</div>
          <div className="text-[11px] text-slate-300 mt-1">
            Simultaneous generation across 5 Indic & English journalistic editions
          </div>
        </div>
      </div>

      {/* 2. FIVE-LANGUAGE CAPABILITIES GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Supported Newsroom Editions
            </h2>
            <p className="text-xs text-slate-500">
              Each language preserves native newsroom conventions, formal journalistic verbs, and correct Unicode scripts.
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            All 5 Generated Simultaneously
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              code: 'en',
              name: 'English',
              native: 'English',
              publication: 'Onmanorama',
              desc: 'Inverted pyramid lead, active voice, clean digital prose'
            },
            {
              code: 'ml',
              name: 'Malayalam',
              native: 'മലയാളം',
              publication: 'Malayala Manorama',
              desc: 'Authentic Malayalam reporting verbs, formal Manorama style'
            },
            {
              code: 'hi',
              name: 'Hindi',
              native: 'हिंदी',
              publication: 'Manorama National',
              desc: 'Standard broadsheet Hindi journalism & clear flow'
            },
            {
              code: 'ta',
              name: 'Tamil',
              native: 'தமிழ்',
              publication: 'Manorama Tamil',
              desc: 'Formal Tamil journalistic terminology & transliterations'
            },
            {
              code: 'te',
              name: 'Telugu',
              native: 'తెలుగు',
              publication: 'Manorama Telugu',
              desc: 'Authoritative Telugu news phrasing & broadsheet style'
            }
          ].map(lang => (
            <div
              key={lang.code}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-md transition space-y-2 border-t-3 border-t-[#D9232D]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {lang.code.toUpperCase()}
                </span>
                <span className="text-base font-bold text-[#0F1E36]">{lang.native}</span>
              </div>
              <div className="font-bold text-sm text-slate-900">{lang.publication}</div>
              <p className="text-[11px] text-slate-500 leading-snug">{lang.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MULTI-MEDIUM PUBLICATION FORMATS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Multi-Medium Publication Engine
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Every generated article can be previewed across all core journalistic channels:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Digital News Website</h3>
            <p className="text-xs text-slate-500">
              Manorama Online & Onmanorama responsive web portals with category navigation, breaking flash strips, and bylines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">TV Broadcast & Live Ticker</h3>
            <p className="text-xs text-slate-500">
              Manorama News TV lower-third graphic with "സ്പീഡ് ന്യൂസ്" badge, red 3D chevron, and continuous scrolling news ticker bar!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Print Broadsheet Newspaper</h3>
            <p className="text-xs text-slate-500">
              Classic Malayala Manorama broadsheet layout with authentic historic coat of arms masthead and 3-column format.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Mobile News App</h3>
            <p className="text-xs text-slate-500">
              Realistic smartphone reading frame inspired by Onmanorama mobile app with swipeable feeds, pills, and bookmarking.
            </p>
          </div>
        </div>
      </div>

      {/* 4. ONE-CLICK DEMONSTRATION WORKSPACES */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm mb-3">
          <BookOpen className="w-4 h-4 text-red-600" />
          <span>Quick Demonstration Transcripts (One-Click Preload)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'isro-transcript', label: 'ISRO Chief Interview (Chandrayaan-4)', type: 'Transcript' },
            { id: 'wayanad-notes', label: 'Wayanad Rehabilitation Township', type: 'Notes' },
            { id: 'kochi-metro-brief', label: 'Kochi Water Metro Electric Vessels', type: 'Brief' },
            { id: 'kerala-ai-draft', label: 'Kerala AI & Startup Mission Policy', type: 'Draft' }
          ].map(sample => (
            <button
              key={sample.id}
              onClick={() => {
                onLoadSample(sample.id);
                onNavigate('create');
              }}
              className="text-left p-3.5 bg-white hover:bg-red-50 hover:border-red-300 border border-slate-200 rounded-xl transition shadow-2xs group flex flex-col justify-between"
            >
              <span className="font-bold text-xs text-slate-800 group-hover:text-red-700">
                {sample.label}
              </span>
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-semibold uppercase">{sample.type}</span>
                <span className="text-red-600 font-bold group-hover:translate-x-1 transition-transform">
                  Load Story &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

