import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { FeedItem } from "@/widgets/feed-item";
import { PledgeStack } from "@/widgets/pledge-stack";
import { CircleActivityCard, GroupChallengeCard, SharedPledgeCard } from "@/features/circle";
import { useUserStore } from "@/entities/user";
import { usePledgeStore } from "@/entities/pledge";
import { useTodoStore } from "@/entities/todo";
import { useMemoryStore } from "@/entities/memory";
import { useRhythmStore } from "@/entities/rhythm";
import { cn } from "@/shared/lib/utils";

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "rhythm";

  const { isWizardOpen, setIsWizardOpen } = usePledgeStore();

  const { user, fetchUser } = useUserStore();
  const { pledges: originalPledges, fetchPledges, getSlippedPledges } = usePledgeStore();
  const { todos, fetchTodos } = useTodoStore();
  const { fetchMemories, getRecentMemory } = useMemoryStore();
  const { fetchStatus } = useRhythmStore();

  // 테스트를 위한 상태
  const [testMode, setTestMode] = useState<"none" | "completed" | "normal">("normal");

  const pledges = testMode === "none" 
    ? [] 
    : testMode === "completed" 
      ? originalPledges.map(p => ({
          ...p,
          currentRun: {
            ...p.currentRun,
            events: [...p.currentRun.events, { date: new Date().toISOString().split('T')[0], type: "success" as const }]
          }
        }))
      : originalPledges;

  const setActiveTab = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    fetchUser();
    fetchPledges();
    fetchTodos();
    fetchMemories();
    fetchStatus();
  }, [fetchUser, fetchPledges, fetchTodos, fetchMemories, fetchStatus]);

  const slippedPledges = getSlippedPledges();
  const recentMemory = getRecentMemory();
  const nextPledge = pledges[0];

  const tabs = [
    { id: "rhythm", label: "리듬" },
    { id: "plan", label: "계획" },
    { id: "project", label: "프로젝트" },
    { id: "notification", label: "알림" },
  ];

  // 인사말 결정
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "좋은 새벽이에요";
    if (hour < 12) return "좋은 아침이에요";
    if (hour < 18) return "활기찬 오후예요";
    return "편안한 저녁이에요";
  };

  const remainingTodos = todos.filter(t => !t.completed).length;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-transparent pb-32">
      <Header 
        onAddClick={() => setIsWizardOpen(true)}
        onNotificationClick={() => {}}
        onSearchClick={() => {}}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      <main className="flex-1 max-w-2xl mx-auto w-full pt-6">
        {/* 테스트 컨트롤 바 */}
        <div className="flex justify-end gap-2 px-4 mb-4">
          <button 
            onClick={() => setTestMode(testMode === "none" ? "normal" : "none")}
            className={cn(
              "px-3 py-1 text-[11px] font-bold rounded-full border transition-colors",
              testMode === "none" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200"
            )}
          >
            없음
          </button>
          <button 
            onClick={() => setTestMode(testMode === "completed" ? "normal" : "completed")}
            className={cn(
              "px-3 py-1 text-[11px] font-bold rounded-full border transition-colors",
              testMode === "completed" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-400 border-slate-200"
            )}
          >
            완료
          </button>
        </div>

        {/* 리듬 탭 */}
        {activeTab === "rhythm" && (
          <PledgeStack pledges={pledges} />
        )}

        {/* 계획 탭 */}
        {activeTab === "plan" && (
          <>
            <GroupChallengeCard 
              challenge={{
                id: "challenge_1",
                title: "26년 다이어트 계획",
                goal: "함께 건강하게 10kg 감량",
                participants: [
                  { id: "u1", name: "민수", avatar: "민", color: "bg-blue-500" },
                  { id: "u2", name: "지혜", avatar: "지", color: "bg-pink-500" },
                  { id: "u3", name: "현우", avatar: "현", color: "bg-indigo-500" },
                  { id: "u4", name: "수진", avatar: "수", color: "bg-emerald-500" },
                ],
                activeCount: 3,
                progress: 50,
                daysLeft: 45,
                stake: "우승자 디너 쿠폰 🎁"
              }}
              onClick={() => navigate("/circle/challenge/1")}
            />

            <SharedPledgeCard 
              pledge={{
                id: "shared_1",
                title: "저녁 8시 이후 가족 시간",
                participants: [
                  { id: "u1", name: "엄마", avatar: "엄", hasCheckedInToday: true, color: "bg-primary" },
                  { id: "u2", name: "지우", avatar: "지", hasCheckedInToday: true, color: "bg-chart-2" },
                  { id: "u3", name: "아빠", avatar: "아", hasCheckedInToday: false, color: "bg-chart-3" },
                ],
                progress: 60,
                currentDay: 8,
                totalDays: 14,
                sharedReturns: 1,
                lastActivity: "지우님이 1시간 전에 체크인했어요"
              }}
              onClick={() => navigate("/circle")}
            />
          </>
        )}

        {/* 프로젝트 탭 */}
        {activeTab === "project" && (
          <FeedItem 
            user={{
              name: "Marcus Aurelius",
              handle: "marcus_plans",
              role: "Plan Architect",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
              time: "Milestone Reached"
            }}
            content={{
              type: "plan",
              variant: "progress",
              title: "6개월 다이어트 프로젝트",
              description: "전체 여정의 40%를 지나고 있습니다. 완벽주의보다는 리듬의 유연함이 성취의 열쇠입니다.",
              data: { value: 42, title: "Weight Loss Goal", subtitle: "Phase 1: Foundation" }
            }}
            stats={{
              saves: 42
            }}
          />
        )}

        {/* 알림 탭 */}
        {activeTab === "notification" && (
          <>
            <CircleActivityCard 
              type="status"
              user={{
                name: "엄마",
                avatar: "엄",
                color: "bg-primary"
              }}
              content="엄마가 오늘 일찍 일어나서 리듬을 찾고 있어요. 응원을 보내볼까요?"
              timestamp="2시간 전"
            />

            <FeedItem 
              user={{
                name: "Repair Bot v2",
                handle: "repair_os",
                role: "Recovery Engine",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Repair",
                time: "Action Required"
              }}
              content={{
                type: "repair",
                variant: "grid",
                title: "지난 주 기록 복원",
                description: "비어있는 3일의 기록이 발견되었습니다. 서사를 완성하기 위해 당시의 상태를 정직하게 남겨보세요.",
                data: { 
                  points: [
                    true, true, false, true, true, true, false, true, true, true,
                    true, false, false, true, true, true, true, true, false, true,
                    true, true, true, true, true, false, true, true, true, true
                  ]
                }
              }}
              stats={{}}
            />

            <CircleActivityCard 
              type="message"
              user={{
                name: "지우",
                avatar: "지",
                color: "bg-chart-2"
              }}
              content="아빠 힘내세요! 우리가 있잖아요. 오늘의 리듬도 화이팅!"
              timestamp="어제"
            />
          </>
        )}
      </main>

      <BottomNavigation testPledges={pledges} />
    </div>
  );
}
