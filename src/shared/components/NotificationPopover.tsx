import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  markNotificationReadThunk,
  markNotificationUnreadThunk,
  deleteNotificationThunk,
} from "@/store/notification/notificationThunk";
import { clearNotifications } from "@/store/notification/notificationSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell, Check, Trash, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "./spinner";

const NotificationPopover = () => {
  const dispatch = useAppDispatch();
  const { notifications, total, loading } = useAppSelector(
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

  // Placeholder for delete (clear all)
  const handleDeleteAll = () => {
    dispatch(clearNotifications());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {total > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {total}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] mr-8 min-h-[200px] rounded-lg overflow-hidden p-0">
        {loading && <Spinner />}

        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="font-semibold text-base">Notifications</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteAll}
            title="Clear All"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto divide-y">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  notif.is_read ? "bg-muted" : "bg-white dark:bg-slate-900"
                }`}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium">{notif.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(notif.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {notif.is_read ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMarkUnread(notif.id)}
                      title="Mark as unread"
                    >
                      <Undo2 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMarkRead(notif.id)}
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(notif.id)}
                    title="Delete notification"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
