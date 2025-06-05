
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Plus, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MessageBubble from '@/components/MessageBubble';

const ChatDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatData = location.state?.chatData;
  const [newMessage, setNewMessage] = useState('');

  if (!chatData) {
    navigate('/');
    return null;
  }

  const messages = [
    {
      id: '1',
      message: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      isSent: false,
      senderName: chatData.name,
      senderAvatar: chatData.avatar,
      isDelivered: true,
      isRead: true
    },
    {
      id: '2',
      message: 'I\'m doing great! Just finished the presentation for tomorrow.',
      timestamp: '10:32 AM',
      isSent: true,
      isDelivered: true,
      isRead: true
    },
    {
      id: '3',
      message: 'That\'s awesome! Can you share it with the team?',
      timestamp: '10:35 AM',
      isSent: false,
      senderName: chatData.name,
      senderAvatar: chatData.avatar,
      isDelivered: true,
      isRead: true
    },
    {
      id: '4',
      message: 'Sure! I\'ll send it in the group chat right now.',
      timestamp: '10:36 AM',
      isSent: true,
      isDelivered: true,
      isRead: false
    },
    {
      id: '5',
      message: chatData.lastMessage,
      timestamp: chatData.timestamp,
      isSent: false,
      senderName: chatData.name,
      senderAvatar: chatData.avatar,
      isDelivered: true,
      isRead: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full h-9 w-9 p-0"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={chatData.avatar} alt={chatData.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
              {chatData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{chatData.name}</h2>
            <p className="text-sm text-gray-500">
              {chatData.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
          
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4 safe-area-inset-bottom">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
            <Plus size={18} />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="rounded-full pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
            >
              <Smile size={16} />
            </Button>
          </div>
          
          <Button
            size="sm"
            className="rounded-full h-9 w-9 p-0 bg-gradient-to-r from-purple-500 to-blue-500"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
