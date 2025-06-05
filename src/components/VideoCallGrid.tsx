
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, MicOff, Video, VideoOff, Phone, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isPresenting?: boolean;
}

interface VideoCallGridProps {
  participants: Participant[];
  isInCall: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
}

const VideoCallGrid: React.FC<VideoCallGridProps> = ({
  participants,
  isInCall,
  isMuted,
  isVideoOn,
  onToggleMute,
  onToggleVideo,
  onEndCall
}) => {
  const getGridCols = (count: number) => {
    if (count <= 1) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 9) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Video Grid */}
      <div className="flex-1 p-4">
        <div className={`grid gap-2 h-full ${getGridCols(participants.length)}`}>
          {participants.map((participant) => (
            <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
              {participant.isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm">Video Stream</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold text-lg">
                      {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {/* Participant Info */}
              <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                  {participant.name}
                </span>
                {participant.isMuted && (
                  <div className="bg-red-500 p-1 rounded-full">
                    <MicOff size={12} className="text-white" />
                  </div>
                )}
              </div>
              
              {participant.isPresenting && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Presenting
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Call Controls */}
      {isInCall && (
        <div className="bg-gray-800 p-4 safe-area-inset-bottom">
          <div className="flex justify-center space-x-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="lg"
              className="rounded-full h-12 w-12"
              onClick={onToggleMute}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
            
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="lg"
              className="rounded-full h-12 w-12"
              onClick={onToggleVideo}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </Button>
            
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full h-12 w-12"
              onClick={onEndCall}
            >
              <Phone size={20} />
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full h-12 w-12"
            >
              <MoreVertical size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallGrid;
