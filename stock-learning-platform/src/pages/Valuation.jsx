import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Valuation = () => {
  const [activeTool, setActiveTool] = useState('pe');

  // P/E Ratio Calculator State
  const [peStockPrice, setPeStockPrice] = useState(150);
  const [peEarnings, setPeEarnings] = useState(10);
  const [peSectorAvg, setPeSectorAvg] = useState(20);

  // DCF Calculator State
  const [currentCashFlow, setCurrentCashFlow] = useState(100);
  const [growthRate, setGrowthRate] = useState(5);
  const [discountRate, setDiscountRate] = useState(10);
  const [terminalGrowth, setTerminalGrowth] = useState(2);

  // ROE/ROA/ROIC State
  const [netIncome, setNetIncome] = useState(50);
  const [totalAssets, setTotalAssets] = useState(500);
  const [shareholderEquity, setShareholderEquity] = useState(300);
  const [investedCapital, setInvestedCapital] = useState(400);

  // Calculate P/E Ratio
  const peRatio = (parseFloat(peStockPrice) / parseFloat(peEarnings)).toFixed(2);
  const peStatus = peRatio < peSectorAvg * 0.8 ? 'undervalued' :
    peRatio > peSectorAvg * 1.2 ? 'overvalued' : 'fair';

  // Calculate DCF
  const calculateDCF = () => {
    let presentValue = 0;
    let cashFlow = currentCashFlow;

    // 5-year projection
    for (let year = 1; year <= 5; year++) {
      cashFlow = cashFlow * (1 + growthRate / 100);
      presentValue += cashFlow / Math.pow(1 + discountRate / 100, year);
    }

    // Terminal value
    const terminalValue = (cashFlow * (1 + terminalGrowth / 100)) / ((discountRate - terminalGrowth) / 100);
    const terminalPV = terminalValue / Math.pow(1 + discountRate / 100, 5);

    return (presentValue + terminalPV).toFixed(2);
  };

  const dcfValue = calculateDCF();

  // Calculate Returns
  const roe = ((netIncome / shareholderEquity) * 100).toFixed(2);
  const roa = ((netIncome / totalAssets) * 100).toFixed(2);
  const roic = ((netIncome / investedCapital) * 100).toFixed(2);

  // Sector benchmarks data
  const sectorData = [
    { sector: 'Technology', PE: 28, ROE: 18, ROA: 10 },
    { sector: 'Finance', PE: 12, ROE: 12, ROA: 1.2 },
    { sector: 'Healthcare', PE: 22, ROE: 15, ROA: 8 },
    { sector: 'Consumer', PE: 18, ROE: 14, ROA: 7 },
    { sector: 'Energy', PE: 15, ROE: 10, ROA: 5 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Stock Valuation Tools</h1>
            <p className="text-gray-600 text-lg">
              Interactive calculators to determine if a stock is undervalued or overvalued
            </p>
          </motion.div>

          {/* Tool Selector */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveTool('pe')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTool === 'pe'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              P/E Ratio Visualizer
            </button>
            <button
              onClick={() => setActiveTool('dcf')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTool === 'dcf'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              DCF Calculator
            </button>
            <button
              onClick={() => setActiveTool('returns')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTool === 'returns'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              ROE / ROA / ROIC
            </button>
          </div>

          {/* P/E Ratio Tool */}
          {activeTool === 'pe' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="subsection-title">P/E Ratio Visualizer</h2>
                <p className="text-gray-600 mb-6">
                  The Price-to-Earnings ratio compares a company&apos;s stock price to its earnings per share.
                  Lower P/E ratios may indicate undervaluation.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Price ($)
                      </label>
                      <input
                        type="number"
                        value={peStockPrice}
                        onChange={(e) => setPeStockPrice(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Earnings Per Share ($)
                      </label>
                      <input
                        type="number"
                        value={peEarnings}
                        onChange={(e) => setPeEarnings(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sector Average P/E
                      </label>
                      <input
                        type="number"
                        value={peSectorAvg}
                        onChange={(e) => setPeSectorAvg(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Valuation Result</h3>
                    <div className="bg-white rounded-lg p-6 mb-4">
                      <div className="text-5xl font-bold text-center mb-2"
                        style={{
                          color: peStatus === 'undervalued' ? '#10b981' :
                            peStatus === 'overvalued' ? '#ef4444' : '#f59e0b'
                        }}>
                        {peRatio}
                      </div>
                      <p className="text-center text-gray-600">P/E Ratio</p>
                    </div>

                    <div className={`p-4 rounded-lg flex items-center gap-3 ${peStatus === 'undervalued' ? 'bg-green-100 border border-green-300' :
                      peStatus === 'overvalued' ? 'bg-red-100 border border-red-300' :
                        'bg-yellow-100 border border-yellow-300'
                      }`}>
                      {peStatus === 'undervalued' ? <FaCheckCircle className="text-green-600 text-2xl" /> :
                        peStatus === 'overvalued' ? <FaExclamationTriangle className="text-red-600 text-2xl" /> :
                          <FaChartLine className="text-yellow-600 text-2xl" />}
                      <div>
                        <p className="font-semibold capitalize">{peStatus}</p>
                        <p className="text-sm">
                          {peStatus === 'undervalued' && 'Stock may be a buying opportunity'}
                          {peStatus === 'overvalued' && 'Stock may be overpriced'}
                          Understanding a company&apos;s true worth is the key to successful investing
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-700">
                      <p><strong>Sector Average:</strong> {peSectorAvg}</p>
                      <p><strong>Difference:</strong> {((peRatio / peSectorAvg - 1) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Sector Comparison Chart */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Sector P/E Benchmarks</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sector" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="PE" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* DCF Calculator */}
          {activeTool === 'dcf' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="subsection-title">DCF (Discounted Cash Flow) Calculator</h2>
                <p className="text-gray-600 mb-6">
                  DCF estimates a company&apos;s fair value by projecting future cash flows and discounting them to present value.
                  This is a simplified version for educational purposes.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Free Cash Flow ($M)
                      </label>
                      <input
                        type="number"
                        value={currentCashFlow}
                        onChange={(e) => setCurrentCashFlow(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Rate (%)
                      </label>
                      <input
                        type="number"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Terminal Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        value={terminalGrowth}
                        onChange={(e) => setTerminalGrowth(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Estimated Fair Value</h3>
                    <div className="bg-white rounded-lg p-6 mb-4">
                      <div className="text-5xl font-bold text-center mb-2 text-green-600">
                        ${dcfValue}M
                      </div>
                      <p className="text-center text-gray-600">Present Value</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>How it works:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>Projects cash flows for 5 years</li>
                        <li>Calculates terminal value</li>
                        <li>Discounts all values to present</li>
                        <li>Sums to get fair enterprise value</li>
                      </ul>
                    </div>

                    <div className="mt-4 text-xs text-gray-600">
                      Note: This is a simplified model. Real DCF analysis requires detailed financial modeling.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ROE/ROA/ROIC Tool */}
          {activeTool === 'returns' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="subsection-title">ROE / ROA / ROIC Explorer</h2>
                <p className="text-gray-600 mb-6">
                  These metrics measure how efficiently a company uses its resources to generate profit.
                  Higher percentages generally indicate better performance.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Net Income ($M)
                      </label>
                      <input
                        type="number"
                        value={netIncome}
                        onChange={(e) => setNetIncome(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Assets ($M)
                      </label>
                      <input
                        type="number"
                        value={totalAssets}
                        onChange={(e) => setTotalAssets(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shareholder Equity ($M)
                      </label>
                      <input
                        type="number"
                        value={shareholderEquity}
                        onChange={(e) => setShareholderEquity(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invested Capital ($M)
                      </label>
                      <input
                        type="number"
                        value={investedCapital}
                        onChange={(e) => setInvestedCapital(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">ROE (Return on Equity)</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{roe}%</div>
                      <p className="text-sm text-gray-600">
                        Net Income ÷ Shareholder Equity
                      </p>
                      <div className={`mt-2 text-xs font-semibold ${roe > 15 ? 'text-green-600' : roe > 10 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {roe > 15 ? '✓ Excellent' : roe > 10 ? '→ Good' : '⚠ Below Average'}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">ROA (Return on Assets)</h3>
                      <div className="text-4xl font-bold text-green-600 mb-2">{roa}%</div>
                      <p className="text-sm text-gray-600">
                        Net Income ÷ Total Assets
                      </p>
                      <div className={`mt-2 text-xs font-semibold ${roa > 8 ? 'text-green-600' : roa > 5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {roa > 8 ? '✓ Excellent' : roa > 5 ? '→ Good' : '⚠ Below Average'}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">ROIC (Return on Invested Capital)</h3>
                      <div className="text-4xl font-bold text-purple-600 mb-2">{roic}%</div>
                      <p className="text-sm text-gray-600">
                        Net Income ÷ Invested Capital
                      </p>
                      <div className={`mt-2 text-xs font-semibold ${roic > 12 ? 'text-green-600' : roic > 8 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {roic > 12 ? '✓ Excellent' : roic > 8 ? '→ Good' : '⚠ Below Average'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sector Comparison */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Sector Return Benchmarks</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sectorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sector" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ROE" fill="#3b82f6" />
                      <Bar dataKey="ROA" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Valuation;
