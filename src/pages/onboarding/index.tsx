import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, RefreshCcw, Users, Shield, Lock, Sparkles, User } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface OnboardingStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    icon: <RefreshCcw className="h-8 w-8" />,
    title: "당신은 몇 번이나 다시 시작해봤나요?",
    description: "우리는 그 횟수가 많을수록 대단하다고 생각합니다. 다시 시작한다는 건, 포기하지 않았다는 뜻이니까요.",
    highlight: "귀환이야말로 진짜 지속입니다",
  },
  {
    id: 2,
    icon: <Heart className="h-8 w-8" />,
    title: "여기는 의지력 테스트 앱이 아닙니다",
    description: "연속 기록에 집착하지 않아요. 끊겼다가 다시 돌아오는 것, 그게 진짜 삶의 리듬입니다.",
    highlight: "연속은 환상, 귀환이 현실",
  },
  {
    id: 3,
    icon: <Sparkles className="h-8 w-8" />,
    title: "설계하고, 살아보고, 다시 설계하세요",
    description: "목표를 정하고 실패를 두려워하는 대신, 약속을 설계하고 미끄러지면 다시 조정합니다.",
    highlight: "4행정 엔진: 설계 → 실행 → 회복 → 서사",
  },
  {
    id: 4,
    icon: <Shield className="h-8 w-8" />,
    title: "약속은 목표가 아닙니다",
    description: "목표는 도달점이지만, 약속은 하루를 살아가는 방식입니다. 작은 규칙이 삶의 리듬이 됩니다.",
    highlight: "어떻게 살고 싶은가",
  },
  {
    id: 5,
    icon: <RefreshCcw className="h-8 w-8" />,
    title: "실패는 탈락이 아니라 신호입니다",
    description: "미끄러지면 왜 그랬는지 기록하고, 규칙을 조정합니다. 자책 대신 재설계. 그게 성장입니다.",
    highlight: "회복 기록이 가장 중요한 자산",
  },
  {
    id: 6,
    icon: <Users className="h-8 w-8" />,
    title: "서로를 감시하지 않습니다",
    description: "가족이나 동료와 함께할 때, 점수나 순위를 보여주지 않아요. 상태와 응원만 공유합니다.",
    highlight: "감시가 아닌 공명",
  },
  {
    id: 7,
    icon: <Lock className="h-8 w-8" />,
    title: "당신의 기록은 당신 것입니다",
    description: "모든 데이터는 기본적으로 이 기기 안에 머무릅니다. 당신의 삶의 원문은 당신 손에.",
    highlight: "로컬 퍼스트",
  },
  {
    id: 8,
    icon: <User className="h-8 w-8" />,
    title: "누구와 먼저 약속을 만들까요?",
    description: "혼자 조용히 시작해도 좋고, 가족이나 동료와 함께해도 좋습니다.",
    highlight: "당신의 방식으로",
  },
];

type StartOption = "myself" | "family" | "colleagues";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<StartOption | null>(null);

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep && selectedOption) {
      navigate("/home");
    } else if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress indicator */}
      <div className="safe-area-top px-6 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {onboardingSteps.length}
          </span>
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
            건너뛰기
          </Button>
        </div>
        <div className="flex gap-1.5">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm space-y-8 animate-fade-in" key={currentStep}>
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-breathe">
              {step.icon}
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-4 text-center">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground leading-tight">
              {step.title}
            </h1>
            <p className="text-pretty text-muted-foreground leading-relaxed">{step.description}</p>
            {step.highlight && (
              <p className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {step.highlight}
              </p>
            )}
          </div>

          {/* Last step: option selection */}
          {isLastStep && (
            <div className="space-y-3 pt-4">
              {(
                [
                  { value: "myself", label: "나 혼자", desc: "조용히 내 리듬을 만들고 싶어요" },
                  { value: "family", label: "가족과 함께", desc: "서로 응원하며 지속하고 싶어요" },
                  { value: "colleagues", label: "동료와 함께", desc: "함께 도전하고 싶어요" },
                ] as const
              ).map((option) => (
                <Button
                  key={option.value}
                  variant={selectedOption === option.value ? "default" : "outline"}
                  size="lg"
                  className="h-auto w-full flex-col items-start gap-1 rounded-xl p-4 text-left"
                  onClick={() => setSelectedOption(option.value)}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span
                    className={cn(
                      "text-sm",
                      selectedOption === option.value ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {option.desc}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom navigation */}
      <div className="safe-area-bottom px-6 pb-6">
        <Button
          size="xl"
          className="w-full rounded-full"
          onClick={handleNext}
          disabled={isLastStep && !selectedOption}
        >
          {isLastStep ? "시작하기" : "다음"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}


