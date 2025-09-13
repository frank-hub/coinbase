import React from 'react';
import { Home, Zap, TrendingUp, DollarSign, Users, HelpCircle } from 'lucide-react';
import {usePage, router} from '@inertiajs/react';

interface SuccessStory {
  name: string;
  initial: string;
  total: string;
  story: string;
  verified: boolean;
}

const EarningsPage: React.FC = () => {
    const {
        totalDeposits,
        withdraws,
    } = usePage().props as unknown as {
        totalDeposits: number;
        withdraws: number;
    };

  const successStories: SuccessStory[] = [
    {
      name: 'Grace N.',
      initial: 'KES 2,000',
      total: 'KES 87,300',
      story: 'I began with just KES 2,000. Now, I earn daily without lifting a finger. CryptoMine Pro is my silent partner!',
      verified: true
    },
    {
      name: 'Daniel K.',
      initial: 'KES 1,500',
      total: 'KES 62,800',
      story: 'I started with KES 1,500 and now I\'m getting returns daily. CryptoMine Pro really delivers!',
      verified: true
    },
    {
      name: 'Mercy W.',
      initial: 'KES 3,000',
      total: 'KES 94,500',
      story: 'I was skeptical at first, but after my first payout, I knew this was the real deal. Started with KES 3,000.',
      verified: true
    },
    {
      name: 'Kevin M.',
      initial: 'KES 500',
      total: 'KES 28,200',
      story: 'This feels like having money work for me 24/7. Began with KES 500, now my balance keeps growing.',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-orange-400 font-bold">Apple</h1>
              <p className="text-slate-400 text-xs">CM#8004Tra-Pro</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-6 h-6 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h2 className="text-orange-400 text-xl font-semibold mb-1">Your Success Portfolio</h2>
            <p className="text-slate-400 text-sm">Track your investment growth</p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-2">Total Deposits</div>
              <div className="text-green-400 text-2xl font-bold">KES {totalDeposits}</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-slate-400 text-sm mb-2">Total Withdrawn</div>
              <div className="text-orange-400 text-2xl font-bold">KES {withdraws}</div>
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm">🏆</span>
                </div>
                <h3 className="text-orange-400 text-lg font-semibold">Success Stories</h3>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Verified Earnings</span>
              </div>
            </div>

            <div className="space-y-4">
              {successStories.map((story, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {story.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{story.name}</h4>
                        {story.verified && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-xs">Verified Story</span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                        "{story.story}"
                      </p>
                      <div className="text-orange-400 font-bold text-sm">
                        +{story.total} total
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    </div>
  );
};

export default EarningsPage;
