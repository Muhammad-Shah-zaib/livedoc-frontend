import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import React, { useRef } from "react";

interface ShareTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareToken: string;
}

const ShareTokenDialog: React.FC<ShareTokenDialogProps> = ({
  open,
  onOpenChange,
  shareToken,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      toast.success("Share token copied");
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareToken);
      toast.success("Share token copied");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="share-token"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Share Token
          </label>
          <div className="relative flex items-center">
            <Input
              id="share-token"
              ref={inputRef}
              value={shareToken}
              readOnly
              className="pr-12 cursor-pointer"
              onClick={handleCopy}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={handleCopy}
              title="Copy to clipboard"
              tabIndex={0}
            >
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click the field or the icon to copy the share token.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTokenDialog;
