import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import IncomeStatementTutor from '../src/components/IncomeStatementTutor';

describe('IncomeStatementTutor', () => {
    it('renders without crashing', () => {
        render(<IncomeStatementTutor />);
        expect(screen.getByText(/Interactive Income Statement Learning/i)).toBeInTheDocument();
    });

    it('shows Learn Mode button', () => {
        render(<IncomeStatementTutor />);
        expect(screen.getByText('Learn Mode')).toBeInTheDocument();
    });

    it('hides advanced modes (Build, Analyze, Valuation)', () => {
        render(<IncomeStatementTutor />);
        expect(screen.queryByText('Build Mode')).not.toBeInTheDocument();
    });
});
