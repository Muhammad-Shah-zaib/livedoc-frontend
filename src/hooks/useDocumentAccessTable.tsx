import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  approveAccessThunk,
  revokeAccessThunk,
} from "@/store/documents/documentThunk";
import type { ColumnDef } from "@tanstack/react-table";
import { User2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Custom hook to encapsulate document access table logic.
 * Includes selectors, action handlers, and column definitions for DataTable.
 */
export function useDocumentAccessTable() {
  // --- Redux selector: Get document access data from store ---
  const documentAccess = useAppSelector(
    (state) => state.documents.documentAccess
  );

  // --- Handlers: Approve and revoke access actions ---
  const dispatch = useAppDispatch();

  const handleApproveAccess = (access_id: number) => {
    dispatch(approveAccessThunk({ access_id }));
  };

  const handleRevokeAccess = (access_id: number) => {
    dispatch(revokeAccessThunk({ access_id }));
  };

  // --- DataTable columns definition ---
  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "id#",
        cell: ({ row }: any) => row.original.id,
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "user.email",
        header: "User",
        cell: ({ row }: any) => (
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
        cell: ({ row }: any) => row.original.document?.name || "-",
        filterFn: "includesString",
      },
      {
        accessorKey: "document.id",
        header: "Document ID",
        cell: ({ row }: any) => row.original.document?.id || "-",
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: "access_approved",
        header: "Status",
        cell: ({ row }: any) =>
          row.original.access_approved ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Approved
            </span>
          ) : (
            <span className="text-yellow-600 flex items-center gap-1">
              <XCircle className="w-4 h-4" /> Pending
            </span>
          ),
        filterFn: (row: any, _: any, filterValue: string) => {
          if (!filterValue) return true;
          return filterValue === "approved"
            ? row.original.access_approved
            : !row.original.access_approved;
        },
      },
      {
        accessorKey: "request_at",
        header: "Requested At",
        cell: ({ row }: any) => {
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
        cell: ({ row }: any) =>
          row.original.approved_at
            ? new Date(row.original.approved_at).toLocaleString()
            : "-",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: any) => {
          const isApproved = row.original.access_approved;
          return (
            <div className="flex gap-2">
              {!isApproved && (
                <Button
                  size="sm"
                  variant="outline"
                  title="Approve"
                  onClick={() => handleApproveAccess(row.original.id)}
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </Button>
              )}
              {isApproved && (
                <Button
                  size="sm"
                  variant="destructive"
                  title="Disapprove"
                  onClick={() => handleRevokeAccess(row.original.id)}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [documentAccess]
  );

  // --- Return values for use in the component ---
  return { documentAccess, columns };
}
