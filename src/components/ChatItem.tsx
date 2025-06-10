
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChatItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  unreadCount?: number;
  isOnline?: boolean;
  isGroup?: boolean;
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  lastMessage,
  timestamp,
  avatar,
  unreadCount = 0,
  isOnline = false,
  isGroup = false,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isOnline && !isGroup && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <span className="text-xs text-gray-500 ml-2">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">{lastMessage}</p>
      </div>
      
      {unreadCount > 0 && (
        <Badge className="ml-2 bg-red-500 hover:bg-red-600 text-white min-w-[20px] h-5 text-xs rounded-full">
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ChatItem;
