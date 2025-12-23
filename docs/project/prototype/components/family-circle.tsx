"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Users,
  Heart,
  Plus,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Trophy,
  Flame,
} from "lucide-react"
import { GroupChallenge } from "./group-challenge"

interface FamilyMember {
  id: string
  name: string
  avatar: string
  color: string
  activePledges: number
  status: "active" | "resting" | "recovering"
  statusText: string
}

interface SharedPledge {
  id: string
  title: string
  participants: string[]
  progress: number
  currentDay: number
  totalDays: number
  sharedReturns: number
}

interface MemberDetail {
  member: FamilyMember
  pledges: Array<{
    id: string
    title: string
    progress: number
    status: "going" | "slipped" | "recovered"
    lastCheckin: string
    isShared?: boolean
  }>
  recentActivity: Array<{
    type: "checkin" | "slip" | "recover" | "cheer"
    timestamp: string
    message: string
  }>
}

export function FamilyCircle({ onClose }: { onClose?: () => void }) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [showGroupChallenge, setShowGroupChallenge] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    sharedPledges: true,
    groupChallenges: true,
    members: true,
    activity: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Mock data
  const familyMembers: FamilyMember[] = [
    {
      id: "1",
      name: "엄마",
      avatar: "엄",
      color: "primary",
      activePledges: 2,
      status: "active",
      statusText: "리듬 중",
    },
    {
      id: "2",
      name: "지우",
      avatar: "지",
      color: "chart-2",
      activePledges: 1,
      status: "active",
      statusText: "리듬 중",
    },
    {
      id: "3",
      name: "아빠",
      avatar: "아",
      color: "chart-3",
      activePledges: 1,
      status: "recovering",
      statusText: "회복 중",
    },
  ]

  const sharedPledges: SharedPledge[] = [
    {
      id: "1",
      title: "저녁 8시 이후 가족 시간",
      participants: ["엄마", "지우", "아빠"],
      progress: 60,
      currentDay: 8,
      totalDays: 14,
      sharedReturns: 1,
    },
    {
      id: "2",
      title: "주말 아침 함께 운동하기",
      participants: ["엄마", "지우"],
      progress: 42,
      currentDay: 3,
      totalDays: 7,
      sharedReturns: 0,
    },
  ]

  const groupChallenges = [
    {
      id: "1",
      title: "26년 다이어트 플랜",
      goal: "함께 건강하게 10kg 감량",
      participants: 5,
      activeParticipants: 4,
      progress: 50,
      daysLeft: 45,
      stake: "우승자 디너 쿠폰 🎁",
    },
  ]

  const getMemberDetail = (memberId: string): MemberDetail => {
    const member = familyMembers.find((m) => m.id === memberId)!
    return {
      member,
      pledges: [
        {
          id: "1",
          title: "아침 7시에 일어나기",
          progress: 35,
          status: "going",
          lastCheckin: "오늘 아침",
          isShared: false,
        },
        {
          id: "2",
          title: "저녁 8시 이후 가족 시간",
          progress: 60,
          status: "going",
          lastCheckin: "어제 저녁",
          isShared: true,
        },
      ],
      recentActivity: [
        {
          type: "checkin",
          timestamp: "2시간 전",
          message: "아침 7시에 일어나기 완료",
        },
        {
          type: "cheer",
          timestamp: "어제",
          message: "지우가 응원을 보냈어요",
        },
        {
          type: "recover",
          timestamp: "3일 전",
          message: "리듬을 다시 맞췄어요",
        },
      ],
    }
  }

  if (showGroupChallenge) {
    return <GroupChallenge onClose={() => setShowGroupChallenge(false)} />
  }

  if (selectedMember) {
    const memberDetail = getMemberDetail(selectedMember)
    const { member, pledges, recentActivity } = memberDetail

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedMember(null)}>
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-${member.color}/10 text-lg font-semibold text-${member.color}`}
              >
                {member.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-foreground">{member.name}</h1>
                <p className="text-sm text-muted-foreground">{member.statusText}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6">
          {/* Member Stats */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <Card className="border-border/60 bg-card p-4">
              <p className="mb-1 text-2xl font-bold text-foreground">{member.activePledges}</p>
              <p className="text-xs text-muted-foreground">진행 중</p>
            </Card>
            <Card className="border-border/60 bg-card p-4">
              <p className="mb-1 text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">이번 주 완료</p>
            </Card>
            <Card className="border-border/60 bg-card p-4">
              <p className="mb-1 text-2xl font-bold text-chart-2">3</p>
              <p className="text-xs text-muted-foreground">귀환 횟수</p>
            </Card>
          </div>

          {/* Active Pledges */}
          <div className="mb-6">
            <h3 className="mb-4 text-base font-medium text-foreground">{member.name}의 약속</h3>
            <div className="space-y-3">
              {pledges.map((pledge) => (
                <Card
                  key={pledge.id}
                  className={`overflow-hidden ${
                    pledge.isShared
                      ? "border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-md"
                      : "border-border/60 bg-card"
                  }`}
                >
                  <div className="p-5">
                    {pledge.isShared && (
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                          <Users className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary">함께하는 약속</span>
                      </div>
                    )}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1 font-medium text-card-foreground">{pledge.title}</h4>
                        <p className="text-sm text-muted-foreground">{pledge.lastCheckin}</p>
                      </div>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          pledge.status === "going"
                            ? "bg-primary/10"
                            : pledge.status === "slipped"
                              ? "bg-chart-2/10"
                              : "bg-chart-3/10"
                        }`}
                      >
                        {pledge.status === "going" && <TrendingUp className="h-5 w-5 text-primary" />}
                        {pledge.status === "slipped" && <RotateCcw className="h-5 w-5 text-chart-2" />}
                      </div>
                    </div>

                    <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${pledge.isShared ? "bg-primary" : "bg-chart-2"}`}
                        style={{ width: `${pledge.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">진행률 {pledge.progress}%</span>
                      {pledge.isShared && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-primary" />
                          <span className="text-xs font-medium text-primary">함께 {pledge.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h3 className="mb-4 text-base font-medium text-foreground">최근 활동</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="border-border/60 bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        activity.type === "checkin"
                          ? "bg-primary/10"
                          : activity.type === "cheer"
                            ? "bg-chart-2/10"
                            : "bg-chart-3/10"
                      }`}
                    >
                      {activity.type === "checkin" && <TrendingUp className="h-4 w-4 text-primary" />}
                      {activity.type === "cheer" && <Heart className="h-4 w-4 text-chart-2" />}
                      {activity.type === "recover" && <RotateCcw className="h-4 w-4 text-chart-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Send Cheer */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-foreground">응원 보내기</h3>
            </div>
            <p className="mb-4 text-pretty text-sm text-muted-foreground leading-relaxed">
              {member.name}에게 힘이 되는 메시지를 보내보세요
            </p>
            <Button size="sm" className="w-full rounded-full">
              응원 메시지 쓰기
            </Button>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">우리 가족</h1>
                <p className="text-sm text-muted-foreground">함께 만드는 리듬</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
              {onClose && (
                <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        {/* Family Rhythm Status */}
        <div className="mb-8">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6">
            <div className="mb-4 flex items-center justify-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-primary/40" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-primary" />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold text-foreground">조용히 흐르는 중</h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                오늘 우리 가족의 리듬이 잘 맞고 있어요
              </p>
            </div>
          </Card>
        </div>

        {/* Group Challenges Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("groupChallenges")}
            className="mb-4 flex w-full items-center justify-between"
          >
            <h3 className="text-base font-medium text-foreground">그룹 챌린지</h3>
            {expandedSections.groupChallenges ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.groupChallenges && (
            <div className="space-y-3">
              {groupChallenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="cursor-pointer overflow-hidden border-2 border-chart-2/40 bg-gradient-to-br from-chart-2/10 via-chart-3/5 to-transparent shadow-lg transition-all hover:shadow-xl"
                  onClick={() => setShowGroupChallenge(true)}
                >
                  <div className="p-5">
                    {/* Challenge Header */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/20">
                            <Trophy className="h-4 w-4 text-chart-2" />
                          </div>
                          <span className="rounded-full bg-chart-2/10 px-2 py-0.5 text-xs font-medium text-chart-2">
                            진행 중
                          </span>
                        </div>
                        <h4 className="mb-1 text-lg font-semibold text-card-foreground">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">{challenge.goal}</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-background/60 p-2.5 text-center backdrop-blur-sm">
                        <p className="mb-0.5 text-lg font-bold text-chart-2">{challenge.participants}</p>
                        <p className="text-xs text-muted-foreground">참여자</p>
                      </div>
                      <div className="rounded-lg bg-background/60 p-2.5 text-center backdrop-blur-sm">
                        <p className="mb-0.5 text-lg font-bold text-primary">{challenge.daysLeft}일</p>
                        <p className="text-xs text-muted-foreground">남음</p>
                      </div>
                      <div className="rounded-lg bg-background/60 p-2.5 text-center backdrop-blur-sm">
                        <p className="mb-0.5 text-lg font-bold text-chart-3">{challenge.progress}%</p>
                        <p className="text-xs text-muted-foreground">진행률</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-chart-2 to-chart-3 transition-all"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>

                    {/* Stake & Participants Status */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Trophy className="h-3.5 w-3.5 text-chart-2" />
                        <span>{challenge.stake}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                        <Flame className="h-3 w-3 text-primary" />
                        <span className="font-medium text-primary">{challenge.activeParticipants}명 활발</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Shared Pledges Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("sharedPledges")}
            className="mb-4 flex w-full items-center justify-between"
          >
            <h3 className="text-base font-medium text-foreground">함께하는 약속</h3>
            {expandedSections.sharedPledges ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.sharedPledges && (
            <div className="space-y-3">
              {sharedPledges.map((pledge) => (
                <Card
                  key={pledge.id}
                  className="overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-md"
                >
                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1 font-medium text-card-foreground">{pledge.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{pledge.participants.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${pledge.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {pledge.totalDays}일 중 {pledge.currentDay}일째
                      </span>
                      {pledge.sharedReturns > 0 && (
                        <div className="flex items-center gap-1">
                          <RotateCcw className="h-3 w-3 text-primary" />
                          <span className="font-medium text-primary">함께 귀환 {pledge.sharedReturns}회</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Family Members Section */}
        <div className="mb-6">
          <button onClick={() => toggleSection("members")} className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-medium text-foreground">가족 구성원</h3>
            {expandedSections.members ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.members && (
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <Card
                  key={member.id}
                  className="cursor-pointer border-border/60 bg-card p-5 transition-colors hover:border-primary/30"
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-${member.color}/10 text-lg font-semibold text-${member.color}`}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 font-medium text-card-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">진행 중인 약속 {member.activePledges}개</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          member.status === "active"
                            ? "text-primary"
                            : member.status === "recovering"
                              ? "text-chart-2"
                              : "text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            member.status === "active"
                              ? "bg-primary"
                              : member.status === "recovering"
                                ? "bg-chart-2"
                                : "bg-muted-foreground"
                          }`}
                        />
                        <span>{member.statusText}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Support Messages Section */}
        <div className="mb-6">
          <button onClick={() => toggleSection("activity")} className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-medium text-foreground">최근 응원</h3>
            {expandedSections.activity ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.activity && (
            <div className="space-y-3">
              <Card className="border-border/60 bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/10 text-sm font-semibold text-chart-2">
                    지
                  </div>
                  <span className="text-sm font-medium text-foreground">지우</span>
                  <span className="text-xs text-muted-foreground">2시간 전</span>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="mt-1 h-4 w-4 shrink-0 text-chart-2" />
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    엄마, 오늘도 일찍 일어나셨네요. 대단해요!
                  </p>
                </div>
              </Card>

              <Card className="border-border/60 bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    엄
                  </div>
                  <span className="text-sm font-medium text-foreground">엄마</span>
                  <span className="text-xs text-muted-foreground">어제</span>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    지우가 숙제를 먼저 했어요. 스스로 약속을 지키는 모습이 멋져요!
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Family Charter */}
      <div className="border-t border-border/40 bg-background p-6">
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-foreground">우리 집 약속 헌장</h3>
            <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs">
              편집
            </Button>
          </div>
          <p className="text-pretty text-sm italic leading-relaxed text-muted-foreground">
            "우리는 서로를 판단하지 않고, 함께 다시 시작합니다"
          </p>
        </Card>
      </div>
    </div>
  )
}
