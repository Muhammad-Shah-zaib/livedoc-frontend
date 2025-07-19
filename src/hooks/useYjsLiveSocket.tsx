import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { toast } from "sonner";

const docMap = new Map<string, Y.Doc>();

export const useYjsLiveSocket = (shareToken: string | null) => {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const ydoc = useRef<Y.Doc>(
    (() => {
      if (!shareToken) return new Y.Doc();
      if (!docMap.has(shareToken)) {
        docMap.set(shareToken, new Y.Doc());
      }
      return docMap.get(shareToken)!;
    })()
  ).current;

  useEffect(() => {
    if (!shareToken) return;

    const websocketProvider = new WebsocketProvider(
      `ws://localhost:8000/ws/yjs-server/`,
      shareToken,
      ydoc
    );

    setProvider(websocketProvider);

    websocketProvider.on("status", (event: { status: string }) => {
      toast("Websocket: status: " + event.status);
    });

    return () => {
      websocketProvider.destroy();
      setProvider(null);
    };
  }, [shareToken]);

  return { ydoc, provider };
};
