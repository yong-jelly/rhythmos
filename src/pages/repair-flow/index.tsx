import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Check, RotateCcw, Lightbulb, Heart, Sparkles } from "lucide-react";
import { Button, Card, Textarea, Progress, Badge } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { usePledgeStore } from "@/entities/pledge";
import { post_repair_submit } from "@/shared/api/mocks";

type RepairStep = "cause" | "redesign" | "mission" | "complete";

const steps: RepairStep[] = ["cause", "redesign", "mission", "complete"];

const causeTags = [
  { id: "fatigue", label: "피로/컨디션", icon: "😴" },
  { id: "schedule", label: "예상치 못한 일정", icon: "📅" },
  { id: "environment", label: "환경 변화", icon: "🏠" },
  { id: "motivation", label: "동기 부족", icon: "💭" },
  { id: "emotion", label: "감정적 어려움", icon: "😢" },
  { id: "social", label: "회식/모임", icon: "🍻" },
  { id: "travel", label: "여행/출장", icon: "✈️" },
  { id: "other", label: "기타", icon: "📝" },
];

const redesignSuggestions = [
  { id: "reduce_freq", label: "빈도 줄이기", desc: "매일 → 주 5회 또는 주 3회" },
  { id: "lower_goal", label: "목표 낮추기", desc: "30분 → 15분, 또는 더 작게" },
  { id: "change_time", label: "시간대 바꾸기", desc: "아침 → 저녁, 또는 반대로" },
  { id: "add_trigger", label: "트리거 추가", desc: "기존 습관에 연결하기" },
  { id: "get_support", label: "도움 요청하기", desc: "가족이나 동료에게 알리기" },
  { id: "simplify", label: "더 단순하게", desc: "핵심만 남기고 줄이기" },
];

