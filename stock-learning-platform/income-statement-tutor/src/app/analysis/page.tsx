'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency, formatPercentage } from '@/lib/formatting';

interface Company {
    id: string;
    name: string;
    ticker: string;
    statements: any[];
}

interface AnalysisData {
    statementId: string;
    period: string;
    margins: {
        revenue: number;
        grossProfit: number;
        operatingIncome: number;
        netIncome: number;
        grossMargin: number;
        operatingMargin: number;
        netMargin: number;
    };
    commonSize: {
        period: string;
        revenue: number;
        lineItems: any[];
    };
    insights: string[];
}

export default function AnalysisPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [selectedStatement, setSelectedStatement] = useState<string>('');
    const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch companies on mount
    useEffect(() => {
        fetchCompanies();
    }, []);

    // Fetch company details when selected
    useEffect(() => {
        if (selectedCompany) {
            fetchCompanyDetails(selectedCompany);
        }
    }, [selectedCompany]);

    // Fetch analysis when statement is selected
    useEffect(() => {
        if (selectedStatement) {
            fetchAnalysis(selectedStatement);
        }
    }, [selectedStatement]);

    const fetchCompanies = async () => {
        try {
            const res = await fetch('/api/companies');
            const data = await res.json();
            setCompanies(data.companies);

            // Auto-select first company
            if (data.companies.length > 0) {
                setSelectedCompany(data.companies[0].id);
            }
        } catch (err) {
            setError('Failed to load companies');
        }
    };

    const fetchCompanyDetails = async (companyId: string) => {
        try {
            const res = await fetch(`/api/companies/${companyId}`);
            const data = await res.json();

            // Auto-select most recent statement
            if (data.company.statements.length > 0) {
                setSelectedStatement(data.company.statements[0].id);
            }
        } catch (err) {
            setError('Failed to load company details');
        }
    };

    const fetchAnalysis = async (statementId: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/statements/${statementId}/analysis`);
            const data = await res.json();
            setAnalysisData(data);
        } catch (err) {
            setError('Failed to load analysis');
        } finally {
            setLoading(false);
        }
    };

    const selectedCompanyData = companies.find(c => c.id === selectedCompany);

    // Prepare chart data
    const marginChartData = analysisData ? [
        {
            name: 'Gross Margin',
            value: analysisData.margins.grossMargin,
            color: '#3b82f6',
        },
        {
            name: 'Operating Margin',
            value: analysisData.margins.operatingMargin,
            color: '#8b5cf6',
        },
        {
            name: 'Net Margin',
            value: analysisData.margins.netMargin,
            color: '#ec4899',
        },
    ] : [];

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
                                <h1 className="text-2xl font-bold text-gray-900">Analysis Dashboard</h1>
                                <p className="text-sm text-gray-600">Margin analysis and common-size statements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Company & Statement Selector */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company
                            </label>
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name} ({company.ticker})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Period
                            </label>
                            <select
                                value={selectedStatement}
                                onChange={(e) => setSelectedStatement(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {selectedCompanyData?.statements.map((stmt: any) => (
                                    <option key={stmt.id} value={stmt.id}>
                                        {stmt.periodLabel}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <p className="mt-2 text-gray-600">Loading analysis...</p>
                    </div>
                ) : analysisData ? (
                    <div className="space-y-6">
                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-sm font-medium text-gray-600">Revenue</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">
                                    {formatCurrency(analysisData.margins.revenue, { decimals: 0 })}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-sm font-medium text-gray-600">Gross Margin</div>
                                <div className="mt-2 text-3xl font-bold text-blue-600">
                                    {formatPercentage(analysisData.margins.grossMargin, 1)}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-sm font-medium text-gray-600">Operating Margin</div>
                                <div className="mt-2 text-3xl font-bold text-purple-600">
                                    {formatPercentage(analysisData.margins.operatingMargin, 1)}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="text-sm font-medium text-gray-600">Net Margin</div>
                                <div className="mt-2 text-3xl font-bold text-pink-600">
                                    {formatPercentage(analysisData.margins.netMargin, 1)}
                                </div>
                            </div>
                        </div>

                        {/* Margin Chart */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Margin Analysis</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={marginChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis label={{ value: 'Margin %', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value: any) => formatPercentage(value, 1)} />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                        {marginChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-4 text-sm text-gray-600">
                                <p><strong>Gross Margin:</strong> (Gross Profit / Revenue) × 100 = ({formatCurrency(analysisData.margins.grossProfit, { decimals: 0 })} / {formatCurrency(analysisData.margins.revenue, { decimals: 0 })}) × 100</p>
                                <p className="mt-1"><strong>Operating Margin:</strong> (Operating Income / Revenue) × 100 = ({formatCurrency(analysisData.margins.operatingIncome, { decimals: 0 })} / {formatCurrency(analysisData.margins.revenue, { decimals: 0 })}) × 100</p>
                                <p className="mt-1"><strong>Net Margin:</strong> (Net Income / Revenue) × 100 = ({formatCurrency(analysisData.margins.netIncome, { decimals: 0 })} / {formatCurrency(analysisData.margins.revenue, { decimals: 0 })}) × 100</p>
                            </div>
                        </div>

                        {/* Common-Size Statement */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Common-Size Statement</h2>
                            <p className="text-sm text-gray-600 mb-4">Every line item expressed as a percentage of revenue</p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Line Item
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                % of Revenue
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {analysisData.commonSize.lineItems.map((item: any, idx: number) => (
                                            <tr key={idx} className={item.category.includes('SUBTOTAL') ? 'font-semibold bg-gray-50' : ''}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.label}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                    {formatCurrency(item.amount, { decimals: 0 })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                    {formatPercentage(item.percentOfRevenue, 1)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Insights */}
                        {analysisData.insights.length > 0 && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">💡 AI-Generated Insights</h2>
                                <ul className="space-y-2">
                                    {analysisData.insights.map((insight, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-purple-600 mt-1">•</span>
                                            <span className="text-gray-700">{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : null}
            </main>
        </div>
    );
}
