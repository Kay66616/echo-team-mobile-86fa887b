
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ChatItem from '@/components/ChatItem';
import { Search, Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the meeting notes!',
      timestamp: '2:30 PM',
      unreadCount: 2,
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b401?w=150'
    },
    {
      id: '2',
      name: 'Development Team',
      lastMessage: 'Mike: The new feature is ready for testing',
      timestamp: '1:45 PM',
      unreadCount: 5,
      isGroup: true,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150'
    },
    {
      id: '3',
      name: 'Alex Chen',
      lastMessage: 'Can we schedule a call tomorrow?',
      timestamp: '12:20 PM',
      isOnline: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: '4',
      name: 'Marketing Team',
      lastMessage: 'Lisa: Campaign results are looking great!',
      timestamp: '11:30 AM',
      unreadCount: 1,
      isGroup: true,
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150'
    },
    {
      id: '5',
      name: 'Emma Wilson',
      lastMessage: 'Perfect! See you at 3 PM',
      timestamp: 'Yesterday',
      isOnline: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost" className="rounded-full h-9 w-9 p-0">
                <Filter size={18} />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full h-9 w-9 p-0">
                <Plus size={18} />
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0 focus:bg-white"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatItem
                key={chat.id}
                {...chat}
                onClick={() => navigate(`/chat/${chat.id}`, { state: { chatData: chat } })}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Search size={48} className="mb-4 text-gray-300" />
              <p>No chats found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
