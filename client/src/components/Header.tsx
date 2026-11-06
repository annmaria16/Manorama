import React from 'react';
import {
  Sparkles,
  Settings,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Search,
  Calendar,
  Globe,
  Radio,
  ExternalLink
} from 'lucide-react';
import { MainNavSection } from '../types';

interface HeaderProps {
  currentSection: MainNavSection;
  onSelectSection: (section: MainNavSection) => void;
  isDemo: boolean;
  onOpenSettings: () => void;
  onReset: () => void;
  hasArticles: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  isDemo,
  onOpenSettings,
  onReset,
  hasArticles
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const navItems: { id: MainNavSection; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Newsroom Overview' },
    { id: 'create', label: '1. Create Article' },
    { id: 'multilingual', label: '2. Multilingual Studio', badge: '5 Langs' },
    { id: 'editor', label: '3. Article Editor' },
    { id: 'factguard', label: '4. Source Fact Guard' },
    { id: 'preview', label: '5. Publication Previews' },
    { id: 'export', label: '6. Standalone Export' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* 1. TOP UTILITY BAR (Inspired by Manorama Online Reference 1 & 2) */}
      <div className="bg-[#0F1E36] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Calendar className="w-3 h-3 text-red-400" />
              <span>{currentDate}</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            {/* Quick trending links matching Manorama Online reference */}
            <div className="hidden lg:flex items-center space-x-3 text-slate-400">
              <span className="text-red-400 font-bold uppercase text-[10px]">TRENDING:</span>
              <span className="hover:text-white cursor-pointer transition">Chandrayaan-4 Launch</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition">Wayanad Township</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition">Kochi Water Metro</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer transition">Kerala AI Mission</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Audio News badge */}
            <div className="hidden sm:flex items-center space-x-1 text-red-400 hover:text-red-300 cursor-pointer font-bold transition">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>AUDIO NEWS FLASH</span>
            </div>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* AI Engine Status badge */}
            {isDemo ? (
              <button
                onClick={onOpenSettings}
                className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30 transition"
              >
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>DEMO MODE (SAMPLES)</span>
              </button>
            ) : (
              <button
                onClick={onOpenSettings}
                className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold hover:bg-emerald-500/30 transition"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>GEMINI AI CONNECTED</span>
              </button>
            )}

            <button
              onClick={onOpenSettings}
              className="text-slate-300 hover:text-white transition flex items-center space-x-1"
              title="Configure API Settings"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND MASTHEAD (Using LOGO 3 as explicitly requested!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo 3 with crisp styling */}
          <div className="relative group cursor-pointer" onClick={() => onSelectSection('overview')}>
            <img
              src="/logos/manorama_ai_desk_logo.png"
              alt="Manorama AI Desk Official Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F1E36]">
                MANORAMA <span className="text-[#D9232D]">AI DESK</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 text-[#B71C1C] border border-red-200">
                Studio 2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-tight">
              From raw information to publication-ready journalism &bull; Automatic 5-Language Newsroom
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition flex items-center space-x-1.5"
            title="Reset Workspace"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={() => onSelectSection('create')}
            className="px-4 py-2 bg-[#D9232D] hover:bg-[#B71C1C] text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-1.5 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ New Story</span>
          </button>
        </div>
      </div>

      {/* 3. NEWSROOM NAVIGATION BAR */}
      <div className="bg-[#D9232D] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 no-scrollbar text-xs font-bold uppercase tracking-wider">
            {navItems.map(item => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`px-3.5 py-2.5 rounded-md transition whitespace-nowrap flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#B71C1C] text-white shadow-inner font-extrabold border-b-2 border-white'
                      : 'hover:bg-red-600/80 text-white/90'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white text-[#D9232D] font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
