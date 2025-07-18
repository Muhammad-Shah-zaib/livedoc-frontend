import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { setCurrentDocument } from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { Switch } from "@/components/ui/switch";
import { useLiveToggle } from "@/hooks/useLiveToggle";
import {
  ArrowLeft,
  Share2,
  Link2,
  Users,
  Eye,
  Edit3,
  MoreHorizontal,
  Download,
  Settings,
  Trash2,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function DocumentDetailHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentDocument } = useAppSelector((state) => state.documents);
  const { toggleLive, loading } = useLiveToggle();

  if (!currentDocument) {
    return <div>Loading...</div>;
  }
  const setDocumentTitle = (e: any) => {
    dispatch(setCurrentDocument({ ...currentDocument, name: e.target.value }));
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleGoBack()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Input
              value={currentDocument?.name}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-semibold border-none bg-transparent p-0 h-auto focus-visible:ring-0 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex items-center space-x-3">
            {/* Collaborators */}
            <div className="flex items-center -space-x-2">
              <span className="text-xs font-mono font-black p-2 px-3 rounded-full shadow-md bg-gradient-to-r from-blue-500 text-white to-purple-500">
                {currentDocument.live_members_count} collaborators live
              </span>
            </div>

            {/* Live Toggle */}
            <div className="flex items-center space-x-2 font-mono text-sm">
              <Switch
                checked={currentDocument.is_live}
                onCheckedChange={() =>
                  toggleLive(currentDocument.id, !currentDocument.is_live)
                }
                id={`switch-${currentDocument.id}`}
                disabled={loading}
              />
              <span
                className={
                  currentDocument.is_live
                    ? "text-green-600 dark:text-green-300 font-bold"
                    : "text-slate-500 dark:text-slate-400 font-bold"
                }
              >
                {currentDocument.is_live ? "LIVE" : "OFFLINE"}
              </span>
            </div>

            {/* Share Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  Invite collaborators
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View only
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Can edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="rounded-full">
              <Moon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetailHeader;
