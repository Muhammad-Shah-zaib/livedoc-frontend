import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, User2 } from "lucide-react";
import { useAppSelector } from "@/store/store";

interface DocumentAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentAccessDialog: React.FC<DocumentAccessDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const documentAccess = useAppSelector(
    (state) => state.documents.documentAccess
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>All Document Accesses</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead>Approved At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentAccess.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No document accesses found.
                  </TableCell>
                </TableRow>
              ) : (
                documentAccess.map((access) => (
                  <TableRow key={access.id}>
                    <TableCell className="flex items-center gap-2">
                      <User2 className="w-4 h-4 text-slate-500" />
                      {access.user?.email || "Unknown"}
                    </TableCell>
                    <TableCell>{access.document?.name || "-"}</TableCell>
                    <TableCell>
                      {access.access_approved ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Approved
                        </span>
                      ) : (
                        <span className="text-yellow-600 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {access.request_at
                        ? new Date(access.request_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {access.approved_at
                        ? new Date(access.approved_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {!access.access_approved && (
                        <Button size="sm" variant="outline" title="Approve">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      {access.access_approved && (
                        <Button
                          size="sm"
                          variant="destructive"
                          title="Disapprove"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentAccessDialog;
