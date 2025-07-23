import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Grid3X3, List, Search } from "lucide-react";
import { useState } from "react";
import AvatarDropdown from "./AvatarDropDown";
import NotificationPopover from "@/shared/components/NotificationPopover";
import { setDocumentViewStyle } from "@/store/documents/documentSlice";
import ToggleThemeButton from "@/shared/components/ToggleThemeButton";

function Header() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { documentViewStyle } = useAppSelector((state) => state.documents);
  const { user } = useAppSelector((state) => state.auth);

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`;
    } else if (user?.first_name) {
      return user.first_name[0];
    }
    return `PK`;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 w-full">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              DocFlow
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg p-1">
            <Button
              variant={documentViewStyle === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setDocumentViewStyle("grid"))}
              className="h-8 px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={documentViewStyle === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setDocumentViewStyle("list"))}
              className="h-8 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700"
            />
          </div>
          <ToggleThemeButton />
          <NotificationPopover />
          <AvatarDropdown user={user} getUserInitials={getUserInitials} />
        </div>
      </div>
    </>
  );
}

export default Header;
