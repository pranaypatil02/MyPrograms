/**
 * GET /api/statements/[id]/analysis
 * Compute margin analysis and common-size statement
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateMargins, calculateCommonSize } from '@/lib/formulas/core';
import { CommonSizeLineItem } from '@/types';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const statement = await prisma.incomeStatement.findUnique({
            where: { id },
            include: {
                lineItems: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                },
                company: true,
            },
        });

        if (!statement) {
            return NextResponse.json(
                { error: 'Statement not found' },
                { status: 404 }
            );
        }

        // Calculate margins
        const margins = calculateMargins(statement.lineItems);

        // Calculate common-size percentages
        const commonSizeItems: CommonSizeLineItem[] = statement.lineItems.map(item => ({
            label: item.label,
            category: item.category,
            amount: item.amount,
            percentOfRevenue: calculateCommonSize(item.amount, margins.revenue),
            displayOrder: item.displayOrder,
        }));

        return NextResponse.json({
            statementId: id,
            period: statement.periodLabel,
            margins,
            commonSize: {
                period: statement.periodLabel,
                revenue: margins.revenue,
                lineItems: commonSizeItems,
            },
            insights: generateInsights(margins),
        });
    } catch (error) {
        console.error('Error analyzing statement:', error);
        return NextResponse.json(
            { error: 'Failed to analyze statement' },
            { status: 500 }
        );
    }
}

function generateInsights(margins: any): string[] {
    const insights: string[] = [];

    // Gross margin insights
    if (margins.grossMargin > 70) {
        insights.push(`Strong gross margin of ${margins.grossMargin.toFixed(1)}% indicates excellent pricing power and/or low production costs.`);
    } else if (margins.grossMargin < 30) {
        insights.push(`Gross margin of ${margins.grossMargin.toFixed(1)}% is relatively low, suggesting competitive pricing pressure or high cost of goods.`);
    }

    // Operating margin insights
    if (margins.operatingMargin > 20) {
        insights.push(`Operating margin of ${margins.operatingMargin.toFixed(1)}% demonstrates strong operational efficiency.`);
    } else if (margins.operatingMargin < 5) {
        insights.push(`Operating margin of ${margins.operatingMargin.toFixed(1)}% indicates tight cost control is critical.`);
    }

    // Net margin insights
    if (margins.netMargin > 15) {
        insights.push(`Net margin of ${margins.netMargin.toFixed(1)}% shows healthy profitability after all expenses.`);
    } else if (margins.netMargin < 0) {
        insights.push(`Negative net margin of ${margins.netMargin.toFixed(1)}% indicates the company is currently unprofitable.`);
    }

    return insights;
}
