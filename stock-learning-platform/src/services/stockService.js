/**
 * Unified Stock Service
 * 
 * This service provides a consistent interface for accessing stock data,
 * whether from the real Alpha Vantage API or from mock data.
 */

import * as alphaVantage from './alphaVantage';
import * as mockData from './mockData';

// Configuration
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const HAS_API_KEY = !!import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// Determine data source preference
const useRealAPI = HAS_API_KEY && !USE_MOCK_DATA;

console.log(`Stock Service Configuration:
  - USE_MOCK_DATA: ${USE_MOCK_DATA}
  - HAS_API_KEY: ${HAS_API_KEY}
  - Using: ${useRealAPI ? 'Real Alpha Vantage API' : 'Mock Data'}
`);

/**
 * Wrapper function that tries real API first, falls back to mock data
 */
async function tryWithFallback(apiCall, mockCall, ...args) {
  if (useRealAPI) {
    try {
      const result = await apiCall(...args);
      return { data: result, source: 'api', error: null };
    } catch (apiError) {
      console.warn(`API call failed, falling back to mock data:`, apiError.message);
      
      // Rate limit or temporary error - try mock data
      try {
        const mockResult = await mockCall(...args);
        return { data: mockResult, source: 'mock', error: apiError.message };
      } catch {
        throw new Error(`Both API and mock data failed: ${apiError.message}`);
      }
    }
  } else {
    // Use mock data directly
    try {
      const mockResult = await mockCall(...args);
      return { data: mockResult, source: 'mock', error: null };
    } catch (mockError) {
      throw new Error(`Mock data failed: ${mockError.message}`);
    }
  }
}

/**
 * Get stock data for a symbol
 */
export async function getStockData(symbol) {
   const apiCall = async (sym) => {
     const analysis = await alphaVantage.getStockAnalysis(sym);
     console.log('API Analysis for', sym, ':', analysis);
     
     // Transform API data to match our application's expected format
     return {
      name: analysis.overview?.name || sym,
      sector: analysis.overview?.sector || 'Unknown',
      price: analysis.quote?.price || 0,
      marketCap: formatMarketCap(analysis.overview?.marketCap || 0),
      metrics: {
        pe: analysis.calculatedMetrics.peRatio || 0,
        eps: analysis.calculatedMetrics.eps || 0,
        roe: analysis.calculatedMetrics.roe || 0,
        roa: analysis.calculatedMetrics.roa || 0,
        roic: analysis.calculatedMetrics.roic || 0,
        debtToEquity: analysis.calculatedMetrics.debtToEquity || 0,
        currentRatio: analysis.calculatedMetrics.currentRatio || 0,
        grossMargin: analysis.calculatedMetrics.profitMargin || 0,
        operatingMargin: analysis.calculatedMetrics.operatingMargin || 0,
        netMargin: analysis.calculatedMetrics.profitMargin || 0,
        dividendYield: analysis.overview?.dividendYield || 0,
        fcf: analysis.financials?.cashFlow?.annualReports?.[0]?.operatingCashflow || 0,
        revenue: analysis.overview?.revenue || 0,
        revenueGrowth: analysis.calculatedMetrics.revenueGrowth || 0
      },
      sectorAvg: getSectorAverages(analysis.overview?.sector || 'Unknown'),
      priceHistory: transformTimeSeriesToChartData(analysis.timeSeries || []),
      strengths: generateStrengths(analysis),
      risks: generateRisks(analysis)
    };
  };

   const mockCall = (sym) => {
     console.log('Using mock data for', sym);
     const stock = mockData.getMockStockData(sym);
     
     // Ensure we have all required fields
     return {
       ...stock,
       priceHistory: stock.priceHistory || [],
       strengths: stock.strengths || [],
       risks: stock.risks || []
     };
   };

  return tryWithFallback(apiCall, mockCall, symbol);
}

/**
 * Get comparison data for two stocks
 */
