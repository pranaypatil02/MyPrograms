'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatting';

interface LineItemInput {
    id: string;
    category: string;
    label: string;
    amount: number;
    displayOrder: number;
}

const SIMPLE_TEMPLATE: LineItemInput[] = [
    { id: '1', category: 'REVENUE', label: 'Total Revenue', amount: 0, displayOrder: 1 },
    { id: '2', category: 'COGS', label: 'Cost of Goods Sold', amount: 0, displayOrder: 2 },
    { id: '3', category: 'GROSS_PROFIT', label: 'Gross Profit', amount: 0, displayOrder: 3 },
    { id: '4', category: 'OPERATING_EXPENSE', label: 'Operating Expenses', amount: 0, displayOrder: 4 },
    { id: '5', category: 'OPERATING_INCOME', label: 'Operating Income', amount: 0, displayOrder: 5 },
    { id: '6', category: 'TAX', label: 'Income Tax', amount: 0, displayOrder: 6 },
    { id: '7', category: 'NET_INCOME', label: 'Net Income', amount: 0, displayOrder: 7 },
];

export default function BuilderPage() {
    const [lineItems, setLineItems] = useState<LineItemInput[]>(SIMPLE_TEMPLATE);
    const [companyName, setCompanyName] = useState('');
    const [ticker, setTicker] = useState('');
    const [periodLabel, setPeriodLabel] = useState('FY 2024');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);

    const updateAmount = (id: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setLineItems(prev => prev.map(item =>
            item.id === id ? { ...item, amount: numValue } : item
        ));
        setValidationErrors([]);
    };

    const calculateSubtotals = () => {
        const updated = [...lineItems];
        const revenue = updated.find(i => i.category === 'REVENUE')?.amount || 0;
        const cogs = updated.find(i => i.category === 'COGS')?.amount || 0;
        const opex = updated.find(i => i.category === 'OPERATING_EXPENSE')?.amount || 0;
        const tax = updated.find(i => i.category === 'TAX')?.amount || 0;

        const grossProfit = revenue - cogs;
        const operatingIncome = grossProfit - opex;
        const netIncome = operatingIncome - tax;

        updated.forEach(item => {
            if (item.category === 'GROSS_PROFIT') item.amount = grossProfit;
            if (item.category === 'OPERATING_INCOME') item.amount = operatingIncome;
            if (item.category === 'NET_INCOME') item.amount = netIncome;
        });

        setLineItems(updated);
    };

    const validate = (): boolean => {
        const errors: string[] = [];

        if (!companyName.trim()) errors.push('Company name is required');
        if (!ticker.trim()) errors.push('Ticker symbol is required');
        if (!periodLabel.trim()) errors.push('Period label is required');

        const revenue = lineItems.find(i => i.category === 'REVENUE')?.amount || 0;
        if (revenue === 0) errors.push('Revenue must be greater than 0');

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        calculateSubtotals();

        // In a real app, this would call the API
        // For now, just show success message
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const resetForm = () => {
        setLineItems(SIMPLE_TEMPLATE.map(item => ({ ...item, amount: 0 })));
        setCompanyName('');
        setTicker('');
        setPeriodLabel('FY 2024');
        setValidationErrors([]);
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
                                <h1 className="text-2xl font-bold text-gray-900">Statement Builder</h1>
                                <p className="text-sm text-gray-600">Create and validate income statements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-semibold">✓ Statement created successfully!</p>
                        </div>
                    )}

                    {/* Validation Errors */}
                    {validationErrors.length > 0 && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                            <p className="text-red-800 font-semibold mb-2">Please fix the following errors:</p>
                            <ul className="list-disc list-inside text-red-700 text-sm">
                                {validationErrors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Company Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., Apple Inc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ticker Symbol *
                                </label>
                                <input
                                    type="text"
                                    value={ticker}
                                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., AAPL"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Period Label *
                                </label>
                                <input
                                    type="text"
                                    value={periodLabel}
                                    onChange={(e) => setPeriodLabel(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="e.g., FY 2024"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statement Builder */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Income Statement</h2>
                            <button
                                onClick={calculateSubtotals}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                            >
                                Calculate Totals
                            </button>
                        </div>

                        <div className="space-y-3">
                            {lineItems.map((item) => {
                                const isCalculated = ['GROSS_PROFIT', 'OPERATING_INCOME', 'NET_INCOME'].includes(item.category);
                                const isExpense = ['COGS', 'OPERATING_EXPENSE', 'TAX'].includes(item.category);

                                return (
                                    <div
                                        key={item.id}
                                        className={`flex items-center gap-4 p-3 rounded-lg ${isCalculated ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex-1">
                                            <label className={`block text-sm font-medium ${isExpense ? 'text-red-700' : 'text-gray-900'}`}>
                                                {isExpense ? '- ' : ''}{item.label}
                                                {isCalculated && <span className="ml-2 text-xs text-blue-600">(Auto-calculated)</span>}
                                            </label>
                                        </div>
                                        <div className="w-48">
                                            <input
                                                type="number"
                                                value={item.amount || ''}
                                                onChange={(e) => updateAmount(item.id, e.target.value)}
                                                disabled={isCalculated}
                                                className={`w-full px-4 py-2 border rounded-lg text-right font-mono ${isCalculated
                                                        ? 'bg-blue-100 border-blue-300 text-blue-900 cursor-not-allowed'
                                                        : 'border-gray-300 focus:ring-2 focus:ring-green-500'
                                                    }`}
                                                placeholder="0"
                                            />
                                        </div>
                                        <div className="w-32 text-right font-mono text-gray-600">
                                            {formatCurrency(item.amount, { decimals: 0 })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                                <p className="text-sm text-gray-700">
                                    <strong>💡 How it works:</strong> Enter Revenue, COGS, Operating Expenses, and Tax amounts.
                                    Click "Calculate Totals" to auto-compute Gross Profit, Operating Income, and Net Income using standard formulas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg"
                        >
                            Save Statement
                        </button>
                        <button
                            onClick={resetForm}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Formula Reference */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Formula Reference</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-700">Gross Profit</span>
                                <code className="text-blue-600">Revenue - COGS</code>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-700">Operating Income</span>
                                <code className="text-blue-600">Gross Profit - Operating Expenses</code>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-700">Net Income</span>
                                <code className="text-blue-600">Operating Income - Tax</code>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
