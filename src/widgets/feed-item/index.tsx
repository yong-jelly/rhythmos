import { MessageCircle, Send, Bookmark, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { CircularGauge, DotMatrixGrid, LinearProgress } from "@/shared/ui/analytics-widget";

/**
 * FeedItem 컴포넌트 속성 정의
 */
interface FeedItemProps {
  user: {
    name: string;
    handle: string;
    role: string;
    avatar: string;
    time?: string;
  };
  content: {
    type: "rhythm" | "plan" | "todo" | "repair";
    title: string;
    description?: string;
    image?: string;
    bgColor?: string;
    textColor?: string;
    variant?: "gauge" | "grid" | "progress" | "typography";
    data?: any; 
  };
  stats: {
    likes: number;
    comments: number;
    saves?: number;
  };
  minimal?: boolean;
}

/**
 * [기능] 홈 피드에 표시되는 고감도 기능적 카드
 * [의도] 단순한 게시물이 아니라 각 영역 매니저가 발행하는 '분석 리포트'의 느낌을 전달
 */
export function FeedItem({ user, content, stats, minimal = false }: FeedItemProps) {
  /**
   * 카테고리별 테마 플랫/그래디언트 클래스 반환
   */
  const getThemeClass = (type: string) => {
    switch (type) {
      case "rhythm": return "flat-rhythm";
      case "repair": return "flat-repair";
      case "plan": return "flat-plan";
      default: return "bg-white";
    }
  };

  /**
   * 담당 매니저 역할 텍스트 컬러 반환
   */
  const getRoleBadgeColor = (type: string) => {
    switch (type) {
      case "rhythm": return "text-[#3b82f6]"; // 명확한 피그마 블루
      case "repair": return "text-[#f97316]"; // 명확한 피그마 오렌지
      case "plan": return "text-[#a855f7]";   // 명확한 피그마 퍼플
      default: return "text-muted-foreground";
    }
  };

  if (minimal) {
    return (
      <div 
        className={cn(
          "relative rounded-[20px] overflow-hidden p-5 flex items-center justify-between min-h-[96px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 bg-white border border-border/40",
          getThemeClass(content.type)
        )}
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative shrink-0">
            <Avatar className="h-11 w-11 border-2 border-white shadow-sm">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white",
              content.type === "rhythm" ? "bg-primary" : 
              content.type === "plan" ? "bg-lavender" : "bg-warning"
            )} />
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1.5">
              {user.role}
            </span>
            <h3 className="text-[16px] font-bold leading-tight tracking-tight text-foreground">
              {content.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 pr-1">
          {content.variant === "gauge" && (
            <div className="opacity-100">
              <CircularGauge value={content.data?.value || 0} size={44} strokeWidth={5} />
            </div>
          )}
          <div className="w-9 h-9 rounded-xl bg-white/50 border border-white flex items-center justify-center text-muted-foreground/60 shadow-sm">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 px-4 group">
      {/* 1. 매니저 헤더 (Header) - 감성적인 카드 내부 통합 스타일로 변경 */}
      <div 
        className={cn(
          "relative rounded-[32px] overflow-hidden p-8 flex flex-col min-h-[340px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] transition-all duration-500 border border-border/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] bg-white",
          getThemeClass(content.type)
        )}
      >
        {/* 장식용 배경 요소 (Abstract Icon) */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
          <ArrowUpRight className="w-48 h-48" />
        </div>

        <div className="flex-1 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-[13px] font-black text-foreground/70">{user.name}</span>
                  <span className={cn("text-[10px] font-black uppercase tracking-widest leading-none", getRoleBadgeColor(content.type))}>
                    {user.role}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground/40" />
              </button>
            </div>
            
            <h3 className="text-[32px] font-black leading-[1.1] tracking-[-0.04em] mb-4 text-foreground">
              {content.title}
            </h3>
            
            {content.description && (
              <p className="text-[16px] font-medium leading-relaxed text-muted-foreground/80 line-clamp-3">
                {content.description}
              </p>
            )}
          </div>

          <div className="mt-auto pt-8 flex items-end justify-between">
            <div className="flex-1 max-w-[180px]">
              {content.variant === "gauge" && (
                <div className="opacity-100 scale-110 origin-left">
                  <CircularGauge value={content.data?.value || 0} size={110} strokeWidth={10} className="text-foreground/80" />
                </div>
              )}
              {content.variant === "grid" && (
                <div className="bg-white/40 backdrop-blur-md rounded-[24px] p-5 border border-white/60">
                  <DotMatrixGrid data={content.data?.points || []} />
                </div>
              )}
              {content.variant === "progress" && (
                <LinearProgress 
                  value={content.data?.value || 0} 
                  label={content.data?.title} 
                  sublabel={content.data?.subtitle} 
                  className="text-foreground/80"
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-muted-foreground/60">
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[14px] font-bold">{stats.comments}</span>
                </div>
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-background flex items-center justify-center text-[14px] shadow-sm">😋</div>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-background flex items-center justify-center text-[14px] shadow-sm">👏</div>
                </div>
              </div>
              <button className="w-14 h-14 rounded-[24px] bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-foreground/10">
                <ArrowUpRight className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

