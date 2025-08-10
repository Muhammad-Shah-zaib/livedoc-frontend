import { Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import "./summaryStyle.css";

export function SummaryLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {/* First full line skeleton */}
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-pulse bg-[length:200%_100%] animate-shimmer"></div>

      {/* Second full line skeleton */}
      <div
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-pulse bg-[length:200%_100%] animate-shimmer"
        style={{ animationDelay: "0.2s" }}
      ></div>

      {/* Third half line skeleton with AI badge */}
      <div className="flex items-center gap-3">
        <div
          className="h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-pulse bg-[length:200%_100%] animate-shimmer"
          style={{ animationDelay: "0.4s" }}
        ></div>

        {/* AI Working Badge */}
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm"
        >
          <div className="relative">
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            <div className="absolute inset-0 bg-indigo-400/30 rounded-full blur-sm animate-pulse"></div>
          </div>
          <span className="text-xs font-medium">AI Working</span>
          <Sparkles className="w-3 h-3 animate-ping" />
        </Badge>
      </div>
    </div>
  );
}
