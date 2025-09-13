import React, { useState , useRef , useEffect } from 'react';
import { Home, Zap, DollarSign, TrendingUp, Users, HelpCircle, FileText, Package, User, Share2 } from 'lucide-react';
import { mining_engines , withdraw,deposit ,  } from '@/routes';
interface DashboardProps {}
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  height?: number;
  width?: string | number;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = "BITSTAMP:BTCUSD",
  interval = "1",
  theme = "dark",
  height = 610,
  width = "100%"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Clean up previous script if exists
    if (scriptRef.current) {
      scriptRef.current.remove();
    }

    // Create new script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      if (containerRef.current && (window as any).TradingView) {
        // Clear container
        containerRef.current.innerHTML = '';

        // Create widget
        new (window as any).TradingView.widget({
          autosize: false,
          width: width,
          height: height,
          symbol: symbol,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: theme === 'dark' ? "#1e293b" : "#f1f3f6",
          enable_publishing: false,
          backgroundColor: theme === 'dark' ? "#0f172a" : "#ffffff",
          gridColor: theme === 'dark' ? "#334155" : "#e5e7eb",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: true,
          container_id: containerRef.current,
          studies: [
            "Volume@tv-basicstudies"
          ],
          overrides: {
            "paneProperties.background": theme === 'dark' ? "#0f172a" : "#ffffff",
            "paneProperties.vertGridProperties.color": theme === 'dark' ? "#334155" : "#e5e7eb",
            "paneProperties.horzGridProperties.color": theme === 'dark' ? "#334155" : "#e5e7eb",
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": theme === 'dark' ? "#e2e8f0" : "#374151",
            "mainSeriesProperties.candleStyle.upColor": "#22c55e",
            "mainSeriesProperties.candleStyle.downColor": "#ef4444",
            "mainSeriesProperties.candleStyle.borderUpColor": "#22c55e",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444",
            "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444"
          }
        });
      }
    };

    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [symbol, interval, theme, height, width]);

  return (
    <div className="tradingview-chart-container w-full">
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
  interface DashboardProps {
    first_name: string;
    last_name: string;
    // Add other user properties as needed
  }
const Dashboard: React.FC<DashboardProps> = ({first_name, last_name}) => {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }
  const {
    totalWithdraws,
    availableBalance,
  } = usePage().props as unknown as {
      totalWithdraws: number;
      availableBalance: number;
  }

  const [activeEngines] = useState(0);
  const [oldEngines] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-gray-900 font-bold text-xs">Z</span>
            </div>
            <div>
              <h1 className="text-orange-500 font-bold text-lg">zibolijax</h1>
              <p className="text-gray-400 text-xs">CM#6539Tra-Pro</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-gray-400" />
            <Share2 className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Greeting */}
        <h2 className="text-lg mb-4"> {getGreeting()} {first_name} {last_name}</h2>

        {/* Balance Cards */}
        <div className="flex gap-3 mb-4">
          <div className="bg-orange-600 px-4 py-2 rounded-lg">
            <span className="text-sm">Balance: {availableBalance}</span>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <span className="text-sm">Withdrawals: {totalWithdraws}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <a href="/deposit" className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <span className="text-2xl">+</span>
            <span className="font-semibold">Deposit</span>
          </a>
          <a href="/withdraw" className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Withdraw</span>
          </a>
        </div>

        {/* Mining Offer Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-4 mb-4 relative">
          <div className="absolute top-2 right-2 bg-orange-500 text-xs px-2 py-1 rounded">
            OFFER
          </div>
          <div className="flex items-center mb-2">
            <Zap className="w-6 h-6 mr-2" />
            <h3 className="font-bold text-lg">SECURE UP TO 20% DAILY RETURNS.</h3>
          </div>
          <p className="text-sm mb-2">
            <span className="font-semibold">RIGHT NOW:</span> Min deposit from Ksh 300 to no max limit.
          </p>
          <p className="text-sm mb-4">
            💰 10% referral bonus (Optional) 🎮 Enjoy the auto-mining experience.
          </p>
          <a href='mining_engines' className="w-full bg-white text-purple-600 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
            <Zap className="w-5 h-5" />
            <span>🚀 ACTIVATE MINE NOW</span>
          </a>
        </div>

        {/* Live Activity */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Activity</span>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold">S</span>
              </div>
              <div>
                <p className="font-semibold">Shadrack Kigen</p>
                <p className="text-xs text-gray-400">Withdrew profit: ✓</p>
              </div>
            </div>
            <div className="text-green-500 font-bold">
              +KES 107,800
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-gray-400 text-sm">My Active Engines</span>
            </div>
            <p className="text-2xl font-bold">{activeEngines}</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-gray-400 text-sm">My Old Engines</span>
            </div>
            <p className="text-2xl font-bold">{oldEngines}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-20">
          <h3 className="text-gray-400 text-sm mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href='transactions' className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Transactions</span>
            </a>
            <a href='mining_engines' className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex items-center space-x-3 transition-colors">
              <Package className="w-5 h-5 text-orange-400" />
              <span>Mining Packages</span>
            </a>
            <a href='help' className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 flex items-center space-x-3 transition-colors col-span-2">
              <HelpCircle className="w-5 h-5 text-green-400" />
              <span>Helpline</span>
            </a>
          </div>
        </div>

        <div className="p-4">
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Market Chart</h2>
              <span className="text-sm text-gray-400">Live Trading Data</span>
            </div>
          </div>

          {/* TradingView Chart */}
          <div className="relative">
            <TradingViewChart
              symbol="BITSTAMP:BTCUSD"
              interval="1"
              theme="dark"
              height={500}
              width="100%"
            />
          </div>

          {/* Chart Footer */}
          <div className="p-3 bg-slate-700/50 text-center">
            <a
              href="https://www.tradingview.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              Track all markets on TradingView
            </a>
          </div>
        </div>
      </div>

      {/* Mining Stats */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Hash Rate</div>
          <div className="text-white font-bold text-xl">2.5 TH/s</div>
          <div className="text-green-400 text-sm">+5.2%</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Power Usage</div>
          <div className="text-white font-bold text-xl">1,200W</div>
          <div className="text-yellow-400 text-sm">Stable</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Daily Earnings</div>
          <div className="text-white font-bold text-xl">$42.50</div>
          <div className="text-green-400 text-sm">+12.3%</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Pool Fee</div>
          <div className="text-white font-bold text-xl">1.5%</div>
          <div className="text-gray-400 text-sm">Standard</div>
        </div>
      </div>

      {/* Alternative Chart Options */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Chart Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 transition-colors"
          >
            <div className="text-white font-medium mb-1">Bitcoin (BTC)</div>
            <div className="text-gray-400 text-sm">BITSTAMP:BTCUSD</div>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 transition-colors"
          >
            <div className="text-white font-medium mb-1">Ethereum (ETH)</div>
            <div className="text-gray-400 text-sm">BITSTAMP:ETHUSD</div>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 transition-colors"
          >
            <div className="text-white font-medium mb-1">Litecoin (LTC)</div>
            <div className="text-gray-400 text-sm">BITSTAMP:LTCUSD</div>
          </button>
        </div>
      </div>
      </main>

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

export default Dashboard;
