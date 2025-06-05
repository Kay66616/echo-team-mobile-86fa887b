
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isSent: boolean;
  senderName?: string;
  senderAvatar?: string;
  isRead?: boolean;
  isDelivered?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  timestamp,
  isSent,
  senderName,
  senderAvatar,
  isRead = false,
  isDelivered = false
}) => {
  return (
    <div className={`flex items-end space-x-2 mb-4 ${isSent ? 'justify-end' : 'justify-start'}`}>
      {!isSent && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white text-xs font-semibold">
            {senderName?.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'}`}>
        {!isSent && senderName && (
          <span className="text-xs text-gray-500 mb-1 ml-2">{senderName}</span>
        )}
        
        <div className={`message-bubble ${isSent ? 'message-sent' : 'message-received'}`}>
          <p className="text-sm">{message}</p>
        </div>
        
        <div className="flex items-center space-x-1 mt-1">
          <span className="text-xs text-gray-400">{timestamp}</span>
          {isSent && (
            <div className="flex items-center">
              {isRead ? (
                <CheckCheck size={14} className="text-blue-500" />
              ) : isDelivered ? (
                <CheckCheck size={14} className="text-gray-400" />
              ) : (
                <Check size={14} className="text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
