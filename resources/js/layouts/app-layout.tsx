// resources/js/Layouts/AppLayout.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import BottomNavigation from './BottomNavigation';
import TopHeader from './TopHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  activeTab?: 'home' | 'active_engine' | 'mine' | 'earnings' | 'network' | 'help';
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'Wovek',
  activeTab = 'home'
}) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-slate-900 text-white">
        <TopHeader />
        <main className="pb-20">
          {children}
        </main>
        <BottomNavigation activeTab={activeTab} />
      </div>
    </>
  );
};

export default AppLayout;


