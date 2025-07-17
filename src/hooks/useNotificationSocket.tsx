import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { SOCKET_ROUTES } from "@/environment/socketRoutes";
import {
  addNotification,
  setHasConnected,
} from "@/store/notification/notificationSlice";
import type { Notification } from "@/store/notification/types";
import { toast } from "sonner";

const RECONNECT_INTERVAL_MS = 5000;

const useNotificationSocket = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, initialAuthChecked } = useAppSelector(
    (state) => state.auth
  );

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriedConnecting = useRef<boolean>(false);
  const hasWelcomedRef = useRef<boolean>(false);

  const handleOpen = () => {
    console.info("WebSocket connected");

    dispatch(setHasConnected(true));

    if (reconnectTimerRef.current) {
      clearInterval(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    if (
      !hasWelcomedRef.current &&
      socketRef.current?.readyState === WebSocket.OPEN
    ) {
      hasWelcomedRef.current = true;

      toast(`Welcome back ${user?.first_name} ${user?.last_name}`, {
        duration: 2000,
        icon: "👋",
        position: "top-center",
        closeButton: true,
      });
    }
  };

  const handleClose = () => {
    attemptReconnect();
  };

  const handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "notification" && data.payload) {
        const payload: Notification = data.payload;
        dispatch(addNotification(payload));
        toast.info(`🔔 ${payload.message}`, { closeButton: true });
      }
    } catch (err) {
      console.error("WebSocket message parse error", err);
    }
  };

  const handleError = (event: Event) => {
    console.error("WebSocket error", event);
    // Wait a little before closing, give it a chance to open
    setTimeout(() => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.CONNECTING
      ) {
        console.warn("Delaying socket close because it’s still connecting...");
        return;
      }
      socketRef.current?.close();
    }, 500);
  };

  const attemptReconnect = () => {
    if (!reconnectTimerRef.current) {
      reconnectTimerRef.current = setInterval(() => {
        const current = socketRef.current;
        if (!current || current.readyState === WebSocket.CLOSED) {
          console.log("Reconnecting WebSocket...");
          connectSocket();
        }
      }, RECONNECT_INTERVAL_MS);
    }
  };

  const connectSocket = () => {
    if (!user?.id) return;

    const current = socketRef.current;

    if (current && current.readyState < WebSocket.CLOSING) {
      console.log("WebSocket already connecting/open");
      return;
    }

    const socketUrl = SOCKET_ROUTES.NOTIFICATION(user.id);
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = handleOpen;
    socket.onclose = handleClose;
    socket.onmessage = handleMessage;
    socket.onerror = handleError;
  };

  useEffect(() => {
    if (hasTriedConnecting.current || !isAuthenticated || !initialAuthChecked)
      return;
    hasTriedConnecting.current = true;
    connectSocket();

    return () => {
      const socket = socketRef.current;
      if (
        socket &&
        (socket.readyState === WebSocket.CONNECTING ||
          socket.readyState === WebSocket.OPEN)
      ) {
        socket.close();
      }
      socketRef.current = null;

      if (reconnectTimerRef.current) {
        clearInterval(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };
  }, [isAuthenticated, initialAuthChecked, user?.id]);

  return null;
};

export default useNotificationSocket;
