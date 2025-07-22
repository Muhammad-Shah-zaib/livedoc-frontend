import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleTheme } from "@/store/theme/themeSlice";

interface ToggleThemeButtonProps {
  className?: string;
  size?: "icon" | "sm" | "default";
}

const ToggleThemeButton = ({
  className = "",
  size = "icon",
}: ToggleThemeButtonProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggleTheme}
      className={`rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {mode === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ToggleThemeButton;
