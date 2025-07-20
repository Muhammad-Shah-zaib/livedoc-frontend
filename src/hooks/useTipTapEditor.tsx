import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { useAppSelector } from "@/store/store";
import { useRef } from "react";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import StarterKit from "@tiptap/starter-kit";
import { WebsocketProvider } from "y-websocket";
import "../shared/components/Header/TipTapEditor/style.css";

const WS_URL = "ws://localhost:8000/ws/yjs-server/";

const useTipTapEditor = () => {
  const { currentDocument } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);
  if (!currentDocument) return;
  const ydoc = new Y.Doc();
  // const dispatch = useAppDispatch();

  const provider = new WebsocketProvider(
    WS_URL,
    currentDocument.share_token,
    ydoc
  );

  const userColors = [
    "#1E88E5", // Blue
    "#43A047", // Green
    "#F4511E", // Deep Orange
    "#6D4C41", // Brown
    "#8E24AA", // Purple
    "#FDD835", // Yellow
    "#00ACC1", // Cyan
    "#E53935", // Red
    "#5E35B1", // Indigo
    "#FF7043", // Orange
  ];

  const userColor = useRef(
    userColors[Math.floor(Math.random() * userColors.length)]
  ).current;

  const editor = useEditor({
    extensions: [
      Collaboration.configure({ document: ydoc }),
      CollaborationCaret.configure({
        provider: provider,
        user: {
          name: user?.first_name || "user",
          color: userColor,
        },
      }),
      StarterKit.configure({
        undoRedo: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  return editor;
};

export default useTipTapEditor;
