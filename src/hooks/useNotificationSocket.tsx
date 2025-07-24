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
  findAndSetDocumentWriteAccess,
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
  const hasConnectedOnce = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !initialAuthChecked || !user?.id) return;

    // Prevent duplicate connection
    if (hasConnectedOnce.current) return;
    hasConnectedOnce.current = true;

    const socketUrl = SOCKET_ROUTES.NOTIFICATION(user.id);
    const socket = new ReconnectingWebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.info("WebSocket connected");

      dispatch(setHasConnected(true));

      if (!hasWelcomedRef.current) {
        hasWelcomedRef.current = true;
        toast(`Welcome back ${user.first_name} ${user.last_name}`, {
          duration: 2000,
          icon: "👋",
          position: "top-center",
          closeButton: true,
        });
      }
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "LIVE_MEMBER_COUNT") {
          dispatch(
            setDocumentDetail({
              id: data.doc_id,
              live_members_count: data.count,
            } as any)
          );
          return;
        }

        if (data.approved_access && data.doc_id) {
          dispatch(
            findAndSetDocumentWriteAccess({
              documentId: data.doc_id,
              canWriteAccess: true,
            })
          );
        }

        if (data.revoked_access && data.doc_id) {
          dispatch(
            findAndSetDocumentWriteAccess({
              documentId: data.doc_id,
              canWriteAccess: false,
            })
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

    socket.onerror = (event) => {
      console.error("WebSocket error", event);
    };

    socket.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      socket.close();
      socketRef.current = null;
      hasConnectedOnce.current = false;
    };
  }, [isAuthenticated, initialAuthChecked, user?.id]);

  return null;
};

export default useNotificationSocket;
