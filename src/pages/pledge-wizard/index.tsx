import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Check, BookOpen, Heart, Sparkles, Moon, Shield, Lightbulb } from "lucide-react";
import { Button, Card, Input, Textarea, Progress } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

type WizardStep = "intro" | "why" | "what" | "when" | "repair" | "identity" | "summary";

interface PledgeData {
  title: string;
  why: string;
  what: string;
  when: string;
  whenDetail: string;
  gracePeriod: string;
  repairTrigger: string;
  repairAction: string;
  identityStatement: string;
  shareWith: "myself" | "family" | "colleagues";
}

const steps: WizardStep[] = ["intro", "why", "what", "when", "repair", "identity", "summary"];

const frequencyOptions = [
  { label: "매일", description: "하루도 빠지지 않고", value: "daily" },
  { label: "주 5회", description: "주중에만, 주말은 쉬어요", value: "weekly_5" },
  { label: "주 3회", description: "이틀에 한 번 정도", value: "weekly_3" },
  { label: "주말만", description: "평일은 여유롭게", value: "weekend" },
];

const whyExamples = [
  "아침 시간을 온전히 나를 위해 쓰고 싶어요",
  "밤에 과식하면 다음날 몸이 무겁고 자책하게 돼요",
  "아이들에게 약속 지키는 모습을 보여주고 싶어요",
  "책을 읽으면 생각이 정리되고 마음이 차분해져요",
];

const repairIdeas = [
  "빈도 줄이기 (매일 → 주 5회)",
  "목표 낮추기 (30분 → 15분)",
  "시간대 바꾸기 (아침 → 저녁)",
  "누군가에게 도움 요청하기",
];

const identityExamples = [
  "나는 아침을 소중히 여기는 사람이다",
  "나는 내 몸의 신호를 존중하는 사람이다",
  "나는 약속을 지키는 부모다",
  "나는 차분히 생각하는 시간을 갖는 사람이다",
];

