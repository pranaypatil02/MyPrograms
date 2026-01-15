'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/formatting';

interface LineItem {
    id: string;
    category: string;
    label: string;
    amount: number;
    displayOrder: number;
    isSubtotal: boolean;
}

interface Statement {
    id: string;
    periodLabel: string;
    lineItems: LineItem[];
}

const EDUCATIONAL_CONTENT: Record<string, { definition: string; example: string; formula?: string }> = {
    REVENUE: {
        definition: "Revenue represents the total amount of money earned from sales of goods or services before any expenses are deducted. Also called 'Sales' or 'Top Line'.",
        example: "If a software company sold $10 million worth of subscriptions, their revenue is $10 million.",
        formula: "Sum of all sales transactions during the period"
    },
    COGS: {
        definition: "Cost of Goods Sold (COGS) includes all direct costs of producing the goods or services sold. For manufacturing, this includes materials and labor. For service companies, it includes delivery costs.",
        example: "If it costs $4 million to manufacture the products sold, COGS = $4 million.",
        formula: "Direct materials + Direct labor + Manufacturing overhead"
    },
    GROSS_PROFIT: {
        definition: "Gross Profit shows how much money is left after subtracting the direct costs of production. It indicates pricing power and production efficiency.",
        example: "Revenue of $10M minus COGS of $4M = Gross Profit of $6M.",
        formula: "Gross Profit = Revenue - Cost of Goods Sold"
    },
    OPERATING_EXPENSE: {
        definition: "Operating Expenses are costs required to run the business that aren't directly tied to production. Includes R&D, Sales & Marketing, and General & Administrative (G&A) expenses.",
        example: "If a company spends $2M on marketing and $1.5M on R&D, operating expenses = $3.5M.",
        formula: "R&D + Sales & Marketing + G&A + Other Operating Costs"
    },
    OPERATING_INCOME: {
        definition: "Operating Income (EBIT) shows profit from core business operations before interest and taxes. It's a key measure of  operational efficiency.",
        example: "Gross Profit of $6M minus Operating Expenses of $3.5M = Operating Income of $2.5M.",
        formula: "Operating Income = Gross Profit - Operating Expenses"
    },
    NET_INCOME: {
        definition: "Net Income (the 'Bottom Line') is the final profit after all expenses, interest, and taxes. This is what's available to shareholders.",
        example: "If operating income is $2.5M, interest is $0.1M, and taxes are $0.5M, Net Income = $1.9M.",
        formula: "Net Income = Operating Income +/- Non-Operating Items - Taxes"
    },
};

const WALKTHROUGH_STEPS = [
    {
        step: 1,
        title: "Revenue (Top Line)",
        description: "Start at the top! Revenue is all the money coming in from sales.",
        highlightCategories: ['REVENUE'],
    },
    {
        step: 2,
        title: "Cost of Goods Sold",
        description: "Subtract the direct costs of producing what you sold.",
        highlightCategories: ['COGS'],
    },
    {
        step: 3,
        title: "Gross Profit",
        description: "What's left after production costs. Shows pricing power and efficiency.",
        highlightCategories: ['GROSS_PROFIT'],
    },
    {
        step: 4,
        title: "Operating Expenses",
        description: "Ongoing costs to run the business: R&D, marketing, admin, etc.",
        highlightCategories: ['OPERATING_EXPENSE'],
    },
    {
        step: 5,
        title: "Operating Income (EBIT)",
        description: "Profit from core operations before interest and taxes.",
        highlightCategories: ['OPERATING_INCOME'],
    },
    {
        step: 6,
        title: "Non-Operating Items",
        description: "Interest, investments, and other items not from core business.",
        highlightCategories: ['NON_OPERATING_INCOME', 'NON_OPERATING_EXPENSE'],
    },
    {
        step: 7,
        title: "Taxes",
        description: "Income tax on profits.",
        highlightCategories: ['TAX'],
    },
    {
        step: 8,
        title: "Net Income (Bottom Line)",
        description: "Final profit after everything. This goes to shareholders!",
        highlightCategories: ['NET_INCOME'],
    },
];

