import { useEffect, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import * as Y from "yjs";
import { toast } from "sonner";
import { SOCKET_ROUTES } from "@/environment/socketRoutes";

export const useYjsLiveSocket = (shareToken: string | null) => {
  const wsRef = useRef<ReconnectingWebSocket | null>(null);
  const ydocRef = useRef<Y.Doc>(new Y.Doc());

  useEffect(() => {
    if (!shareToken) return;

    const ws = new ReconnectingWebSocket(
      SOCKET_ROUTES.DOCUMENTS.LIVE(shareToken)
    );
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    const ydoc = ydocRef.current;

    // Send Yjs document updates to server
    const handleDocUpdate = (update: Uint8Array) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(update);
      }
    };

    ydoc.on("update", handleDocUpdate);

    ws.onopen = () => {
      toast.success("📡 Connected to live document");
      // Request sync (optional, depends on backend)
      const stateVector = Y.encodeStateVector(ydoc);
      ws.send(stateVector);
      console.log("chekcing this");
    };

    ws.onmessage = (event) => {
      const binary = new Uint8Array(event.data);

      try {
        Y.applyUpdate(ydoc, binary);
      } catch (err) {
        console.error("❌ Failed to apply Yjs update:", err);
      }
    };

    ws.onclose = () => {
      toast.warning("🔌 Disconnected from live document");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      toast.error("⚠️ WebSocket Error");
    };

    return () => {
      ydoc.off("update", handleDocUpdate);
      ws.close();
    };
  }, [shareToken]);

  return {
    ydoc: ydocRef.current,
    socket: wsRef,
  };
};
