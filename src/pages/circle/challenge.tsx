import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { Card, Button, Badge } from "@/shared/ui";
import {
  Trophy,
  Target,
  Calendar,
  TrendingUp,
  Flame,
  Medal,
  Crown,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Heart,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { designSystem } from "@/shared/lib/design-system";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  checkIns: number;
  status: "leading" | "active" | "struggling" | "dropped";
  lastCheckIn?: string;
  todayStatus: "done" | "pending" | "missed";
}

interface TimelineEvent {
  participantId: string;
  participantName: string;
  type: "checkin" | "milestone" | "recovery" | "support";
  message: string;
}

interface Timeline {
  date: string;
  events: TimelineEvent[];
}

export function GroupChallengePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedView, setSelectedView] = useState<"overview" | "leaderboard" | "timeline">("overview");

  // Mock data
  const challenge = {
    title: "26년 다이어트 플랜",
    goal: "함께 건강하게 10kg 감량",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    currentDay: 45,
    totalDays: 90,
    progress: 50,
    stake: {
      success: "우승자에게 디너 쿠폰 🎁",
      failure: "꼴찌는 회식 준비 🍽️",
    },
  };

  const participants: Participant[] = [
    {
      id: "1",
      name: "민수",
      avatar: "민",
      streak: 15,
      checkIns: 42,
      status: "leading",
      lastCheckIn: "오늘 아침",
      todayStatus: "done",
    },
    {
      id: "2",
      name: "지혜",
      avatar: "지",
      streak: 12,
      checkIns: 38,
      status: "active",
      lastCheckIn: "오늘 아침",
      todayStatus: "done",
    },
    {
      id: "3",
      name: "현우",
      avatar: "현",
      streak: 8,
      checkIns: 35,
      status: "active",
      lastCheckIn: "어제 저녁",
      todayStatus: "pending",
    },
    {
      id: "4",
      name: "수진",
      avatar: "수",
      streak: 5,
      checkIns: 28,
      status: "struggling",
      lastCheckIn: "2일 전",
      todayStatus: "missed",
    },
    {
      id: "5",
      name: "태영",
      avatar: "태",
      streak: 0,
      checkIns: 15,
      status: "dropped",
      lastCheckIn: "1주일 전",
      todayStatus: "missed",
    },
  ];

  const timeline: Timeline[] = [
    {
      date: "오늘",
      events: [
        { participantId: "1", participantName: "민수", type: "checkin", message: "아침 러닝 5km 완료!" },
        { participantId: "2", participantName: "지혜", type: "checkin", message: "샐러드로 점심 해결" },
        { participantId: "1", participantName: "민수", type: "support", message: "현우님, 오늘도 화이팅!" },
      ],
    },
    {
      date: "어제",
      events: [
        { participantId: "3", participantName: "현우", type: "checkin", message: "헬스장 1시간" },
        { participantId: "2", participantName: "지혜", type: "milestone", message: "연속 12일 달성! 🎉" },
        { participantId: "4", participantName: "수진", type: "recovery", message: "다시 시작합니다" },
      ],
    },
    {
      date: "2일 전",
      events: [
        { participantId: "4", participantName: "수진", type: "checkin", message: "저녁 조깅 완료" },
        { participantId: "1", participantName: "민수", type: "support", message: "모두 잘하고 계세요!" },
      ],
    },
  ];

  const daysRemaining = challenge.totalDays - challenge.currentDay;
  const progressPercent = (challenge.currentDay / challenge.totalDays) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header
        title={challenge.title}
        subtitle={challenge.goal}
        onBackClick={() => navigate(-1)}
      />

      {/* Challenge Stats Header */}
      <div className="border-b border-border/40 bg-gradient-to-br from-chart-2/10 to-transparent backdrop-blur-sm">
        <div className="px-5 py-4 max-w-4xl mx-auto">
          <div className="mb-3 grid grid-cols-3 gap-2">
            <Card className={cn("p-3 text-center bg-background/60 backdrop-blur-sm", designSystem.shadow.card)}>
              <div className="mb-1 flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4 text-chart-2" />
              </div>
              <p className="text-lg font-bold text-foreground">{challenge.currentDay}일째</p>
              <p className="text-xs text-muted-foreground">진행 중</p>
            </Card>
            <Card className={cn("p-3 text-center bg-background/60 backdrop-blur-sm", designSystem.shadow.card)}>
              <div className="mb-1 flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-foreground">{daysRemaining}일</p>
              <p className="text-xs text-muted-foreground">남음</p>
            </Card>
            <Card className={cn("p-3 text-center bg-background/60 backdrop-blur-sm", designSystem.shadow.card)}>
              <div className="mb-1 flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-chart-3" />
              </div>
              <p className="text-lg font-bold text-foreground">{participants.length}</p>
              <p className="text-xs text-muted-foreground">참여자</p>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-chart-2 to-chart-3 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">전체 진행률</span>
              <span className="font-semibold text-chart-2">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Stakes */}
          <div className="flex items-center justify-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3 text-chart-2" />
              <span className="text-muted-foreground">{challenge.stake.success}</span>
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-chart-3" />
              <span className="text-muted-foreground">{challenge.stake.failure}</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="flex px-5 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedView("overview")}
            className={cn(
              "flex-1 border-b-2 py-3 text-sm font-semibold transition-colors",
              selectedView === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            개요
          </button>
          <button
            onClick={() => setSelectedView("leaderboard")}
            className={cn(
              "flex-1 border-b-2 py-3 text-sm font-semibold transition-colors",
              selectedView === "leaderboard"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            리더보드
          </button>
          <button
            onClick={() => setSelectedView("timeline")}
            className={cn(
              "flex-1 border-b-2 py-3 text-sm font-semibold transition-colors",
              selectedView === "timeline"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            타임라인
          </button>
        </div>
      </div>

      <main className="flex-1 px-5 py-6 max-w-4xl mx-auto w-full">
        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* Today's Check-ins */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-foreground">오늘의 참여 현황</h3>
              <div className="grid grid-cols-5 gap-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="text-center">
                    <div
                      className={cn(
                        "relative mb-2 flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold mx-auto",
                        participant.todayStatus === "done"
                          ? "bg-chart-2/20 text-chart-2"
                          : participant.todayStatus === "pending"
                            ? "bg-muted text-muted-foreground"
                            : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {participant.avatar}
                      {participant.todayStatus === "done" && (
                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-chart-2">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {participant.todayStatus === "missed" && (
                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive/80">
                          <XCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{participant.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-foreground">현재 순위</h3>
              <div className="space-y-2">
                {participants.slice(0, 3).map((participant, index) => (
                  <Card
                    key={participant.id}
                    className={cn(
                      "overflow-hidden",
                      index === 0
                        ? "border-2 border-chart-2/40 bg-gradient-to-r from-chart-2/10 to-transparent"
                        : designSystem.shadow.card,
                      "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex items-center gap-3 p-4">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold",
                          index === 0
                            ? "bg-chart-2 text-white"
                            : index === 1
                              ? "bg-chart-3/20 text-chart-3"
                              : "bg-muted text-muted-foreground"
                        )}
                      >
                        {index === 0 ? <Crown className="h-4 w-4" /> : index + 1}
                      </div>
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                          participant.status === "leading" ? "bg-chart-2/20 text-chart-2" : "bg-muted text-foreground"
                        )}
                      >
                        {participant.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{participant.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-chart-2" />
                            {participant.streak}일 연속
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {participant.checkIns}회 체크인
                          </span>
                        </div>
                      </div>
                      {index === 0 && <Trophy className="h-5 w-5 shrink-0 text-chart-2" />}
                    </div>
                  </Card>
                ))}
              </div>
              <Button
                variant="ghost"
                className="mt-3 w-full rounded-full"
                onClick={() => setSelectedView("leaderboard")}
              >
                전체 순위 보기
              </Button>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="mb-3 text-base font-semibold text-foreground">최근 활동</h3>
              <div className="space-y-2">
                {timeline[0].events.slice(0, 3).map((event, index) => (
                  <Card key={index} className={cn("border-border/60 bg-card p-3", designSystem.shadow.card)}>
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          event.type === "checkin" && "bg-chart-2/10",
                          event.type === "milestone" && "bg-chart-3/10",
                          event.type === "support" && "bg-primary/10",
                          event.type === "recovery" && "bg-chart-4/10"
                        )}
                      >
                        {event.type === "checkin" && <CheckCircle2 className="h-4 w-4 text-chart-2" />}
                        {event.type === "milestone" && <Star className="h-4 w-4 text-chart-3" />}
                        {event.type === "support" && <Heart className="h-4 w-4 text-primary" />}
                        {event.type === "recovery" && <Zap className="h-4 w-4 text-chart-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 text-sm text-foreground">
                          <span className="font-semibold">{event.participantName}</span>
                          {event.type === "checkin" && " 님이 체크인했어요"}
                          {event.type === "milestone" && " 님의 이정표"}
                          {event.type === "support" && " 님이 응원했어요"}
                          {event.type === "recovery" && " 님이 다시 시작했어요"}
                        </p>
                        <p className="text-xs text-muted-foreground">{event.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="mt-3 w-full rounded-full" onClick={() => setSelectedView("timeline")}>
                전체 타임라인 보기
              </Button>
            </div>
          </div>
        )}

        {/* Leaderboard View */}
        {selectedView === "leaderboard" && (
          <div className="space-y-3">
            <div className="mb-4">
              <Card className="border-chart-2/30 bg-gradient-to-br from-chart-2/10 to-transparent p-5">
                <div className="text-center">
                  <Trophy className="mx-auto mb-2 h-12 w-12 text-chart-2" />
                  <h3 className="mb-1 text-xl font-semibold text-foreground">리더보드</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    누가 가장 꾸준히 참여하고 있을까요?
                  </p>
                </div>
              </Card>
            </div>

            {participants.map((participant, index) => (
              <Card
                key={participant.id}
                className={cn(
                  "overflow-hidden",
                  index === 0
                    ? "border-2 border-chart-2/40 bg-gradient-to-r from-chart-2/10 to-transparent shadow-md"
                    : index === participants.length - 1 && participant.status === "dropped"
                      ? "border-destructive/20 bg-destructive/5"
                      : designSystem.shadow.card,
                  "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5"
                )}
              >
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold",
                        index === 0
                          ? "bg-chart-2 text-white"
                          : index === 1
                            ? "bg-chart-3/30 text-chart-3"
                            : index === 2
                              ? "bg-chart-4/30 text-chart-4"
                              : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index === 0 ? <Crown className="h-5 w-5" /> : index + 1}
                    </div>
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold",
                        participant.status === "leading"
                          ? "bg-chart-2/20 text-chart-2"
                          : participant.status === "dropped"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary"
                      )}
                    >
                      {participant.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-semibold text-foreground">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.lastCheckIn}</p>
                    </div>
                    {index === 0 && <Medal className="h-6 w-6 shrink-0 text-chart-2" />}
                    {participant.status === "dropped" && (
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                        포기
                      </Badge>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <div className="mb-1 flex items-center justify-center">
                        <Flame className="h-4 w-4 text-chart-2" />
                      </div>
                      <p className="mb-1 text-lg font-bold text-foreground">{participant.streak}</p>
                      <p className="text-xs text-muted-foreground">연속일</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <div className="mb-1 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="mb-1 text-lg font-bold text-foreground">{participant.checkIns}</p>
                      <p className="text-xs text-muted-foreground">체크인</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <div className="mb-1 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-chart-3" />
                      </div>
                      <p className="mb-1 text-lg font-bold text-foreground">
                        {Math.round((participant.checkIns / challenge.currentDay) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">참여율</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-center">
                    {participant.status === "leading" && (
                      <Badge className="bg-chart-2/10 text-chart-2">
                        <Crown className="mr-1 h-4 w-4" />
                        선두 주자
                      </Badge>
                    )}
                    {participant.status === "active" && (
                      <Badge className="bg-primary/10 text-primary">
                        <Zap className="mr-1 h-4 w-4" />
                        활발히 참여 중
                      </Badge>
                    )}
                    {participant.status === "struggling" && (
                      <Badge className="bg-chart-3/10 text-chart-3">
                        <Heart className="mr-1 h-4 w-4" />
                        응원이 필요해요
                      </Badge>
                    )}
                    {participant.status === "dropped" && (
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive">
                        <XCircle className="mr-1 h-4 w-4" />
                        참여 중단
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Timeline View */}
        {selectedView === "timeline" && (
          <div className="space-y-6">
            {timeline.map((day, dayIndex) => (
              <div key={dayIndex}>
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm font-semibold text-muted-foreground">{day.date}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-2">
                  {day.events.map((event, eventIndex) => (
                    <Card key={eventIndex} className={cn("border-border/60 bg-card p-4", designSystem.shadow.card)}>
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            event.type === "checkin" && "bg-chart-2/10",
                            event.type === "milestone" && "bg-chart-3/10",
                            event.type === "support" && "bg-primary/10",
                            event.type === "recovery" && "bg-chart-4/10"
                          )}
                        >
                          {event.type === "checkin" && <CheckCircle2 className="h-5 w-5 text-chart-2" />}
                          {event.type === "milestone" && <Star className="h-5 w-5 text-chart-3" />}
                          {event.type === "support" && <Heart className="h-5 w-5 text-primary" />}
                          {event.type === "recovery" && <Zap className="h-5 w-5 text-chart-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="mb-2 font-semibold text-foreground">
                            {event.participantName}
                            {event.type === "checkin" && " 님이 체크인했어요"}
                            {event.type === "milestone" && " 님의 이정표!"}
                            {event.type === "support" && " 님이 응원했어요"}
                            {event.type === "recovery" && " 님이 다시 시작했어요"}
                          </p>
                          <p className="text-sm leading-relaxed text-muted-foreground">{event.message}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="sticky bottom-24 px-5 max-w-4xl mx-auto w-full">
        <Button size="lg" className={cn("w-full rounded-full", designSystem.shadow.elevation4)}>
          <CheckCircle2 className="mr-2 h-5 w-5" />
          오늘 체크인하기
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
}

