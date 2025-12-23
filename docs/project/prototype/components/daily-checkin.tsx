"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"

interface Pledge {
  id: string
  title: string
  meaning: string
  action: string
  isShared?: boolean
}

interface SwipeState {
  isDragging: boolean
  startX: number
  startY: number
  currentX: number
  currentY: number
}

type SwipeDirection = "left" | "right" | "up" | "down" | null

export function DailyCheckin({ onClose }: { onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showReasonInput, setShowReasonInput] = useState(false)
  const [reason, setReason] = useState("")
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })
  const cardRef = useRef<HTMLDivElement>(null)

  // Mock pledges
  const pledges: Pledge[] = [
    {
      id: "1",
      title: "아침 7시에 일어나기",
      meaning: "하루를 여유롭게 시작하고 싶어서",
      action: "알람이 울리면 창문을 열고 물 한 잔 마시기",
      isShared: false,
    },
    {
      id: "2",
      title: "저녁 8시 이후 가족 시간",
      meaning: "가족과 함께 시간을 보내고 싶어서",
      action: "저녁 8시 이후 가족과 대화하기",
      isShared: true,
    },
  ]

  const currentPledge = pledges[currentIndex]
  const isLastCard = currentIndex >= pledges.length

  const handleSwipeDirection = (direction: SwipeDirection) => {
    if (!direction) return

    if (direction === "left") {
      // 완료
      console.log("[v0] Completed:", currentPledge.title)
      moveToNextCard()
    } else if (direction === "right" || direction === "up") {
      // 못함 - 사유 입력
      setShowReasonInput(true)
    } else if (direction === "down") {
      // 아직 모름
      console.log("[v0] Not sure yet:", currentPledge.title)
      moveToNextCard()
    }
  }

  const moveToNextCard = () => {
    setCurrentIndex((prev) => prev + 1)
    setReason("")
    setShowReasonInput(false)
  }

  const handleReasonSubmit = () => {
    console.log("[v0] Skipped with reason:", currentPledge.title, reason)
    moveToNextCard()
  }

  // Touch/Mouse handlers
  const handleStart = (clientX: number, clientY: number) => {
    setSwipeState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
    })
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!swipeState.isDragging) return
    setSwipeState((prev) => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
    }))
  }

  const handleEnd = () => {
    if (!swipeState.isDragging) return

    const deltaX = swipeState.currentX - swipeState.startX
    const deltaY = swipeState.currentY - swipeState.startY
    const threshold = 80

    let direction: SwipeDirection = null

    // Determine direction based on larger delta
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        direction = deltaX > 0 ? "right" : "left"
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        direction = deltaY > 0 ? "down" : "up"
      }
    }

    handleSwipeDirection(direction)

    setSwipeState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    })
  }

  const deltaX = swipeState.isDragging ? swipeState.currentX - swipeState.startX : 0
  const deltaY = swipeState.isDragging ? swipeState.currentY - swipeState.startY : 0

  const cardStyle = {
    transform: swipeState.isDragging ? `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)` : "",
    transition: swipeState.isDragging ? "none" : "transform 0.3s ease",
  }

  // Show opacity indicators based on swipe direction
  const leftOpacity = Math.min(Math.abs(deltaX) / 150, 1) * (deltaX < 0 ? 1 : 0)
  const rightOpacity = Math.min(Math.abs(deltaX) / 150, 1) * (deltaX > 0 ? 1 : 0)
  const upOpacity = Math.min(Math.abs(deltaY) / 150, 1) * (deltaY < 0 ? 1 : 0)
  const downOpacity = Math.min(Math.abs(deltaY) / 150, 1) * (deltaY > 0 ? 1 : 0)

  if (isLastCard) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        <div className="max-w-md space-y-6 px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">오늘의 체크인 완료</h2>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              오늘도 당신의 리듬을 확인했어요. 미끄러진 순간이 있어도 괜찮아요, 다시 맞춰가면 됩니다.
            </p>
          </div>
          <Button size="lg" className="h-12 w-full rounded-full" onClick={onClose}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  if (showReasonInput) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        <header className="flex items-center justify-between border-b border-border/40 px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setShowReasonInput(false)
              setReason("")
            }}
          >
            <X className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium text-foreground">무슨 일이 있었나요?</h2>
          <div className="w-10" />
        </header>

        <main className="flex-1 overflow-auto px-6 py-6">
          <div className="mx-auto max-w-md space-y-6">
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
                className="min-h-32 resize-none rounded-2xl"
              />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">또는 빠른 선택</p>
                <div className="flex flex-wrap gap-2">
                  {["예상치 못한 일정", "컨디션 난조", "동기 부족", "환경 변화", "기타"].map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
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

        <div className="border-t border-border/40 px-6 py-6">
          <Button size="lg" className="h-12 w-full rounded-full" disabled={!reason.trim()} onClick={handleReasonSubmit}>
            기록하고 다음으로
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border/40 px-6 py-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <h2 className="text-lg font-medium text-foreground">오늘의 체크인</h2>
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} / {pledges.length}
          </p>
        </div>
        <div className="w-10" />
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
        {/* Swipe indicators */}
        <div
          className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 transition-opacity"
          style={{ opacity: leftOpacity }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <p className="mt-2 text-center text-sm font-medium text-primary">완료</p>
        </div>

        <div
          className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 transition-opacity"
          style={{ opacity: rightOpacity }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/20 backdrop-blur-sm">
            <AlertCircle className="h-10 w-10 text-chart-2" />
          </div>
          <p className="mt-2 text-center text-sm font-medium text-chart-2">못함</p>
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 transition-opacity"
          style={{ opacity: upOpacity }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chart-2/20 backdrop-blur-sm">
            <AlertCircle className="h-10 w-10 text-chart-2" />
          </div>
          <p className="mt-2 text-center text-sm font-medium text-chart-2">못함</p>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity"
          style={{ opacity: downOpacity }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 backdrop-blur-sm">
            <HelpCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="mt-2 text-center text-sm font-medium text-muted-foreground">아직 모름</p>
        </div>

        {/* Swipeable Card */}
        <div
          ref={cardRef}
          className="w-full max-w-sm touch-none select-none"
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
            className={`overflow-hidden ${
              currentPledge.isShared
                ? "border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-xl"
                : "border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent shadow-xl"
            }`}
          >
            <div className="p-8">
              {/* Shared pledge indicator */}
              {currentPledge.isShared && (
                <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-primary/10 py-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">가족과 함께하는 약속</span>
                </div>
              )}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">{currentPledge.title}</h3>
                <p className="text-pretty text-muted-foreground leading-relaxed">{currentPledge.meaning}</p>
              </div>

              <div className="space-y-3 rounded-2xl bg-background/50 p-4">
                <p className="text-sm font-medium text-foreground">오늘의 행동</p>
                <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{currentPledge.action}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Instructions */}
      <div className="border-t border-border/40 bg-background/80 px-6 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-md space-y-4">
          <p className="text-center text-sm font-medium text-foreground">카드를 스와이프해서 체크하세요</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-primary/5 p-3">
              <ChevronLeft className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">완료</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-chart-2/5 p-3">
              <ChevronRight className="h-5 w-5 text-chart-2" />
              <span className="text-sm text-foreground">못함</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-chart-2/5 p-3">
              <ChevronUp className="h-5 w-5 text-chart-2" />
              <span className="text-sm text-foreground">못함</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">아직 모름</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
