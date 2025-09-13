import React, { useState } from "react";
import { ArrowLeft, Filter, Zap } from "lucide-react";

const Transactions: React.FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [timePeriod, setTimePeriod] = useState("All Time");

  const transactionTypes = [
    "All",
    "Deposit",
    "Withdrawal",
    "Active Mining",
    "Old Mining",
    "Referral",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-lg font-bold">Transaction History</h1>
        <button className="text-gray-400 hover:text-white">
          ⬇️
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Deposits</p>
          <p className="text-green-500 font-bold text-lg">KES 0.00</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Withdrawn</p>
          <p className="text-orange-500 font-bold text-lg">KES 0.00</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">Filter Transactions</h2>
          <Filter className="w-5 h-5 text-gray-400" />
        </div>

        <div className="mb-4">
          <p className="text-gray-400 text-sm mb-2">Transaction Type</p>
          <div className="flex flex-wrap gap-2">
            {transactionTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedType === type
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-2">Time Period</p>
          <button className="px-3 py-1 rounded-full text-sm bg-orange-500 text-white">
            {timePeriod}
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-lg p-6 text-center mb-6">
        <h3 className="font-bold mb-4 text-left">Recent Transactions</h3>
        <Zap className="w-10 h-10 mx-auto text-gray-500 mb-2" />
        <p className="text-gray-400">No Completed Transactions.</p>
        <p className="text-gray-500 text-sm mb-4">
          Deposit now to start mining.
        </p>
        <a href="/deposit" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 mx-auto">
          <Zap className="w-4 h-4" />
          <span>Deposit Now</span>
        </a>
      </div>

      {/* Export Options */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-bold mb-3">Export Options</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-semibold">
            Export PDF
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-semibold">
            Export Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
