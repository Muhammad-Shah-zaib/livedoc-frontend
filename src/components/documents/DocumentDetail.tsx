import { useYjsLiveSocket } from "@/hooks/useLiveDocumentSocket";
import { TiptapEditor } from "@/shared/components/TIpTapEditor";
import { useAppSelector } from "@/store/store";

export default function DocumentDetail() {
  const { currentDocument } = useAppSelector((state) => state.documents);

  if (!currentDocument) {
    return <div>Document not found</div>;
  }

  const { ydoc } = useYjsLiveSocket(currentDocument.share_token);

  // useSyncYjsWithRedux(ydoc, currentDocument);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{currentDocument.name}</h1>
      <TiptapEditor ydoc={ydoc} />
    </div>
  );
}
