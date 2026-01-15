import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaChevronDown, FaChevronUp, FaCalculator, FaChartLine, FaLightbulb, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeStatementTutor = () => {
    const [mode, setMode] = useState('learn'); // learn, build, analyze, value
    const [activeStep, setActiveStep] = useState(0); // For walkthrough

    // Data for Learn Mode
    const learnData = {
        revenue: { value: 1000, label: "Revenue", description: "The total amount of money brought in by a company's operations.", formula: "Price x Quantity Sold" },
        cogs: { value: 400, label: "Cost of Goods Sold (COGS)", description: "The direct costs of producing the goods sold by a company.", formula: "Direct Materials + Direct Labor" },
        grossProfit: { value: 600, label: "Gross Profit", description: "The profit a company makes after deducting the costs associated with making and selling its products.", formula: "Revenue - COGS" },
        opex: { value: 300, label: "Operating Expenses", description: "Expenses incurred through normal business operations (e.g., rent, equipment, marketing, payroll).", formula: "SG&A + R&D" },
        opIncome: { value: 300, label: "Operating Income", description: "Adjusted revenue after subtracting all operating expenses and depreciation.", formula: "Gross Profit - Operating Expenses" },
        interest: { value: 50, label: "Interest Expense", description: "The cost incurred by an entity for borrowed funds.", formula: "Debt x Interest Rate" },
        taxes: { value: 62.5, label: "Income Taxes", description: "Taxes levied by the government on financial income.", formula: "Pre-tax Income x Tax Rate" },
        netIncome: { value: 187.5, label: "Net Income", description: "The total profit of the company after all expenses and taxes.", formula: "Operating Income - Interest - Taxes" }
    };

    const steps = [
        { key: 'revenue', title: "Step 1: Top Line", text: "It all starts with Revenue (Sales). This is the money coming in the door." },
        { key: 'cogs', title: "Step 2: Direct Costs", text: "We verify the direct cost to make the product (COGS)." },
        { key: 'grossProfit', title: "Step 3: Gross Profit", text: "What's left is Gross Profit. This covers all other expenses." },
        { key: 'opex', title: "Step 4: Operating Expenses", text: "Subtract marketing, rent, and salaries (OpEx)." },
        { key: 'opIncome', title: "Step 5: Operating Income", text: "This is profit from core business operations (EBIT)." },
        { key: 'interest', title: "Step 6: Non-Operating", text: "Pay interest on debt and other non-core items." },
        { key: 'taxes', title: "Step 7: The Tax Man", text: "Don't forget to pay the government." },
        { key: 'netIncome', title: "Step 8: Bottom Line", text: "Finally, Net Income! This belongs to the shareholders." }
    ];

    const handleNextStep = () => {
        if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
    };

    const handlePrevStep = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };

    // --- Render Functions ---

    const renderLearnMode = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-900">{steps[activeStep].title}</h3>
                    <span className="text-sm font-semibold text-blue-700">Step {activeStep + 1} of {steps.length}</span>
                </div>
                <p className="text-lg text-blue-800 mb-6">{steps[activeStep].text}</p>

                <div className="flex gap-4">
                    <button
                        onClick={handlePrevStep}
                        disabled={activeStep === 0}
                        className="px-4 py-2 bg-white text-blue-700 border border-blue-300 rounded hover:bg-blue-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextStep}
                        disabled={activeStep === steps.length - 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 bg-gray-100 p-4 font-bold text-gray-700 border-b">
                    <div className="col-span-1"></div>
                    <div className="col-span-5">Line Item</div>
                    <div className="col-span-3 text-right">Value ($)</div>
                    <div className="col-span-3 text-right">Formula</div>
                </div>

                {Object.keys(learnData).map((key, index) => {
                    const item = learnData[key];
                    const isHighlighted = steps[activeStep].key === key;
                    const isVisible = index <= activeStep; // Reveal items step by step

                    if (!isVisible) return null;

                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`grid grid-cols-12 p-4 border-b last:border-0 transition-colors ${isHighlighted ? 'bg-yellow-50 border-l-4 border-l-yellow-400' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="col-span-1 flex items-center justify-center text-gray-400">
                                <div className="group relative">
                                    <FaInfoCircle className="cursor-help hover:text-blue-500" />
                                    <div className="absolute z-10 left-6 top-0 w-64 p-3 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                            <div className={`col-span-5 font-medium ${['grossProfit', 'opIncome', 'netIncome'].includes(key) ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                {item.label}
                            </div>
                            <div className={`col-span-3 text-right ${['cogs', 'opex', 'interest', 'taxes'].includes(key) ? 'text-red-600' : 'text-gray-900'}`}>
                                {['cogs', 'opex', 'interest', 'taxes'].includes(key) ? `(${item.value})` : item.value}
                            </div>
                            <div className="col-span-3 text-right text-sm text-gray-500 font-mono">
                                {item.formula}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Mode Selector */}
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-1 rounded-lg inline-flex">
                {['learn', 'build', 'analyze', 'value'].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`px-4 py-2 rounded-md text-sm font-semibold capitalize transition-all ${mode === m
                                ? 'bg-white text-primary shadow'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                    >
                        {m} Mode
                    </button>
                ))}
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    {mode === 'learn' && renderLearnMode()}
                    {mode === 'build' && <div className="p-12 text-center text-gray-500">Statement Builder Coming Soon</div>}
                    {mode === 'analyze' && <div className="p-12 text-center text-gray-500">Analysis Tools Coming Soon</div>}
                    {mode === 'value' && <div className="p-12 text-center text-gray-500">Valuation Bridge Coming Soon</div>}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default IncomeStatementTutor;
