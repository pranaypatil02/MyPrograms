/**
 * Mock data service for development and fallback when API is unavailable
 */

// Mock stock database matching the current mock data structure
export const mockStockDatabase = {
  'AAPL': {
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 178.50,
    marketCap: '2.8T',
    metrics: {
      pe: 29.5,
      eps: 6.05,
      roe: 147.5,
      roa: 27.9,
      roic: 52.3,
      debtToEquity: 1.97,
      currentRatio: 0.98,
      grossMargin: 43.8,
      operatingMargin: 30.7,
      netMargin: 26.3,
      dividendYield: 0.5,
      fcf: 99.8,
      revenue: 394.3,
      revenueGrowth: 7.8
    },
    sectorAvg: {
      pe: 28,
      roe: 18,
      roa: 10
    },
    priceHistory: [
      { month: 'Jan', price: 155 },
      { month: 'Feb', price: 162 },
      { month: 'Mar', price: 171 },
      { month: 'Apr', price: 168 },
      { month: 'May', price: 175 },
      { month: 'Jun', price: 178.5 }
    ],
    strengths: [
      'Massive cash reserves ($166B+)',
      'Strong ecosystem lock-in',
      'Premium brand pricing power',
      'Growing services revenue (high margin)',
      'Consistent innovation track record'
    ],
    risks: [
      'iPhone dependency (~50% revenue)',
      'China exposure (geopolitical risk)',
      'Mature smartphone market',
      'Regulatory scrutiny (App Store)',
      'High valuation limits upside'
    ]
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 378.91,
    marketCap: '2.8T',
    metrics: {
      pe: 35.2,
      eps: 10.76,
      roe: 41.7,
      roa: 17.2,
      roic: 28.9,
      debtToEquity: 0.47,
      currentRatio: 1.77,
      grossMargin: 69.8,
      operatingMargin: 43.1,
      netMargin: 36.7,
      dividendYield: 0.8,
      fcf: 73.5,
      revenue: 227.6,
      revenueGrowth: 12.4
    },
    sectorAvg: {
      pe: 28,
      roe: 18,
      roa: 10
    },
    priceHistory: [
      { month: 'Jan', price: 340 },
      { month: 'Feb', price: 355 },
      { month: 'Mar', price: 368 },
      { month: 'Apr', price: 362 },
      { month: 'May', price: 375 },
      { month: 'Jun', price: 378.9 }
    ],
    strengths: [
      'Azure cloud growing 30%+ annually',
      'Enterprise software moat',
      'Office 365 recurring revenue',
      'AI leadership (OpenAI partnership)',
      'Excellent management (Satya Nadella)'
    ],
    risks: [
      'Cloud competition (AWS, Google)',
      'High valuation (P/E over 35)',
      'Regulatory concerns',
      'LinkedIn growth slowing',
      'Gaming division integration challenges'
    ]
  },
  'GOOGL': {
    name: 'Alphabet Inc. (Google)',
    sector: 'Technology',
    price: 142.35,
    marketCap: '1.8T',
    metrics: {
      pe: 26.8,
      eps: 5.31,
      roe: 29.2,
      roa: 18.7,
      roic: 24.1,
      debtToEquity: 0.11,
      currentRatio: 2.93,
      grossMargin: 57.1,
      operatingMargin: 27.9,
      netMargin: 23.5,
      dividendYield: 0.0,
      fcf: 69.5,
      revenue: 307.4,
      revenueGrowth: 8.6
    },
    sectorAvg: {
      pe: 28,
      roe: 18,
      roa: 10
    },
    priceHistory: [
      { month: 'Jan', price: 128 },
      { month: 'Feb', price: 132 },
      { month: 'Mar', price: 138 },
      { month: 'Apr', price: 135 },
      { month: 'May', price: 140 },
      { month: 'Jun', price: 142.4 }
    ],
    strengths: [
      'Search monopoly (90%+ market share)',
      'YouTube domination',
      'Android ecosystem',
      'AI/ML technology leadership',
      'Minimal debt, huge cash position'
    ],
    risks: [
      'Ad revenue dependency (80%+)',
      'Regulatory threats (antitrust)',
      'Privacy concerns affecting tracking',
      'Cloud #3 player (behind AWS, Azure)',
      'Other Bets losing money'
    ]
  },
  'JPM': {
    name: 'JPMorgan Chase & Co.',
    sector: 'Finance',
    price: 198.45,
    marketCap: '580B',
    metrics: {
      pe: 11.2,
      eps: 17.72,
      roe: 17.3,
      roa: 1.3,
      roic: 3.8,
      debtToEquity: 1.45,
      currentRatio: 0.92,
      grossMargin: 28.3,
      operatingMargin: 38.2,
      netMargin: 29.1,
      dividendYield: 2.4,
      fcf: 48.2,
      revenue: 158.1,
      revenueGrowth: 22.3
    },
    sectorAvg: {
      pe: 12,
      roe: 12,
      roa: 1.2
    },
    priceHistory: [
      { month: 'Jan', price: 172 },
      { month: 'Feb', price: 180 },
      { month: 'Mar', price: 188 },
      { month: 'Apr', price: 184 },
      { month: 'May', price: 193 },
      { month: 'Jun', price: 198.5 }
    ],
    strengths: [
      'Largest US bank by assets',
      'Diversified revenue streams',
      'Strong investment banking division',
      'Benefits from rising interest rates',
      'Excellent risk management'
    ],
    risks: [
      'Credit risk in recession',
      'Heavy regulation',
      'Interest rate sensitivity',
      'Trading revenue volatility',
      'Political/regulatory risk'
    ]
  },
  'TSLA': {
    name: 'Tesla, Inc.',
    sector: 'Consumer Discretionary',
    price: 248.50,
    marketCap: '790B',
    metrics: {
      pe: 68.5,
      eps: 3.63,
      roe: 28.5,
      roa: 11.2,
      roic: 16.8,
      debtToEquity: 0.17,
      currentRatio: 1.73,
      grossMargin: 18.2,
      operatingMargin: 9.8,
      netMargin: 13.1,
      dividendYield: 0.0,
      fcf: 4.2,
      revenue: 96.8,
      revenueGrowth: 51.4
    },
    sectorAvg: {
      pe: 18,
      roe: 14,
      roa: 7
    },
    priceHistory: [
      { month: 'Jan', price: 185 },
      { month: 'Feb', price: 202 },
      { month: 'Mar', price: 228 },
      { month: 'Apr', price: 215 },
      { month: 'May', price: 238 },
      { month: 'Jun', price: 248.5 }
    ],
    strengths: [
      'EV market leader',
      'Vertical integration advantages',
      'Supercharger network moat',
      'Software/FSD potential',
      'Energy storage business growing'
    ],
    risks: [
      'Elon Musk dependency',
      'Intense EV competition',
      'Production scaling challenges',
      'Regulatory changes',
      'High valuation concerns'
    ]
  },
  'AMZN': {
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Discretionary',
    price: 178.25,
    marketCap: '1.8T',
    metrics: {
      pe: 72.3,
      eps: 2.47,
      roe: 14.5,
      roa: 4.2,
      roic: 8.9,
      debtToEquity: 0.58,
      currentRatio: 1.02,
      grossMargin: 46.8,
      operatingMargin: 5.3,
      netMargin: 3.8,
      dividendYield: 0.0,
      fcf: 32.1,
      revenue: 574.8,
      revenueGrowth: 13.2
    },
    sectorAvg: {
      pe: 18,
      roe: 14,
      roa: 7
    },
    priceHistory: [
      { month: 'Jan', price: 152 },
      { month: 'Feb', price: 165 },
      { month: 'Mar', price: 172 },
      { month: 'Apr', price: 168 },
      { month: 'May', price: 175 },
      { month: 'Jun', price: 178.3 }
    ],
    strengths: [
      'AWS cloud dominance (30%+ market share)',
      'Prime membership loyalty',
      'Logistics network advantage',
      'Advertising business growing',
      'International expansion potential'
    ],
    risks: [
      'Regulatory scrutiny',
      'Margin pressure in retail',
      'AWS growth slowing',
      'High capex requirements',
      'Labor relations issues'
    ]
  },
  'JNJ': {
    name: 'Johnson & Johnson',
    sector: 'Healthcare',
    price: 151.82,
    marketCap: '380B',
    metrics: {
      pe: 15.8,
      eps: 9.62,
      roe: 25.3,
      roa: 8.7,
      roic: 16.2,
      debtToEquity: 0.42,
      currentRatio: 1.32,
      grossMargin: 67.8,
      operatingMargin: 25.1,
      netMargin: 18.9,
      dividendYield: 3.1,
      fcf: 22.8,
      revenue: 94.9,
      revenueGrowth: 2.8
    },
    sectorAvg: {
      pe: 20,
      roe: 15,
      roa: 8
    },
    priceHistory: [
      { month: 'Jan', price: 148 },
      { month: 'Feb', price: 150 },
      { month: 'Mar', price: 152 },
      { month: 'Apr', price: 149 },
      { month: 'May', price: 153 },
      { month: 'Jun', price: 151.8 }
    ],
    strengths: [
      'Diversified healthcare portfolio',
      'Strong pharmaceutical pipeline',
      'AAA credit rating',
      'Dividend aristocrat (60+ years)',
      'Defensive business model'
    ],
    risks: [
      'Patent expirations',
      'Litigation risks (talc, opioids)',
      'Regulatory pressures',
      'Innovation pipeline gaps',
      'Slow growth in consumer segment'
    ]
  },
  'BAC': {
    name: 'Bank of America',
    sector: 'Finance',
    price: 34.82,
    marketCap: '275B',
    metrics: {
      pe: 10.8,
      eps: 3.22,
      roe: 11.2,
      roa: 1.0,
      roic: 3.2,
      debtToEquity: 1.22,
      currentRatio: 0.88,
      grossMargin: 25.8,
      operatingMargin: 35.2,
      netMargin: 25.8,
      dividendYield: 2.8,
      fcf: 28.5,
      revenue: 98.4,
      revenueGrowth: 5.4
    },
    sectorAvg: {
      pe: 12,
      roe: 12,
      roa: 1.2
    },
    priceHistory: [
      { month: 'Jan', price: 32 },
      { month: 'Feb', price: 33 },
      { month: 'Mar', price: 34 },
      { month: 'Apr', price: 33.5 },
      { month: 'May', price: 34.2 },
      { month: 'Jun', price: 34.8 }
    ],
    strengths: [
      'Strong retail banking franchise',
      'Digital banking leadership',
      'Cost control initiatives',
      'Interest rate sensitivity',
      'Warren Buffett holding'
    ],
    risks: [
      'Net interest margin pressure',
      'Credit cycle exposure',
      'Regulatory capital requirements',
      'Competition from fintech',
      'Economic recession sensitivity'
    ]
  }
};

