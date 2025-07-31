import { FloatingToolbar, Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { ToolbarInlineAdvanced } from "./ToolbarInlineAdvanced";

type Props = {
  editor: Editor | null;
};

export function StaticToolbar({ editor }: Props) {
  return (
    <Toolbar
      editor={editor}
      data-toolbar="static"
      className="rounded-t-sm p-4! bg-slate-50! dark:bg-zinc-900! text-black! dark:text-white!"
    >
      <Toolbar.SectionHistory />
      <Toolbar.Separator />
      <Toolbar.SectionInline />
      <ToolbarInlineAdvanced editor={editor} />
      <Toolbar.Separator />
      <Toolbar.SectionCollaboration />
    </Toolbar>
  );
}

export function SelectionToolbar({ editor }: Props) {
  return (
    <FloatingToolbar editor={editor} data-toolbar="selection">
      <Toolbar.SectionInline />
      <Toolbar.Separator />
      <Toolbar.SectionCollaboration />
    </FloatingToolbar>
  );
}
