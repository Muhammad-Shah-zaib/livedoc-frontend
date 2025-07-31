import "../../CustomScrollBar.css";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Users, Loader2, Circle, Crown, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getLiveUsersForDocumentThunk } from "@/store/documents/documentThunk";
import { toast } from "sonner";

interface LiveMembersDialogProps {
  triggerClassName?: string;
}

function LiveMembersDialog({ triggerClassName }: LiveMembersDialogProps) {
  const {
    currentDocument,
    liveUsersForDocument,
    liveUsersForDocumentError,
    canInitializeEditor,
  } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (open && currentDocument?.id) {
      dispatch(getLiveUsersForDocumentThunk({ id: currentDocument.id }));
    }
    if (!currentDocument?.id) {
      toast.error("Something went wrong. Please try again later.");
      setOpen(false);
    }
  }, [open, currentDocument?.id, dispatch]);

  const getUserInitials = (
    firstName?: string,
    lastName?: string,
    name?: string
  ) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`;
    } else if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return name[0];
    }
    return "U";
  };

  // Helper function to get contrasting text color for avatar
  const getContrastingTextColor = (hexColor: string) => {
    if (!hexColor) return "#000000";

    // Remove # if present
    const color = hexColor.replace("#", "");

    // Convert hex to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  const isCurrentUser = (userId: number) => userId === user?.id;
  const isDocumentOwner = (userId: number) => userId === currentDocument?.admin;

  const onlineUsers = liveUsersForDocument.users_online || [];
  const offlineUsers = liveUsersForDocument.users_offline || [];
  const totalUsers = onlineUsers.length + offlineUsers.length;

  const renderUserItem = (member: any, isOnline: boolean) => (
    <div
      key={`${isOnline ? "online" : "offline"}-${member.userId}`}
      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-slate-700">
            <AvatarImage
              src={member.avatar}
              alt={member.name}
              className="object-cover"
            />
            <AvatarFallback
              className="text-sm font-medium"
              style={{
                backgroundColor: member.color || "#6B7280",
                color: getContrastingTextColor(member.color || "#6B7280"),
              }}
            >
              {getUserInitials(undefined, undefined, member.name)}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white dark:border-slate-900 rounded-full ${
              isOnline ? "bg-green-500" : "bg-slate-400 dark:bg-slate-600"
            }`}
          ></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {member.name}
              {isCurrentUser(member.userId) && (
                <span className="text-slate-500 dark:text-slate-400 ml-1">
                  (You)
                </span>
              )}
            </p>
            {isDocumentOwner(member.userId) && (
              <Crown className="h-3 w-3 text-yellow-500 dark:text-yellow-400" />
            )}
          </div>
          {member.email && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {member.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isDocumentOwner(member.userId) && (
          <Badge
            variant="outline"
            className="text-xs border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400"
          >
            Owner
          </Badge>
        )}
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline
              ? "bg-green-500 animate-pulse"
              : "bg-slate-400 dark:bg-slate-600"
          }`}
        ></div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`font-mono font-black p-2 px-3 rounded-full shadow-md bg-gradient-to-r from-blue-500 text-white to-purple-500 hover:from-blue-600 hover:to-purple-700 ${triggerClassName}`}
        >
          {canInitializeEditor &&
            (currentDocument?.is_live
              ? `${currentDocument.live_members_count} members live`
              : "Offline")}
          {!canInitializeEditor && (
            <>
              <Loader2 className="animate-spin h-3 w-3 mr-1" />
              Initializing...
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <Users className="h-5 w-5 text-blue-500" />
            Document Members
            {currentDocument?.is_live && (
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                <Circle className="h-2 w-2 mr-1 fill-current" />
                Live
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            {currentDocument?.is_live
              ? `${onlineUsers.length} ${
                  onlineUsers.length === 1 ? "person is" : "people are"
                } currently online. ${totalUsers} total members.`
              : `This document has ${totalUsers} members but is currently offline.`}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!canInitializeEditor ? (
            <div className="flex items-center justify-center py-8 text-slate-500 dark:text-slate-400">
              <Loader2 className="animate-spin h-6 w-6 mr-2" />
              Loading members...
            </div>
          ) : liveUsersForDocumentError ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400">
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="mb-4 opacity-60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-30"
                />

                {/* Warning triangle */}
                <path
                  d="M50 25L70 65H30L50 25Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-red-400 dark:text-red-500"
                />

                {/* Exclamation mark */}
                <line
                  x1="50"
                  y1="35"
                  x2="50"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-red-400 dark:text-red-500"
                />
                <circle
                  cx="50"
                  cy="57"
                  r="2"
                  fill="currentColor"
                  className="text-red-400 dark:text-red-500"
                />

                {/* Disconnected users icons */}
                <circle
                  cx="25"
                  cy="75"
                  r="4"
                  fill="currentColor"
                  className="opacity-40"
                />
                <circle
                  cx="35"
                  cy="75"
                  r="4"
                  fill="currentColor"
                  className="opacity-30"
                />
                <circle
                  cx="65"
                  cy="75"
                  r="4"
                  fill="currentColor"
                  className="opacity-30"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="4"
                  fill="currentColor"
                  className="opacity-40"
                />

                {/* Disconnection lines */}
                <line
                  x1="23"
                  y1="73"
                  x2="27"
                  y2="77"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-red-400 dark:text-red-500 opacity-60"
                />
                <line
                  x1="27"
                  y1="73"
                  x2="23"
                  y2="77"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-red-400 dark:text-red-500 opacity-60"
                />
                <line
                  x1="73"
                  y1="73"
                  x2="77"
                  y2="77"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-red-400 dark:text-red-500 opacity-60"
                />
                <line
                  x1="77"
                  y1="73"
                  x2="73"
                  y2="77"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-red-400 dark:text-red-500 opacity-60"
                />
              </svg>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Failed to load members
              </p>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 max-w-xs">
                {liveUsersForDocumentError ||
                  "Unable to fetch document members. Please try again later."}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => {
                  if (currentDocument?.id) {
                    dispatch(
                      getLiveUsersForDocumentThunk({ id: currentDocument.id })
                    );
                  }
                }}
              >
                Try Again
              </Button>
            </div>
          ) : totalUsers > 0 ? (
            <div className="space-y-4">
              {/* Custom scrollable container with MUI-like scrollbar */}
              <div
                className="max-h-60 sm:max-h-80 lg:max-h-96 overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                <div className="space-y-4">
                  {/* Online Users Section */}
                  {onlineUsers.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Online ({onlineUsers.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {onlineUsers.map((member) =>
                          renderUserItem(member, true)
                        )}
                      </div>
                    </div>
                  )}

                  {/* Offline Users Section */}
                  {offlineUsers.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-slate-400 dark:bg-slate-600 rounded-full"></div>
                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Offline ({offlineUsers.length})
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {offlineUsers.map((member) =>
                          renderUserItem(member, false)
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400">
              <User className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm text-center">
                No members found for this document
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LiveMembersDialog;
