import { Home, Sparkles, Users, Archive } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

type NavItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "홈", path: "/home" },
  { id: "journey", icon: Sparkles, label: "여정", path: "/journey" },
  { id: "circle", icon: Users, label: "서클", path: "/circle" },
  { id: "archives", icon: Archive, label: "기록실", path: "/archives" },
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* iOS 스타일 배경 및 블러 - 모던하고 심플한 스타일 */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl border-t border-border/10" />
      
      {/* Safe area 고려한 컨테이너 - iOS 가이드라인 준수 */}
      <div className="relative flex items-center justify-around px-4 py-2.5 max-w-4xl mx-auto safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              className={cn(
                "relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl",
                "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                "active:scale-[0.92] active:transition-transform active:duration-100",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              )}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              {/* iOS 스타일 선택 인디케이터 */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/8 rounded-xl" />
              )}
              
              {/* 아이콘 - iOS 스타일 */}
              <IconComponent 
                className={cn(
                  "relative z-10 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "h-6 w-6" : "h-5 w-5"
                )} 
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

