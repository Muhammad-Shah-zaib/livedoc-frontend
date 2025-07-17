import { EditorContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";
import useTipTapEditor from "@/hooks/useTipTapEditor";
import * as Y from "yjs";
import "./style.css";
import { useEffect } from "react";
import { useAppSelector } from "@/store/store";

export interface TiptapEditorProps {
  ydoc: Y.Doc;
}

export const TiptapEditor = ({ ydoc }: TiptapEditorProps) => {
  const editor = useTipTapEditor(ydoc);
  const { currentDocument } = useAppSelector((state) => state.documents);

  useEffect(() => {
    if (currentDocument && editor) {
      editor.commands.setContent(currentDocument.content || "");
    }
  }, []);

  if (!editor) return <div>Loading editor...</div>;

  ydoc.guid;

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 flex flex-col w-full max-w-7xl px-8 mx-auto">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo / Redo */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
          </Button>

          {/* Formatting buttons */}
          <ToggleGroup type="multiple" className="ml-4">
            <ToggleGroupItem
              value="bold"
              aria-label="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="italic"
              aria-label="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="underline"
              aria-label="Underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="heading1"
              aria-label="H1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="heading2"
              aria-label="H2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="blockquote"
              aria-label="Blockquote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="h-4 w-4" />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="bulletList"
              aria-label="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {/* Editor */}
      <div
        onClick={() => {
          editor.commands.focus();
        }}
        className="rounded-md p-3 w-full max-w-none prose prose-sm overflow-auto min-h-[300px] max-h-[500px]"
      >
        <EditorContent
          key={ydoc.guid}
          editor={editor}
          className="tiptap-editor"
        />
      </div>
    </div>
  );
};
