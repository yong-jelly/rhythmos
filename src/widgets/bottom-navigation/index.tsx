import { Home, Sparkles, Users, Archive, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: <Home className="h-5 w-5" />, label: "홈", path: "/home" },
  { id: "journey", icon: <Sparkles className="h-5 w-5" />, label: "여정", path: "/journey" },
  { id: "circle", icon: <Users className="h-5 w-5" />, label: "서클", path: "/circle" },
  { id: "archives", icon: <Archive className="h-5 w-5" />, label: "기록실", path: "/archives" },
];

interface BottomNavigationProps {
  onAddClick?: () => void;
}

export function BottomNavigation({ onAddClick }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border/30 bg-background/95 backdrop-blur-md safe-area-bottom shadow-[0_-1px_2px_0_rgb(0_0_0_/0.03)]">
      <div className="flex items-center justify-around px-4 py-3 max-w-4xl mx-auto">
        {navItems.slice(0, 2).map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={cn(
              "flex h-auto flex-col gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200",
              location.pathname === item.path
                ? "bg-primary/10 text-primary scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
            )}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs font-semibold">{item.label}</span>
          </Button>
        ))}

        {/* Center Add Button */}
        <div className="relative -mt-10">
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-[0_4px_12px_0_rgb(0_0_0_/0.15)] hover:shadow-[0_6px_16px_0_rgb(0_0_0_/0.2)] hover:-translate-y-1 transition-all duration-300"
            onClick={onAddClick}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {navItems.slice(2).map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={cn(
              "flex h-auto flex-col gap-1.5 rounded-xl px-4 py-2.5 transition-all duration-200",
              location.pathname === item.path
                ? "bg-primary/10 text-primary scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
            )}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs font-semibold">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}

