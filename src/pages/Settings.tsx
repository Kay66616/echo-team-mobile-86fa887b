
import React from 'react';
import Layout from '@/components/Layout';
import { User, Bell, Shield, Palette, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: 'profile', icon: User, label: 'Profile', hasArrow: true },
        { id: 'notifications', icon: Bell, label: 'Notifications', hasSwitch: true, enabled: true },
        { id: 'privacy', icon: Shield, label: 'Privacy & Security', hasArrow: true }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'appearance', icon: Palette, label: 'Appearance', hasArrow: true, subtitle: 'Light' },
        { id: 'sound', icon: Bell, label: 'Sound & Vibration', hasSwitch: true, enabled: false }
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: HelpCircle, label: 'Help & Support', hasArrow: true },
        { id: 'logout', icon: LogOut, label: 'Sign Out', textColor: 'text-red-600' }
      ]
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Profile Section */}
          <div className="bg-white p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold text-lg">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-gray-500">john.doe@company.com</p>
                <p className="text-sm text-green-600 mt-1">Available</p>
              </div>
            </div>
          </div>

          {/* Settings Groups */}
          <div className="p-4 space-y-6">
            {settingsGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {group.title}
                </h3>
                
                <Card>
                  <CardContent className="p-0">
                    {group.items.map((item, index) => {
                      const Icon = item.icon;
                      const isLast = index === group.items.length - 1;
                      
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !isLast ? 'border-b border-gray-100' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon 
                              size={20} 
                              className={item.textColor || 'text-gray-600'} 
                            />
                            <div>
                              <span className={`font-medium ${item.textColor || 'text-gray-900'}`}>
                                {item.label}
                              </span>
                              {item.subtitle && (
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {item.hasSwitch && (
                              <Switch checked={item.enabled} />
                            )}
                            {item.hasArrow && (
                              <ChevronRight size={16} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* App Info */}
          <div className="p-4 text-center text-sm text-gray-500 border-t border-gray-200">
            <p>Echo Teams Mobile</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
