import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";

const useTipTapEditor = (ydoc: Y.Doc) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Highlight,
      CharacterCount,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing something awesome...",
      }),
      Collaboration.configure({
        document: ydoc,
        field: "default",
      }),
    ],
    autofocus: true,
  });

  return editor;
};

export default useTipTapEditor;
