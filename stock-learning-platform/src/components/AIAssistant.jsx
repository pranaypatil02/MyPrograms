import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaLightbulb } from 'react-icons/fa';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      text: 'Hi! I\'m your AI investing assistant. Ask me anything about stock analysis, financial metrics, or investing concepts!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  // Simulated AI responses based on keywords
  const getAIResponse = (question) => {
    const q = question.toLowerCase();

    // P/E Ratio
    if (q.includes('p/e') || q.includes('price to earnings')) {
      return `Great question! The P/E (Price-to-Earnings) ratio is like asking "How many years of profit does this stock cost?"

**Simple explanation:** If a stock costs $100 and the company makes $10 per share annually, the P/E is 10. It would take 10 years of earnings to "pay back" your investment.

**What's good?**
- Tech stocks: P/E of 20-30 is normal (growth premium)
- Banks: P/E of 10-15 is typical
- Below sector average = potentially undervalued
- Above sector average = might be overpriced (or high growth expected)

**Red flags:** P/E over 50 might indicate speculation, unless growth justifies it (like Tesla or Amazon in early days).`;
    }

    // EPS
    if (q.includes('eps') || q.includes('earnings per share')) {
      return `EPS (Earnings Per Share) is one of the most important numbers in investing!

**Simple explanation:** It's the company's profit divided by number of shares. If you own one share, this is "your slice" of the profit.

**Example:**
- Company makes $1 billion profit
- Has 100 million shares
- EPS = $1B ÷ 100M = $10 per share

**Why it matters:**
- Growing EPS = company getting more profitable ✓
- Shrinking EPS = trouble ahead ⚠️
- Compare EPS to stock price to get P/E ratio

**Pro tip:** Look for consistent EPS growth (5-10% annually is solid for mature companies, 20%+ for growth stocks).`;
    }

    // DCF
    if (q.includes('dcf') || q.includes('discounted cash flow')) {
      return `DCF is how professionals value companies! It sounds complex but the idea is simple.

**Core concept:** Money today is worth more than money tomorrow (you could invest it and earn returns). DCF calculates what future profits are worth TODAY.

**The process:**
1. Estimate future cash flows (next 5-10 years)
2. Pick a "discount rate" (usually 8-12%)
3. Calculate what those future dollars are worth now
4. Add it up = fair value!

**Example:** $100 one year from now, with 10% discount rate, is worth $90.91 today.

**When to use:** Best for stable, predictable companies. Don't use DCF for startups (too uncertain) or banks (different model needed).

Try our DCF calculator in the Valuation Tools section!`;
    }

    // ROE/ROA/ROIC
    if (q.includes('roe') || q.includes('roa') || q.includes('roic') || q.includes('return on')) {
      return `These are the "efficiency ratings" for companies!

**ROE (Return on Equity):**
How well does the company use shareholders' money?
- 15%+ is excellent
- 10-15% is good
- Below 10% might be struggling

**ROA (Return on Assets):**
How efficiently does it use everything it owns?
- 8%+ is great
- 5-8% is decent
- Below 5% = not using assets well

**ROIC (Return on Invested Capital):**
The most comprehensive - includes debt too!
- 12%+ is outstanding
- 8-12% is solid
- Below 8% = capital not being used efficiently

**Quick comparison:** Warren Buffett loves companies with ROE > 15% consistently. It means they're compounding shareholders' wealth effectively!`;
    }

    // Balance Sheet
    if (q.includes('balance sheet')) {
      return `The Balance Sheet is like a company's "financial snapshot" at one moment in time!

**The equation:** Assets = Liabilities + Equity

**Think of it like your personal finances:**
- **Assets:** What you own (cash, house, car)
- **Liabilities:** What you owe (mortgage, credit cards)
- **Equity:** Your true net worth (assets - liabilities)

**What to look for:**
✓ More current assets than current liabilities (can pay bills)
✓ Reasonable debt levels (debt-to-equity under 2.0 for most industries)
✓ Growing equity over time
⚠️ Too much goodwill (from acquisitions)
⚠️ Rising debt faster than assets

**Pro tip:** Compare to the income statement - is the company profitable but the balance sheet deteriorating? That's a red flag!`;
    }

    // Undervalued stocks
    if (q.includes('undervalued') || q.includes('find good stocks')) {
      return `Finding undervalued stocks is the holy grail of investing! Here's how to spot them:

**Key metrics to check:**
1. **P/E ratio** below sector average
2. **P/B ratio** under 1.5 (trading below book value)
3. **PEG ratio** under 1.0 (growth vs valuation)
4. **Dividend yield** higher than market average
5. **FCF yield** over 5%

**But also verify:**
✓ Revenue and earnings actually growing
✓ Manageable debt levels
✓ Competitive advantages (moat)
✓ Good management track record

**Red flags that explain "cheap" price:**
- Declining market share
- Accounting irregularities
- Lawsuit risks
- Disruption threats

**Remember:** Sometimes stocks are cheap for good reason! Do your homework. Use our valuation tools to analyze any stock you're considering.`;
    }

    // Risk management
    if (q.includes('risk') || q.includes('diversif')) {
      return `Risk management is what separates successful long-term investors from gamblers!

**Golden rules:**
1. **Diversify:** Don't put all eggs in one basket
   - At least 15-20 different stocks
   - Multiple sectors
   - Mix of growth and value

2. **Position sizing:** No single stock over 5-10% of portfolio

3. **Know your risk tolerance:**
   - Young = can take more risk
   - Near retirement = more conservative

4. **Types of risk:**
   - **Company risk:** One company fails
   - **Sector risk:** Whole industry struggles
   - **Market risk:** Entire market drops
   - **Diversification protects against first two!**

5. **Use stop losses:** Set price where you'll sell if wrong

**Buffett's wisdom:** "Rule #1: Don't lose money. Rule #2: Don't forget rule #1."`;
    }

    // Sectors
    if (q.includes('sector') || q.includes('industry')) {
      return `Different sectors behave differently - understanding this is key!

**Defensive (stable in recessions):**
- Healthcare
- Utilities
- Consumer Staples
- Low P/E, steady dividends

**Cyclical (tied to economy):**
- Consumer Discretionary
- Industrials
- Materials
- Volatile, higher risk/reward

**Growth (high valuations):**
- Technology
- Communication Services
- High P/E justified by rapid growth

**Financial (unique):**
- Banks, insurance
- Sensitive to interest rates
- High debt is normal!

**Energy:**
- Commodity-driven
- Geopolitical factors
- ESG concerns

**Pro tip:** Sector rotation strategy - shift to defensive sectors when recession looms, cyclical during recovery. Check our Sectors page for detailed comparison!`;
    }

    // Market cap
    if (q.includes('market cap')) {
      return `Market cap = what the stock market thinks the entire company is worth!

**Formula:** Share Price × Total Shares Outstanding

**Size categories:**
- **Mega Cap:** $200B+ (Apple, Microsoft)
  - Most stable, lower growth
- **Large Cap:** $10B-$200B
  - Established, moderate growth
- **Mid Cap:** $2B-$10B
  - Growth potential, more volatile
- **Small Cap:** $300M-$2B
  - High growth potential, risky
- **Micro Cap:** Under $300M
  - Very risky, can be home runs or zeros

**Risk/Return tradeoff:**
Small caps can 10x but also go bankrupt. Large caps rarely go to zero but also rarely 10x.

**Diversification tip:** Mix of sizes reduces risk. Young investors can take more small-cap risk; near retirement should emphasize large caps.`;
    }

    // Default response
    return `That's an interesting question! While I can help with many investing topics, let me suggest some areas I'm great at:

📊 **Financial Metrics:** P/E ratio, EPS, ROE, DCF, and more
📈 **Valuation:** How to determine if a stock is overvalued or undervalued
🏢 **Sectors:** Understanding different industries and their metrics
📚 **Fundamentals:** Balance sheets, cash flow, income statements
⚖️ **Risk:** Diversification and risk management strategies

Try asking questions like:
- "What is a good P/E ratio?"
- "How do I find undervalued stocks?"
- "What's the difference between ROE and ROA?"
- "Should I invest in tech or finance sector?"

Or explore our interactive tools in the Valuation and Sectors sections!`;
  };

  const handleSend = (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        text: getAIResponse(textToSend),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const quickQuestions = [
    "What is a good P/E ratio?",
    "Explain DCF in simple terms",
    "How do I find undervalued stocks?",
    "What's the difference between ROE and ROA?"
  ];

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-50 flex items-center gap-2"
        >
          <FaRobot className="text-2xl" />
          <span className="font-semibold">AI Assistant</span>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaRobot className="text-2xl" />
                <div>
                  <h3 className="font-bold">AI Investing Assistant</h3>
                  <p className="text-xs text-blue-100">Ask me anything about investing</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800 shadow-md'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick questions */}
            {messages.length === 1 && (
              <div className="p-3 bg-yellow-50 border-t border-yellow-200">
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <FaLightbulb className="text-yellow-600" /> Quick questions:
                </p>
                <div className="space-y-1">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handleSend(q);
                      }}
                      className="text-xs bg-white hover:bg-gray-100 text-gray-700 px-2 py-1 rounded block w-full text-left transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about investing..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
