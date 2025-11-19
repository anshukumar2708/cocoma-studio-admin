import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
