import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  markNotificationReadThunk,
  markNotificationUnreadThunk,
  deleteNotificationThunk,
  deleteAllNotificationsThunk,
} from "@/store/notification/notificationThunk";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Badge,
  Bell,
  Check,
  MoreHorizontal,
  Trash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NotificationBell from "../icons/NotificationBell";

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);

  const handleDeleteAllAndClose = () => {
    handleDeleteAll(); // your thunk
    setOpen(false); // close dialog manually
  };

  // Placeholder for delete (clear all)
  const handleDeleteAll = () => {
    dispatch(deleteAllNotificationsThunk());
  };

  const dispatch = useAppDispatch();
  const { notifications, total: unreadCount } = useAppSelector(
    (state) => state.notification
  );

  const handleMarkRead = (id: number) => {
    dispatch(markNotificationReadThunk({ id }));
  };

  const handleMarkUnread = (id: number) => {
    dispatch(markNotificationUnreadThunk({ id }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNotificationThunk({ id }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white dark:border-slate-950">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Notifications
            </h3>
            {notifications.length > 0 && (
              <div className="flex items-center space-x-2">
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" title="Clear All">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Clear all notifications?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will permanently delete all your
                        notifications. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAllAndClose}
                      >
                        Yes, clear all
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              You have {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 px-6">
              <div className="w-32 h-32 mx-auto mb-6">
                <NotificationBell />
              </div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                All caught up!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                You don't have any notifications right now. We'll let you know
                when something important happens.
              </p>
            </div>
          ) : (
            /* Notifications List */
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    !notification.is_read
                      ? "bg-blue-50/50 dark:bg-blue-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                            {notification.message}
                            {!notification.is_read && (
                              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                            )}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            {notification.created_at}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {notification.is_read ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleMarkUnread(notification.id)
                                }
                              >
                                <Bell className="h-4 w-4 mr-2" />
                                Mark as unread
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleMarkRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Mark as read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDelete(notification.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
