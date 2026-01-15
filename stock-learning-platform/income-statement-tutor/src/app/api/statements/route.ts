/**
 * GET /api/statements
 * List all income statements
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const statements = await prisma.incomeStatement.findMany({
            orderBy: {
                periodEnd: 'desc',
            },
            include: {
                company: true,
                lineItems: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                },
                valuationInput: true,
            },
        });

        return NextResponse.json({ statements });
    } catch (error) {
        console.error('Error fetching statements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statements' },
            { status: 500 }
        );
    }
}