// Mock sector data
export const mockSectorData = {
  'Technology': {
    name: 'Technology',
    description: 'Companies that develop software, hardware, and IT services.',
    avgPE: 28,
    avgROE: 18,
    avgROA: 10,
    avgMargin: 25,
    avgDebt: 0.8,
    avgDividend: 0.8,
    examples: ['Apple', 'Microsoft', 'Google', 'Nvidia'],
    characteristics: [
      'High growth potential',
      'Innovation-driven',
      'Competitive landscape',
      'Rapid obsolescence risk'
    ]
  },
  'Finance': {
    name: 'Finance',
    description: 'Banks, insurance companies, and financial services firms.',
    avgPE: 12,
    avgROE: 12,
    avgROA: 1.2,
    avgMargin: 30,
    avgDebt: 5.0,
    avgDividend: 3.0,
    examples: ['JPMorgan', 'Bank of America', 'Goldman Sachs', 'Visa'],
    characteristics: [
      'Interest rate sensitive',
      'Highly regulated',
      'Cyclical',
      'Leverage is normal'
    ]
  },
  'Healthcare': {
    name: 'Healthcare',
    description: 'Pharmaceuticals, medical devices, and healthcare services.',
    avgPE: 20,
    avgROE: 15,
    avgROA: 8,
    avgMargin: 20,
    avgDebt: 0.6,
    avgDividend: 2.2,
    examples: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth', 'Merck'],
    characteristics: [
      'Defensive (recession-resistant)',
      'Regulation-heavy',
      'Patent-dependent',
      'Aging population tailwind'
    ]
  },
  'Consumer': {
    name: 'Consumer',
    description: 'Retail, consumer goods, and discretionary spending companies.',
    avgPE: 18,
    avgROE: 14,
    avgROA: 7,
    avgMargin: 15,
    avgDebt: 0.9,
    avgDividend: 2.0,
    examples: ['Amazon', 'Tesla', 'Nike', 'Home Depot'],
    characteristics: [
      'Economic cycle sensitive',
      'Brand loyalty important',
      'Competitive pricing pressure',
      'E-commerce disruption'
    ]
  },
  'Energy': {
    name: 'Energy',
    description: 'Oil, gas, and renewable energy companies.',
    avgPE: 9,
    avgROE: 8,
    avgROA: 3,
    avgMargin: 12,
    avgDebt: 1.2,
    avgDividend: 4.5,
    examples: ['Exxon', 'Chevron', 'NextEra', 'ConocoPhillips'],
    characteristics: [
      'Commodity price volatility',
      'Capital intensive',
      'Geopolitical risks',
      'Energy transition challenges'
    ]
  }
};

