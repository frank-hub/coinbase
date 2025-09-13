import React, { useState } from 'react';
import { Home, Zap, Activity, BarChart3, Users, HelpCircle, TrendingUp, DollarSign, Copy } from 'lucide-react';

const ReferralPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invite' | 'earnings'>('overview');

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://minershub.pro/register?MinersHubCo=Apple');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center mr-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-orange-400 text-xs font-medium">CRYPTO</div>
            <div className="text-orange-400 text-xs font-medium">MINE PRO</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-2">Referral Program</h2>
            <p className="text-slate-400 text-sm">Invite friends and earn 10% commission on their first deposit</p>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('invite')}
              className={`py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                activeTab === 'invite'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Invite Friends
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                activeTab === 'earnings'
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              Earnings
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400 text-sm">Total Referrals</span>
              </div>
              <div className="text-white text-4xl font-bold mb-1">0</div>
              <div className="text-slate-500 text-sm">People you've invited</div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-slate-400 text-sm">Total Earnings</span>
              </div>
              <div className="text-green-400 text-4xl font-bold mb-1">KES 0.00</div>
              <div className="text-slate-500 text-sm">Commission earned</div>
            </div>
          </div>

          {/* Referral Performance */}
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <h3 className="text-orange-400 text-lg font-semibold">Referral Performance</h3>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-400">Commission Rate</span>
              <span className="text-orange-400 text-2xl font-bold">10%</span>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Your Referral Link and Team:</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://minershub.pro/register?MinersHubCo=Apple"
                  readOnly
                  className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg text-sm border border-slate-600"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* How it Works */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Share Your Link</h4>
                      <p className="text-slate-400 text-sm">Share your unique referral link with friends and family</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">They Join & Invest</h4>
                      <p className="text-slate-400 text-sm">Your friends sign up and make their first deposit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">You Earn Commission</h4>
                      <p className="text-slate-400 text-sm">Receive 10% commission on their first deposit instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invite' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Invite Methods</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
                    Share via WhatsApp
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium">
                    Share via Facebook
                  </button>
                  <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium">
                    Share via Twitter
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium">
                    Share via SMS
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Earnings History</h3>
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h4 className="text-slate-400 text-lg mb-2">No Earnings Yet</h4>
                  <p className="text-slate-500 mb-6">Start inviting friends to see your earnings here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center p-2 text-orange-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>
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

export default ReferralPage;
