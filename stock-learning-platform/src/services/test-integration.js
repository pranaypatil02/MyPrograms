/* eslint-env node */
// Test the Alpha Vantage integration
// Run with: node src/services/test-integration.js

// Mock import.meta.env
globalThis.import = {
  meta: {
    env: {
      VITE_ALPHA_VANTAGE_API_KEY: process.env.VITE_ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY_HERE',
      VITE_API_BASE_URL: 'https://www.alphavantage.co/query',
      VITE_USE_MOCK_DATA: 'false',
      VITE_CACHE_DURATION: '300000'
    }
  }
};

// Import the alphaVantage module
const alphaVantage = await import('./alphaVantage.js');

async function testStockQuote() {
  try {
    console.log('Testing stock quote...');
    const quote = await alphaVantage.getStockQuote('AAPL');
    console.log('✅ Quote success:', quote);
    return quote;
  } catch (error) {
    console.error('❌ Quote failed:', error.message);
    return null;
  }
}

async function testCompanyOverview() {
  try {
    console.log('Testing company overview...');
    const overview = await alphaVantage.getCompanyOverview('AAPL');
    console.log('✅ Overview success:', {
      name: overview.name,
      sector: overview.sector,
      marketCap: overview.marketCap,
      peRatio: overview.peRatio
    });
    return overview;
  } catch (error) {
    console.error('❌ Overview failed:', error.message);
    return null;
  }
}

async function testStockAnalysis() {
  try {
    console.log('Testing stock analysis...');
    const analysis = await alphaVantage.getStockAnalysis('AAPL');
    console.log('✅ Analysis success:', {
      symbol: analysis.symbol,
      quote: analysis.quote ? 'present' : 'null',
      overview: analysis.overview ? 'present' : 'null',
      timeSeriesLength: analysis.timeSeries?.length || 0,
      calculatedMetrics: analysis.calculatedMetrics
    });
    return analysis;
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('=== Alpha Vantage Integration Test ===');

  const quote = await testStockQuote();
  const overview = await testCompanyOverview();
  const analysis = await testStockAnalysis();

  console.log('\n=== Summary ===');
  if (quote && overview && analysis) {
    console.log('✅ All tests passed! The API integration is working.');
    console.log(`AAPL Price: $${quote.price}`);
    console.log(`Market Cap: ${overview.marketCap}`);
    console.log(`P/E Ratio: ${overview.peRatio}`);
  } else {
    console.log('❌ Some tests failed. Check API key and rate limits.');
  }
}

runTests().catch(console.error);