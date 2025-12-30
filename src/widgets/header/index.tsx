import { Search, Bell, Plus, Play, Archive, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onCheckinClick?: () => void;
  onArchiveClick?: () => void;
  onAddClick?: () => void;
  onBackClick?: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  tabs?: { id: string; label: string }[];
}

export function Header({ 
  title, 
  subtitle, 
  showSearch = true,
  showNotifications = true,
  onSearchClick,
  onNotificationClick,
  onCheckinClick, 
  onArchiveClick, 
  onAddClick,
  onBackClick,
  activeTab,
  onTabChange,
  tabs
}: HeaderProps) {
  const hasActions = !!(onAddClick || onCheckinClick || onArchiveClick || onSearchClick || onNotificationClick);
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl safe-area-top border-b border-border/40">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-start justify-between px-4 pt-8 pb-4">
          {/* 좌측 제목 - 과감한 타이포그래피 적용 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {onBackClick && (
                <button
                  onClick={onBackClick}
                  className="p-1 -ml-2 hover:bg-accent rounded-full transition-colors"
                  aria-label="뒤로 가기"
                >
                  <ArrowLeft className="h-8 w-8 text-foreground stroke-[2.5]" />
                </button>
              )}
              <h1 className="text-4xl font-black tracking-tight flex items-baseline gap-2">
                <span className="text-foreground">
                  {title ? title : "Rhythmos"}
                </span>
                {!title && (
                  <span className="text-muted-foreground/30 font-bold text-3xl">Today</span>
                )}
              </h1>
            </div>
            {subtitle && (
              <p className="text-sm font-semibold text-muted-foreground/60 tracking-tight ml-1">{subtitle}</p>
            )}
          </div>

          {/* 우측 액션 버튼들 - 이미지 스타일 반영 (Search, Bell) */}
          <div className="flex items-center gap-4 mt-1">
            {showNotifications && (
              <button
                className={cn(
                  "flex items-center justify-center p-1 rounded-full",
                  "hover:bg-accent/60 active:bg-accent/80 transition-all",
                  "active:scale-95"
                )}
                onClick={onNotificationClick}
                aria-label="알림"
              >
                <Bell className="h-7 w-7 text-foreground stroke-[2]" />
              </button>
            )}
            {showSearch && (
              <button
                className={cn(
                  "flex items-center justify-center p-1 rounded-full",
                  "hover:bg-accent/60 active:bg-accent/80 transition-all",
                  "active:scale-95"
                )}
                onClick={onSearchClick}
                aria-label="검색"
              >
                <Search className="h-7 w-7 text-foreground stroke-[2]" />
              </button>
            )}
          </div>
        </div>

        {/* 필터 탭 - 세그먼트 스타일로 변경하여 시인성 및 버그 수정 */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-2 px-4 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[14px] font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-foreground text-background shadow-sm" 
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

