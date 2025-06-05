
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import VideoCallGrid from '@/components/VideoCallGrid';
import { Phone, Video, Users, Clock, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Calls: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const participants = [
    {
      id: '1',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      isMuted: isMuted,
      isVideoOn: isVideoOn
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b401?w=150',
      isMuted: false,
      isVideoOn: true,
      isPresenting: true
    },
    {
      id: '3',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isMuted: true,
      isVideoOn: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      isMuted: false,
      isVideoOn: true
    }
  ];

  const recentCalls = [
    {
      id: '1',
      name: 'Team Standup',
      type: 'video',
      participants: 5,
      timestamp: '2 hours ago',
      duration: '45 min',
      missed: false
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      type: 'audio',
      participants: 1,
      timestamp: 'Yesterday',
      duration: '12 min',
      missed: false
    },
    {
      id: '3',
      name: 'Product Review',
      type: 'video',
      participants: 8,
      timestamp: 'Yesterday',
      duration: '1h 20min',
      missed: true
    },
    {
      id: '4',
      name: 'Alex Chen',
      type: 'audio',
      participants: 1,
      timestamp: '2 days ago',
      duration: '8 min',
      missed: false
    }
  ];

  if (isInCall) {
    return (
      <VideoCallGrid
        participants={participants}
        isInCall={isInCall}
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        onToggleMute={() => setIsMuted(!isMuted)}
        onToggleVideo={() => setIsVideoOn(!isVideoOn)}
        onEndCall={() => setIsInCall(false)}
      />
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
          <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow teams-card">
              <CardContent className="p-4 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Start Call</h3>
                <p className="text-sm text-gray-500">Audio call</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow teams-card"
              onClick={() => setIsInCall(true)}
            >
              <CardContent className="p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Join Meeting</h3>
                <p className="text-sm text-gray-500">Video call</p>
              </CardContent>
            </Card>
          </div>

          {/* Ongoing Meetings */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Ongoing Meetings</h2>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Video size={16} className="text-red-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Weekly Team Sync</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>4 participants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>Started 15 min ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                    onClick={() => setIsInCall(true)}
                  >
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Calls */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent</h2>
            <div className="space-y-2">
              {recentCalls.map((call) => (
                <Card key={call.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
                          {call.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 truncate">{call.name}</h3>
                          {call.missed && (
                            <span className="text-red-500 text-xs">(Missed)</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            {call.type === 'video' ? <Video size={12} /> : <Phone size={12} />}
                            <span>{call.type === 'video' ? 'Video' : 'Audio'}</span>
                          </div>
                          <span>•</span>
                          <span>{call.duration}</span>
                          <span>•</span>
                          <span>{call.timestamp}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                        <PhoneCall size={16} />
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

export default Calls;
