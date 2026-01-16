import React from 'react';

const ProfitabilityWaterfall = ({ data }) => {
    // Default data structure if not provided
    const {
        revenue = 100,
        costOfRevenue = 60,
        grossProfit = 40,
        opExpenses = 20,
        opIncome = 20,
        taxes = 5,
        netIncome = 15
    } = data || {};

    // Calculate heights relative to Revenue (100%)
    const getHeight = (val) => Math.max((val / revenue) * 100, 2); // Min 2% height for visibility

    return (
        <div className="w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm my-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Profitability Waterfall: Where the Money Goes</h3>

            <div className="flex items-end justify-between h-64 gap-2 text-xs font-medium text-gray-600 sm:text-sm">

                {/* Revenue Column */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 font-bold text-blue-600">${revenue}</div>
                    <div className="w-full bg-blue-500 rounded-t-lg transition-all group-hover:bg-blue-600 relative" style={{ height: '100%' }}>
                        <span className="absolute bottom-2 left-0 right-0 text-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                    </div>
                    <div className="mt-2 text-center h-8 leading-tight">Total<br />Revenue</div>
                </div>

                {/* Subtraction Arrows or Space */}
                <div className="pb-8 text-gray-400 font-bold text-xl">-</div>

                {/* COGS Column */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 text-red-500">-${costOfRevenue}</div>
                    <div className="w-full bg-red-400 rounded-t-lg transition-all group-hover:bg-red-500" style={{ height: `${getHeight(costOfRevenue)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight">Cost of<br />Revenue</div>
                </div>

                {/* Equals */}
                <div className="pb-8 text-gray-400 font-bold text-xl">=</div>

                {/* Gross Profit */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 text-gray-800">${grossProfit}</div>
                    <div className="w-full bg-blue-400 rounded-t-lg transition-all group-hover:bg-blue-500" style={{ height: `${getHeight(grossProfit)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight">Gross<br />Profit</div>
                </div>

                <div className="pb-8 text-gray-400 font-bold text-xl">-</div>

                {/* OpEx */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 text-red-500">-${opExpenses}</div>
                    <div className="w-full bg-red-400 rounded-t-lg transition-all group-hover:bg-red-500" style={{ height: `${getHeight(opExpenses)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight">Op.<br />Expenses</div>
                </div>

                <div className="pb-8 text-gray-400 font-bold text-xl">=</div>

                {/* Op Income */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 text-gray-800">${opIncome}</div>
                    <div className="w-full bg-blue-300 rounded-t-lg transition-all group-hover:bg-blue-500" style={{ height: `${getHeight(opIncome)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight">Operating<br />Income</div>
                </div>

                <div className="pb-8 text-gray-400 font-bold text-xl">-</div>

                {/* Tax */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 text-red-500">-${taxes}</div>
                    <div className="w-full bg-red-400 rounded-t-lg transition-all group-hover:bg-red-500" style={{ height: `${getHeight(taxes)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight">Taxes<br />& Other</div>
                </div>

                <div className="pb-8 text-gray-400 font-bold text-xl">=</div>

                {/* Net Income */}
                <div className="flex flex-col items-center w-full group">
                    <div className="mb-2 font-bold text-green-600">${netIncome}</div>
                    <div className="w-full bg-green-500 rounded-t-lg transition-all group-hover:bg-green-600 shadow-md transform hover:scale-105" style={{ height: `${getHeight(netIncome)}%` }}></div>
                    <div className="mt-2 text-center h-8 leading-tight font-bold text-green-700">Net<br />Income</div>
                </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">* Simplified waterfall excluding some non-operating items for clarity.</p>
        </div>
    );
};

export default ProfitabilityWaterfall;
