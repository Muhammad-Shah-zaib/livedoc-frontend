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
} from "@liveblocks/react-tiptap";
import { useThreads } from "@liveblocks/react";
import { StaticToolbar } from "./Toolbar";
import "@liveblocks/react-ui/styles/dark/attributes.css";

export function TiptapEditor() {
  const { editor } = useTipTapEditor();

  return (
    <div className="prose dark:prose-invert max-w-none">
      <div>
        <StaticToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
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
