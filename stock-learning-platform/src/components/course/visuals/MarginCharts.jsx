import React from 'react';

const MarginCharts = ({ data }) => {
    // Default Apple-like structure
    const {
        cogsPercent = 54,
        opexPercent = 14,
        taxPercent = 5,
        profitPercent = 27
    } = data || {};

    return (
        <div className="w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-8">
            <h3 className="text-lg font-bold text-center text-gray-900 mb-4">The "$1 of Revenue" Test</h3>
            <p className="text-center text-gray-500 text-sm mb-8">For every $1 bill the company collects from customers, where does the money go?</p>

            <div className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden flex border border-gray-300 shadow-inner">
                {/* Cost of Revenue */}
                <div
                    className="h-full bg-red-200 hover:bg-red-300 transition-colors flex items-center justify-center text-red-900 font-bold text-sm relative group cursor-help"
                    style={{ width: `${cogsPercent}%` }}
                >
                    <span className="hidden sm:inline">Product Costs</span>
                    <span className="sm:hidden">Costs</span>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-md pointer-events-none">
                        {cogsPercent}¢
                    </div>
                </div>

                {/* OpEx */}
                <div
                    className="h-full bg-orange-200 hover:bg-orange-300 transition-colors flex items-center justify-center text-orange-900 font-bold text-sm relative group cursor-help"
                    style={{ width: `${opexPercent}%` }}
                >
                    <span className="hidden sm:inline">Operating Exp</span>
                    <span className="sm:hidden">OpEx</span>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-md pointer-events-none">
                        {opexPercent}¢
                    </div>
                </div>

                {/* Taxes */}
                <div
                    className="h-full bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center text-gray-800 font-bold text-sm relative group cursor-help"
                    style={{ width: `${taxPercent}%` }}
                >
                    <span className="hidden sm:inline">Tax</span>
                    <span className="sm:hidden">Tax</span>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-md pointer-events-none">
                        {taxPercent}¢
                    </div>
                </div>

                {/* Net Profit */}
                <div
                    className="h-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center text-white font-bold text-sm relative group cursor-help"
                    style={{ width: `${profitPercent}%` }}
                >
                    <span className="hidden sm:inline">Profit</span>
                    <span className="sm:hidden">Profit</span>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-1 rounded shadow-md pointer-events-none text-green-800">
                        {profitPercent}¢
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200 rounded"></div> Cost of Revenue ({cogsPercent}¢)
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-200 rounded"></div> Operating Expenses ({opexPercent}¢)
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div> Taxes & Interest ({taxPercent}¢)
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div> Net Profit ({profitPercent}¢)
                </div>
            </div>
        </div>
    );
};

export default MarginCharts;
