"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Trophy, Heart, RotateCcw, TrendingUp, Calendar, Sparkles, Clock, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type CompletedPledge = {
  id: string
  title: string
  meaning: string
  startDate: string
  endDate: string
  totalDays: number
  completedDays: number
  recoveryCount: number
  status: "achieved" | "transformed" | "gracefully-ended"
  finalReflection: string
  journey: JourneyMoment[]
  isShared: boolean
  sharedWith?: Array<{
    id: string
    name: string
    avatar: string
    role: "leader" | "supporter"
  }>
}

type JourneyMoment = {
  date: string
  type: "start" | "success" | "slip" | "recovery" | "milestone" | "completion"
  note?: string
  emotion?: string
  familyNote?: {
    from: string
    message: string
  }
}

const mockCompletedPledges: CompletedPledge[] = [
  {
    id: "1",
    title: "아침 7시에 일어나기",
    meaning: "하루를 내 의지로 시작하는 사람이 되고 싶어서",
    startDate: "2024-11-01",
    endDate: "2024-12-22",
    totalDays: 52,
    completedDays: 43,
    recoveryCount: 3,
    status: "achieved",
    finalReflection: "처음엔 알람을 끄고 다시 자곤 했지만, 창문을 여는 습관이 생기면서 자연스럽게 일어나게 되었다.",
    isShared: false,
    journey: [
      { date: "2024-11-01", type: "start", note: "내일부터 새로운 나" },
      { date: "2024-11-05", type: "slip", note: "새벽 2시에 잔 날" },
      { date: "2024-11-06", type: "recovery", note: "괜찮아, 오늘부터 다시" },
      { date: "2024-11-15", type: "milestone", note: "2주 연속 성공!", emotion: "자신감" },
      { date: "2024-11-28", type: "slip", note: "감기 걸림" },
      { date: "2024-11-30", type: "recovery", note: "몸이 나으니 다시 시작" },
      { date: "2024-12-10", type: "milestone", note: "이제 자연스러워짐", emotion: "평온" },
      { date: "2024-12-22", type: "completion", note: "이제 내 리듬이 되었다" },
    ],
  },
  {
    id: "2",
    title: "저녁 8시 이후 간식 줄이기",
    meaning: "밤에 배부르게 자지 않고, 개운한 아침을 맞이하고 싶어서",
    startDate: "2024-10-15",
    endDate: "2024-11-30",
    totalDays: 47,
    completedDays: 38,
    recoveryCount: 5,
    status: "transformed",
    finalReflection: "완전히 끊지는 못했지만, 배고픔과 욕구를 구분할 수 있게 되었다. 이게 더 중요한 변화인 것 같다.",
    isShared: true,
    sharedWith: [
      { id: "u1", name: "엄마", avatar: "/avatars/mom.jpg", role: "leader" },
      { id: "u2", name: "아빠", avatar: "/avatars/dad.jpg", role: "supporter" },
    ],
    journey: [
      { date: "2024-10-15", type: "start" },
      {
        date: "2024-10-18",
        type: "slip",
        note: "야근 후 라면",
        familyNote: { from: "아빠", message: "힘든 날이었구나. 내일은 더 나을 거야!" },
      },
      { date: "2024-10-20", type: "recovery" },
      {
        date: "2024-10-28",
        type: "milestone",
        note: "일주일 달성",
        emotion: "뿌듯함",
        familyNote: { from: "엄마", message: "정말 자랑스러워! 함께해서 힘이 났어" },
      },
      { date: "2024-11-30", type: "completion", note: "약속은 끝났지만 배운 건 남는다" },
    ],
  },
  {
    id: "3",
    title: "주말마다 가족과 산책하기",
    meaning: "함께 걷는 시간이 우리를 더 가깝게 만들 것 같아서",
    startDate: "2024-09-01",
    endDate: "2024-10-10",
    totalDays: 40,
    completedDays: 22,
    recoveryCount: 2,
    status: "gracefully-ended",
    finalReflection: "날씨와 일정이 맞지 않을 때가 많았다. 하지만 시도한 것만으로도 의미 있었다.",
    isShared: true,
    sharedWith: [
      { id: "u1", name: "엄마", avatar: "/avatars/mom.jpg", role: "leader" },
      { id: "u3", name: "민수", avatar: "/avatars/minsu.jpg", role: "leader" },
      { id: "u4", name: "지원", avatar: "/avatars/jiwon.jpg", role: "leader" },
    ],
    journey: [
      { date: "2024-09-01", type: "start", note: "가족과 함께" },
      {
        date: "2024-09-15",
        type: "milestone",
        note: "2주 연속!",
        emotion: "행복",
        familyNote: { from: "민수", message: "엄마랑 걷는 거 좋아요!" },
      },
      { date: "2024-09-22", type: "slip", note: "비 오는 날" },
      { date: "2024-10-10", type: "completion", note: "형태는 바꿔야 할 것 같다" },
    ],
  },
]

