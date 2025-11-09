import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCalculator, FaChartBar, FaListAlt, FaGraduationCap, FaBlog } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/fundamentals', icon: FaBook, label: 'Fundamentals' },
    { path: '/valuation', icon: FaCalculator, label: 'Valuation' },
    { path: '/sectors', icon: FaChartBar, label: 'Sectors' },
    { path: '/glossary', icon: FaListAlt, label: 'Glossary' },
    { path: '/learning-paths', icon: FaGraduationCap, label: 'Learning Paths' },
    { path: '/community', icon: FaBlog, label: 'Community' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaChartBar className="text-primary text-2xl" />
            <span className="text-xl font-bold text-primary">StockLearn</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-sm" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
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
