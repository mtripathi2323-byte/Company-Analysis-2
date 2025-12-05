import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell,
  LabelList
} from 'recharts';
import { FinancialData, OverviewData } from '../../types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1', '#ec4899'];

interface FinancialChartsProps {
  financials: FinancialData;
  overview: OverviewData;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ financials, overview }) => {
  // Process History Data for Combo Chart
  const comboData = financials.history.map(item => ({
    year: item.year,
    Revenue: item.revenue,
    NetIncome: item.netIncome,
    EBITDA_Margin: item.ebitdaMargin,
  })).reverse(); // Assuming API returns desc, we want asc for chart

  // Process Geo Split for Pie
  const geoData = overview.geoSplit;

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Financial Performance (Revenue & Margins)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={comboData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(value) => formatCurrency(value)} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} unit="%" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => {
                  if (name === 'EBITDA Margin %') return `${value}%`;
                  return formatCurrency(value);
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="Revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30}>
                <LabelList dataKey="Revenue" position="top" formatter={formatCurrency} style={{ fill: '#1e3a8a', fontSize: '11px', fontWeight: 600 }} />
              </Bar>
              <Bar yAxisId="left" dataKey="NetIncome" name="Net Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30}>
                <LabelList dataKey="NetIncome" position="top" formatter={formatCurrency} style={{ fill: '#065f46', fontSize: '11px', fontWeight: 600 }} />
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="EBITDA_Margin" name="EBITDA Margin %" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }}>
                <LabelList dataKey="EBITDA_Margin" position="top" offset={10} formatter={(val: number) => `${val}%`} style={{ fill: '#b45309', fontSize: '11px', fontWeight: 700 }} />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Segment Growth (Current vs Previous)</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financials.segmentGrowth} layout="vertical" margin={{ top: 5, right: 50, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="segment" type="category" width={100} tick={{fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="prevRevenue" name="Previous Year" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={20}>
                  <LabelList dataKey="prevRevenue" position="right" formatter={formatCurrency} style={{ fill: '#475569', fontSize: '10px' }} />
                </Bar>
                <Bar dataKey="currentRevenue" name="Current Year" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                  <LabelList dataKey="currentRevenue" position="right" formatter={formatCurrency} style={{ fill: '#1d4ed8', fontSize: '10px', fontWeight: 600 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue by Geography</h3>
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geoData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="region"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#94a3b8' }}
                >
                  {geoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => `${val}%`}/>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ 
                    fontSize: '11px', 
                    width: '100%', 
                    paddingTop: '10px' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};