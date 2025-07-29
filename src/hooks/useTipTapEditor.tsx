import { useEditor, markInputRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { createLowlight, all } from "lowlight";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { debounce } from "lodash";
import { patchDocumentThunk } from "@/store/documents/documentThunk";
import { setCurrentDocument } from "@/store/documents/documentSlice";
import suggestion from "../shared/components/TipTapEditor/suggestions";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEffect } from "react";

export const useTipTapEditor = () => {
  const dispatch = useAppDispatch();
  const { currentDocument, editorViewOnlyMode } = useAppSelector(
    (state) => state.documents
  );

  const debouncedUpdate = debounce((content: string) => {
    if (!currentDocument) return;

    dispatch(
      setCurrentDocument({
        ...currentDocument,
        content,
        id: currentDocument.id,
      })
    );

    dispatch(
      patchDocumentThunk({
        id: currentDocument.id,
        content,
      })
    );
  }, 500);

  const lowlight = createLowlight(all);

  const liveblocks = useLiveblocksExtension();

  // Custom extensions
  const CustomCode = Code.extend({
    addAttributes() {
      return {
        class: {
          default:
            "bg-sky-600 dark:bg-sky-100 dark:text-sky-700 text-sky-50 font-bold font-mono text-xs rounded-full px-1 py-0.5",
        },
      };
    },
    addInputRules() {
      return [
        markInputRule({
          find: /`([^`\n]+)`$/,
          type: this.type,
        }),
      ];
    },
  });

  const CustomBlockQuote = Blockquote.extend({
    addAttributes() {
      return {
        class: {
          default:
            "px-4 py-1 ml-2 border-l-4 rounded-r-lg bg-sky-100 dark:bg-slate-800 dark:border-sky-600 dark:border-sky-100 text-sky-900 dark:text-sky-100",
        },
      };
    },
  });

  const CustomHeading = Heading.extend({
    addAttributes() {
      return {
        class: {
          default: "text-slate-900 dark:text-slate-100 font-bold",
        },
      };
    },
  });

  const CustomEmoji = Emoji.configure({
    enableEmoticons: true,
    forceFallbackImages: true,
    HTMLAttributes: { class: "inline-emoji" },
    emojis: gitHubEmojis,
    suggestion,
  });

  const CustomCodeBlockLowlight = CodeBlockLowlight.configure({
    lowlight,
  });

  const editor = useEditor({
    editable: currentDocument?.can_write_access && !editorViewOnlyMode,
    injectCSS: true,
    content: currentDocument?.content || "",
    editorProps: {
      attributes: {
        class:
          "bg-white dark:bg-slate-900 min-h-[50vh] border-none outline-none ring-none text-slate-800 dark:text-slate-200 p-4",
      },
    },
    extensions: [
      Document,
      StarterKit.configure({
        history: false,
        document: false,
        blockquote: false,
        heading: false,
        code: false,
        codeBlock: false,
      }),
      liveblocks,
      CustomCode,
      CustomBlockQuote,
      CustomHeading,
      CodeBlock,
      CustomCodeBlockLowlight,
      CustomEmoji,
      Heading,
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      debouncedUpdate(content);
    },
  });

  // ✨ Dynamically update editability after mount
  useEffect(() => {
    if (editor) {
      const canEdit = currentDocument?.can_write_access && !editorViewOnlyMode;
      editor.setEditable(canEdit ?? false);
    }
  }, [editor, currentDocument?.can_write_access, editorViewOnlyMode]);

  return { editor };
};

export default useTipTapEditor;
