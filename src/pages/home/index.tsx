import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { ReturningWelcome } from "@/features/returning-welcome";
import { SlippedPrompt } from "@/features/slipped-prompt";
import { Card } from "@/shared/ui";
import { PledgeCard, usePledgeStore } from "@/entities/pledge";
import { MemoryCard, useMemoryStore } from "@/entities/memory";
import { RhythmStatusCard, useRhythmStore } from "@/entities/rhythm";
import { useUserStore } from "@/entities/user";
import { Play, TrendingUp, Heart, Archive, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

export function HomePage() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  const { user, fetchUser } = useUserStore();
  const { pledges, fetchPledges, getSlippedPledges } = usePledgeStore();
  const { memories, fetchMemories, getRecentMemory } = useMemoryStore();
  const { status, fetchStatus } = useRhythmStore();

  useEffect(() => {
    fetchUser();
    fetchPledges();
    fetchMemories();
    fetchStatus();
  }, [fetchUser, fetchPledges, fetchMemories, fetchStatus]);

  useEffect(() => {
    if (user?.state === "returning") {
      setShowWelcome(true);
    }
  }, [user]);

  const slippedPledges = getSlippedPledges();
  const recentMemory = getRecentMemory();
  const nextPledge = pledges[0];

  // 복귀자 환영 화면
  if (showWelcome && user?.state === "returning") {
    return (
      <ReturningWelcome
        returnCount={user.returnCount}
        onContinue={() => {
          setShowWelcome(false);
          navigate("/repair");
        }}
        onBrowse={() => setShowWelcome(false)}
      />
    );
  }

  // iOS 단축어 앱 스타일의 그리드 아이템 컴포넌트
  const GridItem = ({
    icon: Icon,
    title,
    subtitle,
    color = "primary",
    onClick,
    className,
  }: {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    color?: "primary" | "chart-2" | "chart-3" | "warning";
    onClick?: () => void;
    className?: string;
  }) => {
    const colorClasses = {
      primary: "bg-primary/10 text-primary",
      "chart-2": "bg-chart-2/10 text-chart-2",
      "chart-3": "bg-chart-3/10 text-chart-3",
      warning: "bg-warning/10 text-warning",
    };

    return (
      <Card
        className={cn(
          "group cursor-pointer overflow-hidden border-border/40 bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98]",
          className
        )}
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className={cn("mb-4 flex h-16 w-16 items-center justify-center rounded-2xl", colorClasses[color])}>
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </Card>
    );
  };

  // 큰 액션 카드 (오늘의 다음 행동)
  const ActionCard = ({ pledge }: { pledge: Pledge }) => {
    return (
      <Card
        className="group cursor-pointer overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent transition-all duration-200 hover:border-primary/60 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] active:scale-[0.98]"
        onClick={() => navigate("/checkin")}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20">
              <Play className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="mb-1 text-lg font-semibold text-foreground">{pledge.title}</h3>
              <p className="text-sm text-muted-foreground">{pledge.action}</p>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header
        title="리듬"
        subtitle="오늘도 당신의 속도로"
        onCheckinClick={() => navigate("/checkin")}
        onAddClick={() => navigate("/pledge/new")}
      />

      <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
        {/* 미끄러진 약속 알림 - 상단 배너 */}
        {slippedPledges.length > 0 && (
          <div className="mb-4">
            <SlippedPrompt pledge={slippedPledges[0]} onRepair={() => navigate("/repair")} />
          </div>
        )}

        {/* 오늘의 다음 행동 - 큰 액션 카드 */}
        {nextPledge && (
          <div className="mb-6">
            <ActionCard pledge={nextPledge} />
          </div>
        )}

        {/* 그리드 레이아웃 - iOS 단축어 앱 스타일 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 진행 중인 약속 */}
          <GridItem
            icon={TrendingUp}
            title="진행 중인 약속"
            subtitle={pledges.length > 0 ? `${pledges.length}개` : "없음"}
            color="primary"
            onClick={() => {
              // 약속 목록으로 스크롤하거나 상세 페이지로 이동
              if (pledges.length > 0) {
                document.getElementById("pledges-section")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />

          {/* 리듬 상태 */}
          {status && (
            <GridItem
              icon={Heart}
              title="리듬 상태"
              subtitle={status.message}
              color="chart-2"
              onClick={() => {
                document.getElementById("rhythm-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}

          {/* 이번 주 기억 */}
          {recentMemory && (
            <GridItem
              icon={Heart}
              title="이번 주 기억"
              subtitle={new Date(recentMemory.date).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })}
              color="chart-3"
              onClick={() => {
                document.getElementById("memory-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          )}

          {/* 새 약속 만들기 */}
          <GridItem
            icon={Plus}
            title="새 약속"
            subtitle="약속 추가하기"
            color="primary"
            onClick={() => navigate("/pledge/new")}
          />

          {/* 아카이브 */}
          <GridItem
            icon={Archive}
            title="아카이브"
            subtitle="완료된 약속"
            color="chart-2"
            onClick={() => navigate("/archives")}
          />

          {/* 리듬 다시 맞추기 (미끄러진 약속이 있을 때만 표시) */}
          {slippedPledges.length > 0 && (
            <GridItem
              icon={RotateCcw}
              title="리듬 맞추기"
              subtitle="다시 시작하기"
              color="warning"
              onClick={() => navigate("/repair")}
            />
          )}
        </div>

        {/* 상세 섹션들 (스크롤 가능) */}
        <div className="mt-6 space-y-6">
          {/* 진행 중인 약속 상세 */}
          {pledges.length > 0 && (
            <div id="pledges-section" className="space-y-3">
              <h3 className="text-base font-semibold text-foreground">진행 중인 약속</h3>
              {pledges.map((pledge) => (
                <PledgeCard key={pledge.id} pledge={pledge} onClick={() => {}} />
              ))}
            </div>
          )}

          {/* 리듬 상태 상세 */}
          {status && (
            <div id="rhythm-section">
              <h3 className="mb-3 text-base font-semibold text-foreground">리듬 상태</h3>
              <RhythmStatusCard status={status} />
            </div>
          )}

          {/* 이번 주 기억 상세 */}
          {recentMemory && (
            <div id="memory-section">
              <h3 className="mb-3 text-base font-semibold text-foreground">이번 주 기억</h3>
              <MemoryCard memory={recentMemory} />
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

