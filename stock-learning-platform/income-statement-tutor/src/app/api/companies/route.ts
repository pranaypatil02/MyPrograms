/**
 * GET /api/companies
 * List all companies
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const companies = await prisma.company.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                statements: {
                    orderBy: {
                        periodEnd: 'desc',
                    },
                    take: 1, // Most recent statement
                },
            },
        });

        return NextResponse.json({ companies });
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json(
            { error: 'Failed to fetch companies' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/companies
 * Create a new company
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, ticker, currency, fiscalYearEnd } = body;

        // Validation
        if (!name || !ticker) {
            return NextResponse.json(
                { error: 'Name and ticker are required' },
                { status: 400 }
            );
        }

        const company = await prisma.company.create({
            data: {
                name,
                ticker: ticker.toUpperCase(),
                currency: currency || 'USD',
                fiscalYearEnd: fiscalYearEnd || '12-31',
            },
        });

        return NextResponse.json({ company }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating company:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'A company with this ticker already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create company' },
            { status: 500 }
        );
    }
}
