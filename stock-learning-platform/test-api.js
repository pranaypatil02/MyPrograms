// Test script to verify Alpha Vantage API connection
// Run with: node test-api.js

// Load environment variables manually
import fs from 'fs';
import path from 'path';
import process from 'process';

// Read .env file
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');
let envContent = '';

  try {
    envContent = fs.readFileSync(envPath, 'utf8');
  } catch {
    console.log('.env file not found, checking for .env.example');
    try {
      envContent = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
    } catch {
      console.error('No environment files found');
      process.exit(1);
    }
  }

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

const API_KEY = envVars.VITE_ALPHA_VANTAGE_API_KEY;
const USE_MOCK_DATA = envVars.VITE_USE_MOCK_DATA === 'true';

console.log('=== Alpha Vantage API Test ===');
console.log(`API Key configured: ${API_KEY ? 'Yes' : 'No'}`);
console.log(`Use Mock Data: ${USE_MOCK_DATA}`);
console.log(`API Key (first 8 chars): ${API_KEY ? API_KEY.substring(0, 8) + '...' : 'N/A'}`);

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.log('\n❌ API key not configured or using placeholder');
  console.log('Get a free API key from: https://www.alphavantage.co/support/#api-key');
  console.log('Then update your .env file with: VITE_ALPHA_VANTAGE_API_KEY=your_real_key_here');
  process.exit(1);
}

if (USE_MOCK_DATA) {
  console.log('\n⚠️ Mock data is enabled. Set VITE_USE_MOCK_DATA=false in .env to use real API');
}

// Test API connection
async function testAPI() {
  console.log('\nTesting API connection...');
  
  const testSymbol = 'AAPL';
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${testSymbol}&apikey=${API_KEY}`;
  
  try {
    console.log(`Fetching data for ${testSymbol}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data['Error Message']) {
      console.log('❌ API Error:', data['Error Message']);
      return false;
    }
    
    if (data['Note']) {
      console.log('⚠️ API Rate Limit Note:', data['Note']);
      console.log('Free tier: 5 calls/minute, 500 calls/day');
    }
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      console.log('✅ API Connection Successful!');
      console.log(`Symbol: ${quote['01. symbol']}`);
      console.log(`Price: $${quote['05. price']}`);
      console.log(`Change: ${quote['09. change']} (${quote['10. change percent']})`);
      console.log(`Volume: ${quote['06. volume']}`);
      return true;
    } else {
      console.log('⚠️ Unexpected API response format:', JSON.stringify(data, null, 2).substring(0, 500));
      return false;
    }
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    return false;
  }
}

// Test multiple endpoints
async function runTests() {
  const apiTest = await testAPI();
  
  if (apiTest) {
    console.log('\n✅ All tests passed! Your Alpha Vantage API key is working correctly.');
    console.log('\nNext steps:');
    console.log('1. Update .env file: VITE_USE_MOCK_DATA=false');
    console.log('2. Run the app: npm run dev');
    console.log('3. Test the Portfolio Simulator or Comparison Tool');
  } else {
    console.log('\n❌ API test failed. Please check:');
    console.log('1. Your API key is correct');
    console.log('2. You haven\'t exceeded rate limits (5 calls/min, 500/day)');
    console.log('3. The Alpha Vantage service is available');
    console.log('\nFor now, the app will use mock data.');
  }
}

runTests();