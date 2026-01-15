import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaEdit, FaChartBar, FaCalculator, FaChevronRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IncomeStatementTutor = () => {
    // ALL hooks must be at the top level
    const [mode, setMode] = useState('overview');

    // Builder mode state
    const [revenue, setRevenue] = useState(1000000);
    const [cogs, setCogs] = useState(400000);
    const [opex, setOpex] = useState(300000);
    const [tax, setTax] = useState(60000);

    // Valuation mode state
    const [operatingIncome, setOperatingIncome] = useState(3200000);
    const [taxRate, setTaxRate] = useState(21);
    const [dna, setDNA] = useState(500000);
    const [capex, setCapex] = useState(400000);
    const [wcChange, setWCChange] = useState(150000);

    // Static sample statement data
    const SAMPLE_STATEMENT = {
        id: '1',
        periodLabel: 'FY 2024',
        lineItems: [
            { id: '1', category: 'REVENUE', label: 'Total Revenue', amount: 12000000, displayOrder: 1, isSubtotal: false },
            { id: '2', category: 'COGS', label: 'Cost of Goods Sold', amount: 4800000, displayOrder: 2, isSubtotal: false },
            { id: '3', category: 'GROSS_PROFIT', label: 'Gross Profit', amount: 7200000, displayOrder: 3, isSubtotal: true },
            { id: '4', category: 'OPERATING_EXPENSE', label: 'Operating Expenses', amount: 4000000, displayOrder: 4, isSubtotal: false },
            { id: '5', category: 'OPERATING_INCOME', label: 'Operating Income', amount: 3200000, displayOrder: 5, isSubtotal: true },
            { id: '6', category: 'TAX', label: 'Income Tax', amount: 695700, displayOrder: 6, isSubtotal: false },
            { id: '7', category: 'NET_INCOME', label: 'Net Income', amount: 2504300, displayOrder: 7, isSubtotal: true },
        ]
    };

    // Educational content for Learn mode
    const EDUCATIONAL_CONTENT = {
        REVENUE: {
            definition: "Revenue represents the total amount of money earned from sales of goods or services before any expenses are deducted. Also called 'Sales' or 'Top Line'.",
            formula: "Sum of all sales transactions during the period",
            example: "If a software company sold $10 million worth of subscriptions, their revenue is $10 million."
        },
        COGS: {
            definition: "Cost of Goods Sold (COGS) includes all direct costs of producing the goods or services sold.",
            formula: "Direct materials + Direct labor + Manufacturing overhead",
            example: "If it costs $4 million to manufacture the products sold, COGS = $4 million."
        },
        GROSS_PROFIT: {
            definition: "Gross Profit shows how much money is left after subtracting the direct costs of production.",
            formula: "Gross Profit = Revenue - Cost of Goods Sold",
            example: "Revenue of $10M minus COGS of $4M = Gross Profit of $6M."
        },
        OPERATING_EXPENSE: {
            definition: "Operating Expenses are costs required to run the business that aren't directly tied to production. Includes R&D, Sales & Marketing, and G&A.",
            formula: "R&D + Sales & Marketing + G&A + Other Operating Costs",
            example: "If a company spends $2M on marketing and $1.5M on R&D, operating expenses = $3.5M."
        },
        OPERATING_INCOME: {
            definition: "Operating Income (EBIT) shows profit from core business operations before interest and taxes.",
            formula: "Operating Income = Gross Profit - Operating Expenses",
            example: "Gross Profit of $6M minus Operating Expenses of $3.5M = Operating Income of $2.5M."
        },
        TAX: {
            definition: "Income tax expense is the amount of taxes payable on the company's earnings.",
            formula: "Taxable Income × Tax Rate",
            example: "If pretext income is $3M and tax rate is 21%, tax = $630,000."
        },
        NET_INCOME: {
            definition: "Net Income (the 'Bottom Line') is the final profit after all expenses, interest, and taxes.",
            formula: "Net Income = Operating Income +/- Non-Operating Items - Taxes",
            example: "If operating income is $2.5M, interest is $0.1M, and taxes are $0.5M, Net Income = $1.9M."
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
    };

    // Calculations for Builder mode
    const grossProfit = revenue - cogs;
    const calcOperatingIncome = grossProfit - opex;
    const netIncome = calcOperatingIncome - tax;

    // Calculations for Valuation mode
    const afterTaxOI = operatingIncome * (1 - taxRate / 100);
    const fcff = afterTaxOI + dna - capex - wcChange;

    // Overview Mode
    const renderOverview = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Interactive Income Statement Learning</h3>
                <p className="text-gray-700 mb-4">
                    Master income statements from beginner to advanced valuation. Choose your learning path:
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => setMode('learn')}
                    className="bg-white border-2 border-blue-200 hover:border-blue-400 rounded-lg p-6 text-left transition-all hover:shadow-lg group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaBook className="text-blue-600 text-xl" />
                                <h4 className="font-bold text-lg">Learn Mode</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Interactive explanations with tooltips and walkthrough</p>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                </button>

                <button
                    onClick={() => setMode('builder')}
                    className="bg-white border-2 border-green-200 hover:border-green-400 rounded-lg p-6 text-left transition-all hover:shadow-lg group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaEdit className="text-green-600 text-xl" />
                                <h4 className="font-bold text-lg">Build Mode</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Create and validate your own income statements</p>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                </button>

                <button
                    onClick={() => setMode('analysis')}
                    className="bg-white border-2 border-purple-200 hover:border-purple-400 rounded-lg p-6 text-left transition-all hover:shadow-lg group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaChartBar className="text-purple-600 text-xl" />
                                <h4 className="font-bold text-lg">Analyze Mode</h4>
                            </div>
                            <p className="text-gray-600 text-sm">Margin analysis, common-size statements, and insights</p>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                </button>

                <button
                    onClick={() => setMode('valuation')}
                    className="bg-white border-2 border-orange-200 hover:border-orange-400 rounded-lg p-6 text-left transition-all hover:shadow-lg group"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaCalculator className="text-orange-600 text-xl" />
                                <h4 className="font-bold text-lg">Valuation Mode</h4>
                            </div>
                            <p className="text-gray-600 text-sm">FCFF bridge calculator (Damodaran methodology)</p>
                        </div>
                        <FaChevronRight className="text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Master:</h4>
                <ul className="space-y-2 text-gray-700">
                    <li>✓ Understanding revenue, COGS, and profitability metrics</li>
                    <li>✓ Creating balanced income statements with formulas</li>
                    <li>✓ Analyzing margins and financial performance</li>
                    <li>✓ Building FCFF models for company valuation</li>
                </ul>
            </div>
        </div>
    );

    // Learn Mode - Interactive Statement
    const renderLearnMode = () => {
        return (
            <div className="space-y-8 animate-fade-in">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Interactive Income Statement</h3>
                        <p className="text-gray-600">Scroll down to understand every line item.</p>
                    </div>
                    <button onClick={() => setMode('overview')} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors">
                        ← Back to Overview
                    </button>
                </div>

                <div className="space-y-6">
                    {SAMPLE_STATEMENT.lineItems.map((item, index) => {
                        const content = EDUCATIONAL_CONTENT[item.category];
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                            >
                                {/* The Financial Line Item Representation */}
                                <div className={`p-4 flex justify-between items-center ${item.isSubtotal ? 'bg-gray-50 border-b border-gray-200' : 'bg-white'
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.isSubtotal ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className={`text-lg ${item.isSubtotal ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                                {item.label}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className={`font-mono text-lg ${item.isSubtotal ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                        {formatCurrency(item.amount)}
                                    </div>
                                </div>

                                {/* The Educational Content */}
                                {content && (
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-100 grid md:grid-cols-3 gap-6">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1 block">Definition</span>
                                            <p className="text-sm text-gray-800">{content.definition}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-1 block">Formula</span>
                                            <code className="text-sm bg-white px-2 py-1 rounded border border-purple-100 text-purple-800 block w-fit">
                                                {content.formula}
                                            </code>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-green-500 mb-1 block">Example</span>
                                            <p className="text-sm text-gray-800 italic">"{content.example}"</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="bg-gray-800 text-gray-300 p-6 rounded-xl text-center mt-8">
                    <p><strong>Ready to practice?</strong> Switch to <button onClick={() => setMode('builder')} className="text-white underline hover:text-blue-300 font-bold">Build Mode</button> to test your knowledge!</p>
                </div>
            </div>
        );
    };

    // Builder Mode - Simple Statement Creator
    const renderBuilderMode = () => {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Build Your Own Statement</h3>
                    <button onClick={() => setMode('overview')} className="text-blue-600 hover:text-blue-800">
                        ← Back to Overview
                    </button>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <p className="text-sm text-gray-700">
                        💡 Adjust the input values to see how they affect profitability metrics
                    </p>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Revenue</label>
                        <input
                            type="number"
                            value={revenue}
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Goods Sold</label>
                        <input
                            type="number"
                            value={cogs}
                            onChange={(e) => setCogs(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="p-3 bg-blue-100 rounded-lg flex justify-between font-semibold">
                        <span>= Gross Profit</span>
                        <span>{formatCurrency(grossProfit)}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operating Expenses</label>
                        <input
                            type="number"
                            value={opex}
                            onChange={(e) => setOpex(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="p-3 bg-blue-100 rounded-lg flex justify-between font-semibold">
                        <span>= Operating Income</span>
                        <span>{formatCurrency(calcOperatingIncome)}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Income Tax</label>
                        <input
                            type="number"
                            value={tax}
                            onChange={(e) => setTax(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex justify-between font-bold text-lg border-2 border-green-400">
                        <span>= Net Income</span>
                        <span>{formatCurrency(netIncome)}</span>
                    </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Margins:</h4>
                    <div className="text-sm space-y-1">
                        <p>• Gross Margin: {((grossProfit / revenue) * 100).toFixed(1)}%</p>
                        <p>• Operating Margin: {((calcOperatingIncome / revenue) * 100).toFixed(1)}%</p>
                        <p>• Net Margin: {((netIncome / revenue) * 100).toFixed(1)}%</p>
                    </div>
                </div>
            </div>
        );
    };

    // Analysis Mode - Margin Charts
    const renderAnalysisMode = () => {
        const analysisRevenue = 12000000;
        const analysisGrossProfit = 7200000;
        const analysisOperatingIncome = 3200000;
        const analysisNetIncome = 2504300;

        const marginData = [
            { name: 'Gross Margin', value: (analysisGrossProfit / analysisRevenue) * 100, color: '#3b82f6' },
            { name: 'Operating Margin', value: (analysisOperatingIncome / analysisRevenue) * 100, color: '#8b5cf6' },
            { name: 'Net Margin', value: (analysisNetIncome / analysisRevenue) * 100, color: '#ec4899' },
        ];

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Margin Analysis</h3>
                    <button onClick={() => setMode('overview')} className="text-blue-600 hover:text-blue-800">
                        ← Back to Overview
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-sm text-gray-600">Gross Margin</div>
                        <div className="text-2xl font-bold text-blue-600">60.0%</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="text-sm text-gray-600">Operating Margin</div>
                        <div className="text-2xl font-bold text-purple-600">26.7%</div>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <div className="text-sm text-gray-600">Net Margin</div>
                        <div className="text-2xl font-bold text-pink-600">20.9%</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold mb-4">Margin Comparison</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={marginData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Margin %', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {marginData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold mb-2">💡 Insights</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Strong gross margin of 60% indicates excellent pricing power</li>
                        <li>• Operating margin of 26.7% demonstrates strong operational efficiency</li>
                        <li>• Net margin of 20.9% shows healthy profitability after all expenses</li>
                    </ul>
                </div>
            </div>
        );
    };

    // Valuation Mode - FCFF Calculator
    const renderValuationMode = () => {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">FCFF Bridge Calculator</h3>
                    <button onClick={() => setMode('overview')} className="text-blue-600 hover:text-blue-800">
                        ← Back to Overview
                    </button>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <p className="text-sm text-gray-700">
                        💡 Following Damodaran's FCFF methodology: FCFF = After-Tax OI + Non-Cash Charges - CapEx - ΔWC
                    </p>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Operating Income (EBIT)</label>
                        <input
                            type="number"
                            value={operatingIncome}
                            onChange={(e) => setOperatingIncome(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="p-3 bg-blue-50 rounded border">
                        <div className="flex justify-between font-semibold">
                            <span>After-Tax Operating Income</span>
                            <span>{formatCurrency(afterTaxOI)}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">+ Non-Cash Charges (D&A)</label>
                        <input
                            type="number"
                            value={dna}
                            onChange={(e) => setDNA(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">- Capital Expenditures</label>
                        <input
                            type="number"
                            value={capex}
                            onChange={(e) => setCapex(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">- Change in Working Capital</label>
                        <input
                            type="number"
                            value={wcChange}
                            onChange={(e) => setWCChange(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-400">
                        <div className="flex justify-between font-bold text-lg">
                            <span>= Free Cash Flow to Firm (FCFF)</span>
                            <span className="text-orange-900">{formatCurrency(fcff)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="income-statement-tutor">
            {mode === 'overview' && renderOverview()}
            {mode === 'learn' && renderLearnMode()}
            {mode === 'builder' && renderBuilderMode()}
            {mode === 'analysis' && renderAnalysisMode()}
            {mode === 'valuation' && renderValuationMode()}
        </div>
    );
};

export default IncomeStatementTutor;
