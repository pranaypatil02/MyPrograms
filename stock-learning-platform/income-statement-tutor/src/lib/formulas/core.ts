/**
 * Core Formula Functions for Income Statement Calculations
 * Based on:
 * - SEC beginner guidance
 * - IFRS IAS 1
 * - US GAAP ASC Topic 205
 * - Damodaran valuation materials
 */

import { LineItem } from '@prisma/client';
import { MarginAnalysis, ValidationError, RollupValidation } from '@/types';

/**
 * Calculate Gross Profit
 * Formula: Gross Profit = Revenue - Cost of Revenue (COGS)
 */
export function calculateGrossProfit(revenue: number, cogs: number): number {
    return revenue - cogs;
}

/**
 * Calculate Operating Income
 * Formula: Operating Income = Gross Profit - Operating Expenses
 */
export function calculateOperatingIncome(grossProfit: number, operatingExpenses: number): number {
    return grossProfit - operatingExpenses;
}

/**
 * Calculate Pre-tax Income
 * Formula: Pre-tax Income = Operating Income + Non-Operating Income - Non-Operating Expenses
 */
export function calculatePretaxIncome(
    operatingIncome: number,
    nonOperatingIncome: number,
    nonOperatingExpenses: number
): number {
    return operatingIncome + nonOperatingIncome - nonOperatingExpenses;
}

/**
 * Calculate Net Income
 * Formula: Net Income = Pre-tax Income - Tax Expense
 */
export function calculateNetIncome(pretaxIncome: number, taxExpense: number): number {
    return pretaxIncome - taxExpense;
}

/**
 * Calculate Earnings Per Share (EPS)
 * Formula: EPS = Net Income / Shares Outstanding
 */
export function calculateEPS(netIncome: number, sharesOutstanding: number): number {
    if (sharesOutstanding === 0) {
        throw new Error('Shares outstanding cannot be zero');
    }
    return netIncome / sharesOutstanding;
}

/**
 * Calculate Gross Margin
 * Formula: Gross Margin = (Gross Profit / Revenue) × 100
 */
export function calculateGrossMargin(grossProfit: number, revenue: number): number {
    if (revenue === 0) {
        return 0;
    }
    return (grossProfit / revenue) * 100;
}

/**
 * Calculate Operating Margin
 * Formula: Operating Margin = (Operating Income / Revenue) × 100
 */
export function calculateOperatingMargin(operatingIncome: number, revenue: number): number {
    if (revenue === 0) {
        return 0;
    }
    return (operatingIncome / revenue) * 100;
}

/**
 * Calculate Net Margin
 * Formula: Net Margin = (Net Income / Revenue) × 100
 */
export function calculateNetMargin(netIncome: number, revenue: number): number {
    if (revenue === 0) {
        return 0;
    }
    return (netIncome / revenue) * 100;
}

/**
 * Calculate all margins from line items
 */
export function calculateMargins(lineItems: LineItem[]): MarginAnalysis {
    const revenue = sumLineItemsByCategory(lineItems, 'REVENUE');
    const grossProfit = sumLineItemsByCategory(lineItems, 'GROSS_PROFIT');
    const operatingIncome = sumLineItemsByCategory(lineItems, 'OPERATING_INCOME');
    const netIncome = sumLineItemsByCategory(lineItems, 'NET_INCOME');

    return {
        revenue,
        grossProfit,
        operatingIncome,
        netIncome,
        grossMargin: calculateGrossMargin(grossProfit, revenue),
        operatingMargin: calculateOperatingMargin(operatingIncome, revenue),
        netMargin: calculateNetMargin(netIncome, revenue),
    };
}

/**
 * Calculate Common-Size Percentage
 * Formula: Common-Size = (Line Item Amount / Revenue) × 100
 */
export function calculateCommonSize(amount: number, revenue: number): number {
    if (revenue === 0) {
        return 0;
    }
    return (amount / revenue) * 100;
}

/**
 * Calculate Year-over-Year Growth
 * Formula: Growth = ((Current - Prior) / Prior) × 100
 */
