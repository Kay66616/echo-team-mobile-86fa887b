
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Plus, Users, Hash, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Teams: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    {
      id: '1',
      name: 'Development Team',
      description: 'Frontend and Backend developers',
      memberCount: 12,
      channels: 5,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      isActive: true,
      lastActivity: '2 min ago'
    },
    {
      id: '2',
      name: 'Marketing Team',
      description: 'Digital marketing and content creation',
      memberCount: 8,
      channels: 3,
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150',
      isActive: true,
      lastActivity: '15 min ago'
    },
    {
      id: '3',
      name: 'Product Team',
      description: 'Product managers and designers',
      memberCount: 6,
      channels: 4,
      avatar: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150',
      isActive: false,
      lastActivity: '1 hour ago'
    }
  ];

  const recentChannels = [
    {
      id: '1',
      name: 'general',
      teamName: 'Development Team',
      unreadCount: 3,
      lastMessage: 'New deployment is ready',
      timestamp: '2:30 PM'
    },
    {
      id: '2',
      name: 'frontend',
      teamName: 'Development Team',
      unreadCount: 0,
      lastMessage: 'Updated the UI components',
      timestamp: '1:45 PM'
    },
    {
      id: '3',
      name: 'campaigns',
      teamName: 'Marketing Team',
      unreadCount: 7,
      lastMessage: 'Q4 campaign results are in',
      timestamp: '12:20 PM'
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
            <Button size="sm" variant="ghost" className="rounded-full h-9 w-9 p-0">
              <Plus size={18} />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Recent Channels */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Channels</h2>
            <div className="space-y-2">
              {recentChannels.map((channel) => (
                <Card key={channel.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Hash size={16} className="text-purple-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">#{channel.name}</h3>
                          {channel.unreadCount > 0 && (
                            <Badge className="bg-red-500 hover:bg-red-600 text-white min-w-[20px] h-5 text-xs">
                              {channel.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{channel.teamName}</p>
                        <p className="text-sm text-gray-600 truncate">{channel.lastMessage}</p>
                      </div>
                      
                      <span className="text-xs text-gray-400">{channel.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Teams */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Teams</h2>
            <div className="space-y-3">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={team.avatar} alt={team.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                          {team.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{team.name}</h3>
                          {team.isActive && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{team.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users size={12} />
                            <span>{team.memberCount} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Hash size={12} />
                            <span>{team.channels} channels</span>
                          </div>
                          <span>•</span>
                          <span>{team.lastActivity}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
