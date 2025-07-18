import { useAppDispatch } from "@/store/store";
import { patchDocumentThunk } from "@/store/documents/documentThunk";
import type { PatchDocumentPayload, Document } from "@/store/documents/types";
import { toast } from "sonner";
import { wait } from "@/utils/wait";

export function useSaveDocument(currentDocument: Document) {
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    if (!currentDocument) return;

    await wait(301);

    dispatch(
      patchDocumentThunk({
        ...currentDocument,
        id: currentDocument.id,
        content: currentDocument.content,
      } as PatchDocumentPayload)
    )
      .unwrap()
      .then(() => {
        toast.success("document saved successfully");
      })
      .catch(() => {
        toast.success("unable to save document yet");
      });
  };

  return { handleSave };
}
