import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  subDays,
  isSameMonth, 
  isSameDay,
  eachDayOfInterval
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * CalendarView 컴포넌트 속성 정의
 */
interface CalendarViewProps {
  /** 현재 선택된 날짜 (부모 컴포넌트의 상태) */
  selectedDate: Date;
  /** 날짜 선택 시 호출되는 콜백 함수 */
  onDateSelect: (date: Date) => void;
}

/**
 * [기능] Apple Minimal 스타일의 가로 스트립 캘린더
 * [의도] 세로 공간을 최소화하여 리스트 영역을 확보하고, 날짜별 '리듬 준수 상태'를 한눈에 파악하게 함
 */
export function CalendarView({ selectedDate, onDateSelect }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * 가로 스크롤 영역 데이터 생성
   * [의도] 선택된 날짜를 기준으로 앞뒤 14일(총 4주 분량)을 노출하여 탐색 유연성 확보
   */
  const horizontalDates = eachDayOfInterval({
    start: subDays(selectedDate, 14),
    end: addDays(selectedDate, 14),
  });

  /**
   * [UX 인터랙션] 선택된 날짜가 항상 가로 스크롤의 중앙에 오도록 자동 스크롤
   */
  useEffect(() => {
    if (scrollRef.current) {
      const selectedEl = scrollRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedDate]);

  /**
   * [핵심 로직] 날짜별 수행 상태 계산 (추후 실제 DB 연동 지점)
   * @param date 계산할 날짜
   * @returns 'completed' (모두 완료), 'partial' (진행 중), 'empty' (기록 없음)
   */
  const getDateStatus = (date: Date) => {
    const day = date.getDate();
    // [의도] 초기 사용자 체험(Empty)과 성취감(Completed)을 시뮬레이션하기 위한 임시 로직
    if (day % 7 === 0 || day % 11 === 0) return "empty"; 
    if (day % 2 === 0) return "completed"; 
    return "partial"; 
  };

  return (
    <div className="bg-transparent py-2">
      {/* 캘린더 상단 헤더: 연월 표시 및 오늘 이동 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[14px] font-bold tracking-tight text-foreground/80">
          {format(selectedDate, "yyyy년 M월", { locale: ko })}
        </h2>
        <button 
          onClick={() => onDateSelect(new Date())}
          className="flex items-center gap-1 px-2.5 py-1 bg-secondary rounded-full text-[11px] font-bold transition-all active:scale-95"
        >
          <RotateCcw className="h-3 w-3" />
          오늘
        </button>
      </div>

      {/* 가로 스크롤 날짜 스트립 영역 */}
      <div 
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide snap-x"
      >
        {horizontalDates.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const dayName = format(day, "EEE", { locale: ko });
          const status = getDateStatus(day);

          return (
            <div
              key={day.toString()}
              data-selected={isSelected}
              className={cn(
                // [의도] Flat iOS 스타일: 그림자 없이 보더와 배경색만으로 계층 구분
                "flex-none w-[46px] h-[64px] flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all snap-center border-[0.5px] relative",
                isSelected 
                  ? "bg-foreground border-foreground text-background" // 선택된 날짜: 완전 반전
                  : status === "empty"
                    ? "bg-background border-border/20 text-foreground/30 hover:bg-secondary" // 데이터 없는 날: 희미하게
                    : "bg-background border-border/40 text-foreground/60 hover:bg-secondary", // 일반 날짜
              )}
              onClick={() => onDateSelect(day)}
            >
              {/* 요일 라벨 (Mon, Tue...) */}
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest mb-1",
                isSelected ? "text-background/60" : "text-muted-foreground/40"
              )}>
                {dayName}
              </span>
              
              {/* 날짜 숫자 */}
              <span className="text-[17px] font-black tracking-tighter leading-none">
                {format(day, "d")}
              </span>
              
              {/* 오늘 날짜 인디케이터 (우측 상단 작은 점) */}
              {isToday && !isSelected && (
                 <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-primary rounded-full" />
              )}
              
              {/* [의도] 수행도 상태 바 (하단): 데이터의 가치를 시각적으로 표현 */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center">
                {status === "completed" && (
                  // 모두 완료: 굵은 실선
                  <div className={cn("w-6 h-[3px] rounded-full", isSelected ? "bg-background" : "bg-primary")} />
                )}
                {status === "partial" && (
                  // 진행 중: 점선
                  <div className={cn("w-6 h-[3px] rounded-full border-b-[3px] border-dotted", isSelected ? "border-background/60" : "border-border/60")} />
                )}
                {status === "empty" && (
                  // 기록 없음: 아주 작은 점
                  <div className={cn("w-1 h-1 rounded-full opacity-20", isSelected ? "bg-background" : "bg-foreground")} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
