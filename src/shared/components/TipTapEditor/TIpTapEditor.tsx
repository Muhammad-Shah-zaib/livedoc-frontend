import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import { Editor, EditorContent } from "@tiptap/react";
import useTipTapEditor from "@/hooks/useTipTapEditor";
import "./EmojiList.css";
import "./style.css";
import {
  FloatingComposer,
  FloatingThreads,
  FloatingToolbar,
  Toolbar,
} from "@liveblocks/react-tiptap";
import { useThreads } from "@liveblocks/react";

export function TiptapEditor() {
  const { editor } = useTipTapEditor();

  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="bg-slate-50 dark:bg-slate-900">
        <Toolbar editor={editor} style={{ background: "none" }} />
      </div>
      <EditorContent editor={editor} className="editor" />
      <FloatingComposer editor={editor} className="w-[350px]" />
      <FloatingToolbar editor={editor} />

      <div className="xl:[&:not(:has(.lb-tiptap-anchored-threads))]:pr-[200px] [&:not(:has(.lb-tiptap-anchored-threads))]:pr-[50px]">
        <Threads editor={editor} />
      </div>
    </div>
  );
}

function Threads({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads();

  if (!threads || !editor) {
    return null;
  }

  return <FloatingThreads threads={threads} editor={editor} />;
}
