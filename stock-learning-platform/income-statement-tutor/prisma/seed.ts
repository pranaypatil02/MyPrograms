import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clean up existing data
    await prisma.adjustment.deleteMany();
    await prisma.valuationInput.deleteMany();
    await prisma.lineItem.deleteMany();
    await prisma.incomeStatement.deleteMany();
    await prisma.company.deleteMany();

    // Create sample company: Tech Innovators Inc.
    const company = await prisma.company.create({
        data: {
            name: 'Tech Innovators Inc.',
            ticker: 'TECH',
            currency: 'USD',
            fiscalYearEnd: '12-31',
        },
    });

    console.log('✓ Created company: Tech Innovators Inc.');

    // FY 2023 Income Statement
    const statement2023 = await prisma.incomeStatement.create({
        data: {
            companyId: company.id,
            periodStart: new Date('2023-01-01'),
            periodEnd: new Date('2023-12-31'),
            periodLabel: 'FY 2023',
            sharesOutstanding: 1_000_000,
            lineItems: {
                create: [
                    // Revenue
                    {
                        category: "REVENUE",
                        label: 'Product Revenue',
                        amount: 8_000_000,
                        displayOrder: 1,
                    },
                    {
                        category: "REVENUE",
                        label: 'Service Revenue',
                        amount: 2_000_000,
                        displayOrder: 2,
                    },
                    {
                        category: "REVENUE",
                        label: 'Total Revenue',
                        amount: 10_000_000,
                        displayOrder: 3,
                        isSubtotal: true,
                    },
                    // COGS
                    {
                        category: "COGS",
                        label: 'Product Costs',
                        amount: 3_200_000,
                        displayOrder: 4,
                    },
                    {
                        category: "COGS",
                        label: 'Service Costs',
                        amount: 800_000,
                        displayOrder: 5,
                    },
                    {
                        category: "COGS",
                        label: 'Total Cost of Revenue',
                        amount: 4_000_000,
                        displayOrder: 6,
                        isSubtotal: true,
                    },
                    // Gross Profit
                    {
                        category: "GROSS_PROFIT",
                        label: 'Gross Profit',
                        amount: 6_000_000,
                        displayOrder: 7,
                        isSubtotal: true,
                    },
                    // Operating Expenses
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Research & Development',
                        amount: 1_500_000,
                        displayOrder: 8,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Sales & Marketing',
                        amount: 1_200_000,
                        displayOrder: 9,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'General & Administrative',
                        amount: 800_000,
                        displayOrder: 10,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Total Operating Expenses',
                        amount: 3_500_000,
                        displayOrder: 11,
                        isSubtotal: true,
                    },
                    // Operating Income
                    {
                        category: "OPERATING_INCOME",
                        label: 'Operating Income',
                        amount: 2_500_000,
                        displayOrder: 12,
                        isSubtotal: true,
                    },
                    // Non-operating
                    {
                        category: "NON_OPERATING_EXPENSE",
                        label: 'Interest Expense',
                        amount: 100_000,
                        displayOrder: 13,
                    },
                    // Pre-tax
                    {
                        category: "PRETAX_INCOME",
                        label: 'Income Before Taxes',
                        amount: 2_400_000,
                        displayOrder: 14,
                        isSubtotal: true,
                    },
                    // Tax
                    {
                        category: "TAX",
                        label: 'Income Tax Expense',
                        amount: 504_000, // 21% effective rate
                        displayOrder: 15,
                    },
                    // Net Income
                    {
                        category: "NET_INCOME",
                        label: 'Net Income',
                        amount: 1_896_000,
                        displayOrder: 16,
                        isSubtotal: true,
                    },
                ],
            },
        },
    });

    console.log('✓ Created FY 2023 income statement');

    // FY 2024 Income Statement
    const statement2024 = await prisma.incomeStatement.create({
        data: {
            companyId: company.id,
            periodStart: new Date('2024-01-01'),
            periodEnd: new Date('2024-12-31'),
            periodLabel: 'FY 2024',
            sharesOutstanding: 1_000_000,
            lineItems: {
                create: [
                    // Revenue (20% growth)
                    {
                        category: "REVENUE",
                        label: 'Product Revenue',
                        amount: 9_600_000,
                        displayOrder: 1,
                    },
                    {
                        category: "REVENUE",
                        label: 'Service Revenue',
                        amount: 2_400_000,
                        displayOrder: 2,
                    },
                    {
                        category: "REVENUE",
                        label: 'Total Revenue',
                        amount: 12_000_000,
                        displayOrder: 3,
                        isSubtotal: true,
                    },
                    // COGS (improved margin)
                    {
                        category: "COGS",
                        label: 'Product Costs',
                        amount: 3_840_000,
                        displayOrder: 4,
                    },
                    {
                        category: "COGS",
                        label: 'Service Costs',
                        amount: 960_000,
                        displayOrder: 5,
                    },
                    {
                        category: "COGS",
                        label: 'Total Cost of Revenue',
                        amount: 4_800_000,
                        displayOrder: 6,
                        isSubtotal: true,
                    },
                    // Gross Profit
                    {
                        category: "GROSS_PROFIT",
                        label: 'Gross Profit',
                        amount: 7_200_000,
                        displayOrder: 7,
                        isSubtotal: true,
                    },
                    // Operating Expenses
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Research & Development',
                        amount: 1_800_000,
                        displayOrder: 8,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Sales & Marketing',
                        amount: 1_400_000,
                        displayOrder: 9,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'General & Administrative',
                        amount: 800_000,
                        displayOrder: 10,
                    },
                    {
                        category: "OPERATING_EXPENSE",
                        label: 'Total Operating Expenses',
                        amount: 4_000_000,
                        displayOrder: 11,
                        isSubtotal: true,
                    },
                    // Operating Income
                    {
                        category: "OPERATING_INCOME",
                        label: 'Operating Income',
                        amount: 3_200_000,
                        displayOrder: 12,
                        isSubtotal: true,
                    },
                    // Non-operating
                    {
                        category: "NON_OPERATING_EXPENSE",
                        label: 'Interest Expense',
                        amount: 80_000,
                        displayOrder: 13,
                    },
                    {
                        category: "NON_OPERATING_INCOME",
                        label: 'Investment Income',
                        amount: 50_000,
                        displayOrder: 14,
                    },
                    // Pre-tax
                    {
                        category: "PRETAX_INCOME",
                        label: 'Income Before Taxes',
                        amount: 3_170_000,
                        displayOrder: 15,
                        isSubtotal: true,
                    },
                    // Tax
                    {
                        category: "TAX",
                        label: 'Income Tax Expense',
                        amount: 665_700, // 21% effective rate
                        displayOrder: 16,
                    },
                    // Net Income
                    {
                        category: "NET_INCOME",
                        label: 'Net Income',
                        amount: 2_504_300,
                        displayOrder: 17,
                        isSubtotal: true,
                    },
                ],
            },
        },
    });

    console.log('✓ Created FY 2024 income statement');

    // Add valuation input for FY 2024
    await prisma.valuationInput.create({
        data: {
            statementId: statement2024.id,
            taxRate: 0.21,
            nonCashCharges: 500_000, // D&A + Stock-based comp
            capex: 400_000,
            wcChange: 150_000,
            notes: 'Normalized for recurring operations',
        },
    });

    console.log('✓ Created valuation inputs for FY 2024');

    console.log('');
    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📊 Created:');
    console.log(`  - Company: ${company.name} (${company.ticker})`);
    console.log(`  - ${statement2023.periodLabel}: Revenue $${(10_000_000).toLocaleString()}, Net Income $${(1_896_000).toLocaleString()}`);
    console.log(`  - ${statement2024.periodLabel}: Revenue $${(12_000_000).toLocaleString()}, Net Income $${(2_504_300).toLocaleString()}`);
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
