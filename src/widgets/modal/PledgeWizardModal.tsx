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
  when: string;
  startDate: string;
  endDate: string;
  whenDetail: string;
  gracePeriod: string;
  repairTrigger: string;
  repairAction: string;
  identityStatement: string;
  shareWith: "myself" | "family" | "colleagues";
}

const steps: WizardStep[] = ["definition", "rhythm", "identity", "summary"];

const subSteps: Record<WizardStep, (keyof PledgeData)[]> = {
  definition: ["title", "why"],
  rhythm: ["when", "startDate", "endDate", "repairAction"],
  identity: ["identityStatement", "shareWith"],
  summary: []
};

const frequencyOptions = [
  { label: "매일", description: "하루도 빠짐없이", value: "daily" },
  { label: "평일", description: "주 5회, 주말 휴식", value: "weekly_5" },
  { label: "주 3회", description: "이틀에 한 번", value: "weekly_3" },
  { label: "주말", description: "토, 일 집중", value: "weekend" },
];

const periodShortcuts = [
  { label: "1주일", value: "1w" },
  { label: "1개월", value: "1m" },
  { label: "3개월", value: "3m" },
  { label: "6개월", value: "6m" },
  { label: "1년", value: "1y" },
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
  "매일 성장하는 사람",
  "나를 아끼는 사람",
  "여유를 즐기는 사람",
];

