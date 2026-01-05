import { useState } from "react";
import { format, addDays, subDays, eachDayOfInterval, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  ArrowLeft,
  ChevronRight, 
  CheckCircle2, 
  Circle,
  RotateCcw,
  Command,
  Plus,
  Smile,
  Paperclip,
  ChevronDown,
  Bell,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export function Calendar2Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const startDate = subDays(selectedDate, 3);
  const endDate = addDays(selectedDate, 3);
  
  const weekDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const categories = [
    {
      id: "rhythm",
      title: "오늘의 리듬",
      count: "0/2",
      items: [
        { id: "r1", title: "15분 명상하기", category: "Mind", color: "text-blue-500 bg-blue-50" },
        { id: "r2", title: "독서 30분", category: "Growth", color: "text-orange-500 bg-orange-50" },
      ]
    },
    {
      id: "todo",
      title: "할 일 목록",
      count: "0/2",
      items: [
        { id: "t1", title: "헬스장 출석체크", category: "Health", color: "text-slate-500 bg-slate-100" },
        { id: "t2", title: "건강한 식단 장보기", category: "Food", color: "text-green-500 bg-green-50" },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex justify-center py-0 sm:py-8">
      {/* 모바일 앱 스타일 고정 너비 컨테이너 */}
      <div className="w-full max-w-[430px] bg-white min-h-[100dvh] sm:min-h-[850px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative border border-slate-100">
        
        {/* Header Section */}
        <div className="px-6 pt-12 pb-6 border-b border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
              <h1 className="text-[19px] font-bold text-slate-900">나의 리듬 관리</h1>
              <span className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">3d left</span>
            </div>
            <div className="flex -space-x-2">
              <Avatar className="w-8 h-8 border-2 border-white ring-1 ring-slate-100">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 border-2 border-white ring-1 ring-slate-100">
                <AvatarImage src="https://github.com/jelly.png" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Time Display */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-col">
              <span className="text-[28px] font-black tracking-tight text-slate-900 leading-none">12:00<span className="text-[16px] ml-0.5">am</span></span>
              <span className="text-[12px] font-bold text-slate-400 mt-1">{format(selectedDate, "EEE, MMM d")}</span>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-200 mt-[-15px]" />
            <div className="flex flex-col">
              <span className="text-[28px] font-black tracking-tight text-slate-900 leading-none">12:00<span className="text-[16px] ml-0.5">am</span></span>
              <span className="text-[12px] font-bold text-slate-400 mt-1">{format(addDays(selectedDate, 3), "EEE, MMM d")}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-4">
              <div className="flex justify-between items-center px-1 mb-2">
                <span className="text-[14px] font-bold text-slate-400">{cat.count} • {cat.title}</span>
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded bg-slate-900 flex items-center justify-center">
                     <CheckCircle2 className="w-3 h-3 text-white" />
                   </div>
                   <span className="text-[13px] font-bold text-slate-900">Completed</span>
                </div>
              </div>

              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all group cursor-pointer",
                      "bg-white border border-slate-100 hover:border-slate-300 shadow-sm active:scale-[0.98]",
                      item.id === 'r2' && "ring-2 ring-slate-900 ring-offset-2" // 이미지의 포커스 효과 재현
                    )}
                  >
                    <div className="w-5 h-5 border-2 border-slate-200 rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-transparent rounded-sm" />
                    </div>
                    <span className="flex-1 text-[16px] font-bold text-slate-800">{item.title}</span>
                    <div className="flex items-center gap-3">
                       <span className={cn("text-[11px] font-bold px-3 py-1.5 rounded-full", item.color)}>
                         {item.category}
                       </span>
                       <Command className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 px-1 py-2 text-slate-400 hover:text-slate-900 transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-bold">Add an item</span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Chat-like Input Area */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex items-start gap-3 mb-6">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[80%]">
              <p className="text-[14px] font-bold text-slate-800">
                오늘의 리듬을 잘 지키고 계시네요! 조금만 더 힘내세요.
              </p>
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-[28px] p-2 flex items-center gap-1 shadow-xl">
            <div className="flex items-center px-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Plus className="w-5 h-5 text-white/40" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Smile className="w-5 h-5 text-white/40" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Paperclip className="w-5 h-5 text-white/40" />
              </button>
            </div>
            
            <input 
              type="text" 
              placeholder="메시지 보내기..."
              className="flex-1 bg-transparent border-none text-white text-[15px] px-2 focus:ring-0 placeholder:text-white/20 font-medium"
            />
            
            <button className="bg-white text-black h-11 px-5 rounded-2xl flex items-center gap-2 font-black text-[14px] active:scale-95 transition-transform shrink-0">
              Send Now
              <div className="w-[1px] h-3 bg-black/10 mx-0.5" />
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
