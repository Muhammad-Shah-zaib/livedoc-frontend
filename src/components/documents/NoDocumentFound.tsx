import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "../ui/button";
import { setSerachQuery } from "@/store/documents/documentSlice";
import NewDocumentDialog from "./NewDocumentDialog";
import EmptyStateAddDocument from "@/shared/icons/EmptyStateAddDocument";

function NoDocumentFound() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.documents);
  return (
    <div className="text-center py-0">
      {/* SVG Illustration */}
      <div className="w-64 h-64 mx-auto mb-8 relative">
        <EmptyStateAddDocument />
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {searchQuery ? "No documents found" : "No documents yet"}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {searchQuery
            ? `We couldn't find any documents matching "${searchQuery}". Try adjusting your search terms.`
            : "Start your journey by creating your first document. Collaborate with your team and bring your ideas to life."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NewDocumentDialog />
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => dispatch(setSerachQuery(""))}
              className="px-8 py-3 h-auto bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Clear Search
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoDocumentFound;