const initialPledgeData: PledgeData = {
  title: "",
  why: "",
  when: "daily",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
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
  const [currentSubStepIndex, setCurrentSubStepIndex] = useState(0);
  const [pledgeData, setPledgeData] = useState<PledgeData>(initialPledgeData);

  const currentStepIndex = steps.indexOf(currentStep);
  const totalSubSteps = Object.values(subSteps).flat().length;
  
  // 전체 진행률 계산 (현재 스텝의 서브스텝 포함)
  const calculateTotalProgress = () => {
    let completedSubSteps = 0;
    for (let i = 0; i < currentStepIndex; i++) {
      completedSubSteps += subSteps[steps[i]].length;
    }
    completedSubSteps += currentSubStepIndex;
    return (completedSubSteps / totalSubSteps) * 100;
  };

  const isFieldValid = (field: keyof PledgeData) => {
    const value = pledgeData[field];
    if (typeof value === "string") return value.trim() !== "";
    return true;
  };

  const currentSubStepField = subSteps[currentStep][currentSubStepIndex];
  const isCurrentFieldValid = currentStep === "summary" || isFieldValid(currentSubStepField);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep("definition");
      setCurrentSubStepIndex(0);
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
    const currentSubSteps = subSteps[currentStep];
    if (currentSubStepIndex < currentSubSteps.length - 1) {
      setCurrentSubStepIndex(currentSubStepIndex + 1);
    } else if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
      setCurrentSubStepIndex(0);
    }
  };

  const handleBack = () => {
    if (currentSubStepIndex > 0) {
      setCurrentSubStepIndex(currentSubStepIndex - 1);
    } else if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentStep(prevStep);
      setCurrentSubStepIndex(subSteps[prevStep].length - 1);
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

  const handlePeriodShortcut = (value: string) => {
    const start = new Date();
    const end = new Date();
    
    if (value === "1w") end.setDate(start.getDate() + 7);
    if (value === "1m") end.setMonth(start.getMonth() + 1);
    if (value === "3m") end.setMonth(start.getMonth() + 3);
    if (value === "6m") end.setMonth(start.getMonth() + 6);
    if (value === "1y") end.setFullYear(start.getFullYear() + 1);

    setPledgeData(prev => ({
      ...prev,
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
    }));
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white md:bg-slate-900/40 md:backdrop-blur-sm p-0 md:p-6">
      {/* 모바일/데스크탑 통합 레이아웃 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full h-full md:w-[480px] md:h-auto md:max-h-[85vh] md:rounded-[32px] md:shadow-2xl overflow-hidden bg-white flex flex-col"
      >
        
        {/* 상단 네비게이션 */}
        <header className="shrink-0 safe-area-top z-10 border-b border-slate-100">
          <div className="px-6 py-4 flex items-center justify-between">
            <button 
              onClick={onClose} 
              className="p-2 -ml-2 rounded-full transition-colors active:bg-slate-100"
            >
              <ChevronLeft className="h-6 w-6 text-slate-900" />
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-[18px] font-bold text-slate-900">리듬 약속 만들기</h1>
            </div>

            <div className="w-10" /> {/* 우측 여백 확보용 */}
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-10">
            <div className="max-w-md mx-auto space-y-12 pb-32">
              
              {/* 공통 헤더 (현재 스텝 정보) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-bold text-primary uppercase tracking-wider px-2 py-0.5 bg-primary/10 rounded-md">
                      {currentStep === "definition" && "시작하기 (1/3)"}
                      {currentStep === "rhythm" && "계획하기 (2/3)"}
                      {currentStep === "identity" && "선언하기 (3/3)"}
                    </span>
                  </div>
                  <h2 className="text-[30px] font-black leading-tight tracking-tight text-slate-900">
                    {currentStep === "definition" && <>어떤 리듬을<br />만들고 싶나요?</>}
                    {currentStep === "rhythm" && <>언제 실행하고<br />어떻게 돌아올까요?</>}
                    {currentStep === "identity" && <>이 약속은 어떤<br />나를 만드나요?</>}
                  </h2>
                </motion.div>
              </AnimatePresence>

              {/* 입력 필드들 (Toss-style Progressive Disclosure - Reverse Stacking) */}
              <div className="flex flex-col space-y-12">
                <AnimatePresence initial={false} mode="popLayout">
                  {currentStep === "definition" && (
                    <>
                      {/* 2. 왜 중요한가요? (Reverse Stack: Top when active) */}
                      {currentSubStepIndex >= 1 && (
                        <motion.div
                          key="why"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: currentSubStepIndex === 1 ? 1 : 0.98,
                            filter: currentSubStepIndex === 1 ? "none" : "grayscale(0.5) opacity(0.5)"
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                          onClick={() => currentSubStepIndex > 1 && setCurrentSubStepIndex(1)}
                          className={cn("space-y-5", currentSubStepIndex > 1 && "cursor-pointer")}
                        >
                          <label className={cn(
                            "block transition-all duration-300",
                            currentSubStepIndex === 1 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                          )}>
                            왜 중요한가요?
                          </label>
                          <Input
                            autoFocus
                            placeholder="이 약속이 나에게 주는 의미..."
                            value={pledgeData.why}
                            onChange={(e) => updateData("why", e.target.value)}
                            onKeyDown={(e) => {
                              if (e.nativeEvent.isComposing) return;
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (pledgeData.why.trim()) handleNext();
                              }
                            }}
                            className={cn(
                              "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                              pledgeData.why.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                            )}
                            readOnly={currentSubStepIndex > 1}
                          />
                          {currentSubStepIndex === 1 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {whyExamples.map((ex) => (
                                <button
                                  key={ex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateData("why", ex);
                                    setTimeout(handleNext, 100);
                                  }}
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
                          )}
                        </motion.div>
                      )}

                      {/* 1. 약속 이름 (Moves down as index increases) */}
                      <motion.div
                        key="title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: currentSubStepIndex === 0 ? 1 : 0.98,
                          filter: currentSubStepIndex === 0 ? "none" : "grayscale(0.5) opacity(0.5)"
                        }}
                        layout
                        onClick={() => currentSubStepIndex > 0 && setCurrentSubStepIndex(0)}
                        className={cn("space-y-5", currentSubStepIndex > 0 && "cursor-pointer")}
                      >
                        <label className={cn(
                          "block transition-all duration-300",
                          currentSubStepIndex === 0 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                        )}>
                          약속 이름
                        </label>
                        <Input
                          autoFocus
                          placeholder="예: 아침 명상 5분"
                          value={pledgeData.title}
                          onChange={(e) => updateData("title", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.nativeEvent.isComposing) return;
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (pledgeData.title.trim()) handleNext();
                            }
                          }}
                          className={cn(
                            "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                            pledgeData.title.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                          readOnly={currentSubStepIndex > 0}
                        />
                      </motion.div>
                    </>
                  )}

                  {currentStep === "rhythm" && (
                    <>
                      {/* 4. 회복 계획 (Top when active) */}
                      {currentSubStepIndex >= 3 && (
                        <motion.div
                          key="repair"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: currentSubStepIndex === 3 ? 1 : 0.98,
                            filter: currentSubStepIndex === 3 ? "none" : "grayscale(0.5) opacity(0.5)"
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                          onClick={() => currentSubStepIndex > 3 && setCurrentSubStepIndex(3)}
                          className={cn("space-y-5", currentSubStepIndex > 3 && "cursor-pointer")}
                        >
                          <label className={cn(
                            "block transition-all duration-300",
                            currentSubStepIndex === 3 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                          )}>
                            회복 계획 (Repair)
                          </label>
                          <Input
                            autoFocus
                            placeholder="미끄러졌을 때 다시 시작하는 법..."
                            value={pledgeData.repairAction}
                            onChange={(e) => updateData("repairAction", e.target.value)}
                            onKeyDown={(e) => {
                              if (e.nativeEvent.isComposing) return;
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (pledgeData.repairAction.trim()) handleNext();
                              }
                            }}
                            className={cn(
                              "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                              pledgeData.repairAction.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                            )}
                            readOnly={currentSubStepIndex > 3}
                          />
                          {currentSubStepIndex === 3 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {repairIdeas.map((idea) => (
                                <button
                                  key={idea}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateData("repairAction", idea);
                                    setTimeout(handleNext, 100);
                                  }}
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
                          )}
                        </motion.div>
                      )}

                      {/* 3. 종료일 설정 */}
                      {currentSubStepIndex >= 2 && (
                        <motion.div
                          key="endDate"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: currentSubStepIndex === 2 ? 1 : 0.98,
                            filter: currentSubStepIndex === 2 ? "none" : "grayscale(0.5) opacity(0.5)"
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                          onClick={() => currentSubStepIndex > 2 && setCurrentSubStepIndex(2)}
                          className={cn("space-y-5", currentSubStepIndex > 2 && "cursor-pointer")}
                        >
                          <label className={cn(
                            "block transition-all duration-300",
                            currentSubStepIndex === 2 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                          )}>
                            종료일
                          </label>
                          <div className="space-y-4">
                            <input
                              type="date"
                              value={pledgeData.endDate}
                              onChange={(e) => updateData("endDate", e.target.value)}
                              className={cn(
                                "h-14 w-full text-[17px] font-medium rounded-2xl border-none transition-all px-4",
                                "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                              )}
                              readOnly={currentSubStepIndex > 2}
                            />
                            {currentSubStepIndex === 2 && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {periodShortcuts.map((sh) => (
                                  <button
                                    key={sh.value}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePeriodShortcut(sh.value);
                                      setTimeout(handleNext, 150);
                                    }}
                                    className={cn(
                                      "px-3 py-1.5 text-[14px] font-medium rounded-full transition-all bg-white border border-slate-200 text-slate-700 active:scale-95 hover:bg-slate-50"
                                    )}
                                  >
                                    {sh.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* 2. 시작일 설정 */}
                      {currentSubStepIndex >= 1 && (
                        <motion.div
                          key="startDate"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: currentSubStepIndex === 1 ? 1 : 0.98,
                            filter: currentSubStepIndex === 1 ? "none" : "grayscale(0.5) opacity(0.5)"
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                          onClick={() => currentSubStepIndex > 1 && setCurrentSubStepIndex(1)}
                          className={cn("space-y-5", currentSubStepIndex > 1 && "cursor-pointer")}
                        >
                          <label className={cn(
                            "block transition-all duration-300",
                            currentSubStepIndex === 1 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                          )}>
                            시작일
                          </label>
                          <div className="flex flex-col gap-4">
                            <input
                              type="date"
                              value={pledgeData.startDate}
                              onChange={(e) => updateData("startDate", e.target.value)}
                              className={cn(
                                "h-14 w-full text-[17px] font-medium rounded-2xl border-none transition-all px-4",
                                "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                              )}
                              readOnly={currentSubStepIndex > 1}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* 1. 반복 주기 */}
                      <motion.div
                        key="when"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: currentSubStepIndex === 0 ? 1 : 0.98,
                          filter: currentSubStepIndex === 0 ? "none" : "grayscale(0.5) opacity(0.5)"
                        }}
                        layout
                        onClick={() => currentSubStepIndex > 0 && setCurrentSubStepIndex(0)}
                        className={cn("space-y-5", currentSubStepIndex > 0 && "cursor-pointer")}
                      >
                        <label className={cn(
                          "block transition-all duration-300",
                          currentSubStepIndex === 0 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                        )}>
                          반복 주기
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {frequencyOptions.map((opt) => (
                            <button
                              key={opt.value}
                              disabled={currentSubStepIndex > 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateData("when", opt.value);
                                if (currentSubStepIndex === 0) setTimeout(handleNext, 150);
                              }}
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
                      </motion.div>
                    </>
                  )}

                  {currentStep === "identity" && (
                    <>
                      {/* 2. 공유 파트너 (Top when active) */}
                      {currentSubStepIndex >= 1 && (
                        <motion.div
                          key="shareWith"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          layout
                          className="space-y-5"
                        >
                          <label className="text-[22px] font-bold text-slate-900">함께 도전할 파트너</label>
                          <div className="flex gap-3">
                            {[
                              { value: "myself", label: "나 혼자만의 약속" },
                              { value: "family", label: "가족과 함께 공유" },
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateData("shareWith", opt.value as any);
                                  handleNext();
                                }}
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
                        </motion.div>
                      )}

                      {/* 1. 정체성 선언 */}
                      <motion.div
                        key="identity"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: currentSubStepIndex === 0 ? 1 : 0.98,
                          filter: currentSubStepIndex === 0 ? "none" : "grayscale(0.5) opacity(0.5)"
                        }}
                        layout
                        onClick={() => currentSubStepIndex > 0 && setCurrentSubStepIndex(0)}
                        className={cn("space-y-5", currentSubStepIndex > 0 && "cursor-pointer")}
                      >
                        <label className={cn(
                          "block transition-all duration-300",
                          currentSubStepIndex === 0 ? "text-[22px] font-bold text-slate-900" : "text-[16px] font-medium text-slate-400"
                        )}>
                          나의 정체성 선언
                        </label>
                        <Input
                          autoFocus
                          placeholder="예: 나는 아침을 주도하는 사람이다"
                          value={pledgeData.identityStatement}
                          onChange={(e) => updateData("identityStatement", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.nativeEvent.isComposing) return;
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (pledgeData.identityStatement.trim()) handleNext();
                            }
                          }}
                          className={cn(
                            "h-14 text-[17px] font-medium rounded-2xl border-none transition-all placeholder:text-slate-400 px-4",
                            pledgeData.identityStatement.trim() !== "" ? "bg-primary/5 ring-1 ring-primary/20" : "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900"
                          )}
                          readOnly={currentSubStepIndex > 0}
                        />
                        {currentSubStepIndex === 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {identityExamples.map((ex) => (
                              <button
                                key={ex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateData("identityStatement", ex);
                                  setTimeout(handleNext, 100);
                                }}
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
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

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
                          <div className="border-y border-dashed border-slate-200 py-8 space-y-6">
                            <button 
                              onClick={() => {
                                setCurrentStep("definition");
                                setCurrentSubStepIndex(0);
                              }}
                              className="w-full text-left space-y-1 group/item transition-colors hover:bg-slate-50 p-2 -m-2 rounded-lg"
                            >
                              <div className="flex justify-between items-center">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Title / Identity</span>
                                <span className="text-[10px] font-bold text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">EDIT</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[20px] font-black text-slate-900 leading-tight group-hover/item:text-primary transition-colors">{pledgeData.title}</span>
                                <span className="text-[14px] font-medium text-slate-500 italic mt-1">"{pledgeData.identityStatement}"</span>
                              </div>
                            </button>

                            <div className="grid grid-cols-2 gap-6">
                              <button 
                                onClick={() => {
                                  setCurrentStep("rhythm");
                                  setCurrentSubStepIndex(0);
                                }}
                                className="text-left space-y-1 group/item transition-colors hover:bg-slate-50 p-2 -m-2 rounded-lg"
                              >
                                <div className="flex justify-between items-center">
                                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Frequency</span>
                                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">EDIT</span>
                                </div>
                                <p className="text-[15px] font-bold text-slate-800 group-hover/item:text-primary transition-colors">
                                  {frequencyOptions.find(f => f.value === pledgeData.when)?.label}
                                </p>
                              </button>
                              <button 
                                onClick={() => {
                                  setCurrentStep("rhythm");
                                  setCurrentSubStepIndex(1);
                                }}
                                className="text-left space-y-1 group/item transition-colors hover:bg-slate-50 p-2 -m-2 rounded-lg"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Period</span>
                                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">EDIT</span>
                              </div>
                                <p className="text-[15px] font-bold text-slate-800 group-hover/item:text-primary transition-colors">
                                  {pledgeData.startDate} ~ {pledgeData.endDate}
                                </p>
                              </button>
                            </div>
                          </div>

                          {/* 상세 내용 섹션 */}
                          <div className="space-y-6">
                            <button 
                              onClick={() => {
                                setCurrentStep("definition");
                                setCurrentSubStepIndex(1);
                              }}
                              className="w-full text-left space-y-1 group/item transition-colors hover:bg-slate-50 p-2 -m-2 rounded-lg"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Purpose</span>
                                <span className="text-[10px] font-bold text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">EDIT</span>
                            </div>
                              <p className="text-[14px] font-medium text-slate-700 leading-snug group-hover/item:text-primary transition-colors">{pledgeData.why}</p>
                            </button>
                            <button 
                              onClick={() => {
                                setCurrentStep("rhythm");
                                setCurrentSubStepIndex(3);
                              }}
                              className="w-full text-left space-y-1 group/item transition-colors hover:bg-slate-50 p-2 -m-2 rounded-lg"
                            >
                              <div className="flex justify-between items-center">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Repair Plan</span>
                                <span className="text-[10px] font-bold text-primary opacity-0 group-hover/item:opacity-100 transition-opacity">EDIT</span>
                            </div>
                              <p className="text-[14px] font-medium text-slate-700 leading-snug group-hover/item:text-primary transition-colors">{pledgeData.repairAction}</p>
                            </button>
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
            </div>
        </div>

        {/* 푸터 버튼 - iOS 스타일 */}
          <footer className="shrink-0 safe-area-bottom z-10 bg-white border-t border-slate-100">
            <div className="flex w-full">
              {currentStep !== "summary" ? (
                <>
                  <button
                    onClick={handleBack}
                    className="w-20 h-16 flex items-center justify-center border-r border-slate-100 text-slate-400 active:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
              <button
                onClick={handleNext}
                    disabled={!isCurrentFieldValid}
                className={cn(
                      "flex-1 h-16 flex items-center justify-center gap-2 font-bold text-[18px] transition-all duration-300",
                      isCurrentFieldValid 
                        ? "bg-slate-900 text-white active:opacity-90" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                다음
                <ArrowRight className="h-5 w-5" />
              </button>
                </>
            ) : (
              <button
                onClick={handleCompleteAction}
                  className="w-full h-16 flex items-center justify-center gap-2 bg-primary text-white font-bold text-[18px] active:opacity-90 transition-opacity"
              >
                  <Check className="h-6 w-6" />
                리듬 시작하기
              </button>
            )}
          </div>
        </footer>
      </div>
      </motion.div>
    </div>,
    document.body
  );
}
