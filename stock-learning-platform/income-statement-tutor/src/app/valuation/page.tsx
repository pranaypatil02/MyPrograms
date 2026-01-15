'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/formatting';

interface FCFFStep {
    label: string;
    value: number;
    formula: string;
    description: string;
}

export default function ValuationPage() {
    const [operatingIncome, setOperatingIncome] = useState(3200000);
    const [taxRate, setTaxRate] = useState(0.21);
    const [nonCashCharges, setNonCashCharges] = useState(500000);
    const [capex, setCapex] = useState(400000);
    const [wcChange, setWCChange] = useState(150000);
    const [fcffSteps, setFCFFSteps] = useState<FCFFStep[]>([]);

    useEffect(() => {
        calculateFCFF();
    }, [operatingIncome, taxRate, nonCashCharges, capex, wcChange]);

    const calculateFCFF = () => {
        const afterTaxOI = operatingIncome * (1 - taxRate);
        const fcff = afterTaxOI + nonCashCharges - capex - wcChange;

        const steps: FCFFStep[] = [
            {
                label: 'Operating Income (EBIT)',
                value: operatingIncome,
                formula: 'From Income Statement',
                description: 'Earnings before interest and taxes from core operations',
            },
            {
                label: 'Tax Rate',
                value: taxRate * 100,
                formula: `${(taxRate * 100).toFixed(1)}%`,
                description: 'Effective tax rate applied to operating income',
            },
            {
                label: 'After-Tax Operating Income',
                value: afterTaxOI,
                formula: `${formatCurrency(operatingIncome, { decimals: 0 })} × (1 - ${taxRate}) = ${formatCurrency(afterTaxOI, { decimals: 0 })}`,
                description: 'Operating income after subtracting  taxes on operations',
            },
            {
                label: '+ Non-Cash Charges',
                value: nonCashCharges,
                formula: `+ ${formatCurrency(nonCashCharges, { decimals: 0 })}`,
                description: 'Add back depreciation, amortization, and stock-based compensation',
            },
            {
                label: '- Capital Expenditures',
                value: capex,
                formula: `- ${formatCurrency(capex, { decimals: 0 })}`,
                description: 'Cash spent on acquiring or maintaining fixed assets',
            },
            {
                label: '- Change in Working Capital',
                value: wcChange,
                formula: `- ${formatCurrency(wcChange, { decimals: 0 })}`,
                description: 'Increase in working capital (accounts receivable + inventory - accounts payable)',
            },
            {
                label: '= Free Cash Flow to Firm (FCFF)',
                value: fcff,
                formula: `${formatCurrency(afterTaxOI, { decimals: 0 })} + ${formatCurrency(nonCashCharges, { decimals: 0 })} - ${formatCurrency(capex, { decimals: 0 })} - ${formatCurrency(wcChange, { decimals: 0 })} = ${formatCurrency(fcff, { decimals: 0 })}`,
                description: 'Cash available to all investors (debt and equity holders)',
            },
        ];

        setFCFFSteps(steps);
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
                                <h1 className="text-2xl font-bold text-gray-900">Valuation Workspace</h1>
                                <p className="text-sm text-gray-600">FCFF bridge calculator (Damodaran methodology)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Inputs */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Valuation Inputs</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Operating Income (EBIT)
                                    </label>
                                    <input
                                        type="number"
                                        value={operatingIncome}
                                        onChange={(e) => setOperatingIncome(parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tax Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={taxRate * 100}
                                        onChange={(e) => setTaxRate((parseFloat(e.target.value) || 0) / 100)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        step="0.1"
                                        max="100"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Non-Cash Charges (D&A, SBC)
                                    </label>
                                    <input
                                        type="number"
                                        value={nonCashCharges}
                                        onChange={(e) => setNonCashCharges(parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Capital Expenditures (CapEx)
                                    </label>
                                    <input
                                        type="number"
                                        value={capex}
                                        onChange={(e) => setCapex(parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Change in Working Capital
                                    </label>
                                    <input
                                        type="number"
                                        value={wcChange}
                                        onChange={(e) => setWCChange(parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-600">
                                    💡 Adjust the inputs to see how they affect Free Cash Flow to the Firm
                                </p>
                            </div>
                        </div>

                        {/* Reference */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 p-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Damodaran FCFF Formula</h3>
                            <code className="text-xs text-gray-700 block">
                                FCFF = After-Tax OI + Non-Cash Charges - CapEx - ΔWC
                            </code>
                            <p className="text-xs text-gray-600 mt-3">
                                Where After-Tax  OI = Operating Income × (1 - Tax Rate)
                            </p>
                        </div>
                    </div>

                    {/* FCFF Bridge */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">FCFF Bridge Calculation</h2>

                            <div className="space-y-3">
                                {fcffSteps.map((step, idx) => {
                                    const isFinal = step.label.includes('FCFF');
                                    const isIntermediate = step.label.includes('After-Tax');

                                    return (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-lg border-2 ${isFinal
                                                    ? 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-400'
                                                    : isIntermediate
                                                        ? 'bg-blue-50 border-blue-300'
                                                        : 'bg-gray-50 border-gray-200'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`font-bold ${isFinal ? 'text-orange-900 text-lg' : 'text-gray-900'}`}>
                                                    {step.label}
                                                </h3>
                                                <div className={`text-right font-mono ${isFinal ? 'text-2xl font-bold text-orange-900' : 'text-lg'}`}>
                                                    {step.label.includes('Tax Rate')
                                                        ? `${step.value.toFixed(1)}%`
                                                        : formatCurrency(step.value, { decimals: 0 })}
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-700 mb-1">
                                                <strong>Formula:</strong> <code className="bg-white px-2 py-1 rounded">{step.formula}</code>
                                            </div>

                                            <div className="text-sm text-gray-600">
                                                {step.description}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                                    <p className="text-sm text-gray-700">
                                        <strong>📈 Key Insight:</strong> Free Cash Flow to Firm (FCFF) represents the cash available to all investors
                                        (both debt and equity holders) after the company has paid operating expenses, taxes, and made necessary
                                        investments in working capital and fixed assets.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">About This Calculation</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <strong>Operating Income (EBIT):</strong> Earnings Before Interest and Taxes - the profit from core business operations
                                </p>
                                <p>
                                    <strong>After-Tax Operating Income:</strong> Adjusts for taxes that would be paid on operating profit
                                </p>
                                <p>
                                    <strong>Non-Cash Charges:</strong> Added back because depreciation/amortization don't require cash outflow
                                </p>
                                <p>
                                    <strong>CapEx:</strong> Subtracted because these are actual cash investments in the business
                                </p>
                                <p>
                                    <strong>Working Capital Change:</strong> Increase in WC ties up cash in operations
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-600">
                                    Source: Aswath Damodaran - Investment Valuation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
