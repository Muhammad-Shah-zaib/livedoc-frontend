import { Button } from "@/components/ui/button";
import { logoutThunk } from "@/store/auth/authThunk";
import { useAppDispatch } from "@/store/store";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { useNavigate } from "react-router-dom";

function AvatarDropdown({
  user,
  getUserInitials,
}: {
  user: any;
  getUserInitials: () => string;
}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

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

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm px-2 py-2.5 rounded-full">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-lg ring-1 ring-black/5 z-50">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => {
              setOpen(false);
              // Placeholder for settings navigation
            }}
          >
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
