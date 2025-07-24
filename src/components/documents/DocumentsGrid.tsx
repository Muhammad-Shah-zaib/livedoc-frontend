import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/store";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import {
  Clock,
  Users,
  MoreHorizontal,
  Eye,
  Share2,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import ShareTokenDialog from "./ShareTokenDialog";
import useDocumentActions from "@/hooks/useDocumentActions";
import DocumentAccessDialog from "./DocumentAccessDialog";
import DeleteDocumentDialog from "./DeleteDocumentDialog";
import NoDocumentFound from "./NoDocumentFound";

function DocumentsView() {
  const { filteredDocuments } = useAppSelector((state) => state.documents);
  const {
    handleOpenDocumentDetail,
    toggleLive,
    loading,
    shareDialogOpen,
    setShareDialogOpen,
    accessDialogOpen,
    setAccessDialogOpen,
  } = useDocumentActions();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<null | number>(null);

  if (filteredDocuments.length === 0) {
    return <NoDocumentFound />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDocuments.map((doc) => (
        <Card
          key={doc.id}
          className="group border-0 shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2">
                  {doc.name}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{doc.created_at.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{doc.live_members_count}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
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
                  <DropdownMenuItem onClick={() => setShareDialogOpen(doc.id)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAccessDialogOpen(doc.id)}>
                    <Users className="h-4 w-4 mr-2" />
                    Access
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
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono text-sm ">
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
              </div>
            </div>
            <ShareTokenDialog
              open={shareDialogOpen === doc.id}
              onOpenChange={(open) => setShareDialogOpen(open ? doc.id : null)}
              shareToken={doc.share_token}
            />
            <DocumentAccessDialog
              open={accessDialogOpen === doc.id}
              onOpenChange={(open) => setAccessDialogOpen(open ? doc.id : null)}
              documentId={doc.id}
            />
            <DeleteDocumentDialog
              document={doc}
              open={deleteDialogOpen === doc.id}
              onOpenChange={(open) => setDeleteDialogOpen(open ? doc.id : null)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DocumentsView;
