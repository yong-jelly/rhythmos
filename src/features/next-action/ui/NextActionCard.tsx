import { Play } from "lucide-react";
import { Button, Card } from "@/shared/ui";
import type { Pledge } from "@/shared/types";

interface NextActionCardProps {
  pledge: Pledge;
  onCheckin: () => void;
}

export function NextActionCard({ pledge, onCheckin }: NextActionCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent shadow-[0_4px_12px_0_rgb(0_0_0_/0.08)]">
      <div className="p-7">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">{pledge.title}</h3>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">{pledge.action}</p>
          </div>
        </div>
        <Button size="xl" className="h-14 w-full rounded-full font-semibold shadow-[0_4px_12px_0_rgb(0_0_0_/0.15)]" onClick={onCheckin}>
          <Play className="mr-2 h-5 w-5" />
          체크인 시작하기
        </Button>
      </div>
    </Card>
  );
}

