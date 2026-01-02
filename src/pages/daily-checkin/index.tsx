import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Play,
  Users,
  Move
} from "lucide-react";
import { Button, Card, Textarea } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { usePledgeStore } from "@/entities/pledge";
import { post_checkin_complete } from "@/shared/api/mocks";
import type { Pledge } from "@/shared/types";

type SwipeDirection = "left" | "right" | "up" | "down" | null;

interface SwipeState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function DailyCheckinPage() {
  const navigate = useNavigate();
  const { pledges, fetchPledges } = usePledgeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reason, setReason] = useState("");
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPledges();
  }, [fetchPledges]);

  const currentPledge = pledges[currentIndex];
  const isLastCard = currentIndex >= pledges.length;

  const handleSwipeDirection = (direction: SwipeDirection) => {
    if (!direction || !currentPledge) return;

    if (direction === "left") {
      // 완료
      post_checkin_complete({ pledgeId: currentPledge.id, type: "success" });
      moveToNextCard();
    } else if (direction === "right" || direction === "up") {
      // 못함 - 사유 입력
      setShowReasonInput(true);
    } else if (direction === "down") {
      // 아직 모름
      post_checkin_complete({ pledgeId: currentPledge.id, type: "unknown" });
      moveToNextCard();
    }
  };

  const moveToNextCard = () => {
    setCurrentIndex((prev) => prev + 1);
    setReason("");
    setShowReasonInput(false);
  };

  const handleReasonSubmit = () => {
    if (currentPledge) {
      post_checkin_complete({ pledgeId: currentPledge.id, type: "skip", reason });
    }
    moveToNextCard();
  };

  // Touch/Mouse handlers
  const handleStart = (clientX: number, clientY: number) => {
    setSwipeState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
    });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!swipeState.isDragging) return;
    setSwipeState((prev) => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
    }));
  };

  const handleEnd = () => {
    if (!swipeState.isDragging) return;

    const deltaX = swipeState.currentX - swipeState.startX;
    const deltaY = swipeState.currentY - swipeState.startY;
    const threshold = 80;

    let direction: SwipeDirection = null;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > threshold) {
        direction = deltaX > 0 ? "right" : "left";
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        direction = deltaY > 0 ? "down" : "up";
      }
    }

    handleSwipeDirection(direction);

    setSwipeState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    });
  };

  const deltaX = swipeState.isDragging ? swipeState.currentX - swipeState.startX : 0;
  const deltaY = swipeState.isDragging ? swipeState.currentY - swipeState.startY : 0;

  const cardStyle = {
    transform: swipeState.isDragging ? `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.05}deg)` : "",
    transition: swipeState.isDragging ? "none" : "transform 0.3s ease",
  };

  // Opacity indicators
  const leftOpacity = Math.min(Math.abs(deltaX) / 100, 1) * (deltaX < -20 ? 1 : 0);
  const rightOpacity = Math.min(Math.abs(deltaX) / 100, 1) * (deltaX > 20 ? 1 : 0);
  const upOpacity = Math.min(Math.abs(deltaY) / 100, 1) * (deltaY < -20 ? 1 : 0);
  const downOpacity = Math.min(Math.abs(deltaY) / 100, 1) * (deltaY > 20 ? 1 : 0);

  // Dynamic background color based on swipe
  const getDynamicBg = () => {
    const distance = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    if (distance < 20) return { backgroundColor: "oklch(0.12 0 0)" };

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -50) return { backgroundColor: "oklch(0.35 0.06 150)" }; // Success
      if (deltaX > 50) return { backgroundColor: "oklch(0.35 0.06 25)" };   // Failure
    } else {
      if (deltaY < -50) return { backgroundColor: "oklch(0.35 0.06 260)" }; // Adjust
      if (deltaY > 50) return { backgroundColor: "oklch(0.35 0.02 0)" };    // Later
    }
    return { backgroundColor: "oklch(0.12 0 0)" };
  };

  // 완료 화면
  if (isLastCard) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <div className="max-w-md space-y-6 px-6 text-center animate-fade-in">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-breathe">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">오늘의 체크인 완료</h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              오늘도 당신의 리듬을 확인했어요. 미끄러진 순간이 있어도 괜찮아요, 다시 맞춰가면 됩니다.
            </p>
          </div>
          <Button size="xl" className="w-full rounded-full" onClick={() => navigate("/home")}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 사유 입력 화면
  if (showReasonInput && currentPledge) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col bg-background"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <header className="flex items-center justify-between border-b border-border/40 px-4 py-4 safe-area-top">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setShowReasonInput(false);
              setReason("");
            }}
          >
            <X className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium text-foreground">무슨 일이 있었나요?</h2>
          <div className="w-10" />
        </header>

        <main className="flex-1 overflow-auto px-4 py-6">
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <Card className="border-border/60 bg-card p-5">
              <h3 className="mb-2 font-medium text-card-foreground">{currentPledge.title}</h3>
              <p className="text-sm text-muted-foreground">{currentPledge.meaning}</p>
            </Card>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">어떤 일이 있었는지 이야기해주세요</label>
              <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                자책하지 않아도 돼요. 이 정보는 나중에 당신의 패턴을 이해하고, 더 나은 약속을 설계하는 데 도움이 됩니다.
              </p>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="예: 어제 늦게 자서 피곤했어요"
                className="min-h-32"
              />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">또는 빠른 선택</p>
                <div className="flex flex-wrap gap-2">
                  {["예상치 못한 일정", "컨디션 난조", "동기 부족", "환경 변화", "기타"].map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className={cn("rounded-full", reason === option && "bg-primary text-primary-foreground")}
                      onClick={() => setReason(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="border-t border-border/40 px-4 py-6 safe-area-bottom">
          <Button
            size="xl"
            className="w-full rounded-full"
            disabled={!reason.trim()}
            onClick={handleReasonSubmit}
          >
            기록하고 다음으로
          </Button>
        </div>
      </div>
    );
  }

  if (!currentPledge) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col transition-colors duration-500 bg-dot-matrix"
      style={getDynamicBg()}
    >
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 safe-area-top z-30">
        <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white" onClick={() => navigate(-1)}>
          <X className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h2 className="text-lg font-medium text-white">오늘의 체크인</h2>
          <p className="text-sm text-white/50">
            {currentIndex + 1} / {pledges.length}
          </p>
        </div>
        <div className="w-10" />
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
        {/* Swipeable Card */}
        <div
          ref={cardRef}
          className="relative z-10 w-full max-w-sm touch-none select-none"
          style={cardStyle}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleEnd}
        >
          <Card
            className={cn(
              "overflow-hidden shadow-2xl border-none bg-white rounded-[48px]",
              currentPledge.shareWith !== "myself" && "ring-4 ring-primary/20"
            )}
          >
            <div className="p-10 flex flex-col items-center text-center">
              {/* Shared pledge indicator */}
              {currentPledge.shareWith !== "myself" && (
                <div className="mb-6 flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Shared Rhythm</span>
                </div>
              )}
              <div className="mb-8 w-full">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 animate-pulse">
                  <Move className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="mb-4 text-[32px] font-black leading-tight text-foreground">{currentPledge.title}</h3>
                <p className="text-[17px] text-muted-foreground font-medium leading-relaxed">{currentPledge.meaning}</p>
              </div>

              <div className="w-full space-y-3 rounded-3xl bg-slate-50 p-6">
                <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">오늘의 행동</p>
                <p className="text-[16px] text-slate-600 font-medium leading-relaxed">{currentPledge.action}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 액션 인디케이터 (카드 위로 오버랩되는 레이어) */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden flex items-center justify-center">
          {/* Success - Left Swipe */}
          <div 
            style={{ 
              opacity: leftOpacity, 
              transform: `translate(calc(-50% + ${deltaX * 0.2}px), -50%)`,
              left: '25%' 
            }}
            className="absolute top-1/2 flex flex-col items-center gap-4 transition-all duration-200"
          >
            <div className="w-24 h-24 rounded-full bg-emerald-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
              <CheckCircle className="text-white w-12 h-12 stroke-[2.5]" />
            </div>
            <span className="px-6 py-2 rounded-full bg-emerald-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
              SUCCESS
            </span>
          </div>

          {/* Failure - Right Swipe */}
          <div 
            style={{ 
              opacity: rightOpacity, 
              transform: `translate(calc(50% + ${deltaX * 0.2}px), -50%)`,
              right: '25%' 
            }}
            className="absolute top-1/2 flex flex-col items-center gap-4 transition-all duration-200"
          >
            <div className="w-24 h-24 rounded-full bg-rose-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
              <AlertCircle className="text-white w-12 h-12 stroke-[2.5]" />
            </div>
            <span className="px-6 py-2 rounded-full bg-rose-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
              FAILURE
            </span>
          </div>

          {/* Adjust - Up Swipe */}
          <div 
            style={{ 
              opacity: upOpacity, 
              transform: `translate(-50%, calc(-50% + ${deltaY * 0.2}px))`,
              top: '25%' 
            }}
            className="absolute left-1/2 flex flex-col items-center gap-4 transition-all duration-200"
          >
            <div className="w-24 h-24 rounded-full bg-violet-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
              <Settings className="text-white w-12 h-12 stroke-[2]" />
            </div>
            <span className="px-6 py-2 rounded-full bg-violet-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
              ADJUST
            </span>
          </div>

          {/* Later - Down Swipe */}
          <div 
            style={{ 
              opacity: downOpacity, 
              transform: `translate(-50%, calc(50% + ${deltaY * 0.2}px))`,
              bottom: '25%' 
            }}
            className="absolute left-1/2 flex flex-col items-center gap-4 transition-all duration-200"
          >
            <div className="w-24 h-24 rounded-full bg-slate-500/90 backdrop-blur-md flex items-center justify-center shadow-2xl border-4 border-white/20">
              <HelpCircle className="text-white w-12 h-12 stroke-[2]" />
            </div>
            <span className="px-6 py-2 rounded-full bg-slate-500/90 backdrop-blur-md text-[20px] font-black text-white uppercase tracking-tighter shadow-2xl border border-white/20">
              LATER
            </span>
          </div>
        </div>
      </main>

      {/* Instructions */}
      <div className="border-t border-white/10 bg-black/20 px-4 py-8 backdrop-blur-sm safe-area-bottom z-30">
        <div className="mx-auto max-w-md space-y-6">
          <p className="text-center text-[13px] font-bold text-white/40 uppercase tracking-[0.2em]">Swipe to record rhythm</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/5 py-4 border border-white/5">
              <ChevronLeft className="h-5 w-5 text-emerald-400" />
              <span className="text-[14px] font-bold text-white/80">SUCCESS</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/5 py-4 border border-white/5">
              <ChevronRight className="h-5 w-5 text-rose-400" />
              <span className="text-[14px] font-bold text-white/80">FAILURE</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/5 py-4 border border-white/5">
              <ChevronUp className="h-5 w-5 text-violet-400" />
              <span className="text-[14px] font-bold text-white/80">ADJUST</span>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/5 py-4 border border-white/5">
              <ChevronDown className="h-5 w-5 text-slate-400" />
              <span className="text-[14px] font-bold text-white/80">LATER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

