import { setCurrentDocument } from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { toast } from "sonner";

type MessageHandler = (data: any) => void;

export const useLiveDocSocket = (
  shareToken: string | null,
  onMessage?: MessageHandler
) => {
  const { currentDocument } = useAppSelector((state) => state.documents);
  const dispatch = useAppDispatch();
  const wsRef = useRef<ReconnectingWebSocket | null>(null);

  const sendMessage = (data: any) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      toast.error("⚠️ Cannot send message. WebSocket is not open.");
    }
  };

  useEffect(() => {
    if (!shareToken) return;

    const ws = new ReconnectingWebSocket(
      `ws://localhost:8000/ws/documents/${shareToken}/`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      toast.success("📡 Connected to live document");
    };

    ws.onclose = () => {
      toast.warning("🔌 Disconnected from document");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      toast.error("⚠️ WebSocket Error");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);

        // Optional: handle common socket events
        switch (data.type) {
          case "connection":
            toast.success("✅ Document socket initialized");
            break;
          case "document_update":
            if (currentDocument && typeof currentDocument.id === "number") {
              dispatch(
                setCurrentDocument({
                  ...currentDocument,
                  content: data.content,
                })
              );
              console.log({
                ...currentDocument,
                content: data.content,
              });
            }
            toast.info("✍️ Document was updated");
            break;
          case "document_live":
            toast.success(data.message);
            break;
          case "force_disconnect":
            toast.warning(data.message);
            ws.close();
            break;
          case "error":
            toast.error(data.message || "Something went wrong");
            break;
        }

        if (onMessage) onMessage(data);
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [shareToken]);

  return {
    sendMessage,
    socket: wsRef,
  };
};
