import { Toolbar } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, HighlighterIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  editor: Editor | null;
};

export function ToolbarInlineAdvanced({ editor }: Props) {
  function toggleLink(link: string) {
    editor?.chain().focus().toggleLink({ href: link }).run();
  }

  return (
    <>
      <Toolbar.Toggle
        name="Highlight"
        icon={<HighlighterIcon style={{ width: "17.5px" }} />}
        active={editor?.isActive("highlight") ?? false}
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
        disabled={!editor?.can().chain().focus().toggleHighlight().run()}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Toolbar.Toggle
            name="Link"
            icon={<LinkIcon style={{ width: "17px" }} />}
            active={editor?.isActive("link") ?? false}
            disabled={
              !editor?.can().chain().focus().setLink({ href: "" }).run()
            }
          />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <LinkPopover
            onSubmit={toggleLink}
            onRemoveLink={() => editor?.chain().focus().unsetLink().run()}
            showRemove={!!editor?.getAttributes("link").href}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

type LinkPopoverProps = {
  onSubmit: (url: string) => void;
  onRemoveLink: (url: string) => void;
  showRemove: boolean;
};

function LinkPopover({ onSubmit, onRemoveLink, showRemove }: LinkPopoverProps) {
  const [value, setValue] = useState("");

  return (
    <form
      className="p-4 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="space-y-2">
        <label
          className="text-sm font-medium leading-none"
          htmlFor="link-input"
        >
          Add link to selected text
        </label>
        <Input
          id="link-input"
          className="w-full"
          placeholder="Enter URL..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        {showRemove ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-2 px-3"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveLink(value);
            }}
            aria-label="Remove link"
          >
            <X className="h-4 w-4" />
            Remove
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          type="submit"
          size="sm"
          className="px-4"
          disabled={!value.trim()}
        >
          Add Link
        </Button>
      </div>
    </form>
  );
}
