import React, { type FC } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ onToggleSidebar }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const initials = user?.firstName
    ? user.firstName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header className="fixed top-0 z-30 w-full lg:w-[calc(100%-16rem)] lg:left-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Sidebar toggle for mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Button>

        {/* App name */}
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          SkillSync
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </Button>

          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
