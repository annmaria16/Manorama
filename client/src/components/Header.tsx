import React from 'react';
import { Newspaper, Sparkles, Settings, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeaderProps {
  isDemo: boolean;
  onOpenSettings: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDemo, onOpenSettings, onReset }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      {/* Top red brand stripe */}
      <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-700" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center shadow-inner font-extrabold text-xl tracking-tighter text-white">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  MANORAMA <span className="text-red-500">AI DESK</span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  v1.0 STUDIO
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                From raw information to publication-ready journalism
              </p>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center space-x-3">
            {/* Live AI / Demo Mode Indicator */}
            {isDemo ? (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Demo Mode (Sample Data)</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Gemini AI Connected</span>
              </div>
            )}

            {/* Reset button */}
            <button
              onClick={onReset}
              title="Reset Workspace"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-xs flex items-center space-x-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Settings button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>AI Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
