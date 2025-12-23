"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Wind, Sparkles, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

type RepairStep =
  | "recognize"
  | "acknowledge"
  | "context"
  | "emotion"
  | "pattern"
  | "rule-check"
  | "redesign"
  | "celebrate"

const currentPledge = {
  title: "아침 7시에 일어나기",
  why: "하루를 여유롭게 시작해서 내 삶의 주도권을 되찾고 싶어요",
  consecutiveMisses: 3,
  totalRepairs: 2,
  startDate: "12/15",
}

export function RepairFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<RepairStep>("recognize")
  const [context, setContext] = useState("")
  const [emotion, setEmotion] = useState<string>("")
  const [reasonTags, setReasonTags] = useState<string[]>([])
  const [selectedRedesign, setSelectedRedesign] = useState<string>("")

  const emotions = [
    { value: "tired", label: "지쳤어요", color: "text-chart-3" },
    { value: "frustrated", label: "답답해요", color: "text-chart-2" },
    { value: "calm", label: "괜찮아요", color: "text-primary" },
    { value: "disappointed", label: "실망했어요", color: "text-muted-foreground" },
  ]

  const contextTags = [
    "몸이 아팠어요",
    "감정적으로 힘들었어요",
    "예상치 못한 일이 생겼어요",
    "피곤했어요",
    "환경이 바뀌었어요",
    "동기가 떨어졌어요",
  ]

  const toggleTag = (tag: string) => {
    setReasonTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">회복의 여정</h1>
            <p className="text-xs text-muted-foreground">
              {step === "recognize" && "인식하기"}
              {step === "acknowledge" && "받아들이기"}
              {step === "context" && "이해하기"}
              {step === "emotion" && "느끼기"}
              {step === "pattern" && "패턴 찾기"}
              {step === "rule-check" && "규칙 점검"}
              {step === "redesign" && "재설계"}
              {step === "celebrate" && "축하하기"}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            나중에
          </Button>
        </div>
        {/* Progress dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {["recognize", "acknowledge", "context", "emotion", "pattern", "rule-check", "redesign", "celebrate"].map(
            (s, i) => (
              <div
                key={s}
                className={cn("h-1.5 rounded-full transition-all", s === step ? "w-8 bg-primary" : "w-1.5 bg-border")}
              />
            ),
          )}
        </div>
      </header>

      <main className="flex-1 px-6 py-8 pb-24">
        {step === "recognize" && (
          <div className="mx-auto max-w-md space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-chart-2/20 to-chart-3/20">
                  <Wind className="h-12 w-12 text-chart-2" />
                </div>
                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background ring-2 ring-border">
                  <span className="text-sm font-semibold text-foreground">{currentPledge.consecutiveMisses}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-pretty text-2xl font-semibold text-foreground">리듬이 흔들렸어요</h2>
                <p className="text-pretty text-base text-muted-foreground leading-relaxed">
                  {currentPledge.consecutiveMisses}일 동안 약속을 지키지 못했네요.{" "}
                  <span className="text-foreground font-medium">이건 실패가 아니에요.</span>
                </p>
              </div>
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">{currentPledge.title}</p>
                <p className="text-pretty text-xs text-muted-foreground leading-relaxed italic">
                  "{currentPledge.why}"
                </p>
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>시작: {currentPledge.startDate}</span>
                  <span>회복: {currentPledge.totalRepairs}회</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button size="lg" className="h-14 w-full rounded-full" onClick={() => setStep("acknowledge")}>
                계속 진행하기
              </Button>
              <p className="text-pretty text-center text-xs text-muted-foreground leading-relaxed">
                당신을 판단하려는 게 아니에요. 함께 이해하고 다시 설계하려는 거예요.
              </p>
            </div>
          </div>
        )}

        {step === "acknowledge" && (
          <div className="mx-auto max-w-md space-y-8 animate-in fade-in duration-500">
            <div className="space-y-4">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">미끄러짐은 자연스러운 일이에요</h2>
              <div className="space-y-4 text-pretty text-base text-muted-foreground leading-relaxed">
                <p>완벽한 리듬은 없어요. 음악도 쉼표가 있고, 템포가 바뀌고, 때론 엇박자가 나기도 하죠.</p>
                <p className="text-foreground font-medium">
                  중요한 건 끊어진 게 아니라는 거예요. 잠시 멈췄을 뿐이에요.
                </p>
              </div>
            </div>

            <Card className="border-chart-2/20 bg-chart-2/5 p-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">기억하세요</p>
                <ul className="space-y-2 text-pretty text-sm text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Circle className="mt-1 h-1.5 w-1.5 fill-chart-2 text-chart-2 shrink-0" />
                    <span>
                      연속성이 아니라 <span className="text-foreground font-medium">귀환성</span>이 중요해요
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="mt-1 h-1.5 w-1.5 fill-chart-2 text-chart-2 shrink-0" />
                    <span>
                      한 번도 안 미끄러진 사람보다{" "}
                      <span className="text-foreground font-medium">여러 번 돌아온 사람</span>이 더 강해요
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="mt-1 h-1.5 w-1.5 fill-chart-2 text-chart-2 shrink-0" />
                    <span>
                      미끄러짐은 <span className="text-foreground font-medium">정체성을 깨지 않아요</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Card>

            <Button size="lg" className="h-14 w-full rounded-full" onClick={() => setStep("context")}>
              무슨 일이 있었는지 기억하기
            </Button>
          </div>
        )}

        {step === "context" && (
          <div className="mx-auto max-w-md space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">무슨 일이 있었나요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                패턴을 찾으려는 거예요. 당신의 삶에는 리듬이 있고, 그 리듬을 이해하면 더 나은 규칙을 만들 수 있어요.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">어떤 상황이었나요? (여러 개 선택 가능)</label>
                <div className="flex flex-wrap gap-2">
                  {contextTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={reasonTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">기억하고 싶은 걸 적어주세요 (선택)</label>
                <Textarea
                  placeholder="예: 프로젝트 마감 직전이라 밤 12시까지 일했어요. 알람이 울렸을 때 너무 피곤해서 꺼버렸어요."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-32 resize-none text-sm leading-relaxed"
                />
                <p className="text-xs text-muted-foreground">이 기록은 나중에 패턴을 볼 때 도움이 돼요</p>
              </div>
            </div>

            <Button
              size="lg"
              className="h-14 w-full rounded-full"
              onClick={() => setStep("emotion")}
              disabled={reasonTags.length === 0}
            >
              계속하기
            </Button>
          </div>
        )}

        {step === "emotion" && (
          <div className="mx-auto max-w-md space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">지금 어떤 느낌인가요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                감정을 인정하는 것이 첫걸음이에요. 모든 감정은 존중받을 가치가 있어요.
              </p>
            </div>

            <div className="space-y-3">
              {emotions.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEmotion(e.value)}
                  className={cn(
                    "w-full rounded-xl border-2 p-5 text-left transition-all",
                    emotion === e.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30",
                  )}
                >
                  <p className={cn("text-lg font-medium", emotion === e.value ? "text-primary" : e.color)}>{e.label}</p>
                </button>
              ))}
            </div>

            <Card className="border-primary/20 bg-primary/5 p-5">
              <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                {emotion === "tired" && "피로는 당신이 충분히 노력했다는 신호예요. 쉬는 것도 용기입니다."}
                {emotion === "frustrated" && "답답함은 더 나아지고 싶다는 증거예요. 그 마음이 당신을 이끌 거예요."}
                {emotion === "calm" && "평온함 속에서 더 명확하게 볼 수 있어요. 좋은 신호예요."}
                {emotion === "disappointed" && "실망은 기대가 있었다는 뜻이에요. 그 기대를 현실로 만들어봐요."}
                {!emotion && "자신의 감정을 인정하는 것부터 시작해요."}
              </p>
            </Card>

            <Button
              size="lg"
              className="h-14 w-full rounded-full"
              onClick={() => setStep("pattern")}
              disabled={!emotion}
            >
              패턴 살펴보기
            </Button>
          </div>
        )}

        {step === "pattern" && (
          <div className="mx-auto max-w-md space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">당신의 패턴을 봤어요</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                이전 기록을 보니 흥미로운 걸 발견했어요
              </p>
            </div>

            <div className="space-y-3">
              <Card className="border-chart-3/30 bg-chart-3/10 p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-3/20">
                    <Sparkles className="h-5 w-5 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-foreground">반복되는 상황</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      지난 2번의 회복에서도 "피곤했어요"와 "예상치 못한 일"을 선택했어요
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-primary/30 bg-primary/10 p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-foreground">발견한 것</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      당신은 예측 불가능한 상황에서 미끄러지는 경향이 있어요. 이건 약속이 너무 빡빡하다는 신호일 수
                      있어요.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-chart-2/30 bg-chart-2/10 p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-2/20">
                    <Heart className="h-5 w-5 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-sm font-semibold text-foreground">당신의 강점</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      {currentPledge.totalRepairs}번 돌아왔어요. 이게 진짜 끈기예요. 완벽한 연속성보다 훨씬 강력합니다.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Button size="lg" className="h-14 w-full rounded-full" onClick={() => setStep("rule-check")}>
              규칙을 다시 살펴보기
            </Button>
          </div>
        )}

        {step === "rule-check" && (
          <div className="mx-auto max-w-md space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">규칙이 잘못된 걸까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                당신이 문제가 아니라 <span className="font-medium text-foreground">규칙이 맞지 않을 수</span> 있어요.
                현실에 맞게 재설계하는 건 지혜예요.
              </p>
            </div>

            <Card className="border-border bg-card p-5">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">현재 약속</p>
                  <p className="text-base font-semibold text-foreground">{currentPledge.title}</p>
                </div>
                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground">이 약속에 대해</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• 빈도: 매일</p>
                    <p>• 예외 규칙: 없음</p>
                    <p>• 난이도: 높음</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">이 규칙이 너무 엄격한가요?</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 flex-col gap-1 rounded-xl bg-transparent"
                  onClick={() => setStep("redesign")}
                >
                  <span className="font-semibold text-foreground">네</span>
                  <span className="text-xs text-muted-foreground">조정할게요</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 flex-col gap-1 rounded-xl bg-transparent"
                  onClick={() => setStep("redesign")}
                >
                  <span className="font-semibold text-foreground">아니요</span>
                  <span className="text-xs text-muted-foreground">그대로 갈게요</span>
                </Button>
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/5 p-4">
              <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">알림:</span> 패턴을 보니 유연성을 조금 더하면 장기적으로
                더 지속 가능할 것 같아요
              </p>
            </Card>
          </div>
        )}

        {step === "redesign" && (
          <div className="mx-auto max-w-md space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">리듬을 재설계해봐요</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                어떤 방식으로 다시 시작할까요? 완벽한 답은 없어요, 당신에게 맞는 리듬을 찾는 거예요.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedRedesign("same")}
                className={cn(
                  "w-full rounded-xl border-2 p-5 text-left transition-all",
                  selectedRedesign === "same"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30",
                )}
              >
                <p className="mb-1 font-semibold text-foreground">원래대로 다시 시작</p>
                <p className="mb-2 text-sm text-muted-foreground">매일 아침 7시에 일어나기</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  규칙은 괜찮아요. 이번 주는 특별한 상황이었을 뿐이에요.
                </p>
              </button>

              <button
                onClick={() => setSelectedRedesign("flexible")}
                className={cn(
                  "w-full rounded-xl border-2 p-5 text-left transition-all",
                  selectedRedesign === "flexible"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30",
                )}
              >
                <p className="mb-1 font-semibold text-foreground">
                  유연성 더하기
                  <span className="ml-2 text-xs font-normal text-primary">(추천)</span>
                </p>
                <p className="mb-2 text-sm text-muted-foreground">주 5회 아침 7시에 일어나기</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  일주일에 이틀은 여유를 줘요. 더 오래 지속할 수 있어요.
                </p>
              </button>

              <button
                onClick={() => setSelectedRedesign("adjust")}
                className={cn(
                  "w-full rounded-xl border-2 p-5 text-left transition-all",
                  selectedRedesign === "adjust"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30",
                )}
              >
                <p className="mb-1 font-semibold text-foreground">시간 조정하기</p>
                <p className="mb-2 text-sm text-muted-foreground">매일 아침 7시 30분에 일어나기</p>
                <p className="text-xs text-muted-foreground leading-relaxed">30분의 여유가 큰 차이를 만들 수 있어요.</p>
              </button>

              <button
                onClick={() => setSelectedRedesign("redesign")}
                className={cn(
                  "w-full rounded-xl border-2 p-5 text-left transition-all",
                  selectedRedesign === "redesign"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30",
                )}
              >
                <p className="mb-1 font-semibold text-foreground">처음부터 다시 설계</p>
                <p className="mb-2 text-sm text-muted-foreground">약속을 완전히 새로 만들기</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  원래 의미(WHY)는 유지하되, 방법(WHAT/WHEN)을 바꿔봐요.
                </p>
              </button>
            </div>

            <Card className="border-chart-2/20 bg-chart-2/5 p-4">
              <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                조정하는 건 포기가 아니에요.
                <span className="font-medium text-foreground"> 더 나은 버전을 찾아가는 과정</span>이에요.
              </p>
            </Card>

            <Button
              size="lg"
              className="h-14 w-full rounded-full"
              onClick={() => setStep("celebrate")}
              disabled={!selectedRedesign}
            >
              이 방식으로 시작하기
            </Button>
          </div>
        )}

        {step === "celebrate" && (
          <div className="mx-auto max-w-md space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 shadow-lg">
                  <Heart className="h-14 w-14 text-primary" />
                </div>
                <div className="absolute -right-1 -top-1 animate-bounce">
                  <Sparkles className="h-8 w-8 text-chart-3 drop-shadow-md" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-pretty text-3xl font-bold text-foreground">환영합니다</h2>
                <p className="text-pretty text-lg text-muted-foreground leading-relaxed">리듬을 다시 맞췄어요</p>
              </div>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-chart-2/5 to-transparent p-6 shadow-md">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="mb-2 text-3xl font-bold text-primary">{currentPledge.totalRepairs + 1}번째</p>
                  <p className="text-sm font-medium text-foreground">회복의 순간</p>
                </div>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-pretty text-center text-sm text-muted-foreground leading-relaxed">
                    한 번도 미끄러지지 않은 사람보다,{" "}
                    <span className="font-semibold text-foreground">
                      {currentPledge.totalRepairs + 1}번 돌아온 당신이 더 대단해요
                    </span>
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3 rounded-2xl bg-muted/50 p-5">
              <p className="text-sm font-medium text-foreground">기억하세요</p>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>• 미끄러짐은 정체성을 깨지 않아요</p>
                <p>• 귀환이야말로 진짜 힘이에요</p>
                <p>• 이 여정이 당신의 이야기가 돼요</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button size="lg" className="h-14 w-full rounded-full shadow-md" onClick={onClose}>
                내 리듬으로 돌아가기
              </Button>
              <p className="text-pretty text-center text-xs text-muted-foreground">
                언제든 다시 올 수 있어요. 이곳은 항상 열려 있습니다.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
