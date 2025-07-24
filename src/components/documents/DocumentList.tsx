import { useAppSelector } from "@/store/store";
import {
  FileText,
  Clock,
  Users,
  Share2,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import useDocumentActions from "@/hooks/useDocumentActions";
import ShareTokenDialog from "./ShareTokenDialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import { useState } from "react";

function DocumentList() {
  const { filteredDocuments } = useAppSelector((state) => state.documents);
  const {
    handleOpenDocumentDetail,
    shareDialogOpen,
    setShareDialogOpen,
    toggleLive,
    loading,
  } = useDocumentActions();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<null | number>(null);

  return (
    <div className="space-y-4">
      {filteredDocuments.map((doc) => (
        <Card
          key={doc.id}
          className="group border-0 shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {doc.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{doc.updated_at.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{doc.live_members_count} collaborators</span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-sm">
                      <Switch
                        checked={doc.is_live}
                        onCheckedChange={() => toggleLive(doc.id, !doc.is_live)}
                        id={`switch-${doc.id}`}
                        disabled={loading}
                      />
                      <Label
                        htmlFor={`switch-${doc.id}`}
                        className={
                          doc.is_live
                            ? "text-green-600 dark:text-green-300 font-bold"
                            : "text-slate-500 dark:text-slate-400 font-bold"
                        }
                      >
                        {doc.is_live ? "LIVE" : "OFFLINE"}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3"
                  onClick={() => setShareDialogOpen(doc.id)}
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3"
                  onClick={() => handleOpenDocumentDetail(doc)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Open
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleOpenDocumentDetail(doc)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShareDialogOpen(doc.id)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setDeleteDialogOpen(doc.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
          <ShareTokenDialog
            open={shareDialogOpen === doc.id}
            onOpenChange={(open) => setShareDialogOpen(open ? doc.id : null)}
            shareToken={doc.share_token}
          />
          <DeleteDocumentDialog
            document={doc}
            open={deleteDialogOpen === doc.id}
            onOpenChange={(open) => setDeleteDialogOpen(open ? doc.id : null)}
          />
        </Card>
      ))}
    </div>
  );
}

export default DocumentList;
