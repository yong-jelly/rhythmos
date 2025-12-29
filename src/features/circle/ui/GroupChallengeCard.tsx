import React from "react";
import { Trophy, Users, Flame, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Card, Badge, Button } from "@/shared/ui";

interface GroupChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    goal: string;
    participants: {
      id: string;
      name: string;
      avatar: string;
      color: string;
    }[];
    activeCount: number;
    progress: number;
    daysLeft: number;
    stake: string;
  };
  onClick?: () => void;
}

export function GroupChallengeCard({ challenge, onClick }: GroupChallengeCardProps) {
  const { title, goal, participants, activeCount, progress, daysLeft, stake } = challenge;

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]",
        "bg-white rounded-[32px] p-6 mb-8 mx-4"
      )}
      onClick={onClick}
    >
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-chart-2/10 to-transparent rounded-bl-[100px] -z-0" />

      <div className="relative z-10">
        {/* 상단: 챌린지 헤더 */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 hover:bg-chart-2/10 border-none font-bold text-[10px] px-2 py-0">
                GROUP CHALLENGE
              </Badge>
              <div className="flex items-center gap-1 text-primary animate-pulse">
                <Flame className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold">{activeCount}명 활동 중</span>
              </div>
            </div>
            <h3 className="text-[20px] font-black tracking-tight text-slate-900 mt-1">{title}</h3>
            <p className="text-[14px] font-medium text-slate-500">{goal}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* 중간: 참여자 현황 (Facepile) & 진행률 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex -space-x-3">
            {participants.map((p, i) => (
              <div 
                key={p.id} 
                className={cn(
                  "w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[12px] font-bold text-white shadow-sm",
                  p.color
                )}
                style={{ zIndex: 10 - i }}
              >
                {p.avatar}
              </div>
            ))}
            {participants.length > 4 && (
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 z-0">
                +{participants.length - 4}
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Group Progress</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-black text-slate-900 leading-none">{progress}</span>
              <span className="text-[14px] font-bold text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-chart-2 to-chart-3 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 하단: 보상 및 남은 기간 */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Trophy className="w-4 h-4" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{stake}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[12px] font-bold">{daysLeft}일 남음</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

