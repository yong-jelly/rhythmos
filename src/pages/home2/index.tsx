import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  Search, 
  Heart, 
  MessageCircle, 
  Share,
  MoreHorizontal,
  Star,
  Plus,
  Filter,
  Map,
  List,
  ChevronRight,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { usePledgeStore } from "@/entities/pledge";

export function Home2Page() {
  const [greeting, setGreeting] = useState("");
  const { pledges, fetchPledges } = usePledgeStore();

  useEffect(() => {
    fetchPledges();
    const hour = new Date().getHours();
    if (hour < 6) setGreeting("새벽의 평온한 리듬");
    else if (hour < 12) setGreeting("상쾌한 아침의 시작");
    else if (hour < 18) setGreeting("활기찬 오후의 에너지");
    else setGreeting("편안한 저녁의 마무리");
  }, [fetchPledges]);

  const isCompletedToday = (pledge: any) => {
    const today = new Date().toISOString().split('T')[0];
    return pledge.currentRun.events.some((e: any) => e.date === today && e.type === "success");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#222222] font-sans pb-32">
      {/* Airbnb 스타일 플로팅 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#EBEBEB] px-6 py-4">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF385C] rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-[18px] font-black tracking-tight text-[#FF385C]">rhythmos</span>
            </div>
            <Avatar className="w-8 h-8 border border-[#EBEBEB]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          {/* Airbnb 스타일 검색바 */}
          <div className="flex items-center w-full h-14 bg-white border border-[#DDDDDD] rounded-full shadow-[0_3px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)] transition-shadow px-4 cursor-pointer group">
            <Search className="w-5 h-5 text-[#FF385C] mr-3" />
            <div className="flex flex-col flex-1">
              <span className="text-[14px] font-bold text-[#222222]">어디로든 떠나는 리듬</span>
              <span className="text-[12px] text-[#717171]">언제든 • 누구와도 • 습관 추가</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#DDDDDD] flex items-center justify-center group-hover:bg-[#F7F7F7]">
              <Filter className="w-4 h-4 text-[#222222]" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-8">
        
        {/* 인사말 및 요약 섹션 */}
        <div className="mb-10">
          <h1 className="text-[32px] font-bold tracking-tight mb-6">{greeting}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-[#DDDDDD] hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-[#FF385C]" />
                <span className="text-[14px] font-bold">오늘의 달성</span>
              </div>
              <p className="text-[24px] font-bold">
                {pledges.length > 0 
                  ? Math.round((pledges.filter(isCompletedToday).length / pledges.length) * 100) 
                  : 0}%
              </p>
              <p className="text-[12px] text-[#717171] mt-1">평소보다 12% 높아요</p>
            </div>
            <div className="p-5 rounded-2xl border border-[#DDDDDD] hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#FF385C]" />
                <span className="text-[14px] font-bold">리듬 스트릭</span>
              </div>
              <p className="text-[24px] font-bold">12일차</p>
              <p className="text-[12px] text-[#717171] mt-1">상위 5% 리듬 가디언</p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 (Airbnb 스타일) */}
        <div className="flex gap-8 overflow-x-auto scrollbar-hide mb-8 border-b border-[#EBEBEB] pb-4">
          {[
            { id: "all", label: "전체", icon: <Map className="w-6 h-6" /> },
            { id: "health", label: "건강", icon: <Zap className="w-6 h-6" /> },
            { id: "mind", label: "마음", icon: <Heart className="w-6 h-6" /> },
            { id: "growth", label: "성장", icon: <TrendingUp className="w-6 h-6" /> },
            { id: "community", label: "공동체", icon: <Star className="w-6 h-6" /> },
          ].map((cat) => (
            <button key={cat.id} className="flex flex-col items-center gap-2 min-w-fit group">
              <div className="text-[#717171] group-hover:text-[#222222] transition-colors">
                {cat.icon}
              </div>
              <span className="text-[12px] font-bold text-[#717171] group-hover:text-[#222222] border-b-2 border-transparent group-hover:border-[#222222] pb-2 transition-all">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* 리듬 리스트 (Airbnb 숙소 리스팅 스타일) */}
        <div className="space-y-12">
          {pledges.map((pledge) => {
            const completed = isCompletedToday(pledge);
            const progress = (pledge.currentRun.completedDays / pledge.currentRun.targetDays) * 100;

            return (
              <div key={pledge.id} className="group cursor-pointer">
                {/* 숙소 이미지 영역 -> 리듬 메타포 영역 */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-4 bg-[#F7F7F7]">
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className={cn(
                       "w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500",
                       completed ? "bg-[#FF385C] text-white" : "bg-white text-[#222222]"
                     )}>
                       {completed ? (
                         <CheckCircle2 className="w-12 h-12" />
                       ) : (
                         <Zap className="w-12 h-12" />
                       )}
                     </div>
                  </div>
                  
                  {/* 상단 뱃지 */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[#222222] text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {pledge.currentRun.number}번째 여정
                    </span>
                  </div>
                  <button className="absolute top-4 right-4">
                    <Heart className={cn("w-6 h-6", completed ? "text-[#FF385C] fill-[#FF385C]" : "text-white fill-black/20")} />
                  </button>
                </div>

                {/* 정보 영역 */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-[16px] font-bold">{pledge.title}</h3>
                    <p className="text-[14px] text-[#717171]">{pledge.currentRun.completedDays}일 달성 • {pledge.currentRun.targetDays}일 목표</p>
                    <p className="text-[14px] text-[#717171]">{pledge.timeDetail || '매일 언제나'}</p>
                    <div className="pt-2 flex items-center gap-2">
                       <span className="text-[16px] font-bold">달성률 {Math.round(progress)}%</span>
                       <span className="text-[#222222] font-normal">/ 여정 중</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#222222]" />
                    <span className="text-[14px] font-normal">4.92</span>
                  </div>
                </div>

                {/* Airbnb 스타일 진행바 */}
                <div className="mt-4 h-[2px] bg-[#EBEBEB] w-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000", completed ? "bg-[#FF385C]" : "bg-[#222222]")}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 푸터 섹션 */}
        <div className="py-20 text-center border-t border-[#EBEBEB] mt-20">
          <p className="text-[18px] font-bold mb-2">아직 탐험할 리듬이 남았나요?</p>
          <p className="text-[14px] text-[#717171] mb-6">당신만의 고유한 리듬을 더 추가하고 일상을 여행처럼 즐겨보세요.</p>
          <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-lg px-8 py-3 text-[16px] font-bold">
            새로운 리듬 추가하기
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
