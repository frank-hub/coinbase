import React, { useState } from 'react';
import {
  Home,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  HelpCircle,
  User,
  Share2,
  X,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

const WovekMiningOperations = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<any>(null);
  const [tradeAmount, setTradeAmount] = useState('');

  const handleOpenModal = (engine: any) => {
    setSelectedEngine(engine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEngine(null);
    setTradeAmount('');
  };

  const handleStartMining = () => {
    console.log('Mining started with:', {
      engine: selectedEngine,
      amount: tradeAmount,
    });
    handleCloseModal();
  };

  const miningEngines = [
    {
      id: 1,
      name: 'ProfitPulse',
      roi: '10.00%',
      duration: '1 Day (24 Hrs)',
      minimumPrice: 'KSh 300.00',
      roiColor: 'text-green-400',
    },
    {
      id: 2,
      name: 'VaultMaster',
      roi: '12.00%',
      duration: '1 Day (24 Hrs)',
      minimumPrice: 'KSh 30,000.00',
      roiColor: 'text-green-400',
    },
    {
      id: 3,
      name: 'ProfitJet',
      roi: '14.00%',
      duration: '2 Days (48 Hrs)',
      minimumPrice: 'KSh 500.00',
      roiColor: 'text-green-400',
    },
    {
      id: 4,
      name: 'CryptoDrill',
      roi: '8.00%',
      duration: '12 Hours',
      minimumPrice: 'KSh 150.00',
      roiColor: 'text-green-400',
    },
    {
      id: 5,
      name: 'GoldRush',
      roi: '15.00%',
      duration: '3 Days (72 Hrs)',
      minimumPrice: 'KSh 1,000.00',
      roiColor: 'text-green-400',
    },
    {
      id: 6,
      name: 'DiamondMine',
      roi: '20.00%',
      duration: '7 Days (168 Hrs)',
      minimumPrice: 'KSh 5,000.00',
      roiColor: 'text-green-400',
    },
  ];

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

        {/* Page Title and Balance */}
        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
            <div>
                <h2 className="text-2xl font-bold text-orange-500 mb-1">
                Mining Operations
                </h2>
                <p className="text-gray-400 text-sm">Active mining operations</p>
            </div>
            <div className="bg-slate-700 px-3 py-2 rounded-lg">
                <span className="text-gray-300 text-sm">Balance: </span>
                <span className="text-white font-medium">KSh 0.00</span>
            </div>
            </div>
        </div>

        {/* All Engines Banner */}
        <div className="mx-4 mb-6 bg-orange-500 rounded-lg py-4 text-center">
            <h3 className="text-lg font-bold text-white">All Engines</h3>
        </div>

        {/* Mining Cards Grid */}
        <div className="px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {miningEngines.map((engine) => (
                <div
                key={engine.id}
                className="bg-slate-800 rounded-lg border-2 border-orange-500 p-4 relative"
                >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {engine.id}
                    </div>
                    <h4 className="text-white font-medium">
                        No. {engine.id}. {engine.name}
                    </h4>
                    </div>
                    <div className="text-right">
                    <span className="text-gray-400 text-sm">No. </span>
                    <span className="text-white font-bold text-lg">
                        {engine.id}
                    </span>
                    </div>
                </div>

                {/* Card Content */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                    <span className="text-gray-400">ROI:</span>
                    <span className={`font-bold ${engine.roiColor}`}>
                        {engine.roi}
                    </span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{engine.duration}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-400">Minimum Price:</span>
                    <span className="text-white font-medium">
                        {engine.minimumPrice}
                    </span>
                    </div>
                </div>

                {/* Mine Now Button */}
                <button
                    onClick={() => handleOpenModal(engine)}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                >
                    MINE NOW
                </button>
                </div>
            ))}
            </div>
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

        {/* Mining Modal */}
        {showModal && selectedEngine && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg w-full max-w-md p-6 relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Final Step To Mine</h3>
                <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-4">
                {/* Minimum Amount */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">
                    Minimum Amount:
                    </label>
                    <div className="bg-slate-700 rounded-lg p-3">
                    <span className="text-white font-medium">
                        {selectedEngine.minimumPrice}
                    </span>
                    </div>
                </div>

                {/* Package Type Name */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">
                    Package Type Name:
                    </label>
                    <div className="bg-slate-700 rounded-lg p-3">
                    <span className="text-white font-medium">
                        {selectedEngine.name}
                    </span>
                    </div>
                </div>

                {/* Enter Amount To Trade */}
                <div>
                    <label className="block text-gray-400 text-sm mb-2">
                    Enter Amount To Trade:
                    </label>
                    <input
                    type="text"
                    placeholder="Please enter amount to trade"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none placeholder-gray-400"
                    />
                </div>
                </div>

                {/* Modal Actions */}
                <div className="flex space-x-3 mt-8">
                <button
                    onClick={handleCloseModal}
                    className="flex-1 bg-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-500 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleStartMining}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                >
                    MINE NOW
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
  );
};

export default WovekMiningOperations;
