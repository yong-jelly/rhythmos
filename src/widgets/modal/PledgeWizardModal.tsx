import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  X, 
  Check, 
  ChevronLeft
} from "lucide-react";
import { Button, Input, Textarea } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

type WizardStep = "definition" | "rhythm" | "identity" | "summary";

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

const steps: WizardStep[] = ["definition", "rhythm", "identity", "summary"];

const frequencyOptions = [
  { label: "매일", description: "하루도 빠짐없이", value: "daily" },
  { label: "평일", description: "주 5회, 주말 휴식", value: "weekly_5" },
  { label: "주 3회", description: "이틀에 한 번", value: "weekly_3" },
  { label: "주말", description: "토, 일 집중", value: "weekend" },
];

const whyExamples = [
  "나를 위한 아침 시간",
  "가뿐한 몸과 마음",
  "아이들에게 본보기",
  "차분한 생각 정리",
];

const repairIdeas = [
  "빈도 줄이기 (매일 → 주 3회)",
  "목표 낮추기 (30분 → 10분)",
  "시간대 변경",
];

const identityExamples = [
  "아침을 주도하는 사람",
  "몸을 존중하는 사람",
  "약속을 지키는 부모",
];

const initialPledgeData: PledgeData = {
  title: "",
  why: "",
  what: "",
  when: "daily",
  whenDetail: "",
  gracePeriod: "",
  repairTrigger: "3일 연속 실패 시",
  repairAction: "",
  identityStatement: "",
  shareWith: "myself",
};

interface PledgeWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: PledgeData) => void;
}

