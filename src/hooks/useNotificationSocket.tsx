import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { SOCKET_ROUTES } from "@/environment/socketRoutes";
import {
  addNotification,
  setHasConnected,
} from "@/store/notification/notificationSlice";
import type { Notification } from "@/store/notification/types";
import { toast } from "sonner";
import {
  addOrUpdateDocumentAccess,
  setDocumentDetail,
} from "@/store/documents/documentSlice";
import ReconnectingWebSocket from "reconnecting-websocket";

const useNotificationSocket = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, initialAuthChecked } = useAppSelector(
    (state) => state.auth
  );

  const socketRef = useRef<ReconnectingWebSocket | null>(null);
  const hasWelcomedRef = useRef(false);
  const hasTriedConnecting = useRef(false);

  const handleOpen = () => {
    console.info("WebSocket connected");
    dispatch(setHasConnected(true));

    if (!hasWelcomedRef.current) {
      hasWelcomedRef.current = true;

      toast(`Welcome back ${user?.first_name} ${user?.last_name}`, {
        duration: 2000,
        icon: "👋",
        position: "top-center",
        closeButton: true,
      });
    }
  };

  const handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);

      if (data.approved_access && data.doc_id) {
        dispatch(
          setDocumentDetail({
            id: data.doc_id,
            can_write_access: true,
          } as any)
        );
      }

      if (data.revoked_access && data.doc_id) {
        dispatch(
          setDocumentDetail({
            id: data.doc_id,
            can_write_access: false,
          } as any)
        );
      }

      if (data.access_obj) {
        dispatch(addOrUpdateDocumentAccess(data.access_obj));
      }

      if (data.type === "notification" && data.payload) {
        const payload: Notification = data.payload;
        dispatch(addNotification(payload));
        toast.info(`🔔 ${payload.message}`, { closeButton: true });
      }
    } catch (err) {
      console.error("WebSocket message parse error", err);
    }
  };

  useEffect(() => {
    if (hasTriedConnecting.current || !isAuthenticated || !initialAuthChecked)
      return;

    hasTriedConnecting.current = true;

    if (!user?.id) return;

    const socketUrl = SOCKET_ROUTES.NOTIFICATION(user.id);

    const ws = new ReconnectingWebSocket(socketUrl, [], {
      maxRetries: 20,
      minReconnectionDelay: 5000,
      connectionTimeout: 4000,
    });

    socketRef.current = ws;

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", (e) => {
      console.error("WebSocket error", e);
    });

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [isAuthenticated, initialAuthChecked, user?.id]);

  return null;
};

export default useNotificationSocket;
