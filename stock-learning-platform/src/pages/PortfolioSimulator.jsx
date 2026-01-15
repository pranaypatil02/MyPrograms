import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import stockService from '../services/stockService';

const PortfolioSimulator = () => {
  const [ticker, setTicker] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  const analyzeStock = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await stockService.getStockData(ticker);

      if (result.error) {
        console.warn(`Using ${result.source} data due to: ${result.error}`);
      }

      setAnalysis(result.data);

      // Log service status for debugging
      const status = stockService.getServiceStatus();
      console.log(`Stock analysis completed using ${result.source} data`, status);
    } catch (err) {
      console.error('Error analyzing stock:', err);
      setError(err.message || 'Failed to analyze stock. Please try again.');
      setAnalysis({ notFound: true });
    } finally {
      setLoading(false);
    }
  };

  const getValuationStatus = (stock) => {
    if (!stock || stock.notFound || !stock.metrics || !stock.sectorAvg) return null;

    const pe = stock.metrics.pe || 0;
    const sectorPE = stock.sectorAvg.pe || 15;
    const roe = stock.metrics.roe || 0;
    const margin = stock.metrics.netMargin || 0;

    const peVsSector = pe > 0 && sectorPE > 0 ? ((pe / sectorPE - 1) * 100).toFixed(1) : '0.0';

    let status = 'fair';
    if (pe < sectorPE * 0.85 && roe > 15) {
      status = 'undervalued';
    } else if (pe > sectorPE * 1.3) {
      status = 'overvalued';
    }

    return { status, peVsSector, roe, margin };
  };

  const radarData = analysis && !analysis.notFound && analysis.metrics ? [
    {
      metric: 'Profitability',
      value: Math.min(Math.max((parseFloat(analysis.metrics.netMargin) || 0) / 40 * 100, 0), 100)
    },
    {
      metric: 'Growth',
      value: Math.min(Math.max((parseFloat(analysis.metrics.revenueGrowth) || 0) / 50 * 100, 0), 100)
    },
    {
      metric: 'Efficiency',
      value: Math.min(Math.max((parseFloat(analysis.metrics.roe) || 0) / 150 * 100, 0), 100)
    },
    {
      metric: 'Liquidity',
      value: Math.min(Math.max((parseFloat(analysis.metrics.currentRatio) || 0) / 3 * 100, 0), 100)
    },
    {
      metric: 'Value',
      value: (() => {
        const pe = parseFloat(analysis.metrics.pe);
        return pe && pe > 0 ? Math.min(Math.max((50 / pe) * 100, 0), 100) : 0;
      })()
    },
    {
      metric: 'Dividends',
      value: Math.min(Math.max((parseFloat(analysis.metrics.dividendYield) || 0) / 5 * 100, 0), 100)
    }
  ] : [];

  // Debug logging
  if (analysis && !analysis.notFound && analysis.metrics) {
    console.log('Radar data values:', radarData);
    console.log('Metrics:', analysis.metrics);
    console.log('Parsed metrics:', {
      netMargin: parseFloat(analysis.metrics.netMargin),
      revenueGrowth: parseFloat(analysis.metrics.revenueGrowth),
      roe: parseFloat(analysis.metrics.roe),
      currentRatio: parseFloat(analysis.metrics.currentRatio),
      pe: parseFloat(analysis.metrics.pe),
      dividendYield: parseFloat(analysis.metrics.dividendYield)
    });
  }

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
              <p className="mt-4 text-sm text-yellow-800 bg-yellow-100 p-3 rounded border border-yellow-200">
                <span className="font-bold">Note:</span> This is a simulation using &quot;real-time&quot; data from our provider. Market conditions change rapidly.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {stockService.isUsingRealAPI() ? 'Fetching real-time data...' : 'Using sample data...'}
              </p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="card bg-red-50 border-2 border-red-300">
              <div className="flex items-start gap-3 text-red-800">
                <FaExclamationCircle className="text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Analysis Error</h3>
                  <p className="text-sm">{error}</p>
                  <p className="text-xs mt-2">
                    Try: AAPL, MSFT, GOOGL, AMZN, TSLA, JPM, JNJ, or BAC
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Not Found */}
          {analysis && analysis.notFound && !error && !loading && (
            <div className="card bg-red-50 border-2 border-red-300">
              <div className="flex items-center gap-3 text-red-800">
                <FaTimes className="text-2xl" />
                <div>
                  <h3 className="font-semibold">Stock Not Found</h3>
                  <p className="text-sm">
                    &quot;{ticker}&quot; is not in our database. Try AAPL, MSFT, GOOGL, JPM, or TSLA.
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
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${val.status === 'undervalued' ? 'bg-green-100 border-2 border-green-400' :
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
                {radarData.length > 0 && radarData.some(item => item.value > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>Health score data not available for this stock.</p>
                    <p className="text-sm mt-2">Check console for detailed metrics.</p>
                  </div>
                )}
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
