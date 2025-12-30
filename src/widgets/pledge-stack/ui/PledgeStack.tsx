import React, { useState } from "react";
import { ChevronRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePledgeStore } from "@/entities/pledge";
import { cn } from "@/shared/lib/utils";
import { PledgeStackCard } from "./PledgeStackCard";
import { PledgeCheckIn } from "@/features/pledge-checkin";
import { PledgeDetailModal } from "@/widgets/modal/PledgeDetailModal";
import type { Pledge } from "@/shared/types";

interface PledgeStackProps {
  pledges: Pledge[];
}

export function PledgeStack({ pledges }: PledgeStackProps) {
  const navigate = useNavigate();
  const { checkInTarget, setCheckInTarget } = usePledgeStore();
  const [selectedPledgeForDetail, setSelectedPledgeForDetail] = useState<Pledge | null>(null);

  const handleCheckIn = (type: string) => {
    console.log(`Check-in for ${checkInTarget?.title}: ${type}`);
    setCheckInTarget(null);
  };

  return (
    <div className="w-full px-4 mb-12">
      <div className="flex flex-col gap-6">
        {pledges.map((pledge) => {
          return (
            <div key={pledge.id} className="relative group">
              <div 
                className="relative cursor-pointer transition-transform active:scale-[0.98]"
                onClick={() => setSelectedPledgeForDetail(pledge)}
              >
                {/* 메인 카드 */}
                <div className="relative z-0 h-full">
                  <PledgeStackCard pledge={pledge} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pledges.length === 0 && (
        <div className="flex items-center justify-center h-[180px] border-2 border-dashed border-border rounded-[28px] text-muted-foreground text-[14px] font-bold">
          모든 약속을 완료했습니다!
        </div>
      )}

      {pledges.length > 0 && (
        <button
          onClick={() => navigate("/pledges")}
          className="w-full mt-10 flex items-center justify-center gap-2 py-5 px-6 bg-slate-50 hover:bg-slate-100 rounded-[24px] text-[14px] font-bold text-slate-400 transition-all active:scale-[0.98] border border-slate-100/50"
        >
          <Settings className="w-4 h-4" />
          리듬 관리하기
          <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
        </button>
      )}

      {checkInTarget && (
        <PledgeCheckIn 
          pledge={checkInTarget}
          isOpen={!!checkInTarget}
          onClose={() => setCheckInTarget(null)}
          onCheckIn={handleCheckIn}
        />
      )}

      <PledgeDetailModal 
        pledge={selectedPledgeForDetail}
        isOpen={!!selectedPledgeForDetail}
        onClose={() => setSelectedPledgeForDetail(null)}
      />
    </div>
  );
}

