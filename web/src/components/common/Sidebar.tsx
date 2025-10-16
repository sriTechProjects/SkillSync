import React, { type FC } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { X, Home, Library, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "My Skills", icon: Library, path: "/skills" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Help / FAQ", icon: HelpCircle, path: "/help" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 shadow-lg transform transition-all duration-300 ease-in-out z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 h-16 border-b border-gray-200 dark:border-slate-700">
        <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          Hello, {user?.firstName || "User"}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Button>
      </div>

      {/* Menu */}
      <nav className="p-4 flex flex-col h-[calc(100%-4rem)]">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="justify-start gap-3 w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" /> {item.name}
            </Button>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
          <Button
            variant="destructive"
            className="justify-start gap-3 w-full text-md"
          >
            <LogOut className="h-5 w-5" /> Logout
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