export function RepairFlowPage() {
  const navigate = useNavigate();
  const { pledges, fetchPledges, getSlippedPledges } = usePledgeStore();
  const [currentStep, setCurrentStep] = useState<RepairStep>("cause");
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [situationNote, setSituationNote] = useState("");
  const [selectedRedesigns, setSelectedRedesigns] = useState<string[]>([]);
  const [newRules, setNewRules] = useState("");
  const [missionNote, setMissionNote] = useState("");

  useEffect(() => {
    fetchPledges();
  }, [fetchPledges]);

  const slippedPledges = getSlippedPledges();
  const pledge = slippedPledges[0] || pledges[0];

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const toggleCause = (causeId: string) => {
    setSelectedCauses((prev) =>
      prev.includes(causeId) ? prev.filter((id) => id !== causeId) : [...prev, causeId]
    );
  };

  const toggleRedesign = (redesignId: string) => {
    setSelectedRedesigns((prev) =>
      prev.includes(redesignId) ? prev.filter((id) => id !== redesignId) : [...prev, redesignId]
    );
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleComplete = () => {
    if (pledge) {
      post_repair_submit({
        pledgeId: pledge.id,
        causeTags: selectedCauses,
        situationNote,
        newRules,
        missionNote,
      });
    }
    navigate("/home");
  };

  if (!pledge) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center">
          <p className="text-muted-foreground">회복할 약속이 없습니다.</p>
          <Button className="mt-4" onClick={() => navigate("/home")}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm safe-area-top">
        <div className="px-6 py-4">
          <div className="mb-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">리듬 다시 맞추기</h1>
            <span className="text-sm text-muted-foreground">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {/* Cause Step */}
        {currentStep === "cause" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <Card className="border-warning/30 bg-gradient-to-br from-warning/5 to-transparent p-5">
              <div className="flex gap-3">
                <RotateCcw className="mt-0.5 h-6 w-6 flex-shrink-0 text-warning" />
                <div>
                  <h3 className="mb-1 font-medium text-foreground">{pledge.title}</h3>
                  <p className="text-sm text-muted-foreground">리듬이 흔들렸어요. 괜찮아요, 함께 다시 맞춰봐요.</p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">무슨 일이 있었나요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                자책하지 않아도 돼요. 원인을 이해하면 더 나은 설계를 할 수 있어요.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">해당되는 것을 모두 선택해주세요</p>
              <div className="grid grid-cols-2 gap-2">
                {causeTags.map((cause) => (
                  <Button
                    key={cause.id}
                    variant={selectedCauses.includes(cause.id) ? "default" : "outline"}
                    size="sm"
                    className="h-auto justify-start gap-2 rounded-xl p-3 text-left"
                    onClick={() => toggleCause(cause.id)}
                  >
                    <span className="text-lg">{cause.icon}</span>
                    <span className="text-sm">{cause.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">더 자세히 이야기해주세요 (선택)</label>
              <Textarea
                placeholder="예: 지난주에 야근이 많아서 아침에 일어나기가 너무 힘들었어요"
                value={situationNote}
                onChange={(e) => setSituationNote(e.target.value)}
                className="min-h-24"
              />
            </div>

            <Card className="border-primary/20 bg-primary/5 p-4">
              <div className="flex gap-3">
                <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                  이 정보는 나중에 당신의 패턴을 이해하고, 더 현실적인 약속을 만드는 데 도움이 됩니다.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Redesign Step */}
        {currentStep === "redesign" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">어떻게 다시 설계할까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                실패는 설계가 현실과 맞지 않았다는 신호예요. 더 지속 가능한 방법을 찾아봐요.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedCauses.map((causeId) => {
                const cause = causeTags.find((c) => c.id === causeId);
                return cause ? (
                  <Badge key={causeId} variant="secondary" className="gap-1">
                    <span>{cause.icon}</span>
                    <span>{cause.label}</span>
                  </Badge>
                ) : null;
              })}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">도움이 될 것 같은 방법을 선택해보세요</p>
              <div className="space-y-2">
                {redesignSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant={selectedRedesigns.includes(suggestion.id) ? "default" : "outline"}
                    size="lg"
                    className="h-auto w-full flex-col items-start gap-1 rounded-xl p-4 text-left"
                    onClick={() => toggleRedesign(suggestion.id)}
                  >
                    <span className="font-semibold">{suggestion.label}</span>
                    <span
                      className={cn(
                        "text-sm",
                        selectedRedesigns.includes(suggestion.id)
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {suggestion.desc}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">새로운 규칙 (선택)</label>
              <Textarea
                placeholder="예: 주 5회로 줄이고, 주말에는 쉬기. 7시가 힘들면 7시 30분까지 허용."
                value={newRules}
                onChange={(e) => setNewRules(e.target.value)}
                className="min-h-24"
              />
              <p className="text-xs text-muted-foreground">
                구체적으로 어떻게 바꿀지 적어보면 실천하기 쉬워요.
              </p>
            </div>

            <Card className="border-chart-2/20 bg-chart-2/5 p-4">
              <div className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-chart-2" />
                <div className="space-y-1">
                  <p className="font-medium text-foreground text-sm">재설계의 힘</p>
                  <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                    "다시 시작"이 아니라 "다시 설계"하는 거예요. 당신은 지금 설계자 모드에 있습니다.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Mission Step */}
        {currentStep === "mission" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">첫 번째 회복 미션</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                벌이 아니라 재시작이에요. 오늘 또는 내일 할 수 있는 아주 작은 것 하나를 정해봐요.
              </p>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-5">
              <div className="mb-4 flex gap-3">
                <Sparkles className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-1 font-medium text-foreground">회복 미션이란?</h3>
                  <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                    큰 목표를 향해 뛰는 게 아니라, "다시 리듬에 올라타는" 아주 작은 행동이에요.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">오늘 또는 내일 할 작은 행동</label>
              <Textarea
                placeholder="예: 내일 아침 7시 30분에 알람 맞추기. 일어나면 창문만 열기."
                value={missionNote}
                onChange={(e) => setMissionNote(e.target.value)}
                className="min-h-28"
              />
              <p className="text-xs text-muted-foreground">
                5분 안에 끝날 수 있는 것이면 충분해요. 작을수록 좋아요.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">아이디어</p>
              <div className="space-y-2">
                {[
                  "알람 시간만 다시 설정하기",
                  "내일 할 옷 미리 준비해두기",
                  "물 한 잔만 마시기",
                  "5분만 산책하기",
                  "가족에게 다시 시작한다고 말하기",
                ].map((idea) => (
                  <div
                    key={idea}
                    className="cursor-pointer rounded-lg border border-border/60 bg-muted/30 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                    onClick={() => setMissionNote(idea)}
                  >
                    {idea}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === "complete" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-breathe">
                <RotateCcw className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-3 text-center">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">
                당신은 지금 다시 설계 중입니다
              </h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">이게 진짜 성장이에요.</p>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/5 p-6">
              <div className="space-y-4">
                {selectedCauses.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">원인</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCauses.map((causeId) => {
                        const cause = causeTags.find((c) => c.id === causeId);
                        return cause ? (
                          <Badge key={causeId} variant="secondary" className="gap-1">
                            <span>{cause.icon}</span>
                            <span>{cause.label}</span>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {selectedRedesigns.length > 0 && (
                  <div className="border-t border-border/40 pt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">재설계</p>
                    <ul className="space-y-1 text-sm text-foreground">
                      {selectedRedesigns.map((id) => {
                        const suggestion = redesignSuggestions.find((s) => s.id === id);
                        return suggestion ? <li key={id}>• {suggestion.label}</li> : null;
                      })}
                    </ul>
                  </div>
                )}

                {newRules && (
                  <div className="border-t border-border/40 pt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">새 규칙</p>
                    <p className="text-sm text-foreground whitespace-pre-line">{newRules}</p>
                  </div>
                )}

                {missionNote && (
                  <div className="border-t border-border/40 pt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      회복 미션
                    </p>
                    <p className="text-sm font-medium text-primary">{missionNote}</p>
                  </div>
                )}
              </div>
            </Card>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-pretty text-center text-sm text-muted-foreground leading-relaxed">
                이 기록은 나중에 당신의 패턴을 이해하는 데 도움이 됩니다.
                <br />
                미끄러질 때마다 더 나은 설계자가 되어가고 있어요.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 border-t border-border/40 bg-background/80 px-6 py-4 backdrop-blur-sm safe-area-bottom">
        <div className="mx-auto flex max-w-md items-center gap-3">
          {currentStepIndex > 0 && currentStep !== "complete" && (
            <Button variant="outline" size="lg" className="h-12 flex-1 rounded-full bg-transparent" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              이전
            </Button>
          )}
          {currentStep !== "complete" ? (
            <Button
              size="lg"
              className="h-12 flex-1 rounded-full"
              onClick={handleNext}
              disabled={currentStep === "cause" && selectedCauses.length === 0}
            >
              다음
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" className="h-12 w-full rounded-full gap-2" onClick={handleComplete}>
              <Check className="h-5 w-5" />
              리듬 다시 맞추기 완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

