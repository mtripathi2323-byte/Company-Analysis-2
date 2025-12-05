import React, { useState } from 'react';
import { CompanyReport } from '../types';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { FinancialCharts } from './charts/FinancialCharts';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  Target, 
  PieChart, 
  ArrowUpRight,
  Download
} from 'lucide-react';

interface ReportDashboardProps {
  data: CompanyReport;
  onBack: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ data, onBack }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const downloadHtml = () => {
    // Basic implementation to satisfy "offline-openable"
    const element = document.createElement("a");
    const file = new Blob(
      [document.documentElement.outerHTML], 
      {type: 'text/html'}
    );
    element.href = URL.createObjectURL(file);
    element.download = `${data.banner.companyName.replace(/\s+/g, '_')}_Report.html`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#002366] to-[#1e40af] text-white p-6 md:p-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{data.banner.companyName}</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {data.banner.ticker}
                </span>
              </div>
              <p className="text-blue-100 text-lg flex items-center gap-2">
                <Building2 size={18} /> {data.banner.industry}
                <span className="mx-2">•</span>
                <Globe size={18} /> {data.banner.hq}
              </p>
            </div>
            <div className="flex gap-3">
               <button 
                onClick={onBack}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                New Search
              </button>
              <button 
                onClick={downloadHtml}
                className="px-4 py-2 bg-white text-blue-900 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
              >
                <Download size={16} /> Download Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-1">Latest Revenue</div>
              <div className="text-2xl font-bold">{data.banner.revenue}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-1">Employees</div>
              <div className="text-2xl font-bold">{data.banner.employees}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-1">Established</div>
              <div className="text-2xl font-bold">{data.banner.established}</div>
            </div>
             <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 text-sm font-medium mb-1">5Y Revenue CAGR</div>
              <div className="text-2xl font-bold">{data.banner.cagr5Year}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto p-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Overview */}
          <Card onClick={() => setActiveModal('overview')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Building2 size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Company Overview</h2>
            </div>
            <p className="text-slate-600 line-clamp-3 mb-4">
              {data.overview.summary}
            </p>
            <div className="flex gap-2">
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    Key Financials
                </span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    CX Footprint
                </span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    Geo Split
                </span>
            </div>
          </Card>

          {/* Card 2: Business Model */}
          <Card onClick={() => setActiveModal('businessModel')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
                <Briefcase size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Business Model</h2>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-slate-500">Segments</span>
                    <span className="font-medium text-slate-800">{data.businessModel.segments.length} Reportable</span>
                </div>
                <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-slate-500">Revenue Streams</span>
                    <span className="font-medium text-slate-800">{data.businessModel.revenueStreams.slice(0,2).join(', ')}...</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">M&A Activity</span>
                    <span className="font-medium text-slate-800">{data.businessModel.ma.length > 0 ? 'Active' : 'None Recent'}</span>
                </div>
            </div>
          </Card>

          {/* Card 3: Growth Strategy */}
          <Card onClick={() => setActiveModal('growth')}>
             <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Target size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Growth Strategy</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {data.growthStrategy.slice(0, 4).map((cyl, i) => (
                    <span key={i} className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-1 rounded text-xs font-medium">
                        {cyl.title}
                    </span>
                ))}
                {data.growthStrategy.length > 4 && (
                     <span className="bg-slate-50 text-slate-500 border border-slate-100 px-2 py-1 rounded text-xs font-medium">
                        +{data.growthStrategy.length - 4} more
                    </span>
                )}
            </div>
          </Card>

           {/* Card 4: Financial Performance */}
           <Card onClick={() => setActiveModal('financials')}>
             <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Financial Performance</h2>
            </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm border-b pb-2">
                    <span className="text-slate-500">Trend</span>
                    <span className="font-medium text-slate-800">{data.financials.analysis.trend5Year.slice(0, 30)}...</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">CAGR Analysis</span>
                    <span className="font-medium text-slate-800">{data.financials.analysis.cagrAnalysis.slice(0,30)}...</span>
                </div>
            </div>
          </Card>

        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Overview Modal */}
      <Modal isOpen={activeModal === 'overview'} onClose={() => setActiveModal(null)} title="Company Overview">
        <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed text-lg border-l-4 border-blue-500 pl-4 bg-slate-50 p-4 rounded-r">
                {data.overview.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-xl p-6 bg-slate-50">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <PieChart size={18} className="text-blue-600"/> Key Financials (Latest FY)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Revenue</div>
                            <div className="font-semibold text-lg">{data.overview.keyFinancials.revenue}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">PAT</div>
                            <div className="font-semibold text-lg">{data.overview.keyFinancials.pat}</div>
                        </div>
                         <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">PAT Margin</div>
                            <div className="font-semibold text-lg">{data.overview.keyFinancials.patMargin}</div>
                        </div>
                         <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Order Book</div>
                            <div className="font-semibold text-lg">{data.overview.keyFinancials.orderBook || 'N/A'}</div>
                        </div>
                    </div>
                </div>
                 <div className="border rounded-xl p-6 bg-slate-50">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Globe size={18} className="text-blue-600"/> CX Footprint
                    </h3>
                    <p className="text-slate-700">{data.overview.cxFootprint}</p>
                </div>
            </div>
        </div>
      </Modal>

      {/* Business Model Modal */}
      <Modal isOpen={activeModal === 'businessModel'} onClose={() => setActiveModal(null)} title="Business Model Analysis">
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Business Segments</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.businessModel.segments.map((seg, i) => (
                            <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-100">{seg}</span>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Revenue Streams</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.businessModel.revenueStreams.map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">{item}</span>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Value Proposition</h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700">
                        {data.businessModel.valueProposition.map((vp, i) => (
                            <li key={i}>{vp}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Key Channels</h3>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700">
                        {data.businessModel.channels.map((ch, i) => (
                            <li key={i}>{ch}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Segment Performance Breakdown</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600 border rounded-lg overflow-hidden">
                        <thead className="text-xs text-white uppercase bg-slate-800">
                            <tr>
                                <th className="px-6 py-3">Reportable Segment</th>
                                <th className="px-6 py-3">% Revenue Share</th>
                                <th className="px-6 py-3">Products & Services</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.businessModel.segmentTable.map((row, i) => (
                                <tr key={i} className="bg-white border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.segment}</td>
                                    <td className="px-6 py-4">{row.revenueShare}</td>
                                    <td className="px-6 py-4">{row.products}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {data.businessModel.ma.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-bold text-yellow-800 mb-2">Recent M&A Activity</h3>
                    <ul className="list-disc pl-5 space-y-1 text-yellow-900 text-sm">
                        {data.businessModel.ma.map((deal, i) => (
                            <li key={i}>{deal}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </Modal>

      {/* Growth Strategy Modal (Cylinders) */}
      <Modal isOpen={activeModal === 'growth'} onClose={() => setActiveModal(null)} title="Growth Strategy (6-Cylinder Analysis)">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.growthStrategy.map((cylinder, idx) => (
                <div key={idx} className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                        </div>
                        <h3 className="font-bold text-indigo-900 leading-tight">{cylinder.title}</h3>
                    </div>
                    <ul className="space-y-3">
                        {cylinder.points.map((point, pIdx) => (
                            <li key={pIdx} className="text-sm text-slate-700 flex gap-2">
                                <span className="text-indigo-400 mt-1">•</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </Modal>

      {/* Financials Modal */}
      <Modal isOpen={activeModal === 'financials'} onClose={() => setActiveModal(null)} title="Financial Performance & Analysis">
         <FinancialCharts financials={data.financials} overview={data.overview} />
         
         <div className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-blue-600" />
                    Financial Analysis
                </h3>
                <div className="space-y-4 text-slate-700">
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Growth Drivers:</span>
                        <p className="text-sm">{data.financials.analysis.revenueGrowthFactors}</p>
                    </div>
                    <div>
                         <span className="font-semibold text-slate-900 block mb-1">5-Year Trend:</span>
                         <p className="text-sm">{data.financials.analysis.trend5Year}</p>
                    </div>
                     <div>
                         <span className="font-semibold text-slate-900 block mb-1">Segment Performance:</span>
                         <p className="text-sm">{data.financials.analysis.segmentYoYAnalysis}</p>
                    </div>
                     <div>
                         <span className="font-semibold text-slate-900 block mb-1">Profitability (EBITDA/PAT):</span>
                         <p className="text-sm">{data.financials.analysis.netIncomeEbitdaAnalysis}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h3 className="font-bold text-emerald-900 mb-3">Guidance & Projections</h3>
                     <ul className="space-y-2">
                        {data.financials.projections.map((proj, i) => (
                            <li key={i} className="text-sm text-emerald-800 flex gap-2">
                                <span>•</span> {proj}
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3">Credit Ratings</h3>
                    <p className="text-sm text-slate-700">{data.financials.creditRatings || "No specific credit rating details found in public brief."}</p>
                </div>
            </div>
         </div>
      </Modal>

      {/* Sources Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-200">
         <details className="cursor-pointer group">
            <summary className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors list-none flex items-center gap-2">
                <span>Show Data Sources</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 flex flex-wrap gap-2">
                {data.sources.map((source, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {source}
                    </span>
                ))}
            </div>
         </details>
         <p className="text-xs text-slate-400 mt-4 text-center">
            Disclaimer: AI-generated report based on publicly available data. Contains estimations. Verify independently before investing.
         </p>
      </div>
    </div>
  );
};
