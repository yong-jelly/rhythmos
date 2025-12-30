import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { usePledgeStore } from "@/entities/pledge";

/**
 * [기능] 텍스트 중심의 확장형 플로팅 내비게이션 바
 * [의도] 단순한 메뉴를 넘어 커맨드 센터 역할을 수행하며, 인터랙션을 통해 추가적인 액션을 노출
 */
export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsWizardOpen } = usePledgeStore();
  
  /** [상태] 메뉴 확장 여부 제어 */
  const [isExpanded, setIsExpanded] = useState(false);

  /** [데이터] 내비게이션 항목 정의 (텍스트 중심 디자인) */
  const navItems = [
    { label: "오늘", path: "/home" },
    { label: "달력", path: "/calendar" },
    { label: "여정", path: "/journey" },
    { label: "서클", path: "/circle" },
    { label: "기록", path: "/archives" },
  ];

  return (
    <nav className="fixed bottom-10 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
      <div className={cn(
        "pointer-events-auto flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isExpanded ? "gap-4" : "gap-0"
      )}>
        
        {/* 1. 확장된 메뉴 영역 (Expanded Menu) */}
        <div className={cn(
          "flex flex-col gap-2 transition-all duration-500 overflow-hidden",
          isExpanded ? "max-h-64 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"
        )}>
          {/* [의도] 글래스모피즘 효과로 하단 피드가 은은하게 비치도록 구성 */}
          <div className="bg-white/90 backdrop-blur-2xl rounded-[24px] p-2 shadow-2xl border border-white/20 flex flex-col min-w-[140px]">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsExpanded(false);
                }}
                className={cn(
                  "px-6 py-3 rounded-xl text-[15px] font-bold transition-all text-left",
                  location.pathname === item.path 
                    ? "bg-foreground text-background" // 활성화된 메뉴
                    : "text-foreground hover:bg-secondary" // 비활성 메뉴
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 메인 알약 형태 버튼 (Main Pill) */}
        <div className="flex items-center bg-white/90 backdrop-blur-2xl rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
          {/* 메뉴 토글 버튼 */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center gap-3 rounded-full pl-5 pr-4 py-3 transition-all duration-300",
              isExpanded ? "bg-secondary text-foreground" : "bg-foreground text-background"
            )}
          >
            <span className="text-[16px] font-bold tracking-tight">
              {isExpanded ? "닫기" : "메뉴"}
            </span>
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500",
              isExpanded ? "rotate-90 bg-foreground/10" : "bg-white/20"
            )}>
              {isExpanded ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </div>
          </button>
          
          {/* [의도] 메뉴가 축소되었을 때만 노출되는 퀵 액션 (새 약속 및 프로필) */}
          {!isExpanded && (
            <div className="flex items-center px-2 py-1 ml-1 border-l border-border/50">
              <button 
                onClick={() => setIsWizardOpen(true)}
                className="px-4 py-2 text-[15px] font-bold text-foreground hover:bg-secondary rounded-full transition-colors"
              >
                새 약속
              </button>
              {/* 사용자 아바타 (간편 프로필 이동) */}
              <div 
                onClick={() => navigate("/profile")}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer ml-1"
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
