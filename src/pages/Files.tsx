
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, MoreVertical, Download, Share, FileText, Image, File, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Files: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const files = [
    {
      id: '1',
      name: 'Project Proposal.docx',
      type: 'document',
      size: '2.4 MB',
      modifiedDate: '2 hours ago',
      owner: 'Sarah Johnson',
      shared: true,
      isFolder: false
    },
    {
      id: '2',
      name: 'Design Assets',
      type: 'folder',
      itemCount: 24,
      modifiedDate: '1 day ago',
      owner: 'Alex Chen',
      shared: false,
      isFolder: true
    },
    {
      id: '3',
      name: 'Screenshot_2024.png',
      type: 'image',
      size: '1.8 MB',
      modifiedDate: '3 days ago',
      owner: 'Emma Wilson',
      shared: true,
      isFolder: false
    },
    {
      id: '4',
      name: 'Meeting Notes.pdf',
      type: 'document',
      size: '856 KB',
      modifiedDate: '1 week ago',
      owner: 'Mike Davis',
      shared: false,
      isFolder: false
    },
    {
      id: '5',
      name: 'Product Roadmap.xlsx',
      type: 'document',
      size: '1.2 MB',
      modifiedDate: '2 weeks ago',
      owner: 'Lisa Brown',
      shared: true,
      isFolder: false
    }
  ];

  const getFileIcon = (type: string, isFolder: boolean) => {
    if (isFolder) return <Folder size={20} className="text-blue-500" />;
    if (type === 'image') return <Image size={20} className="text-green-500" />;
    if (type === 'document') return <FileText size={20} className="text-purple-500" />;
    return <File size={20} className="text-gray-500" />;
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 safe-area-inset-top">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900">Files</h1>
            <Button size="sm" variant="ghost" className="rounded-full h-9 w-9 p-0">
              <Filter size={18} />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0 focus:bg-white"
            />
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex space-x-3 overflow-x-auto">
            <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg whitespace-nowrap">
              <FileText size={16} />
              <span className="text-sm font-medium">Recent</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg whitespace-nowrap">
              <Share size={16} />
              <span className="text-sm font-medium">Shared</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg whitespace-nowrap">
              <Image size={16} />
              <span className="text-sm font-medium">Images</span>
            </div>
          </div>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file) => (
                <Card key={file.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type, file.isFolder)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                          {file.shared && (
                            <Badge variant="secondary" className="text-xs">Shared</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{file.owner}</span>
                          <span>•</span>
                          <span>{file.isFolder ? `${file.itemCount} items` : file.size}</span>
                          <span>•</span>
                          <span>{file.modifiedDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                          <Download size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                          <Share size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <File size={48} className="mb-4 text-gray-300" />
                <p>No files found</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload FAB */}
        <div className="absolute bottom-20 right-4">
          <Button 
            size="lg" 
            className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-xl transition-shadow"
          >
            <span className="text-2xl">+</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Files;
