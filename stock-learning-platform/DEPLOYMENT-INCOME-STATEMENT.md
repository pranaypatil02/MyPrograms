# Income Statement Tutor - Deployment Guide

## ⚠️ IMPORTANT UPDATE

The Income Statement Tutor has been **integrated as a component** into the main `stock-learning-platform` application. It is no longer a standalone Next.js app.

## Current Architecture

### What's Integrated
- **Component**: `src/components/IncomeStatementTutor.jsx` (in main app)
- **Location**: Appears in Fundamentals page under "Earnings Statement" tab
- **Data**: Uses static sample data (no external API needed)
- **Self-contained**: All 4 modes (Learn, Build, Analyze, Valuation) work standalone

### What's Standalone (Optional)
- **Standalone App**: `income-statement-tutor/` folder contains a full Next.js app
- **Purpose**: Can be deployed separately for dedicated use
- **Features**: Same 4 modes but as separate pages with full routing

## Deployment Options

### Option 1: Deploy Main App with Integrated Component (Recommended)

The Income Statement Tutor component is already part of your main application. Simply deploy the main `stock-learning-platform` app:

**To Deploy:**
```bash
cd stock-learning-platform

# Build your main app (React/Vite/Next.js - adjust as needed)
npm install
npm run build

# Deploy the built files to Hostinger via FTP/SSH
```

**What Users See:**
- Navigate to Fundamentals page
- Click "Earnings Statement" tab
- All 4 Income Statement Tutor modes available in one interface

### Option 2: Deploy Standalone Next.js App (Advanced)

If you want a dedicated Income Statement Tutor site:

```bash
cd income-statement-tutor

# Build the standalone app
npm install
npm run build

# Deploy using the automated scripts
npm run deploy
```

See `income-statement-tutor/DEPLOYMENT.md` for detailed instructions.

## Files to Deploy (Main App Integration)

When deploying the main `stock-learning-platform` app, ensure these files are included:

```
stock-learning-platform/
├── src/
│   ├── components/
│   │   └── IncomeStatementTutor.jsx  ← The integrated component
│   └── pages/
│       └── Fundamentals.jsx          ← Already imports the component
├── package.json
└── ... (rest of your app files)
```

## No External Dependencies Required

✅ **The integrated component:**
- Uses static sample data (no database needed)
- No API calls to external services
- No environment variables required
- Works immediately after deployment

## Testing Before Deployment

1. **Local Test:**
   ```bash
   cd stock-learning-platform
   npm run dev
   ```

2. **Navigate to:** `http://localhost:3000/fundamentals` (or your local dev port)

3. **Verify:**
   - Click "Earnings Statement" tab
   - Test all 4 modes (Learn, Build, Analyze, Valuation)
   - Ensure charts render correctly
   - Check all interactive features work

## Hostinger Deployment Steps

### For Main App (React/Vite):

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to Hostinger via:
   - File Manager in cPanel
   - FTP client
   - Or SSH/Git

3. **Point domain** to the uploaded folder

### For Main App (Next.js):

Follow the same steps as in `income-statement-tutor/DEPLOYMENT.md` but for the main app directory.

## Architecture Notes

**Why Two Versions?**
- **Integrated Component**: For users who want the tutor as part of a larger platform
- **Standalone App**: For deploying as a dedicated educational tool

**Both versions:**
- Share the same core logic
- Use static data (no backend needed)
- Have  identical features
- Work independently

## Troubleshooting

**Component not showing in Fundamentals:**
- Verify `IncomeStatementTutor.jsx` is in `src/components/`
- Check import in `Fundamentals.jsx`: `import IncomeStatementTutor from '../components/IncomeStatementTutor';`
- Ensure component is rendered when `activeModule === 'earnings'`

**Charts not rendering:**
- Verify `recharts` is installed: `npm install recharts`
- Check browser console for errors
- Ensure `react-icons` is installed: `npm install react-icons`

**Styles look different:**
- The component uses Tailwind CSS classes
- Ensure your main app has Tailwind CSS configured

## Summary

✅ **What to Deploy:** Your main `stock-learning-platform` app  
✅ **Where Component Lives:** `src/components/IncomeStatementTutor.jsx`  
✅ **How to Access:** Fundamentals page → "Earnings Statement" tab  
✅ **Dependencies:** None (static data, self-contained)  

The standalone Next.js app in `income-statement-tutor/` is optional and only needed if you want a separate, dedicated deployment.
