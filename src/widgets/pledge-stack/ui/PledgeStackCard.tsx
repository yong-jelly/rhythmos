import React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

interface PledgeStackCardProps {
  pledge: Pledge;
  className?: string;
}

export function PledgeStackCard({ pledge, className }: PledgeStackCardProps) {
  const { title, action, currentRun, id } = pledge;
  
  const successDays = currentRun.completedDays;
  const targetDays = currentRun.targetDays;

  // 날짜 포맷팅 유틸리티
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  const startDateStr = formatDate(currentRun.startDate);
  
  // 종료일 계산 (targetDays 기준)
  const getTargetDateStr = () => {
    const start = new Date(currentRun.startDate);
    const target = new Date(start);
    target.setDate(start.getDate() + targetDays);
    return target.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  };

  const targetDateStr = currentRun.endDate ? formatDate(currentRun.endDate) : getTargetDateStr();

  // 오늘 완료 여부 확인
  const isCompletedToday = currentRun.events.some(
    e => e.date === new Date().toISOString().split('T')[0] && e.type === "success"
  );

  // 10개의 막대 데이터 생성
  const segments = Array.from({ length: 30 }).map((_, i) => {
    const progressThreshold = (i + 1) / 30;
    const currentProgress = successDays / targetDays;
    
    // 이 세그먼트가 현재 진행도를 넘어섰는지 확인 (미래)
    const isFuture = (i / 10) >= (currentRun.events.length / targetDays);
    
    // 단순화를 위해: 
    // 1. 현재까지의 이벤트 중 해당 구간의 상태 확인
    // 2. 데이터가 없으면 미래(연한 회색)
    // 3. 데이터가 있으면 성공(파란색) 또는 실패(검은색)
    
    const eventIndex = Math.floor((i / 10) * currentRun.events.length);
    const event = currentRun.events[eventIndex];
    
    if (!event || isFuture) return "bg-slate-100"; // 미래 또는 데이터 없음
    return event.type === "success" ? "bg-blue-500" : "bg-slate-900"; // 성공 또는 실패
  });

  return (
    <div 
      className={cn(
        "relative w-full h-[180px] rounded-[28px] flex overflow-hidden",
        "bg-white border transition-all duration-300",
        isCompletedToday 
          ? "border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-60 grayscale-[0.5]" 
          : "border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
        className
      )}
    >
      {/* 완료 도장 효과 */}
      {isCompletedToday && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-emerald-500/30 bg-emerald-500/5 rotate-[-15deg] scale-110">
            <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-emerald-500/40">
              <Check className="w-12 h-12 text-emerald-500/60 stroke-[3]" />
            </div>
          </div>
        </div>
      )}

      {/* 메인 영역 (좌측) */}
      <div className="flex-[2.5] p-6 pb-5 flex flex-col justify-between relative">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">오늘의 리듬 티켓</span>
            <h3 className="text-[20px] font-black tracking-tighter text-slate-900">{title}</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.1em] mb-0.5 block">시작일</span>
              <p className="text-[13px] font-black text-slate-900 leading-tight">{startDateStr}</p>
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-10 h-[1px] bg-slate-300 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1">
                  <ArrowUpRight className="w-2.5 h-2.5 rotate-45 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="flex-1 text-right">
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.1em] mb-0.5 block">목표일</span>
              <p className="text-[13px] font-black text-slate-900 leading-tight">{targetDateStr}</p>
            </div>
          </div>
        </div>

        {/* 하단 차트 (10개 세그먼트) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-end">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">여정 진행률</span>
            <span className="text-[9px] font-black text-blue-500">{Math.round((successDays/targetDays)*100)}%</span>
          </div>
          <div className="flex gap-1 h-1.5 w-full">
            {segments.map((color, i) => (
              <div key={i} className={cn("flex-1 rounded-full transition-colors duration-500", color)} />
            ))}
          </div>
        </div>

        {/* 절취선 홈 (상/하) */}
        <div className="absolute -right-[10px] -top-[10px] w-5 h-5 bg-background rounded-full border border-slate-100 shadow-inner z-10" />
        <div className="absolute -right-[10px] -bottom-[10px] w-5 h-5 bg-background rounded-full border border-slate-100 shadow-inner z-10" />
      </div>

      {/* 절취선 (Dashed Line) */}
      <div className="w-[1px] h-full border-r border-dashed border-slate-300 relative z-0" />

      {/* 스텁 영역 (우측) */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-100/50 relative">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Success</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[28px] font-black text-slate-900 leading-none">{successDays}</span>
            <span className="text-[12px] font-bold text-slate-500">/{targetDays}</span>
          </div>
          <span className="text-[9px] font-black text-slate-500 uppercase mt-0.5">Day</span>
        </div>
        
        {/* 미니멀 바코드 (세로형) */}
        {/* <div className="absolute bottom-6 flex gap-[2px] opacity-[0.1]">
          {[1, 2, 1, 3, 2, 1].map((h, i) => (
            <div key={i} className="w-[1px] bg-slate-900" style={{ height: `${h * 4 + 4}px` }} />
          ))}
        </div> */}
      </div>
    </div>
  );
}

