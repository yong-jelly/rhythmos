import React, { useState } from "react";
import { ChevronRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePledgeStore } from "@/entities/pledge";
import { cn } from "@/shared/lib/utils";
import { PledgeStackCard } from "./PledgeStackCard";
import { PledgeCheckIn } from "@/features/pledge-checkin";
import { PledgeDetailModal } from "@/widgets/modal/PledgeDetailModal";
import { FeedEmptyState } from "@/widgets/feed-section";
import type { Pledge } from "@/shared/types";

interface PledgeStackProps {
  pledges: Pledge[];
}

export function PledgeStack({ pledges }: PledgeStackProps) {
  const navigate = useNavigate();
  const { checkInTarget, setCheckInTarget, setIsWizardOpen } = usePledgeStore();
  const [selectedPledgeForDetail, setSelectedPledgeForDetail] = useState<Pledge | null>(null);
  const [showCompletedList, setShowCompletedList] = useState(false);

  const handleCheckIn = (type: string) => {
    console.log(`Check-in for ${checkInTarget?.title}: ${type}`);
    setCheckInTarget(null);
  };

  const today = new Date().toISOString().split('T')[0];
  
  const completedPledges = pledges.filter(pledge => 
    pledge.currentRun.events.some(
      e => e.date === today && e.type === "success"
    )
  );
  
  const incompletePledges = pledges.filter(pledge => 
    !pledge.currentRun.events.some(
      e => e.date === today && e.type === "success"
    )
  );

  const isAllCompleted = pledges.length > 0 && incompletePledges.length === 0;

  const renderPledgeCard = (pledge: Pledge) => (
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

  return (
    <div className="w-full px-4 mb-12">
      <div className="flex flex-col gap-6">
        {/* 미완료 카드 섹션 (위쪽 배치) */}
        {incompletePledges.map(renderPledgeCard)}

        {/* 완료된 카드 섹션 (아래쪽 배치) - 모두 완료 상태가 아니거나 리듬 목록 보기를 눌렀을 때만 표시 */}
        {(!isAllCompleted || showCompletedList) && completedPledges.map(renderPledgeCard)}
      </div>

      {pledges.length === 0 && (
        <FeedEmptyState 
          type="empty" 
          onAction={() => setIsWizardOpen(true)} 
          className="mt-4"
        />
      )}

      {isAllCompleted && !showCompletedList && (
        <div 
          onClick={() => setShowCompletedList(true)}
          className="cursor-pointer transition-transform active:scale-[0.99]"
        >
          <FeedEmptyState 
            type="completed" 
            onAction={(e) => {
              e?.stopPropagation();
              navigate("/daily-checkin");
            }} 
            className="mt-4"
          />
        </div>
      )}

      {showCompletedList && isAllCompleted && (
        <div className="mt-10 mb-6 flex justify-center">
          <button
            onClick={() => setShowCompletedList(false)}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-[13px] font-bold text-slate-500 transition-all active:scale-95"
          >
            목록 접기
          </button>
        </div>
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

