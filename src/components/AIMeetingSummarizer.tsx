
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, FileText, Clock, Users, Sparkles, Download } from 'lucide-react';

interface MeetingSummary {
  id: string;
  meetingTitle: string;
  date: string;
  duration: string;
  participants: number;
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string[];
}

const AIMeetingSummarizer: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaries, setSummaries] = useState<MeetingSummary[]>([
    {
      id: '1',
      meetingTitle: 'Product Strategy Q1 Review',
      date: 'Today, 2:30 PM',
      duration: '45 min',
      participants: 8,
      keyPoints: [
        'Q1 revenue exceeded targets by 15%',
        'User engagement metrics showing positive trends',
        'Need to prioritize mobile app improvements',
        'Budget approval for new features confirmed'
      ],
      actionItems: [
        'Sarah to prepare mobile roadmap by Friday',
        'Alex to coordinate with design team',
        'Follow up with stakeholders next week'
      ],
      nextSteps: [
        'Schedule design review meeting',
        'Prepare Q2 budget proposal',
        'Set up user feedback sessions'
      ]
    },
    {
      id: '2',
      meetingTitle: 'Team Standup - Development',
      date: 'Yesterday, 9:00 AM',
      duration: '30 min',
      participants: 6,
      keyPoints: [
        'Sprint goals on track for completion',
        'API integration challenges identified',
        'Testing phase scheduled for next week'
      ],
      actionItems: [
        'Mike to resolve API issues by tomorrow',
        'Emma to prepare test scenarios',
        'Schedule code review session'
      ],
      nextSteps: [
        'Begin integration testing',
        'Prepare demo for stakeholders',
        'Plan next sprint objectives'
      ]
    }
  ]);

  const generateSummary = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      const newSummary: MeetingSummary = {
        id: Date.now().toString(),
        meetingTitle: 'New Meeting Summary',
        date: 'Just now',
        duration: '35 min',
        participants: 5,
        keyPoints: [
          'AI-generated summary in progress...',
          'Key decisions and discussions captured',
          'Important insights highlighted'
        ],
        actionItems: [
          'AI identified action items',
          'Automatically assigned to participants'
        ],
        nextSteps: [
          'Follow-up meetings scheduled',
          'Next milestones defined'
        ]
      };
      setSummaries(prev => [newSummary, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="unite-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="unite-gradient p-3 rounded-xl">
            <Brain className="text-white h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Meeting Summarizer</h2>
            <p className="text-gray-600">Automatically capture key insights from your meetings</p>
          </div>
        </div>
        
        <Button 
          onClick={generateSummary}
          disabled={isGenerating}
          className="unite-button w-full"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Generate New Summary
            </>
          )}
        </Button>
      </div>

      {/* Recent Summaries */}
      <div className="space-y-4">
        {summaries.map((summary) => (
          <Card key={summary.id} className="unite-card hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {summary.meetingTitle}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{summary.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{summary.participants} participants</span>
                    </div>
                    <span>Duration: {summary.duration}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Download size={16} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Points */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <FileText size={16} className="mr-2 text-indigo-600" />
                  Key Points
                </h4>
                <ul className="space-y-1">
                  {summary.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Sparkles size={16} className="mr-2 text-cyan-600" />
                  Action Items
                </h4>
                <ul className="space-y-1">
                  {summary.actionItems.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Clock size={16} className="mr-2 text-purple-600" />
                  Next Steps
                </h4>
                <ul className="space-y-1">
                  {summary.nextSteps.map((step, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIMeetingSummarizer;
