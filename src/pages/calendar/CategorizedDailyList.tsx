import { cn } from "@/shared/lib/utils";
import { CheckCircle2, Circle, ChevronRight, Plus, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { usePledgeStore } from "@/entities/pledge";

/**
 * CategorizedDailyList 컴포넌트 속성 정의
 */
interface CategorizedDailyListProps {
  /** 현재 화면에 표시할 날짜 정보 */
  date: Date;
}

/**
 * [기능] 날짜별 일과를 카테고리(3층 구조)별로 분류하여 표시하는 리스트
 * [의도] 습관(Rhythm), 할일(Todo), 계획(Plan)의 위계를 명확히 하고 각 담당 매니저의 페르소나를 노출
 */
export function CategorizedDailyList({ date }: CategorizedDailyListProps) {
  const navigate = useNavigate();
  const { setIsWizardOpen } = usePledgeStore();

  /**
   * [설계 데이터] 날짜별 데이터 패칭 시뮬레이션 (추후 Store 연동 지점)
   * @param selectedDate 
   * @returns 카테고리별 데이터 배열
   */
  const getMockData = (selectedDate: Date) => {
    const day = selectedDate.getDate();
    
    // [의도] Empty State 테스트를 위해 특정 날짜(7, 11 배수)는 빈 배열 반환
    if (day % 7 === 0 || day % 11 === 0) {
      return [];
    }

    // 짝수 날짜는 '완료' 상태로 시뮬레이션
    const isEven = day % 2 === 0;

    return [
      {
        id: "rhythm",
        title: "Rhythms",
        manager: "Rhythm Guardian",
        color: "bg-primary",
        items: [
          { id: "r1", title: "15분 명상", status: isEven ? "completed" : "pending", value: isEven ? "100%" : "82%" },
          { id: "r2", title: "30분 독서", status: isEven ? "completed" : "pending", value: isEven ? "100%" : "45%" },
        ]
      },
      {
        id: "todo",
        title: "Todos",
        manager: "Task Master",
        color: "bg-warning",
        items: [
          { id: "t1", title: "헬스장 등록", status: isEven ? "completed" : "pending" },
          { id: "t2", title: "식단 장보기", status: isEven ? "completed" : "pending" },
        ]
      },
      {
        id: "plan",
        title: "Plans",
        manager: "Plan Architect",
        color: "bg-lavender",
        items: [
          { id: "p1", title: "다이어트 1단계", status: "in_progress", value: "Day 12/30" },
        ]
      }
    ];
  };

  const categories = getMockData(date);
  const isEmpty = categories.length === 0;

  /**
   * [UI] 데이터가 없는 초기 사용자/날짜를 위한 Empty State
   */
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
          <CalendarDays className="w-10 h-10 text-muted-foreground/20" />
        </div>
        <h3 className="text-[18px] font-bold text-foreground mb-2">
          오늘의 약속이 아직 없어요.
        </h3>
        <p className="text-[14px] text-muted-foreground mb-8 leading-relaxed">
          새로운 리듬을 시작하거나 <br />
          밀린 기록을 복원하여 일상을 채워보세요.
        </p>
        <button 
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-foreground text-background rounded-full text-[15px] font-bold transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          첫 약속 만들기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* 카테고리별 그룹 반복 렌더링 */}
      {categories.map((cat) => (
        <div key={cat.id} className="flex flex-col">
          {/* 카테고리 헤더: 컬러 칩 + 제목 + 담당 매니저 */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className={cn("w-1 h-4 rounded-full", cat.color)} />
            <h3 className="text-[15px] font-bold text-foreground">
              {cat.title}
            </h3>
            <span className="text-[11px] font-medium text-muted-foreground ml-auto">
              {cat.manager}
            </span>
          </div>

          {/* [의도] iOS Grouped List 스타일: 0.5px 보더와 클린한 배경 */}
          <div className="bg-white border-[0.5px] border-border/60 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {cat.items.map((item, index) => (
              <div 
                key={item.id}
                className={cn(
                  "px-4 py-4 flex items-center justify-between transition-colors hover:bg-secondary/30",
                  // 마지막 항목 제외 하단 구분선(Hairline) 표시
                  index !== cat.items.length - 1 && "border-b-[0.5px] border-border/40"
                )}
              >
                <div className="flex items-center gap-4">
                  {/* 상태 아이콘: 체크박스 및 원형 인디케이터 */}
                  <div className={cn(
                    "w-6 h-6 flex items-center justify-center",
                    item.status === "completed" ? "text-primary" : "text-muted-foreground/30"
                  )}>
                    {item.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 stroke-[2.5px]" />
                    ) : (
                      <Circle className="h-5 w-5 stroke-[2.5px]" />
                    )}
                  </div>
                  
                  {/* 항목 정보: 제목 + 부가 정보(준수율/D-day 등) */}
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-foreground leading-tight">
                      {item.title}
                    </span>
                    {item.value && (
                      <span className="text-[12px] font-medium text-muted-foreground mt-0.5">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 상세 보기 이동 화살표 */}
                <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
