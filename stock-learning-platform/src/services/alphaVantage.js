/**
 * Alpha Vantage API Service
 * 
 * API Documentation: https://www.alphavantage.co/documentation/
 * 
 * Free tier limitations:
 * - 5 API calls per minute
 * - 500 API calls per day
 * - Real-time & historical data (15-min delay for US stocks)
 */

// API Configuration
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || '';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.alphavantage.co/query';
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Cache implementation to reduce API calls
const cache = new Map();
const CACHE_DURATION = parseInt(import.meta.env.VITE_CACHE_DURATION || '300000', 10); // 5 minutes default

/**
 * Helper function to make API calls with caching
 */
async function makeAPICall(params, cacheKey = null) {
  // If mock data is enabled, return mock response
  if (USE_MOCK_DATA && !API_KEY) {
    console.warn('Using mock data - no API key provided or USE_MOCK_DATA is true');
    return null;
  }

  if (!API_KEY) {
    throw new Error('Alpha Vantage API key is not configured. Please add VITE_ALPHA_VANTAGE_API_KEY to your .env file');
  }

  // Check cache first
  if (cacheKey) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }

  // Construct URL
  const urlParams = new URLSearchParams({
    ...params,
    apikey: API_KEY
  });

  const url = `${BASE_URL}?${urlParams.toString()}`;

  try {
    console.log(`Making Alpha Vantage API call: ${params.function || 'unknown'}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check for API error messages
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    if (data['Note']) {
      console.warn('API rate limit notice:', data['Note']);
      // For rate limiting, we could implement retry logic
      throw new Error('API rate limit reached. Please try again in a minute.');
    }

    // Cache the response
    if (cacheKey) {
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }

    return data;
  } catch (error) {
    console.error('Alpha Vantage API error:', error);
    throw error;
  }
}

/**
 * Get real-time stock quote
 * @param {string} symbol - Stock ticker symbol (e.g., 'AAPL')
 */
export async function getStockQuote(symbol) {
  const params = {
    function: 'GLOBAL_QUOTE',
    symbol: symbol.toUpperCase()
  };

  const data = await makeAPICall(params, `quote_${symbol}`);
  
  if (!data || !data['Global Quote']) {
    throw new Error(`No quote data available for ${symbol}`);
  }

  const quote = data['Global Quote'];
  
  return {
    symbol: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    change: parseFloat(quote['09. change']),
    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    volume: parseInt(quote['06. volume'], 10),
    latestTradingDay: quote['07. latest trading day']
  };
}

/**
 * Get company overview and key metrics
 * @param {string} symbol - Stock ticker symbol
 */
export async function getCompanyOverview(symbol) {
  const params = {
    function: 'OVERVIEW',
    symbol: symbol.toUpperCase()
  };

  const data = await makeAPICall(params, `overview_${symbol}`);
  
  if (!data || !data.Symbol) {
    throw new Error(`No overview data available for ${symbol}`);
  }

  return {
    symbol: data.Symbol,
    name: data.Name,
    description: data.Description,
    sector: data.Sector,
    industry: data.Industry,
    marketCap: parseFloat(data.MarketCapitalization) || 0,
    peRatio: parseFloat(data.PERatio) || 0,
    eps: parseFloat(data.EPS) || 0,
    dividendYield: parseFloat(data.DividendYield) || 0,
    beta: parseFloat(data.Beta) || 0,
    fiftyTwoWeekHigh: parseFloat(data['52WeekHigh']) || 0,
    fiftyTwoWeekLow: parseFloat(data['52WeekLow']) || 0,
    // Additional metrics
    profitMargin: parseFloat(data.ProfitMargin) || 0,
    operatingMargin: parseFloat(data.OperatingMarginTTM) || 0,
    returnOnAssets: parseFloat(data.ReturnOnAssetsTTM) || 0,
    returnOnEquity: parseFloat(data.ReturnOnEquityTTM) || 0,
    revenue: parseFloat(data.RevenueTTM) || 0,
    revenuePerShare: parseFloat(data.RevenuePerShareTTM) || 0,
    quarterlyRevenueGrowth: parseFloat(data.QuarterlyRevenueGrowthYOY) || 0,
    quarterlyEarningsGrowth: parseFloat(data.QuarterlyEarningsGrowthYOY) || 0,
    debtToEquity: parseFloat(data.DebtToEquity) || 0,
    currentRatio: parseFloat(data.CurrentRatio) || 0,
    bookValue: parseFloat(data.BookValue) || 0
  };
}

/**
 * Get time series data for charts
 * @param {string} symbol - Stock ticker symbol
 * @param {string} interval - 'daily', 'weekly', 'monthly'
 * @param {string} outputSize - 'compact' (last 100 data points) or 'full' (20+ years)
 */
export async function getTimeSeries(symbol, interval = 'daily', outputSize = 'compact') {
  const functionMap = {
    daily: 'TIME_SERIES_DAILY',
    weekly: 'TIME_SERIES_WEEKLY',
    monthly: 'TIME_SERIES_MONTHLY'
  };

  const params = {
    function: functionMap[interval] || 'TIME_SERIES_DAILY',
    symbol: symbol.toUpperCase(),
    outputsize: outputSize
  };

  const data = await makeAPICall(params, `timeseries_${symbol}_${interval}_${outputSize}`);
  
  if (!data) {
    throw new Error(`No time series data available for ${symbol}`);
  }

  // Parse the time series data based on function
  const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
  if (!timeSeriesKey) {
    throw new Error(`Invalid time series response for ${symbol}`);
  }

  const timeSeries = data[timeSeriesKey];
  const series = Object.entries(timeSeries).map(([date, values]) => ({
    date,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume'], 10)
  }));

  // Sort by date ascending
  series.sort((a, b) => new Date(a.date) - new Date(b.date));

  return series;
}

/**
 * Get income statement data
 * @param {string} symbol - Stock ticker symbol
 */
export async function getIncomeStatement(symbol) {
  const params = {
    function: 'INCOME_STATEMENT',
    symbol: symbol.toUpperCase()
  };

  const data = await makeAPICall(params, `income_${symbol}`);
  
  if (!data || !data.annualReports) {
    throw new Error(`No income statement data available for ${symbol}`);
  }

  return {
    annualReports: data.annualReports,
    quarterlyReports: data.quarterlyReports || []
  };
}

/**
 * Get balance sheet data
 * @param {string} symbol - Stock ticker symbol
 */
export async function getBalanceSheet(symbol) {
  const params = {
    function: 'BALANCE_SHEET',
    symbol: symbol.toUpperCase()
  };

  const data = await makeAPICall(params, `balance_${symbol}`);
  
  if (!data || !data.annualReports) {
    throw new Error(`No balance sheet data available for ${symbol}`);
  }

  return {
    annualReports: data.annualReports,
    quarterlyReports: data.quarterlyReports || []
  };
}

/**
 * Get cash flow data
 * @param {string} symbol - Stock ticker symbol
 */
export async function getCashFlow(symbol) {
  const params = {
    function: 'CASH_FLOW',
    symbol: symbol.toUpperCase()
  };

  const data = await makeAPICall(params, `cashflow_${symbol}`);
  
  if (!data || !data.annualReports) {
    throw new Error(`No cash flow data available for ${symbol}`);
  }

  return {
    annualReports: data.annualReports,
    quarterlyReports: data.quarterlyReports || []
  };
}

/**
 * Get sector performance data
 */
export async function getSectorPerformance() {
  const params = {
    function: 'SECTOR'
  };

  const data = await makeAPICall(params, 'sector_performance');
  
  if (!data) {
    throw new Error('No sector performance data available');
  }

  // Parse sector data
  const sectors = [];
  const now = new Date().toISOString().split('T')[0];
  
  for (const [sectorName, performance] of Object.entries(data)) {
    if (typeof performance === 'string' && performance.includes('%')) {
      const change = parseFloat(performance.replace('%', ''));
      sectors.push({
        name: sectorName.replace('Real Time Performance: ', ''),
        performance: change,
        lastUpdated: data['Meta Data']?.['Last Refreshed'] || now
      });
    }
  }

  return sectors;
}

/**
 * Search for stocks by keyword
 * @param {string} keywords - Search keywords
 */
export async function searchStocks(keywords) {
  const params = {
    function: 'SYMBOL_SEARCH',
    keywords: keywords
  };

  const data = await makeAPICall(params, `search_${keywords}`);
  
  if (!data || !data.bestMatches) {
    return [];
  }

  return data.bestMatches.map(match => ({
    symbol: match['1. symbol'],
    name: match['2. name'],
    type: match['3. type'],
    region: match['4. region'],
    currency: match['8. currency']
  }));
}

/**
 * Get comprehensive stock analysis combining multiple endpoints
 * @param {string} symbol - Stock ticker symbol
 */
export async function getStockAnalysis(symbol) {
  try {
    const [quote, overview, timeSeries] = await Promise.all([
      getStockQuote(symbol).catch(() => null),
      getCompanyOverview(symbol).catch(() => null),
      getTimeSeries(symbol, 'daily', 'compact').catch(() => [])
    ]);

    // Get financial statements if available
    let incomeStatement, balanceSheet, cashFlow;
    try {
      [incomeStatement, balanceSheet, cashFlow] = await Promise.all([
        getIncomeStatement(symbol),
        getBalanceSheet(symbol),
        getCashFlow(symbol)
      ]);
    } catch (error) {
      console.warn('Financial statements not available:', error.message);
    }

    // Calculate additional metrics from financial data
    const _latestAnnualReport = incomeStatement?.annualReports?.[0];
    const _latestBalanceSheet = balanceSheet?.annualReports?.[0];
    const _latestCashFlow = cashFlow?.annualReports?.[0];

    return {
      symbol,
      quote,
      overview,
      timeSeries: timeSeries.slice(-30), // Last 30 days for chart
      financials: {
        incomeStatement,
        balanceSheet,
        cashFlow
      },
      calculatedMetrics: {
        peRatio: overview?.peRatio || 0,
        eps: overview?.eps || 0,
        roe: overview?.returnOnEquity || 0,
        roa: overview?.returnOnAssets || 0,
        debtToEquity: overview?.debtToEquity || 0,
        currentRatio: overview?.currentRatio || 0,
        profitMargin: overview?.profitMargin || 0,
        operatingMargin: overview?.operatingMargin || 0,
        revenueGrowth: overview?.quarterlyRevenueGrowth || 0,
        marketCap: overview?.marketCap || 0
      }
    };
  } catch (error) {
    console.error('Error getting stock analysis:', error);
    throw error;
  }
}

/**
 * Clear the API cache
 */
export function clearCache() {
  cache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.entries()).map(([key, value]) => ({
      key,
      age: Date.now() - value.timestamp,
      cachedAt: new Date(value.timestamp).toISOString()
    }))
  };
}

export default {
  getStockQuote,
  getCompanyOverview,
  getTimeSeries,
  getIncomeStatement,
  getBalanceSheet,
  getCashFlow,
  getSectorPerformance,
  searchStocks,
  getStockAnalysis,
  clearCache,
  getCacheStats
};