export function PledgeWizardModal({ isOpen, onClose, onComplete }: PledgeWizardModalProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("definition");
  const [pledgeData, setPledgeData] = useState<PledgeData>(initialPledgeData);

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const isStepValid = {
    definition: pledgeData.title.trim() !== "" && pledgeData.why.trim() !== "" && pledgeData.what.trim() !== "",
    rhythm: pledgeData.when !== "" && pledgeData.repairAction.trim() !== "",
    identity: pledgeData.identityStatement.trim() !== "",
    summary: true
  };

  const currentStepValid = isStepValid[currentStep];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep("definition");
      setPledgeData(initialPledgeData);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    } else {
      onClose();
    }
  };

  const handleCompleteAction = () => {
    if (onComplete) onComplete(pledgeData);
    onClose();
  };

  const updateData = (field: keyof PledgeData, value: string) => {
    setPledgeData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* 모바일 전체화면 레이아웃 */}
      <div className="relative flex-1 flex flex-col md:max-w-xl md:mx-auto md:my-8 md:rounded-[40px] md:shadow-2xl overflow-hidden bg-white">
        
        {/* 상단 네비게이션 */}
        <header className="shrink-0 safe-area-top z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button 
              onClick={handleBack} 
              className={cn(
                "p-2 -ml-2 rounded-full transition-colors active:bg-slate-100",
                currentStepIndex === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ChevronLeft className="h-6 w-6 text-slate-900" />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="flex gap-1.5 mb-1">
                {steps.map((_, idx) => (
                  <motion.div 
                    key={idx}
                    initial={false}
                    animate={{ 
                      width: idx === currentStepIndex ? 20 : 6,
                      backgroundColor: idx <= currentStepIndex ? "#0F172A" : "#E2E8F0"
                    }}
                    className="h-1.5 rounded-full transition-all duration-500 ease-out"
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="p-2 -mr-2 rounded-full transition-colors active:bg-slate-100"
            >
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 overflow-y-auto custom-scrollbar px-6 py-4"
            >
              <div className="max-w-md mx-auto space-y-8 pb-24">
                
                {/* 1단계: 약속 정의 */}
                {currentStep === "definition" && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">시작하기</span>
                      </div>
                      <h2 className="text-[32px] font-black leading-[1.1] tracking-tight text-slate-900">
                        어떤 리듬을<br />만들고 싶나요?
                      </h2>
                      <p className="text-[17px] font-medium text-slate-500 leading-relaxed">
                        나에게 의미 있는 작은 약속부터 시작해요. <br />
                        <span className="text-[14px] text-primary/80 font-semibold italic">"작은 시작이 큰 변화를 만듭니다"</span>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2 group">
                        <label className="text-[17px] font-semibold text-slate-900 flex items-center gap-2">
                          약속 이름
                        </label>
                        <Input
                          autoFocus
                          placeholder="예: 아침 명상 5분"
                          value={pledgeData.title}
                          onChange={(e) => updateData("title", e.target.value)}
                          className={cn(
                            "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                            pledgeData.title.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[17px] font-semibold text-slate-900 flex items-center gap-2">
                          왜 중요한가요?
                        </label>
                        <Textarea
                          placeholder="이 약속이 나에게 주는 의미..."
                          value={pledgeData.why}
                          onChange={(e) => updateData("why", e.target.value)}
                          className={cn(
                            "min-h-[100px] text-[17px] font-medium rounded-2xl border-none transition-all resize-none placeholder:text-slate-400 p-4",
                            pledgeData.why.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                        />
                        <div className="flex flex-wrap gap-2 pt-1">
                          {whyExamples.map((ex) => (
                            <button
                              key={ex}
                              onClick={() => updateData("why", ex)}
                              className={cn(
                                "px-3 py-1.5 text-[14px] font-medium rounded-full transition-all",
                                pledgeData.why === ex 
                                  ? "bg-slate-900 text-white shadow-sm" 
                                  : "bg-white border border-slate-200 text-slate-700 active:scale-95 hover:bg-slate-50"
                              )}
                            >
                              {ex}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[17px] font-semibold text-slate-900 flex items-center gap-2">
                          최소 실행 계획 (MVP)
                        </label>
                        <Input
                          placeholder="예: 눈 감고 호흡 3번 하기"
                          value={pledgeData.what}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && isStepValid.definition) handleNext();
                          }}
                          onChange={(e) => updateData("what", e.target.value)}
                          className={cn(
                            "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                            pledgeData.what.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2단계: 리듬 & 회복 */}
                {currentStep === "rhythm" && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">계획하기</span>
                      </div>
                      <h2 className="text-[32px] font-black leading-[1.1] tracking-tight text-slate-900">
                        언제 실행하고<br />어떻게 돌아올까요?
                      </h2>
                      <p className="text-[17px] font-medium text-slate-500 leading-relaxed">
                        중요한 건 리듬이 깨졌을 때 돌아오는 계획입니다. <br />
                        <span className="text-[14px] text-primary/80 font-semibold italic">"리듬이 깨져도 괜찮아요, 돌아오는 계획이 중요합니다"</span>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[17px] font-semibold text-slate-900 flex items-center gap-2">
                          반복 주기
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {frequencyOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateData("when", opt.value)}
                              className={cn(
                                "p-4 rounded-2xl border-2 text-left transition-all",
                                pledgeData.when === opt.value 
                                  ? "border-primary bg-primary/5 text-slate-900 shadow-sm" 
                                  : "border-slate-100 bg-white active:scale-95 hover:border-slate-200"
                              )}
                            >
                              <div className="text-[17px] font-bold mb-0.5">{opt.label}</div>
                              <div className={cn(
                                "text-[13px] font-medium transition-colors",
                                pledgeData.when === opt.value ? "text-primary/70" : "text-slate-500"
                              )}>
                                {opt.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[17px] font-semibold text-slate-900 flex items-center gap-2">
                          회복 계획 (Repair)
                        </label>
                        <Textarea
                          placeholder="미끄러졌을 때 다시 시작하는 법..."
                          value={pledgeData.repairAction}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && isStepValid.rhythm) handleNext();
                          }}
                          onChange={(e) => updateData("repairAction", e.target.value)}
                          className={cn(
                            "min-h-[100px] text-[17px] font-medium rounded-2xl border-none transition-all resize-none placeholder:text-slate-400 p-4",
                            pledgeData.repairAction.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                        />
                        <div className="flex flex-wrap gap-2 pt-1">
                          {repairIdeas.map((idea) => (
                            <button
                              key={idea}
                              onClick={() => updateData("repairAction", idea)}
                              className={cn(
                                "px-3 py-1.5 text-[14px] font-medium rounded-full transition-all",
                                pledgeData.repairAction === idea 
                                  ? "bg-slate-900 text-white shadow-sm" 
                                  : "bg-white border border-slate-200 text-slate-700 active:scale-95 hover:bg-slate-50"
                              )}
                            >
                              {idea}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3단계: 정체성 & 공유 */}
                {currentStep === "identity" && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">선언하기</span>
                      </div>
                      <h2 className="text-[32px] font-black leading-[1.1] tracking-tight text-slate-900">
                        이 약속은 어떤<br />나를 만드나요?
                      </h2>
                      <p className="text-[17px] font-medium text-slate-500 leading-relaxed">
                        나의 새로운 정체성을 한 줄로 정의해보세요. <br />
                        <span className="text-[14px] text-primary/80 font-semibold italic">"이 약속이 당신을 더 나은 사람으로 만듭니다"</span>
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[17px] font-semibold text-slate-900">나의 정체성 선언</label>
                        <Input
                          autoFocus
                          placeholder="예: 나는 아침을 주도하는 사람이다"
                          value={pledgeData.identityStatement}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && isStepValid.identity) handleNext();
                          }}
                          onChange={(e) => updateData("identityStatement", e.target.value)}
                          className={cn(
                            "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                            pledgeData.identityStatement.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                        />
                        <div className="flex flex-wrap gap-2 pt-1">
                          {identityExamples.map((ex) => (
                            <button
                              key={ex}
                              onClick={() => updateData("identityStatement", ex)}
                              className={cn(
                                "px-3 py-1.5 text-[14px] font-medium rounded-full transition-all",
                                pledgeData.identityStatement === ex 
                                  ? "bg-slate-900 text-white shadow-sm" 
                                  : "bg-white border border-slate-200 text-slate-700 active:scale-95 hover:bg-slate-50"
                              )}
                            >
                              {ex}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[17px] font-semibold text-slate-900">나의 여정을 지켜봐 줄 파트너</label>
                        <div className="flex gap-3">
                          {[
                            { value: "myself", label: "나 혼자만의 약속" },
                            { value: "family", label: "가족과 함께 공유" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => updateData("shareWith", opt.value as any)}
                              className={cn(
                                "flex-1 h-16 rounded-2xl border-2 font-semibold transition-all px-4 text-center",
                                pledgeData.shareWith === opt.value 
                                  ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                                  : "border-slate-100 bg-white text-slate-600 active:scale-95 hover:border-slate-200"
                              )}
                            >
                              <span className="text-[15px]">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4단계: 요약 */}
                {currentStep === "summary" && (
                  <div className="space-y-8 pb-4 relative">
                    <div className="text-center space-y-2">
                      <h2 className="text-[32px] font-black text-slate-900 tracking-tight">준비 완료!</h2>
                      <p className="text-[17px] font-medium text-slate-500">새로운 리듬을 시작할 준비가 되었습니다.</p>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="max-w-[340px] mx-auto"
                    >
                      {/* 영수증 스타일 UI */}
                      <div className="bg-white rounded-none shadow-xl border-t-[6px] border-slate-900 overflow-hidden">
                        <div className="p-6 space-y-6">
                          {/* 영수증 헤더 */}
                          <div className="text-center space-y-1">
                            <h3 className="text-[14px] font-mono font-bold tracking-tighter text-slate-900">PLEDGE RECEIPT</h3>
                            <p className="text-[11px] font-mono text-slate-400 uppercase">No. {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                            <p className="text-[11px] font-mono text-slate-400">{new Date().toLocaleDateString()}</p>
                          </div>

                          {/* 메인 약속 섹션 */}
                          <div className="border-y border-dashed border-slate-200 py-6 space-y-4">
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Title / Identity</span>
                              <div className="flex flex-col">
                                <span className="text-[20px] font-black text-slate-900 leading-tight">{pledgeData.title}</span>
                                <span className="text-[14px] font-medium text-slate-500 italic mt-1">"{pledgeData.identityStatement}"</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Frequency</span>
                                <p className="text-[15px] font-bold text-slate-800">
                                  {frequencyOptions.find(f => f.value === pledgeData.when)?.label}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Partner</span>
                                <p className="text-[15px] font-bold text-slate-800">
                                  {pledgeData.shareWith === "myself" ? "나 혼자" : "가족"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* 상세 내용 섹션 */}
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">The Why (Purpose)</span>
                              <p className="text-[14px] font-medium text-slate-700 leading-snug">{pledgeData.why}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Repair Plan</span>
                              <p className="text-[14px] font-medium text-slate-700 leading-snug">{pledgeData.repairAction}</p>
                            </div>
                          </div>

                          {/* 영수증 푸터 */}
                          <div className="border-t border-dashed border-slate-200 pt-6 text-center space-y-3">
                            <div className="inline-block px-4 py-1 border-2 border-slate-900 rounded-sm">
                              <span className="text-[14px] font-mono font-bold text-slate-900 tracking-widest">CONFIRMED</span>
                            </div>
                            <p className="text-[12px] font-bold text-slate-900 uppercase tracking-tight">Starting from today</p>
                          </div>
                        </div>

                        {/* 영수증 하단 톱니 모양 연출 (SVG 활용) */}
                        <div className="h-4 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDIwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgOEw1IDNMIDEwIDhMMTUgM0wyMCA4VjBIOFYwSDBWOFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+')] bg-repeat-x rotate-180" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 푸터 버튼 - iOS 스타일 */}
        <footer className="shrink-0 px-6 py-4 safe-area-bottom z-10 bg-white border-t border-slate-100">
          <div className="max-w-md mx-auto">
            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!currentStepValid}
                className={cn(
                  "w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-[17px] transition-all duration-300",
                  currentStepValid 
                    ? "bg-slate-900 text-white active:opacity-80 shadow-md" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                다음
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleCompleteAction}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold text-[17px] active:opacity-80 transition-opacity shadow-md shadow-primary/20"
              >
                <Check className="h-5 w-5" />
                리듬 시작하기
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
