import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PledgeStackCard } from "./PledgeStackCard";
import { PledgeCheckIn } from "@/features/pledge-checkin";
import type { Pledge } from "@/shared/types";

interface PledgeStackProps {
  pledges: Pledge[];
}

export function PledgeStack({ pledges }: PledgeStackProps) {
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);

  const handleCheckIn = (type: string) => {
    console.log(`Check-in for ${selectedPledge?.title}: ${type}`);
    setSelectedPledge(null);
  };

  return (
    <div className="w-full px-4 mb-12">
      <div className="mb-5 flex items-end justify-between px-2">
        <h2 className="text-[20px] font-black tracking-tight text-slate-900">오늘의 리듬</h2>
        <span className="text-[12px] font-bold text-slate-400">
          {pledges.length} total
        </span>
      </div>

      <div className="relative h-[260px] w-full">
        <AnimatePresence mode="popLayout">
          {pledges.slice(0, 3).map((pledge, index) => (
            <motion.div
              key={pledge.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ 
                opacity: 1 - index * 0.25, // 뒤에 있는 카드는 좀더 연하게
                y: index * 16, 
                scale: 1 - index * 0.04,
                zIndex: pledges.length - index 
              }}
              exit={{ 
                opacity: 0, 
                x: -100, 
                scale: 0.9,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 35,
                delay: index * 0.1
              }}
              className="absolute inset-0 cursor-pointer origin-top"
              onClick={() => setSelectedPledge(pledge)}
            >
              <div className="h-full transform transition-transform active:scale-[0.98]">
                <PledgeStackCard pledge={pledge} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {pledges.length === 0 && (
          <div className="flex items-center justify-center h-full border-2 border-dashed border-border rounded-[32px] text-muted-foreground text-[14px] font-bold">
            모든 약속을 완료했습니다!
          </div>
        )}
      </div>

      {selectedPledge && (
        <PledgeCheckIn 
          pledge={selectedPledge}
          isOpen={!!selectedPledge}
          onClose={() => setSelectedPledge(null)}
          onCheckIn={handleCheckIn}
        />
      )}
    </div>
  );
}

