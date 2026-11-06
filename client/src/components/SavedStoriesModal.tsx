import React, { useEffect, useState } from 'react';
import { Database, X, Clock, FileText, ChevronRight, Search, CheckCircle, RefreshCw } from 'lucide-react';
import { fetchStories, fetchStory } from '../utils/api';
import { SavedStorySummary } from '../types';

interface SavedStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (storyData: any) => void;
  activeStoryId?: string;
}

export const SavedStoriesModal: React.FC<SavedStoriesModalProps> = ({
  isOpen,
  onClose,
  onSelectStory,
  activeStoryId
}) => {
  const [stories, setStories] = useState<SavedStorySummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadStories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStories();
      setStories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load saved stories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredStories = stories.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      (s.title && s.title.toLowerCase().includes(q)) ||
      (s.headline_en && s.headline_en.toLowerCase().includes(q)) ||
      (s.headline_ml && s.headline_ml.toLowerCase().includes(q)) ||
      (s.content_preview && s.content_preview.toLowerCase().includes(q))
    );
  });

  const handleChooseStory = async (storyId: string) => {
    setIsLoading(true);
    try {
      const fullStory = await fetchStory(storyId);
      onSelectStory(fullStory);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to load story details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D9232D] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>Newsroom Story Archive</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  SQL DB PERSISTENT
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                All submitted stories are saved with unique IDs and 5-language versions.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={loadStories}
              disabled={isLoading}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition"
              title="Refresh Stories"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by headline, location or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#D9232D]"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto grow space-y-3">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {isLoading && stories.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Loading stored stories from database...
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs space-y-2">
              <FileText className="w-8 h-8 mx-auto text-slate-300" />
              <p>No stories found. Submit a new story to see it saved here.</p>
            </div>
          ) : (
            filteredStories.map(story => {
              const isActive = activeStoryId === story.story_id;
              const formattedDate = new Date(story.created_at).toLocaleString('en-IN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={story.story_id}
                  onClick={() => handleChooseStory(story.story_id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 group ${
                    isActive
                      ? 'border-[#D9232D] bg-red-50/30 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 grow">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                        {story.source_type}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Active Story</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#D9232D] transition leading-snug">
                      {story.headline_en || story.title || 'Untitled News Story'}
                    </h4>

                    {story.headline_ml && (
                      <p className="text-xs text-slate-600 font-medium">
                        {story.headline_ml}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {story.content_preview}...
                    </p>

                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1">
                      <span>5 Languages Generated</span>
                      <span>&bull;</span>
                      <span className="font-mono text-[10px]">{story.story_id}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center text-slate-400 group-hover:text-[#D9232D] group-hover:translate-x-1 transition mt-2">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Total Saved Stories: <strong>{stories.length}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
