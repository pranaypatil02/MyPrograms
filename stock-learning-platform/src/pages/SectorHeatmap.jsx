import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

const SectorHeatmap = () => {
  const [selectedMetric, setSelectedMetric] = useState('pe');

  const metrics = [
    { id: 'pe', name: 'P/E Ratio', description: 'Lower = cheaper valuation', lowerIsBetter: true },
    { id: 'roe', name: 'ROE (%)', description: 'Higher = better returns', lowerIsBetter: false },
    { id: 'growth', name: 'Revenue Growth (%)', description: 'Higher = faster growing', lowerIsBetter: false },
    { id: 'margin', name: 'Net Margin (%)', description: 'Higher = more profitable', lowerIsBetter: false },
    { id: 'debt', name: 'Debt-to-Equity', description: 'Lower = less leveraged', lowerIsBetter: true },
    { id: 'dividend', name: 'Dividend Yield (%)', description: 'Higher = more income', lowerIsBetter: false }
  ];

  const sectorData = {
    'Technology': {
      name: 'Technology',
      icon: '💻',
      pe: 28.5,
      roe: 18.2,
      growth: 12.5,
      margin: 24.3,
      debt: 0.52,
      dividend: 1.2,
      companies: ['AAPL', 'MSFT', 'GOOGL', 'NVDA']
    },
    'Finance': {
      name: 'Finance',
      icon: '🏦',
      pe: 11.8,
      roe: 13.5,
      growth: 8.2,
      margin: 27.8,
      debt: 1.38,
      dividend: 2.8,
      companies: ['JPM', 'BAC', 'WFC', 'GS']
    },
    'Healthcare': {
      name: 'Healthcare',
      icon: '⚕️',
      pe: 21.3,
      roe: 15.7,
      growth: 6.8,
      margin: 16.5,
      debt: 0.68,
      dividend: 2.5,
      companies: ['JNJ', 'UNH', 'PFE', 'ABT']
    },
    'Consumer Discretionary': {
      name: 'Consumer Discretionary',
      icon: '🛍️',
      pe: 24.7,
      roe: 14.2,
      growth: 15.3,
      margin: 8.7,
      debt: 0.82,
      dividend: 1.5,
      companies: ['AMZN', 'TSLA', 'HD', 'NKE']
    },
    'Consumer Staples': {
      name: 'Consumer Staples',
      icon: '🛒',
      pe: 19.5,
      roe: 18.9,
      growth: 4.2,
      margin: 7.3,
      debt: 1.15,
      dividend: 2.9,
      companies: ['PG', 'KO', 'PEP', 'WMT']
    },
    'Energy': {
      name: 'Energy',
      icon: '⚡',
      pe: 14.2,
      roe: 11.3,
      growth: 18.7,
      margin: 9.8,
      debt: 1.52,
      dividend: 3.8,
      companies: ['XOM', 'CVX', 'COP', 'SLB']
    },
    'Industrials': {
      name: 'Industrials',
      icon: '🏭',
      pe: 17.8,
      roe: 12.8,
      growth: 7.5,
      margin: 8.9,
      debt: 0.95,
      dividend: 2.1,
      companies: ['BA', 'CAT', 'GE', 'HON']
    },
    'Materials': {
      name: 'Materials',
      icon: '⛏️',
      pe: 16.3,
      roe: 10.5,
      growth: 9.8,
      margin: 11.2,
      debt: 0.72,
      dividend: 2.4,
      companies: ['LIN', 'APD', 'ECL', 'SHW']
    },
    'Real Estate': {
      name: 'Real Estate',
      icon: '🏢',
      pe: 35.2,
      roe: 8.7,
      growth: 5.3,
      margin: 22.5,
      debt: 2.15,
      dividend: 3.5,
      companies: ['AMT', 'PLD', 'CCI', 'SPG']
    },
    'Utilities': {
      name: 'Utilities',
      icon: '🔌',
      pe: 18.9,
      roe: 9.8,
      growth: 3.2,
      margin: 12.7,
      debt: 1.82,
      dividend: 3.2,
      companies: ['NEE', 'DUK', 'SO', 'D']
    },
    'Communication': {
      name: 'Communication',
      icon: '📡',
      pe: 16.7,
      roe: 11.2,
      growth: 5.8,
      margin: 14.3,
      debt: 1.28,
      dividend: 1.8,
      companies: ['META', 'DIS', 'NFLX', 'T']
    }
  };

  const sectors = Object.values(sectorData);
  const currentMetric = metrics.find(m => m.id === selectedMetric);

  // Get min and max values for normalization
  const values = sectors.map(s => s[selectedMetric]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getColor = (value, lowerIsBetter) => {
    // Normalize to 0-1
    const normalized = (value - minValue) / (maxValue - minValue);

    // If lower is better, invert the scale
    const score = lowerIsBetter ? 1 - normalized : normalized;

    // Color scale from red (bad) to yellow (ok) to green (good)
    if (score < 0.33) {
      return { bg: 'rgb(254, 226, 226)', border: 'rgb(248, 113, 113)', text: 'rgb(153, 27, 27)' }; // red
    } else if (score < 0.66) {
      return { bg: 'rgb(254, 249, 195)', border: 'rgb(251, 191, 36)', text: 'rgb(161, 98, 7)' }; // yellow
    } else {
      return { bg: 'rgb(220, 252, 231)', border: 'rgb(74, 222, 128)', text: 'rgb(21, 128, 61)' }; // green
    }
  };

  const getPerformanceLabel = (value, lowerIsBetter) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    const score = lowerIsBetter ? 1 - normalized : normalized;

    if (score >= 0.8) return '🔥 Excellent';
    if (score >= 0.6) return '✓ Good';
    if (score >= 0.4) return '→ Average';
    if (score >= 0.2) return '⚠ Below Avg';
    return '❌ Poor';
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
            <h1 className="section-title text-4xl">Sector Heatmap</h1>
            <p className="text-gray-600 text-lg">
              Visual comparison of sector performance across key metrics
            </p>
          </motion.div>

          {/* Metric Selector */}
          <div className="card mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Select Metric to Compare:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {metrics.map(metric => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMetric === metric.id
                      ? 'bg-primary text-white border-primary shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                >
                  <div className="font-semibold mb-1">{metric.name}</div>
                  <div className={`text-xs ${selectedMetric === metric.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {metric.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="card mb-8 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" />
                <span className="font-semibold">Color Guide:</span>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border-2 border-green-400 rounded"></div>
                  <span>Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-400 rounded"></div>
                  <span>Average</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
                  <span>Below Avg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <motion.div
            key={selectedMetric}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          >
            {sectors.map((sector, index) => {
              const value = sector[selectedMetric];
              const colors = getColor(value, currentMetric.lowerIsBetter);
              const performanceLabel = getPerformanceLabel(value, currentMetric.lowerIsBetter);

              return (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl p-6 border-4 hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border
                  }}
                >
                  <div className="text-4xl mb-3 text-center">{sector.icon}</div>
                  <h3 className="font-bold text-center mb-2" style={{ color: colors.text }}>
                    {sector.name}
                  </h3>
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold" style={{ color: colors.text }}>
                      {value.toFixed(1)}
                      {selectedMetric === 'pe' ? '' : '%'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{currentMetric.name}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white">
                      {performanceLabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Detailed Table */}
          <div className="card">
            <h3 className="subsection-title">Complete Sector Data</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4">Sector</th>
                    <th className="text-center py-3 px-4">P/E</th>
                    <th className="text-center py-3 px-4">ROE %</th>
                    <th className="text-center py-3 px-4">Growth %</th>
                    <th className="text-center py-3 px-4">Margin %</th>
                    <th className="text-center py-3 px-4">Debt/Eq</th>
                    <th className="text-center py-3 px-4">Div %</th>
                    <th className="text-left py-3 px-4">Top Companies</th>
                  </tr>
                </thead>
                <tbody>
                  {sectors.map((sector, index) => (
                    <tr
                      key={sector.name}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{sector.icon}</span>
                          <span className="font-medium">{sector.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">{sector.pe}</td>
                      <td className="text-center py-3 px-4">{sector.roe}%</td>
                      <td className="text-center py-3 px-4">{sector.growth}%</td>
                      <td className="text-center py-3 px-4">{sector.margin}%</td>
                      <td className="text-center py-3 px-4">{sector.debt}</td>
                      <td className="text-center py-3 px-4">{sector.dividend}%</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {sector.companies.map(company => (
                            <span key={company} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {company}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="subsection-title">💡 Key Insights</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Technology</strong> has highest P/E (28.5) - growth premium</li>
                <li>• <strong>Finance</strong> has lowest P/E (11.8) - mature industry</li>
                <li>• <strong>Consumer Staples</strong> has highest ROE (18.9%) - stable returns</li>
                <li>• <strong>Energy</strong> has highest growth (18.7%) - commodity boom</li>
                <li>• <strong>Real Estate</strong> has highest debt (2.15) - business model requires leverage</li>
                <li>• <strong>Energy</strong> has highest dividend (3.8%) - mature industry returning cash</li>
              </ul>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="subsection-title">📊 How to Use This Tool</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>1. Select a metric</strong> at the top to compare sectors</li>
                <li><strong>2. Green tiles</strong> = best performing in that metric</li>
                <li><strong>3. Red tiles</strong> = weakest in that metric</li>
                <li><strong>4. Consider context</strong> - high debt is normal for banks but risky for tech</li>
                <li><strong>5. Diversify</strong> across sectors to reduce risk</li>
                <li><strong>6. Match sectors</strong> to your investment goals (growth vs income)</li>
              </ul>
            </div>
          </div>

          {/* Strategy Guide */}
          <div className="card mt-6 bg-gradient-to-r from-green-50 to-green-100">
            <h3 className="subsection-title">🎯 Investment Strategy by Objective</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-bold text-green-900 mb-2">Growth Focused</h4>
                <p className="text-gray-700 mb-2">Look for high growth + ROE:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Technology (12.5% growth)</li>
                  <li>✓ Consumer Disc. (15.3% growth)</li>
                  <li>✓ Energy (18.7% growth)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-2">Income Focused</h4>
                <p className="text-gray-700 mb-2">Look for high dividends:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Energy (3.8% yield)</li>
                  <li>✓ Real Estate (3.5% yield)</li>
                  <li>✓ Utilities (3.2% yield)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-2">Value Focused</h4>
                <p className="text-gray-700 mb-2">Look for low P/E + high ROE:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>✓ Finance (11.8 P/E, 13.5% ROE)</li>
                  <li>✓ Energy (14.2 P/E, 11.3% ROE)</li>
                  <li>✓ Materials (16.3 P/E, 10.5% ROE)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorHeatmap;
