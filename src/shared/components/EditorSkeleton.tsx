import { Skeleton } from "@/components/ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {/* Title Bar */}

      {/* Toolbar */}
      <div className="flex items-center justify-between space-x-2">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-10 rounded-md" />
          <Skeleton className="h-8 w-10 rounded-md" />
        </div>
      </div>

      {/* Editor Area */}
      <div className="mt-4">
        <Skeleton className="h-[400px] w-full rounded-md" />
      </div>
    </div>
  );
}
