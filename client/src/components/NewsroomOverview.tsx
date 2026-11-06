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
  TrendingUp,
  FileText
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
      {/* 1. HERO SECTION WITH USER'S EXACT IMAGE & WRITINGS */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#0F1E36] to-[#19396D] text-white p-6 sm:p-12 shadow-2xl border border-slate-700/60">
        {/* Subtle background ambient overlay with the uploaded image */}
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
          <img
            src="/landing_hero.jpg"
            alt="Ambient Newsroom"
            className="w-full h-full object-cover object-center filter blur-xs"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Exact User Writings */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-600/25 border border-red-500/40 text-red-300 text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>MANORAMA AI DESK</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Every Story Deserves to Be Heard.
            </h1>

            {/* Sub-Headline */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-red-400 tracking-tight">
              One Newsroom. Endless Possibilities.
            </h2>

            {/* Main Description */}
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
              Transform interview transcripts, field notes and raw information into compelling, accurate and publication-ready journalism. Let AI handle the heavy lifting while journalists stay in control of every story.
            </p>

            {/* Call to Actions */}
            <div className="pt-3 flex flex-wrap gap-3.5">
              <button
                onClick={() => onNavigate('create')}
                className="px-7 py-3.5 bg-[#D9232D] hover:bg-[#B71C1C] text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center space-x-2 active:scale-95"
              >
                <span>Launch Article Creator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {hasArticles ? (
                <button
                  onClick={() => onNavigate('multilingual')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition flex items-center space-x-2"
                >
                  <span>Open 5-Language Studio</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoadSample('isro-transcript');
                    onNavigate('create');
                  }}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-red-400" />
                  <span>Try ISRO Sample Transcript</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: The User's Uploaded Showcase Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900/60 backdrop-blur-md transform hover:scale-[1.02] transition-transform duration-300 group">
              <img
                src="/landing_hero.jpg"
                alt="Manorama Online Multi-Screen Ecosystem"
                className="w-full h-auto object-cover filter brightness-105"
              />
              <div className="p-3.5 bg-gradient-to-t from-[#0A1128] to-slate-900/90 text-center border-t border-white/10">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Manorama Digital & Mobile Newsroom Ecosystem</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FIVE-LANGUAGE EDITIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Automatic 5-Language Simultaneous Generation
            </h2>
            <p className="text-xs text-slate-500">
              A single input automatically generates complete, publication-ready news reports in five distinct language editions:
            </p>
          </div>
          <span className="text-xs font-bold text-[#D9232D] uppercase tracking-wider">
            All 5 From One Source
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
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-md transition space-y-2 border-t-4 border-t-[#D9232D]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {lang.code.toUpperCase()}
                </span>
                <span className="text-base font-bold text-[#0F1E36]">{lang.native}</span>
              </div>
              <div className="font-extrabold text-sm text-slate-900">{lang.publication}</div>
              <p className="text-[11px] text-slate-500 leading-snug">{lang.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MULTI-MEDIUM PUBLICATION CHANNELS */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">
          Multi-Medium Publication Engine
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Every generated article can be previewed across all core journalistic channels:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Digital News Website</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manorama Online & Onmanorama responsive web portals with category navigation, breaking flash strips, and bylines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">TV Broadcast & Live Ticker</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manorama News lower-third with clean official logo, language-aware Speed News badge, and animated live scrolling ticker tape!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Print Broadsheet Newspaper</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Classic Malayala Manorama broadsheet layout with authentic historic coat of arms masthead and 3-column format.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Mobile News App</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Realistic smartphone reading frame showcasing language-specific branding (manoramaONLINE for Malayalam, ONmanorama for others).
            </p>
          </div>
        </div>
      </div>

      {/* 4. PRE-LOADED DEMONSTRATION WORKSPACES */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
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
              className="text-left p-4 bg-white hover:bg-red-50 hover:border-red-300 border border-slate-200 rounded-2xl transition shadow-2xs group flex flex-col justify-between"
            >
              <span className="font-bold text-xs text-slate-800 group-hover:text-red-700">
                {sample.label}
              </span>
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
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
