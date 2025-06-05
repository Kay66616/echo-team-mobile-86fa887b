
import React from 'react';
import { MessageCircle, Video, Users, FileText, Settings, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'chats', icon: MessageCircle, label: 'Chats', path: '/' },
    { id: 'teams', icon: Users, label: 'Teams', path: '/teams' },
    { id: 'calls', icon: Video, label: 'Calls', path: '/calls' },
    { id: 'files', icon: FileText, label: 'Files', path: '/files' },
    { id: 'settings', icon: Settings, label: 'More', path: '/settings' },
  ];

  const activeTab = tabs.find(tab => tab.path === location.pathname)?.id || 'chats';

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">
      {/* Header with Unite branding */}
      <div className="unite-gradient h-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
        <div className="flex items-center space-x-3 z-10">
          <div className="relative">
            <Sparkles className="text-white h-8 w-8 floating-element" />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wide">Unite</h1>
        </div>
      </div>

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* Enhanced Bottom Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-t border-white/20 px-2 py-2 safe-area-inset-bottom shadow-2xl">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 transform ${
                  isActive 
                    ? 'unite-nav-active scale-110' 
                    : 'unite-nav-inactive hover:scale-105'
                }`}
              >
                <Icon size={24} className={isActive ? 'text-white' : ''} />
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-white' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
