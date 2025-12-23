import { AlertCircle, RotateCcw } from "lucide-react";
import { Button, Card } from "@/shared/ui";
import type { Pledge } from "@/shared/types";

interface SlippedPromptProps {
  pledge: Pledge;
  onRepair: () => void;
}

export function SlippedPrompt({ pledge, onRepair }: SlippedPromptProps) {
  // 최근 skip 이벤트 찾기
  const recentSkips = pledge.currentRun.events.filter((e) => e.type === "skip");
  const skipDays = recentSkips.length;

  return (
    <Card className="overflow-hidden border-warning/40 bg-gradient-to-br from-warning/8 via-warning/5 to-transparent shadow-[0_4px_12px_0_rgb(0_0_0_/0.08)]">
      <div className="p-6">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warning/20 ring-1 ring-warning/30">
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="mb-2 text-base font-semibold text-foreground">리듬이 흔들렸어요</p>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              "{pledge.title}"를 {skipDays}일 동안 지키지 못했어요. 무슨 일이 있었나요?
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="default"
          className="w-full rounded-full border-warning/40 bg-background/60 font-semibold hover:bg-warning/5 hover:border-warning/60"
          onClick={onRepair}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          리듬 다시 맞추기
        </Button>
      </div>
    </Card>
  );
}

