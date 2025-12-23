import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { ReturningWelcome } from "@/features/returning-welcome";
import { SlippedPrompt } from "@/features/slipped-prompt";
import { NextActionCard } from "@/features/next-action";
import { PledgeCard, usePledgeStore } from "@/entities/pledge";
import { MemoryCard, useMemoryStore } from "@/entities/memory";
import { RhythmStatusCard, useRhythmStore } from "@/entities/rhythm";
import { useUserStore } from "@/entities/user";

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

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header
        title="리듬"
        subtitle="오늘도 당신의 속도로"
        onCheckinClick={() => navigate("/checkin")}
      />

      <main className="flex-1 px-5 py-8 max-w-4xl mx-auto w-full">
        {/* 미끄러진 약속 알림 */}
        {slippedPledges.length > 0 && (
          <div className="mb-8">
            <SlippedPrompt pledge={slippedPledges[0]} onRepair={() => navigate("/repair")} />
          </div>
        )}

        {/* 오늘의 다음 행동 */}
        {nextPledge && (
          <div className="mb-10">
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">오늘의 다음 행동</h2>
            <NextActionCard pledge={nextPledge} onCheckin={() => navigate("/checkin")} />
          </div>
        )}

        {/* 진행 중인 약속 */}
        {pledges.length > 0 && (
          <div className="mb-10">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">진행 중인 약속</h3>
              <span className="text-sm font-medium text-muted-foreground">{pledges.length}개</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
              {pledges.map((pledge) => (
                <PledgeCard key={pledge.id} pledge={pledge} onClick={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* 리듬 상태 */}
        {status && (
          <div className="mb-10">
            <h3 className="mb-5 text-lg font-semibold tracking-tight text-foreground">리듬 상태</h3>
            <RhythmStatusCard status={status} />
          </div>
        )}

        {/* 이번 주 기억 */}
        {recentMemory && (
          <div className="mb-10">
            <h3 className="mb-5 text-lg font-semibold tracking-tight text-foreground">이번 주 기억</h3>
            <MemoryCard memory={recentMemory} />
          </div>
        )}
      </main>

      <BottomNavigation onAddClick={() => navigate("/pledge/new")} />
    </div>
  );
}

