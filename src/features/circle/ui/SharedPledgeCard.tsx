import React from "react";
import { Users, RotateCcw, Heart, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Card, Badge } from "@/shared/ui";

interface SharedPledgeCardProps {
  pledge: {
    id: string;
    title: string;
    participants: {
      id: string;
      name: string;
      avatar: string;
      hasCheckedInToday: boolean;
      color: string;
    }[];
    progress: number;
    currentDay: number;
    totalDays: number;
    sharedReturns: number;
    lastActivity?: string;
  };
  onClick?: () => void;
}

export function SharedPledgeCard({ pledge, onClick }: SharedPledgeCardProps) {
  const { title, participants, progress, currentDay, totalDays, sharedReturns, lastActivity } = pledge;

  const allCheckedIn = participants.every(p => p.hasCheckedInToday);

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-2 transition-all duration-300",
        allCheckedIn 
          ? "border-primary/40 bg-gradient-to-br from-primary/10 via-white to-white shadow-md" 
          : "border-slate-100 bg-white shadow-sm hover:border-primary/20",
        "rounded-[28px] p-6 mb-4"
      )}
      onClick={onClick}
    >
      <div className="relative z-10">
        {/* 상단: 타이틀 및 공유 아이콘 */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-3 w-3 text-primary" />
              </div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Shared Rhythm</span>
            </div>
            <h4 className="text-[18px] font-black tracking-tight text-slate-900 leading-tight">
              {title}
            </h4>
          </div>
          {sharedReturns > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500">귀환 {sharedReturns}회</span>
            </div>
          )}
        </div>

        {/* 중간: 참여자 상태 (함께하는 느낌 강조) */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {participants.map((p) => (
              <div key={p.id} className="relative">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[13px] font-black text-white shadow-sm transition-transform group-hover:scale-105",
                    p.color,
                    !p.hasCheckedInToday && "grayscale-[0.5] opacity-70"
                  )}
                >
                  {p.avatar}
                </div>
                {p.hasCheckedInToday && (
                  <div className="absolute -right-1 -bottom-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] font-bold text-slate-700">
              {allCheckedIn ? "모두가 리듬을 맞췄어요!" : `${participants.filter(p => p.hasCheckedInToday).length}명이 완료했어요`}
            </p>
            {lastActivity && (
              <p className="text-[11px] font-medium text-slate-400">{lastActivity}</p>
            )}
          </div>
        </div>

        {/* 하단: 진행률 및 정보 */}
        <div className="space-y-3">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[12px] font-bold text-slate-400">
              {totalDays}일 중 {currentDay}일째 순항 중
            </span>
            <span className="text-[14px] font-black text-primary">{progress}%</span>
          </div>
          <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 인터랙션 영역 (미니멀) */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-300">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">따뜻한 응원이 도착했어요</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </Card>
  );
}

