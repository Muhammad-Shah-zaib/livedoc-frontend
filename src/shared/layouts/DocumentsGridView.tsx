import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/store";

import {
  Clock,
  Users,
  MoreHorizontal,
  Eye,
  Share2,
  Trash2,
  Badge,
} from "lucide-react";

function DocumentsView() {
  const { filteredDocuments } = useAppSelector((state) => state.documents);
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
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              {doc.content.length > 40
                ? doc.content.slice(0, 40) + "..."
                : doc.content}
            </p>
            <div className="flex items-center justify-between">
              <Badge
                className={
                  doc.is_live
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : ""
                }
              >
                {doc.is_live ? "LIVE" : "OFFLINE"}
              </Badge>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="h-8 px-3">
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="ghost" className="h-8 px-3">
                  <Eye className="h-3 w-3 mr-1" />
                  Open
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DocumentsView;