export function CompletedPledges({ onClose }: { onClose: () => void }) {
  const [selectedPledge, setSelectedPledge] = useState<CompletedPledge | null>(null)
  const [filter, setFilter] = useState<"all" | "personal" | "shared">("all")

  const filteredPledges = mockCompletedPledges.filter((pledge) => {
    if (filter === "personal") return !pledge.isShared
    if (filter === "shared") return pledge.isShared
    return true
  })

  if (selectedPledge) {
    return <JourneyDetail pledge={selectedPledge} onBack={() => setSelectedPledge(null)} />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="space-y-4 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">완료된 여정</h1>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("all")}
            >
              전체
            </Button>
            <Button
              variant={filter === "personal" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("personal")}
            >
              개인 여정
            </Button>
            <Button
              variant={filter === "shared" ? "default" : "ghost"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("shared")}
            >
              <Users className="mr-1.5 h-3.5 w-3.5" />
              함께한 여정
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        <p className="mb-6 text-balance text-sm text-muted-foreground leading-relaxed">
          끝낸 약속들의 기록이에요. 성공도 실패도 아닌, 당신이 걸어온 길의 증거입니다.
        </p>

        <div className="space-y-4">
          {filteredPledges.map((pledge) => (
            <Card
              key={pledge.id}
              className={`cursor-pointer overflow-hidden transition-all hover:shadow-md active:scale-[0.98] ${
                pledge.isShared
                  ? "border-2 border-chart-2/40 bg-gradient-to-br from-chart-2/5 to-transparent"
                  : "border-border/60 bg-card hover:border-primary/40"
              }`}
              onClick={() => setSelectedPledge(pledge)}
            >
              {/* Receipt Style Header */}
              <div className="border-b border-dashed border-border/60 bg-muted/30 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {pledge.isShared && (
                      <>
                        <Users className="h-4 w-4 text-chart-2" />
                        <span className="text-xs font-medium text-chart-2">함께한 약속</span>
                        <span className="text-xs text-muted-foreground">·</span>
                      </>
                    )}
                    {pledge.status === "achieved" && (
                      <>
                        <Trophy className="h-4 w-4 text-chart-1" />
                        <span className="text-xs font-medium text-chart-1">목표 달성</span>
                      </>
                    )}
                    {pledge.status === "transformed" && (
                      <>
                        <Sparkles className="h-4 w-4 text-chart-2" />
                        <span className="text-xs font-medium text-chart-2">변화 완성</span>
                      </>
                    )}
                    {pledge.status === "gracefully-ended" && (
                      <>
                        <Heart className="h-4 w-4 text-chart-3" />
                        <span className="text-xs font-medium text-chart-3">품위 있게 마침</span>
                      </>
                    )}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{pledge.endDate}</span>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="flex-1 text-lg font-semibold text-card-foreground">{pledge.title}</h3>
                  {pledge.isShared && pledge.sharedWith && (
                    <div className="flex -space-x-2">
                      {pledge.sharedWith.map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="bg-chart-2/20 text-xs text-chart-2">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats Grid - Receipt Style */}
                <div className="grid grid-cols-3 gap-3 border-y border-dashed border-border/60 py-3">
                  <div className="space-y-1 text-center">
                    <p className="text-2xl font-bold text-foreground">{pledge.completedDays}</p>
                    <p className="text-xs text-muted-foreground">실행한 날</p>
                  </div>
                  <div className="space-y-1 border-x border-dashed border-border/60 text-center">
                    <p className="text-2xl font-bold text-foreground">{pledge.totalDays}</p>
                    <p className="text-xs text-muted-foreground">전체 여정</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-2xl font-bold text-chart-2">{pledge.recoveryCount}</p>
                    <p className="text-xs text-muted-foreground">다시 시작</p>
                  </div>
                </div>

                {/* Completion Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">완료율</span>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {Math.round((pledge.completedDays / pledge.totalDays) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2 transition-all"
                      style={{ width: `${(pledge.completedDays / pledge.totalDays) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Journey Preview */}
                <div className="flex items-center gap-1 pt-2">
                  {pledge.journey.slice(0, 10).map((moment, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full ${
                        moment.type === "success" || moment.type === "milestone"
                          ? "bg-primary"
                          : moment.type === "slip"
                            ? "bg-muted"
                            : moment.type === "recovery"
                              ? "bg-chart-2"
                              : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2 text-center">
                  <p className="text-xs text-primary">여정 자세히 보기 →</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

function JourneyDetail({ pledge, onBack }: { pledge: CompletedPledge; onBack: () => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-4 px-6 py-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <X className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{pledge.title}</h1>
              {pledge.isShared && <Users className="h-4 w-4 text-chart-2" />}
            </div>
            <p className="text-sm text-muted-foreground">당신이 걸어온 길</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        {/* Hero Stats */}
        <Card
          className={`mb-6 overflow-hidden ${
            pledge.isShared
              ? "border-2 border-chart-2/40 bg-gradient-to-br from-chart-2/10 to-transparent"
              : "border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent"
          }`}
        >
          <div className="space-y-4 p-6">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  pledge.isShared ? "bg-chart-2/10" : "bg-primary/10"
                }`}
              >
                {pledge.status === "achieved" && <Trophy className="h-8 w-8 text-primary" />}
                {pledge.status === "transformed" && <Sparkles className="h-8 w-8 text-chart-2" />}
                {pledge.status === "gracefully-ended" && <Heart className="h-8 w-8 text-chart-3" />}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  {pledge.status === "achieved" && <span className="text-sm font-medium text-chart-1">목표 달성</span>}
                  {pledge.status === "transformed" && (
                    <span className="text-sm font-medium text-chart-2">변화 완성</span>
                  )}
                  {pledge.status === "gracefully-ended" && (
                    <span className="text-sm font-medium text-chart-3">품위 있게 마침</span>
                  )}
                </div>
                <p className="text-balance text-sm italic text-muted-foreground leading-relaxed">"{pledge.meaning}"</p>
              </div>
            </div>

            {pledge.isShared && pledge.sharedWith && (
              <div className="rounded-xl bg-background/50 p-4">
                <p className="mb-3 text-xs font-medium text-muted-foreground">함께한 사람들</p>
                <div className="flex flex-wrap gap-2">
                  {pledge.sharedWith.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 rounded-full bg-chart-2/10 px-3 py-1.5">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-chart-2/30 text-xs text-chart-2">{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{member.name}</span>
                      {member.role === "leader" && <span className="text-xs text-muted-foreground">(주도)</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-2 rounded-xl bg-background/50 p-4">
              <div className="space-y-1 text-center">
                <p className="text-2xl font-bold text-foreground">{pledge.completedDays}</p>
                <p className="text-xs text-muted-foreground">실행한 날</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-2xl font-bold text-foreground">{pledge.totalDays}</p>
                <p className="text-xs text-muted-foreground">전체 여정</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-2xl font-bold text-chart-2">{pledge.recoveryCount}</p>
                <p className="text-xs text-muted-foreground">다시 시작</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-2xl font-bold text-primary">
                  {Math.round((pledge.completedDays / pledge.totalDays) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">달성</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Journey Timeline */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-medium text-foreground">여정의 흐름</h2>
          <div className="space-y-6">
            {pledge.journey.map((moment, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Line */}
                {idx < pledge.journey.length - 1 && (
                  <div className="absolute left-6 top-12 h-full w-0.5 bg-gradient-to-b from-border to-transparent" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      moment.type === "start"
                        ? "bg-primary/10"
                        : moment.type === "success" || moment.type === "milestone"
                          ? "bg-primary/10"
                          : moment.type === "slip"
                            ? "bg-muted"
                            : moment.type === "recovery"
                              ? "bg-chart-2/10"
                              : "bg-primary/20"
                    }`}
                  >
                    {moment.type === "start" && <Calendar className="h-5 w-5 text-primary" />}
                    {(moment.type === "success" || moment.type === "milestone") && (
                      <TrendingUp className="h-5 w-5 text-primary" />
                    )}
                    {moment.type === "slip" && <Clock className="h-5 w-5 text-muted-foreground" />}
                    {moment.type === "recovery" && <RotateCcw className="h-5 w-5 text-chart-2" />}
                    {moment.type === "completion" && <Trophy className="h-5 w-5 text-primary" />}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 border-border/60 bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-card-foreground">
                        {moment.type === "start" && "시작"}
                        {moment.type === "success" && "성공"}
                        {moment.type === "slip" && "미끄러짐"}
                        {moment.type === "recovery" && "다시 시작"}
                        {moment.type === "milestone" && "이정표"}
                        {moment.type === "completion" && "완료"}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{moment.date}</span>
                    </div>
                    {moment.note && (
                      <p className="mb-2 text-balance text-sm text-muted-foreground leading-relaxed">"{moment.note}"</p>
                    )}
                    {moment.emotion && (
                      <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1">
                        <span className="text-xs font-medium text-primary">{moment.emotion}</span>
                      </div>
                    )}
                    {moment.familyNote && (
                      <div className="mt-3 rounded-lg border border-chart-2/30 bg-chart-2/5 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-chart-2" />
                          <span className="text-xs font-medium text-chart-2">{moment.familyNote.from}</span>
                        </div>
                        <p className="text-balance text-sm text-muted-foreground leading-relaxed">
                          {moment.familyNote.message}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Reflection */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6">
          <h3 className="mb-3 text-base font-medium text-foreground">마지막 돌아봄</h3>
          <p className="text-balance text-sm italic text-muted-foreground leading-relaxed">
            "{pledge.finalReflection}"
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button variant="outline" size="lg" className="h-12 w-full rounded-full bg-transparent">
            이 여정 다시 시작하기
          </Button>
          <Button variant="ghost" size="lg" className="h-12 w-full rounded-full">
            여정 공유하기
          </Button>
        </div>
      </main>
    </div>
  )
}
