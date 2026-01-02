import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

interface PledgeDeepDetailModalProps {
  pledge: Pledge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PledgeDeepDetailModal({ pledge: externalPledge, isOpen, onClose }: PledgeDeepDetailModalProps) {
  const [showFullMeaning, setShowFullMeaning] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [showRepairDetails, setShowRepairDetails] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fallback mock data if externalPledge is not provided or incomplete
  const pledge = externalPledge || {
    title: "아침 7시에 일어나기",
    meaning: "하루를 내 의지로 시작하고 싶어요. 아침에 여유 있게 커피를 마시며 하루를 계획하는 시간이 필요해요.",
    identityStatement: "아침을 주도하는 사람",
    action: "알람이 울리면 일어나서 창문을 열고 물 한 잔 마시기",
    frequency: "daily",
    currentRun: {
      startDate: "2024-12-18",
      targetDays: 14,
      completedDays: 5,
      events: []
    }
  };

  const fullMeaning = "하루를 내 의지로 시작하고 싶어요. 아침에 여유 있게 커피를 마시며 하루를 계획하는 시간이 필요해요. 최근 몇 달간 늦게 일어나면서 하루 종일 쫓기는 느낌이었어요. 아침의 고요함 속에서 나 자신과 만나는 시간을 되찾고 싶습니다.";

  const stats = [
    { label: "완료", value: externalPledge?.currentRun.completedDays || 5, unit: "회", color: "text-blue-600" },
    { label: "미끄러짐", value: 2, unit: "회", color: "text-amber-500" },
    { label: "회복", value: 2, unit: "회", color: "text-emerald-500" },
    { label: "현재 연속", value: 3, unit: "일", color: "text-indigo-600" },
  ];

  const timeline = [
    { date: "12/23", day: 6, type: "completed", note: "다시 일어났다. 아침이 주는 평화를 기억했다." },
    { date: "12/22", day: 5, type: "repair", note: "규칙 조정: 전날 밤 11시 이전에 잠들기로 함께 약속" },
    { date: "12/21", day: 4, type: "slipped", note: "늦게까지 일을 했더니 알람을 듣지 못했다." },
    { date: "12/20", day: 3, type: "completed", note: "어제보다 쉽게 일어날 수 있었다." },
    { date: "12/19", day: 2, type: "completed", note: "창밖에 눈이 내렸다. 물 한 잔을 마시며 조용한 아침을 느꼈다." },
    { date: "12/18", day: 1, type: "start", note: "새로운 리듬 시작" },
  ];

  const repairs = [
    {
      date: "12/22",
      reason: "늦게까지 일을 했더니 알람을 듣지 못했다",
      adjustment: "전날 밤 11시 이전에 잠들기로 함께 약속",
      feeling: "조금 좌절했지만, 괜찮다고 생각했다",
      pattern: "업무 마감일이 있으면 늦게까지 일하는 패턴",
    },
    {
      date: "12/16",
      reason: "친구들과 늦게까지 있었다",
      adjustment: "약속 다음날은 조금 늦게 일어나도 괜찮다는 예외 규칙 추가",
      feeling: "특별한 날도 있어야 한다고 받아들임",
      pattern: "사회적 약속과 충돌",
    },
  ];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-white">
      <motion.div 
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full h-full flex flex-col bg-[#F8F9FB]"
      >
        {/* 상단 네비게이션 */}
        <header className="shrink-0 safe-area-top z-10 bg-white border-b border-slate-100">
          <div className="px-4 py-4 flex items-center">
            <button 
              onClick={onClose} 
              className="p-2 -ml-2 rounded-full transition-colors active:bg-slate-100"
            >
              <ChevronLeft className="h-6 w-6 text-slate-900" />
            </button>
            <div className="flex-1 text-center pr-8">
              <h1 className="text-[17px] font-bold text-slate-900">리듬 분석</h1>
            </div>
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-6 pb-20 px-6">
          <div className="max-w-md mx-auto space-y-8">
            
            {/* 제목 섹션 */}
            <div className="space-y-1">
              <h2 className="text-[28px] font-black text-slate-900 tracking-tight leading-tight">
                {pledge.title}
              </h2>
              <p className="text-[15px] font-medium text-slate-400">
                {pledge.identityStatement}
              </p>
            </div>

            {/* 통계 그리드 (Tile Pattern) */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100/50">
                  <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className={cn("text-[24px] font-black", stat.color)}>{stat.value}</span>
                    <span className="text-[14px] font-bold text-slate-400">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 약속의 의미 (Minimalist Card) */}
            <div className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Why it matters</span>
              </div>
              <p className="text-[15px] font-medium text-slate-600 leading-relaxed">
                {showFullMeaning ? fullMeaning : pledge.meaning}
              </p>
              <button 
                onClick={() => setShowFullMeaning(!showFullMeaning)}
                className="text-[13px] font-bold text-blue-500 flex items-center gap-1"
              >
                {showFullMeaning ? (
                  <>접기 <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>전체 보기 <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>

            {/* 구체적인 행동 (Minimalist Card) */}
            <div className="bg-slate-900 p-6 rounded-[28px] shadow-lg space-y-3">
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Concrete Action</span>
              <p className="text-[16px] font-bold text-white leading-snug">
                {pledge.action}
              </p>
            </div>

            {/* 회복 기록 (Reflection Section) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Recovery Log</span>
                <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{repairs.length}회 회복됨</span>
              </div>
              
              <div className="space-y-3">
                {repairs.slice(0, showRepairDetails ? repairs.length : 1).map((repair, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-bold text-slate-900">{repair.date}</span>
                      <span className="text-[11px] font-medium text-slate-400">규칙 조정됨</span>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">Reason</div>
                        <p className="text-[14px] font-medium text-slate-700">{repair.reason}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase">Adjustment</div>
                        <p className="text-[14px] font-bold text-blue-600">{repair.adjustment}</p>
                      </div>
                      
                      {showRepairDetails && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-3 border-t border-slate-50 space-y-3"
                        >
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-slate-400 uppercase">Feeling</div>
                            <p className="text-[14px] font-medium text-slate-600 italic">"{repair.feeling}"</p>
                          </div>
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold text-slate-400 uppercase">Pattern</div>
                            <p className="text-[14px] font-medium text-slate-600">{repair.pattern}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {repairs.length > 1 && (
                <button 
                  onClick={() => setShowRepairDetails(!showRepairDetails)}
                  className="w-full py-3 text-[13px] font-bold text-slate-400 bg-slate-100/50 rounded-2xl transition-colors active:bg-slate-100"
                >
                  {showRepairDetails ? "기록 접기" : `모든 회복 기록 보기 (${repairs.length - 1}개 더)`}
                </button>
              )}
            </div>

            {/* 여정 타임라인 */}
            <div className="space-y-5">
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">Journey Timeline</span>
              
              <div className="relative space-y-6 pl-4">
                {/* 세로선 */}
                <div className="absolute left-[21px] top-2 bottom-2 w-[1px] bg-slate-100" />
                
                {timeline.slice(0, showFullHistory ? timeline.length : 3).map((event, idx) => (
                  <div key={idx} className="relative flex gap-5">
                    <div className={cn(
                      "relative z-10 w-[11px] h-[11px] mt-1.5 rounded-full ring-4 ring-[#F8F9FB]",
                      event.type === "completed" ? "bg-blue-500" : 
                      event.type === "repair" ? "bg-emerald-500" :
                      event.type === "slipped" ? "bg-amber-500" : "bg-slate-300"
                    )} />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{event.date}</span>
                        <span className="text-[11px] font-medium text-slate-400">Day {event.day}</span>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                        {event.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {timeline.length > 3 && (
                <button 
                  onClick={() => setShowFullHistory(!showFullHistory)}
                  className="w-full py-3 text-[13px] font-bold text-slate-400 bg-slate-100/50 rounded-2xl transition-colors active:bg-slate-100"
                >
                  {showFullHistory ? "타임라인 접기" : `전체 여정 보기 (${timeline.length - 3}개 더)`}
                </button>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
