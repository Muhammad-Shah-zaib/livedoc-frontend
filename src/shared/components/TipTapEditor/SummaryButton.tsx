import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, FileText, X, Brain, Zap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { GetDocumentSummaryThunk } from "@/store/documents/documentThunk";
import { SummaryLoadingSkeleton } from "./SummaryLoadingSkeleton";

export function SummaryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentDocument = useAppSelector(
    (state) => state.documents.currentDocument
  );
  const loading = useAppSelector((state) => state.documents.loading);

  const handleGenerateSummary = () => {
    if (currentDocument) {
      dispatch(
        GetDocumentSummaryThunk({
          id: currentDocument.id,
          content: currentDocument.content,
        })
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <FileText className="w-4 h-4 mr-2" />
        Summary
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Summary
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Summary Content */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Summary
              </label>

              {loading ? (
                <SummaryLoadingSkeleton />
              ) : currentDocument?.summary ? (
                <textarea
                  value={currentDocument.summary}
                  readOnly
                  className="min-h-[120px] resize-none bg-gray-50 dark:bg-gray-800 w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="No summary available"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    No summary available
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Generate a summary to get started
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>

              <Button
                onClick={handleGenerateSummary}
                disabled={loading}
                className={`
                  group relative px-8 py-3 font-bold text-white transition-all duration-300 ease-out
                  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
                  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
                  hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105
                  focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                  border-0 rounded-xl overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                  before:translate-x-[-100%] before:transition-transform before:duration-700
                  hover:before:translate-x-[100%]
                `}
              >
                <div className="relative flex items-center justify-center gap-2">
                  <div className="relative">
                    <Brain className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="relative">
                    {loading ? (
                      <>
                        <Zap className="inline w-4 h-4 mr-1 animate-pulse" />
                        Processing...
                      </>
                    ) : (
                      <>Generate Summary</>
                    )}
                  </span>
                  <Sparkles className="w-4 h-4 group-hover:animate-pulse transition-all duration-300" />
                </div>

                {/* Animated background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl"></div>
                </div>

                {/* Loading overlay */}
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
