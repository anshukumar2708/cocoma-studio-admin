import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Users,
  X,
  ChevronDown,
  Folder,
  Layers,
  FolderTree,
  Wrench,
  MessageSquareQuote,
} from "lucide-react";
import logo from "../../assets/logo.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Banners",
    icon: Image,
    url: "/admin/banners",
  },
  {
    title: "Services",
    icon: Image,
    children: [
      {
        title: "Categories",
        icon: FolderTree,
        url: "/admin/categories",
      },
      {
        title: "Service Items",
        icon: Wrench,
        url: "/admin/services",
      },
    ]
  },
  {
    title: "Our Work",
    icon: Image,
    children: [
      {
        title: "Categories",
        icon: Folder,
        url: "/admin/work-categories",
      },
      {
        title: "Work Items",
        icon: Layers,
        url: "/admin/work-items",
      },
    ],
  },
  {
    title: "Solutions",
    icon: FileText,
    url: "/admin/solutions",
  },
  {
    title: "Blog Posts",
    icon: FileText,
    url: "/admin/blog",
  },
  {
    title: "Testimonials",
    icon: MessageSquareQuote,
    url: "/admin/testimonials",
  },
  {
    title: "Team Members",
    icon: Users,
    url: "/admin/team",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-12 h-auto" alt="cocoma-studios-logo" />
            <h2 className="text-lg font-semibold">Cocoma Studios</h2>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-muted rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* NAVIGATION */}
        <nav className="p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            //  DROPDOWN ITEM
            if (item.children) {
              const isOpen = openDropdown === item.title;
              return (
                <div key={item.title}>
                  <button
                    onClick={() => toggleDropdown(item.title)}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg
                    text-muted-foreground hover:bg-primary/10 hover:text-primary
                    transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* DROPDOWN CONTENT */}

                  <div
                    className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
                  >
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <NavLink
                          key={child.url}
                          to={child.url}
                          onClick={onClose}
                          className="flex items-center gap-3 px-3 py-2 rounded-md
                          text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary
                          transition-all"
                          activeClassName="text-primary font-medium bg-primary/10"
                        >
                          <ChildIcon className="w-4 h-4" />
                          <span>{child.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            }
            //  NORMAL ITEM
            return (
              <NavLink
                key={item?.url}
                to={item.url!}
                end={item?.url === "/admin"}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                text-muted-foreground hover:bg-primary/10 hover:text-primary
                hover:scale-[1.02] transition-all"
                activeClassName="bg-primary/15 text-primary font-medium shadow-sm"
              >
                <Icon className="w-5 h-5" />
                <span>{item?.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
