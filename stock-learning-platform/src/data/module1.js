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
            id: "apple-case-study",
            title: "Case Study: Apple Inc. (FY2025)",
            content: `
Let's apply this to a real company. **Apple (AAPL)** is the gold standard for financial strength. Here is what their Fiscal Year 2025 looked like:

> [!NOTE]
> **Data Source:** Apple FY2025 10-K Filing. Numbers are in Billions USD.

### 1. The Top Line (Revenue)
Apple reported **$416.2 Billion** in total revenue.
- This grew **6.4%** from 2024.
- **iPhone sales** are the biggest driver, but **Services** (iCloud, App Store) are growing fast.

### 2. The Expenses
- **Cost of Revenue**: It cost apple roughly **$220 Billion** to make those iPhones and MacBooks.
- **Operating Expenses**: They spent about **$60 Billion** on R&D (inventing new chips), Marketing, and paying their employees.

### 3. The Bottom Line (Net Income)
After paying all costs and taxes, Apple had **$112.0 Billion** in Net Income.
- That is a massive **27% Net Margin**.
- For every $1 you pay Apple, they keep 27 cents in pure profit.

[MARGIN_CHART]

### Why this is impressive
Most hardware companies have net margins of 5-10%. Apple's 27% is unheard of for a company selling physical products. It shows they have **Pricing Power**—people love the brand enough to pay higher prices.
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
Apple's EPS for 2025 was **$7.46**. This means for every share of Apple stock you held, the company earned $7.46 in profit.
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
