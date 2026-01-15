# Income Statement Tutor

A comprehensive web application for learning income statements and performing advanced financial analysis. Built for beginners who want interactive explanations and advanced users who need normalization and valuation tools.

## 🎯 Features

### 1. Learn Mode
- Interactive income statement with tooltips and expandable sections
- Step-by-step walkthrough through revenue, expenses, margins, and net income
- Short quizzes with detailed explanations
- Backed by SEC, IFRS IAS 1, and US GAAP ASC 205 definitions

### 2. Statement Builder
- Manual entry using simple or standard templates
- Multi-period comparison views
- Real-time formula validation (Revenue - COGS = Gross Profit, etc.)
- Currency selection and negative number handling

### 3. Analysis Tools
- Margin calculations (gross, operating, net)
- Common-size statements (every line as % of revenue)
- Driver summaries in plain English
- Auto-generated insights based on margin performance

### 4. Valuation Add-ons
- Normalization workspace for adjusting non-recurring items
- FCFF bridge calculator following Damodaran methodology:
  - After-Tax Operating Income = Operating Income × (1 - Tax Rate)
  - FCFF = After-Tax OI + Non-Cash Charges - CapEx - ΔWC
- CSV export for statements and computed metrics

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database**: SQLite via Prisma ORM
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **Validation**: Zod

## 📦 Installation

