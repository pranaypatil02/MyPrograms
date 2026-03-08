import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCalculator, FaChartBar, FaListAlt, FaGraduationCap, FaBlog, FaChevronDown, FaSearch, FaExchangeAlt, FaFire } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showAcademyDropdown, setShowAcademyDropdown] = useState(false);

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/community', icon: FaBlog, label: 'Community' },
  ];

  const academyItems = [
    { path: '/fundamentals', icon: FaBook, label: 'Fundamentals', desc: 'Master financial statements' },
    { path: '/learning-paths', icon: FaGraduationCap, label: 'Learning Paths', desc: 'Structured beginner courses' },
    { path: '/valuation', icon: FaCalculator, label: 'Valuation Tools', desc: 'Calculate P/E ratios and DCF' },
    { path: '/sectors', icon: FaChartBar, label: 'Sector Analysis', desc: 'Compare sector metrics' },
    { path: '/glossary', icon: FaListAlt, label: 'Glossary', desc: 'Dictionary of financial terms' },
  ];

  const toolsItems = [
    { path: '/portfolio-simulator', icon: FaSearch, label: 'Portfolio Simulator' },
    { path: '/comparison-tool', icon: FaExchangeAlt, label: 'Comparison Tool' },
    { path: '/sector-heatmap', icon: FaFire, label: 'Sector Heatmap' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaChartBar className="text-primary text-2xl" />
            <span className="text-xl font-bold text-primary">StockLearn</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${isActive
                      ? 'bg-primary text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 hover:bg-slate-100/50 hover:text-primary'
                    }`}
                >
                  <Icon className="text-sm" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Academy Dropdown */}
            <div className="relative" onMouseLeave={() => setShowAcademyDropdown(false)}>
              <button
                onMouseEnter={() => setShowAcademyDropdown(true)}
                onClick={() => setShowAcademyDropdown(!showAcademyDropdown)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100/50 hover:text-primary"
              >
                <FaGraduationCap className="text-sm" />
                <span className="text-sm font-medium">Academy</span>
                <FaChevronDown className="text-xs opacity-70" />
              </button>

              {showAcademyDropdown && (
                <div className="absolute left-0 mt-1 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-100 py-3 transition-opacity">
                  {academyItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowAcademyDropdown(false)}
                        className={`flex items-start space-x-3 px-5 py-3 transition-colors ${isActive
                            ? 'bg-indigo-50/50 text-primary'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                          }`}
                      >
                        <Icon className="text-lg mt-0.5 opacity-80" />
                        <div>
                          <p className="text-sm font-semibold">{item.label}</p>
                          <p className="text-xs text-slate-500 font-normal mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative" onMouseLeave={() => setShowToolsDropdown(false)}>
              <button
                onMouseEnter={() => setShowToolsDropdown(true)}
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100/50 hover:text-primary"
              >
                <FaCalculator className="text-sm" />
                <span className="text-sm font-medium">Tools</span>
                <FaChevronDown className="text-xs opacity-70" />
              </button>

              {showToolsDropdown && (
                <div className="absolute right-0 mt-1 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-100 py-2">
                  {toolsItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowToolsDropdown(false)}
                        className={`flex items-center space-x-3 px-4 py-2.5 transition-colors ${isActive
                            ? 'bg-indigo-50/50 text-primary'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
                          }`}
                      >
                        <Icon className="text-sm opacity-80" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
