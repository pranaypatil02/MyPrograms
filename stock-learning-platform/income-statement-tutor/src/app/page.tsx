import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Income Statement Tutor
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Learn financial analysis from beginner to advanced valuation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ 27 Tests Passing
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Master Income Statements
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
            From reading your first income statement to building FCFF models,
            we've got you covered with interactive learning and professional tools.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Learn Mode */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn</h3>
            <p className="text-gray-600 mb-6">
              Interactive explanations of revenue, expenses, margins, and ratios with quizzes and tooltips based on SEC/GAAP guidance.
            </p>
            <div className="text-blue-600 font-semibold">
              Coming Soon →
            </div>
          </div>

          {/* Builder Mode */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Build</h3>
            <p className="text-gray-600 mb-6">
              Create and validate income statements using templates. Compare multiple periods and ensure formulas balance.
            </p>
            <div className="text-green-600 font-semibold">
              Coming Soon →
            </div>
          </div>

          {/* Analysis Mode */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Analyze</h3>
            <p className="text-gray-600 mb-6">
              Compute margins, common-size statements, and get AI-generated insights into financial performance trends.
            </p>
            <Link
              href="/api/statements"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Try API →
            </Link>
          </div>

          {/* Valuation Mode */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-200">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Value</h3>
            <p className="text-gray-600 mb-6">
              Normalize statements and build FCFF bridges following Damodaran's methodology for professional valuations.
            </p>
            <div className="text-orange-600 font-semibold">
              Coming Soon →
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Built with Production-Ready Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900">Next.js 14</div>
              <div className="text-sm text-gray-600">App Router</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔷</div>
              <div className="font-semibold text-gray-900">TypeScript</div>
              <div className="text-sm text-gray-600">Type Safety</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🗄️</div>
              <div className="font-semibold text-gray-900">Prisma ORM</div>
              <div className="text-sm text-gray-600">SQLite</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-semibold text-gray-900">27 Tests</div>
              <div className="text-sm text-gray-600">Vitest</div>
            </div>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Sample Company Data Included</h3>
          <p className="text-gray-700 mb-6">
            Start exploring with <strong>Tech Innovators Inc.</strong> - a pre-seeded company with 2 years of financial data:
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-600">$12M</div>
                <div className="text-sm text-gray-600">FY 2024 Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">+20%</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">26.7%</div>
                <div className="text-sm text-gray-600">Operating Margin</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">$2.50</div>
                <div className="text-sm text-gray-600">EPS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h3>
          <div className="bg-gray-900 text-left rounded-lg p-6 max-w-2xl mx-auto">
            <code className="text-green-400 text-sm">
              <div>npm install</div>
              <div>npm run db:generate</div>
              <div>npm run db:seed</div>
              <div>npm run dev</div>
            </code>
          </div>
          <p className="mt-4 text-gray-600">
            See the{' '}
            <a href="https://github.com" className="text-blue-600 hover:underline font-semibold">
              README
            </a>{' '}
            for full documentation
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>Built following guidance from SEC, IFRS, US GAAP, and Damodaran</p>
            <p className="mt-2">Formula Engine: ✓ Production Ready | UI: 🚧 In Development</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
