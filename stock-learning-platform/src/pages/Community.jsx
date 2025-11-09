import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaThumbsUp, FaComment, FaUser, FaClock, FaChartLine, FaLightbulb } from 'react-icons/fa';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [likedPosts, setLikedPosts] = useState([]);

  const categories = ['all', 'Analysis', 'Tutorial', 'Discussion', 'News'];

  const blogPosts = [
    {
      id: 1,
      title: 'Why Tesla\'s Valuation Is Controversial',
      category: 'Analysis',
      author: 'Sarah Chen',
      date: '2 days ago',
      likes: 245,
      comments: 38,
      excerpt: 'Breaking down Tesla\'s P/E ratio of 65 vs traditional automakers at 8-12. Is it justified by growth, or is it overvalued?',
      content: `Tesla trades at a P/E ratio significantly higher than traditional automakers. Here's why:

**Growth Premium**: Tesla is growing revenue 50%+ annually vs 5-10% for legacy automakers.

**Software & Energy**: Tesla isn't just a car company - it's betting on autonomous driving, energy storage, and solar.

**Market Leadership**: Commanding position in EVs with strong brand loyalty.

**Risks**: Competition intensifying, margins under pressure, regulatory challenges.

The debate: Is Tesla a tech company (deserving tech multiples) or an automaker (deserving auto multiples)?`,
      tags: ['Tesla', 'Valuation', 'EV', 'Technology']
    },
    {
      id: 2,
      title: 'How to Read a 10-K Filing Like a Pro',
      category: 'Tutorial',
      author: 'Michael Rodriguez',
      date: '5 days ago',
      likes: 412,
      comments: 67,
      excerpt: 'Step-by-step guide to extracting the most important information from annual reports without getting overwhelmed.',
      content: `10-K filings can be 200+ pages. Here's what to focus on:

**1. Business Section**: Understand what the company actually does, revenue streams, and competitive position.

**2. Risk Factors**: Often the most honest part. Look for material risks to the business model.

**3. MD&A (Management Discussion & Analysis)**: Management's view on results, trends, and outlook.

**4. Financial Statements**: The numbers - follow the cash flow, check debt levels, analyze margins.

**5. Footnotes**: Where details hide. Stock compensation, off-balance sheet items, accounting changes.

**Pro Tip**: Use Ctrl+F to search for keywords like "however," "challenging," or "difficult" to find concerning passages.`,
      tags: ['Tutorial', 'SEC Filings', '10-K', 'Due Diligence']
    },
    {
      id: 3,
      title: 'Understanding the Fed\'s Impact on Stock Valuations',
      category: 'Discussion',
      author: 'Dr. Emily Watson',
      date: '1 week ago',
      likes: 318,
      comments: 91,
      excerpt: 'Interest rates are the most important variable in valuation. Here\'s why the Fed matters so much to your portfolio.',
      content: `The Federal Reserve's decisions ripple through stock markets:

**Interest Rates & Discount Rates**: Higher rates = future cash flows worth less today = lower stock prices.

**The Math**: If discount rate goes from 8% to 10%, a stock's fair value can drop 20%+.

**Sector Impact**:
- Tech/Growth: Most sensitive (long-duration cash flows)
- Financials: Can benefit from higher rates
- Utilities: Dividend stocks compete with bonds

**What to Watch**: Fed meetings, inflation data, employment reports, and Fed chair speeches.

Understanding this relationship is crucial for timing and valuation.`,
      tags: ['Macroeconomics', 'Fed', 'Interest Rates', 'Valuation']
    },
    {
      id: 4,
      title: 'Apple vs Microsoft: A Comparative Analysis',
      category: 'Analysis',
      author: 'James Liu',
      date: '1 week ago',
      likes: 523,
      comments: 104,
      excerpt: 'Two tech giants, different business models. Which offers better value for investors today?',
      content: `Both are trillion-dollar companies, but with key differences:

**Apple**:
- P/E: ~28
- Revenue: Hardware-focused (iPhone = 50%+)
- Margins: 25% net margin
- Moat: Ecosystem lock-in, brand loyalty
- Risk: Hardware cycles, China exposure

**Microsoft**:
- P/E: ~32
- Revenue: Software & cloud (Azure growing 30%+)
- Margins: 36% net margin
- Moat: Enterprise software stickiness
- Risk: Cloud competition, regulatory scrutiny

**Verdict**: Microsoft trades at premium but higher margins and more predictable recurring revenue may justify it.`,
      tags: ['Apple', 'Microsoft', 'Comparison', 'Tech']
    },
    {
      id: 5,
      title: 'The Hidden Value in Boring Businesses',
      category: 'Discussion',
      author: 'Patricia Kumar',
      date: '2 weeks ago',
      likes: 289,
      comments: 52,
      excerpt: 'Why waste management, shipping, and industrial companies can be better investments than exciting tech stocks.',
      content: `Wall Street loves to hype growth stories, but some of the best returns come from "boring" businesses:

**Why They Work**:
- Stable, predictable cash flows
- Essential services (recession-resistant)
- Less competition (not "sexy")
- Often undervalued by market

**Examples**:
- Waste Management: Steady 3-5% growth, 2% dividend, local monopolies
- Railroads: High barriers to entry, pricing power
- Industrial distributors: Recurring revenue, relationship-based

**The Buffett Lesson**: "Invest in businesses so wonderful that an idiot can run them. Because eventually, one will."

Sometimes the best investment is the one nobody's talking about.`,
      tags: ['Value Investing', 'Boring Business', 'Warren Buffett']
    },
    {
      id: 6,
      title: '5 Red Flags in Financial Statements',
      category: 'Tutorial',
      author: 'David Park',
      date: '2 weeks ago',
      likes: 645,
      comments: 78,
      excerpt: 'Learn to spot warning signs before they become major problems. These are the metrics that saved my portfolio.',
      content: `Watch out for these warning signs:

**1. Revenue Growth Without Cash Flow**: If sales are growing but cash flow isn't, question the quality of revenue.

**2. Rising DSO (Days Sales Outstanding)**: Customers taking longer to pay = potential collection issues.

**3. Frequent Accounting Changes**: Constantly changing methods = potential manipulation.

**4. High Goodwill Relative to Assets**: Acquisition-heavy companies carrying inflated asset values.

**5. Declining Gross Margins**: Core business under pressure, pricing power eroding.

**Real Example**: A company I tracked showed growing revenue but falling cash flow for 3 quarters. Stock down 40% within 6 months when issues surfaced.

Numbers tell stories if you know how to read them.`,
      tags: ['Red Flags', 'Risk Management', 'Financial Statements', 'Due Diligence']
    }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="section-title text-4xl">Community & Blog</h1>
            <p className="text-gray-600 text-lg">
              Real-world analysis, tutorials, and discussions from the investing community
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-r from-blue-50 to-blue-100 mb-8 border-l-4 border-primary"
          >
            <div className="flex items-start gap-3 mb-3">
              <FaLightbulb className="text-yellow-500 text-2xl mt-1" />
              <div>
                <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {blogPosts[0].title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <FaUser /> {blogPosts[0].author}
              </span>
              <span className="flex items-center gap-1">
                <FaClock /> {blogPosts[0].date}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{blogPosts[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => toggleLike(blogPosts[0].id)}
                  className={`flex items-center gap-2 ${
                    likedPosts.includes(blogPosts[0].id) ? 'text-blue-600' : 'text-gray-600'
                  } hover:text-blue-600 transition-colors`}
                >
                  <FaThumbsUp />
                  <span>{blogPosts[0].likes + (likedPosts.includes(blogPosts[0].id) ? 1 : 0)}</span>
                </button>
                <span className="flex items-center gap-2 text-gray-600">
                  <FaComment />
                  <span>{blogPosts[0].comments}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post.category === 'Analysis' ? 'bg-blue-100 text-blue-700' :
                    post.category === 'Tutorial' ? 'bg-green-100 text-green-700' :
                    post.category === 'Discussion' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaClock className="text-xs" /> {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUser className="text-xs" />
                    <span>{post.author}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 text-sm ${
                        likedPosts.includes(post.id) ? 'text-blue-600' : 'text-gray-600'
                      } hover:text-blue-600 transition-colors`}
                    >
                      <FaThumbsUp />
                      <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <FaComment />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit Analysis CTA */}
          <div className="mt-12 card bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500">
            <h2 className="subsection-title">Share Your Analysis</h2>
            <p className="text-gray-700 mb-6">
              Have an interesting stock analysis or investment insight? Share it with the community!
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Submit Your Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