```bash
# Clone the repository
cd income-statement-tutor

# Install dependencies
npm install

# Set up the database
npm run db:generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📊 Sample Data

The application comes pre-seeded with **Tech Innovators Inc.** (TECH):

| Period | Revenue | Gross Margin | Operating Margin | Net Margin | Net Income | EPS |
|--------|---------|--------------|------------------|-----------|------------|-----|
| FY 2023 | $10.0M | 60.0% | 25.0% | 19.0% | $1.90M | $1.90 |
| FY 2024 | $12.0M | 60.0% | 26.7% | 20.9% | $2.50M | $2.50 |

**Growth Metrics:**
- Revenue growth: 20%
- Net income growth: 32%
- Operating margin expansion: +1.7%

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

**Test Coverage:**
- Core formula calculations (gross profit, operating income, margins)
- Validation logic (rol up checks)
- FCFF bridge calculations
- Edge cases (zero revenue, negative values, rounding)

**Test Results:** ✅ 27 tests passing

## 📁 Project Structure

```
income-statement-tutor/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data
├── src/
│   ├── app/                   # Next.js pages & API routes
│   │   ├── api/
│   │   │   ├── companies/     # Company CRUD
│   │   │   └── statements/    # Analysis endpoints
│   │   ├── learn/             # Learn mode (planned)
│   │   ├── builder/           # Statement builder (planned)
│   │   ├── analysis/          # Analysis dashboard (planned)
│   │   └── valuation/         # Valuation workspace (planned)
│   ├── components/            # React components (planned)
│   ├── lib/
│   │   ├── formulas/
│   │   │   ├── core.ts        # Income statement calculations
│   │   │   └── valuation.ts   # FCFF bridge & normalization
│   │   ├── formatting.ts      # Currency & number formatting
│   │   └── prisma.ts          # Database client
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── tests/
│   ├── formulas.test.ts       # Core formula tests
│   └── valuation.test.ts      # Valuation tests
└── README.md
```

## 🔬 Formula Reference

### Income Statement Structure

```
Revenue
- Cost of Goods Sold (COGS)
= Gross Profit
- Operating Expenses (R&D, S&M, G&A)
= Operating Income (EBIT)
+/- Non-Operating Items (Interest, Investments)
= Pre-Tax Income
- Income Tax Expense
= Net Income
```

### Margin Calculations

- **Gross Margin** = (Gross Profit / Revenue) × 100
- **Operating Margin** = (Operating Income / Revenue) × 100
- **Net Margin** = (Net Income / Revenue) × 100

### FCFF Bridge (Damodaran Methodology)

```
Operating Income
× (1 - Tax Rate)
= After-Tax Operating Income
+ Non-Cash Charges (D&A, Stock-Based Comp)
- Capital Expenditures
- Change in Working Capital
= Free Cash Flow to Firm (FCFF)
```

## 🎓 Authoritative References

- [SEC Beginner's Guide to Financial Statements](https://www.sec.gov/oiea/investor-alerts-and-bulletins/ib_beginnersinvestinghow-to-read-a-10-k)
- [IFRS IAS 1 - Presentation of Financial Statements](https://www.ifrs.org/issued-standards/list-of-standards/ias-1-presentation-of-financial-statements/)
- [US GAAP ASC Topic 205 - Presentation of Financial Statements](https://viewpoint.pwc.com/us/en/fasb_financial/asc_topic_subtopic_landing_pages/205.html)
- [Damodaran Valuation Materials](http://pages.stern.nyu.edu/~adamodar/)

## 📝 API Reference

### Get All Companies

```http
GET /api/companies
```

**Response:**
```json
{
  "companies": [
    {
      "id": "...",
      "name": "Tech Innovators Inc.",
      "ticker": "TECH",
      "currency": "USD",
      "statements": [...]
    }
  ]
}
```

### Get Company by ID

```http
GET /api/companies/:id
```

### Analyze Statement

```http
GET /api/statements/:id/analysis
```

**Response:**
```json
{
  "statementId": "...",
  "period": "FY 2024",
  "margins": {
    "grossMargin": 60.0,
    "operatingMargin": 26.7,
    "netMargin": 20.9,
    "revenue": 12000000,
    "grossProfit": 7200000,
    "operatingIncome": 3200000,
    "netIncome": 2504300
  },
  "commonSize": {
    "period": "FY 2024",
    "revenue": 12000000,
    "lineItems": [...]
  },
  "insights": [
    "Strong gross margin of 60.0% indicates excellent pricing power...",
    "Operating margin of 26.7% demonstrates strong operational efficiency."
  ]
}
```

## 🚀 Extending to XBRL Import

The application is architected to support XBRL import in the future. Here's how to add it:

1. **Install XBRL Parser**: `npm install xbrl`

2. **Create XBRL Import Endpoint**: `/api/import/xbrl`

3. **Map XBRL Concepts to Line Items**:
```typescript
const conceptMapping = {
  'us-gaap:Revenues': 'REVENUE',
  'us-gaap:CostOfRevenue': 'COGS',
  'us-gaap:GrossProfit': 'GROSS_PROFIT',
  'us-gaap:OperatingExpenses': 'OPERATING_EXPENSE',
  'us-gaap:OperatingIncomeLoss': 'OPERATING_INCOME',
  'us-gaap:IncomeTaxExpenseBenefit': 'TAX',
  'us-gaap:NetIncomeLoss': 'NET_INCOME',
};
```

4. **Parse and Store**: Extract values from XBRL, create `IncomeStatement` and `LineItem` records

5. **Validate**: Run `validateIncomeStatement()` to ensure rollup correctness

## 🎯 Current Status & Next Steps

### ✅ Completed
- [x] Project setup (Next.js + TypeScript + Prisma)
- [x] Database schema with Company, IncomeStatement, LineItem, Adjustment, ValuationInput
- [x] Seed data with 2-year sample company
- [x] Core formula engine with 27 passing tests
- [x] Valuation functions (FCFF bridge, normalization)
- [x] API routes for companies and analysis
- [x] TypeScript type definitions
- [x] Formatting utilities

### 🚧 In Progress / To Do
- [ ] Learn mode UI components (Interactive Statement, Walkthrough, Quizzes)
- [ ] Statement builder UI with templates
- [ ] Analysis dashboard with charts (Recharts)
- [ ] Valuation workspace UI
- [ ] Landing page with mode cards
- [ ] Additional API routes (statements CRUD, adjustments, valuation inputs)
- [ ] CSV export functionality
- [ ] Quiz question database
- [ ] Educational content (tooltips, definitions)

## 🤝 Contributing

This is an MVP implementation. Key areas for contribution:

1. **UI/UX**: Build out the four mode pages (Learn, Builder, Analysis, Valuation)
2. **Content**: Add quiz questions and educational tooltips
3. **Features**: Multi-currency support, industry benchmarks, forecasting
4. **Testing**: Component tests, E2E tests
5. **XBRL**: Implement import functionality

## 📄 License

MIT

## 👥 Credits

Built following guidance from:
- SEC investor education materials
- IFRS Foundation standards
- FASB US GAAP codification
- Aswath Damodaran's valuation frameworks

---

**Note**: This is an MVP focused on core functionality. The formula engine and database are production-ready. UI components for the four modes (Learn, Builder, Analysis, Valuation) are outlined in the architecture but require implementation. See the implementation plan and project structure for extension points.
