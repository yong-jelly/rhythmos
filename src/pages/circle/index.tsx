import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { Card, Button, Badge, Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import { SharedPledgeCard } from "@/features/circle";
import {
  Users,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Trophy,
  Heart,
  TrendingUp,
  RotateCcw,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { designSystem } from "@/shared/lib/design-system";

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  color: "primary" | "chart-2" | "chart-3";
  activePledges: number;
  status: "active" | "resting" | "recovering";
  statusText: string;
}

interface SharedPledge {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    hasCheckedInToday: boolean;
    color: string;
  }[];
  progress: number;
  currentDay: number;
  totalDays: number;
  sharedReturns: number;
  lastActivity?: string;
}

interface GroupChallenge {
  id: string;
  title: string;
  goal: string;
  participants: number;
  activeParticipants: number;
  progress: number;
  daysLeft: number;
  stake: string;
}

interface SupportMessage {
  id: string;
  from: string;
  fromAvatar: string;
  fromColor: "primary" | "chart-2" | "chart-3";
  message: string;
  timestamp: string;
}

export function CirclePage() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    sharedPledges: true,
    groupChallenges: true,
    members: true,
    activity: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
  ];

  const sharedPledges: SharedPledge[] = [
    {
      id: "1",
      title: "저녁 8시 이후 가족 시간",
      participants: [
        { id: "1", name: "엄마", avatar: "엄", hasCheckedInToday: true, color: "bg-primary" },
        { id: "2", name: "지우", avatar: "지", hasCheckedInToday: true, color: "bg-chart-2" },
        { id: "3", name: "아빠", avatar: "아", hasCheckedInToday: false, color: "bg-chart-3" },
      ],
      progress: 60,
      currentDay: 8,
      totalDays: 14,
      sharedReturns: 1,
      lastActivity: "지우님이 1시간 전에 체크인했어요",
    },
    {
      id: "2",
      title: "주말 아침 함께 운동하기",
      participants: [
        { id: "1", name: "엄마", avatar: "엄", hasCheckedInToday: false, color: "bg-primary" },
        { id: "2", name: "지우", avatar: "지", hasCheckedInToday: false, color: "bg-chart-2" },
      ],
      progress: 42,
      currentDay: 3,
      totalDays: 7,
      sharedReturns: 0,
      lastActivity: "아직 오늘의 리듬이 시작되지 않았어요",
    },
  ];

  const groupChallenges: GroupChallenge[] = [
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
    {
      id: "2",
      title: "아침 일찍 일어나기",
      goal: "함께 건강한 아침 습관 만들기",
      participants: 3,
      activeParticipants: 3,
      progress: 75,
      daysLeft: 20,
      stake: "브런치 쿠폰 🥐",
    },
    {
      id: "3",
      title: "독서 챌린지",
      goal: "한 달에 책 3권 읽기",
      participants: 4,
      activeParticipants: 2,
      progress: 30,
      daysLeft: 15,
      stake: "서점 기프트카드 📚",
    },
  ];

  const supportMessages: SupportMessage[] = [
    {
      id: "1",
      from: "지우",
      fromAvatar: "지",
      fromColor: "chart-2",
      message: "엄마, 오늘도 일찍 일어나셨네요. 대단해요!",
      timestamp: "2시간 전",
    },
    {
      id: "2",
      from: "엄마",
      fromAvatar: "엄",
      fromColor: "primary",
      message: "지우가 숙제를 먼저 했어요. 스스로 약속을 지키는 모습이 멋져요!",
      timestamp: "어제",
    },
  ];

  // 가족 리듬 상태 계산
  const activeMembers = familyMembers.filter((m) => m.status === "active").length;
  const rhythmStatus = activeMembers === familyMembers.length ? "조용히 흐르는 중" : "리듬 맞추는 중";

  // Member Detail View
  if (selectedMember) {
    const member = familyMembers.find((m) => m.id === selectedMember)!;
    const memberPledges = [
      {
        id: "1",
        title: "아침 7시에 일어나기",
        progress: 35,
        status: "going" as const,
        lastCheckin: "오늘 아침",
        isShared: false,
      },
      {
        id: "2",
        title: "저녁 8시 이후 가족 시간",
        progress: 60,
        status: "going" as const,
        lastCheckin: "어제 저녁",
        isShared: true,
      },
    ];

    return (
      <div className="flex min-h-screen flex-col bg-transparent pb-28">
        <Header
          title={member.name}
          subtitle={member.statusText}
          onBackClick={() => setSelectedMember(null)}
          onAddClick={() => navigate("/pledge/new")}
        />

        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
          {/* Member Stats */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <Card className={cn("p-4", designSystem.shadow.card)}>
              <p className="mb-1 text-2xl font-bold text-foreground">{member.activePledges}</p>
              <p className="text-xs text-muted-foreground">진행 중</p>
            </Card>
            <Card className={cn("p-4", designSystem.shadow.card)}>
              <p className="mb-1 text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">이번 주 완료</p>
            </Card>
            <Card className={cn("p-4", designSystem.shadow.card)}>
              <p className="mb-1 text-2xl font-bold text-chart-2">3</p>
              <p className="text-xs text-muted-foreground">귀환 횟수</p>
            </Card>
          </div>

          {/* Active Pledges */}
          <div className="mb-6">
            <h3 className="mb-4 text-base font-semibold text-foreground">{member.name}의 약속</h3>
            <div className="space-y-3">
              {memberPledges.map((pledge) => (
                <Card
                  key={pledge.id}
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    pledge.isShared
                      ? "border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent shadow-md"
                      : designSystem.shadow.card,
                    "hover:shadow-card-hover hover:-translate-y-0.5"
                  )}
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
                        <h4 className="mb-1 font-semibold text-card-foreground">{pledge.title}</h4>
                        <p className="text-sm text-muted-foreground">{pledge.lastCheckin}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          pledge.isShared ? "bg-primary" : "bg-chart-2"
                        )}
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

          {/* Send Cheer */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">응원 보내기</h3>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {member.name}에게 힘이 되는 메시지를 보내보세요
            </p>
            <Button size="sm" className="w-full rounded-full">
              응원 메시지 쓰기
            </Button>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent pb-28">
      <Header
        title="서클"
        subtitle="함께하는 사람들"
        onSearchClick={() => {}}
        onNotificationClick={() => {}}
      />

      <main className="flex-1 px-5 py-6 max-w-4xl mx-auto w-full">
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
              <h2 className="mb-2 text-xl font-semibold text-foreground">{rhythmStatus}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
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
            <h3 className="text-base font-semibold text-foreground">그룹 챌린지</h3>
            {expandedSections.groupChallenges ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.groupChallenges && (
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {groupChallenges.map((challenge) => (
                  <CarouselItem key={challenge.id} className="pl-2 md:pl-4 md:basis-4/5 lg:basis-3/5">
                    <Card
                      className={cn(
                        "cursor-pointer overflow-hidden border-2 border-chart-2/40 bg-gradient-to-br from-chart-2/10 via-chart-3/5 to-transparent",
                        designSystem.shadow.elevation2,
                        "transition-all duration-200 hover:shadow-elevation4 hover:-translate-y-1"
                      )}
                      onClick={() => navigate(`/circle/challenge/${challenge.id}`)}
                    >
                      <div className="p-5">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/20">
                                <Trophy className="h-4 w-4 text-chart-2" />
                              </div>
                              <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
                                진행 중
                              </Badge>
                            </div>
                            <h4 className="mb-1 text-lg font-semibold text-card-foreground">{challenge.title}</h4>
                            <p className="text-sm text-muted-foreground">{challenge.goal}</p>
                          </div>
                        </div>

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

                        <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-chart-2 to-chart-3 transition-all duration-300"
                            style={{ width: `${challenge.progress}%` }}
                          />
                        </div>

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
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>

        {/* Shared Pledges Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("sharedPledges")}
            className="mb-4 flex w-full items-center justify-between"
          >
            <h3 className="text-base font-semibold text-foreground">함께하는 약속</h3>
            {expandedSections.sharedPledges ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.sharedPledges && (
            <div className="space-y-3">
              {sharedPledges.map((pledge) => (
                <SharedPledgeCard
                  key={pledge.id}
                  pledge={pledge}
                  onClick={() => console.log("Shared pledge clicked", pledge.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Family Members Section */}
        <div className="mb-6">
          <button onClick={() => toggleSection("members")} className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">가족 구성원</h3>
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
                  className={cn(
                    "cursor-pointer border-border/60 bg-card p-5",
                    designSystem.shadow.card,
                    "transition-all duration-200 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-0.5"
                  )}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold",
                          member.color === "primary" && "bg-primary/10 text-primary",
                          member.color === "chart-2" && "bg-chart-2/10 text-chart-2",
                          member.color === "chart-3" && "bg-chart-3/10 text-chart-3"
                        )}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 font-semibold text-card-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">진행 중인 약속 {member.activePledges}개</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium",
                          member.status === "active" && "text-primary",
                          member.status === "recovering" && "text-chart-2",
                          member.status === "resting" && "text-muted-foreground"
                        )}
                      >
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            member.status === "active" && "bg-primary",
                            member.status === "recovering" && "bg-chart-2",
                            member.status === "resting" && "bg-muted-foreground"
                          )}
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
            <h3 className="text-base font-semibold text-foreground">최근 응원</h3>
            {expandedSections.activity ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.activity && (
            <div className="space-y-3">
              {supportMessages.map((message) => (
                <Card
                  key={message.id}
                  className={cn("border-border/60 bg-card p-4", designSystem.shadow.card)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                        message.fromColor === "primary" && "bg-primary/10 text-primary",
                        message.fromColor === "chart-2" && "bg-chart-2/10 text-chart-2",
                        message.fromColor === "chart-3" && "bg-chart-3/10 text-chart-3"
                      )}
                    >
                      {message.fromAvatar}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{message.from}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0",
                        message.fromColor === "primary" && "text-primary",
                        message.fromColor === "chart-2" && "text-chart-2",
                        message.fromColor === "chart-3" && "text-chart-3"
                      )}
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">{message.message}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Family Charter */}
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">우리 집 약속 헌장</h3>
            <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs">
              편집
            </Button>
          </div>
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            "우리는 서로를 판단하지 않고, 함께 다시 시작합니다"
          </p>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
