import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronLeft, FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaChartPie, FaUniversity, FaBalanceScale } from 'react-icons/fa';

const BalanceSheetTutor = () => {
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResults, setShowQuizResults] = useState(false);

    const sections = [
        {
            title: "1. What is a Balance Sheet?",
            icon: <FaUniversity className="text-blue-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                        <h3 className="text-xl font-bold mb-2">A Snapshot in Time 📸</h3>
                        <p className="text-gray-700">
                            Think of a Balance Sheet like a <strong>photo</strong> of a company's financial health at a single specific moment (e.g., "as of December 31st").
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-lg mb-3 text-indigo-600">Balance Sheet</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• <strong>Timing:</strong> A specific date (Snapshot)</li>
                                <li>• <strong>What it shows:</strong> What we OWN vs what we OWE</li>
                                <li>• <strong>Analogy:</strong> Your bank account balance right now</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 opacity-75">
                            <h4 className="font-semibold text-lg mb-3 text-gray-600">vs Income Statement</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• <strong>Timing:</strong> A period of time (Video)</li>
                                <li>• <strong>What it shows:</strong> Profit and Loss</li>
                                <li>• <strong>Analogy:</strong> Your salary earned over a year</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Why Investors Care</h4>
                        <p className="text-sm text-green-700">
                            It tells you if a company is <strong>solvent</strong> (can pay its debts) and <strong>liquid</strong> (has cash ready to use). It answers the question: "If we stopped doing business today, what would be left?"
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "2. The Core Equation ⚖️",
            icon: <FaBalanceScale className="text-purple-500" />,
            content: (
                <div className="space-y-8">
                    <div className="text-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                            Assets = Liabilities + Equity
                        </h2>
                        <p className="text-gray-600">The Golden Rule of Accounting</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-green-100 rounded-lg">
                            <h3 className="font-bold text-green-800 text-lg">Assets</h3>
                            <p className="text-sm text-green-700">What the company <br /><strong>OWNS</strong></p>
                        </div>
                        <div className="flex items-center justify-center text-gray-400 font-bold text-xl">=</div>
                        <div className="p-4 bg-red-100 rounded-lg">
                            <h3 className="font-bold text-red-800 text-lg">Liabilities</h3>
                            <p className="text-sm text-red-700">What the company <br /><strong>OWES</strong></p>
                        </div>
                        <div className="col-span-3 md:col-span-1 p-4 bg-blue-100 rounded-lg">
                            <h3 className="font-bold text-blue-800 text-lg">Equity</h3>
                            <p className="text-sm text-blue-700">What is left for <br /><strong>OWNERS</strong></p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h4 className="font-bold mb-4">Example: "Lemonade Stand Inc."</h4>
                        <div className="flex flex-col gap-2 font-mono text-sm">
                            <div className="flex justify-between border-b pb-2">
                                <span>Cash in Box (Asset)</span>
                                <span className="text-green-600">$100</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Owe Dad for Lemons (Liability)</span>
                                <span className="text-red-600">$40</span>
                            </div>
                            <div className="flex justify-between font-bold pt-2">
                                <span>Value for You (Equity)</span>
                                <span className="text-blue-600">$60</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-2 text-center">
                                $100 (Assets) = $40 (Liab) + $60 (Equity) ✅
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "3. Assets Section 💰",
            icon: <FaChartPie className="text-green-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">Assets are ordered by <strong>Liquidity</strong> — how fast they can be turned into cash.</p>

                    <div className="space-y-4">
                        <div className="bg-white border-l-4 border-green-400 p-4 shadow-sm">
                            <h4 className="font-bold text-gray-900">Current Assets (Used within 1 year)</h4>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li>💵 <strong>Cash & Equivalents:</strong> Money in the bank.</li>
                                <li>🤝 <strong>Accounts Receivable:</strong> I.O.U.s from customers who bought goods but haven't paid yet.</li>
                                <li>📦 <strong>Inventory:</strong> Goods sitting on shelves waiting to be sold.</li>
                                <li>🗓️ <strong>Prepaid Expenses:</strong> Bills paid in advance (like insurance for the year).</li>
                            </ul>
                        </div>

                        <div className="bg-white border-l-4 border-green-600 p-4 shadow-sm">
                            <h4 className="font-bold text-gray-900">Non-Current Assets (Long-term)</h4>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li>🏭 <strong>Property, Plant & Equipment (PP&E):</strong> Factories, trucks, computers ("Hard" assets).</li>
                                🧠 <strong>Intangible Assets:</strong> Patents, trademarks, brand value.
                                <li>🤝 <strong>Goodwill:</strong> Premium paid when buying another company above its fair value.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "4. Liabilities Section 💳",
            icon: <FaExclamationTriangle className="text-red-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">Liabilities are ordered by <strong>Maturity</strong> — when they must be paid back.</p>

                    <div className="space-y-4">
                        <div className="bg-white border-l-4 border-red-400 p-4 shadow-sm">
                            <h4 className="font-bold text-gray-900">Current Liabilities (Due in less than 1 year)</h4>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li>🧾 <strong>Accounts Payable:</strong> Money owed to suppliers (e.g., for raw materials).</li>
                                <li>⏱️ <strong>Accrued Expenses:</strong> Bills incurred but not yet paid (e.g., employee wages).</li>
                                <li>⏳ <strong>Short-term Debt:</strong> Loans due clearly soon.</li>
                                <li>🎟️ <strong>Deferred Revenue:</strong> Cash received but service not yet accumulated (See below!).</li>
                            </ul>
                        </div>

                        <div className="bg-white border-l-4 border-red-600 p-4 shadow-sm">
                            <h4 className="font-bold text-gray-900">Non-Current Liabilities (Due after 1 year)</h4>
                            <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                <li>🏦 <strong>Long-term Debt:</strong> Bonds or bank loans spanning years.</li>
                                <li>🏢 <strong>Lease Liabilities:</strong> Rent payments owed in the future.</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                                <FaLightbulb /> Why is Deferred Revenue a Liability?
                            </h4>
                            <p className="text-sm text-yellow-800 mt-2">
                                Imagine you sell a 1-year magazine subscription for $120. You got the cash, but you still <strong>OWE</strong> the customer 12 magazines. Until you deliver them, that money is a liability (obligation).
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "5. Shareholders' Equity 🍰",
            icon: <FaChartPie className="text-blue-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">This is the "Book Value" of the company — what belongs to owners.</p>

                    <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-blue-800">Common Stock & APIC</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Money originally invested by shareholders. "Additional Paid-In Capital" (APIC) is the excess paid over the arbitrary "par value" of shares.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-green-800">Retained Earnings 💰</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                The accumulated profits the company has kept since day 1.
                                <br />
                                <code className="bg-gray-100 p-1 rounded text-xs mt-1 block w-fit">Retained Earnings = Sum of all Net Income - All Dividends Paid</code>
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-purple-800">Accumulated Other Comprehensive Income</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Gains/losses not yet "realized" (e.g., currency exchange fluctuations).
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-gray-800">Treasury Stock</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Stock the company bought back from investors (Wait, this is a negative number!). It reduces equity because the company paid out cash to retire shares.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "6. Connecting the Statements 🔗",
            icon: <FaUniversity className="text-teal-500" />,
            content: (
                <div className="space-y-6">
                    <p className="text-gray-700">Financial statements don't exist in a vacuum. They feed into each other.</p>

                    <div className="relative border-l-2 border-dashed border-gray-300 ml-4 pl-8 space-y-8">
                        <div className="relative">
                            <span className="absolute -left-11 bg-teal-100 text-teal-800 p-2 rounded-full">1</span>
                            <h4 className="font-bold">Net Income → Retained Earnings</h4>
                            <p className="text-sm text-gray-600">
                                The "bottom line" from the <strong>Income Statement</strong> is added to Retained Earnings on the <strong>Balance Sheet</strong> (after subtracting dividends).
                            </p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-11 bg-teal-100 text-teal-800 p-2 rounded-full">2</span>
                            <h4 className="font-bold">CapEx → PP&E</h4>
                            <p className="text-sm text-gray-600">
                                Capital Expenditure (spending) from the <strong>Cash Flow Statement</strong> increases Property, Plant & Equipment on the <strong>Balance Sheet</strong>.
                            </p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-11 bg-teal-100 text-teal-800 p-2 rounded-full">3</span>
                            <h4 className="font-bold">Depreciation</h4>
                            <p className="text-sm text-gray-600">
                                An expense on the Income Statement that <strong>lowers</strong> the value of PP&E assets on the Balance Sheet over time.
                            </p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-11 bg-teal-100 text-teal-800 p-2 rounded-full">4</span>
                            <h4 className="font-bold">Working Capital</h4>
                            <p className="text-sm text-gray-600">
                                Changes in Receivables, Inventory, and Payables on the Balance Sheet determine the "Operating Cash Flow" line on the Cash Flow Statement.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "7. Practical Reading Tips 🕵️‍♂️",
            icon: <FaLightbulb className="text-yellow-500" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="font-bold mb-4 text-gray-900 border-b pb-2">Where to Look First</h4>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span><strong>Cash Balance:</strong> Is it growing? Do they have enough to survive a downturn?</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span><strong>Debt Load:</strong> Compare Total Debt to Equity. High leverage = High risk.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span><strong>Working Capital:</strong> Are Current Assets &gt; Current Liabilities? (Safety check).</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                <span><strong>Equity Trend:</strong> Is Retained Earnings growing consistently?</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                        <h4 className="font-bold mb-4 text-red-800 border-b border-red-200 pb-2">🚩 Major Red Flags</h4>
                        <ul className="space-y-3 text-sm text-red-700">
                            <li className="flex items-start gap-2">
                                <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                <span><strong>Shrinking Cash + Rising Debt:</strong> A recipe for bankruptcy.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                <span><strong>Receivables growing faster than Sales:</strong> Customers aren't paying, or the company is stuffing channels.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                <span><strong>Inventory Buildup:</strong> Products aren't selling so they pile up in warehouses (risk of obsolescence).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                <span><strong>Large Goodwill:</strong> If it's huge relative to equity, they might be overpaying for acquisitions.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    ];

    const quizQuestions = [
        {
            id: 1,
            question: "Which equation is correct?",
            options: [
                "Assets = Liabilities - Equity",
                "Assets + Liabilities = Equity",
                "Assets = Liabilities + Equity"
            ],
            correct: 2,
            explanation: "The fundamental accounting equation is Assets = Liabilities + Equity. It must always balance!"
        },
        {
            id: 2,
            question: "Is 'Inventory' a Current or Non-Current Asset?",
            options: [
                "Current Asset",
                "Non-Current Asset",
                "Liability"
            ],
            correct: 0,
            explanation: "Inventory is a Current Asset because the company expects to sell it for cash within one year."
        },
        {
            id: 3,
            question: "What does 'Accounts Payable' represent?",
            options: [
                "Money customers owe us",
                "Money we owe to suppliers",
                "Profits kept by the company"
            ],
            correct: 1,
            explanation: "Accounts Payable is money the company owes to its vendors/suppliers for goods already received."
        },
        {
            id: 4,
            question: "If a company buys a machine for $1M cash, how does the Balance Sheet change?",
            options: [
                "Assets increase by $1M",
                "Assets decrease by $1M",
                "Total Assets stay the same"
            ],
            correct: 2,
            explanation: "Cash (Asset) goes down $1M, but PP&E (Asset) goes up $1M. The TOTAL Assets remain unchanged."
        },
        {
            id: 5,
            question: "Where do 'Retained Earnings' come from?",
            options: [
                "Sales Revenue",
                "Accumulated Net Income minus Dividends",
                "Money from bank loans"
            ],
            correct: 1,
            explanation: "Retained Earnings accumulates the Net Income (profit) earned over the company's life, less any dividends paid out."
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
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-t-xl text-white">
                <h2 className="text-3xl font-bold mb-2">Mastering the Balance Sheet</h2>
                <p className="text-blue-100">A comprehensive guide to understanding what a company owns and owes.</p>
            </div>

            <div className="p-8 space-y-12">
                {/* Content Sections */}
                {sections.slice(0, sections.length).map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="scroll-mt-8"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b pb-2">
                            <div className="bg-blue-50 p-3 rounded-full text-xl">{section.icon}</div>
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
                        <h3 className="text-2xl font-bold text-gray-800">Quiz 📝</h3>
                    </div>
                    <p className="text-gray-700 mb-8">Test your knowledge! Select the correct answer for each question.</p>

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
                                className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg shadow-lg"
                            >
                                Check Answers
                            </button>
                        ) : (
                            <div className="text-center p-8 bg-blue-50 rounded-xl border border-blue-100">
                                <h3 className="text-3xl font-bold mb-2 text-blue-900">You scored {calculateScore()} / {quizQuestions.length}</h3>
                                <p className="text-gray-600 mb-6 text-lg">{calculateScore() === 5 ? "Perfect Score! You're a Balance Sheet Pro! 🎓" : "Great effort! Review the sections above to master the concepts."}</p>
                                <button
                                    onClick={() => {
                                        setQuizAnswers({});
                                        setShowQuizResults(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
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
                <p className="text-lg"><strong>Remember:</strong> Assets = Liabilities + Equity.</p>
            </div>
        </div>
    );
};

export default BalanceSheetTutor;
