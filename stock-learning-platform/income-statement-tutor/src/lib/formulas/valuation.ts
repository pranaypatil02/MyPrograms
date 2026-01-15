/**
 * Valuation Functions - FCFF Bridge and Normalization
 * Based on Damodaran valuation materials
 */

import { LineItem, Adjustment, ValuationInput } from '@prisma/client';
import { FCFFCalculation, FCFFStep, NormalizedStatement, LineItemWithAdjustments } from '@/types';
import { sumLineItemsByCategory } from './core';

/**
 * Calculate After-Tax Operating Income
 * Formula: After-Tax Operating Income = Operating Income × (1 - Tax Rate)
 */
export function calculateAfterTaxOperatingIncome(operatingIncome: number, taxRate: number): number {
    if (taxRate < 0 || taxRate > 1) {
        throw new Error('Tax rate must be between 0 and 1');
    }
    return operatingIncome * (1 - taxRate);
}

/**
 * Calculate Free Cash Flow to the Firm (FCFF)
 * Formula: FCFF = After-Tax Operating Income + Non-Cash Charges - CapEx - Change in Working Capital
 */
export function calculateFCFF(
    afterTaxOperatingIncome: number,
    nonCashCharges: number,
    capex: number,
    wcChange: number
): number {
    return afterTaxOperatingIncome + nonCashCharges - capex - wcChange;
}

/**
 * Calculate complete FCFF bridge with step-by-step breakdown
 */
export function calculateFCFFBridge(
    lineItems: LineItem[],
    valuationInput: ValuationInput
): FCFFCalculation {
    const operatingIncome = sumLineItemsByCategory(lineItems, 'OPERATING_INCOME');
    const afterTaxOI = calculateAfterTaxOperatingIncome(operatingIncome, valuationInput.taxRate);
    const fcff = calculateFCFF(
        afterTaxOI,
        valuationInput.nonCashCharges,
        valuationInput.capex,
        valuationInput.wcChange
    );

    const steps: FCFFStep[] = [
        {
            label: 'Operating Income',
            formula: 'From Income Statement',
            value: operatingIncome,
            description: 'Earnings before interest and taxes (EBIT) from operations',
        },
        {
            label: 'Tax Rate',
            formula: `${(valuationInput.taxRate * 100).toFixed(1)}%`,
            value: valuationInput.taxRate,
            description: 'Effective tax rate applied to operating income',
        },
        {
            label: 'After-Tax Operating Income',
            formula: `Operating Income × (1 - Tax Rate) = ${operatingIncome.toLocaleString()} × (1 - ${valuationInput.taxRate}) = ${afterTaxOI.toLocaleString()}`,
            value: afterTaxOI,
            description: 'Operating income after subtracting taxes on operations',
        },
        {
            label: 'Add: Non-Cash Charges',
            formula: `+ ${valuationInput.nonCashCharges.toLocaleString()}`,
            value: valuationInput.nonCashCharges,
            description: 'Add back depreciation, amortization, and stock-based compensation',
        },
        {
            label: 'Less: Capital Expenditures (CapEx)',
            formula: `- ${valuationInput.capex.toLocaleString()}`,
            value: valuationInput.capex,
            description: 'Cash spent on acquiring or maintaining fixed assets',
        },
        {
            label: 'Less: Change in Working Capital',
            formula: `- ${valuationInput.wcChange.toLocaleString()}`,
            value: valuationInput.wcChange,
            description: 'Increase in working capital (accounts receivable + inventory - accounts payable)',
        },
        {
            label: 'Free Cash Flow to Firm (FCFF)',
            formula: `${afterTaxOI.toLocaleString()} + ${valuationInput.nonCashCharges.toLocaleString()} - ${valuationInput.capex.toLocaleString()} - ${valuationInput.wcChange.toLocaleString()} = ${fcff.toLocaleString()}`,
            value: fcff,
            description: 'Cash available to all investors (debt and equity holders)',
        },
    ];

    return {
        operatingIncome,
        taxRate: valuationInput.taxRate,
        afterTaxOperatingIncome: afterTaxOI,
        nonCashCharges: valuationInput.nonCashCharges,
        capex: valuationInput.capex,
        wcChange: valuationInput.wcChange,
        fcff,
        steps,
    };
}

/**
 * Apply adjustments to create normalized statement
 */
export function applyAdjustments(
    lineItems: LineItem[],
    adjustments: Adjustment[]
): NormalizedStatement {
    // Group adjustments by line item
    const adjustmentsByLineItem = new Map<string, Adjustment[]>();
    for (const adj of adjustments) {
        const existing = adjustmentsByLineItem.get(adj.lineItemId) || [];
        existing.push(adj);
        adjustmentsByLineItem.set(adj.lineItemId, existing);
    }

    // Create normalized line items
    const normalizedLineItems: LineItemWithAdjustments[] = lineItems.map(item => {
        const itemAdjustments = adjustmentsByLineItem.get(item.id) || [];
        const totalAdjustment = itemAdjustments.reduce((sum, adj) => sum + adj.amount, 0);

        return {
            ...item,
            amount: item.amount + totalAdjustment,
            adjustments: itemAdjustments,
        };
    });

    // Calculate impact by category
    const impactByCategory = new Map<string, { original: number; adjustment: number }>();

    for (const item of lineItems) {
        const itemAdjustments = adjustmentsByLineItem.get(item.id) || [];
        const totalAdjustment = itemAdjustments.reduce((sum, adj) => sum + adj.amount, 0);

        const existing = impactByCategory.get(item.category) || { original: 0, adjustment: 0 };
        existing.original += item.amount;
        existing.adjustment += totalAdjustment;
        impactByCategory.set(item.category, existing);
    }

    const impactSummary = Array.from(impactByCategory.entries()).map(([category, impact]) => ({
        category,
        originalAmount: impact.original,
        adjustmentAmount: impact.adjustment,
        normalizedAmount: impact.original + impact.adjustment,
    }));

    const totalAdjustments = adjustments.reduce((sum, adj) => sum + adj.amount, 0);

    return {
        originalStatementId: lineItems[0]?.statementId || '',
        period: '', // To be filled by caller
        adjustments,
        normalizedLineItems,
        totalAdjustments,
        impactSummary,
    };
}

/**
 * Calculate effective tax rate from income statement
 */
export function calculateEffectiveTaxRate(taxExpense: number, pretaxIncome: number): number {
    if (pretaxIncome === 0) {
        return 0;
    }
    return taxExpense / pretaxIncome;
}

/**
 * Calculate implied depreciation & amortization rate
 * Helper for estimating non-cash charges if not provided
 */
export function estimateDepreciationRate(revenue: number, industry: 'tech' | 'manufacturing' | 'retail'): number {
    // Industry-specific D&A as % of revenue (rough estimates)
    const rates = {
        tech: 0.03,       // 3%
        manufacturing: 0.05, // 5%
        retail: 0.02,     // 2%
    };
    return revenue * rates[industry];
}
