export const MODULE_2_CONTENT = {
    title: "Balance Sheet Basics",
    sections: [
        {
            id: "intro",
            title: "1. What is a Balance Sheet?",
            content: `
### A Snapshot in Time 📸
Think of a Balance Sheet like a **photo** of a company's financial health at a single specific moment (e.g., "as of December 31st").

### Balance Sheet
- **Timing:** A specific date (Snapshot)
- **What it shows:** What we OWN vs what we OWE
- **Analogy:** Your bank account balance right now

### vs Income Statement
- **Timing:** A period of time (Video)
- **What it shows:** Profit and Loss
- **Analogy:** Your salary earned over a year

> [!NOTE]
> **Why Investors Care:** It tells you if a company is **solvent** (can pay its debts) and **liquid** (has cash ready to use). It answers the question: "If we stopped doing business today, what would be left?"
            `
        },
        {
            id: "equation",
            title: "2. The Core Equation ⚖️",
            content: `
### Assets = Liabilities + Equity
**The Golden Rule of Accounting**

- **Assets**: What the company **OWNS**
- **Liabilities**: What the company **OWES**
- **Equity**: What is left for **OWNERS**

### Example: "Lemonade Stand Inc."
*   Cash in Box (Asset): $100
*   Owe Dad for Lemons (Liability): $40
*   Value for You (Equity): $60

**$100 (Assets) = $40 (Liab) + $60 (Equity)** ✅
            `
        },
        {
            id: "assets",
            title: "3. Assets Section 💰",
            content: `
Assets are ordered by **Liquidity** — how fast they can be turned into cash.

### Current Assets (Used within 1 year)
- 💵 **Cash & Equivalents:** Money in the bank.
- 🤝 **Accounts Receivable:** I.O.U.s from customers who bought goods but haven't paid yet.
- 📦 **Inventory:** Goods sitting on shelves waiting to be sold.
- 🗓️ **Prepaid Expenses:** Bills paid in advance (like insurance for the year).

### Non-Current Assets (Long-term)
- 🏭 **Property, Plant & Equipment (PP&E):** Factories, trucks, computers ("Hard" assets).
- 🧠 **Intangible Assets:** Patents, trademarks, brand value.
- 🤝 **Goodwill:** Premium paid when buying another company above its fair value.
            `
        },
        {
            id: "liabilities",
            title: "4. Liabilities Section 💳",
            content: `
Liabilities are ordered by **Maturity** — when they must be paid back.

### Current Liabilities (Due in less than 1 year)
- 🧾 **Accounts Payable:** Money owed to suppliers (e.g., for raw materials).
- ⏱️ **Accrued Expenses:** Bills incurred but not yet paid (e.g., employee wages).
- ⏳ **Short-term Debt:** Loans due clearly soon.
- 🎟️ **Deferred Revenue:** Cash received but service not yet accumulated.

### Non-Current Liabilities (Due after 1 year)
- 🏦 **Long-term Debt:** Bonds or bank loans spanning years.
- 🏢 **Lease Liabilities:** Rent payments owed in the future.

> [!TIP]
> **Why is Deferred Revenue a Liability?**
> Imagine you sell a 1-year magazine subscription for $120. You got the cash, but you still **OWE** the customer 12 magazines. Until you deliver them, that money is a liability (obligation).
            `
        },
        {
            id: "equity",
            title: "5. Shareholders' Equity 🍰",
            content: `
This is the "Book Value" of the company — what belongs to owners.

### Common Stock & APIC
Money originally invested by shareholders. "Additional Paid-In Capital" (APIC) is the excess paid over the arbitrary "par value" of shares.

### Retained Earnings 💰
The accumulated profits the company has kept since day 1.
\`Retained Earnings = Sum of all Net Income - All Dividends Paid\`

### Accumulated Other Comprehensive Income
Gains/losses not yet "realized" (e.g., currency exchange fluctuations).

### Treasury Stock
Stock the company bought back from investors (Wait, this is a negative number!). It reduces equity because the company paid out cash to retire shares.
            `
        },
        {
            id: "connections",
            title: "6. Connecting the Statements 🔗",
            content: `
Financial statements don't exist in a vacuum. They feed into each other.

1. **Net Income → Retained Earnings:** The "bottom line" from the Income Statement is added to Retained Earnings on the Balance Sheet (after subtracting dividends).
2. **CapEx → PP&E:** Capital Expenditure (spending) from the Cash Flow Statement increases Property, Plant & Equipment on the Balance Sheet.
3. **Depreciation:** An expense on the Income Statement that **lowers** the value of PP&E assets on the Balance Sheet over time.
4. **Working Capital:** Changes in Receivables, Inventory, and Payables on the Balance Sheet determine the "Operating Cash Flow" line on the Cash Flow Statement.
            `
        },
        {
            id: "tips",
            title: "7. Practical Reading Tips 🕵️‍♂️",
            content: `
### Where to Look First
- ✅ **Cash Balance:** Is it growing? Do they have enough to survive a downturn?
- ✅ **Debt Load:** Compare Total Debt to Equity. High leverage = High risk.
- ✅ **Working Capital:** Are Current Assets > Current Liabilities? (Safety check).
- ✅ **Equity Trend:** Is Retained Earnings growing consistently?

### 🚩 Major Red Flags
- ⚠️ **Shrinking Cash + Rising Debt:** A recipe for bankruptcy.
- ⚠️ **Receivables growing faster than Sales:** Customers aren't paying, or the company is stuffing channels.
- ⚠️ **Inventory Buildup:** Products aren't selling so they pile up in warehouses (risk of obsolescence).
- ⚠️ **Large Goodwill:** If it's huge relative to equity, they might be overpaying for acquisitions.
            `
        }
    ],
    glossary: [
        { term: "Assets", definition: "Everything the company owns that has value.", formula: "Liabilities + Equity" },
        { term: "Liabilities", definition: "All debts and obligations the company owes.", formula: "Assets - Equity" },
        { term: "Equity", definition: "The residual value belonging to shareholders.", formula: "Assets - Liabilities" },
        { term: "Current Assets", definition: "Assets expected to be converted to cash within one year.", formula: "N/A" },
        { term: "Current Liabilities", definition: "Obligations due within one year.", formula: "N/A" },
        { term: "Working Capital", definition: "Measure of short-term liquidity.", formula: "Current Assets - Current Liabilities" },
        { term: "Retained Earnings", definition: "Accumulated net income kept by the company.", formula: "Prior RE + Net Income - Dividends" }
    ],
    quiz: [
        {
            id: 1,
            question: "Which equation is correct?",
            options: [
                "Assets = Liabilities - Equity",
                "Assets + Liabilities = Equity",
                "Assets = Liabilities + Equity"
            ],
            correctAnswer: "Assets = Liabilities + Equity",
            explanation: "The fundamental accounting equation is Assets = Liabilities + Equity. It must always balance!"
        },
        {
            id: 2,
            question: "Is 'Inventory' a Current or Non-Current Asset?",
            options: [
                "Current Asset",
                "Non-Current Asset",
                "Liability"
            ],
            correctAnswer: "Current Asset",
            explanation: "Inventory is a Current Asset because the company expects to sell it for cash within one year."
        },
        {
            id: 3,
            question: "What does 'Accounts Payable' represent?",
            options: [
                "Money customers owe us",
                "Money we owe to suppliers",
                "Profits kept by the company"
            ],
            correctAnswer: "Money we owe to suppliers",
            explanation: "Accounts Payable is money the company owes to its vendors/suppliers for goods already received."
        },
        {
            id: 4,
            question: "If a company buys a machine for $1M cash, how does the Balance Sheet change?",
            options: [
                "Assets increase by $1M",
                "Assets decrease by $1M",
                "Total Assets stay the same"
            ],
            correctAnswer: "Total Assets stay the same",
            explanation: "Cash (Asset) goes down $1M, but PP&E (Asset) goes up $1M. The TOTAL Assets remain unchanged."
        },
        {
            id: 5,
            question: "Where do 'Retained Earnings' come from?",
            options: [
                "Sales Revenue",
                "Accumulated Net Income minus Dividends",
                "Money from bank loans"
            ],
            correctAnswer: "Accumulated Net Income minus Dividends",
            explanation: "Retained Earnings accumulates the Net Income (profit) earned over the company's life, less any dividends paid out."
        }
    ]
};