/**
 * Get mock stock data for a symbol
 */
export function getMockStockData(symbol) {
  const stock = mockStockDatabase[symbol.toUpperCase()];
  if (!stock) {
    throw new Error(`No mock data available for ${symbol}`);
  }
  return { ...stock };
}

/**
 * Get mock sector data
 */
export function getMockSectorData(sector) {
  if (sector) {
    return mockSectorData[sector] || null;
  }
  return mockSectorData;
}

/**
 * Get all available mock stock symbols
 */
export function getAvailableMockSymbols() {
  return Object.keys(mockStockDatabase);
}

/**
 * Search mock stocks by keyword
 */
export function searchMockStocks(keyword) {
  const searchTerm = keyword.toLowerCase();
  return Object.entries(mockStockDatabase)
    .filter(([symbol, data]) => 
      symbol.toLowerCase().includes(searchTerm) ||
      data.name.toLowerCase().includes(searchTerm) ||
      data.sector.toLowerCase().includes(searchTerm)
    )
    .map(([symbol, data]) => ({
      symbol,
      name: data.name,
      sector: data.sector,
      price: data.price
    }));
}

export default {
  mockStockDatabase,
  mockSectorData,
  getMockStockData,
  getMockSectorData,
  getAvailableMockSymbols,
  searchMockStocks
};