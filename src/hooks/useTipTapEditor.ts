import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { setCurrentDocument } from "@/store/documents/documentSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { debounce } from "lodash";

const useTipTapEditor = (ydoc: Y.Doc) => {
  const dispatch = useAppDispatch();
  const { currentDocument } = useAppSelector((state) => state.documents);

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
    onUpdate: debounce(({ editor }) => {
      const content = editor.getHTML();

      if (currentDocument) {
        dispatch(
          setCurrentDocument({
            ...currentDocument,
            content,
          })
        );
      }
    }, 300),
  });

  return editor;
};

export default useTipTapEditor;
