import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, clearStoredApiKey, fetchSystemStatus } from '../utils/api';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      fetchSystemStatus()
        .then(res => setStatus(res))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      setStoredApiKey(apiKey);
      setMessage('API Key saved. Live Gemini AI enabled.');
    } else {
      clearStoredApiKey();
      setMessage('API Key cleared. Switched to deterministic Demo Mode.');
    }
    onKeyUpdated();
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    clearStoredApiKey();
    setApiKey('');
    setMessage('Switched to Demo Mode.');
    onKeyUpdated();
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg mb-2">
          <Key className="w-5 h-5 text-red-600" />
          <span>AI Engine & API Configuration</span>
        </div>

        <p className="text-xs text-slate-500 mb-5">
          Configure Google Gemini API for live article generation. If left blank, Manorama AI Desk operates in high-fidelity deterministic Demo Mode.
        </p>

        {/* Server Status Box */}
        {status && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Backend Status:</span>
              <span className="font-bold text-emerald-600">Active ({status.status})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Configured Model:</span>
              <span className="font-mono font-semibold text-slate-700">{status.configuredModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Active Engine:</span>
              <span className="font-semibold text-slate-800">
                {status.mode === 'live_ai' ? 'Live Gemini AI' : 'Deterministic Sample Mode'}
              </span>
            </div>
          </div>
        )}

        {/* Key Input */}
        <div className="space-y-2 mb-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Google Gemini API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500"
          />
          <p className="text-[11px] text-slate-400">
            Keys are stored locally in your browser and used only to authorize requests to your backend server.
          </p>
        </div>

        {message && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-500 hover:text-red-600 transition flex items-center space-x-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear (Demo Mode)</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition shadow-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
