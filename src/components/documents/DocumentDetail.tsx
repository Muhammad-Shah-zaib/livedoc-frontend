import { useLiveDocSocket } from "@/hooks/useLiveDocumentSocket";
import { useAppSelector } from "@/store/store";

function DocumentDetail() {
  const { currentDocument } = useAppSelector((state) => state.documents);

  // get the document with the share token
  if (!currentDocument) {
    return <div>Document not found</div>;
  }

  const {} = useLiveDocSocket(currentDocument.share_token);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{currentDocument.name}</h1>
      <p className="text-gray-700 mb-2">
        Created at: {currentDocument.created_at}
      </p>
      <p className="text-gray-700 mb-2">
        Live Members: {currentDocument.live_members_count}
      </p>
      <div className="prose">
        <p>{currentDocument.content}</p>
      </div>
    </div>
  );
}

export default DocumentDetail;
