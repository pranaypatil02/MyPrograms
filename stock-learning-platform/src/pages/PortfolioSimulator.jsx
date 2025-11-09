import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const PortfolioSimulator = () => {
  const [ticker, setTicker] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample stock data (in real app, would fetch from API)
  const stockDatabase = {
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
        'Extremely high valuation (P/E 68)',
        'Increasing competition (traditional OEMs)',
        'Elon Musk execution risk',
        'Margins under pressure',
        'Production/delivery challenges'
      ]
    }
  };

  const analyzeStock = () => {
    setLoading(true);

    setTimeout(() => {
      const upperTicker = ticker.toUpperCase();
      if (stockDatabase[upperTicker]) {
        setAnalysis(stockDatabase[upperTicker]);
      } else {
        setAnalysis({ notFound: true });
      }
      setLoading(false);
    }, 1000);
  };

  const getValuationStatus = (stock) => {
    if (!stock || stock.notFound) return null;

    const peVsSector = ((stock.metrics.pe / stock.sectorAvg.pe - 1) * 100).toFixed(1);
    const roe = stock.metrics.roe;
    const margin = stock.metrics.netMargin;

    let status = 'fair';
    if (stock.metrics.pe < stock.sectorAvg.pe * 0.85 && roe > 15) {
      status = 'undervalued';
    } else if (stock.metrics.pe > stock.sectorAvg.pe * 1.3) {
      status = 'overvalued';
    }

    return { status, peVsSector, roe, margin };
  };

  const radarData = analysis && !analysis.notFound ? [
    { metric: 'Profitability', value: Math.min(analysis.metrics.netMargin / 40 * 100, 100) },
    { metric: 'Growth', value: Math.min(analysis.metrics.revenueGrowth / 50 * 100, 100) },
    { metric: 'Efficiency', value: Math.min(analysis.metrics.roe / 150 * 100, 100) },
    { metric: 'Liquidity', value: Math.min(analysis.metrics.currentRatio / 3 * 100, 100) },
    { metric: 'Value', value: Math.max(100 - (analysis.metrics.pe / 80 * 100), 0) }
  ] : [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Portfolio Simulator</h1>
            <p className="text-gray-600 text-lg">
              Enter a stock ticker to see simplified valuation analysis
            </p>
          </motion.div>

          {/* Search */}
          <div className="card mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
                placeholder="Enter ticker symbol (e.g., AAPL, MSFT, GOOGL, JPM, TSLA)"
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={analyzeStock}
                disabled={!ticker || loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FaSearch />
                Analyze
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Try these tickers:</strong> AAPL (Apple), MSFT (Microsoft), GOOGL (Google), JPM (JPMorgan), TSLA (Tesla)</p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Analyzing {ticker}...</p>
            </div>
          )}

          {/* Not Found */}
          {analysis && analysis.notFound && (
            <div className="card bg-red-50 border-2 border-red-300">
              <div className="flex items-center gap-3 text-red-800">
                <FaTimes className="text-2xl" />
                <div>
                  <h3 className="font-semibold">Stock Not Found</h3>
                  <p className="text-sm">
                    "{ticker}" is not in our database. Try AAPL, MSFT, GOOGL, JPM, or TSLA.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && !analysis.notFound && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{analysis.name}</h2>
                    <p className="text-gray-600">{analysis.sector}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">${analysis.price}</div>
                    <p className="text-sm text-gray-600">Market Cap: {analysis.marketCap}</p>
                  </div>
                </div>

                {/* Valuation Status */}
                {(() => {
                  const val = getValuationStatus(analysis);
                  return (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      val.status === 'undervalued' ? 'bg-green-100 border-2 border-green-400' :
                      val.status === 'overvalued' ? 'bg-red-100 border-2 border-red-400' :
                      'bg-yellow-100 border-2 border-yellow-400'
                    }`}>
                      {val.status === 'undervalued' ? <FaCheckCircle className="text-green-600 text-2xl" /> :
                       val.status === 'overvalued' ? <FaExclamationTriangle className="text-red-600 text-2xl" /> :
                       <FaExclamationTriangle className="text-yellow-600 text-2xl" />}
                      <div>
                        <p className="font-bold capitalize text-lg">{val.status}</p>
                        <p className="text-sm">
                          P/E is {val.peVsSector > 0 ? '+' : ''}{val.peVsSector}% vs sector average
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Price Chart */}
              <div className="card">
                <h3 className="subsection-title">6-Month Price Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analysis.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card">
                  <h3 className="subsection-title">Valuation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">P/E Ratio</span>
                      <span className="font-bold">{analysis.metrics.pe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EPS</span>
                      <span className="font-bold">${analysis.metrics.eps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dividend Yield</span>
                      <span className="font-bold">{analysis.metrics.dividendYield}%</span>
                    </div>
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Sector Avg P/E: {analysis.sectorAvg.pe}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="subsection-title">Profitability</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Margin</span>
                      <span className="font-bold">{analysis.metrics.grossMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Margin</span>
                      <span className="font-bold">{analysis.metrics.operatingMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Margin</span>
                      <span className="font-bold">{analysis.metrics.netMargin}%</span>
                    </div>
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Higher margins = more profitable
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="subsection-title">Efficiency</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROE</span>
                      <span className={`font-bold ${analysis.metrics.roe > 15 ? 'text-green-600' : 'text-gray-900'}`}>
                        {analysis.metrics.roe}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROA</span>
                      <span className={`font-bold ${analysis.metrics.roa > 8 ? 'text-green-600' : 'text-gray-900'}`}>
                        {analysis.metrics.roa}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROIC</span>
                      <span className={`font-bold ${analysis.metrics.roic > 12 ? 'text-green-600' : 'text-gray-900'}`}>
                        {analysis.metrics.roic}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Measures capital efficiency
                    </div>
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="card">
                <h3 className="subsection-title">Overall Health Score</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Strengths & Risks */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-green-50 border-2 border-green-300">
                  <h3 className="subsection-title text-green-900">Key Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card bg-red-50 border-2 border-red-300">
                  <h3 className="subsection-title text-red-900">Key Risks</h3>
                  <ul className="space-y-2">
                    {analysis.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <FaExclamationTriangle className="text-red-600 mt-1 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Line */}
              <div className="card bg-gradient-to-r from-blue-50 to-blue-100">
                <h3 className="subsection-title">The Bottom Line</h3>
                <p className="text-gray-700 mb-4">
                  {analysis.name} is currently trading at a P/E ratio of {analysis.metrics.pe}, which is{' '}
                  {getValuationStatus(analysis).peVsSector > 0 ? 'above' : 'below'} the sector average of{' '}
                  {analysis.sectorAvg.pe}. The company shows {analysis.metrics.roe > 15 ? 'strong' : 'moderate'}{' '}
                  profitability with ROE of {analysis.metrics.roe}% and net margins of {analysis.metrics.netMargin}%.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Note: This is a simplified educational analysis. Real investment decisions require more comprehensive research including qualitative factors, industry trends, and your personal financial situation.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSimulator;
