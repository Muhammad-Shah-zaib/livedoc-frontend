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
import { Users } from "lucide-react";
import DocumentAccessDialog from "../documents/DocumentAccessDialog";
import React from "react";

function DashboardActionBar() {
  const { documents, searchQuery, documentAccess } = useAppSelector(
    (state) => state.documents
  );

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [accessDialogOpen, setAccessDialogOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Your Documents
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {filteredDocuments.length} document
          {filteredDocuments.length !== 1 ? "s" : ""} found
        </p>
      </div>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Manage Access
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setAccessDialogOpen(true)}>
              <Users className="w-4 h-4 mr-2" />
              Show All Document Accesses
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ConnectLiveDocumentDialog />
        <NewDocumentDialog />
        <DocumentAccessDialog
          open={accessDialogOpen}
          onOpenChange={setAccessDialogOpen}
        />
      </div>
    </div>
  );
}

export default DashboardActionBar;
