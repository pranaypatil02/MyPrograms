/**
 * Formatting utilities for currency, numbers, and percentages
 */

export interface FormatOptions {
    currency?: string;
    locale?: string;
    decimals?: number;
    useParenthesesForNegative?: boolean;
}

/**
 * Format currency value
 */
export function formatCurrency(
    value: number,
    options: FormatOptions = {}
): string {
    const {
        currency = 'USD',
        locale = 'en-US',
        decimals = 0,
        useParenthesesForNegative = true,
    } = options;

    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(absValue);

    if (value < 0 && useParenthesesForNegative) {
        return `(${formatted})`;
    }

    return value < 0 ? `-${formatted}` : formatted;
}

/**
 * Format number with thousands separators
 */
export function formatNumber(
    value: number,
    options: FormatOptions = {}
): string {
    const {
        locale = 'en-US',
        decimals = 0,
        useParenthesesForNegative = false,
    } = options;

    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(absValue);

    if (value < 0 && useParenthesesForNegative) {
        return `(${formatted})`;
    }

    return value < 0 ? `-${formatted}` : formatted;
}

/**
 * Format percentage
 */
export function formatPercentage(
    value: number,
    decimals: number = 1
): string {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export function formatCompact(value: number): string {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1_000_000_000) {
        return `${sign}$${(absValue / 1_000_000_000).toFixed(1)}B`;
    } else if (absValue >= 1_000_000) {
        return `${sign}$${(absValue / 1_000_000).toFixed(1)}M`;
    } else if (absValue >= 1_000) {
        return `${sign}$${(absValue / 1_000).toFixed(1)}K`;
    }

    return formatCurrency(value);
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
    const cleaned = value.replace(/[^0-9.-]/g, '');
    const isNegative = value.includes('(') && value.includes(')');
    const number = parseFloat(cleaned);
    return isNegative ? -Math.abs(number) : number;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    if (format === 'long') {
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

/**
 * Get fiscal period label
 */
export function getFiscalPeriodLabel(periodStart: Date, periodEnd: Date): string {
    const start = new Date(periodStart);
    const end = new Date(periodEnd);

    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

    if (diffMonths === 12 || diffMonths === 11) {
        return `FY ${end.getFullYear()}`;
    } else if (diffMonths === 3 || diffMonths === 2) {
        const quarter = Math.floor(end.getMonth() / 3) + 1;
        return `Q${quarter} ${end.getFullYear()}`;
    }

    return `${formatDate(start)} - ${formatDate(end)}`;
}
