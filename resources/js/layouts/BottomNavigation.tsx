import React from 'react';
import { Link } from '@inertiajs/react';
import { Home, Zap, DollarSign, TrendingUp, Users, HelpCircle } from 'lucide-react';
import { url } from 'inspector';

interface BottomNavigationProps {
  activeTab: 'home' | 'active_engine' | 'mine' | 'earnings' | 'network' | 'help';
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const navigationItems = [
    {
      key: 'home',
      icon: Home,
      label: 'Home',
      url: 'dashboard/index'
    },
    {
      key: 'active_engine',
      icon: Zap,
      label: 'Active Engine',
      route: 'active_engine'
    },
    {
      key: 'mine',
      icon: DollarSign,
      label: 'Mine',
      route: 'mining_engines' // Updated to match your route name
    },
    {
      key: 'earnings',
      icon: TrendingUp,
      label: 'Earnings',
      route: 'earnings' // You'll need to add this route
    },
    {
      key: 'network',
      icon: Users,
      label: 'Network',
      route: 'network' // You'll need to add this route
    },
    {
      key: 'help',
      icon: HelpCircle,
      label: 'Help',
      route: 'help' // You'll need to add this route
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50">
      <div className="flex justify-around py-3">
        {navigationItems.map(({ key, icon: Icon, label, route }) => {
          const isActive = activeTab === key;

          return (
            <Link
              key={key}
              href={(route)}
              className="flex flex-col items-center space-y-1 min-w-0 flex-1"
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'text-orange-500' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-orange-500 font-medium' : 'text-gray-400'
                } truncate`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
