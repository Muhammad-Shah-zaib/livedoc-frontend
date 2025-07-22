import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  User,
  Palette,
  Sun,
  Moon,
  Trash2,
  AlertTriangle,
  LogOut,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  setSettingsActiveCategory,
  setSettingsDrawerMode,
} from "@/store/settings/settingsSlice";
import { toggleTheme } from "@/store/theme/themeSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLogout } from "@/hooks/useLogout";
import SettingsUpdateProfileForm from "./SettingsUpdateProfileForm";

function SettingsDrawer() {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const drawerMode = useAppSelector((state) => state.settings.drawerMode);
  const activeCategory = useAppSelector(
    (state) => state.settings.activeCategory
  );
  const { mode } = useAppSelector((state) => state.theme);
  const logout = useLogout();

  return (
    <Drawer
      open={drawerMode}
      onOpenChange={(open) => dispatch(setSettingsDrawerMode(open))}
    >
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-user?.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {user?.first_name[0]}
                {user?.last_name[0] || ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle className="text-left">
                {user?.first_name} {user?.last_name}
              </DrawerTitle>
              <DrawerDescription className="text-left">
                {user?.email}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Edit Profile - Expandable */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() =>
                  dispatch(
                    setSettingsActiveCategory(
                      activeCategory === "profile" ? null : "profile"
                    )
                  )
                }
              >
                <User className="h-5 w-5 mr-3" />
                <div className="text-left flex-1">
                  <p className="font-medium">Edit Profile</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Update your personal information
                  </p>
                </div>
                <div
                  className={`transition-transform duration-200 ${
                    activeCategory === "profile" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </Button>
              {activeCategory === "profile" && <SettingsUpdateProfileForm />}
            </div>

            {/* Appearance - Expandable */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() =>
                  dispatch(
                    setSettingsActiveCategory(
                      activeCategory === "appearance" ? null : "appearance"
                    )
                  )
                }
              >
                <Palette className="h-5 w-5 mr-3" />
                <div className="text-left flex-1">
                  <p className="font-medium">Appearance</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Theme and display preferences
                  </p>
                </div>
                <div
                  className={`transition-transform duration-200 ${
                    activeCategory === "appearance" ? "rotate-180" : ""
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </div>
              </Button>

              {activeCategory === "appearance" && (
                <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700 mt-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-100 rounded-lg flex items-center justify-center">
                        {mode === "dark" ? (
                          <Sun className="h-4 w-4 text-slate-800" />
                        ) : (
                          <Moon className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          Dark Mode
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Toggle between light and dark themes
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={mode === "dark"}
                      onCheckedChange={() => {
                        dispatch(toggleTheme());
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Delete Account */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-4 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
                >
                  <Trash2 className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm opacity-80">
                      Permanently delete your account and data
                    </p>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span>Delete Account</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers,
                    including all documents and collaborations.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Logout at Bottom */}
        <DrawerFooter className="border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="outline"
            className="w-full text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SettingsDrawer;
