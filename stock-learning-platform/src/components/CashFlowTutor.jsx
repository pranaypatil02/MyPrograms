import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaMoneyBillWave, FaChartLine, FaBuilding, FaWallet } from 'react-icons/fa';

const CashFlowTutor = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResults, setShowQuizResults] = useState(false);

    const sections = [
        {
            title: "1. Cash is Reality 💵",
            icon: <FaMoneyBillWave className="text-green-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-xl font-bold mb-2">Profit ≠ Cash</h3>
                        <p className="text-gray-700">
                            This is the most important concept in finance: A company can remain profitable on paper but go bankrupt because it ran out of cash.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-lg mb-3 text-red-600">The Problem (Accrual Accounting)</h4>
                            <p className="text-sm text-gray-600">
                                The Income Statement records revenue when a sale is <strong>made</strong>, not when cash is received. If you sell a $1M machine but get paid in 6 months, you have $1M profit but $0 cash today.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-lg mb-3 text-green-600">The Solution (Cash Flow)</h4>
                            <p className="text-sm text-gray-600">
                                The Cash Flow Statement ignores accounting rules and only tracks actual <strong>money moving in and out</strong> of the bank accounts.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "2. The Three Buckets 🪣",
            icon: <FaWallet className="text-blue-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">Every dollar that moves through a business falls into one of three categories:</p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="bg-blue-100 p-3 rounded-full text-2xl">⚙️</div>
                            <div>
                                <h4 className="font-bold text-blue-900">1. Operating Activities (CFO)</h4>
                                <p className="text-sm text-blue-800">Cash from the core business. Selling tacos, building software, consulting services.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                            <div className="bg-purple-100 p-3 rounded-full text-2xl">🏗️</div>
                            <div>
                                <h4 className="font-bold text-purple-900">2. Investing Activities (CFI)</h4>
                                <p className="text-sm text-purple-800">Cash spent on long-term assets. Buying factories, trucks, or acquiring other companies.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                            <div className="bg-orange-100 p-3 rounded-full text-2xl">🏦</div>
                            <div>
                                <h4 className="font-bold text-orange-900">3. Financing Activities (CFF)</h4>
                                <p className="text-sm text-orange-800">Cash from investors and banks. Issuing stock, taking loans, or paying dividends.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "3. Cash Flow from Operations ⚙️",
            icon: <FaBuilding className="text-blue-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm">
                        <p className="text-gray-700">
                            This typically starts with <strong>Net Income</strong> and adjusts it back to cash logic (The "Indirect Method").
                        </p>
                    </div>

                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span>Net Income</span>
                            <span className="font-bold">$100</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border-l-2 border-green-400 pl-4">
                            <span>+ Depreciation (Non-cash expense)</span>
                            <span className="text-green-600">+$20</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded text-xs text-gray-600 italic">
                            Why add Depreciation? Because we subtracted it to calculate Net Income, but we didn't actually write a check for it this year!
                        </div>
                        <div className="flex justify-between items-center p-3 border-l-2 border-red-400 pl-4">
                            <span>- Increase in Inventory</span>
                            <span className="text-red-600">-$10</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded text-xs text-gray-600 italic">
                            Why subtract inventory growth? Because buying inventory costs cash, even if we haven't sold it yet.
                        </div>
                        <div className="flex justify-between items-center bg-blue-100 p-3 rounded font-bold">
                            <span>= Cash from Operations</span>
                            <span className="text-blue-800">$110</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "4. Cash Flow from Investing 🏗️",
            icon: <FaChartLine className="text-purple-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">This section is usually <strong>negative</strong> for healthy, growing companies because they are spending money to grow.</p>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-purple-800">Capital Expenditures (CapEx)</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Money spent on physical assets like buildings, machines, and servers.
                                <br /><span className="text-xs font-mono bg-red-100 text-red-800 px-1 rounded">Cash OUTflow 📉</span>
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-green-800">Selling Assets</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Money received from selling an old factory or equipment.
                                <br /><span className="text-xs font-mono bg-green-100 text-green-800 px-1 rounded">Cash INflow 📈</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "5. Cash Flow from Financing 🏦",
            icon: <FaWallet className="text-orange-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">How the company funds its operations and returns value to shareholders.</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                            <h4 className="font-bold text-green-800">Cash IN (+)</h4>
                            <ul className="text-sm text-green-700 space-y-1 mt-2">
                                <li>• Issuing new debt (Loans)</li>
                                <li>• Selling stock (IPO/Secondary)</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                            <h4 className="font-bold text-red-800">Cash OUT (-)</h4>
                            <ul className="text-sm text-red-700 space-y-1 mt-2">
                                <li>• Repaying debt</li>
                                <li>• Buying back stock</li>
                                <li>• Paying dividends</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "6. Free Cash Flow (The Holy Grail) 🏆",
            icon: <FaMoneyBillWave className="text-teal-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-200 text-center">
                        <h3 className="text-2xl font-bold text-teal-800 mb-2">Free Cash Flow (FCF)</h3>
                        <p className="text-gray-600 font-mono text-sm bg-white inline-block px-3 py-1 rounded border border-gray-200">
                            Operating Cash Flow - Capital Expenditures
                        </p>
                    </div>

                    <p className="text-gray-700">
                        This is the cash typically available to shareholders. It's what's left after paying all bills and reinvesting enough to keep the business running.
                    </p>

                    <div className="space-y-2">
                        <h4 className="font-bold text-gray-800">Why Warren Buffett loves it:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <FaCheckCircle className="text-teal-500 mt-1" />
                                <span>It's harder to fake than Net Income.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaCheckCircle className="text-teal-500 mt-1" />
                                <span>It represents the true owner's earnings.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaCheckCircle className="text-teal-500 mt-1" />
                                <span>It fuels dividends, buybacks, and acquisitions.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "7. Red Flags & Analysis 🚩",
            icon: <FaExclamationTriangle className="text-red-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                        <h4 className="font-bold mb-4 text-red-800 flex items-center gap-2">
                            <FaExclamationTriangle /> Warning Signs
                        </h4>
                        <ul className="space-y-4 text-sm text-red-700">
                            <li className="bg-white p-3 rounded shadow-sm">
                                <strong>Profitable but Bleeding Cash:</strong><br />
                                Net Income is positive, but Operating Cash Flow is negative. This often means they can't collect from customers or are stuffing inventory.
                            </li>
                            <li className="bg-white p-3 rounded shadow-sm">
                                <strong>Funding Operations with Debt:</strong><br />
                                Operating Cash Flow is negative, so they survive by issuing Debt (Financing Cash Flow +). This is a ticking time bomb.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                        <h4 className="font-bold mb-4 text-green-800 flex items-center gap-2">
                            Positive Signs
                        </h4>
                        <p className="text-sm text-green-700">
                            <strong>Consistent FCF Growth:</strong> The company generates more cash each year than it needs to spend. This gives them options (safety).
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "8. Mini Quiz 📝",
            icon: <FaCheckCircle className="text-blue-600" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700 mb-4">You've mastered the cash streams! Let's test your knowledge.</p>
                    {/* Quiz Content Rendered via helper function below */}
                </div>
            )
        }
    ];

    const quizQuestions = [
        {
            id: 1,
            question: "Which statement tracks actual money moving in and out?",
            options: [
                "Income Statement",
                "Balance Sheet",
                "Cash Flow Statement"
            ],
            correct: 2,
            explanation: "The Cash Flow Statement tracks actual cash transfers, unlike the Income Statement which uses accrual accounting."
        },
        {
            id: 2,
            question: "Why do we ADD back Depreciation to Net Income?",
            options: [
                "Because it was a cash expense",
                "Because it was a non-cash expense subtracted earlier",
                "To increase our tax bill"
            ],
            correct: 1,
            explanation: "Depreciation lowered Net Income but didn't cost any actual cash this year, so we add it back to find cash flow."
        },
        {
            id: 3,
            question: "Spending money to build a new factory falls under which category?",
            options: [
                "Operating Activities",
                "Investing Activities",
                "Financing Activities"
            ],
            correct: 1,
            explanation: "Buying long-term assets like factories or equipment is an Investing Activity (CapEx)."
        },
        {
            id: 4,
            question: "What is Free Cash Flow (FCF)?",
            options: [
                "Net Income + Dividends",
                "Operating Cash Flow - Capital Expenditures",
                "Revenue - Taxes"
            ],
            correct: 1,
            explanation: "FCF is the cash generated by operations minus the cash needed to maintain/expand the asset base (CapEx)."
        },
        {
            id: 5,
            question: "Is it possible for a profitable company to go bankrupt?",
            options: [
                "Yes, if they run out of cash (liquidity crisis)",
                "No, profit guarantees survival",
                "Only if they have no debt"
            ],
            correct: 0,
            explanation: "Yes! 'Profit' is an accounting concept. You can't pay bills with profit; you pay them with cash."
        }
    ];

    const handleQuizAnswer = (qId, optionIndex) => {
        setQuizAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    };

    const calculateScore = () => {
        let score = 0;
        quizQuestions.forEach(q => {
            if (quizAnswers[q.id] === q.correct) score++;
        });
        return score;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-700 p-8 rounded-t-xl text-white">
                <h2 className="text-3xl font-bold mb-2">Mastering Cash Flow</h2>
                <p className="text-green-100">Understand the lifeblood of every business: Cash.</p>
            </div>

            <div className="p-8 space-y-12">
                {/* Content Sections */}
                {sections.slice(0, sections.length - 1).map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="scroll-mt-8"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b pb-2">
                            <div className="bg-green-50 p-3 rounded-full text-xl">{section.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                        </div>
                        <div className="pl-4 border-l-2 border-gray-100 ml-4">
                            {section.content}
                        </div>
                    </motion.div>
                ))}

                {/* Quiz Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-8 border border-gray-200"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <FaCheckCircle className="text-3xl text-green-600" />
                        <h3 className="text-2xl font-bold text-gray-800">8. Mini Quiz 📝</h3>
                    </div>
                    <p className="text-gray-700 mb-8">You've mastered the cash streams! Let's test your knowledge.</p>

                    <div className="space-y-8">
                        {quizQuestions.map((q, index) => (
                            <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="font-semibold text-lg mb-4">{index + 1}. {q.question}</h4>
                                <div className="space-y-2">
                                    {q.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuizAnswer(q.id, i)}
                                            disabled={showQuizResults}
                                            className={`w-full text-left p-3 rounded-md border transition-all ${showQuizResults
                                                ? i === q.correct
                                                    ? "bg-green-100 border-green-500 text-green-800"
                                                    : quizAnswers[q.id] === i
                                                        ? "bg-red-100 border-red-500 text-red-800"
                                                        : "bg-gray-50 border-gray-200 opacity-50"
                                                : quizAnswers[q.id] === i
                                                    ? "bg-blue-100 border-blue-500 text-blue-900"
                                                    : "hover:bg-gray-50 border-gray-200"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                                {showQuizResults && (
                                    <div className={`mt-3 text-sm p-3 rounded ${quizAnswers[q.id] === q.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        <span className="font-bold">{quizAnswers[q.id] === q.correct ? 'Correct!' : 'Incorrect.'}</span> {q.explanation}
                                    </div>
                                )}
                            </div>
                        ))}

                        {!showQuizResults ? (
                            <button
                                onClick={() => setShowQuizResults(true)}
                                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                                className="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg shadow-lg"
                            >
                                Check Answers
                            </button>
                        ) : (
                            <div className="text-center p-8 bg-green-50 rounded-xl border border-green-100">
                                <h3 className="text-3xl font-bold mb-2 text-green-900">You scored {calculateScore()} / {quizQuestions.length}</h3>
                                <p className="text-gray-600 mb-6 text-lg">{calculateScore() === 5 ? "Cash Flow Master! 💸" : "Good job! Review the sections above to master cash flow."}</p>
                                <button
                                    onClick={() => {
                                        setQuizAnswers({});
                                        setShowQuizResults(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-8 py-3 bg-white border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors"
                                >
                                    Restart Tutorial
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Glossary Footer */}
            <div className="bg-gray-800 text-gray-300 p-6 text-center border-t border-gray-700 rounded-b-xl">
                <p className="text-lg"><strong>Remember:</strong> Cash Flow is reality. OCF - CapEx = Free Cash Flow.</p>
            </div>
        </div>
    );
};

export default CashFlowTutor;