export async function getStockComparison(symbol1, symbol2) {
  const apiCall = async (sym1, sym2) => {
    const [stock1, stock2] = await Promise.all([
      getStockData(sym1),
      getStockData(sym2)
    ]);

    return {
      stock1: stock1.data,
      stock2: stock2.data,
      comparison: compareStocks(stock1.data, stock2.data)
    };
  };

  const mockCall = async (sym1, sym2) => {
    const stock1 = mockData.getMockStockData(sym1);
    const stock2 = mockData.getMockStockData(sym2);

    return {
      stock1,
      stock2,
      comparison: compareStocks(stock1, stock2)
    };
  };

  return tryWithFallback(apiCall, mockCall, symbol1, symbol2);
}

/**
 * Search for stocks
 */
export async function searchStocks(keywords) {
  const apiCall = async (kw) => {
    const results = await alphaVantage.searchStocks(kw);
    return results.map(result => ({
      symbol: result.symbol,
      name: result.name,
      sector: 'Unknown', // API doesn't provide sector in search
      price: 0
    }));
  };

  const mockCall = async (kw) => {
    return mockData.searchMockStocks(kw);
  };

  return tryWithFallback(apiCall, mockCall, keywords);
}

/**
 * Get sector data
 */
export async function getSectorData(sector = null) {
  const apiCall = async (sec) => {
    const sectors = await alphaVantage.getSectorPerformance();
    
    if (sec) {
      const sectorData = sectors.find(s => s.name === sec);
      return sectorData || null;
    }
    
    return sectors;
  };

  const mockCall = async (sec) => {
    return mockData.getMockSectorData(sec);
  };

  return tryWithFallback(apiCall, mockCall, sector);
}

/**
 * Get all available sectors
 */
export async function getAvailableSectors() {
  const mockSectors = mockData.mockSectorData;
  return Object.keys(mockSectors);
}

/**
 * Get available stock symbols
 */
export async function getAvailableSymbols() {
  if (useRealAPI) {
    // For real API, we can't know all symbols - return common ones
    return ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'JPM', 'JNJ', 'BAC'];
  }
  
  return mockData.getAvailableMockSymbols();
}

/**
 * Check if service is using real API
 */
export function isUsingRealAPI() {
  return useRealAPI;
}

/**
 * Get service status
 */
export function getServiceStatus() {
  return {
    usingRealAPI: useRealAPI,
    hasAPIKey: HAS_API_KEY,
    useMockData: USE_MOCK_DATA,
    cacheStats: alphaVantage.getCacheStats ? alphaVantage.getCacheStats() : null
  };
}

// Helper functions

function formatMarketCap(marketCap) {
  if (marketCap >= 1e12) {
    return `${(marketCap / 1e12).toFixed(1)}T`;
  } else if (marketCap >= 1e9) {
    return `${(marketCap / 1e9).toFixed(1)}B`;
  } else if (marketCap >= 1e6) {
    return `${(marketCap / 1e6).toFixed(1)}M`;
  }
  return marketCap.toFixed(0);
}

function getSectorAverages(sector) {
  const sectorAverages = {
    'Technology': { pe: 28, roe: 18, roa: 10 },
    'Finance': { pe: 12, roe: 12, roa: 1.2 },
    'Healthcare': { pe: 20, roe: 15, roa: 8 },
    'Consumer Discretionary': { pe: 18, roe: 14, roa: 7 },
    'Consumer Staples': { pe: 20, roe: 15, roa: 8 },
    'Energy': { pe: 9, roe: 8, roa: 3 },
    'Industrials': { pe: 20, roe: 15, roa: 6 },
    'Utilities': { pe: 18, roe: 10, roa: 3 },
    'Real Estate': { pe: 15, roe: 8, roa: 4 },
    'Materials': { pe: 15, roe: 12, roa: 6 },
    'Communication Services': { pe: 22, roe: 16, roa: 8 }
  };

  return sectorAverages[sector] || { pe: 15, roe: 12, roa: 6 };
}

function transformTimeSeriesToChartData(timeSeries) {
  if (!timeSeries || timeSeries.length === 0) {
    // Return default chart data if no time series
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
     return months.map((month) => ({
      month,
      price: 100 + Math.random() * 50
    }));
  }

  // Take last 6 data points for chart
  const recentData = timeSeries.slice(-6);
  
  return recentData.map((data, index) => ({
    month: formatDateForChart(data.date, index),
    price: data.close || data.price || 0
  }));
}

