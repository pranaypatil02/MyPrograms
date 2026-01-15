export const MODULE_1_CONTENT = {
    title: "Income Statement Fundamentals",
    sections: [
        {
            id: "intro",
            title: "1. What an Income Statement Is",
            content: `
### Definition
An income statement (also called a Profit & Loss statement, or P&L) shows:
- How much a company earned (**Revenue**)
- What it cost to earn it (**Cost of Revenue** and **Operating Expenses**)
- What profit remains at each layer (**Gross Profit**, **Operating Income**, **Pretax Income**, **Net Income**)

### Key idea: It covers a period of time
Income statements are \"flow statements.\"
Examples:
- "For the year ended December 31, 2025"
- "For the quarter ended September 30, 2025"

### Why investors care
The income statement is the fastest way to answer:
- Is this business growing?
- Is it profitable?
- Is it becoming more efficient over time?
- Are earnings high quality (repeatable) or boosted by one-time items?
            `
        },
        {
            id: "accounting",
            title: "2. Two Critical Accounting Ideas",
            content: `
### A) Accrual accounting (why profits and cash can differ)
Most public companies use accrual accounting:
- **Revenue** is recognized when earned (not necessarily when cash is received)
- **Expenses** are recorded when incurred (not necessarily when cash is paid)

**Example:**
A company signs a 12-month subscription for $1,200 and gets paid upfront today.
Under accrual accounting, revenue may be recognized as $100 per month, not $1,200 on day one.

**What this means for investors:**
You cannot assume "profit equals cash." Later, the cash flow statement will reconcile this.

### B) Standardized vs As Reported
Many finance platforms show two views:
- **As Reported**: exactly as in filings (10-K/10-Q)
- **Standardized**: reclassified into a common template for comparability across companies

**Investor habit:**
Use standardized for quick comparisons. Use as reported (and footnotes) for deep diligence.
            `
        },
        {
            id: "waterfall",
            title: "3. The Profitability Waterfall",
            content: `
Think of the income statement like a waterfall:

**Revenue**
- Cost of Revenue
= **Gross Profit**
- Operating Expenses (SG&A, R&D, etc.)
= **Operating Income** (EBIT)
+/- Non-operating items (interest, other gains/losses)
= **Pretax Income** (EBT)
- Income Tax Expense
= **Net Income**
Divide by shares
= **EPS** (Earnings Per Share)

Each layer answers a different question:
- **Gross Profit**: "Does the product have strong unit economics?"
- **Operating Income**: "Is the business model profitable after running the company?"
- **Net Income**: "What remains after financing choices and taxes?"
- **EPS**: "How much profit belongs to each share I own?"
            `
        },
        {
            id: "line-items-1",
            title: "5. Operating Section: Revenue to Operating Income",
            content: `
### 5.1 Revenue (Sales)
Total value of goods/services delivered. Quality matters: recurring vs one-time, contractual vs usage-based.

### 5.2 Revenue Growth (YoY)
Year-over-year percentage change.
Formula: (Revenue this period - Revenue last year) / Revenue last year.

### 5.3 Cost of Revenue (COGS)
Direct costs to deliver the product (materials, hosting, support). If sales rise, this usually rises.

### 5.4 Gross Profit
Profit after direct costs. **Formula:** Revenue - COGS.
Shows if the product itself is economically attractive.

### 5.5 Selling, General & Admin (SG&A)
Costs of selling and running the corporate org (marketing, HR, legal, rent). Look for operating leverage here.

### 5.6 Research & Development (R&D)
Spending to create future products. Cutting R&D boosts near-term profit but hurts long-term growth.

### 5.7 Operating Income (EBIT)
Profit from core operations. **Formula:** Gross Profit - Operating Expenses.
Removes noise from debt and taxes.
            `
        },
        {
            id: "non-operating",
            title: "6. Non-Operating Section",
            content: `
### 6.1 Interest Expense
Cost of borrowing. High interest can signal risk.

### 6.2 Interest Income
Income from cash/investments. Not "core operations."

### 6.3 Other Non-Operating
Catch-all for FX gains, settlements, etc. If large/frequent, investigate.
            `
        },
        {
            id: "taxes",
            title: "8. Taxes and Net Income",
            content: `
### 8.1 Pretax Income (EBT)
Operating Income +/- Non-operating items.

### 8.2 Income Tax Expense
Taxes recorded (may differ from cash taxes paid).

### 8.3 Net Income
The "Bottom Line". **Formula:** Pretax Income - Taxes.
Influenced by one-time items, tax strategy, and debt.
            `
        },
        {
            id: "per-share",
            title: "9. Per-Share Mechanics (EPS)",
            content: `
### 9.1 Shares Outstanding (Basic vs Diluted)
**Basic**: Actual shares outstanding.
**Diluted**: Includes potential dilution from options/RSUs. **Diluted** is more conservative for investors.

### 9.2 Shares Change (YoY)
Rising shares = dilution (bad for EPS). Falling shares = buybacks (good for EPS).

### 9.4 EPS (Earnings Per Share)
Profit allocated per share.
**Formula:** Net Income / Weighted Avg Shares.
EPS growth is often more important to stock price than total Net Income growth.
            `
        },
        {
            id: "margins",
            title: "11. Margins: The Efficiency Dashboard",
            content: `
Margins turn dollars into percentages for comparability.

- **Gross Margin**: Gross Profit / Revenue. Efficiency of production.
- **Operating Margin**: Operating Income / Revenue. Efficiency of operations.
- **Net Margin**: Net Income / Revenue. Final profitability.
            `
        }
    ],
    glossary: [
        { term: "Revenue", definition: "Total value of goods/services delivered.", formula: "Price × Quantity" },
        { term: "COGS", definition: "Direct costs of producing goods/services.", formula: "Materials + Direct Labor" },
        { term: "Gross Profit", definition: "Revenue minus COGS.", formula: "Revenue - COGS" },
        { term: "SG&A", definition: "Selling, General, and Administrative expenses.", formula: "Marketing + Salaries + Rent" },
        { term: "R&D", definition: "Research and Development expenses.", formula: "Engineering salaries + Prototype costs" },
        { term: "Operating Income", definition: "Profit from core operations before interest/tax.", formula: "Gross Profit - OpEx" },
        { term: "EBITDA", definition: "Earnings Before Interest, Taxes, Depreciation, Amortization.", formula: "Operating Income + D&A" },
        { term: "Pretax Income", definition: "Earnings before income taxes.", formula: "Operating Income - Interest" },
        { term: "Net Income", definition: "The bottom line profit.", formula: "Pretax Income - Taxes" },
        { term: "EPS", definition: "Earnings Per Share.", formula: "Net Income / Shares Outstanding" },
        { term: "Dilution", definition: "Reduction in ownership % due to new shares issued.", formula: "N/A" }
    ],
    quiz: [
        {
            id: 1,
            question: "If Revenue is $100 and COGS is $40, what is the Gross Profit?",
            options: ["$40", "$60", "$140", "$100"],
            correctAnswer: "$60",
            explanation: "Gross Profit = Revenue ($100) - COGS ($40) = $60."
        },
        {
            id: 2,
            question: "Which item is NOT part of Operating Expenses?",
            options: ["Marketing", "R&D", "Interest Expense", "Salaries"],
            correctAnswer: "Interest Expense",
            explanation: "Interest Expense is a non-operating item (financing cost), not an operating expense."
        },
        {
            id: 3,
            question: "If Net Income is $10M and Shares Outstanding are 2M, what is the EPS?",
            options: ["$0.20", "$2.00", "$5.00", "$20.00"],
            correctAnswer: "$5.00",
            explanation: "EPS = Net Income / Shares = $10M / 2M = $5.00."
        },
        {
            id: 4,
            question: "True or False: Profit always equals Cash Flow.",
            options: ["True", "False"],
            correctAnswer: "False",
            explanation: "Due to accrual accounting (e.g., selling on credit), profit is recorded when earned, not necessarily when cash is received."
        },
        {
            id: 5,
            question: "Company A has 10% Net Margin. Company B has 5% Net Margin. Which is more efficient at turning revenue into profit?",
            options: ["Company A", "Company B"],
            correctAnswer: "Company A",
            explanation: "A higher net margin (10%) means the company keeps more profit for every dollar of revenue."
        }
    ]
};