export default function LearnPage() {
    const [statement, setStatement] = useState<Statement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [walkthroughStep, setWalkthroughStep] = useState<number>(0);
    const [showWalkthrough, setShowWalkthrough] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSampleStatement();
    }, []);

    const fetchSampleStatement = async () => {
        try {
            // Fetch first company
            const companiesRes = await fetch('/api/companies');
            const companiesData = await companiesRes.json();

            if (companiesData.companies.length > 0) {
                const companyId = companiesData.companies[0].id;

                // Fetch company details with statements
                const companyRes = await fetch(`/api/companies/${companyId}`);
                const companyData = await companyRes.json();

                if (companyData.company.statements.length > 0) {
                    setStatement(companyData.company.statements[0]);
                }
            }
        } catch (err) {
            console.error('Failed to load sample statement:', err);
        } finally {
            setLoading(false);
        }
    };

    const currentStep = WALKTHROUGH_STEPS[walkthroughStep];
    const highlightedCategories = showWalkthrough ? currentStep?.highlightCategories || [] : [];

    const isHighlighted = (category: string) => {
        return highlightedCategories.includes(category);
    };

    const getCategoryContent = (category: string) => {
        const key = category.replace('_', '_') as keyof typeof EDUCATIONAL_CONTENT;
        return EDUCATIONAL_CONTENT[key] || null;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                ← Back
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Learn Mode</h1>
                                <p className="text-sm text-gray-600">Master income statement fundamentals</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setShowWalkthrough(!showWalkthrough);
                                setWalkthroughStep(0);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${showWalkthrough
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {showWalkthrough ? '✓ Walkthrough Active' : 'Start Walkthrough'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Statement View */}
                    <div className="lg:col-span-2 space-y-6">
                        {showWalkthrough && (
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-blue-900">
                                        Step {currentStep.step} of {WALKTHROUGH_STEPS.length}: {currentStep.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setWalkthroughStep(Math.max(0, walkthroughStep - 1))}
                                            disabled={walkthroughStep === 0}
                                            className="px-3 py-1 bg-white border border-blue-300 rounded text-sm hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            ← Previous
                                        </button>
                                        <button
                                            onClick={() => setWalkthroughStep(Math.min(WALKTHROUGH_STEPS.length - 1, walkthroughStep + 1))}
                                            disabled={walkthroughStep === WALKTHROUGH_STEPS.length - 1}
                                            className="px-3 py-1 bg-white border border-blue-300 rounded text-sm hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                </div>
                                <p className="text-blue-800">{currentStep.description}</p>
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Interactive Income Statement
                                {statement && <span className="text-sm font-normal text-gray-600 ml-2">({statement.periodLabel})</span>}
                            </h2>

                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : statement ? (
                                <div className="space-y-2">
                                    {statement.lineItems.map((item) => {
                                        const highlighted = isHighlighted(item.category);
                                        const content = getCategoryContent(item.category);

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => setSelectedCategory(item.category)}
                                                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${highlighted
                                                        ? 'bg-blue-100 border-2 border-blue-400 shadow-md scale-105'
                                                        : selectedCategory === item.category
                                                            ? 'bg-purple-50 border border-purple-300'
                                                            : item.isSubtotal
                                                                ? 'bg-gray-100 font-semibold border border-gray-300'
                                                                : 'hover:bg-gray-50 border border-transparent'
                                                    }`}
                                            >
                                                <span className={`${item.isSubtotal ? 'font-bold' : ''} ${item.category === 'COGS' || item.category === 'OPERATING_EXPENSE' || item.category === 'TAX' ? 'text-red-700' : 'text-gray-900'}`}>
                                                    {item.isSubtotal ? '=' : item.category.includes('EXPENSE') || item.category === 'COGS' ? '-' : ''} {item.label}
                                                </span>
                                                <span className={`font-mono ${item.isSubtotal ? 'font-bold text-lg' : ''} ${item.amount < 0 ? 'text-red-700' : 'text-gray-900'}`}>
                                                    {formatCurrency(item.amount, { decimals: 0 })}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-600">No statement data available</p>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    💡 <strong>Tip:</strong> Click on any line item to see its definition and formula
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Educational Content */}
                    <div className="space-y-6">
                        {selectedCategory && getCategoryContent(selectedCategory) ? (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200 p-6 sticky top-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {selectedCategory.replace(/_/g, ' ')}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Definition</h4>
                                        <p className="text-sm text-gray-800">{getCategoryContent(selectedCategory)?.definition}</p>
                                    </div>

                                    {getCategoryContent(selectedCategory)?.formula && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Formula</h4>
                                            <div className="bg-white p-3 rounded border border-purple-200">
                                                <code className="text-sm text-purple-900 font-mono">
                                                    {getCategoryContent(selectedCategory)?.formula}
                                                </code>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Example</h4>
                                        <p className="text-sm text-gray-800">{getCategoryContent(selectedCategory)?.example}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-purple-200">
                                    <p className="text-xs text-gray-600">
                                        Source: SEC, IFRS IAS 1, US GAAP ASC 205
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    📚 Getting Started
                                </h3>
                                <ol className="space-y-3 text-sm text-gray-800">
                                    <li className="flex gap-2">
                                        <span className="font-bold text-blue-600">1.</span>
                                        <span>Click "Start Walkthrough" for a guided tour</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-blue-600">2.</span>
                                        <span>Or click any line item to see its definition</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-bold text-blue-600">3.</span>
                                        <span>Notice the math: Revenue - Expenses = Net Income</span>
                                    </li>
                                </ol>
                            </div>
                        )}

                        {/* Quick Reference */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Reference</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-700">Revenue</span>
                                    <span className="text-gray-600">Top line, sales</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-700">COGS</span>
                                    <span className="text-gray-600">Direct costs</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-700">Gross Profit</span>
                                    <span className="text-gray-600">Rev - COGS</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-gray-700">EBIT</span>
                                    <span className="text-gray-600">Operating income</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Net Income</span>
                                    <span className="text-gray-600">Bottom line</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
