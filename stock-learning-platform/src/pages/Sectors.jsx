import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FaInfoCircle, FaChartBar, FaExchangeAlt } from 'react-icons/fa';

const Sectors = () => {
  const [selectedSector, setSelectedSector] = useState('technology');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareWith, setCompareWith] = useState('finance');

  const sectorData = {
    technology: {
      name: 'Technology',
      color: '#3b82f6',
      metrics: {
        avgPE: 28,
        avgROE: 18,
        avgROA: 10,
        avgMargin: 25,
        avgDebtEquity: 0.5,
      },
      description: 'High growth potential with premium valuations. Focus on innovation and scalability.',
      examples: ['Apple', 'Microsoft', 'Google', 'Amazon'],
      characteristics: [
        'High P/E ratios due to growth expectations',
        'Strong profit margins from software/services',
        'Lower debt levels',
        'Heavy R&D investment',
        'Winner-take-all dynamics'
      ],
      risks: [
        'Rapid technological change',
        'Regulatory scrutiny',
        'High competition',
        'Valuation bubbles'
      ]
    },
    finance: {
      name: 'Finance',
      color: '#10b981',
      metrics: {
        avgPE: 12,
        avgROE: 12,
        avgROA: 1.2,
        avgMargin: 30,
        avgDebtEquity: 8.0,
      },
      description: 'Lower valuations but steady returns. Sensitive to interest rates and economic cycles.',
      examples: ['JPMorgan', 'Bank of America', 'Goldman Sachs', 'Visa'],
      characteristics: [
        'Lower P/E ratios (stable earnings)',
        'High leverage is normal',
        'Interest rate sensitive',
        'Regulated industry',
        'Dividend-focused'
      ],
      risks: [
        'Credit risk',
        'Economic recession impact',
        'Regulatory changes',
        'Interest rate volatility'
      ]
    },
    healthcare: {
      name: 'Healthcare',
      color: '#ef4444',
      metrics: {
        avgPE: 22,
        avgROE: 15,
        avgROA: 8,
        avgMargin: 18,
        avgDebtEquity: 0.8,
      },
      description: 'Defensive sector with stable demand. Patent cliffs and R&D failures are key risks.',
      examples: ['Johnson & Johnson', 'Pfizer', 'UnitedHealth', 'Moderna'],
      characteristics: [
        'Stable demand (defensive)',
        'Long development cycles',
        'Patent protection critical',
        'Aging demographics tailwind',
        'High R&D costs'
      ],
      risks: [
        'Patent expiration',
        'Regulatory approval delays',
        'Drug pricing pressure',
        'Clinical trial failures'
      ]
    },
    consumer: {
      name: 'Consumer Goods',
      color: '#f59e0b',
      metrics: {
        avgPE: 18,
        avgROE: 14,
        avgROA: 7,
        avgMargin: 12,
        avgDebtEquity: 1.2,
      },
      description: 'Mix of defensive (staples) and cyclical (discretionary). Brand strength matters.',
      examples: ['Coca-Cola', 'Procter & Gamble', 'Nike', 'Target'],
      characteristics: [
        'Brand loyalty important',
        'Mature markets',
        'Marketing-heavy',
        'Supply chain critical',
        'Consumer sentiment impact'
      ],
      risks: [
        'Changing consumer preferences',
        'Competition from private labels',
        'Input cost inflation',
        'Economic sensitivity'
      ]
    },
    energy: {
      name: 'Energy',
      color: '#8b5cf6',
      metrics: {
        avgPE: 15,
        avgROE: 10,
        avgROA: 5,
        avgMargin: 8,
        avgDebtEquity: 1.5,
      },
      description: 'Highly cyclical and commodity-dependent. Transition to renewables ongoing.',
      examples: ['ExxonMobil', 'Chevron', 'NextEra Energy', 'Shell'],
      characteristics: [
        'Commodity price sensitive',
        'Capital intensive',
        'Geopolitical factors',
        'ESG scrutiny',
        'Energy transition underway'
      ],
      risks: [
        'Oil price volatility',
        'Climate change regulations',
        'Stranded assets',
        'Geopolitical instability'
      ]
    }
  };

  const allSectorsComparison = Object.entries(sectorData).map(([, data]) => ({
    sector: data.name,
    PE: data.metrics.avgPE,
    ROE: data.metrics.avgROE,
    ROA: data.metrics.avgROA,
    Margin: data.metrics.avgMargin,
  }));

  const currentSector = sectorData[selectedSector];
  const compareData = comparisonMode ? [
    { metric: 'P/E Ratio', [currentSector.name]: currentSector.metrics.avgPE, [sectorData[compareWith].name]: sectorData[compareWith].metrics.avgPE },
    { metric: 'ROE (%)', [currentSector.name]: currentSector.metrics.avgROE, [sectorData[compareWith].name]: sectorData[compareWith].metrics.avgROE },
    { metric: 'ROA (%)', [currentSector.name]: currentSector.metrics.avgROA, [sectorData[compareWith].name]: sectorData[compareWith].metrics.avgROA },
    { metric: 'Margin (%)', [currentSector.name]: currentSector.metrics.avgMargin, [sectorData[compareWith].name]: sectorData[compareWith].metrics.avgMargin },
  ] : null;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Sector Insights</h1>
            <p className="text-gray-600 text-lg">
              Always research heavily before attempting to time the market&apos;s rotation.
            </p>
          </motion.div>

          {/* Sector Selector */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {Object.entries(sectorData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedSector(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedSector === key
                  ? 'text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                style={{
                  backgroundColor: selectedSector === key ? data.color : undefined
                }}
              >
                {data.name}
              </button>
            ))}
          </div>

          {/* Comparison Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FaExchangeAlt />
              {comparisonMode ? 'Single View' : 'Compare Sectors'}
            </button>
          </div>

          {comparisonMode && (
            <div className="flex justify-center mb-8">
              <select
                value={compareWith}
                onChange={(e) => setCompareWith(e.target.value)}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md"
              >
                {Object.entries(sectorData)
                  .filter(([key]) => key !== selectedSector)
                  .map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
              </select>
            </div>
          )}

          {/* Sector Details */}
          <motion.div
            key={selectedSector}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="card">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentSector.color}20` }}
                >
                  <FaChartBar style={{ color: currentSector.color, fontSize: '2rem' }} />
                </div>
                <div className="flex-1">
                  <h2 className="subsection-title">{currentSector.name} Sector</h2>
                  <p className="text-gray-600">{currentSector.description}</p>
                </div>
              </div>

              {/* Metrics Display */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: currentSector.color }}>
                    {currentSector.metrics.avgPE}
                  </div>
                  <div className="text-sm text-gray-600">Avg P/E Ratio</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: currentSector.color }}>
                    {currentSector.metrics.avgROE}%
                  </div>
                  <div className="text-sm text-gray-600">Avg ROE</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: currentSector.color }}>
                    {currentSector.metrics.avgROA}%
                  </div>
                  <div className="text-sm text-gray-600">Avg ROA</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: currentSector.color }}>
                    {currentSector.metrics.avgMargin}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Margin</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold" style={{ color: currentSector.color }}>
                    {currentSector.metrics.avgDebtEquity}x
                  </div>
                  <div className="text-sm text-gray-600">Debt/Equity</div>
                </div>
              </div>

              {/* Comparison Chart */}
              {comparisonMode ? (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Side-by-Side Comparison</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={compareData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={currentSector.name} fill={currentSector.color} />
                      <Bar dataKey={sectorData[compareWith].name} fill={sectorData[compareWith].color} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">All Sectors Overview</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={allSectorsComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sector" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="PE" fill="#3b82f6" />
                      <Bar dataKey="ROE" fill="#10b981" />
                      <Bar dataKey="ROA" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Example Companies */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Leading Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentSector.examples.map((company, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${currentSector.color}20`,
                        color: currentSector.color
                      }}
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* Characteristics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-500" />
                    Key Characteristics
                  </h3>
                  <ul className="space-y-2">
                    {currentSector.characteristics.map((char, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaInfoCircle className="text-red-500" />
                    Key Risks
                  </h3>
                  <ul className="space-y-2">
                    {currentSector.risks.map((risk, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Educational Note */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Why Sectors Differ in Valuation</h3>
              <p className="text-gray-700 mb-2">
                Different sectors have different &quot;normal&quot; P/E ratios and metrics because:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Growth Expectations:</strong> Tech gets higher P/E due to faster growth potential</li>
                <li><strong>Capital Structure:</strong> Banks naturally have high debt (it&apos;s their business model)</li>
                <li><strong>Cyclicality:</strong> Energy earnings fluctuate with commodity prices</li>
                <li><strong>Margins:</strong> Software has higher margins than retail</li>
                <li><strong>Risk Profile:</strong> Defensive sectors trade at different multiples than cyclical ones</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sectors;
