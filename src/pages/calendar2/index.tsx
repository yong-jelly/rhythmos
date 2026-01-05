import { useState } from "react";
import { format, addDays, subDays, eachDayOfInterval, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Circle,
  RotateCcw,
  Sparkles,
  Timer,
  BookOpen,
  Dumbbell,
  ShoppingBasket,
  Target,
  Trophy,
  Zap,
  Flame,
  Check
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { BottomNavigation } from "@/widgets/bottom-navigation";

export function Calendar2Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("전체");

  const startDate = subDays(selectedDate, 3);
  const endDate = addDays(selectedDate, 3);
  
  const weekDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  /**
   * [데이터] 메타포와 가시성을 극대화한 한국어 데이터
   */
  const getCategorizedData = (date: Date) => {
    const day = date.getDate();
    if (day % 7 === 0 || day % 11 === 0) return [];

    const isEven = day % 2 === 0;

    return [
      {
        id: "rhythm",
        title: "오늘의 리듬",
        manager: "리듬 수호자",
        color: "bg-blue-600",
        borderColor: "border-blue-100",
        items: [
          { 
            id: "r1", 
            title: "15분 명상하기", 
            status: isEven ? "completed" : "pending", 
            value: isEven ? "100%" : "82%", 
            icon: <Timer className="w-6 h-6 text-blue-600" />,
            iconBg: "bg-blue-50" 
          },
          { 
            id: "r2", 
            title: "독서 30분", 
            status: isEven ? "completed" : "pending", 
            value: isEven ? "100%" : "45%", 
            icon: <BookOpen className="w-6 h-6 text-orange-600" />,
            iconBg: "bg-orange-50" 
          },
        ]
      },
      {
        id: "todo",
        title: "할 일 목록",
        manager: "태스크 마스터",
        color: "bg-amber-500",
        borderColor: "border-amber-100",
        items: [
          { 
            id: "t1", 
            title: "헬스장 출석체크", 
            status: isEven ? "completed" : "pending", 
            icon: <Dumbbell className="w-6 h-6 text-slate-700" />,
            iconBg: "bg-slate-100" 
          },
          { 
            id: "t2", 
            title: "건강한 식단 장보기", 
            status: isEven ? "completed" : "pending", 
            icon: <ShoppingBasket className="w-6 h-6 text-green-600" />,
            iconBg: "bg-green-50" 
          },
        ]
      },
      {
        id: "plan",
        title: "진행 중인 계획",
        manager: "플랜 설계자",
        color: "bg-purple-600",
        borderColor: "border-purple-100",
        items: [
          { 
            id: "p1", 
            title: "30일 다이어트 챌린지", 
            status: "in_progress", 
            value: "12일차 / 30일", 
            icon: <Target className="w-6 h-6 text-purple-600" />,
            iconBg: "bg-purple-50" 
          },
        ]
      }
    ];
  };

  const categories = getCategorizedData(selectedDate);
  const isEmpty = categories.length === 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F4F8] text-slate-900 font-sans pb-32">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center px-6 py-6 bg-white border-b-2 border-slate-200/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-[24px] font-black tracking-tight text-slate-900">나의 리듬</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedDate(new Date())}
            className="border-2 border-slate-200 text-slate-600 gap-1.5 font-black text-[13px] rounded-full px-4 hover:bg-slate-50 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            오늘
          </Button>
          <Avatar className="w-11 h-11 border-4 border-white shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 날짜 선택 스트립 */}
      <div className="bg-white px-2 pt-4 pb-6 border-b-2 border-slate-100 shadow-sm">
        <div className="px-5 mb-5 flex justify-between items-end">
          <h2 className="text-[16px] font-black text-slate-800 tracking-tight">
            {format(selectedDate, "yyyy년 M월", { locale: ko })}
          </h2>
          <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {format(selectedDate, "eeee", { locale: ko })}
          </span>
        </div>
        
        <div className="flex justify-between px-2">
          {weekDates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className="flex flex-col items-center gap-3 transition-all relative px-1"
              >
                <span className={cn(
                  "text-[12px] font-black uppercase",
                  isSelected ? "text-indigo-600" : "text-slate-400"
                )}>
                  {format(date, "EE", { locale: ko })}
                </span>
                <div className={cn(
                  "w-12 h-16 rounded-[22px] flex flex-col items-center justify-center text-[19px] font-black transition-all relative border-2",
                  isSelected 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100" 
                    : isToday
                      ? "bg-white border-indigo-400 text-indigo-600 shadow-md shadow-indigo-50"
                      : "bg-slate-50 border-transparent text-slate-500 hover:bg-white hover:border-slate-200"
                )}>
                  {format(date, "d")}
                  {isSelected && (
                    <div className="absolute bottom-2.5 w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-3 px-6 py-6 overflow-x-auto scrollbar-hide">
        {["전체", "리듬", "할일", "건강"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-7 py-3 rounded-full text-[15px] font-black transition-all border-2",
              filter === f 
                ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 메인 리스트 영역 */}
      <div className="flex-1 px-6 space-y-12 mt-2">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[40px] border-4 border-slate-200 border-dashed mx-2">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Sparkles className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-black text-2xl mb-3">오늘은 자유시간!</h3>
            <p className="text-slate-500 font-bold">등록된 계획이 없어요. 새로운 리듬을 만들어보세요.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="space-y-6">
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <div className={cn("w-3 h-8 rounded-full shadow-sm", cat.color)} />
                  <h3 className="text-[22px] font-black text-slate-900 tracking-tight">{cat.title}</h3>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                   <span className="text-[12px] font-black text-slate-600">{cat.manager}</span>
                </div>
              </div>

              {/* 아이템 리스트 */}
              <div className="space-y-5">
                {cat.items.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex items-center gap-5 bg-white p-6 rounded-[32px] transition-all group active:scale-[0.96] border-2",
                      "shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)]",
                      item.status === "completed" ? "border-emerald-100 bg-emerald-50/20" : "border-white hover:border-indigo-100",
                      item.status === "completed" && "opacity-90"
                    )}
                  >
                    {/* 아이콘 영역 - 강한 대비 */}
                    <div className={cn(
                      "w-16 h-16 rounded-[24px] flex items-center justify-center transition-transform group-hover:rotate-6 shadow-md border-2 border-white",
                      item.iconBg
                    )}>
                       {item.icon}
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className={cn(
                          "text-[19px] font-black tracking-tight transition-all",
                          item.status === "completed" ? "text-emerald-700/50 line-through" : "text-slate-900"
                        )}>
                          {item.title}
                        </h4>
                        {item.status !== "completed" && cat.id === 'rhythm' && (
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                        )}
                      </div>
                      
                      {/* 상태 바 및 메타 정보 - 가시성 강화 */}
                      <div className="flex items-center gap-3">
                        {item.value && (
                          <div className="flex items-center gap-2.5 flex-1">
                             <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden flex-1 shadow-inner border border-slate-200/50">
                               <div 
                                 className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", cat.color)} 
                                 style={{ width: item.value.includes('%') ? item.value : '40%' }}
                               />
                             </div>
                             <span className="text-slate-700 text-[13px] font-black min-w-[40px]">{item.value}</span>
                          </div>
                        )}
                        {!item.value && (
                          <div className="flex items-center gap-1 text-slate-500">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-[13px] font-bold italic tracking-wide">Ready to go!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 체크 버튼 - 임팩트 강화 */}
                    <div className="flex-shrink-0">
                      {item.status === "completed" ? (
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 border-2 border-white">
                          <Check className="w-6 h-6 text-white stroke-[4px]" />
                        </div>
                      ) : (
                        <button className="w-10 h-10 rounded-full border-4 border-slate-100 bg-slate-50 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-50 transition-all shadow-sm">
                           <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-indigo-400 transition-colors" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
