import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import { Plus, X, Check, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePledgeStore } from "@/entities/pledge";
import type { Pledge } from "@/shared/types";

/**
 * [기능] 텍스트 중심의 확장형 플로팅 내비게이션 바
 * [의도] 단순한 메뉴를 넘어 커맨드 센터 역할을 수행하며, 인터랙션을 통해 추가적인 액션을 노출
 */
interface BottomNavigationProps {
  testPledges?: Pledge[];
}

export function BottomNavigation({ testPledges }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pledges: storePledges, setCheckInTarget, setIsWizardOpen } = usePledgeStore();
  
  // 테스트 데이터가 있으면 그것을 사용, 아니면 스토어 데이터 사용
  const pledges = testPledges || storePledges;

  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "rhythm";

  const getQuickActionLabel = () => {
    switch (activeTab) {
      case "plan": return "새 계획";
      case "project": return "새 프로젝트";
      default: return "새 약속";
    }
  };
  
  /** [상태] 메뉴 확장 여부 제어 */
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkInState, setCheckInState] = useState<"hidden" | "active" | "completed">("hidden");

  /** [효과] /home 의 리듬 탭 일 때 0.5초 후 체크인 버튼 노출 */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentTab = params.get("tab") || "rhythm";
    
    if (location.pathname === "/home" && currentTab === "rhythm") {
      const timer = setTimeout(() => {
        // 리듬이 하나도 없으면 체크인 관련 버튼을 아예 숨김
        if (pledges.length === 0) {
          setCheckInState("hidden");
          return;
        }

        const hasIncompletePledge = pledges.some(p => {
          const isCompletedToday = p.currentRun.events.some(
            e => e.date === new Date().toISOString().split('T')[0] && e.type === "success"
          );
          return !isCompletedToday;
        });
        
        setCheckInState(hasIncompletePledge ? "active" : "completed");
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCheckInState("hidden");
    }
  }, [location.pathname, location.search, pledges]);

  const handleCheckInClick = () => {
    if (checkInState === "completed") {
      navigate("/daily-checkin");
      return;
    }
    const target = pledges.find(p => {
      const isCompletedToday = p.currentRun.events.some(
        e => e.date === new Date().toISOString().split('T')[0] && e.type === "success"
      );
      return !isCompletedToday;
    });
    if (target) {
      setCheckInTarget(target);
    }
  };

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
      <div className="relative flex items-center gap-3">
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
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-2xl rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20">
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
            
            {/* [추가] 체크인 버튼 - 메뉴와 새 약속 사이에 배치 */}
            {!isExpanded && (
              <AnimatePresence>
                {checkInState !== "hidden" && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30,
                    }}
                    className="overflow-hidden flex items-center"
                  >
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      onClick={handleCheckInClick}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-3 ml-1 transition-all active:scale-95 whitespace-nowrap",
                        checkInState === "active" && "bg-red-500 text-white shadow-lg shadow-red-500/20",
                        checkInState === "completed" && "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      )}
                    >
                      {checkInState === "active" && (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span className="text-[15px] font-black tracking-tight">체크인</span>
                        </>
                      )}
                      {checkInState === "completed" && (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span className="text-[15px] font-bold tracking-tight">완료됨</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* [의도] 메뉴가 축소되었을 때만 노출되는 퀵 액션 (새 약속 및 프로필) */}
            {!isExpanded && (
              <div className="flex items-center px-2 py-1 border-l border-border/50">
                <button 
                  onClick={() => setIsWizardOpen(true)}
                  className="px-4 py-2 text-[15px] font-bold text-foreground hover:bg-secondary rounded-full transition-colors whitespace-nowrap"
                >
                  {getQuickActionLabel()}
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
      </div>
    </nav>
  );
}
