import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, X, Clock, Settings, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
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

  // 배경색 변환 (X축: 왼쪽 초록, 오른쪽 빨강 / Y축: 아래 회색, 위 보라)
  const backgroundColor = useTransform(
    [x, y],
    ([latestX, latestY]: [number, number]) => {
      if (Math.abs(latestX) > Math.abs(latestY)) {
        if (latestX < -50) return "oklch(0.62 0.18 150)"; // Success (Green)
        if (latestX > 50) return "oklch(0.58 0.18 25)"; // Failure (Red)
      } else {
        if (latestY > 50) return "oklch(0.94 0 0)"; // Pending (Gray)
        if (latestY < -50) return "oklch(0.7 0.15 240)"; // Settings (Purple)
      }
      return "oklch(0.12 0 0)"; // Default dark
    }
  );

  const opacity = useTransform(backgroundColor, (color) => (color === "oklch(0.12 0 0)" ? 0.9 : 1));

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

          {/* 제스처 안내 가이드 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <Check className="text-white" />
              </div>
              <span className="text-[12px] font-black text-white uppercase tracking-widest">Success</span>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <X className="text-white" />
              </div>
              <span className="text-[12px] font-black text-white uppercase tracking-widest">Failure</span>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <Clock className="text-white" />
              </div>
              <span className="text-[12px] font-black text-white uppercase tracking-widest">Later</span>
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <Settings className="text-white" />
              </div>
              <span className="text-[12px] font-black text-white uppercase tracking-widest">Adjust</span>
            </div>
          </div>

          {/* 드래그 가능한 카드 */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            style={{ x, y }}
            className="relative w-[85%] max-w-sm aspect-[3/4] bg-white rounded-[48px] shadow-2xl p-10 flex flex-col justify-between items-center text-center touch-none cursor-grab active:cursor-grabbing"
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
              <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center animate-bounce">
                <ArrowDown className="text-muted-foreground w-6 h-6" />
              </div>
              <p className="text-[13px] font-bold text-muted-foreground/60">
                Swipe in any direction to record
              </p>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-6 h-6 text-muted-foreground" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

