import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, X, Clock, Settings, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Move } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

interface PledgeCheckInProps {
  pledge: Pledge;
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: (type: "success" | "skip" | "unknown" | "settings") => void;
}

export function PledgeCheckIn({ pledge, isOpen, onClose, onCheckIn }: PledgeCheckInProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 배경색 변환 (더 부드럽고 눈이 편안한 파스텔톤/저채도 컬러로 변경)
  const backgroundColor = useTransform(
    [x, y],
    ([latestX, latestY]: [number, number]) => {
      const distance = Math.max(Math.abs(latestX), Math.abs(latestY));
      if (distance < 20) return "oklch(0.12 0 0)"; // 기본 어두운 배경

      if (Math.abs(latestX) > Math.abs(latestY)) {
        if (latestX < -50) return "oklch(0.35 0.06 150)"; // Success (Muted Green)
        if (latestX > 50) return "oklch(0.35 0.06 25)";   // Failure (Muted Red)
      } else {
        if (latestY > 50) return "oklch(0.35 0.02 0)";    // Later (Muted Gray)
        if (latestY < -50) return "oklch(0.35 0.06 260)"; // Adjust (Muted Purple)
      }
      return "oklch(0.12 0 0)";
    }
  );

  const opacity = useTransform(backgroundColor, (color) => (color === "oklch(0.12 0 0)" ? 0.9 : 1));

  // 각 방향별 인디케이터의 투명도 및 위치 변환
  const successOpacity = useTransform(x, [-150, -50], [1, 0]);
  const failureOpacity = useTransform(x, [50, 150], [0, 1]);
  const adjustOpacity = useTransform(y, [-150, -50], [1, 0]);
  const laterOpacity = useTransform(y, [50, 150], [0, 1]);

  // 카드 위로 떠오르는 효과를 위한 위치 변환
  const successX = useTransform(x, [-150, 0], [0, -20]);
  const failureX = useTransform(x, [0, 150], [20, 0]);
  const adjustY = useTransform(y, [-150, 0], [0, -20]);
  const laterY = useTransform(y, [0, 150], [20, 0]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      if (info.offset.x < -threshold) onCheckIn("success");
      else if (info.offset.x > threshold) onCheckIn("skip");
    } else {
      if (info.offset.y > threshold) onCheckIn("unknown");
      else if (info.offset.y < -threshold) onCheckIn("settings");
    }
    // 위치 초기화는 AnimatePresence가 처리하거나 상태로 관리
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* 동적 배경 */}
          <motion.div 
            style={{ backgroundColor, opacity }}
            className="absolute inset-0 transition-colors duration-300" 
          />

          {/* 드래그 가능한 카드 */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            style={{ x, y }}
            className="relative z-10 w-[85%] max-w-sm aspect-[3/4] bg-white rounded-[48px] shadow-2xl p-10 flex flex-col justify-between items-center text-center touch-none cursor-grab active:cursor-grabbing"
          >
            <div className="w-full">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[11px] font-black uppercase tracking-widest mb-8">
                {pledge.frequency}
              </span>
              <h2 className="text-[32px] font-black leading-tight tracking-tight mb-4 text-foreground">
                {pledge.title}
              </h2>
              <p className="text-[17px] text-muted-foreground font-medium leading-relaxed">
                {pledge.meaning}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
                <Move className="text-muted-foreground w-6 h-6" />
              </div>
              <p className="text-[13px] font-bold text-muted-foreground/60">
                카드를 좌우로 스와이프하여 체크인을 기록하세요.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </motion.div>

          {/* 액션 인디케이터 (카드 위로 오버랩되는 레이어) */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex items-center justify-center">
            {/* Success - Left Swipe */}
            <motion.div 
              style={{ opacity: successOpacity, x: successX, translateX: "-50%", translateY: "-50%" }}
              className="absolute left-1/4 top-1/2 flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
                <Check className="text-white w-12 h-12 stroke-[3]" />
              </div>
              <span className="px-6 py-2 rounded-full bg-emerald-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
                SUCCESS
              </span>
            </motion.div>

            {/* Failure - Right Swipe */}
            <motion.div 
              style={{ opacity: failureOpacity, x: failureX, translateX: "50%", translateY: "-50%" }}
              className="absolute right-1/4 top-1/2 flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full bg-rose-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
                <X className="text-white w-12 h-12 stroke-[3]" />
              </div>
              <span className="px-6 py-2 rounded-full bg-rose-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
                FAILURE
              </span>
            </motion.div>

            {/* Adjust - Up Swipe */}
            <motion.div 
              style={{ opacity: adjustOpacity, y: adjustY, translateX: "-50%", translateY: "-50%" }}
              className="absolute left-1/2 top-1/4 flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full bg-violet-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
                <Settings className="text-white w-12 h-12 stroke-[2]" />
              </div>
              <span className="px-6 py-2 rounded-full bg-violet-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
                ADJUST
              </span>
            </motion.div>

            {/* Later - Down Swipe */}
            <motion.div 
              style={{ opacity: laterOpacity, y: laterY, translateX: "-50%", translateY: "50%" }}
              className="absolute left-1/2 bottom-1/4 flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 rounded-full bg-slate-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
                <Clock className="text-white w-12 h-12 stroke-[2]" />
              </div>
              <span className="px-6 py-2 rounded-full bg-slate-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
                LATER
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