function formatDateForChart(dateString, index) {
  if (!dateString) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months[index % months.length];
  }
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' });
  } catch {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months[index % months.length];
  }
}

function generateStrengths(analysis) {
  const strengths = [];
  
  if (analysis.overview?.marketCap > 100e9) {
    strengths.push('Large market capitalization indicates stability');
  }
  
  if (analysis.calculatedMetrics.profitMargin > 20) {
    strengths.push('High profit margins indicate pricing power');
  }
  
  if (analysis.calculatedMetrics.roe > 15) {
    strengths.push('Strong return on equity indicates efficient use of capital');
  }
  
  if (analysis.calculatedMetrics.debtToEquity < 1) {
    strengths.push('Low debt levels reduce financial risk');
  }
  
  if (analysis.calculatedMetrics.revenueGrowth > 10) {
    strengths.push('Strong revenue growth indicates market traction');
  }
  
  if (strengths.length === 0) {
    strengths.push('Stable business model', 'Experienced management team');
  }
  
  return strengths.slice(0, 5);
}

function generateRisks(analysis) {
  const risks = [];
  
  if (analysis.calculatedMetrics.peRatio > 30) {
    risks.push('High valuation may limit upside potential');
  }
  
  if (analysis.calculatedMetrics.debtToEquity > 2) {
    risks.push('High debt levels increase financial risk');
  }
  
  if (analysis.calculatedMetrics.revenueGrowth < 5) {
    risks.push('Slow growth may indicate market saturation');
  }
  
  if (analysis.calculatedMetrics.currentRatio < 1) {
    risks.push('Low current ratio may indicate liquidity concerns');
  }
  
  if (analysis.overview?.beta > 1.5) {
    risks.push('High beta indicates volatility relative to market');
  }
  
  if (risks.length === 0) {
    risks.push('Market competition', 'Economic cycle sensitivity', 'Regulatory changes');
  }
  
  return risks.slice(0, 5);
}

function compareStocks(stock1, stock2) {
  const comparisons = [];
  
  // Price comparison
  comparisons.push({
    metric: 'Price',
    stock1: stock1.price,
    stock2: stock2.price,
    winner: stock1.price < stock2.price ? 'stock1' : 'stock2',
    difference: Math.abs(stock1.price - stock2.price)
  });
  
  // P/E comparison
  comparisons.push({
    metric: 'P/E Ratio',
    stock1: stock1.metrics.pe,
    stock2: stock2.metrics.pe,
    winner: stock1.metrics.pe < stock2.metrics.pe ? 'stock1' : 'stock2',
    difference: Math.abs(stock1.metrics.pe - stock2.metrics.pe)
  });
  
  // ROE comparison
  comparisons.push({
    metric: 'ROE',
    stock1: stock1.metrics.roe,
    stock2: stock2.metrics.roe,
    winner: stock1.metrics.roe > stock2.metrics.roe ? 'stock1' : 'stock2',
    difference: Math.abs(stock1.metrics.roe - stock2.metrics.roe)
  });
  
  // Revenue Growth comparison
  comparisons.push({
    metric: 'Revenue Growth',
    stock1: stock1.metrics.revenueGrowth,
    stock2: stock2.metrics.revenueGrowth,
    winner: stock1.metrics.revenueGrowth > stock2.metrics.revenueGrowth ? 'stock1' : 'stock2',
    difference: Math.abs(stock1.metrics.revenueGrowth - stock2.metrics.revenueGrowth)
  });
  
  // Dividend Yield comparison
  comparisons.push({
    metric: 'Dividend Yield',
    stock1: stock1.metrics.dividendYield,
    stock2: stock2.metrics.dividendYield,
    winner: stock1.metrics.dividendYield > stock2.metrics.dividendYield ? 'stock1' : 'stock2',
    difference: Math.abs(stock1.metrics.dividendYield - stock2.metrics.dividendYield)
  });
  
  return comparisons;
}

export default {
  getStockData,
  getStockComparison,
  searchStocks,
  getSectorData,
  getAvailableSectors,
  getAvailableSymbols,
  isUsingRealAPI,
  getServiceStatus
};