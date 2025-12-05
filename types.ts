export interface BannerData {
  companyName: string;
  ticker: string;
  exchange: string;
  industry: string;
  established: string;
  hq: string;
  employees: string;
  revenue: string; // e.g. "$12.5B (+5% YoY)"
  cagr5Year: string;
}

export interface OverviewData {
  summary: string;
  keyFinancials: {
    revenue: string;
    pat: string;
    patMargin: string;
    orderBook?: string;
  };
  cxFootprint: string;
  geoSplit: Array<{ region: string; percentage: number }>;
}

export interface BusinessModelData {
  segments: string[];
  customers: string[];
  revenueStreams: string[];
  valueProposition: string[];
  channels: string[];
  keyActivities: string[];
  ma: string[]; // Mergers & Acquisitions
  segmentTable: Array<{
    segment: string;
    revenueShare: string;
    products: string;
  }>;
}

export interface GrowthStrategyCylinder {
  title: string;
  points: string[];
}

export interface FinancialData {
  history: Array<{
    year: string;
    revenue: number;
    netIncome: number;
    ebitdaMargin: number;
  }>;
  segmentGrowth: Array<{
    segment: string;
    currentRevenue: number;
    prevRevenue: number;
    growth: number;
  }>;
  analysis: {
    revenueGrowthFactors: string;
    trend5Year: string;
    cagrAnalysis: string;
    segmentYoYAnalysis: string;
    netIncomeEbitdaAnalysis: string;
    geoBifurcation?: string;
  };
  projections: string[];
  creditRatings?: string;
}

export interface CompanyReport {
  banner: BannerData;
  overview: OverviewData;
  businessModel: BusinessModelData;
  growthStrategy: GrowthStrategyCylinder[];
  financials: FinancialData;
  sources: string[];
}
