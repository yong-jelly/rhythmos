import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Pledge } from "@/shared/types";

interface PledgeDetailModalProps {
  pledge: Pledge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PledgeDetailModal({ pledge, isOpen, onClose }: PledgeDetailModalProps) {
  const [isLogExpanded, setIsLogExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLogExpanded(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const stats = useMemo(() => {
    if (!pledge) return null;
    
    const { currentRun } = pledge;
    const successDays = currentRun.completedDays;
    const targetDays = currentRun.targetDays;
    const successRate = Math.round((successDays / targetDays) * 100);
    
    // 진행 일수 계산
    const start = new Date(currentRun.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 실패 메모 추출
    const failedNotes = currentRun.events
      .filter(e => (e.type === "skip" || e.type === "unknown") && e.note)
      .map(e => ({ date: e.date, note: e.note }));

    // 목표일 계산
    const getTargetDate = () => {
      if (currentRun.endDate) return currentRun.endDate;
      const start = new Date(currentRun.startDate);
      const target = new Date(start);
      target.setDate(start.getDate() + targetDays);
      return target.toISOString().split('T')[0];
    };

    return {
      successDays,
      targetDays,
      successRate,
      daysElapsed,
      failedNotes,
      createdAt: pledge.createdAt.split('T')[0],
      startDate: currentRun.startDate,
      targetDate: getTargetDate(),
      events: [...currentRun.events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    };
  }, [pledge]);

  if (!pledge || !stats) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 md:p-6">
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-[94vh] md:w-[460px] md:h-auto md:max-h-[90vh] rounded-t-[40px] md:rounded-[40px] shadow-2xl overflow-hidden bg-[#F8F9FB] flex flex-col"
          >
            {/* 상단 네비게이션 - 투명 헤더 */}
            <header className="shrink-0 z-20 absolute top-0 left-0 right-0">
              <div className="px-6 py-5 flex items-center justify-between">
                <button 
                  onClick={onClose} 
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-colors active:bg-slate-100"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-900" />
                </button>
                <h1 className="text-[16px] font-bold text-slate-900">리듬 상세</h1>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                  <Share2 className="w-4 h-4 text-slate-900" />
                </button>
              </div>
            </header>

            {/* 메인 콘텐츠 스크롤 영역 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pt-20">
              {/* 상단 비주얼 영역: 아크 진행률 차트 */}
              <div className="px-8 pb-8 flex flex-col items-center">
                <div className="relative w-56 h-28 overflow-hidden mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <path 
                      d="M 10 50 A 40 40 0 0 1 90 50" 
                      fill="none" 
                      stroke="#E2E8F0" 
                      strokeWidth="9" 
                      strokeLinecap="round" 
                    />
                    <motion.path 
                      initial={{ strokeDasharray: "0 125" }}
                      animate={{ strokeDasharray: `${stats.successRate * 1.25} 125` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      d="M 10 50 A 40 40 0 0 1 90 50" 
                      fill="none" 
                      stroke="#3B82F6" 
                      strokeWidth="9" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                    <span className="text-[28px] font-black text-slate-900 leading-none">{stats.successRate}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Completion</span>
                  </div>
                </div>

                <div className="text-center space-y-0.5">
                  <h2 className="text-[24px] font-black text-slate-900 leading-tight">
                    {pledge.title}
                  </h2>
                  <p className="text-[14px] font-medium text-slate-400">
                    {pledge.identityStatement}
                  </p>
                </div>
              </div>

              {/* 그리드 카드 영역 */}
              <div className="px-6 space-y-5 pb-10">
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard 
                    label="여정 기간"
                    value={`${stats.daysElapsed}일차`}
                    subLabel={`${stats.startDate.split('-').slice(1).join('.')} ~ ${stats.targetDate.split('-').slice(1).join('.')}`}
                  />
                  <MetricCard 
                    label="성공 기록"
                    value={`${stats.successDays}회`}
                    subLabel={`목표 ${stats.targetDays}회 완료`}
                  />
                </div>

                {/* 상세 행동 카드 */}
                <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100/50 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Strategy</span>
                  </div>
                  <p className="text-[16px] font-bold text-slate-900 leading-snug">
                    {pledge.action}
                  </p>
                </div>

                {/* 히스토리 타임라인 (Expandable & Scrollable) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Activity Log</span>
                    <button 
                      onClick={() => setIsLogExpanded(!isLogExpanded)}
                      className="flex items-center gap-1 text-[11px] font-bold text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {isLogExpanded ? (
                        <>축소하기 <ChevronUp className="w-3 h-3" /></>
                      ) : (
                        <>전체보기 <ChevronDown className="w-3 h-3" /></>
                      )}
                    </button>
                  </div>
                  
                  <motion.div 
                    layout
                    className={cn(
                      "bg-white rounded-[28px] border border-slate-100/50 overflow-hidden transition-all duration-300 flex flex-col",
                      isLogExpanded ? "h-[320px]" : "h-auto max-h-[220px]"
                    )}
                  >
                    <div className={cn(
                      "flex-1 overflow-y-auto custom-scrollbar-minimal",
                      !isLogExpanded && "overflow-hidden"
                    )}>
                      {(isLogExpanded ? stats.events : stats.events.slice(0, 3)).map((event, idx) => (
                        <div 
                          key={event.id} 
                          className={cn(
                            "flex items-center justify-between p-4 transition-colors",
                            idx !== 0 && "border-t border-slate-50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              event.type === "success" ? "bg-blue-500" : "bg-slate-200"
                            )} />
                            <div className="flex flex-col">
                              <span className="text-[14px] font-bold text-slate-900">
                                {event.date.split('-').slice(1).join('.')}
                              </span>
                              {event.note && (
                                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">
                                  {event.note}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className={cn(
                            "text-[11px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md",
                            event.type === "success" ? "text-blue-500 bg-blue-50" : "text-slate-400 bg-slate-50"
                          )}>
                            {event.type === "success" ? "Success" : "Skipped"}
                          </span>
                        </div>
                      ))}
                      {stats.events.length === 0 && (
                        <div className="p-10 text-center text-slate-300 text-[13px] font-medium">
                          기록된 활동이 없습니다.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* 실패 메모 리스트 (Reflection) */}
                {stats.failedNotes.length > 0 && !isLogExpanded && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Reflection Log</span>
                    </div>
                    <div className="space-y-2">
                      {stats.failedNotes.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="bg-white/40 p-4 rounded-[24px] border border-slate-100/50 flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-black text-slate-400">{item.date.split('-').slice(1).join('.')}</span>
                          </div>
                          <p className="text-[14px] font-medium text-slate-600 leading-relaxed italic">
                            "{item.note}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function MetricCard({ label, value, subLabel }: { label: string, value: string, subLabel: string }) {
  return (
    <div className="p-5 rounded-[28px] bg-white shadow-sm border border-slate-100/50 space-y-3">
      <div className="space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
        <div className="text-[20px] font-black text-slate-900 leading-none">{value}</div>
      </div>
      <div className="text-[11px] font-bold text-slate-400/70">{subLabel}</div>
    </div>
  );
}
