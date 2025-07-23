import { SOCKET_ROUTES } from "@/environment/socketRoutes";
import { setCurrentDocument } from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { NotebookPen } from "lucide-react";
import { useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { toast } from "sonner";

export function useCollaboratorSocket() {
  const dispatch = useAppDispatch();
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
            dispatch(
              setCurrentDocument({
                ...currentDoc,
                id: currentDoc.id,
                live_members_count: data.count,
              } as any)
            );
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
