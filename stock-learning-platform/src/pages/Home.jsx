import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FaChartLine, FaGraduationCap, FaCalculator, FaUsers, FaBook } from 'react-icons/fa';

const Home = () => {
  const [resumeLink, setResumeLink] = useState(null);

  useEffect(() => {
    // Check if the user has started learning
    const m1 = JSON.parse(localStorage.getItem('module1_progress') || '[]');
    const m2 = JSON.parse(localStorage.getItem('module2_progress') || '[]');

    if (m1.length > 0 || m2.length > 0) {
      setResumeLink('/fundamentals');
    }
  }, []);
  // Sample data for animated chart
  const chartData = [
    { month: 'Jan', price: 120, fairValue: 100 },
    { month: 'Feb', price: 115, fairValue: 100 },
    { month: 'Mar', price: 95, fairValue: 100 },
    { month: 'Apr', price: 85, fairValue: 100 },
    { month: 'May', price: 90, fairValue: 100 },
    { month: 'Jun', price: 110, fairValue: 100 },
  ];

  const features = [
    {
      icon: FaBook,
      title: 'Learn Fundamentals',
      description: 'Master financial statements with interactive modules and real examples',
      color: 'blue',
      link: '/fundamentals'
    },
    {
      icon: FaCalculator,
      title: 'Valuation Tools',
      description: 'Calculate P/E ratios, DCF, and other metrics with visual feedback',
      color: 'green',
      link: '/valuation'
    },
    {
      icon: FaChartLine,
      title: 'Sector Analysis',
      description: 'Compare companies and understand sector-specific metrics',
      color: 'purple',
      link: '/sectors'
    },
    {
      icon: FaGraduationCap,
      title: 'Learning Paths',
      description: 'Follow structured courses from beginner to advanced analyst',
      color: 'orange',
      link: '/learning-paths'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-24 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/20 blur-3xl"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            >
              Learn to Analyze Stocks Like a Pro — Step by Step
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 mb-8"
            >
              Turn complex financial data into simple, visual insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center flex-wrap gap-4"
            >
              <Link
                to={resumeLink || "/learning-paths"}
                className="btn-primary text-lg px-8 py-4 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {resumeLink ? (
                  <>Continue Learning <FaGraduationCap /></>
                ) : (
                  'Start Learning Free'
                )}
              </Link>
              <Link
                to="/portfolio-simulator"
                className="btn-secondary text-lg px-8 py-4 bg-white/50 backdrop-blur-sm"
              >
                Explore Tools
              </Link>
            </motion.div>
          </div>

          {/* Animated Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-900/5 border border-white/50 p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Understanding Value: Stock Price vs Fair Value
              </h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Stock Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Fair Value</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="metric-good">April-May: Undervalued</span> (Buy opportunity) •{' '}
                <span className="metric-bad">January: Overvalued</span> (Caution)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Everything You Need to Master Stock Analysis</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Interactive tools, real examples, and structured learning paths designed for beginners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.link} className="block h-full">
                    <div className="card h-full group bg-white hover:bg-slate-50 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className={`inline-flex p-4 rounded-xl bg-${feature.color}-50 text-${feature.color}-600 mb-6 group-hover:scale-110 group-hover:bg-${feature.color}-100 transition-all duration-300`}>
                        <Icon className="text-3xl" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering stock analysis with our free, interactive platform
          </p>
          <Link to="/learning-paths" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg inline-block transition-all duration-200">
            Explore Learning Paths
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
