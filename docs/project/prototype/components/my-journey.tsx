"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Sparkles, TrendingUp, Heart, RotateCcw, ChevronDown, Calendar, Users } from "lucide-react"

interface JourneyEvent {
  id: string
  type: "start" | "slip" | "repair" | "milestone" | "identity_shift" | "family_moment"
  date: string
  title: string
  description: string
  emotion?: string
  pledgeName?: string
  familyMembers?: Array<{ name: string; avatar: string }>
}

const mockJourneyEvents: JourneyEvent[] = [
  {
    id: "1",
    type: "start",
    date: "2024-12-18",
    title: "새로운 약속을 시작했어요",
    description: "아침 7시에 일어나기 - 더 건강한 삶을 살고 싶어서",
    pledgeName: "아침 7시에 일어나기",
  },
  {
    id: "2",
    type: "milestone",
    date: "2024-12-20",
    title: "첫 3일을 완주했어요",
    description: "처음엔 힘들었지만, 아침의 고요함을 느끼기 시작했어요",
    emotion: "뿌듯함",
    pledgeName: "아침 7시에 일어나기",
  },
  {
    id: "3",
    type: "family_moment",
    date: "2024-12-21",
    title: "가족이 응원을 보냈어요",
    description: "딸이 '엄마 대단해요!'라는 메시지를 남겼어요",
    pledgeName: "아침 7시에 일어나기",
    familyMembers: [{ name: "지우", avatar: "👧" }],
  },
  {
    id: "4",
    type: "slip",
    date: "2024-12-22",
    title: "리듬이 흔들렸어요",
    description: "늦게까지 일하다 보니 알람을 끄고 다시 잤어요",
    emotion: "지침",
    pledgeName: "아침 7시에 일어나기",
  },
  {
    id: "5",
    type: "repair",
    date: "2024-12-22",
    title: "다시 리듬을 맞췄어요",
    description: "밤 11시 이전에 자는 것을 새로운 규칙으로 추가했어요",
    pledgeName: "아침 7시에 일어나기",
  },
  {
    id: "6",
    type: "identity_shift",
    date: "2024-12-23",
    title: "정체성의 변화를 느꼈어요",
    description: "'아침형 인간이 되고 싶은 사람'에서 '아침을 즐기는 사람'으로",
    pledgeName: "아침 7시에 일어나기",
  },
]

const getEventIcon = (type: JourneyEvent["type"]) => {
  switch (type) {
    case "start":
      return <Sparkles className="h-5 w-5" />
    case "milestone":
      return <TrendingUp className="h-5 w-5" />
    case "slip":
      return <Heart className="h-5 w-5" />
    case "repair":
      return <RotateCcw className="h-5 w-5" />
    case "identity_shift":
      return <Sparkles className="h-5 w-5" />
    case "family_moment":
      return <Users className="h-5 w-5" />
  }
}

const getEventColor = (type: JourneyEvent["type"]) => {
  switch (type) {
    case "start":
      return "primary"
    case "milestone":
      return "chart-1"
    case "slip":
      return "chart-2"
    case "repair":
      return "chart-5"
    case "identity_shift":
      return "chart-4"
    case "family_moment":
      return "chart-3"
  }
}

export function MyJourney({ onClose }: { onClose: () => void }) {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">나의 여정</h1>
            <p className="text-sm text-muted-foreground">당신이 걸어온 길</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-6">
        {/* Journey Philosophy */}
        <Card className="mb-6 overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">여정의 의미</h3>
            </div>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
              당신의 여정은 완벽한 직선이 아닙니다. 미끄러지고, 다시 일어서고, 방향을 조정하는 모든 순간이 당신을
              만들어갑니다. 이 기록은 성공의 증명이 아니라,{" "}
              <span className="font-medium text-foreground">존재의 증명</span>
              입니다.
            </p>
          </div>
        </Card>

        {/* Year Selector */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium text-foreground">{selectedYear}년</h3>
          </div>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Journey Stats Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">시작한 약속</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-1">5</p>
            <p className="text-xs text-muted-foreground">완주한 여정</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-2">18</p>
            <p className="text-xs text-muted-foreground">미끄러진 순간</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-5">18</p>
            <p className="text-xs text-muted-foreground">다시 일어선 순간</p>
          </Card>
        </div>

        {/* Identity Evolution */}
        <div className="mb-6">
          <h3 className="mb-4 text-base font-medium text-foreground">정체성의 진화</h3>
          <Card className="border-border/60 bg-card p-5">
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">2024년 초</p>
                <p className="text-sm text-foreground">"아침형 인간이 되고 싶은 사람"</p>
              </div>
              <div className="flex justify-center">
                <div className="h-8 w-px bg-gradient-to-b from-muted via-primary to-muted" />
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">현재</p>
                <p className="font-medium text-foreground">"아침을 즐기는 사람"</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="mb-4 text-base font-medium text-foreground">시간의 흐름</h3>
          <div className="relative space-y-4">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-0 w-px bg-gradient-to-b from-primary via-muted to-transparent" />

            {mockJourneyEvents.map((event, index) => {
              const color = getEventColor(event.type)
              const isExpanded = expandedEvent === event.id

              return (
                <div key={event.id} className="relative pl-14">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-${color}`}
                  >
                    <div className="h-2 w-2 rounded-full bg-background" />
                  </div>

                  {/* Event card */}
                  <Card
                    className={`cursor-pointer overflow-hidden border-border/60 bg-card transition-all hover:border-${color}/30`}
                    onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  >
                    <div className="p-4">
                      <div className="mb-2 flex items-start gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-${color}/10`}
                        >
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <h4 className="font-medium text-foreground">{event.title}</h4>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {new Date(event.date).toLocaleDateString("ko-KR", {
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="mt-4 space-y-3 border-t border-border/40 pt-4">
                          {event.pledgeName && (
                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">관련 약속</p>
                              <p className="text-sm text-foreground">{event.pledgeName}</p>
                            </div>
                          )}
                          {event.emotion && (
                            <div>
                              <p className="mb-1 text-xs font-medium text-muted-foreground">그때의 감정</p>
                              <p className="text-sm text-foreground">{event.emotion}</p>
                            </div>
                          )}
                          {event.familyMembers && event.familyMembers.length > 0 && (
                            <div>
                              <p className="mb-2 text-xs font-medium text-muted-foreground">함께한 사람들</p>
                              <div className="flex items-center gap-2">
                                {event.familyMembers.map((member, i) => (
                                  <div key={i} className="flex items-center gap-1.5">
                                    <span className="text-lg">{member.avatar}</span>
                                    <span className="text-sm text-foreground">{member.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reflection Prompt */}
        <Card className="border-chart-4/30 bg-gradient-to-br from-chart-4/5 to-transparent">
          <div className="p-6">
            <h3 className="mb-3 font-semibold text-foreground">이 여정을 돌아보며</h3>
            <p className="mb-4 text-pretty text-sm text-muted-foreground leading-relaxed">
              지난 시간을 되돌아보면, 어떤 생각이 드나요? 이 여정이 당신에게 무엇을 가르쳐주었나요?
            </p>
            <Button variant="outline" className="w-full rounded-full bg-transparent">
              회고 작성하기
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
