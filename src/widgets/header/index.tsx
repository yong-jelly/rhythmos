import { Play, Archive } from "lucide-react";
import { Button } from "@/shared/ui";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onCheckinClick?: () => void;
  onArchiveClick?: () => void;
}

export function Header({ title, subtitle, onCheckinClick, onArchiveClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border/30 bg-background/95 backdrop-blur-md safe-area-top shadow-[0_1px_2px_0_rgb(0_0_0_/0.03)]">
      <div className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {onCheckinClick && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent/50 transition-all duration-200"
              onClick={onCheckinClick}
            >
              <Play className="h-5 w-5" />
            </Button>
          )}
          {onArchiveClick && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent/50 transition-all duration-200"
              onClick={onArchiveClick}
            >
              <Archive className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

