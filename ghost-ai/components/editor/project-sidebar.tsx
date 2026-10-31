import { X, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close project sidebar"
          onClick={onClose}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <Tabs defaultValue="my-projects" className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="flex-1 p-4">
          <div className="flex items-center justify-center h-full text-gray-400">
            No projects yet
          </div>
        </TabsContent>
        <TabsContent value="shared" className="flex-1 p-4">
          <div className="flex items-center justify-center h-full text-gray-400">
            No shared projects
          </div>
        </TabsContent>
      </Tabs>
      <div className="p-4 border-t border-gray-800">
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          New Project
        </Button>
      </div>
    </aside>
  );
}