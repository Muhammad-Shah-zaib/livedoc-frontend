import { useAppSelector } from "@/store/store";
import NewDocumentDialog from "../documents/NewDocumentDialog";
import ConnectLiveDocumentDialog from "../documents/ConnectLiveDocumentDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Users, MoreVertical, Unplug, FileText } from "lucide-react";
import DocumentAccessDialog from "../documents/DocumentAccessDialog";
import React from "react";
import { Badge } from "../ui/badge";

function DashboardActionBar() {
  const { documents, searchQuery } = useAppSelector((state) => state.documents);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [manageDialogOpen, setManageDialogOpen] = React.useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Your Documents
        </h1>
        <div className="flex items-center gap-2">
          <Badge variant={"secondary"}>
            <FileText className="w-1 h-1" />
            {filteredDocuments.length} document
            {filteredDocuments.length !== 1 ? "s" : ""} found
          </Badge>
          {filteredDocuments.length === 0 && (
            <div className="flex text-xs items-center space-x-1 text-slate-500 dark:text-slate-400">
              <span>•</span>
              <span>Ready to create your first one?</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <NewDocumentDialog />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setConnectDialogOpen(true)}>
              <Unplug className="w-4 h-4 mr-2" />
              Connect to Live Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setManageDialogOpen(true)}>
              <Users className="w-4 h-4 mr-2" />
              Manage Access
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ConnectLiveDocumentDialog
          open={connectDialogOpen}
          onOpenChange={setConnectDialogOpen}
        />

        <DocumentAccessDialog
          open={manageDialogOpen}
          onOpenChange={setManageDialogOpen}
        />
      </div>
    </div>
  );
}

export default DashboardActionBar;
