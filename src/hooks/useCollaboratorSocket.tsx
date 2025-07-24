import { SOCKET_ROUTES } from "@/environment/socketRoutes";
import {
  setCurrentDocumentLiveMembers,
  setDocumentDetail,
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

  useEffect(() => {
    const socketUrl = SOCKET_ROUTES.DOCUMENTS.LIVE(currentDoc.share_token);

    const socket = new ReconnectingWebSocket(socketUrl, [], {
      // Optional options, can remove if unnecessary
      maxRetries: 20,
      // reconnectInterval is deprecated, use `minReconnectionDelay` and `maxReconnectionDelay`
      minReconnectionDelay: 2000,
      maxReconnectionDelay: 5000,
    });

    socketRef.current = socket;

    socket.addEventListener("open", () => {
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

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
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
            if (user.id != data.user.id) {
              toast.custom(
                () => (
                  <div className="flex items-center gap-2">
                    <UserPlus className="text-green-600 w-5 h-5" />
                    <span>{`${data.user.first_name} ${data.user.last_name} joined the document.`}</span>
                  </div>
                ),
                {
                  position: "bottom-right",
                  duration: 3000,
                  closeButton: true,
                }
              );
            }
            break;

          case "user_left":
            if (user.id != data.user.id) {
              toast.custom(
                () => (
                  <div className="flex items-center gap-2">
                    <UserMinus className="text-red-600 w-5 h-5" />
                    <span>{`${data.user.first_name} ${data.user.last_name} left the document.`}</span>
                  </div>
                ),
                {
                  position: "bottom-right",
                  duration: 3000,
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
            console.log("Unhandled socket message:", data);
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
