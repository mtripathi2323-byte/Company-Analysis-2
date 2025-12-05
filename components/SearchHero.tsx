import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchHeroProps {
  onSearch: (term: string) => void;
  loading: boolean;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, loading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Company<span className="text-blue-600">Analysis</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Deep market research, financial insights, and growth strategies powered by advanced AI and real-time data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto w-full group">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative flex items-center bg-white rounded-full shadow-xl border border-slate-100 overflow-hidden p-1.5 transition-all focus-within:ring-4 focus-within:ring-blue-100">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for a public company (e.g. Google, Tata Motors)..."
              className="flex-1 pl-6 pr-4 py-4 text-lg outline-none text-slate-700 placeholder:text-slate-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !term.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <Search size={24} />
              )}
            </button>
          </div>
        </form>

        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center opacity-60">
          <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200">
            <div className="font-bold text-blue-600 text-xl">Real-time</div>
            <div className="text-sm text-slate-600">Market Data</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200">
            <div className="font-bold text-blue-600 text-xl">AI-Driven</div>
            <div className="text-sm text-slate-600">Strategy Analysis</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200">
            <div className="font-bold text-blue-600 text-xl">Financial</div>
            <div className="text-sm text-slate-600">Deep Dives</div>
          </div>
          <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-slate-200">
            <div className="font-bold text-blue-600 text-xl">Instant</div>
            <div className="text-sm text-slate-600">Report Generation</div>
          </div>
        </div>
      </div>
    </div>
  );
};
