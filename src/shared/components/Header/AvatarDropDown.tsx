import { Button } from "@/components/ui/button";
import { setSettingsDrawerMode } from "@/store/settings/settingsSlice";
import { useAppDispatch } from "@/store/store";
import { LogOut, Settings } from "lucide-react";
import React from "react";
import { useLogout } from "@/hooks/useLogout";

function AvatarDropdown({
  getUserInitials,
}: {
  user: any;
  getUserInitials: () => string;
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const logout = useLogout();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="focus:outline-none h-9 w-9 rounded-full overflow-hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="h-full w-full flex items-center justify-center rounded-full bg-gradient-to-r  from-violet-500 to-sky-500 text-white text-sm font-medium">
          {getUserInitials()}
        </div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 rounded-lg shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-4 py-2 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => dispatch(setSettingsDrawerMode(true))}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-4 py-2 text-left hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
