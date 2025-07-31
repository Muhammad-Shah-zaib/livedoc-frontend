import { useAppDispatch, useAppSelector } from "@/store/store";
import { Grid3X3, List, Search } from "lucide-react";
import AvatarDropdown from "./AvatarDropDown";
import NotificationPopover from "@/shared/components/NotificationPopover";
import {
  setDocumentViewStyle,
  setSearchQuery,
  setIsSearching,
} from "@/store/documents/documentSlice";
import ToggleThemeButton from "@/shared/components/ToggleThemeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import AnimatedCatSvg from "../AnimatedCatSvg";

function Header() {
  const dispatch = useAppDispatch();
  const { documentViewStyle, searchQuery, isSearching } = useAppSelector(
    (state) => state.documents
  );
  const { user } = useAppSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearchQuery(value));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchQuery = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      dispatch(setIsSearching(true)); // User started typing
      debouncedSearch(value.trim().toLowerCase());
    },
    [debouncedSearch, dispatch]
  );

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`;
    } else if (user?.first_name) {
      return user.first_name[0];
    }
    return `PK`;
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-8">
      <div className="flex items-center justify-between md:justify-start md:space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
          <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            DocFlow
          </span>
        </div>

        {/* Mobile View Toggle and Theme */}
        <div className="flex items-center space-x-2 md:hidden">
          <div className="flex items-center space-x-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg p-1">
            <Button
              variant={documentViewStyle === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setDocumentViewStyle("grid"))}
              className="h-7 px-2"
            >
              <Grid3X3 className="h-3 w-3" />
            </Button>
            <Button
              variant={documentViewStyle === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setDocumentViewStyle("list"))}
              className="h-7 px-2"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
          <ToggleThemeButton />
        </div>

        {/* Desktop View Toggle */}
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

      {/* Search and Actions Row */}
      <div className="flex items-center justify-between space-x-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <div className="absolute left-1 z-50 top-1/2 -translate-y-1/2 hidden sm:block">
            <div className="w-8 h-8">
              <AnimatedCatSvg isSearching={isSearching} />
            </div>
          </div>

          <Input
            placeholder="Search..."
            value={inputValue}
            onChange={handleSearchQuery}
            className="pl-10 pr-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-700 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Notifications Popover */}
          <NotificationPopover />
          {/* Avatar */}
          <AvatarDropdown user={user} getUserInitials={getUserInitials} />
        </div>
      </div>
    </div>
  );
}

export default Header;
