import { TiptapEditor } from "@/shared/components/TipTapEditor/TIpTapEditor";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setAccessDocumentDetail,
  setCanNavigateToDetailFromConnect,
} from "@/store/documents/documentSlice";
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
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import { patchDocumentThunk } from "@/store/documents/documentThunk";

export default function DocumentDetail() {
  const { currentDocument, loading, accessDocumentDetail } = useAppSelector(
    (state) => state.documents
  );
  const { user } = useAppSelector((state) => state.auth);
  const [canSave, setCanSave] = useState(false);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  if (!currentDocument) return <div>Loading...</div>;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(currentDocument.name);

  useEffect(() => {
    setEditedTitle(currentDocument.name);
  }, [currentDocument.name]);

  const handleTitleSave = () => {
    setIsEditing(false);
    if (editedTitle.trim() && editedTitle !== currentDocument.name) {
      // TODO: Update the title in the store or via API
      dispatch(
        patchDocumentThunk({
          id: currentDocument.id,
          name: editedTitle.trim(),
        })
      );
    }
  };
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
          <div
            className="text-lg md:text-xl lg:text-3xl -xl:text-4xl font-bold mb-4"
            onDoubleClick={() => {
              if (currentDocument.admin === user?.id) {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? (
              <Input
                className="text-lg md:text-xl lg:text-3xl font-bold border border-gray-300 rounded px-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleSave();
                  }
                }}
                autoFocus
              />
            ) : (
              currentDocument.name
            )}
          </div>
        </h1>
        <div className="flex gap-2 items-center">
          {canSave && (
            <Button disabled={loading} variant="ghost" onClick={handleSave}>
              {loading ? (
                <Loader className="w-4 h-4 text-slate-600 animate-spin mr-2" />
              ) : (
                <SaveIcon className="w-4 h-4 text0slate-600" />
              )}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => dispatch(setAccessDocumentDetail(true))}
              >
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
      </div>
      {/* <TiptapEditor ydoc={ydoc} provider={provider} /> */}
      <TiptapEditor editor={editor} />

      <ShareTokenDialog
        open={open}
        onOpenChange={() => setOpen(false)}
        shareToken={currentDocument.share_token}
      />
      <DocumentAccessDialog
        open={accessDocumentDetail}
        onOpenChange={() => dispatch(setAccessDocumentDetail(false))}
        documentId={currentDocument.id}
      />
    </div>
  );
}
