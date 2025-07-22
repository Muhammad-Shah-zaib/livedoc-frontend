import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setAccessDocumentDetail,
  setActiveTabInDocumentAccess,
  setDeleteSuccessful,
} from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { Switch } from "@/components/ui/switch";
import { useLiveToggle } from "@/hooks/useLiveToggle";
import {
  ArrowLeft,
  Share2,
  Users,
  Eye,
  Edit3,
  MoreHorizontal,
  Circle,
  Radio,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteDocumentDialog from "@/components/documents/DeleteDocumentDialog";
import { useState } from "react";
import ToggleThemeButton from "@/shared/components/ToggleThemeButton";
import AvatarDropdown from "./AvatarDropDown";

function DocumentDetailHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentDocument, deleteSuccessful } = useAppSelector(
    (state) => state.documents
  );
  const { toggleLive, loading } = useLiveToggle();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`;
    } else if (user?.first_name) {
      return user.first_name[0];
    }
    return `PK`;
  };

  if (deleteSuccessful) {
    setDeleteDialogOpen(false);
    dispatch(setDeleteSuccessful(false));
    navigate("/dashboard");
  }
  if (!currentDocument) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-zinc-950 backdrop-blur-sm sticky top-0 z-50">
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
            <span className="text-xs font-mono font-black p-2 px-3 rounded-full shadow-md bg-gradient-to-r from-blue-500 text-white to-purple-500">
              {currentDocument.live_members_count} members live
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-3">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(setActiveTabInDocumentAccess("invite"));
                    dispatch(setAccessDocumentDetail(true));
                  }}
                >
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
            <ToggleThemeButton />
            <AvatarDropdown user={user} getUserInitials={getUserInitials} />
          </div>

          <div className="flex md:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div className="flex items-center space-x-2 w-full cursor-pointer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={
                        currentDocument.is_live
                          ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }
                      onClick={() =>
                        !loading &&
                        toggleLive(currentDocument.id, !currentDocument.is_live)
                      }
                      disabled={loading}
                      aria-label={
                        currentDocument.is_live ? "Set Offline" : "Set Live"
                      }
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : currentDocument.is_live ? (
                        <Radio className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>
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
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div className="w-full flex items-center">
                    <ToggleThemeButton /> Theme
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AvatarDropdown user={user} getUserInitials={getUserInitials} />
          </div>
        </div>
      </div>
      {/* Delete Confirmation Dialog */}
      {currentDocument && (
        <DeleteDocumentDialog
          document={currentDocument}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  );
}

export default DocumentDetailHeader;
