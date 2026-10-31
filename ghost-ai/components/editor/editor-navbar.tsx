import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function EditorNavbar({ isSidebarOpen, toggleSidebar }: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label={isSidebarOpen ? "Close project sidebar" : "Open project sidebar"}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center"></div>
    </nav>
  );
}