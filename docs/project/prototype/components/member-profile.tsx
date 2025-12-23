"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Heart, MessageCircle, TrendingUp, Sparkles, Calendar, ChevronDown } from "lucide-react"

interface RelationshipMoment {
  id: string
  type: "encouragement" | "shared_pledge" | "milestone_support" | "breakthrough"
  date: string
  title: string
  description: string
  pledgeName?: string
  message?: string
}

const mockRelationshipHistory: RelationshipMoment[] = [
  {
    id: "1",
    type: "shared_pledge",
    date: "2024-12-18",
    title: "함께 약속을 시작했어요",
    description: "아침 운동하기를 같이 시작하기로 했어요",
    pledgeName: "아침 운동하기",
  },
  {
    id: "2",
    type: "encouragement",
    date: "2024-12-21",
    title: "응원 메시지를 보냈어요",
    description: "엄마가 힘들어할 때 용기를 줬어요",
    message: "엄마 대단해요! 오늘도 함께 해요 💪",
  },
  {
    id: "3",
    type: "milestone_support",
    date: "2024-12-23",
    title: "이정표를 함께 축하했어요",
    description: "엄마의 첫 7일 완주를 함께 기뻐했어요",
  },
  {
    id: "4",
    type: "breakthrough",
    date: "2024-12-25",
    title: "서로에게 영향을 주었어요",
    description: "엄마의 꾸준함을 보며 나도 포기하지 않게 되었어요",
  },
]

export function MemberProfile({ onClose }: { onClose: () => void }) {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [expandedMoment, setExpandedMoment] = useState<string | null>(null)

  const memberName = "지우"
  const memberRole = "딸"
  const memberAvatar = "👧"
  const relationshipStart = "2024년 3월"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{memberName}</h1>
            <p className="text-sm text-muted-foreground">우리의 관계</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-6">
        {/* Member Info */}
        <Card className="mb-6 overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
                {memberAvatar}
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-semibold text-foreground">{memberName}</h3>
                <p className="text-sm text-muted-foreground">{memberRole}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">함께한 시간:</span>
                <span className="font-medium text-foreground">{relationshipStart}부터</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Relationship Philosophy */}
        <Card className="mb-6 overflow-hidden border-chart-3/30 bg-gradient-to-br from-chart-3/5 to-transparent">
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-chart-3" />
              <h3 className="font-semibold text-foreground">관계의 의미</h3>
            </div>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
              우리는 서로의 여정을 지켜보며 함께 성장합니다. {memberName}님과 당신이 주고받은 응원과 격려는 단순한
              메시지가 아니라, <span className="font-medium text-foreground">서로를 지탱하는 힘</span>입니다.
            </p>
          </div>
        </Card>

        {/* Shared Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-3">3</p>
            <p className="text-xs text-muted-foreground">함께한 약속</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-primary">24</p>
            <p className="text-xs text-muted-foreground">주고받은 응원</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-1">5</p>
            <p className="text-xs text-muted-foreground">함께 축하한 순간</p>
          </Card>
          <Card className="border-border/60 bg-card p-4">
            <p className="mb-1 text-2xl font-bold text-chart-4">2</p>
            <p className="text-xs text-muted-foreground">돌파 순간</p>
          </Card>
        </div>

        {/* Currently Active Together */}
        <div className="mb-6">
          <h3 className="mb-4 text-base font-medium text-foreground">지금 함께하는 약속</h3>
          <Card className="overflow-hidden border-2 border-chart-3/40 bg-gradient-to-br from-chart-3/10 to-transparent">
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary/20 text-xs">
                        👩
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-chart-3/20 text-xs">
                        {memberAvatar}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-chart-3">함께하는 여정</span>
                  </div>
                  <h4 className="mb-1 font-medium text-foreground">아침 운동하기</h4>
                  <p className="text-sm text-muted-foreground">함께 시작한 지 5일째</p>
                </div>
              </div>
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-chart-3 transition-all" style={{ width: "35%" }} />
              </div>
              <p className="text-xs text-muted-foreground">둘 다 오늘의 약속을 지켰어요 ✓</p>
            </div>
          </Card>
        </div>

        {/* Relationship Timeline */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-foreground">우리의 이야기</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedYear}년</span>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative space-y-4">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-0 w-px bg-gradient-to-b from-chart-3 via-muted to-transparent" />

            {mockRelationshipHistory.map((moment) => {
              const isExpanded = expandedMoment === moment.id

              return (
                <div key={moment.id} className="relative pl-14">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-chart-3">
                    <div className="h-2 w-2 rounded-full bg-background" />
                  </div>

                  {/* Moment card */}
                  <Card
                    className="cursor-pointer overflow-hidden border-border/60 bg-card transition-all hover:border-chart-3/30"
                    onClick={() => setExpandedMoment(isExpanded ? null : moment.id)}
                  >
                    <div className="p-4">
                      <div className="mb-2 flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chart-3/10">
                          {moment.type === "encouragement" ? (
                            <MessageCircle className="h-4 w-4 text-chart-3" />
                          ) : moment.type === "shared_pledge" ? (
                            <Heart className="h-4 w-4 text-chart-3" />
                          ) : moment.type === "milestone_support" ? (
                            <TrendingUp className="h-4 w-4 text-chart-3" />
                          ) : (
                            <Sparkles className="h-4 w-4 text-chart-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <h4 className="font-medium text-foreground">{moment.title}</h4>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {new Date(moment.date).toLocaleDateString("ko-KR", {
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                            {moment.description}
                          </p>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && moment.message && (
                        <div className="mt-4 border-t border-border/40 pt-4">
                          <div className="rounded-lg bg-chart-3/5 p-3">
                            <p className="mb-1 text-xs font-medium text-muted-foreground">메시지</p>
                            <p className="text-sm italic text-foreground">{moment.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Impact Reflection */}
        <Card className="border-chart-4/30 bg-gradient-to-br from-chart-4/5 to-transparent">
          <div className="p-6">
            <h3 className="mb-3 font-semibold text-foreground">{memberName}님이 내게 준 것</h3>
            <p className="mb-4 text-pretty text-sm text-muted-foreground leading-relaxed">
              {memberName}님과 함께한 시간이 당신에게 어떤 의미인가요? 이 관계가 당신의 여정에 어떤 영향을 주었나요?
            </p>
            <Button variant="outline" className="w-full rounded-full bg-transparent">
              <Heart className="mr-2 h-4 w-4" />
              감사 메시지 보내기
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
