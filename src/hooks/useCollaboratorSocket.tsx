import { SOCKET_ROUTES } from "@/environment/socketRoutes";
import {
  addCurrentDocumentUser,
  setCanInitializeEditor,
  setCurrentDocumentLiveMembers,
  setCurrentDocumentUsers,
  setDocumentDetail,
  setLiveUserStatusFromSocket,
} from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { NotebookPen, UserMinus, UserPlus } from "lucide-react";
import { useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { toast } from "sonner";

export function useCollaboratorSocket() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user!);
  const currentDoc = useAppSelector(
    (state) => state.documents.currentDocument!
  );
  const socketRef = useRef<ReconnectingWebSocket | null>(null);
  const hasMounted = useRef(false);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      // If the component has already mounted, we don't need to reinitialize the socket
      return;
    }
    hasMounted.current = true;
    const socketUrl = SOCKET_ROUTES.DOCUMENTS.LIVE(currentDoc.share_token);

    const socket = new ReconnectingWebSocket(socketUrl, [], {
      // Optional options, can remove if unnecessary
      maxRetries: 5,
      // reconnectInterval is deprecated, use `minReconnectionDelay` and `maxReconnectionDelay`
      minReconnectionDelay: 10000,
      maxReconnectionDelay: 10000,
    });

    socketRef.current = socket;

    socket.addEventListener("open", () => {
      dispatch(setCanInitializeEditor(true));
      toast.success(
        <>
          You're live on the doc <br />
          <span className="font-medium text-muted-foreground">
            ready to write together ✍️
          </span>
        </>,
        {
          duration: 3000,
          position: "top-center",
          icon: <NotebookPen className="text-purple-600" />,
          closeButton: true,
        }
      );
    });

    socket.addEventListener("close", () => {
      dispatch(setCanInitializeEditor(false));
      hasShownToast.current = false;
      hasMounted.current = false;
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "live_users_list":
            dispatch(setCurrentDocumentUsers(data.users));
            break;
          case "live_members":
            setTimeout(() => {
              dispatch(
                setCurrentDocumentLiveMembers(Number.parseInt(data.count))
              );
              dispatch(
                setDocumentDetail({
                  id: data.doc_id,
                  live_members_count: Number.parseInt(data.count),
                } as any)
              );
            }, 500);

            break;

          case "user_joined":
            dispatch(setLiveUserStatusFromSocket(data.user));
            if (user.id != data.user.id) {
              toast.custom(
                () => (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[280px] backdrop-blur-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <UserPlus className="text-green-600 dark:text-green-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {data.user.name} joined
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Started collaborating on this document
                      </p>
                    </div>
                  </div>
                ),
                {
                  position: "bottom-right",
                  duration: 4000,
                  closeButton: true,
                }
              );
            }
            dispatch(
              addCurrentDocumentUser({
                name: data.user.name,
                userId: data.user.id,
                color: data.user.color,
                avatar: data.user.avatar || "",
                email: data.user.email,
              })
            );
            break;

          case "user_left":
            dispatch(setLiveUserStatusFromSocket(data.user));
            if (user.id != data.user.id) {
              toast.custom(
                () => (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[280px] backdrop-blur-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <UserMinus className="text-red-600 dark:text-red-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {data.user.first_name} {data.user.last_name} left
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        No longer collaborating on this document
                      </p>
                    </div>
                  </div>
                ),
                {
                  position: "bottom-right",
                  duration: 4000,
                  closeButton: true,
                }
              );
            }
            break;

          case "new_comment":
            break;
          case "update_comment":
            break;
          case "error":
            break;
          case "force_disconnect":
            console.warn("Force disconnect:", data.message);
            socket.close();
            break;
          default:
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message", err);
      }
    });

    return () => {
      socket.close();
    };
  }, [currentDoc.share_token]);
}
