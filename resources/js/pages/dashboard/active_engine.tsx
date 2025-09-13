import React, { useState } from 'react';
import { Home, Zap, DollarSign, TrendingUp, Users, HelpCircle, User, Share2, RefreshCw, Clock } from 'lucide-react';

const ActiveEngine = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-orange-500">wovek</h1>
            <p className="text-xs text-gray-400">CM#8606Tra-Pro</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-gray-400" />
          <Share2 className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Page Title and Date */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-orange-500" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Mining Operations</h2>
              <p className="text-gray-400 text-sm">Since Date: 06/09/2025 12:34:15</p>
            </div>
          </div>
          <RefreshCw className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Available Balances Section */}
      <div className="mx-4 mb-6">
        <div className="bg-green-800 rounded-lg p-4 border border-green-700">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-green-400 font-medium">Available Balances</h3>
          </div>
          <div className="mb-1">
            <span className="text-white text-3xl font-bold">KES 0.00</span>
          </div>
          <p className="text-green-300 text-sm">Total from KES 0.00 earnings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Investments */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Total Investments</span>
            </div>
            <span className="text-white text-2xl font-bold">KES 0.00</span>
          </div>

          {/* Total Earnings */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Total Earnings</span>
            </div>
            <span className="text-white text-2xl font-bold">KES 0.00</span>
          </div>

          {/* All Time Profits */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">All Time Profits</span>
            </div>
            <span className="text-white text-2xl font-bold">KES 0.00</span>
          </div>
        </div>
      </div>

      {/* Active/Completed Tabs */}
      <div className="px-4 mb-6">
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 px-6 font-bold text-center transition-colors ${
              activeTab === 'active'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Active Mining (0)
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-4 px-6 font-bold text-center transition-colors ${
              activeTab === 'completed'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            Completed (0)
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-24">
        {activeTab === 'active' ? (
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No Active Mining Operations</h3>
            <p className="text-gray-500 text-sm">Start mining to see your active operations here</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No Completed Mining Operations</h3>
            <p className="text-gray-500 text-sm">Completed mining operations will appear here</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around py-2">
          <a href='/dashboard' className="flex flex-col items-center p-2 text-orange-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </a>
          <a href='/active-engine' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <Zap className="w-6 h-6 mb-1" />
            <span className="text-xs">Active Engine</span>
          </a>
          <a href='/mining_engines' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <DollarSign className="w-6 h-6 mb-1" />
            <span className="text-xs">Mine</span>
          </a>
          <a href='/earnings' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <TrendingUp className="w-6 h-6 mb-1" />
            <span className="text-xs">Earnings</span>
          </a>
          <a href='/network' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Network</span>
          </a>
          <a href='/help' className="flex flex-col items-center p-2 text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Help</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default ActiveEngine;
