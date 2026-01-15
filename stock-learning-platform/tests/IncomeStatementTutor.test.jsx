import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IncomeStatementTutor from '../src/components/IncomeStatementTutor';

describe('IncomeStatementTutor', () => {
    it('renders without crashing', () => {
        render(<IncomeStatementTutor />);
        expect(screen.getByText(/Public Company Valuation 101/i)).toBeInTheDocument();
    });

    it('shows Start Module 1 button', () => {
        render(<IncomeStatementTutor />);
        expect(screen.getByText('Start Module 1')).toBeInTheDocument();
    });

    it('hides advanced modes (Build, Analyze, Valuation)', () => {
        render(<IncomeStatementTutor />);
        expect(screen.queryByText('Build Mode')).not.toBeInTheDocument();
        expect(screen.getByText(/Module 2/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Coming Soon/i).length).toBeGreaterThan(0);
    });
});
