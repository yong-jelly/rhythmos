import { Card } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { Memory } from "@/shared/types";

interface MemoryCardProps {
  memory: Memory;
  className?: string;
}

export function MemoryCard({ memory, className }: MemoryCardProps) {
  const formattedDate = new Date(memory.date).toLocaleDateString("ko-KR", {
    month: "numeric",
    day: "numeric",
  });

  return (
    <Card className={cn("border-border/50 bg-card p-6", className)}>
      <p className="mb-4 text-pretty text-base italic leading-relaxed text-muted-foreground">"{memory.content}"</p>
      <p className="text-xs font-medium text-muted-foreground/70">{formattedDate}</p>
    </Card>
  );
}

