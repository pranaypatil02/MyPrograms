import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import stockService from '../services/stockService';

const ComparisonTool = () => {
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [comparison, setComparison] = useState(null);

  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const compareStocks = async () => {
    if (!stock1.trim() || !stock2.trim()) return;
    
    setLoading(true);
    setError(null);
    setComparison(null);

    try {
      const result = await stockService.getStockComparison(stock1, stock2);
      
      if (result.error) {
        console.warn(`Using ${result.source} data due to: ${result.error}`);
      }

      const { stock1: s1, stock2: s2, comparison: comp } = result.data;
      
      // Transform stock data to match original component structure
      const transformedStock1 = {
        name: s1.name,
        sector: s1.sector,
        price: s1.price,
        marketCap: s1.marketCap,
        pe: s1.metrics.pe || 0,
        eps: s1.metrics.eps || 0,
        roe: s1.metrics.roe || 0,
        roa: s1.metrics.roa || 0,
        roic: s1.metrics.roic || 0,
        debtToEquity: s1.metrics.debtToEquity || 0,
        dividendYield: s1.metrics.dividendYield || 0,
        revenueGrowth: s1.metrics.revenueGrowth || 0,
        netMargin: s1.metrics.netMargin || 0,
        currentRatio: s1.metrics.currentRatio || 0,
        fcf: s1.metrics.fcf || 0
      };

      const transformedStock2 = {
        name: s2.name,
        sector: s2.sector,
        price: s2.price,
        marketCap: s2.marketCap,
        pe: s2.metrics.pe || 0,
        eps: s2.metrics.eps || 0,
        roe: s2.metrics.roe || 0,
        roa: s2.metrics.roa || 0,
        roic: s2.metrics.roic || 0,
        debtToEquity: s2.metrics.debtToEquity || 0,
        dividendYield: s2.metrics.dividendYield || 0,
        revenueGrowth: s2.metrics.revenueGrowth || 0,
        netMargin: s2.metrics.netMargin || 0,
        currentRatio: s2.metrics.currentRatio || 0,
        fcf: s2.metrics.fcf || 0
      };
      
      // Transform data for chart
      const comparisonData = [
        { metric: 'P/E Ratio', [transformedStock1.name]: transformedStock1.pe, [transformedStock2.name]: transformedStock2.pe },
        { metric: 'ROE (%)', [transformedStock1.name]: transformedStock1.roe, [transformedStock2.name]: transformedStock2.roe },
        { metric: 'ROA (%)', [transformedStock1.name]: transformedStock1.roa, [transformedStock2.name]: transformedStock2.roa },
        { metric: 'Revenue Growth (%)', [transformedStock1.name]: transformedStock1.revenueGrowth, [transformedStock2.name]: transformedStock2.revenueGrowth },
        { metric: 'Net Margin (%)', [transformedStock1.name]: transformedStock1.netMargin, [transformedStock2.name]: transformedStock2.netMargin },
        { metric: 'Dividend Yield (%)', [transformedStock1.name]: transformedStock1.dividendYield, [transformedStock2.name]: transformedStock2.dividendYield }
      ];

      setComparison({
        stock1: transformedStock1,
        stock2: transformedStock2,
        comparison: comp,
        chartData: comparisonData
      });

      // Log service status for debugging
      const status = stockService.getServiceStatus();
      console.log(`Stock comparison completed using ${result.source} data`, status);
    } catch (err) {
      console.error('Error comparing stocks:', err);
      setError(err.message || 'Failed to compare stocks. Please try again.');
      setComparison({ error: true });
    } finally {
      setLoading(false);
    }
  };

  const getWinner = (metric, val1, val2, lowerIsBetter = false) => {
    if (lowerIsBetter) {
      return val1 < val2 ? 'stock1' : val2 < val1 ? 'stock2' : 'tie';
    }
    return val1 > val2 ? 'stock1' : val2 > val1 ? 'stock2' : 'tie';
  };

  const WinnerBadge = ({ winner }) => {
    if (winner === 'tie') return <span className="text-gray-500 text-xs">Tie</span>;
    return winner === 'stock1' ? (
      <FaCheckCircle className="text-green-600" />
    ) : (
      <FaCheckCircle className="text-blue-600" />
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Stock Comparison Tool</h1>
            <p className="text-gray-600 text-lg">
              Compare two companies side by side to see which offers better value
            </p>
          </motion.div>

          {/* Input Section */}
          <div className="card mb-8">
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Stock
                </label>
                <input
                  type="text"
                  value={stock1}
                  onChange={(e) => setStock1(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
                />
              </div>

              <div className="text-center">
                <FaExchangeAlt className="text-3xl text-gray-400 mx-auto" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Second Stock
                </label>
                <input
                  type="text"
                  value={stock2}
                  onChange={(e) => setStock2(e.target.value.toUpperCase())}
                  placeholder="e.g., MSFT"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent uppercase"
                />
              </div>
            </div>

            <button
              onClick={compareStocks}
              disabled={!stock1 || !stock2}
              className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Compare Stocks
            </button>

            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Available stocks:</strong> AAPL, MSFT, GOOGL, JPM, TSLA, BAC, AMZN, JNJ</p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Comparing {stock1} vs {stock2}...</p>
              <p className="text-sm text-gray-500 mt-2">
                {stockService.isUsingRealAPI() ? 'Fetching real-time data...' : 'Using sample data...'}
              </p>
            </div>
          )}

          {/* Error from service */}
          {error && !loading && (
            <div className="card bg-red-50 border-2 border-red-300">
              <div className="flex items-start gap-3 text-red-800">
                <FaExclamationCircle className="text-2xl mt-1" />
                <div>
                  <h3 className="font-semibold">Comparison Error</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error from old logic */}
          {comparison && comparison.error && !error && !loading && (
            <div className="card bg-red-50 border-2 border-red-300">
              <p className="text-red-800">
                One or both stocks not found. Please check the ticker symbols and try again.
              </p>
            </div>
          )}

          {/* Comparison Results */}
          {comparison && !comparison.error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Headers */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {comparison.stock1.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{comparison.stock1.sector}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="text-xl font-bold">${comparison.stock1.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Market Cap</p>
                      <p className="text-xl font-bold">{comparison.stock1.marketCap}</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {comparison.stock2.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{comparison.stock2.sector}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="text-xl font-bold">${comparison.stock2.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Market Cap</p>
                      <p className="text-xl font-bold">{comparison.stock2.marketCap}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Comparison Chart */}
              <div className="card">
                <h3 className="subsection-title">Visual Comparison</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparison.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={comparison.stock1.name} fill="#10b981" />
                    <Bar dataKey={comparison.stock2.name} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Metrics Table */}
              <div className="card">
                <h3 className="subsection-title">Detailed Metrics Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4">Metric</th>
                        <th className="text-center py-3 px-4 bg-green-50">{comparison.stock1.name}</th>
                        <th className="text-center py-3 px-4 bg-blue-50">{comparison.stock2.name}</th>
                        <th className="text-center py-3 px-4">Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Valuation */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">P/E Ratio</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.pe}</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.pe}</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('pe', comparison.stock1.pe, comparison.stock2.pe, true)} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">EPS</td>
                        <td className="text-center py-3 px-4">${comparison.stock1.eps}</td>
                        <td className="text-center py-3 px-4">${comparison.stock2.eps}</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('eps', comparison.stock1.eps, comparison.stock2.eps)} />
                        </td>
                      </tr>

                      {/* Profitability */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">ROE</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.roe}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.roe}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('roe', comparison.stock1.roe, comparison.stock2.roe)} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">ROA</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.roa}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.roa}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('roa', comparison.stock1.roa, comparison.stock2.roa)} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">ROIC</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.roic}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.roic}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('roic', comparison.stock1.roic, comparison.stock2.roic)} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Net Margin</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.netMargin}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.netMargin}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('netMargin', comparison.stock1.netMargin, comparison.stock2.netMargin)} />
                        </td>
                      </tr>

                      {/* Growth */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Revenue Growth</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.revenueGrowth}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.revenueGrowth}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('growth', comparison.stock1.revenueGrowth, comparison.stock2.revenueGrowth)} />
                        </td>
                      </tr>

                      {/* Financial Health */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Debt-to-Equity</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.debtToEquity}</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.debtToEquity}</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('debt', comparison.stock1.debtToEquity, comparison.stock2.debtToEquity, true)} />
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Current Ratio</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.currentRatio}</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.currentRatio}</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('current', comparison.stock1.currentRatio, comparison.stock2.currentRatio)} />
                        </td>
                      </tr>

                      {/* Returns */}
                      <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Dividend Yield</td>
                        <td className="text-center py-3 px-4">{comparison.stock1.dividendYield}%</td>
                        <td className="text-center py-3 px-4">{comparison.stock2.dividendYield}%</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('dividend', comparison.stock1.dividendYield, comparison.stock2.dividendYield)} />
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">Free Cash Flow ($B)</td>
                        <td className="text-center py-3 px-4">${comparison.stock1.fcf}</td>
                        <td className="text-center py-3 px-4">${comparison.stock2.fcf}</td>
                        <td className="text-center py-3 px-4">
                          <WinnerBadge winner={getWinner('fcf', comparison.stock1.fcf, comparison.stock2.fcf)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="card bg-gradient-to-r from-purple-50 to-purple-100">
                <h3 className="subsection-title">Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">{comparison.stock1.name} Advantages:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {comparison.stock1.roe > comparison.stock2.roe && <li>• Higher ROE (better shareholder returns)</li>}
                      {comparison.stock1.roa > comparison.stock2.roa && <li>• Higher ROA (better asset efficiency)</li>}
                      {comparison.stock1.revenueGrowth > comparison.stock2.revenueGrowth && <li>• Faster revenue growth</li>}
                      {comparison.stock1.netMargin > comparison.stock2.netMargin && <li>• Higher profit margins</li>}
                      {comparison.stock1.pe < comparison.stock2.pe && <li>• Lower valuation (better value)</li>}
                      {comparison.stock1.dividendYield > comparison.stock2.dividendYield && <li>• Higher dividend yield</li>}
                      {comparison.stock1.debtToEquity < comparison.stock2.debtToEquity && <li>• Lower debt levels</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">{comparison.stock2.name} Advantages:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {comparison.stock2.roe > comparison.stock1.roe && <li>• Higher ROE (better shareholder returns)</li>}
                      {comparison.stock2.roa > comparison.stock1.roa && <li>• Higher ROA (better asset efficiency)</li>}
                      {comparison.stock2.revenueGrowth > comparison.stock1.revenueGrowth && <li>• Faster revenue growth</li>}
                      {comparison.stock2.netMargin > comparison.stock1.netMargin && <li>• Higher profit margins</li>}
                      {comparison.stock2.pe < comparison.stock1.pe && <li>• Lower valuation (better value)</li>}
                      {comparison.stock2.dividendYield > comparison.stock1.dividendYield && <li>• Higher dividend yield</li>}
                      {comparison.stock2.debtToEquity < comparison.stock1.debtToEquity && <li>• Lower debt levels</li>}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic mt-4">
                  Remember: No single metric tells the whole story. Consider the complete picture including industry context, growth prospects, competitive advantages, and your investment goals.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;
