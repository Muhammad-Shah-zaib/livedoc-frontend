import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { Plus } from "lucide-react";
import NewDocumentDialog from "./NewDocumentDialog";

function DashboardActionBar() {
  const { documents, searchQuery } = useAppSelector((state) => state.documents);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
      <NewDocumentDialog
        onCreate={(title) => {
          console.log("Create document:", title);
        }}
      />
    </div>
  );
}

export default DashboardActionBar;
