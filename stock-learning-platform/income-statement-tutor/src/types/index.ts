// Type definitions for Income Statement Tutor

import { Company, IncomeStatement, LineItem, Adjustment, ValuationInput } from '@prisma/client';

// Re-export Prisma types
export type { Company, IncomeStatement, LineItem, Adjustment, ValuationInput };

// Line Item Category Constants
export const LINE_ITEM_CATEGORIES = {
    REVENUE: 'REVENUE',
    COGS: 'COGS',
    GROSS_PROFIT: 'GROSS_PROFIT',
    OPERATING_EXPENSE: 'OPERATING_EXPENSE',
    OPERATING_INCOME: 'OPERATING_INCOME',
    NON_OPERATING_INCOME: 'NON_OPERATING_INCOME',
    NON_OPERATING_EXPENSE: 'NON_OPERATING_EXPENSE',
    PRETAX_INCOME: 'PRETAX_INCOME',
    TAX: 'TAX',
    NET_INCOME: 'NET_INCOME',
    OTHER: 'OTHER',
} as const;

export type LineItemCategory = typeof LINE_ITEM_CATEGORIES[keyof typeof LINE_ITEM_CATEGORIES];

// Adjustment Type Constants
export const ADJUSTMENT_TYPES = {
    RECLASSIFY_OPERATING: 'RECLASSIFY_OPERATING',
    RECLASSIFY_NON_OPERATING: 'RECLASSIFY_NON_OPERATING',
    EXCLUDE_NON_RECURRING: 'EXCLUDE_NON_RECURRING',
    INCLUDE_RECURRING: 'INCLUDE_RECURRING',
    OTHER: 'OTHER',
} as const;

export type AdjustmentType = typeof ADJUSTMENT_TYPES[keyof typeof ADJUSTMENT_TYPES];

// Extended types with relations
export interface IncomeStatementWithLineItems extends IncomeStatement {
    lineItems: LineItem[];
    company?: Company;
    valuationInput?: ValuationInput | null;
}

export interface LineItemWithAdjustments extends LineItem {
    adjustments: Adjustment[];
}

export interface CompanyWithStatements extends Company {
    statements: IncomeStatement[];
}

// Analysis Results
export interface MarginAnalysis {
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    grossProfit: number;
    operatingIncome: number;
    netIncome: number;
    revenue: number;
}

export interface CommonSizeLineItem {
    label: string;
    category: string;
    amount: number;
    percentOfRevenue: number;
    displayOrder: number;
}

export interface CommonSizeStatement {
    period: string;
    revenue: number;
    lineItems: CommonSizeLineItem[];
}

export interface PeriodComparison {
    currentPeriod: string;
    priorPeriod: string;
    currentRevenue: number;
    priorRevenue: number;
    revenueGrowth: number;
    revenueGrowthPercent: number;
    currentNetIncome: number;
    priorNetIncome: number;
    netIncomeGrowth: number;
    netIncomeGrowthPercent: number;
    marginChanges: {
        grossMargin: number;
        operatingMargin: number;
        netMargin: number;
    };
}

export interface AnalysisResult {
    statementId: string;
    period: string;
    margins: MarginAnalysis;
    commonSize: CommonSizeStatement;
    periodComparison?: PeriodComparison;
    insights: string[];
}

// Valuation Types
export interface FCFFCalculation {
    operatingIncome: number;
    taxRate: number;
    afterTaxOperatingIncome: number;
    nonCashCharges: number;
    capex: number;
    wcChange: number;
    fcff: number;
    steps: FCFFStep[];
}

export interface FCFFStep {
    label: string;
    formula: string;
    value: number;
    description: string;
}

export interface NormalizedStatement {
    originalStatementId: string;
    period: string;
    adjustments: Adjustment[];
    normalizedLineItems: LineItemWithAdjustments[];
    totalAdjustments: number;
    impactSummary: {
        category: string;
        originalAmount: number;
        adjustmentAmount: number;
        normalizedAmount: number;
    }[];
}

// Validation Types
export interface ValidationError {
    field: string;
    lineItemId?: string;
    message: string;
    expected?: number;
    actual?: number;
}

export interface RollupValidation {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}

// Statement Builder Types
export interface StatementTemplate {
    name: string;
    description: string;
    categories: {
        category: LineItemCategory;
        label: string;
        isSubtotal: boolean;
        displayOrder: number;
    }[];
}

export interface StatementInput {
    companyId: string;
    periodStart: Date;
    periodEnd: Date;
    periodLabel: string;
    sharesOutstanding?: number;
    lineItems: {
        category: string;
        label: string;
        amount: number;
        displayOrder: number;
        isSubtotal?: boolean;
    }[];
}

// Quiz Types
export interface QuizQuestion {
    id: string;
    question: string;
    type: 'multiple-choice' | 'calculation' | 'true-false';
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    formula?: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
}

export interface QuizResult {
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    explanation: string;
}

// Content Types
export interface TooltipContent {
    term: string;
    definition: string;
    example?: string;
    source: 'SEC' | 'IFRS' | 'US_GAAP' | 'Damodaran';
    category: LineItemCategory;
}

export interface WalkthroughStep {
    stepNumber: number;
    title: string;
    description: string;
    highlightedCategories: LineItemCategory[];
    formula?: string;
    explanation: string;
}

// Export Options
export interface ExportOptions {
    format: 'csv' | 'json' | 'pdf';
    includeAnalysis: boolean;
    includeFormulas: boolean;
    periodRange?: {
        start: Date;
        end: Date;
    };
}
