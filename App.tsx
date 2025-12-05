import React, { useState } from 'react';
import { SearchHero } from './components/SearchHero';
import { ReportDashboard } from './components/ReportDashboard';
import { fetchCompanyData } from './services/geminiService';
import { CompanyReport } from './types';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<CompanyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanyData(term);
      setReportData(data);
    } catch (err) {
      setError("Failed to generate report. Please try again or check your API key/Internet.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setReportData(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <h2 className="text-xl font-semibold text-slate-700">Analyzing Market Data...</h2>
        <p className="text-slate-500 animate-pulse">Consulting Google Search & Gemini 2.5 Flash</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-4 p-4 text-center">
        <div className="bg-red-100 p-4 rounded-full text-red-600">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Analysis Failed</h2>
        <p className="text-slate-600 max-w-md">{error}</p>
        <button 
          onClick={handleBack}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (reportData) {
    return <ReportDashboard data={reportData} onBack={handleBack} />;
  }

  return <SearchHero onSearch={handleSearch} loading={loading} />;
};

export default App;
