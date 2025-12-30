import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { Card } from "@/shared/ui";
import { Sparkles, TrendingUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function JourneyPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-transparent pb-28">
      <Header 
        title="여정" 
        subtitle="당신의 성장 기록"
        onSearchClick={() => {}}
        onNotificationClick={() => {}}
      />

      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">나의 여정</h2>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-card-foreground mb-1">여정이 곧 시작됩니다</h3>
                <p className="text-sm text-muted-foreground">약속을 지키며 나만의 여정을 만들어보세요</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">통계</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-muted-foreground">연속 달성</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">0일</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-chart-2" />
                <h3 className="text-sm font-semibold text-muted-foreground">총 달성일</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">0일</p>
            </Card>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}


