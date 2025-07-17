import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRef } from "react";
import { setCurrentDocument } from "@/store/documents/documentSlice";

const useTipTapEditor = (ydoc: Y.Doc) => {
  const dispatch = useAppDispatch();
  const { currentDocument } = useAppSelector((state) => state.documents);

  const debouncedUpdateRef = useRef(
    debounce((editor) => {
      const html = editor.getHTML();
      if (currentDocument) {
        dispatch(
          setCurrentDocument({
            ...currentDocument,
            id: currentDocument.id,
            content: html,
          })
        );
      }
    }, 300)
  );

  const editor = useEditor({
    editable: currentDocument?.can_write_access,
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
    onUpdate: ({ editor }) => {
      debouncedUpdateRef.current(editor);
    },
  });

  return editor;
};

export default useTipTapEditor;