export function calculateYoYGrowth(currentValue: number, priorValue: number): number {
    if (priorValue === 0) {
        return currentValue > 0 ? 100 : 0;
    }
    return ((currentValue - priorValue) / priorValue) * 100;
}

/**
 * Validate rollup calculations
 * Checks if parent line item equals the sum of children (within tolerance)
 */
export function validateRollup(
    parentAmount: number,
    childAmounts: number[],
    tolerance: number = 0.01
): RollupValidation {
    const sumOfChildren = childAmounts.reduce((sum, amount) => sum + amount, 0);
    const difference = Math.abs(parentAmount - sumOfChildren);
    const isValid = difference <= tolerance;

    const errors: ValidationError[] = [];
    if (!isValid) {
        errors.push({
            field: 'rollup',
            message: `Rollup validation failed: parent amount ${parentAmount} does not match sum of children ${sumOfChildren}`,
            expected: sumOfChildren,
            actual: parentAmount,
        });
    }

    return {
        isValid,
        errors,
        warnings: [],
    };
}

/**
 * Validate income statement structure
 * Ensures all required line items are present and formulas are correct
 */
export function validateIncomeStatement(lineItems: LineItem[]): RollupValidation {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];

    // Check for required categories
    const requiredCategories = ['REVENUE', 'GROSS_PROFIT', 'OPERATING_INCOME', 'NET_INCOME'];
    const presentCategories = new Set(lineItems.map(item => item.category));

    for (const category of requiredCategories) {
        if (!presentCategories.has(category)) {
            errors.push({
                field: 'category',
                message: `Missing required category: ${category}`,
            });
        }
    }

    // Validate Gross Profit = Revenue - COGS
    const revenue = sumLineItemsByCategory(lineItems, 'REVENUE');
    const cogs = sumLineItemsByCategory(lineItems, 'COGS');
    const grossProfit = sumLineItemsByCategory(lineItems, 'GROSS_PROFIT');

    const grossProfitValidation = validateRollup(grossProfit, [revenue, -cogs]);
    if (!grossProfitValidation.isValid) {
        errors.push({
            field: 'grossProfit',
            message: 'Gross Profit does not equal Revenue - COGS',
            expected: revenue - cogs,
            actual: grossProfit,
        });
    }

    // Validate Operating Income = Gross Profit - Operating Expenses
    const opex = sumLineItemsByCategory(lineItems, 'OPERATING_EXPENSE');
    const operatingIncome = sumLineItemsByCategory(lineItems, 'OPERATING_INCOME');

    const opIncomeValidation = validateRollup(operatingIncome, [grossProfit, -opex]);
    if (!opIncomeValidation.isValid) {
        errors.push({
            field: 'operatingIncome',
            message: 'Operating Income does not equal Gross Profit - Operating Expenses',
            expected: grossProfit - opex,
            actual: operatingIncome,
        });
    }

    // Validate Net Income = Pre-tax Income - Taxes
    const pretaxIncome = sumLineItemsByCategory(lineItems, 'PRETAX_INCOME');
    const taxes = sumLineItemsByCategory(lineItems, 'TAX');
    const netIncome = sumLineItemsByCategory(lineItems, 'NET_INCOME');

    const netIncomeValidation = validateRollup(netIncome, [pretaxIncome, -taxes]);
    if (!netIncomeValidation.isValid) {
        errors.push({
            field: 'netIncome',
            message: 'Net Income does not equal Pre-tax Income - Taxes',
            expected: pretaxIncome - taxes,
            actual: netIncome,
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

/**
 * Helper: Sum line items by category
 */
export function sumLineItemsByCategory(lineItems: LineItem[], category: string): number {
    return lineItems
        .filter(item => item.category === category && !item.isSubtotal)
        .reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Helper: Get line items by category
 */
export function getLineItemsByCategory(lineItems: LineItem[], category: string): LineItem[] {
    return lineItems.filter(item => item.category === category);
}

/**
 * Helper: Find subtotal line item for category
 */
export function findSubtotalForCategory(lineItems: LineItem[], category: string): LineItem | undefined {
    return lineItems.find(item => item.category === category && item.isSubtotal);
}
