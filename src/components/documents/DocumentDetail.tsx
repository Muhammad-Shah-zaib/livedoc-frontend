import { useYjsLiveSocket } from "@/hooks/useLiveDocumentSocket";
import { TiptapEditor } from "@/shared/components/Header/TipTapEditor/TIpTapEditor";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCanNavigateToDetailFromConnect } from "@/store/documents/documentSlice";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useSaveDocument } from "@/hooks/useSaveDocument";

export default function DocumentDetail() {
  const { currentDocument } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);
  const [canSave, setCanSave] = useState(false);
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
        {/* //ADD SAVE BUTTON HERE */}
        {canSave && (
          <Button onClick={handleSave} variant={"outline"}>
            Save
          </Button>
        )}
      </div>
      <TiptapEditor ydoc={ydoc} />
    </div>
  );
}
