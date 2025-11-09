import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonTool = () => {
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [comparison, setComparison] = useState(null);

  // Sample stock database (same as Portfolio Simulator)
  const stockDatabase = {
    'AAPL': {
      name: 'Apple',
      sector: 'Technology',
      price: 178.50,
      marketCap: '2.8T',
      pe: 29.5,
      eps: 6.05,
      roe: 147.5,
      roa: 27.9,
      roic: 52.3,
      debtToEquity: 1.97,
      dividendYield: 0.5,
      revenueGrowth: 7.8,
      netMargin: 26.3,
      currentRatio: 0.98,
      fcf: 99.8
    },
    'MSFT': {
      name: 'Microsoft',
      sector: 'Technology',
      price: 378.91,
      marketCap: '2.8T',
      pe: 35.2,
      eps: 10.76,
      roe: 41.7,
      roa: 17.2,
      roic: 28.9,
      debtToEquity: 0.47,
      dividendYield: 0.8,
      revenueGrowth: 12.4,
      netMargin: 36.7,
      currentRatio: 1.77,
      fcf: 73.5
    },
    'GOOGL': {
      name: 'Google',
      sector: 'Technology',
      price: 142.35,
      marketCap: '1.8T',
      pe: 26.8,
      eps: 5.31,
      roe: 29.2,
      roa: 18.7,
      roic: 24.1,
      debtToEquity: 0.11,
      dividendYield: 0.0,
      revenueGrowth: 8.6,
      netMargin: 23.5,
      currentRatio: 2.93,
      fcf: 69.5
    },
    'JPM': {
      name: 'JPMorgan',
      sector: 'Finance',
      price: 198.45,
      marketCap: '580B',
      pe: 11.2,
      eps: 17.72,
      roe: 17.3,
      roa: 1.3,
      roic: 3.8,
      debtToEquity: 1.45,
      dividendYield: 2.4,
      revenueGrowth: 22.3,
      netMargin: 29.1,
      currentRatio: 0.92,
      fcf: 48.2
    },
    'TSLA': {
      name: 'Tesla',
      sector: 'Consumer',
      price: 248.50,
      marketCap: '790B',
      pe: 68.5,
      eps: 3.63,
      roe: 28.5,
      roa: 11.2,
      roic: 16.8,
      debtToEquity: 0.17,
      dividendYield: 0.0,
      revenueGrowth: 51.4,
      netMargin: 13.1,
      currentRatio: 1.73,
      fcf: 4.2
    },
    'BAC': {
      name: 'Bank of America',
      sector: 'Finance',
      price: 34.82,
      marketCap: '275B',
      pe: 10.8,
      eps: 3.22,
      roe: 11.2,
      roa: 1.0,
      roic: 3.2,
      debtToEquity: 1.22,
      dividendYield: 2.8,
      revenueGrowth: 5.4,
      netMargin: 25.8,
      currentRatio: 0.88,
      fcf: 28.5
    },
    'AMZN': {
      name: 'Amazon',
      sector: 'Consumer',
      price: 178.25,
      marketCap: '1.8T',
      pe: 72.3,
      eps: 2.47,
      roe: 21.3,
      roa: 6.8,
      roic: 11.2,
      debtToEquity: 0.58,
      dividendYield: 0.0,
      revenueGrowth: 9.4,
      netMargin: 6.3,
      currentRatio: 1.02,
      fcf: 21.4
    },
    'JNJ': {
      name: 'Johnson & Johnson',
      sector: 'Healthcare',
      price: 159.82,
      marketCap: '395B',
      pe: 24.5,
      eps: 6.52,
      roe: 24.1,
      roa: 9.8,
      roic: 14.2,
      debtToEquity: 0.52,
      dividendYield: 3.0,
      revenueGrowth: 1.3,
      netMargin: 16.2,
      currentRatio: 1.12,
      fcf: 18.5
    }
  };

  const compareStocks = () => {
    const s1 = stockDatabase[stock1.toUpperCase()];
    const s2 = stockDatabase[stock2.toUpperCase()];

    if (s1 && s2) {
      const comparisonData = [
        { metric: 'P/E Ratio', [s1.name]: s1.pe, [s2.name]: s2.pe },
        { metric: 'ROE (%)', [s1.name]: s1.roe, [s2.name]: s2.roe },
        { metric: 'ROA (%)', [s1.name]: s1.roa, [s2.name]: s2.roa },
        { metric: 'Revenue Growth (%)', [s1.name]: s1.revenueGrowth, [s2.name]: s2.revenueGrowth },
        { metric: 'Net Margin (%)', [s1.name]: s1.netMargin, [s2.name]: s2.netMargin },
        { metric: 'Dividend Yield (%)', [s1.name]: s1.dividendYield, [s2.name]: s2.dividendYield }
      ];

      setComparison({
        stock1: s1,
        stock2: s2,
        chartData: comparisonData
      });
    } else {
      setComparison({ error: true });
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

          {/* Error */}
          {comparison && comparison.error && (
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
