
import React from 'react';
import { MessageCircle, Video, Users, FileText, Settings } from 'lucide-react';
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-1 safe-area-inset-bottom">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={24} className={isActive ? 'text-purple-600' : ''} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
