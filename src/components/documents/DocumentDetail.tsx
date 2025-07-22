import { TiptapEditor } from "@/shared/components/TipTapEditor/TIpTapEditor";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCanNavigateToDetailFromConnect } from "@/store/documents/documentSlice";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useSaveDocument } from "@/hooks/useSaveDocument";
import DocumentAccessDialog from "./DocumentAccessDialog";
import useTipTapEditor from "@/hooks/useTipTapEditor";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { MoreVertical, SaveIcon, Share2, User2 } from "lucide-react";
import ShareTokenDialog from "./ShareTokenDialog";

export default function DocumentDetail() {
  const { currentDocument } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);
  const [canSave, setCanSave] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  if (!currentDocument) {
    return <div>Document not found</div>;
  }

  const editor = useTipTapEditor();
  useEffect(() => {
    dispatch(setCanNavigateToDetailFromConnect(false));
  }, [dispatch]);

  useEffect(() => {
    if (user?.id == currentDocument?.admin) {
      setCanSave(true);
    }
  }, [user, currentDocument]);

  // const { ydoc, provider } = useYjsLiveSocket(currentDocument.share_token);
  const { handleSave } = useSaveDocument(currentDocument);

  return (
    <div>
      <div className="flex justify-between px-4">
        <h1 className=" text-lg md:text-xl lg:text-3xl -xl:text-4xl font-bold mb-4">
          {currentDocument.name}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {canSave && (
              <DropdownMenuItem onClick={handleSave}>
                <SaveIcon className="w-4 h-4" />
                Save
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => setAccessDialogOpen(true)}>
              <User2 className="w-4 h-4" />
              Manage Access
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Share2 className="w-4 h-4" />
              Share Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <TiptapEditor ydoc={ydoc} provider={provider} /> */}
      <TiptapEditor editor={editor} />

      <ShareTokenDialog
        open={open}
        onOpenChange={() => setOpen(false)}
        shareToken={currentDocument.share_token}
      />
      <DocumentAccessDialog
        open={accessDialogOpen}
        onOpenChange={setAccessDialogOpen}
        documentId={currentDocument.id}
      />
    </div>
  );
}
