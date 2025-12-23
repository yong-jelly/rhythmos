import { TrendingUp, RotateCcw, Users } from "lucide-react";
import { Card } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

interface PledgeCardProps {
  pledge: Pledge;
  onClick?: () => void;
  className?: string;
}

export function PledgeCard({ pledge, onClick, className }: PledgeCardProps) {
  const { currentRun, returnHistory, title, shareWith } = pledge;
  const progress = (currentRun.completedDays / currentRun.targetDays) * 100;
  const isShared = shareWith !== "myself";

  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_16px_-4px_rgb(0_0_0_/0.1)] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="mb-2 flex items-center gap-2">
              <h4 className="text-base font-semibold text-card-foreground">{title}</h4>
              {isShared && <Users className="h-4 w-4 text-primary" />}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {currentRun.targetDays}일 중 {currentRun.completedDays}일째
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-muted/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            이번 회차 시작: {new Date(currentRun.startDate).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
          </span>
          {returnHistory.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-chart-2/10 px-2.5 py-1">
              <RotateCcw className="h-3 w-3 text-chart-2" />
              <span className="text-xs font-semibold text-chart-2">귀환 {returnHistory.length}회</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

