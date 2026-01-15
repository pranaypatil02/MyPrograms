import { describe, it, expect } from 'vitest';
import {
    calculateAfterTaxOperatingIncome,
    calculateFCFF,
    calculateEffectiveTaxRate,
} from '../src/lib/formulas/valuation';

describe('Valuation Functions', () => {
    describe('After-Tax Operating Income', () => {
        it('should calculate after-tax operating income correctly', () => {
            expect(calculateAfterTaxOperatingIncome(2_500_000, 0.21)).toBe(1_975_000);
            expect(calculateAfterTaxOperatingIncome(1000, 0.30)).toBe(700);
        });

        it('should throw error for invalid tax rate', () => {
            expect(() => calculateAfterTaxOperatingIncome(1000, 1.5)).toThrow(
                'Tax rate must be between 0 and 1'
            );
            expect(() => calculateAfterTaxOperatingIncome(1000, -0.1)).toThrow(
                'Tax rate must be between 0 and 1'
            );
        });

        it('should handle zero tax rate', () => {
            expect(calculateAfterTaxOperatingIncome(1000, 0)).toBe(1000);
        });
    });

    describe('FCFF Calculation', () => {
        it('should calculate FCFF correctly', () => {
            const afterTaxOI = 1_975_000;
            const nonCashCharges = 500_000;
            const capex = 400_000;
            const wcChange = 150_000;

            const fcff = calculateFCFF(afterTaxOI, nonCashCharges, capex, wcChange);
            expect(fcff).toBe(1_925_000);
        });

        it('should handle negative FCFF', () => {
            const fcff = calculateFCFF(100, 50, 200, 100);
            expect(fcff).toBe(-150);
        });

        it('should handle zero values', () => {
            const fcff = calculateFCFF(1000, 0, 0, 0);
            expect(fcff).toBe(1000);
        });
    });

    describe('Effective Tax Rate', () => {
        it('should calculate effective tax rate correctly', () => {
            expect(calculateEffectiveTaxRate(504_000, 2_400_000)).toBe(0.21);
            expect(calculateEffectiveTaxRate(210, 1000)).toBe(0.21);
        });

        it('should handle zero pre-tax income', () => {
            expect(calculateEffectiveTaxRate(100, 0)).toBe(0);
        });
    });
});
