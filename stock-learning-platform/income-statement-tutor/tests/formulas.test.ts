import { describe, it, expect } from 'vitest';
import {
    calculateGrossProfit,
    calculateOperatingIncome,
    calculatePretaxIncome,
    calculateNetIncome,
    calculateEPS,
    calculateGrossMargin,
    calculateOperatingMargin,
    calculateNetMargin,
    calculateCommonSize,
    calculateYoYGrowth,
    validateRollup,
} from '../src/lib/formulas/core';

describe('Core Formula Functions', () => {
    describe('Income Statement Calculations', () => {
        it('should calculate gross profit correctly', () => {
            expect(calculateGrossProfit(10_000_000, 4_000_000)).toBe(6_000_000);
            expect(calculateGrossProfit(100, 60)).toBe(40);
            expect(calculateGrossProfit(0, 0)).toBe(0);
        });

        it('should calculate operating income correctly', () => {
            expect(calculateOperatingIncome(6_000_000, 3_500_000)).toBe(2_500_000);
            expect(calculateOperatingIncome(100, 70)).toBe(30);
        });

        it('should calculate pre-tax income correctly', () => {
            expect(calculatePretaxIncome(2_500_000, 0, 100_000)).toBe(2_400_000);
            expect(calculatePretaxIncome(1000, 100, 50)).toBe(1050);
        });

        it('should calculate net income correctly', () => {
            expect(calculateNetIncome(2_400_000, 504_000)).toBe(1_896_000);
            expect(calculateNetIncome(1000, 210)).toBe(790);
        });

        it('should calculate EPS correctly', () => {
            expect(calculateEPS(1_896_000, 1_000_000)).toBe(1.896);
            expect(calculateEPS(100, 50)).toBe(2);
        });

        it('should throw error for EPS with zero shares', () => {
            expect(() => calculateEPS(1000, 0)).toThrow('Shares outstanding cannot be zero');
        });
    });

    describe('Margin Calculations', () => {
        it('should calculate gross margin correctly', () => {
            expect(calculateGrossMargin(6_000_000, 10_000_000)).toBe(60);
            expect(calculateGrossMargin(40, 100)).toBe(40);
            expect(calculateGrossMargin(0, 100)).toBe(0);
        });

        it('should handle zero revenue in gross margin', () => {
            expect(calculateGrossMargin(100, 0)).toBe(0);
        });

        it('should calculate operating margin correctly', () => {
            expect(calculateOperatingMargin(2_500_000, 10_000_000)).toBe(25);
            expect(calculateOperatingMargin(30, 100)).toBe(30);
        });

        it('should calculate net margin correctly', () => {
            expect(calculateNetMargin(1_896_000, 10_000_000)).toBeCloseTo(18.96, 2);
            expect(calculateNetMargin(20, 100)).toBe(20);
        });

        it('should handle negative margins', () => {
            expect(calculateGrossMargin(-1000, 10000)).toBe(-10);
            expect(calculateNetMargin(-500, 5000)).toBe(-10);
        });
    });

    describe('Common-Size Analysis', () => {
        it('should calculate common-size percentage correctly', () => {
            expect(calculateCommonSize(4_000_000, 10_000_000)).toBe(40);
            expect(calculateCommonSize(1_500_000, 10_000_000)).toBe(15);
        });

        it('should handle zero revenue', () => {
            expect(calculateCommonSize(100, 0)).toBe(0);
        });
    });

    describe('Y/Y Growth Calculations', () => {
        it('should calculate positive growth correctly', () => {
            expect(calculateYoYGrowth(12_000_000, 10_000_000)).toBe(20);
            expect(calculateYoYGrowth(150, 100)).toBe(50);
        });

        it('should calculate negative growth correctly', () => {
            expect(calculateYoYGrowth(8_000_000, 10_000_000)).toBe(-20);
            expect(calculateYoYGrowth(75, 100)).toBe(-25);
        });

        it('should handle zero prior value', () => {
            expect(calculateYoYGrowth(1000, 0)).toBe(100);
            expect(calculateYoYGrowth(0, 0)).toBe(0);
        });
    });

    describe('Rollup Validation', () => {
        it('should validate correct rollups', () => {
            const result = validateRollup(100, [60, 40]);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should detect incorrect rollups', () => {
            const result = validateRollup(100, [60, 35]);
            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].expected).toBe(95);
            expect(result.errors[0].actual).toBe(100);
        });

        it('should handle tolerance', () => {
            const result = validateRollup(100.005, [60, 40], 0.01);
            expect(result.isValid).toBe(true);
        });
    });
});
