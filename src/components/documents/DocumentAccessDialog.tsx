import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, User2, Users, FilePlus2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  approveAccessThunk,
  revokeAccessThunk,
} from "@/store/documents/documentThunk";
import { DataTable } from "@/components/ui/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentInviteForm from "./DocumentInviteForm";

interface DocumentAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentAccessDialog: React.FC<DocumentAccessDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();

  const handleApproveAccess = (access_id: number) => {
    dispatch(approveAccessThunk({ access_id }));
  };

  const handleRevokeAccesss = (access_id: number) => {
    dispatch(revokeAccessThunk({ access_id }));
  };

  const documentAccess = useAppSelector(
    (state) => state.documents.documentAccess
  );

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "id#",
      cell: ({ row }) => row.original.id,
      enableSorting: true,
      enableColumnFilter: true,
    },

    {
      accessorKey: "user.email",
      header: "User",
      cell: ({ row }) => (
        <span className="flex items-center gap-2">
          <User2 className="w-4 h-4 text-slate-500" />
          {row.original.user?.email || "Unknown"}
        </span>
      ),
      filterFn: "includesString",
    },
    {
      accessorKey: "document.name",
      header: "Document",
      cell: ({ row }) => row.original.document?.name || "-",
      filterFn: "includesString",
    },
    {
      accessorKey: "document.id",
      header: "Document ID",
      cell: ({ row }) => row.original.document?.id || "-",
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      accessorKey: "access_approved",
      header: "Status",
      cell: ({ row }) =>
        row.original.access_approved ? (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Approved
          </span>
        ) : (
          <span className="text-yellow-600 flex items-center gap-1">
            <XCircle className="w-4 h-4" /> Pending
          </span>
        ),
      filterFn: (row, _, filterValue) => {
        if (!filterValue) return true;
        return filterValue === "approved"
          ? row.original.access_approved
          : !row.original.access_approved;
      },
    },
    {
      accessorKey: "request_at",
      header: "Requested At",
      cell: ({ row }) => {
        const requestAt = row.original.request_at;
        return requestAt ? (
          <span className="text-slate-700">
            {new Date(requestAt).toLocaleString()}
          </span>
        ) : (
          <span className="text-xs font-mono text-muted-foreground italic">
            Invited by you
          </span>
        );
      },
    },
    {
      accessorKey: "approved_at",
      header: "Approved At",
      cell: ({ row }) =>
        row.original.approved_at
          ? new Date(row.original.approved_at).toLocaleString()
          : "-",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {!row.original.access_approved && (
            <Button
              size="sm"
              variant="outline"
              title="Approve"
              onClick={() => handleApproveAccess(row.original.id)}
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
            </Button>
          )}
          {row.original.access_approved && (
            <Button
              size="sm"
              variant="destructive"
              title="Disapprove"
              onClick={() => handleRevokeAccesss(row.original.id)}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full min-w-[1000px] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Document Access</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="requests" className="flex flex-col flex-1">
          <TabsList className="mb-4 self-start">
            <TabsTrigger value="requests">
              <Users className="w-4 h-4 mr-1" /> Requests
            </TabsTrigger>
            <TabsTrigger value="invite">
              <FilePlus2 className="w-4 h-4 mr-1" /> Invite People
            </TabsTrigger>
          </TabsList>
          <TabsContent value="requests" className="flex-1">
            <div className="flex-1 overflow-auto max-h-[500px]">
              <DataTable columns={columns} data={documentAccess} pageSize={7} />
            </div>
          </TabsContent>
          <TabsContent value="invite" className="flex-1">
            <DocumentInviteForm onClose={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentAccessDialog;
