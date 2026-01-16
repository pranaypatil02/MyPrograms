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
Income statements are \"flow statements.\" They tell a story over a specific period, usually a quarter (3 months) or a fiscal year (12 months).

### Why investors care
The income statement is the fastest way to answer:
- Is this business growing? 
- Is it profitable?
- Is it becoming more efficient over time?
- Are earnings high quality (repeatable) or boosted by one-time items?
            `
        },
        {
            id: "waterfall",
            title: "3. The Profitability Waterfall",
            content: `
Think of the income statement like a waterfall. You start with a big pool of money at the top (Revenue), and as it flows down, expenses are subtracted layer by layer until you reach the "Bottom Line" (Net Income).

[WATERFALL_CHART]

Each layer answers a different question:
- **Gross Profit**: "Does the product itself make money?"
- **Operating Income**: "Is the business profitable after paying the staff and rent?"
- **Net Income**: "What's left for shareholders after debt and the IRS?"
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
            title: "6. Non-Operating Items & Taxes",
            content: `
### 6.1 Interest Expense
The cost of borrowing money (debt). This is a "financing" cost, not an operating cost.
**Apple FY25:** ~$2.8B (Low because they have huge cash reserves).

### 6.2 Interest & Investment Income
Money earned from cash sitting in the bank or investments.
**Apple FY25:** ~$3.0B (Apple is like a bank with its cash pile).

### 6.3 Pretax Income (EBT)
Earnings Before Tax.
**Formula:** Operating Income + Interest Income - Interest Expense.
**Apple FY25:** ~$137B.

### 6.4 Income Tax Expense
The government's share.
**Apple FY25:** ~$25B.

### 6.5 Effective Tax Rate
The percentage of Pretax Income paid in taxes.
**Formula:** Tax Expense / Pretax Income.
**Apple FY25:** 25 / 137 ≈ **18.2%**.
            `
        },
        {
            id: "advanced-metrics",
            title: "7. Advanced Earnings Metrics (EBITDA)",
            content: `
### 7.1 Depreciation & Amortization (D&A)
Non-cash expenses representing the wear and tear of assets (factories, machines) or expiration of intangibles (patents).
**Where is it?** Usually buried inside COGS or SG&A, but added back for Cash Flow.

### 7.2 EBITDA
"Earnings Before Interest, Taxes, Depreciation, and Amortization."
**Formula:** Operating Income + D&A.
**Why it matters:** It gives a clearer picture of "operating cash flow" potential by removing accounting decisions (depreciation) and financing decisions (debt).
**Apple FY25 EBITDA:** ~$150B.

### 7.3 EBIT vs. Operating Income
Often used interchangeably, but EBIT technically includes non-operating income (like investment gains) before interest/taxes, while Operating Income is strictly core business.
            `
        },
        {
            id: "per-share",
            title: "10. Shareholder Returns (EPS & Dividends)",
            content: `
### 10.1 Shares Outstanding (Basic vs Diluted)
- **Basic:** Actual shares currently held by investors.
- **Diluted:** Includes "potential" shares from employee stock options. **Always use Diluted for valuation.**

### 10.2 EPS (Earnings Per Share)
The "Price tag" of profit.
**Formula:** Net Income / Diluted Shares.
**Apple FY25:** $112B / 15B shares ≈ **$7.46**.

### 10.3 Dividends
Cash returned directly to shareholders.
- **Dividend Per Share:** Amount paid for each share you own.
- **Dividend Yield:** Dividend / Stock Price. (Like an interest rate on your stock).

### 10.4 Share Buybacks (The "Silent" Return)
When a company uses cash to buy its own stock from the market and retires it.
- **Effect:** Reduces share count.
- **Result:** EPS goes UP even if Net Income stays flat (Same pie, fewer slices).
**Apple is the king of buybacks, reducing share count by ~3% every year.**
            `
        },
        {
            id: "apple-case-study",
            title: "Case Study: Apple Inc. (FY2025)",
            content: `
Let's see the full picture for **Apple (AAPL) FY2025**. Note how the "Bottom Line" isn't just one number—it's a journey.

> [!NOTE]
> **Data Source:** Apple FY2025 10-K. Values in Millions USD (except per share).

| Line Item | Value | Explanation |
| :--- | :--- | :--- |
| **Revenue** | **$416,200** | The Top Line. iPhone, Mac, Services. |
| Cost of Goods Sold | $(224,700)$ | Manufacturing, components, shipping. |
| **Gross Profit** | **$191,500** | **46% Gross Margin**. Very healthy. |
| R&D Expenses | $(34,500)$ | Investing in the future (AI, Vision Pro). |
| SG&A Expenses | $(28,000)$ | Marketing, Apples Stores, Admin. |
| **Operating Income** | **$129,000** | **31% Operating Margin**. Core profitability. |
| Interest & Other | $200 | Net of Interest Income vs Expense. |
| **Pretax Income** | **$129,200** | Earnings before Uncle Sam. |
| Tax Expense | $(18,200)$ | ~14.1% Effective Tax Rate. |
| **Net Income** | **$111,000** | **26.7% Net Margin**. The Bottom Line. |

[MARGIN_CHART]

### Key Takeaways
1.  **High Margins**: 26.7% Net Margin is elite for a hardware company.
2.  **Tax Efficient**: They pay a lower rate (14%) than the statutory US rate (21%).
3.  **Massive Scale**: $111 Billion in profit is roughly the GDP of a small country.
            `
        }
    ],
    glossary: [
        { term: "Revenue", definition: "Total value of goods/services delivered.", formula: "Price × Quantity" },
        { term: "COGS", definition: "Direct costs of producing goods/services.", formula: "Materials + Direct Labor" },
        { term: "Gross Profit", definition: "Revenue minus COGS.", formula: "Revenue - COGS" },
        { term: "OpEx", definition: "Operating Expenses (R&D, SG&A).", formula: "Sum of operating costs" },
        { term: "Operating Income", definition: "Profit from core operations.", formula: "Gross Profit - OpEx" },
        { term: "EBITDA", definition: "Earnings Before Interest, Taxes, Depreciation, Amortization.", formula: "Op Income + D&A" },
        { term: "D&A", definition: "Depreciation & Amortization (Non-cash expenses).", formula: "N/A" },
        { term: "Interest Expense", definition: "Cost of debt.", formula: "Debt × Interest Rate" },
        { term: "Pretax Income", definition: "Earnings before paying income tax.", formula: "Op Income - Interest" },
        { term: "Net Income", definition: "Bottom line profit.", formula: "Pretax Income - Taxes" },
        { term: "EPS", definition: "Earnings Per Share.", formula: "Net Income / Shares" },
        { term: "Dilution", definition: "Reduction in value due to more shares.", formula: "N/A" },
        { term: "Dividend", definition: "Cash paid to shareholders.", formula: "Total Payout / Shares" },
        { term: "Buyback", definition: "Company buying its own stock.", formula: "Reduces shares count" }
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
            question: "Apple had Net Income of $112B on $416B Revenue in 2025. What is their Net Margin?",
            options: ["10%", "27%", "50%", "15%"],
            correctAnswer: "27%",
            explanation: "Net Margin = Net Income / Revenue = 112 / 416 = 0.269 or ~27%."
        },
        {
            id: 3,
            question: "Which item is NOT part of Operating Expenses?",
            options: ["Marketing", "R&D", "Interest Expense", "Salaries"],
            correctAnswer: "Interest Expense",
            explanation: "Interest Expense is a non-operating item (financing cost), not an operating expense."
        },
        {
            id: 4,
            question: "If Net Income is $10M and Shares Outstanding are 2M, what is the EPS?",
            options: ["$0.20", "$2.00", "$5.00", "$20.00"],
            correctAnswer: "$5.00",
            explanation: "EPS = Net Income / Shares = $10M / 2M = $5.00."
        },
        {
            id: 5,
            question: "Why do investors prefer companies with high 'Pricing Power' like Apple?",
            options: ["They sell fewer products", "They have higher margins", "They have closer relationships with suppliers", "They pay less taxes"],
            correctAnswer: "They have higher margins",
            explanation: "Pricing power allows a company to charge more without losing customers, leading to higher gross and net margins."
        }
    ]
};
