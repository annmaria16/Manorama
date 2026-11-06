import React, { useState } from 'react';
import { GeneratedArticle, Language, PublicationMode } from '../types';
import {
  Tv,
  Globe,
  Newspaper,
  Smartphone,
  Download,
  Printer,
  Play,
  Pause,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Volume2
} from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/htmlExporter';

interface PublicationPreviewProps {
  article: GeneratedArticle;
  activeLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

const SPEED_NEWS_TRANSLATIONS: Record<Language, string> = {
  en: 'SPEED NEWS',
  ml: 'സ്പീഡ് ന്യൂസ്',
  hi: 'स्पीड न्यूज़',
  ta: 'ஸ்பீட் நியூஸ்',
  te: 'స్పీడ్ న్యూస్'
};

export const PublicationPreview: React.FC<PublicationPreviewProps> = ({
  article,
  activeLanguage,
  onSelectLanguage,
  availableLanguages
}) => {
  const [mode, setMode] = useState<PublicationMode>('tv_broadcast');
  const [isTickerPlaying, setIsTickerPlaying] = useState<boolean>(true);
  const [useEnglishBadgeOnTv, setUseEnglishBadgeOnTv] = useState<boolean>(false);

  const isMalayalam = activeLanguage === 'ml';
  const currentDate = new Date(article.generatedAt || Date.now()).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Dynamic ticker items based on article
  const tickerItems = [
    article.headline,
    article.summary,
    article.leadParagraph.slice(0, 160) + '...',
    ...(article.bodyParagraphs.slice(0, 2).map(p => p.slice(0, 130) + '...'))
  ];

  // Active Speed News badge text
  const tvBadgeText = useEnglishBadgeOnTv
    ? 'SPEED NEWS'
    : (SPEED_NEWS_TRANSLATIONS[activeLanguage] || 'SPEED NEWS');

  return (
    <div className="space-y-6">
      {/* 1. TOP CONTROL BAR: Language Selector + Publication Medium Switcher */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Preview Edition Language:
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

        {/* Medium Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Multi-Medium Layout:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMode('tv_broadcast')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  mode === 'tv_broadcast'
                    ? 'bg-[#0F1E36] text-white shadow-md ring-2 ring-blue-700/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Tv className="w-4 h-4 text-red-500" />
                <span>1. Manorama News (TV Broadcast)</span>
              </button>

              <button
                onClick={() => setMode('digital_web')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  mode === 'digital_web'
                    ? 'bg-[#D9232D] text-white shadow-md ring-2 ring-red-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Globe className="w-4 h-4 text-white" />
                <span>2. Digital News Website</span>
              </button>

              <button
                onClick={() => setMode('newspaper_print')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  mode === 'newspaper_print'
                    ? 'bg-stone-800 text-white shadow-md ring-2 ring-stone-600/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Newspaper className="w-4 h-4 text-amber-500" />
                <span>3. Newspaper Broadsheet</span>
              </button>

              <button
                onClick={() => setMode('mobile_app')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  mode === 'mobile_app'
                    ? 'bg-[#19396D] text-white shadow-md ring-2 ring-blue-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-sky-400" />
                <span>4. Mobile News App</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => downloadStandaloneHtml(article)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Standalone HTML</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition text-xs"
              title="Print Layout"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MANORAMA NEWS TV BROADCAST (EXACT REPLICA - LOGO ONLY, NO MALAYALAM TEXT) */}
      {/* ========================================================================= */}
      {mode === 'tv_broadcast' && (
        <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          {/* Status Header */}
          <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5 font-bold text-red-500 uppercase tracking-widest text-[10px]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                <span>LIVE FEED</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="font-semibold text-white">MANORAMA NEWS HD &bull; {availableLanguages.find(l => l.code === activeLanguage)?.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setUseEnglishBadgeOnTv(!useEnglishBadgeOnTv)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition border border-slate-700"
              >
                Badge: {useEnglishBadgeOnTv ? 'English' : 'Language-Aware'}
              </button>
              <span className="text-slate-500">|</span>
              <button
                onClick={() => setIsTickerPlaying(!isTickerPlaying)}
                className="flex items-center space-x-1 text-slate-300 hover:text-white transition"
              >
                {isTickerPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTickerPlaying ? 'Pause Ticker' : 'Play Ticker'}</span>
              </button>
              <span className="text-slate-500">|</span>
              <span className="font-mono text-slate-400">1080p 50fps</span>
            </div>
          </div>

          {/* Broadcast Screen (Backdrop + Exact Lower Third) */}
          <div className="relative aspect-video max-h-[540px] w-full bg-slate-900 overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0">
              <img
                src="/logos/broadcast_reference.jpg"
                alt="Broadcast Scene"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Corner Bug */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
              <img
                src="/logos/manorama_news_logo.png"
                alt="Manorama News"
                className="h-8 w-auto object-contain filter drop-shadow-md"
              />
              <span className="text-white text-xs font-bold tracking-tight">HD</span>
            </div>

            {/* LOWER THIRD GRAPHIC */}
            <div className="relative z-20 w-full px-2 sm:px-6 pb-2">
              <div className="flex items-end">
                {/* 1. White Rounded Logo Card — OFFICIAL LOGO ONLY (Malayalam text removed as requested!) */}
                <div className="bg-white rounded-t-xl px-4 py-2 flex items-center justify-center shadow-2xl shrink-0 border-t-2 border-l-2 border-white">
                  <img
                    src="/logos/manorama_news_logo.png"
                    alt="Manorama News Logo"
                    className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* 2. 3D Red Chevron Banner Arrow: Changes to English or according to language! */}
                <div className="relative flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-sm sm:text-base px-4 py-2 uppercase tracking-wider italic shadow-xl shrink-0 -ml-1 rounded-tr-md">
                  <span className="pr-1 text-red-200 tracking-tighter font-extrabold">&gt;&gt;&gt;</span>
                  <span>{tvBadgeText}</span>
                  <div className="absolute -right-3 top-0 bottom-0 w-0 h-0 border-y-[19px] border-y-transparent border-l-[12px] border-l-red-700" />
                </div>

                {/* 3. Breaking Headline Banner */}
                <div className="grow ml-4 bg-gradient-to-r from-blue-950/95 via-blue-900/95 to-slate-900/90 text-white px-4 py-2 rounded-t-lg shadow-xl backdrop-blur-sm border-t border-blue-400/40">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>BREAKING NEWS</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate">
                    {article.headline}
                  </h3>
                </div>
              </div>

              {/* 4. SCROLLING NEWS TICKER BAR (BELOW LOGO AS SPECIFIED) */}
              <div className="w-full bg-blue-950 border-t-2 border-red-600 text-white flex items-center overflow-hidden shadow-2xl h-10 rounded-b-xl">
                <div className="bg-red-600 text-white text-[11px] font-black uppercase px-3 py-2.5 shrink-0 flex items-center space-x-1">
                  <span>FLASH</span>
                  <span className="text-white font-bold">&bull;</span>
                </div>

                <div className="overflow-hidden relative grow flex items-center">
                  <div
                    className={`whitespace-nowrap flex items-center space-x-8 text-xs sm:text-sm font-semibold tracking-wide text-slate-100 ${
                      isTickerPlaying ? 'animate-marquee' : ''
                    }`}
                  >
                    {tickerItems.map((item, idx) => (
                      <span key={idx} className="flex items-center space-x-3">
                        <span className="text-red-400 font-bold">///</span>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
            <span className="text-slate-400 truncate max-w-2xl">
              <strong>Caption:</strong> {article.summary}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              Clean Logo Card &bull; Live Scrolling Ticker &bull; Manorama News Broadcast Engine
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DIGITAL NEWS WEBSITE (LOGOS MADE MUCH BIGGER AND CLEARER!)        */}
      {/* ========================================================================= */}
      {mode === 'digital_web' && (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Masthead with BIGGER & MORE VISIBLE LOGOS */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-5">
              {isMalayalam ? (
                /* Malayalam: BIGGER Manorama Online Logo */
                <img
                  src="/logos/manorama_online_logo.png"
                  alt="Manorama Online Logo"
                  className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-sm"
                />
              ) : (
                /* English & Other Languages: BIGGER & CLEAR Onmanorama Logo */
                <div className="flex items-center space-x-3.5">
                  <img
                    src="/logos/onmanorama_logo.png"
                    alt="Onmanorama Official Logo"
                    className="h-12 sm:h-14 w-auto rounded-xl shadow-xs border border-slate-100"
                  />
                  <div className="flex items-baseline font-black tracking-tight select-none">
                    <span className="text-[#0055A5] text-2xl sm:text-3xl font-black">ON</span>
                    <span className="text-[#0F1E36] text-2xl sm:text-3xl font-extrabold tracking-tight">manorama</span>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 border-l border-slate-300 pl-4 hidden sm:block">
                <div>{currentDate}</div>
                <div className="font-bold text-[#D9232D]">
                  {isMalayalam ? 'മലയാളത്തിന്റെ നമ്പർ 1 ന്യൂസ് പോർട്ടൽ' : "Kerala's Premier Digital News Portal"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 font-bold text-slate-700">E-Paper</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#D9232D] text-white font-bold">Live Updates</span>
            </div>
          </div>

          {/* Category Bar */}
          <div className="bg-[#D9232D] text-white text-xs font-bold px-4 py-2.5 flex items-center space-x-6 overflow-x-auto shadow-inner no-scrollbar">
            <span>HOME</span>
            <span className="hover:text-red-200 cursor-pointer">KERALA</span>
            <span className="hover:text-red-200 cursor-pointer">NATIONAL</span>
            <span className="hover:text-red-200 cursor-pointer">GLOBAL</span>
            <span className="hover:text-red-200 cursor-pointer">BUSINESS</span>
            <span className="hover:text-red-200 cursor-pointer">SCIENCE & TECH</span>
            <span className="hover:text-red-200 cursor-pointer">SPORTS</span>
          </div>

          {/* Breaking flash strip */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-xs flex items-center space-x-3 overflow-x-auto no-scrollbar">
            <span className="font-extrabold text-[#D9232D] uppercase text-[10px]">BREAKING:</span>
            <span className="font-bold text-slate-800 truncate">{article.headline}</span>
          </div>

          {/* Article Container */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10 space-y-6">
            <div className="flex items-center space-x-2 text-xs font-bold text-red-700 uppercase">
              <span>{availableLanguages.find(l => l.code === activeLanguage)?.name} Special Report</span>
              <span>&bull;</span>
              <span className="text-slate-500 font-normal">{currentDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {article.headline}
            </h1>

            <div className="text-base sm:text-lg font-medium text-slate-700 bg-red-50/40 border-l-4 border-[#D9232D] p-4 rounded-r-lg leading-relaxed">
              {article.summary}
            </div>

            <div className="flex items-center justify-between border-y border-slate-200 py-3 text-xs text-slate-500">
              <div>
                <strong>By Manorama Special Bureau</strong> &bull; Updated: {currentDate}
              </div>
              <div className="flex items-center space-x-3">
                <span>{article.wordCount} words</span>
                <span>&bull;</span>
                <span>{article.readingTimeMinutes} min read</span>
                <button className="p-1 hover:text-red-600"><Share2 className="w-4 h-4" /></button>
                <button className="p-1 hover:text-red-600"><Bookmark className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="text-base sm:text-lg text-slate-800 leading-relaxed space-y-5">
              <p className="font-semibold text-slate-950">
                {article.leadParagraph}
              </p>
              {article.bodyParagraphs.map((p, i) => (
                <p key={i} className="text-justify">{p}</p>
              ))}
              {article.closingParagraph && (
                <p className="italic text-slate-600 border-l-2 border-slate-300 pl-4">
                  {article.closingParagraph}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: NEWSPAPER BROADSHEET                                              */}
      {/* ========================================================================= */}
      {mode === 'newspaper_print' && (
        <div className="bg-[#FAF7EE] text-slate-900 rounded-2xl shadow-xl border border-stone-300 p-6 sm:p-12 font-serif">
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <div className="flex justify-center mb-2">
              <img
                src={isMalayalam ? "/logos/newspaper_malayalam.png" : "/logos/newspaper_english.png"}
                alt="Masthead"
                className="h-16 sm:h-22 w-auto object-contain filter contrast-125"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-sans font-bold border-t border-b border-black py-1 tracking-wider uppercase">
              <span>National Broadsheet &bull; Vol. 137</span>
              <span>{currentDate} &bull; ₹ 8.50</span>
              <span>ESTABLISHED 1888</span>
            </div>
          </div>

          <div className="my-6">
            <h1 className="text-2xl sm:text-4xl font-black text-black text-center leading-tight mb-3">
              {article.headline}
            </h1>
            <div className="text-center font-semibold text-base sm:text-lg text-slate-800 italic max-w-3xl mx-auto mb-6 font-sans">
              {article.summary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-900 leading-relaxed text-justify border-t border-stone-400 pt-4">
              <div className="space-y-3">
                <span className="font-sans font-bold text-xs uppercase block text-red-800">
                  Special Bureau &bull; Thiruvananthapuram
                </span>
                <p className="font-semibold text-black first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2">
                  {article.leadParagraph}
                </p>
                {article.bodyParagraphs[0] && <p>{article.bodyParagraphs[0]}</p>}
              </div>

              <div className="space-y-3 border-stone-300 md:border-l md:pl-6">
                {article.bodyParagraphs.slice(1, 3).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="space-y-3 border-stone-300 md:border-l md:pl-6">
                {article.bodyParagraphs.slice(3).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {article.closingParagraph && (
                  <p className="italic font-medium border-t border-stone-300 pt-2 text-stone-700">
                    {article.closingParagraph}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: MOBILE NEWS APP (CLEAR & VISIBLE LOGOS PER LANGUAGE)              */}
      {/* ========================================================================= */}
      {mode === 'mobile_app' && (
        <div className="bg-gradient-to-b from-[#0A1128] to-[#19396D] p-6 sm:p-12 rounded-2xl flex flex-col items-center justify-center">
          <div className="text-center text-white mb-6">
            <h3 className="text-xl font-bold tracking-tight">Smartphone Edition Preview</h3>
            <p className="text-xs text-slate-300">
              {isMalayalam ? 'Manorama Online Mobile App' : 'Onmanorama Mobile App'} &bull; Clear & Prominent Branding
            </p>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[360px] sm:w-[385px] bg-white rounded-[40px] shadow-2xl border-[10px] border-slate-900 overflow-hidden relative">
            {/* Phone Notch & Status bar */}
            <div className="bg-slate-900 text-white text-[10px] font-bold px-6 py-2 flex items-center justify-between">
              <span>9:41</span>
              <div className="w-20 h-4 bg-slate-800 rounded-full" />
              <span>5G 100%</span>
            </div>

            {/* App Header with CLEAR & PROMINENT LOGO (manoramaONLINE for Malayalam, ONmanorama for other languages) */}
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
              {isMalayalam ? (
                /* Malayalam: Prominent manoramaONLINE Logo */
                <img
                  src="/logos/manorama_online_logo.png"
                  alt="Manorama Online"
                  className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-xs"
                />
              ) : (
                /* Other Languages: Prominent ONmanorama Logo with text */
                <div className="flex items-center space-x-2.5">
                  <img
                    src="/logos/onmanorama_logo.png"
                    alt="Onmanorama Logo"
                    className="h-9 w-auto rounded-lg shadow-xs"
                  />
                  <div className="flex items-baseline font-black tracking-tight leading-none">
                    <span className="text-[#0055A5] text-xl font-black">ON</span>
                    <span className="text-[#0F1E36] text-xl font-extrabold">manorama</span>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-[#D9232D]">
                  {activeLanguage.toUpperCase()}
                </span>
              </div>
            </div>

            {/* App Categories Scroll */}
            <div className="flex space-x-2 px-3 py-2 border-b border-slate-100 text-[11px] font-bold overflow-x-auto no-scrollbar bg-slate-50">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0F1E36] text-white">ALL</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">KERALA</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">NEWS</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">TECH</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">SPORTS</span>
            </div>

            {/* App News Story Body */}
            <div className="p-4 space-y-3 max-h-[520px] overflow-y-auto">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-[#B71C1C]">
                  {availableLanguages.find(l => l.code === activeLanguage)?.name}
                </span>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>

              <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                {article.headline}
              </h4>

              {/* News image banner */}
              <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-900 relative">
                <img
                  src="/logos/broadcast_reference.jpg"
                  alt="News visual"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {article.summary}
              </p>

              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                {article.leadParagraph}
              </p>

              {article.bodyParagraphs.slice(0, 2).map((p, i) => (
                <p key={i} className="text-xs text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{article.wordCount} words</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:text-red-600"><Bookmark className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-red-600"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* App bottom navigation */}
            <div className="bg-slate-50 border-t border-slate-200 p-2 flex justify-around text-[10px] font-bold text-slate-500">
              <span className="text-[#D9232D]">Top News</span>
              <span>Audio</span>
              <span>Live TV</span>
              <span>Saved</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
