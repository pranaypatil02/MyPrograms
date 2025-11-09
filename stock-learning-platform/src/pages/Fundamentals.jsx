import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaDownload, FaInfoCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Fundamentals = () => {
  const [activeModule, setActiveModule] = useState('earnings');
  const [showTooltip, setShowTooltip] = useState(null);

  const modules = {
    earnings: {
      title: 'Earnings Statements',
      description: 'Understanding how companies generate and report their income',
      terms: [
        {
          name: 'Revenue',
          definition: 'Total amount of money earned from sales before any expenses',
          example: 'Apple sold $365 billion worth of products in 2021',
          importance: 'Shows the company\'s ability to generate sales',
        },
        {
          name: 'Gross Margin',
          definition: 'Revenue minus Cost of Goods Sold (COGS), expressed as a percentage',
          example: 'If revenue is $100 and COGS is $40, gross margin is 60%',
          importance: 'Indicates how efficiently a company produces its goods',
        },
        {
          name: 'Net Income',
          definition: 'The profit remaining after all expenses, taxes, and costs are deducted',
          example: 'A company with $100M revenue and $80M total expenses has $20M net income',
          importance: 'The "bottom line" - actual profit available to shareholders',
        },
        {
          name: 'EPS (Earnings Per Share)',
          definition: 'Net income divided by number of shares outstanding',
          example: '$20M net income ÷ 10M shares = $2.00 EPS',
          importance: 'Key metric for comparing profitability across companies',
        },
      ],
      chartData: [
        { name: 'Revenue', value: 100, color: '#3b82f6' },
        { name: 'COGS', value: -40, color: '#ef4444' },
        { name: 'Operating Exp', value: -30, color: '#f59e0b' },
        { name: 'Taxes', value: -10, color: '#8b5cf6' },
        { name: 'Net Income', value: 20, color: '#10b981' },
      ],
    },
    balance: {
      title: 'Balance Sheet',
      description: 'A snapshot of what a company owns and owes at a specific point in time',
      terms: [
        {
          name: 'Assets',
          definition: 'Everything the company owns that has value',
          example: 'Cash ($50M), buildings ($100M), inventory ($30M) = $180M assets',
          importance: 'Shows resources available to generate future income',
        },
        {
          name: 'Liabilities',
          definition: 'All debts and obligations the company owes',
          example: 'Bank loans ($40M), supplier payments due ($20M) = $60M liabilities',
          importance: 'Indicates financial obligations and risk',
        },
        {
          name: 'Equity',
          definition: 'The residual value belonging to shareholders (Assets - Liabilities)',
          example: '$180M assets - $60M liabilities = $120M equity',
          importance: 'Represents the true net worth of the company',
        },
        {
          name: 'Debt-to-Equity Ratio',
          definition: 'Total debt divided by shareholder equity',
          example: '$60M debt ÷ $120M equity = 0.5 ratio',
          importance: 'Measures financial leverage and risk',
        },
      ],
      chartData: [
        { category: 'Assets', current: 100, fixed: 80, total: 180 },
        { category: 'Liabilities', current: 30, longTerm: 30, total: 60 },
        { category: 'Equity', retained: 70, shares: 50, total: 120 },
      ],
    },
    cashflow: {
      title: 'Cash Flow Statement',
      description: 'Tracks the actual movement of cash in and out of the business',
      terms: [
        {
          name: 'Operating Cash Flow',
          definition: 'Cash generated from core business operations',
          example: 'Revenue collected ($90M) - Operating expenses paid ($60M) = $30M',
          importance: 'Shows if the business can sustain itself without external funding',
        },
        {
          name: 'Investing Cash Flow',
          definition: 'Cash spent on or earned from investments and assets',
          example: 'Buying new equipment (-$15M), selling old factory (+$5M) = -$10M',
          importance: 'Indicates how much the company is investing in growth',
        },
        {
          name: 'Financing Cash Flow',
          definition: 'Cash flow from debt, equity, and dividends',
          example: 'New bank loan (+$20M), dividend payments (-$5M) = +$15M',
          importance: 'Shows how the company raises capital and rewards shareholders',
        },
        {
          name: 'Free Cash Flow',
          definition: 'Operating cash flow minus capital expenditures',
          example: '$30M operating cash flow - $10M CapEx = $20M free cash flow',
          importance: 'Cash available for growth, acquisitions, or returning to shareholders',
        },
      ],
      chartData: [
        { name: 'Operating', Q1: 30, Q2: 35, Q3: 32, Q4: 38 },
        { name: 'Investing', Q1: -10, Q2: -8, Q3: -12, Q4: -15 },
        { name: 'Financing', Q1: 5, Q2: -3, Q3: 8, Q4: -2 },
      ],
    },
  };

  const currentModule = modules[activeModule];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Learn the Fundamentals</h1>
            <p className="text-gray-600 text-lg">
              Master the three core financial statements with interactive examples
            </p>
          </motion.div>

          {/* Module Selector */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveModule('earnings')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeModule === 'earnings'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Earnings Statement
            </button>
            <button
              onClick={() => setActiveModule('balance')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeModule === 'balance'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setActiveModule('cashflow')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeModule === 'cashflow'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cash Flow
            </button>
          </div>

          {/* Module Content */}
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="card">
              <h2 className="subsection-title">{currentModule.title}</h2>
              <p className="text-gray-600 mb-6">{currentModule.description}</p>

              {/* Visual Chart */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Visual Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {activeModule === 'earnings' && (
                    <BarChart data={currentModule.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  )}
                  {activeModule === 'balance' && (
                    <BarChart data={currentModule.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#3b82f6" />
                    </BarChart>
                  )}
                  {activeModule === 'cashflow' && (
                    <BarChart data={currentModule.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Q1" fill="#3b82f6" />
                      <Bar dataKey="Q2" fill="#10b981" />
                      <Bar dataKey="Q3" fill="#f59e0b" />
                      <Bar dataKey="Q4" fill="#8b5cf6" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* Terms & Definitions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Key Concepts</h3>
                {currentModule.terms.map((term, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">{term.name}</h4>
                        <p className="text-gray-700 mb-2">{term.definition}</p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Example:</span> {term.example}
                          </p>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 p-3">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Why it matters:</span> {term.importance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Cheat Sheet */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Download {currentModule.title} Cheat Sheet
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quick reference guide with formulas and examples
                    </p>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <FaDownload />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;
