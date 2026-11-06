import React, { useState } from 'react';
import { GeneratedArticle, PublicationMode } from '../types';
import {
  Tv,
  Globe,
  Newspaper,
  Download,
  Printer,
  Play,
  Pause,
  ExternalLink,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Volume2
} from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/htmlExporter';

interface PublicationPreviewProps {
  article: GeneratedArticle;
}

export const PublicationPreview: React.FC<PublicationPreviewProps> = ({ article }) => {
  const [mode, setMode] = useState<PublicationMode>('tv_broadcast');
  const [isTickerPlaying, setIsTickerPlaying] = useState<boolean>(true);

  const isMalayalam = article.targetLanguage === 'ml';
  const currentDate = new Date(article.generatedAt || Date.now()).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Ticker text items created from summary and body
  const tickerItems = [
    article.headline,
    article.summary,
    article.leadParagraph.slice(0, 150) + '...',
    ...(article.bodyParagraphs.slice(0, 2).map(p => p.slice(0, 120) + '...'))
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with Switcher & Export */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Publication Tabs */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Select Publication & Broadcast Preview Mode:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setMode('tv_broadcast')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                mode === 'tv_broadcast'
                  ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-700/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-red-500" />
              <span>Manorama News (TV Broadcast)</span>
            </button>

            <button
              onClick={() => setMode('manorama_online')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                mode === 'manorama_online'
                  ? 'bg-red-700 text-white shadow-sm ring-2 ring-red-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>Manorama Online (Malayalam Web)</span>
            </button>

            <button
              onClick={() => setMode('onmanorama')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                mode === 'onmanorama'
                  ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-700/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Onmanorama (English Web)</span>
            </button>

            <button
              onClick={() => setMode('newspaper_ml')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                mode === 'newspaper_ml'
                  ? 'bg-stone-800 text-white shadow-sm ring-2 ring-stone-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-amber-500" />
              <span>Malayala Manorama (Print - ML)</span>
            </button>

            <button
              onClick={() => setMode('newspaper_en')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2 ${
                mode === 'newspaper_en'
                  ? 'bg-stone-800 text-white shadow-sm ring-2 ring-stone-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-slate-400" />
              <span>Malayala Manorama (Print - EN)</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Mandatory Standalone HTML Export */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => downloadStandaloneHtml(article)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2 active:scale-95"
            title="Export complete standalone offline HTML"
          >
            <Download className="w-4 h-4" />
            <span>Download Standalone HTML</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition text-xs font-medium"
            title="Print Preview"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MANORAMA NEWS (TV BROADCAST - REFERENCE PIC 5 EXACT REPLICA)      */}
      {/* ========================================================================= */}
      {mode === 'tv_broadcast' && (
        <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          {/* Top broadcast status bar */}
          <div className="bg-slate-900/90 px-4 py-2 flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5 font-bold text-red-500 uppercase tracking-widest text-[10px]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                <span>LIVE BROADCAST</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="font-semibold">MANORAMA NEWS 24x7 HD</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsTickerPlaying(!isTickerPlaying)}
                className="flex items-center space-x-1 text-slate-400 hover:text-white transition"
              >
                {isTickerPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isTickerPlaying ? 'Pause Ticker' : 'Play Ticker'}</span>
              </button>
              <span className="text-slate-500">|</span>
              <span className="font-mono text-slate-400">1080p 50fps</span>
            </div>
          </div>

          {/* Broadcast Screen (Studio Backdrop + Lower Third) */}
          <div className="relative aspect-video max-h-[540px] w-full bg-slate-900 overflow-hidden flex flex-col justify-end">
            {/* Background Studio Visual / Anchor Feed */}
            <div className="absolute inset-0">
              <img
                src="/logos/broadcast_reference.jpg"
                alt="Manorama News TV Broadcast"
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Broadcast Top Corner Bug */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
              <img
                src="/logos/manorama_news_logo.png"
                alt="Manorama News"
                className="h-7 w-auto object-contain filter drop-shadow-md"
              />
              <span className="text-white text-xs font-bold tracking-tight">HD</span>
            </div>

            {/* LOWER THIRD GRAPHIC — EXACT REPLICA OF REFERENCE PIC 5 */}
            <div className="relative z-20 w-full px-2 sm:px-6 pb-2">
              <div className="flex items-end">
                {/* 1. White Rounded Logo Card with "സ്പീഡ് ന്യൂസ്" */}
                <div className="bg-white rounded-t-xl px-3 py-2 flex items-center space-x-2 shadow-2xl shrink-0 border-t-2 border-l-2 border-white">
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center p-0.5 shadow-xs">
                    <img
                      src="/logos/manorama_news_logo.png"
                      alt="Manorama News Icon"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-blue-900 font-extrabold text-sm sm:text-base tracking-tight font-malayalam pr-1">
                    സ്പീഡ് ന്യൂസ്
                  </span>
                </div>

                {/* 2. 3D Red Chevron Banner Arrow: SPEED NEWS */}
                <div className="relative flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-sm sm:text-base px-4 py-2 uppercase tracking-wider italic shadow-xl shrink-0 -ml-1 rounded-tr-md">
                  <span className="pr-1 text-red-200 tracking-tighter font-extrabold">&gt;&gt;&gt;</span>
                  <span>SPEED NEWS</span>
                  <div className="absolute -right-3 top-0 bottom-0 w-0 h-0 border-y-[19px] border-y-transparent border-l-[12px] border-l-red-700" />
                </div>

                {/* 3. Breaking Headline Banner (Deep Blue Gradient) */}
                <div className="grow ml-4 bg-gradient-to-r from-blue-950/95 via-blue-900/95 to-slate-900/90 text-white px-4 py-2 rounded-t-lg shadow-xl backdrop-blur-sm border-t border-blue-400/40">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>BREAKING FLASH</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight truncate font-malayalam">
                    {article.headline}
                  </h3>
                </div>
              </div>

              {/* 4. SCROLLING NEWS TICKER BAR (BELOW THE LOGO AS USER SPECIFIED) */}
              <div className="w-full bg-blue-950 border-t-2 border-red-600 text-white flex items-center overflow-hidden shadow-2xl h-10 rounded-b-xl">
                {/* Fixed Ticker Tag */}
                <div className="bg-red-600 text-white text-[11px] font-black uppercase px-3 py-2.5 shrink-0 flex items-center space-x-1">
                  <span>FLASH</span>
                  <span className="text-white font-bold">&bull;</span>
                </div>

                {/* Continuous Scrolling Marquee */}
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

          {/* Under screen details */}
          <div className="p-4 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">Broadcast Caption:</span>
              <span className="text-slate-400">{article.summary}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Aspect 16:9 Broadcast Ready &bull; Manorama News Graphics Engine
            </span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MANORAMA ONLINE (MALAYALAM WEBSITE PREVIEW)                       */}
      {/* ========================================================================= */}
      {mode === 'manorama_online' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden font-malayalam">
          {/* Manorama Online Masthead Top */}
          <div className="border-b border-slate-200 p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src="/logos/manorama_online_logo.png"
                alt="Manorama Online Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="text-[11px] text-slate-500 border-l border-slate-300 pl-3 hidden sm:block">
                <div>{currentDate}</div>
                <div className="font-bold text-red-700">മലയാളത്തിന്റെ നമ്പർ 1 ന്യൂസ് പോർട്ടൽ</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <span className="px-2.5 py-1 rounded bg-slate-100 font-bold">ഇ-പേപ്പർ</span>
              <span className="px-2.5 py-1 rounded bg-red-600 text-white font-bold">തത്സമയം</span>
            </div>
          </div>

          {/* Red Portal Navbar */}
          <div className="bg-red-700 text-white text-xs font-bold px-4 py-2.5 flex items-center space-x-6 overflow-x-auto shadow-inner no-scrollbar">
            <span className="hover:text-red-200 cursor-pointer">ഹോം</span>
            <span className="hover:text-red-200 cursor-pointer">കേരളം</span>
            <span className="hover:text-red-200 cursor-pointer">ഇന്ത്യ</span>
            <span className="hover:text-red-200 cursor-pointer">ലോകം</span>
            <span className="hover:text-red-200 cursor-pointer">ബിസിനസ്</span>
            <span className="hover:text-red-200 cursor-pointer">സിനിമ</span>
            <span className="hover:text-red-200 cursor-pointer">കായികം</span>
            <span className="hover:text-red-200 cursor-pointer">ടെക്നോളജി</span>
          </div>

          {/* Breaking flash strip */}
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center space-x-3 text-xs">
            <span className="bg-red-700 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded">
              ബ്രേക്കിംഗ്
            </span>
            <span className="text-red-950 font-bold truncate">
              {article.headline}
            </span>
          </div>

          {/* Article Container */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10">
            {/* Category & Date */}
            <div className="flex items-center space-x-2 text-xs text-red-700 font-bold uppercase mb-3">
              <span>പ്രധാന വാർത്തകൾ</span>
              <span>&bull;</span>
              <span className="text-slate-500 font-normal">{currentDate}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4 font-malayalam">
              {article.headline}
            </h1>

            {/* Standfirst */}
            <div className="text-base sm:text-lg font-medium text-slate-700 bg-slate-50 border-l-4 border-red-600 p-4 rounded-r-lg mb-6 leading-relaxed">
              {article.summary}
            </div>

            {/* Author Byline & Social Bar */}
            <div className="flex items-center justify-between border-y border-slate-200 py-3 mb-8 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900">മനോരമ ലേഖകൻ</span>
                <span>&bull;</span>
                <span>തിരുവനന്തപുരം</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readingTimeMinutes} മിനിറ്റ് വായന</span>
                </span>
                <button className="p-1 hover:text-red-600 transition"><Share2 className="w-4 h-4" /></button>
                <button className="p-1 hover:text-red-600 transition"><Bookmark className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Article Content */}
            <div className="text-base sm:text-lg text-slate-800 leading-loose space-y-5">
              <p className="font-semibold text-slate-950 first-letter:text-4xl first-letter:font-bold first-letter:text-red-600 first-letter:mr-1">
                {article.leadParagraph}
              </p>

              {article.bodyParagraphs.map((para, i) => (
                <p key={i} className="text-justify">
                  {para}
                </p>
              ))}

              {article.closingParagraph && (
                <p className="p-4 bg-slate-50 rounded-lg border-l-2 border-slate-300 italic text-slate-700">
                  {article.closingParagraph}
                </p>
              )}
            </div>

            {/* Tags */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
                {article.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-semibold rounded-full transition">
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: ONMANORAMA (ENGLISH WEBSITE PREVIEW)                              */}
      {/* ========================================================================= */}
      {mode === 'onmanorama' && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden font-sans">
          {/* Header */}
          <div className="border-b border-slate-200 p-4 bg-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logos/onmanorama_logo.png"
                alt="Onmanorama Logo"
                className="h-9 w-auto object-contain"
              />
              <div className="text-xs text-slate-500 border-l border-slate-300 pl-3 hidden sm:block">
                <span>Kerala's Leading English News Destination</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              {currentDate}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 flex items-center space-x-6 overflow-x-auto shadow-inner no-scrollbar">
            <span className="hover:text-red-400 cursor-pointer">HOME</span>
            <span className="hover:text-red-400 cursor-pointer text-red-400">KERALA</span>
            <span className="hover:text-red-400 cursor-pointer">NATIONAL</span>
            <span className="hover:text-red-400 cursor-pointer">GLOBAL</span>
            <span className="hover:text-red-400 cursor-pointer">BUSINESS</span>
            <span className="hover:text-red-400 cursor-pointer">ENTERTAINMENT</span>
            <span className="hover:text-red-400 cursor-pointer">SPORTS</span>
          </div>

          {/* Content Body */}
          <div className="max-w-4xl mx-auto p-6 sm:p-10">
            <div className="inline-block px-2.5 py-0.5 rounded bg-red-100 text-red-800 text-xs font-bold uppercase mb-3">
              News Desk Report
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {article.headline}
            </h1>

            <div className="text-base sm:text-lg font-medium text-slate-600 border-l-4 border-red-600 pl-4 py-2 mb-6 bg-red-50/30 rounded-r-lg">
              {article.summary}
            </div>

            {/* Byline */}
            <div className="flex items-center justify-between border-y border-slate-200 py-3 mb-8 text-xs text-slate-500">
              <div>
                <strong>By Onmanorama Staff Reporter</strong> &bull; Updated: {currentDate}
              </div>
              <div className="flex items-center space-x-2">
                <span>{article.wordCount} words</span>
                <span>&bull;</span>
                <span>{article.readingTimeMinutes} min read</span>
              </div>
            </div>

            {/* Main story */}
            <div className="text-base sm:text-lg text-slate-800 leading-relaxed space-y-5">
              <p className="font-semibold text-slate-900">
                {article.leadParagraph}
              </p>

              {article.bodyParagraphs.map((para, i) => (
                <p key={i} className="text-justify">
                  {para}
                </p>
              ))}

              {article.closingParagraph && (
                <p className="italic text-slate-600 border-l-2 border-slate-300 pl-4">
                  {article.closingParagraph}
                </p>
              )}
            </div>

            {/* Tags */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-2">
                {article.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: MALAYALA MANORAMA NEWSPAPER (MALAYALAM BROADSHEET)                */}
      {/* ========================================================================= */}
      {mode === 'newspaper_ml' && (
        <div className="bg-[#FAF7EE] text-slate-900 rounded-2xl shadow-xl border border-stone-300 p-6 sm:p-12 font-malayalam">
          {/* Authentic Newspaper Masthead */}
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <div className="flex justify-center mb-2">
              <img
                src="/logos/newspaper_malayalam.png"
                alt="മലയാള മനോരമ"
                className="h-16 sm:h-20 w-auto object-contain filter contrast-125"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold border-t border-b border-black py-1 tracking-wider uppercase">
              <span>കോട്ടയം എഡിഷൻ &bull; വാല്യം 137</span>
              <span>{currentDate} &bull; വില: ₹ 8.50</span>
              <span>1888-ൽ സ്ഥാപിതം</span>
            </div>
          </div>

          {/* Broadsheet Multi-Column Layout */}
          <div className="my-6">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-black text-center leading-tight mb-3">
              {article.headline}
            </h1>
            <div className="text-center font-bold text-base sm:text-lg text-slate-800 italic max-w-3xl mx-auto mb-6">
              {article.summary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-900 leading-relaxed text-justify border-t border-stone-400 pt-4">
              <div className="space-y-3">
                <span className="font-bold text-xs uppercase block text-red-800">
                  സ്വന്തം ലേഖകൻ &bull; തിരുവനന്തപുരം
                </span>
                <p className="font-bold text-black first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2">
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
      {/* MODE 5: MALAYALA MANORAMA NEWSPAPER (ENGLISH BROADSHEET)                  */}
      {/* ========================================================================= */}
      {mode === 'newspaper_en' && (
        <div className="bg-[#FAF7EE] text-slate-900 rounded-2xl shadow-xl border border-stone-300 p-6 sm:p-12 font-serif">
          {/* Authentic English Masthead */}
          <div className="text-center border-b-2 border-black pb-4 mb-4">
            <div className="flex justify-center mb-2">
              <img
                src="/logos/newspaper_english.png"
                alt="Malayala Manorama"
                className="h-16 sm:h-20 w-auto object-contain filter contrast-125"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-sans font-bold border-t border-b border-black py-1 tracking-wider uppercase">
              <span>National Broadsheet &bull; Vol. CXXXVII</span>
              <span>{currentDate} &bull; ₹ 8.50</span>
              <span>ESTABLISHED 1888</span>
            </div>
          </div>

          {/* Broadsheet Columns */}
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
    </div>
  );
};
