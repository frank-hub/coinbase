// resources/js/Layouts/TopHeader.tsx
import React from 'react';
import { Home, User, Share2 } from 'lucide-react';

const TopHeader: React.FC = () => {
  return (
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
  );
};

export default TopHeader;
