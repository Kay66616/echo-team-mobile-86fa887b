
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface ScheduleSuggestion {
  id: string;
  date: string;
  time: string;
  duration: string;
  confidence: number;
  conflicts: string[];
  attendeeAvailability: string;
}

const SmartScheduler: React.FC = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [attendees, setAttendees] = useState('');
  const [duration, setDuration] = useState('60');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<ScheduleSuggestion[]>([]);

  const analyzeBestTimes = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions: ScheduleSuggestion[] = [
        {
          id: '1',
          date: 'Tomorrow',
          time: '2:00 PM - 3:00 PM',
          duration: '60 min',
          confidence: 95,
          conflicts: [],
          attendeeAvailability: 'All attendees available'
        },
        {
          id: '2',
          date: 'Monday',
          time: '10:00 AM - 11:00 AM',
          duration: '60 min',
          confidence: 88,
          conflicts: ['Sarah has a soft conflict'],
          attendeeAvailability: '4/5 attendees available'
        },
        {
          id: '3',
          date: 'Tuesday',
          time: '3:00 PM - 4:00 PM',
          duration: '60 min',
          confidence: 82,
          conflicts: ['Overlaps with Alex\'s lunch'],
          attendeeAvailability: '4/5 attendees available'
        }
      ];
      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
    }, 2500);
  };

  const scheduleMeeting = (suggestion: ScheduleSuggestion) => {
    alert(`Meeting "${meetingTitle}" scheduled for ${suggestion.date} at ${suggestion.time}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="unite-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="unite-gradient p-3 rounded-xl">
            <Zap className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Smart Scheduler</h2>
            <p className="text-gray-600">AI-powered meeting scheduling that finds the perfect time</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Meeting Title
            </Label>
            <Input
              id="title"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Enter meeting title..."
              className="mt-1 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <Label htmlFor="attendees" className="text-sm font-medium text-gray-700">
              Attendees (email addresses)
            </Label>
            <Input
              id="attendees"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              placeholder="sarah@company.com, alex@company.com..."
              className="mt-1 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <Button
            onClick={analyzeBestTimes}
            disabled={!meetingTitle || !attendees || isAnalyzing}
            className="unite-button w-full"
          >
            {isAnalyzing ? (
              <>
                <Zap className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing Calendars...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Find Best Times
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-indigo-600" />
            Smart Suggestions
          </h3>
          
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="unite-card hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {suggestion.date} • {suggestion.time}
                      </p>
                      <p className="text-sm text-gray-600">{suggestion.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      suggestion.confidence >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : suggestion.confidence >= 80 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {suggestion.confidence}% confidence
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{suggestion.attendeeAvailability}</span>
                  </div>
                  
                  {suggestion.conflicts.length > 0 && (
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div className="text-sm text-orange-700">
                        {suggestion.conflicts.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  {suggestion.conflicts.length === 0 && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-700">No conflicts detected</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => scheduleMeeting(suggestion)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Schedule This Time
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartScheduler;
