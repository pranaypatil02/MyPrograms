import { useState, useEffect } from 'react';
import { FaBalanceScale, FaLock, FaCheckCircle } from 'react-icons/fa';
import CourseContainer from './course/CourseContainer';
import { MODULE_2_CONTENT } from '../data/module2';

const BalanceSheetTutor = () => {
    const [mode, setMode] = useState('overview'); // 'overview' or 'course'
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Calculate progress for Module 2
        const completed = JSON.parse(localStorage.getItem('module2_progress') || '[]');
        const percent = Math.round((completed.length / MODULE_2_CONTENT.sections.length) * 100);
        setProgress(percent);
    }, [mode]); // Update when switching back to overview

    if (mode === 'course') {
        return <CourseContainer
            moduleData={MODULE_2_CONTENT}
            moduleId="module2"
            onBack={() => setMode('overview')}
        />;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
                    <FaBalanceScale className="text-4xl text-blue-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Balance Sheet Masterclass</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Understand a company's financial snapshot. Learn to evaluate what a company owns (Assets) and what it owes (Liabilities) to determine its true equity value.
                </p>
            </div>

            {/* Progress Summary Widget */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Your Progress</h3>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-green-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{progress}% Completed</p>
                </div>
                <div>
                    <button
                        onClick={() => setMode('course')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1"
                    >
                        {progress > 0 ? 'Continue Module 2' : 'Start Module 2'}
                    </button>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Module 1 - Completed/Available */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-75">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Module 1</span>
                        <FaCheckCircle className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">Income Statement Fundamentals</h3>
                    <p className="text-gray-500 text-sm">
                        Learn how companies earn, spend, and profit. Master margins and EPS.
                    </p>
                    <span className="text-gray-400 text-xs mt-4 block font-medium uppercase tracking-wider">Available in Earnings</span>
                </div>

                {/* Module 2 - Active */}
                <div className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all group cursor-pointer" onClick={() => setMode('course')}>
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Module 2</span>
                        {progress === 100 && <FaCheckCircle className="text-green-500 text-xl" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Balance Sheet Basics</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Assets, Liabilities, and Equity. Understand what a company owns and owes, and the golden equation.
                    </p>
                    <span className="text-blue-600 text-sm font-semibold group-hover:underline">
                        {progress > 0 ? 'Resume Learning →' : 'Start Learning →'}
                    </span>
                </div>

                {/* Module 3 - Locked */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-75 hidden md:block">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Module 3</span>
                        <FaLock className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">Cash Flow Analysis</h3>
                    <p className="text-gray-500 text-sm">
                        Cash vs. Profit. How money actually moves in and out of the business.
                    </p>
                    <span className="text-gray-400 text-xs mt-4 block font-medium uppercase tracking-wider">Coming Soon</span>
                </div>

                {/* Module 4 - Locked */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-75 hidden md:block">
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Module 4</span>
                        <FaLock className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2">Valuation Ratios</h3>
                    <p className="text-gray-500 text-sm">
                        P/E, EV/EBITDA, and FCF Yield. How to tell if a stock is cheap or expensive.
                    </p>
                    <span className="text-gray-400 text-xs mt-4 block font-medium uppercase tracking-wider">Coming Soon</span>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheetTutor;
