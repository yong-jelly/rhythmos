import { Card } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { RhythmStatus } from "@/shared/types";

interface RhythmStatusCardProps {
  status: RhythmStatus;
  className?: string;
}

const stateColors = {
  flowing: "bg-primary",
  unstable: "bg-warning",
  finding: "bg-chart-2",
};

const stateMessages = {
  flowing: "당신만의 속도를 찾아가고 있어요. 미끄러진 날도 다시 리듬을 맞췄다는 것이 중요합니다.",
  unstable: "리듬이 조금 흔들리고 있어요. 괜찮아요, 다시 맞추면 됩니다.",
  finding: "리듬을 찾는 중이에요. 조급해하지 않아도 돼요.",
};

export function RhythmStatusCard({ status, className }: RhythmStatusCardProps) {
  return (
    <Card className={cn("border-border/50 bg-card p-6", className)}>
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <div className={cn("h-3.5 w-3.5 rounded-full animate-pulse-soft", stateColors[status.state])} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="mb-1.5 text-base font-semibold text-card-foreground">{status.message}</p>
          <p className="text-sm font-medium text-muted-foreground">이번 주 {status.weeklyCompletedCount}번의 약속을 지켰어요</p>
        </div>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{stateMessages[status.state]}</p>
    </Card>
  );
}