export function PledgeWizardPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>("intro");
  const [pledgeData, setPledgeData] = useState<PledgeData>({
    title: "",
    why: "",
    what: "",
    when: "",
    whenDetail: "",
    gracePeriod: "",
    repairTrigger: "",
    repairAction: "",
    identityStatement: "",
    shareWith: "myself",
  });

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

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
    console.log("[v0] Pledge created:", pledgeData);
    navigate("/home");
  };

  const updateData = (field: keyof PledgeData, value: string) => {
    setPledgeData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm safe-area-top">
        <div className="px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">약속 설계하기</h1>
            <span className="text-sm text-muted-foreground">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-8">
        {/* Intro Step */}
        {currentStep === "intro" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="space-y-3 text-center">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">새로운 약속을 설계해볼까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                여기서는 목표를 정하지 않아요. 대신{" "}
                <span className="font-semibold text-foreground">어떻게 살고 싶은지</span>를 설계합니다.
              </p>
            </div>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Heart className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-1 font-medium text-foreground">의미부터 시작해요</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      왜 이걸 하고 싶은지부터 물어볼게요
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-chart-2" />
                  <div>
                    <p className="mb-1 font-medium text-foreground">미끄러짐을 미리 계획해요</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      못 지킬 때를 미리 생각하면 당황하지 않아요
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Moon className="mt-0.5 h-5 w-5 flex-shrink-0 text-chart-3" />
                  <div>
                    <p className="mb-1 font-medium text-foreground">작고 지속 가능하게</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      거창한 목표보다 매일 할 수 있는 작은 것을 찾아요
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-pretty text-center text-sm text-muted-foreground leading-relaxed">
                이 과정은 언제든 멈추고 나중에 이어할 수 있어요. 천천히 생각하며 진행하세요.
              </p>
            </div>
          </div>
        )}

        {/* Why Step */}
        {currentStep === "why" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">왜 이 약속을 하고 싶나요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                목표가 아니라 의미부터 시작해요. 이게 당신에게 왜 중요한가요?
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="예시를 눌러보세요..."
                value={pledgeData.why}
                onChange={(e) => updateData("why", e.target.value)}
                className="min-h-32 text-base"
              />

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  예시 (터치하면 입력돼요)
                </p>
                <div className="space-y-2">
                  {whyExamples.map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      className="h-auto w-full justify-start whitespace-normal rounded-lg p-3 text-left text-sm bg-transparent"
                      onClick={() => updateData("why", example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="border-primary/20 bg-primary/5 p-4">
                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                    이 문장은 힘들 때 돌아볼 나침반이 돼요. 솔직하게, 당신 언어로 써주세요.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* What Step */}
        {currentStep === "what" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">구체적으로 무엇을 할까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                작고 명확하게. "할 수 있을까?" 싶을 정도로 작게 시작하세요.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">약속 제목</label>
                <Input
                  placeholder="예: 아침 7시에 일어나기"
                  value={pledgeData.title}
                  onChange={(e) => updateData("title", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">최소 실행 가능한 버전</label>
                <Textarea
                  placeholder="예: 알람이 울리면 침대에서 일어나 창문을 열고 물 한 잔 마시기"
                  value={pledgeData.what}
                  onChange={(e) => updateData("what", e.target.value)}
                  className="min-h-24 text-base"
                />
                <p className="text-xs text-muted-foreground">완벽하지 않아도 돼요. 5분 안에 끝낼 수 있으면 좋아요.</p>
              </div>

              <Card className="border-chart-2/20 bg-chart-2/5 p-4">
                <div className="flex gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-chart-2" />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">작게 시작하는 이유</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      거창한 계획은 부담이 돼요. 매일 할 수 있는 최소한을 찾으면 리듬이 생겨요.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* When Step */}
        {currentStep === "when" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">어떤 리듬이 자연스러울까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                매일? 주 3회? 주말만? 무리하지 않고 지킬 수 있는 빈도를 찾아봐요.
              </p>
            </div>

            <div className="space-y-3">
              {frequencyOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={pledgeData.when === option.value ? "default" : "outline"}
                  size="lg"
                  className="h-auto w-full flex-col items-start gap-1 rounded-xl p-4 text-left"
                  onClick={() => updateData("when", option.value)}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span
                    className={cn(
                      "text-sm",
                      pledgeData.when === option.value ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {option.description}
                  </span>
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">시간대나 상황 (선택)</label>
              <Input
                placeholder="예: 아침 7시, 저녁 식사 후, 출근 전"
                value={pledgeData.whenDetail}
                onChange={(e) => updateData("whenDetail", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">예외가 필요한 상황 (선택)</label>
              <Textarea
                placeholder="예: 야근하는 날, 회식 있을 때, 여행 중"
                value={pledgeData.gracePeriod}
                onChange={(e) => updateData("gracePeriod", e.target.value)}
                className="min-h-20"
              />
              <p className="text-xs text-muted-foreground">예외를 미리 정하는 것은 실패가 아니라 현실적인 설계예요.</p>
            </div>
          </div>
        )}

        {/* Repair Step */}
        {currentStep === "repair" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">미끄러지면 어떻게 돌아올까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                리듬이 어긋날 수 있어요. 그때를 미리 생각해두면 자책 대신 회복할 수 있어요.
              </p>
            </div>

            <Card className="border-chart-3/20 bg-chart-3/5 p-5">
              <div className="mb-4 flex gap-3">
                <Shield className="mt-0.5 h-6 w-6 flex-shrink-0 text-chart-3" />
                <div>
                  <p className="mb-1 font-semibold text-foreground">회복 계획을 미리 세우는 이유</p>
                  <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                    실패를 인정하는 게 아니라, 계속 지속 가능하게 만드는 설계예요. 이게 귀환성의 핵심입니다.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">어떤 상황이면 리듬이 깨질까요?</label>
                <Textarea
                  placeholder="예: 3일 연속 못 지키면, 한 주 내내 한 번도 못하면"
                  value={pledgeData.repairTrigger}
                  onChange={(e) => updateData("repairTrigger", e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">그때 어떻게 다시 시작할까요?</label>
                <Textarea
                  placeholder="예: 빈도를 주 3회로 줄이기, 목표 시간을 30분 늦추기"
                  value={pledgeData.repairAction}
                  onChange={(e) => updateData("repairAction", e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">회복 아이디어</p>
                <div className="space-y-2">
                  {repairIdeas.map((idea) => (
                    <div
                      key={idea}
                      className="cursor-pointer rounded-lg border border-border/60 bg-muted/30 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                      onClick={() =>
                        updateData(
                          "repairAction",
                          pledgeData.repairAction ? `${pledgeData.repairAction}\n${idea}` : idea
                        )
                      }
                    >
                      {idea}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Identity Step */}
        {currentStep === "identity" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">이 약속은 어떤 나를 만들까요?</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                습관은 정체성을 만들어요. 이 약속을 지키는 당신은 어떤 사람인가요?
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">한 문장으로 표현해보세요</label>
                <Input
                  placeholder="예: 나는 아침을 소중히 여기는 사람이다"
                  value={pledgeData.identityStatement}
                  onChange={(e) => updateData("identityStatement", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">예시</p>
                <div className="space-y-2">
                  {identityExamples.map((statement) => (
                    <Button
                      key={statement}
                      variant="outline"
                      size="sm"
                      className="h-auto w-full justify-start whitespace-normal rounded-lg p-3 text-left text-sm bg-transparent"
                      onClick={() => updateData("identityStatement", statement)}
                    >
                      {statement}
                    </Button>
                  ))}
                </div>
              </div>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5">
                <div className="flex gap-3">
                  <Heart className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-2 font-semibold text-foreground">정체성이 중요한 이유</p>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
                      "나는 운동하려는 사람"이 아니라 "나는 운동하는 사람"으로 생각하면, 행동이 정체성의 표현이 돼요.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">누구와 함께할까요?</label>
                <div className="space-y-2">
                  {(
                    [
                      { value: "myself", label: "나 혼자", desc: "조용히 내 리듬을 만들고 싶어요" },
                      { value: "family", label: "가족과 함께", desc: "서로 응원하며 지속하고 싶어요" },
                    ] as const
                  ).map((option) => (
                    <Button
                      key={option.value}
                      variant={pledgeData.shareWith === option.value ? "default" : "outline"}
                      size="lg"
                      className="h-auto w-full flex-col items-start gap-1 rounded-xl p-4 text-left"
                      onClick={() => updateData("shareWith", option.value)}
                    >
                      <span className="font-semibold">{option.label}</span>
                      <span
                        className={cn(
                          "text-sm",
                          pledgeData.shareWith === option.value ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}
                      >
                        {option.desc}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Step */}
        {currentStep === "summary" && (
          <div className="mx-auto max-w-md space-y-6 animate-fade-in">
            <div className="space-y-2 text-center">
              <h2 className="text-pretty text-2xl font-semibold text-foreground">당신은 이런 약속을 설계했어요</h2>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                이제 시작할 준비가 됐나요? 언제든 다시 설계할 수 있어요.
              </p>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/5 p-6">
              <div className="space-y-5">
                {pledgeData.why && (
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">왜</h3>
                    </div>
                    <p className="text-pretty text-sm text-foreground leading-relaxed">{pledgeData.why}</p>
                  </div>
                )}

                {pledgeData.title && (
                  <div className="border-t border-border/40 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">무엇을</h3>
                    </div>
                    <h4 className="mb-1 font-semibold text-foreground">{pledgeData.title}</h4>
                    {pledgeData.what && (
                      <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{pledgeData.what}</p>
                    )}
                  </div>
                )}

                {pledgeData.when && (
                  <div className="border-t border-border/40 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Moon className="h-4 w-4 text-chart-3" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">언제</h3>
                    </div>
                    <p className="text-sm text-foreground">
                      {frequencyOptions.find((f) => f.value === pledgeData.when)?.label}
                      {pledgeData.whenDetail && ` · ${pledgeData.whenDetail}`}
                    </p>
                  </div>
                )}

                {pledgeData.repairAction && (
                  <div className="border-t border-border/40 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-chart-2" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">회복 계획</h3>
                    </div>
                    <p className="text-pretty text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {pledgeData.repairAction}
                    </p>
                  </div>
                )}

                {pledgeData.identityStatement && (
                  <div className="border-t border-border/40 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">정체성</h3>
                    </div>
                    <p className="text-pretty text-sm italic text-foreground leading-relaxed">
                      "{pledgeData.identityStatement}"
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-pretty text-center text-sm text-muted-foreground leading-relaxed">
                첫 단계는 이 약속을 14일 동안 지켜보는 거예요. 미끄러져도 괜찮아요. 함께 조정해나가면 돼요.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 border-t border-border/40 bg-background/80 px-4 py-4 backdrop-blur-sm safe-area-bottom">
        <div className="mx-auto flex max-w-md items-center gap-3">
          {currentStepIndex > 0 && (
            <Button variant="outline" size="lg" className="h-12 flex-1 rounded-full bg-transparent" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              이전
            </Button>
          )}
          {currentStepIndex < steps.length - 1 ? (
            <Button size="lg" className="h-12 flex-1 rounded-full" onClick={handleNext}>
              다음
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" className="h-12 flex-1 rounded-full gap-2" onClick={handleComplete}>
              <Check className="h-5 w-5" />
              약속 시작하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


