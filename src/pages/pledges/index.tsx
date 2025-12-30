import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { usePledgeStore } from "@/entities/pledge";
import { PledgeCard } from "@/entities/pledge";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Plus } from "lucide-react";

export function PledgeListPage() {
  const navigate = useNavigate();
  const { pledges, fetchPledges, setIsWizardOpen } = usePledgeStore();

  useEffect(() => {
    fetchPledges();
  }, [fetchPledges]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-transparent pb-32">
      <Header 
        title="나의 약속" 
        subtitle="진행 중인 모든 리듬"
        onBackClick={() => navigate(-1)}
        onSearchClick={() => {}}
      />

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {pledges.length > 0 ? (
            pledges.map((pledge) => (
              <PledgeCard 
                key={pledge.id} 
                pledge={pledge} 
                onClick={() => {
                  // 상세 페이지가 구현되면 navigate
                  console.log("Pledge clicked:", pledge.id);
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground mb-6">아직 등록된 약속이 없어요</p>
              <button 
                onClick={() => setIsWizardOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold"
              >
                <Plus className="w-4 h-4" />
                첫 약속 만들기
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
