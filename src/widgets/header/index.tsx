import { Play, Archive, Plus } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onCheckinClick?: () => void;
  onArchiveClick?: () => void;
  onAddClick?: () => void;
}

export function Header({ title, subtitle, onCheckinClick, onArchiveClick, onAddClick }: HeaderProps) {
  const hasActions = !!(onAddClick || onCheckinClick || onArchiveClick);
  
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/5 safe-area-top">
      <div className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto w-full">
        {/* 좌측 공간 - 균형을 위한 빈 공간 */}
        <div className="flex items-center gap-2 min-w-[80px]">
          {hasActions && <div className="w-10" />}
        </div>

        {/* 중앙 제목 - Airbnb 스타일 */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 text-xs font-normal text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* 우측 액션 버튼들 - Airbnb 스타일 */}
        <div className="flex items-center gap-1 min-w-[80px] justify-end">
          {onAddClick && (
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                "hover:bg-accent/60 active:bg-accent/80",
                "transition-all duration-200 ease-out",
                "active:scale-95"
              )}
              onClick={onAddClick}
              aria-label="새 약속 만들기"
            >
              <Plus className="h-5 w-5 text-foreground" />
            </button>
          )}
          {onCheckinClick && (
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                "hover:bg-accent/60 active:bg-accent/80",
                "transition-all duration-200 ease-out",
                "active:scale-95"
              )}
              onClick={onCheckinClick}
              aria-label="체크인"
            >
              <Play className="h-5 w-5 text-foreground" />
            </button>
          )}
          {onArchiveClick && (
            <button
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                "hover:bg-accent/60 active:bg-accent/80",
                "transition-all duration-200 ease-out",
                "active:scale-95"
              )}
              onClick={onArchiveClick}
              aria-label="기록실"
            >
              <Archive className="h-5 w-5 text-foreground" />
            </button>
          )}
          {!hasActions && <div className="w-10" />}
        </div>
      </div>
    </header>
  );
}

