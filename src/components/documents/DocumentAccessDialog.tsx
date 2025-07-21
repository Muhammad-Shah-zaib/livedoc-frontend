import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, FilePlus2 } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DocumentInviteForm from "./DocumentInviteForm";
import { useDocumentAccessTable } from "../../hooks/useDocumentAccessTable";

interface DocumentAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentId?: number | null;
}

const DocumentAccessDialog: React.FC<DocumentAccessDialogProps> = ({
  open,
  onOpenChange,
  documentId = null,
}) => {
  // Use custom hook for table logic and data
  const { documentAccess, columns } = useDocumentAccessTable();

  let data = documentAccess;

  if (documentId) {
    data = documentAccess.filter((da) => da.document.id === documentId);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full min-w-[350px] md:min-w-[600px] lg:min-w-[1000px] overflow-hidden flex flex-col">
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
              <DataTable columns={columns} data={data} pageSize={7} />
            </div>
          </TabsContent>
          <TabsContent value="invite" className="flex-1">
            <DocumentInviteForm
              documentId={documentId}
              onClose={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentAccessDialog;
