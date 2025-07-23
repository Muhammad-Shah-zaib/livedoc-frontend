import { markInputRule, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import * as Y from "yjs";
import Collaboration from "@tiptap/extension-collaboration";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useMemo, useRef } from "react";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import StarterKit from "@tiptap/starter-kit";
import { WebsocketProvider } from "y-websocket";
import { debounce } from "lodash";
import { patchDocumentThunk } from "@/store/documents/documentThunk";
import { setCurrentDocument } from "@/store/documents/documentSlice";

import Code from "@tiptap/extension-code";
import BlackQuote from "@tiptap/extension-blockquote";
import Headings from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";

import { all, createLowlight } from "lowlight";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";

import suggestion from "../shared/components/TipTapEditor/suggestions";
import { toast } from "sonner";

const WS_URL = "ws://localhost:8000/ws/yjs-server/";

const useTipTapEditor = () => {
  const lowlight = createLowlight(all);

  CodeBlock;
  const dispatch = useAppDispatch();
  const { currentDocument, editorViewOnlyMode } = useAppSelector(
    (state) => state.documents
  );
  const { user } = useAppSelector((state) => state.auth);
  if (!currentDocument) return;

  const { ydoc, provider } = useMemo(() => {
    if (!currentDocument) return { ydoc: null, provider: null };

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      WS_URL,
      currentDocument.share_token,
      ydoc
    );

    return { ydoc, provider };
  }, [currentDocument.share_token]);

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

  // Debounced dispatch for document updates
  const debouncedUpdate = useMemo(
    () =>
      debounce((content: string, currentDocument: any) => {
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
      }, 350),
    [dispatch]
  );

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
          // ✅ Matches `inline code` and only wraps the inner content
          // It does NOT leave the backticks
          find: /`([^`\n]+)`$/,
          type: this.type,
        }),
      ];
    },
    addPasteRules() {
      return [
        markInputRule({
          find: /`([^`\n]+)`$/,
          type: this.type,
        }),
      ];
    },
  });

  const CustomBlockQuote = BlackQuote.extend({
    addAttributes() {
      return {
        class: {
          default:
            "px-4 py-1 ml-2 border-l-4 rounded-r-lg bg-sky-100 dark:bg-slate-800 dark:border-sky-600 dark:border-sky-100  text-sky-900 dark:text-sky-100",
        },
      };
    },
  });

  const CustomHeading = Headings.extend({
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
  const CustomCodeBlockLowLight = CodeBlockLowlight.configure({
    lowlight,
  });

  const editor = useEditor({
    editable: currentDocument.can_write_access,
    injectCSS: true,
    content: currentDocument.content || "",
    editorProps: {
      attributes: {
        class:
          "bg-white dark:bg-slate-900 min-h-[50vh] border-none outline-none ring-none text-slate-800 dark:text-slate-200",
      },
    },
    extensions: [
      Collaboration.configure({ document: ydoc, field: "content" }),
      CollaborationCaret.configure({
        provider: provider,
        user: {
          name: `${user?.first_name} ${user?.last_name}`,
          color: userColor,
        },
      }),
      StarterKit.configure({
        undoRedo: false,
        codeBlock: false,
        blockquote: false,
        heading: false,
        code: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      CustomCode,
      CustomBlockQuote,
      CustomHeading,
      CodeBlock,
      CustomEmoji,
      CustomCodeBlockLowLight,
      Document,
      Headings,
    ],
    onUpdate: ({ editor }) => {
      const xml = editor.getHTML();
      // convert the xml to a string
      const content = xml.toString();
      debouncedUpdate(content, currentDocument);
    },
  });

  useEffect(() => {
    if (!editor || !currentDocument) return;

    const shouldBeEditable =
      currentDocument.can_write_access && !editorViewOnlyMode;
    editor.setEditable(shouldBeEditable);
  }, [editor, currentDocument?.can_write_access, editorViewOnlyMode]);

  useEffect(() => {
    if (!editor || !currentDocument?.content || !provider) return;

    const onSynced = (isSynced: boolean) => {
      if (isSynced) {
        const yContent = ydoc.getXmlFragment("content");
        if (yContent && yContent.length === 0) {
          editor.commands.clearContent();
          editor.commands.setContent(currentDocument.content || "");
        }
      }
    };

    provider.on("sync", onSynced);

    return () => {
      provider.off("sync", onSynced);
    };
  }, [editor, currentDocument, provider, ydoc]);

  const lastSavedTime = useRef(0);
  const saveDoc = () => {
    const now = Date.now();
    const THROTTLE_LIMIT = 3000; // 3 seconds

    const timeLeft = lastSavedTime.current + THROTTLE_LIMIT - now;

    if (timeLeft > 0) {
      toast.warning(
        `You're saving too frequently. Please wait ${(timeLeft / 1000).toFixed(
          1
        )}s.`
      );
      return;
    }

    lastSavedTime.current = now;

    if (!editor || !currentDocument) return;

    const content = editor.getHTML();

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

    toast.success("Document saved!");
  };

  return { editor, saveDoc };
};

export default useTipTapEditor;
