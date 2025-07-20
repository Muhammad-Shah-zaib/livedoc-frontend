import { EditorContent, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Placeholder } from "@tiptap/extension-placeholder";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import "./style.css";

// Set up Yjs document and provider (replace with your backend URL)
const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  "ws://localhost:8000/ws/yjs-server/", // Updated to match backend
  "43215c35-fb55-44cc-9f3a-8143dbf629a9",
  ydoc
);

const TipTapEditorTest = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCaret.configure({
        provider,
        user: {
          name: "Test User",
          color: "#f783ac",
        },
      }),
      Placeholder.configure({
        placeholder:
          "Write something … It'll be shared with everyone else looking at this example.",
      }),
    ],
  });

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 flex flex-col w-full max-w-7xl px-8 mx-auto">
      <div className="mb-4 text-lg font-semibold">
        TipTap Collaborative Editor Test
      </div>
      <div className="rounded-md p-3 w-full max-w-none prose prose-sm overflow-auto min-h-[300px] max-h-[500px]">
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  );
};

export default TipTapEditorTest;
