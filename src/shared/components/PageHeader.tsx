import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleTheme } from "@/store/theme/themeSlice";

interface PageHeaderProps {
  rightActions?: ReactNode;
  sticky?: boolean;
  className?: string;
}

export default function PageHeader({
  rightActions,
  sticky = false,
  className = "",
}: PageHeaderProps) {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <div
      className={
        (sticky
          ? "border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 "
          : "mb-12 ") + className
      }
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
          <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            DocFlow
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggleTheme()}
            className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {mode === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {rightActions}
        </div>
      </div>
    </div>
  );
}
