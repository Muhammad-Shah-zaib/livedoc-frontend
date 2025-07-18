import { useYjsLiveSocket } from "@/hooks/useLiveDocumentSocket";
import { TiptapEditor } from "@/shared/components/Header/TipTapEditor/TIpTapEditor";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCanNavigateToDetailFromConnect } from "@/store/documents/documentSlice";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useSaveDocument } from "@/hooks/useSaveDocument";
import DocumentAccessDialog from "./DocumentAccessDialog";

export default function DocumentDetail() {
  const { currentDocument } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);
  const [canSave, setCanSave] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  dispatch(setCanNavigateToDetailFromConnect(false));

  if (!currentDocument) {
    return <div>Document not found</div>;
  }
  useEffect(() => {
    if (user?.id == currentDocument?.admin) {
      setCanSave(true);
    }
  }, [user, currentDocument]);

  const { ydoc } = useYjsLiveSocket(currentDocument.share_token);
  const { handleSave } = useSaveDocument(currentDocument);

  return (
    <div>
      <div className="flex justify-between px-4">
        <h1 className="text-2xl font-bold mb-4">{currentDocument.name}</h1>
        <div className="flex gap-2 items-center">
          {canSave && (
            <Button onClick={handleSave} variant={"outline"}>
              Save
            </Button>
          )}
          <Button onClick={() => setAccessDialogOpen(true)} variant={"outline"}>
            Manage Access
          </Button>
        </div>
      </div>
      <TiptapEditor ydoc={ydoc} />
      <DocumentAccessDialog
        open={accessDialogOpen}
        onOpenChange={setAccessDialogOpen}
        documentId={currentDocument.id}
      />
    </div>
  );
}
