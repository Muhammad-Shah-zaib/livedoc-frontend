import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import Spinner from "@/shared/components/spinner";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { deleteDocumentThunk } from "@/store/documents/documentThunk";
import type { Document } from "@/store/documents/types";

interface DeleteDocumentDialogProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteDocumentDialog({
  document,
  open,
  onOpenChange,
}: DeleteDocumentDialogProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.documents);
  const handleDelete = () => {
    try {
      dispatch(deleteDocumentThunk({ id: document.id }));
    } catch (e) {}
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onOpenChange(v)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Document #{document.id}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="text-base font-semibold">
            Are you sure you want to delete this document?
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-mono">Name:</span> {document.name}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-mono">Created at:</span>{" "}
            {new Date(document.created_at).toLocaleString()}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="relative min-w-[90px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" /> Deleting...
              </span>
            ) : (
              "Delete"
            )}
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Spinner spinnerColorClass="text-red-600" opacity={0.1} />
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
