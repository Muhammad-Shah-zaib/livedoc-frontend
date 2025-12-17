import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Palette,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setSettingsActiveCategory,
  setSettingsDrawerMode,
} from "@/store/settings/settingsSlice";
import { toggleTheme } from "@/store/theme/themeSlice";
import { useLogout } from "@/hooks/useLogout";
import SettingsUpdateProfileForm from "./SettingsUpdateProfileForm";
import { cn } from "@/lib/utils";

function SettingsDrawer() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const drawerMode = useAppSelector((state) => state.settings.drawerMode);
  const activeCategory = useAppSelector((state) => state.settings.activeCategory);
  const { mode } = useAppSelector((state) => state.theme);
  const logout = useLogout();

  // Default to 'profile' if no category is active
  const currentTab = activeCategory || "profile";

  const handleTabChange = (tab: "profile" | "appearance") => {
    dispatch(setSettingsActiveCategory(tab));
  };

  return (
    <Dialog
      open={drawerMode}
      onOpenChange={(open) => dispatch(setSettingsDrawerMode(open))}
    >
      <DialogContent className="w-[95vw] max-w-[1400px] sm:max-w-[1400px] p-0 h-[90vh] md:h-[600px] flex flex-col md:flex-row gap-0 overflow-hidden bg-white dark:bg-slate-950">
        {/* Left Sidebar - Fixed max width to prevent spanning more than necessary */}
        <div className="w-full md:w-72 md:max-w-[280px] lg:max-w-[320px] md:flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          {/* User Header */}
          <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3 mb-1">
              <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium">
                  {user?.first_name?.[0]}
                  {user?.last_name?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-sm truncate text-slate-900 dark:text-slate-100">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-none md:flex-1 overflow-x-auto md:overflow-y-auto py-2 md:py-4 px-3 flex md:flex-col space-x-2 md:space-x-0 md:space-y-1">
            <Button
              variant={currentTab === "profile" ? "secondary" : "ghost"}
              className={cn(
                "justify-start whitespace-nowrap",
                currentTab === "profile"
                  ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
              onClick={() => handleTabChange("profile")}
            >
              <User className="h-4 w-4 mr-3" />
              Profile
            </Button>
            <Button
              variant={currentTab === "appearance" ? "secondary" : "ghost"}
              className={cn(
                "justify-start whitespace-nowrap",
                currentTab === "appearance"
                  ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
              onClick={() => handleTabChange("appearance")}
            >
              <Palette className="h-4 w-4 mr-3" />
              Appearance
            </Button>
          </div>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 hidden md:block">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-700 dark:hover:text-red-300"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>

        {/* Right Content - Takes up remaining space */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-6 md:p-8 lg:p-10 flex-1 overflow-y-auto">
            {currentTab === "profile" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold tracking-tight">Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information and profile settings.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 [&_form]:border-t-0 [&_form]:pt-0 [&_form]:mt-0 [&_form]:px-0 [&_form]:pb-0">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                    <SettingsUpdateProfileForm />
                  </div>
                </div>
              </div>
            )}

            {currentTab === "appearance" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold tracking-tight">Appearance</DialogTitle>
                  <DialogDescription>
                    Customize the look and feel of the application.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                        {mode === "dark" ? (
                          <Moon className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Sun className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          Dark Mode
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Toggle between light and dark themes
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={mode === "dark"}
                      onCheckedChange={() => dispatch(toggleTheme())}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Footer Logout */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 md:hidden">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDrawer;