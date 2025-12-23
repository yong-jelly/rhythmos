"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  X,
  TrendingUp,
  RotateCcw,
  Calendar,
  Target,
  Heart,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"

interface PledgeDetailProps {
  onClose: () => void
}

export function PledgeDetail({ onClose }: PledgeDetailProps) {
  const [showFullMeaning, setShowFullMeaning] = useState(false)
  const [showFullHistory, setShowFullHistory] = useState(false)
  const [showRepairDetails, setShowRepairDetails] = useState(false)

  // Mock data
  const pledge = {
    title: "아침 7시에 일어나기",
    meaning: "하루를 내 의지로 시작하고 싶어요. 아침에 여유 있게 커피를 마시며 하루를 계획하는 시간이 필요해요.",
    fullMeaning:
      "하루를 내 의지로 시작하고 싶어요. 아침에 여유 있게 커피를 마시며 하루를 계획하는 시간이 필요해요. 최근 몇 달간 늦게 일어나면서 하루 종일 쫓기는 느낌이었어요. 아침의 고요함 속에서 나 자신과 만나는 시간을 되찾고 싶습니다.",
    action: "알람이 울리면 일어나서 창문을 열고 물 한 잔 마시기",
    schedule: "매일 아침 7시",
    duration: "14일",
    currentDay: 5,
    totalDays: 14,
    startDate: "2024년 12월 18일",
    completedDays: 5,
    slippedDays: 2,
    recoveries: 2,
    currentStreak: 3,
    longestStreak: 4,
  }

  const stats = [
    { label: "완료", value: pledge.completedDays, color: "text-primary" },
    { label: "미끄러짐", value: pledge.slippedDays, color: "text-chart-2" },
    { label: "회복", value: pledge.recoveries, color: "text-chart-3" },
    { label: "현재 연속", value: `${pledge.currentStreak}일`, color: "text-chart-4" },
  ]

  const timeline = [
    {
      date: "12/18",
      day: 1,
      type: "start",
      note: "새로운 리듬 시작",
      icon: Sparkles,
      color: "primary",
    },
    {
      date: "12/19",
      day: 2,
      type: "completed",
      note: "창밖에 눈이 내렸다. 물 한 잔을 마시며 조용한 아침을 느꼈다.",
      icon: CheckCircle2,
      color: "primary",
    },
    {
      date: "12/20",
      day: 3,
      type: "completed",
      note: "어제보다 쉽게 일어날 수 있었다.",
      icon: CheckCircle2,
      color: "primary",
    },
    {
      date: "12/21",
      day: 4,
      type: "slipped",
      note: "늦게까지 일을 했더니 알람을 듣지 못했다.",
      icon: AlertCircle,
      color: "chart-2",
    },
    {
      date: "12/22",
      day: 5,
      type: "repair",
      note: "규칙 조정: 전날 밤 11시 이전에 잠들기로 함께 약속",
      icon: RotateCcw,
      color: "chart-3",
    },
    {
      date: "12/23",
      day: 6,
      type: "completed",
      note: "다시 일어났다. 아침이 주는 평화를 기억했다.",
      icon: CheckCircle2,
      color: "primary",
    },
  ]

  const repairs = [
    {
      date: "12/22",
      reason: "늦게까지 일을 했더니 알람을 듣지 못했다",
      adjustment: "전날 밤 11시 이전에 잠들기로 함께 약속",
      feeling: "조금 좌절했지만, 괜찮다고 생각했다",
      pattern: "업무 마감일이 있으면 늦게까지 일하는 패턴",
    },
    {
      date: "12/16",
      reason: "친구들과 늦게까지 있었다",
      adjustment: "약속 다음날은 조금 늦게 일어나도 괜찮다는 예외 규칙 추가",
      feeling: "특별한 날도 있어야 한다고 받아들임",
      pattern: "사회적 약속과 충돌",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-foreground">약속 상세</h1>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6">
        {/* Title and Progress */}
        <div className="mb-6">
          <h2 className="mb-3 text-pretty text-2xl font-semibold tracking-tight text-foreground">{pledge.title}</h2>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{pledge.schedule}</span>
            <span className="text-border">•</span>
            <span>
              {pledge.currentDay}/{pledge.totalDays}일째
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(pledge.currentDay / pledge.totalDays) * 100}%` }}
            />
          </div>

          <p className="text-sm text-muted-foreground">{pledge.startDate}부터 시작</p>
        </div>

        {/* Stats Grid - Compact Histogram Style */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">이번 회차 통계</h3>
          <div className="grid grid-cols-4 gap-2">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border/60 bg-card p-3">
                <div className="text-center">
                  <div className={`mb-1 text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Meaning - Collapsible */}
        <Card className="mb-6 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">이 약속의 의미</h3>
            </div>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
              {showFullMeaning ? pledge.fullMeaning : pledge.meaning}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 h-8 gap-1 text-primary"
              onClick={() => setShowFullMeaning(!showFullMeaning)}
            >
              {showFullMeaning ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span className="text-xs">접기</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-xs">전체 보기</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Action */}
        <Card className="mb-6 border-border/60 bg-card">
          <div className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-chart-4" />
              <h3 className="font-medium text-foreground">구체적인 행동</h3>
            </div>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{pledge.action}</p>
          </div>
        </Card>

        {/* Recovery History - Collapsible */}
        {repairs.length > 0 && (
          <Card className="mb-6 border-chart-3/30 bg-gradient-to-br from-chart-3/5 to-transparent">
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-chart-3" />
                  <h3 className="font-medium text-foreground">회복 기록</h3>
                </div>
                <span className="text-sm font-medium text-chart-3">{repairs.length}회</span>
              </div>

              <div className="space-y-3">
                {repairs.slice(0, showRepairDetails ? repairs.length : 1).map((repair, index) => (
                  <div key={index} className="rounded-lg border border-chart-3/20 bg-background/50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-chart-3">{repair.date}</span>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-foreground">미끄러진 이유:</span>
                        <p className="text-pretty text-muted-foreground">{repair.reason}</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">규칙 조정:</span>
                        <p className="text-pretty text-muted-foreground">{repair.adjustment}</p>
                      </div>
                      {showRepairDetails && (
                        <>
                          <div>
                            <span className="font-medium text-foreground">그때 느낌:</span>
                            <p className="text-pretty text-muted-foreground">{repair.feeling}</p>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">발견한 패턴:</span>
                            <p className="text-pretty text-muted-foreground">{repair.pattern}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {repairs.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 h-8 w-full gap-1 text-chart-3"
                  onClick={() => setShowRepairDetails(!showRepairDetails)}
                >
                  {showRepairDetails ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span className="text-xs">접기</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span className="text-xs">모든 회복 기록 보기 ({repairs.length - 1}개 더)</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Timeline - Collapsible */}
        <Card className="mb-6 border-border/60 bg-card">
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground">여정 타임라인</h3>
              </div>
              <span className="text-sm text-muted-foreground">{timeline.length}개 기록</span>
            </div>

            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

              {timeline.slice(0, showFullHistory ? timeline.length : 3).map((event, index) => {
                const Icon = event.icon
                const colorClass = `text-${event.color}`
                const bgClass = `bg-${event.color}/10`
                const borderClass = `border-${event.color}/30`

                return (
                  <div key={index} className="relative flex gap-4">
                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bgClass} border ${borderClass}`}
                    >
                      <Icon className={`h-4 w-4 ${colorClass}`} />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{event.date}</span>
                        <span className="text-xs text-muted-foreground">Day {event.day}</span>
                      </div>
                      <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{event.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {timeline.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 w-full gap-1 text-primary"
                onClick={() => setShowFullHistory(!showFullHistory)}
              >
                {showFullHistory ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span className="text-xs">접기</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span className="text-xs">전체 여정 보기 ({timeline.length - 3}개 더)</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>

        {/* Memory Highlights */}
        <Card className="mb-6 border-border/60 bg-card">
          <div className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-chart-5" />
              <h3 className="font-medium text-foreground">기억의 순간들</h3>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                <p className="mb-2 text-pretty text-sm italic text-muted-foreground leading-relaxed">
                  "창밖에 눈이 내렸다. 물 한 잔을 마시며 조용한 아침을 느꼈다."
                </p>
                <span className="text-xs text-muted-foreground">12/19</span>
              </div>
              <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
                <p className="mb-2 text-pretty text-sm italic text-muted-foreground leading-relaxed">
                  "다시 일어났다. 아침이 주는 평화를 기억했다."
                </p>
                <span className="text-xs text-muted-foreground">12/23</span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
