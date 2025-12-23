import { Heart, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui";

interface ReturningWelcomeProps {
  returnCount: number;
  onContinue: () => void;
  onBrowse: () => void;
}

export function ReturningWelcome({ returnCount, onContinue, onBrowse }: ReturningWelcomeProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="max-w-md space-y-8 text-center animate-fade-in">
        <div className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-breathe">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground">돌아왔네요</h1>
          <p className="text-pretty text-muted-foreground leading-relaxed">
            한동안 못 봤어요. 무슨 일이 있었나요?
            <br />
            괜찮아요. 여기는 언제든 다시 시작할 수 있는 곳이에요.
          </p>
        </div>

        <div className="space-y-3">
          <Button size="xl" className="w-full rounded-full" onClick={onContinue}>
            <RotateCcw className="mr-2 h-5 w-5" />
            리듬 다시 맞추기
          </Button>
          <Button variant="ghost" size="lg" className="w-full rounded-full" onClick={onBrowse}>
            천천히 둘러보기
          </Button>
        </div>

        <p className="text-pretty text-sm text-muted-foreground">
          지금까지 <span className="font-semibold text-primary">{returnCount}번</span> 돌아왔어요. 이게 진짜 지속이에요.
        </p>
      </div>
    </div>
  );
}

