import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Check, BookOpen, Heart, Sparkles, Moon, Shield, Lightbulb, ChevronRight, Info, Users } from "lucide-react";
import { Button, Card, Input, Textarea, Progress, Badge, Avatar, AvatarImage, AvatarFallback } from "@/shared/ui";
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
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md safe-area-top border-b border-slate-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100" onClick={() => navigate(-1)}>
              <X className="h-5 w-5 text-slate-500" />
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Step {currentStepIndex + 1} of {steps.length}</span>
              <h1 className="text-[15px] font-black text-slate-900">약속 설계 프로세스</h1>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
        <div className="h-1 w-full bg-slate-50">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-8 max-w-2xl mx-auto w-full">
        {/* Intro Step */}
        {currentStep === "intro" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                시작하기
              </Badge>
              <h2 className="text-[32px] font-black leading-[1.1] tracking-[-0.04em] text-slate-900 mb-4">
                새로운 리듬을<br />찾아볼까요?
              </h2>
              <p className="text-[16px] font-medium leading-relaxed text-slate-500">
                여기서는 완벽한 성공을 목표로 하지 않아요. 대신 <span className="text-slate-900 font-bold">지속 가능한 삶의 리듬</span>을 설계합니다.
              </p>
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden bg-white p-8">
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black text-slate-900 mb-1">의미부터 시작해요</h3>
                    <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                      단순한 동작이 아니라, 당신에게 왜 중요한지부터 물어볼게요.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-chart-2/10">
                    <Shield className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black text-slate-900 mb-1">귀환을 계획해요</h3>
                    <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                      리듬은 깨질 수 있습니다. 그때 어떻게 다시 돌아올지 미리 약속해요.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-chart-3/10">
                    <Moon className="h-6 w-6 text-chart-3" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-black text-slate-900 mb-1">작고 지속 가능하게</h3>
                    <p className="text-[14px] font-medium text-slate-500 leading-relaxed">
                      거창한 도전보다 매일 할 수 있는 작은 변주가 더 강력합니다.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center gap-3 px-6 py-4 bg-slate-100/50 rounded-[24px] border border-slate-200/60">
              <Info className="h-4 w-4 text-slate-400" />
              <p className="text-[13px] font-bold text-slate-500">
                약 5분 정도 소요됩니다. 당신의 속도에 맞추세요.
              </p>
            </div>
          </div>
        )}

        {/* Why Step */}
        {currentStep === "why" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                의미 찾기
              </Badge>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                왜 이 약속을<br />하고 싶나요?
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                목표가 아니라 의미부터 시작해요. 이게 당신에게 왜 중요한가요?
              </p>
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white overflow-hidden">
              <div className="p-8 space-y-6">
                <Textarea
                  placeholder="당신의 마음을 적어주세요..."
                  value={pledgeData.why}
                  onChange={(e) => updateData("why", e.target.value)}
                  className="min-h-[160px] text-[16px] font-medium border-slate-200 focus:ring-primary/20 rounded-2xl resize-none p-4"
                />

                <div className="space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">영감을 주는 예시</span>
                  <div className="flex flex-wrap gap-2">
                    {whyExamples.map((example) => (
                      <button
                        key={example}
                        onClick={() => updateData("why", example)}
                        className="px-4 py-2 text-[13px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-primary/5 rounded-[24px] p-6 flex gap-4 border border-primary/10">
              <Sparkles className="h-6 w-6 text-primary shrink-0" />
              <p className="text-[14px] font-medium text-primary/80 leading-relaxed">
                이 문장은 리듬이 흔들릴 때 돌아올 <span className="font-bold">나침반</span>이 됩니다. 당신만의 언어로 솔직하게 적어보세요.
              </p>
            </div>
          </div>
        )}

        {/* What Step */}
        {currentStep === "what" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                행동 설계
              </Badge>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                무엇을<br />실행할까요?
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                "할 수 있을까?" 싶을 정도로 작게 시작하세요.
              </p>
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white overflow-hidden">
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">약속의 이름</label>
                  <Input
                    placeholder="예: 아침 명상 5분"
                    value={pledgeData.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    className="h-14 text-[18px] font-bold border-slate-200 focus:ring-primary/20 rounded-2xl px-4"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">최소 실행 가능 버전 (MVP)</label>
                  <Textarea
                    placeholder="예: 눈을 감고 심호흡 3번 하기"
                    value={pledgeData.what}
                    onChange={(e) => updateData("what", e.target.value)}
                    className="min-h-[100px] text-[16px] font-medium border-slate-200 focus:ring-primary/20 rounded-2xl resize-none p-4"
                  />
                  <p className="text-[12px] font-bold text-slate-400">아무리 바빠도 2분 안에 끝낼 수 있는 버전이면 좋습니다.</p>
                </div>
              </div>
            </Card>

            <div className="bg-amber-50 rounded-[24px] p-6 flex gap-4 border border-amber-100">
              <Lightbulb className="h-6 w-6 text-amber-500 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-[14px] font-black text-amber-900">작게 시작하는 지혜</h4>
                <p className="text-[13px] font-medium text-amber-700 leading-relaxed">
                  거창한 계획은 부담이 되어 리듬을 방해합니다. 최소한의 행동이 습관의 뿌리를 내리게 도와줍니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* When Step */}
        {currentStep === "when" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                리듬 주기
              </Badge>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                어떤 주기가<br />자연스러울까요?
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                무리하지 않고 지속할 수 있는 빈도를 골라보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData("when", option.value)}
                  className={cn(
                    "flex flex-col items-start p-6 rounded-[24px] border-2 transition-all duration-300 text-left",
                    pledgeData.when === option.value 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={cn("text-[18px] font-black", pledgeData.when === option.value ? "text-primary" : "text-slate-900")}>
                      {option.label}
                    </span>
                    {pledgeData.when === option.value && <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                  </div>
                  <span className="text-[14px] font-medium text-slate-500">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">구체적인 시간대 (선택)</label>
                <Input
                  placeholder="예: 출근 직후, 자기 전"
                  value={pledgeData.whenDetail}
                  onChange={(e) => updateData("whenDetail", e.target.value)}
                  className="h-12 border-slate-200 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">예외 상황 (선택)</label>
                <Input
                  placeholder="예: 여행 중, 아플 때"
                  value={pledgeData.gracePeriod}
                  onChange={(e) => updateData("gracePeriod", e.target.value)}
                  className="h-12 border-slate-200 rounded-xl"
                />
              </div>
            </Card>
          </div>
        )}

        {/* Repair Step */}
        {currentStep === "repair" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                회복 설계
              </Badge>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                리듬이 깨지면<br />어떻게 돌아올까요?
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                미끄러지는 것은 실패가 아닙니다. 다시 시작할 방법을 미리 정해두면 자책하지 않아요.
              </p>
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white overflow-hidden">
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">언제 회복이 필요할까요?</label>
                  <Input
                    placeholder="예: 3일 연속 미끄러졌을 때"
                    value={pledgeData.repairTrigger}
                    onChange={(e) => updateData("repairTrigger", e.target.value)}
                    className="h-12 border-slate-200 rounded-xl px-4"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">회복을 위한 액션</label>
                  <Textarea
                    placeholder="예: 다음 3일간은 절반의 목표만 달성하기"
                    value={pledgeData.repairAction}
                    onChange={(e) => updateData("repairAction", e.target.value)}
                    className="min-h-[100px] text-[16px] font-medium border-slate-200 rounded-2xl resize-none p-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    {repairIdeas.map((idea) => (
                      <button
                        key={idea}
                        onClick={() => updateData("repairAction", idea)}
                        className="px-3 py-1.5 text-[12px] font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-chart-2/5 rounded-[24px] p-6 flex gap-4 border border-chart-2/10">
              <Shield className="h-6 w-6 text-chart-2 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-[14px] font-black text-slate-900">귀환성의 원리</h4>
                <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                  회복 계획을 세우는 것은 실패를 가정하는 것이 아니라, <span className="font-bold">시스템의 견고함</span>을 만드는 과정입니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Identity Step */}
        {currentStep === "identity" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[11px] px-3 py-1 rounded-full mb-4">
                정체성 연결
              </Badge>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                이 약속은 어떤<br />나를 만드나요?
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                습관은 행동의 반복을 넘어 당신의 정체성을 정의합니다.
              </p>
            </div>

            <Card className="rounded-[32px] border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.03)] bg-white p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">정체성 선언</label>
                <Input
                  placeholder="예: 나는 아침을 주도하는 사람이다"
                  value={pledgeData.identityStatement}
                  onChange={(e) => updateData("identityStatement", e.target.value)}
                  className="h-14 text-[18px] font-bold border-slate-200 rounded-2xl px-4"
                />
                <div className="flex flex-wrap gap-2">
                  {identityExamples.map((example) => (
                    <button
                      key={example}
                      onClick={() => updateData("identityStatement", example)}
                      className="px-3 py-1.5 text-[12px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <label className="text-[13px] font-black uppercase tracking-widest text-slate-400">함께할 파트너</label>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { value: "myself", label: "나 혼자", icon: <Avatar className="w-6 h-6"><AvatarFallback className="text-[10px] bg-slate-200">나</AvatarFallback></Avatar> },
                      { value: "family", label: "가족과", icon: <Users className="w-5 h-5" /> },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateData("shareWith", option.value)}
                      className={cn(
                        "flex items-center justify-center gap-2 h-14 rounded-2xl border-2 font-bold transition-all",
                        pledgeData.shareWith === option.value 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                      )}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Summary Step */}
        {currentStep === "summary" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-2 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </div>
              </div>
              <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-slate-900 mb-2">
                멋진 약속이<br />완성되었습니다!
              </h2>
              <p className="text-[15px] font-medium text-slate-500">
                이제 이 약속을 삶의 리듬으로 만들어볼까요?
              </p>
            </div>

            <Card className="rounded-[32px] border-2 border-primary/20 shadow-[0_12px_48px_rgba(0,0,0,0.08)] bg-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] -z-0" />
              
              <div className="p-8 relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge className="bg-primary text-white border-none font-bold text-[10px] px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-widest">
                      Your New Rhythm
                    </Badge>
                    <h3 className="text-[24px] font-black text-slate-900 leading-tight">{pledgeData.title}</h3>
                    <p className="text-[15px] font-medium text-slate-500 italic">"{pledgeData.identityStatement}"</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1 opacity-60">
                      <Moon className="w-3.5 h-3.5 text-chart-3" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Frequency</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-900">
                      {frequencyOptions.find(f => f.value === pledgeData.when)?.label || "매일"}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1 opacity-60">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Partner</span>
                    </div>
                    <p className="text-[14px] font-bold text-slate-900">
                      {pledgeData.shareWith === "myself" ? "나 혼자" : "가족과 함께"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-100">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400">의미 (Why)</h4>
                      <p className="text-[14px] font-medium text-slate-700 leading-relaxed">{pledgeData.why}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-chart-2" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400">회복 계획 (Repair)</h4>
                      <p className="text-[14px] font-medium text-slate-700 leading-relaxed">{pledgeData.repairAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-6 bg-slate-900 rounded-[28px] text-white shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-5 h-5 text-primary" />
                <h4 className="text-[15px] font-black">시작하기 전 안내</h4>
              </div>
              <p className="text-[13px] font-medium text-slate-300 leading-relaxed">
                첫 14일은 리듬을 몸에 익히는 적응 기간입니다. 완벽하지 않아도 괜찮아요. 리듬이 어긋나면 시스템이 회복을 도와드릴게요.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md px-6 py-6 safe-area-bottom border-t border-slate-100">
        <div className="mx-auto flex max-w-md items-center gap-3">
          {currentStepIndex > 0 && (
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 px-8 rounded-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all shrink-0" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {currentStepIndex < steps.length - 1 ? (
            <Button size="lg" className="h-14 flex-1 rounded-full bg-slate-900 text-white font-black text-[16px] shadow-lg shadow-slate-200 hover:scale-[1.02] transition-all" onClick={handleNext}>
              다음 단계로
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" className="h-14 flex-1 rounded-full bg-primary text-white font-black text-[16px] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all gap-2" onClick={handleComplete}>
              <Check className="h-5 w-5" />
              리듬 시작하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


