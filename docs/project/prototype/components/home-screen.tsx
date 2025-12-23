"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Heart, RotateCcw, Users, TrendingUp, Archive, AlertCircle, Play, Sparkles, Home } from "lucide-react"
import { PledgeWizard } from "./pledge-wizard"
import { CompletedPledges } from "./completed-pledges"
import { RepairFlow } from "./repair-flow"
import { DailyCheckin } from "./daily-checkin"
import { PledgeDetail } from "./pledge-detail"
import { FamilyCircle } from "./family-circle"
import { MyJourney } from "./my-journey"

type UserState = "returning" | "active" | "new"
type NavigationView = "home" | "journey" | "circle" | "archives"

export function HomeScreen() {
  const [userState] = useState<UserState>("returning")
  const [showWelcome, setShowWelcome] = useState(userState === "returning")
  const [showWizard, setShowWizard] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showRepair, setShowRepair] = useState(false)
  const [showDailyCheckin, setShowDailyCheckin] = useState(false)
  const [showPledgeDetail, setShowPledgeDetail] = useState(false)
  const [showFamilyCircle, setShowFamilyCircle] = useState(false)
  const [currentView, setCurrentView] = useState<NavigationView>("home")
  const [showMyJourney, setShowMyJourney] = useState(false)

  if (showWizard) {
    return <PledgeWizard onClose={() => setShowWizard(false)} />
  }

  if (showCompleted) {
    return <CompletedPledges onClose={() => setShowCompleted(false)} />
  }

  if (showRepair) {
    return <RepairFlow onClose={() => setShowRepair(false)} />
  }

  if (showDailyCheckin) {
    return <DailyCheckin onClose={() => setShowDailyCheckin(false)} />
  }

  if (showPledgeDetail) {
    return <PledgeDetail onClose={() => setShowPledgeDetail(false)} />
  }

  if (showFamilyCircle) {
    return <FamilyCircle onClose={() => setShowFamilyCircle(false)} />
  }

  if (showMyJourney) {
    return <MyJourney onClose={() => setShowMyJourney(false)} />
  }

  if (showWelcome && userState === "returning") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground">돌아왔네요</h1>
            <p className="text-pretty text-muted-foreground leading-relaxed">
              한동안 못 봤어요. 무슨 일이 있었나요? 괜찮아요. 여기는 언제든 다시 시작할 수 있는 곳이에요.
            </p>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="h-12 w-full rounded-full" onClick={() => setShowWelcome(false)}>
              <RotateCcw className="mr-2 h-5 w-5" />
              리듬 다시 맞추기
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-full rounded-full"
              onClick={() => setShowWelcome(false)}
            >
              천천히 둘러보기
            </Button>
          </div>

          <p className="text-pretty text-sm text-muted-foreground">
            지금까지 <span className="font-semibold text-primary">7번</span> 돌아왔어요. 이게 진짜 지속이에요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">리듬</h1>
            <p className="text-sm text-muted-foreground">오늘도 당신의 속도로</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowDailyCheckin(true)}>
              <Play className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowCompleted(true)}>
              <Archive className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        {/* Repair Prompt for Slipped Pledges */}
        <Card className="mb-6 overflow-hidden border-chart-2/30 bg-gradient-to-br from-chart-2/5 to-transparent">
          <div className="p-5">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-2/20">
                <AlertCircle className="h-5 w-5 text-chart-2" />
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">리듬이 흔들렸어요</p>
                <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                  "아침 7시에 일어나기"를 3일 동안 지키지 못했어요. 무슨 일이 있었나요?
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full border-chart-2/30 bg-background/50"
              onClick={() => setShowRepair(true)}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              리듬 다시 맞추기
            </Button>
          </div>
        </Card>

        {/* Today's Focus - Single Next Action */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-medium text-foreground">오늘의 다음 행동</h2>
          <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">아침 7시에 일어나기</h3>
                  <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                    내일 아침, 알람이 울리면 창문을 열고 물 한 잔 마시기
                  </p>
                </div>
              </div>
              <Button size="lg" className="h-12 w-full rounded-full" onClick={() => setShowDailyCheckin(true)}>
                <Play className="mr-2 h-5 w-5" />
                체크인 시작하기
              </Button>
            </div>
          </Card>
        </div>

        {/* Active Promises */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-foreground">진행 중인 약속</h3>
            <span className="text-sm text-muted-foreground">2개</span>
          </div>

          <div className="space-y-3">
            <Card
              className="cursor-pointer overflow-hidden border-border/60 bg-card transition-colors hover:border-primary/30"
              onClick={() => setShowPledgeDetail(true)}
            >
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium text-card-foreground">아침 7시에 일어나기</h4>
                    <p className="text-sm text-muted-foreground">14일 중 5일째</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: "35%" }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">이번 회차 시작: 12/18</span>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="h-3 w-3 text-chart-2" />
                    <span className="text-xs font-medium text-chart-2">귀환 2회</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className="cursor-pointer overflow-hidden border-border/60 bg-card transition-colors hover:border-primary/30"
              onClick={() => setShowPledgeDetail(true)}
            >
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1 font-medium text-card-foreground">저녁 8시 이후 간식 줄이기</h4>
                    <p className="text-sm text-muted-foreground">14일 중 3일째</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                    <TrendingUp className="h-5 w-5 text-chart-2" />
                  </div>
                </div>

                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-chart-2 transition-all" style={{ width: "21%" }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">이번 회차 시작: 12/20</span>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="h-3 w-3 text-chart-2" />
                    <span className="text-xs font-medium text-chart-2">귀환 1회</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-base font-medium text-foreground">리듬 상태</h3>
          <Card className="border-border/60 bg-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-card-foreground">조용히 흐르는 중</p>
                <p className="text-sm text-muted-foreground">이번 주 7번의 약속을 지켰어요</p>
              </div>
            </div>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
              당신만의 속도를 찾아가고 있어요. 미끄러진 날도 다시 리듬을 맞췄다는 것이 중요합니다.
            </p>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-base font-medium text-foreground">이번 주 기억</h3>
          <Card className="border-border/60 bg-card p-5">
            <p className="mb-3 text-pretty text-sm italic text-muted-foreground leading-relaxed">
              "아침에 일어나니 창밖에 눈이 내리고 있었다. 물 한 잔을 마시며 조용한 아침을 느꼈다."
            </p>
            <p className="text-xs text-muted-foreground">12/21, 아침 일찍 일어나기</p>
          </Card>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-around px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex h-auto flex-col gap-1 rounded-xl px-4 py-2 ${
              currentView === "home" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
            onClick={() => setCurrentView("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">홈</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex h-auto flex-col gap-1 rounded-xl px-4 py-2 ${
              currentView === "journey" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
            onClick={() => {
              setCurrentView("journey")
              setShowMyJourney(true)
            }}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-medium">여정</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex h-auto flex-col gap-1 rounded-xl px-4 py-2 ${
              currentView === "circle" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
            onClick={() => {
              setCurrentView("circle")
              setShowFamilyCircle(true)
            }}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">서클</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex h-auto flex-col gap-1 rounded-xl px-4 py-2 ${
              currentView === "archives" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
            onClick={() => {
              setCurrentView("archives")
              setShowCompleted(true)
            }}
          >
            <Archive className="h-5 w-5" />
            <span className="text-xs font-medium">기록실</span>
          </Button>
        </div>

        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <Button size="lg" className="h-16 w-16 rounded-full shadow-lg" onClick={() => setShowWizard(true)}>
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </div>
  )
}
