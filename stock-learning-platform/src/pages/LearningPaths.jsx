import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaLock, FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const learningPaths = [
    {
      id: 'beginner',
      title: 'Beginner to Investor',
      level: 'Beginner',
      duration: '4 weeks',
      description: 'Start from zero and learn the fundamentals of stock analysis',
      color: '#10b981',
      badge: '🌱',
      lessons: [
        {
          id: 'b1',
          title: 'What is a Stock?',
          duration: '15 min',
          topics: ['Ownership', 'Shares', 'Stock Market Basics'],
          completed: false
        },
        {
          id: 'b2',
          title: 'Reading Financial Statements',
          duration: '30 min',
          topics: ['Income Statement', 'Balance Sheet', 'Cash Flow'],
          completed: false
        },
        {
          id: 'b3',
          title: 'Basic Valuation Metrics',
          duration: '25 min',
          topics: ['P/E Ratio', 'Market Cap', 'Dividend Yield'],
          completed: false
        },
        {
          id: 'b4',
          title: 'Risk and Diversification',
          duration: '20 min',
          topics: ['Portfolio Theory', 'Risk Management', 'Asset Allocation'],
          completed: false
        }
      ],
      quiz: {
        questions: [
          {
            question: 'What does EPS stand for?',
            options: ['Earnings Per Share', 'Equity Per Stock', 'Expense Per Share', 'Earnings Per Sale'],
            correct: 0
          },
          {
            question: 'A P/E ratio of 15 means:',
            options: [
              'The stock costs $15',
              'The company earns $15 per share',
              'You pay $15 for every $1 of earnings',
              'The company has 15 employees'
            ],
            correct: 2
          },
          {
            question: 'Which statement shows profitability over time?',
            options: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Annual Report'],
            correct: 1
          }
        ]
      }
    },
    {
      id: 'intermediate',
      title: 'Fundamental Analyst',
      level: 'Intermediate',
      duration: '6 weeks',
      description: 'Deep dive into company analysis and valuation techniques',
      color: '#3b82f6',
      badge: '📊',
      lessons: [
        {
          id: 'i1',
          title: 'Advanced Financial Ratios',
          duration: '35 min',
          topics: ['ROE', 'ROA', 'ROIC', 'Debt Ratios'],
          completed: false
        },
        {
          id: 'i2',
          title: 'Discounted Cash Flow Analysis',
          duration: '45 min',
          topics: ['Time Value of Money', 'DCF Model', 'WACC', 'Terminal Value'],
          completed: false
        },
        {
          id: 'i3',
          title: 'Competitive Analysis',
          duration: '40 min',
          topics: ['Porter\'s Five Forces', 'Moats', 'Market Share'],
          completed: false
        },
        {
          id: 'i4',
          title: 'Sector-Specific Metrics',
          duration: '30 min',
          topics: ['Industry Benchmarks', 'Cyclical vs Defensive', 'Sector Rotation'],
          completed: false
        }
      ],
      quiz: {
        questions: [
          {
            question: 'What does ROIC measure?',
            options: [
              'Return on invested capital - efficiency of all capital',
              'Rate of income change',
              'Revenue over initial cost',
              'Return on individual compensation'
            ],
            correct: 0
          },
          {
            question: 'In DCF analysis, what is the discount rate used for?',
            options: [
              'Calculating sales discounts',
              'Converting future cash flows to present value',
              'Determining debt costs',
              'Measuring inflation'
            ],
            correct: 1
          },
          {
            question: 'A "moat" in investing refers to:',
            options: [
              'A company\'s water resources',
              'Competitive advantages that protect profits',
              'Geographic location',
              'Marketing budget'
            ],
            correct: 1
          }
        ]
      }
    },
    {
      id: 'advanced',
      title: 'Professional Analyst',
      level: 'Advanced',
      duration: '8 weeks',
      description: 'Master-level analysis techniques used by professionals',
      color: '#8b5cf6',
      badge: '🏆',
      lessons: [
        {
          id: 'a1',
          title: 'Building Financial Models',
          duration: '60 min',
          topics: ['3-Statement Model', 'Assumptions', 'Sensitivity Analysis'],
          completed: false
        },
        {
          id: 'a2',
          title: 'Options and Derivatives Valuation',
          duration: '50 min',
          topics: ['Black-Scholes', 'Greeks', 'Option Strategies'],
          completed: false
        },
        {
          id: 'a3',
          title: 'Merger & Acquisition Analysis',
          duration: '55 min',
          topics: ['Synergies', 'Accretion/Dilution', 'Deal Structures'],
          completed: false
        },
        {
          id: 'a4',
          title: 'Macroeconomic Factors',
          duration: '45 min',
          topics: ['Interest Rates', 'GDP Impact', 'Currency Effects'],
          completed: false
        }
      ],
      quiz: {
        questions: [
          {
            question: 'In M&A analysis, what does "accretion" mean?',
            options: [
              'The deal increases EPS',
              'The deal is expensive',
              'Assets are accumulated',
              'Revenue grows naturally'
            ],
            correct: 0
          },
          {
            question: 'What is "Delta" in options trading?',
            options: [
              'The change in price over time',
              'Rate of change of option price relative to stock price',
              'Difference between bid and ask',
              'Distance from strike price'
            ],
            correct: 1
          },
          {
            question: 'Rising interest rates typically:',
            options: [
              'Increase stock valuations',
              'Have no effect on stocks',
              'Decrease stock valuations',
              'Only affect bonds'
            ],
            correct: 2
          }
        ]
      }
    }
  ];

  const badges = [
    { name: 'First Steps', icon: '🌱', description: 'Complete your first lesson', earned: completedLessons.length >= 1 },
    { name: 'Knowledge Seeker', icon: '📚', description: 'Complete 3 lessons', earned: completedLessons.length >= 3 },
    { name: 'Balance Sheet Pro', icon: '📊', description: 'Master financial statements', earned: false },
    { name: 'Valuation Ninja', icon: '🥷', description: 'Complete all valuation modules', earned: false },
    { name: 'Quiz Master', icon: '🎓', description: 'Score 100% on any quiz', earned: quizScore === 100 },
    { name: 'Completionist', icon: '🏆', description: 'Finish an entire learning path', earned: false }
  ];

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const startQuiz = (path) => {
    setCurrentQuiz(path.quiz);
    setQuizAnswers({});
    setQuizScore(null);
    setQuizMode(true);
  };

  const submitQuiz = () => {
    const quiz = currentQuiz;
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });
    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);
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
            <h1 className="section-title text-4xl">Learning Paths</h1>
            <p className="text-gray-600 text-lg">
              Structured courses to take you from beginner to professional analyst
            </p>
          </motion.div>

          {/* Quiz Mode */}
          {quizMode && currentQuiz ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card max-w-3xl mx-auto"
            >
              <h2 className="subsection-title mb-6">Knowledge Check Quiz</h2>

              {quizScore === null ? (
                <div className="space-y-6">
                  {currentQuiz.questions.map((q, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <p className="font-semibold text-gray-900 mb-3">
                        {index + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${quizAnswers[index] === optIndex
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                              }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              checked={quizAnswers[index] === optIndex}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [index]: optIndex })}
                              className="mr-3"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4">
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== currentQuiz.questions.length}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Quiz
                    </button>
                    <button
                      onClick={() => setQuizMode(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 ${quizScore >= 80 ? 'bg-green-100' : quizScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                    <span className="text-5xl font-bold" style={{
                      color: quizScore >= 80 ? '#10b981' : quizScore >= 60 ? '#f59e0b' : '#ef4444'
                    }}>
                      {quizScore}%
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {quizScore >= 80 ? '🎉 Excellent!' : quizScore >= 60 ? '👍 Good Job!' : '📚 Keep Learning!'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You scored {quizScore}% on this quiz
                  </p>
                  {quizScore === 100 && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
                      <p className="font-semibold text-yellow-800">
                        🏆 Perfect Score! You earned the &quot;Quiz Master&quot; badge!
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setQuizMode(false);
                      setQuizScore(null);
                    }}
                    className="btn-primary"
                  >
                    Back to Learning Paths
                  </button>
                </div>
              )}
            </motion.div>
          ) : selectedPath ? (
            /* Path Detail View */
            <div className="space-y-8">
              <div className="card" style={{ borderTop: `4px solid ${selectedPath.color}` }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{selectedPath.badge}</span>
                      <div>
                        <h2 className="subsection-title mb-0">{selectedPath.title}</h2>
                        <p className="text-sm text-gray-500">{selectedPath.level} • {selectedPath.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4">{selectedPath.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPath(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Progress</span>
                    <span className="text-gray-600">
                      {selectedPath.lessons.filter(l => completedLessons.includes(l.id)).length} / {selectedPath.lessons.length} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(selectedPath.lessons.filter(l => completedLessons.includes(l.id)).length / selectedPath.lessons.length) * 100}%`,
                        backgroundColor: selectedPath.color
                      }}
                    ></div>
                  </div>
                </div>

                {/* Lessons */}
                <div className="space-y-3">
                  {selectedPath.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isLocked = index > 0 && !completedLessons.includes(selectedPath.lessons[index - 1].id);

                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-lg border-2 transition-all ${isCompleted
                          ? 'bg-green-50 border-green-300'
                          : isLocked
                            ? 'bg-gray-50 border-gray-200 opacity-60'
                            : 'bg-white border-gray-300 hover:border-blue-400'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="text-2xl">
                              {isCompleted ? (
                                <FaCheckCircle className="text-green-600" />
                              ) : isLocked ? (
                                <FaLock className="text-gray-400" />
                              ) : (
                                <FaPlayCircle className="text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                              <p className="text-sm text-gray-600">{lesson.duration}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {lesson.topics.map((topic, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          {!isLocked && !isCompleted && (
                            <button
                              onClick={() => handleLessonComplete(lesson.id)}
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quiz Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Final Assessment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Test your knowledge with a quiz covering all topics in this path
                  </p>
                  <button
                    onClick={() => startQuiz(selectedPath)}
                    className="btn-primary"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Paths Overview */
            <>
              {/* Learning Paths Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {learningPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedPath(path)}
                    style={{ borderTop: `4px solid ${path.color}` }}
                  >
                    <div className="text-5xl mb-4">{path.badge}</div>
                    <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                    <div className="flex gap-2 mb-3 text-sm">
                      <span className="px-2 py-1 bg-gray-100 rounded">{path.level}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">{path.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{path.lessons.length} lessons</span>
                      <span className="text-primary font-semibold">Start Learning →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Badges Section */}
              <div className="card">
                <h2 className="subsection-title mb-6">Your Badges</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-lg transition-all ${badge.earned
                        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400'
                        : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                        }`}
                    >
                      {selectedPath === 'professional' && (
                        <p className="mt-4 text-sm text-yellow-800 bg-yellow-100 p-3 rounded border border-yellow-200">
                          <span className="font-bold">Note:</span> Specific &quot;achievement badges&quot; or &quot;certificates&quot; are currently in development.
                        </p>
                      )}
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="font-semibold text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600">{badge.description}</div>
                      {badge.earned && (
                        <div className="mt-2">
                          <FaTrophy className="text-yellow-600 mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
