import { Check, Plus, PenLine } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface FeedEmptyStateProps {
  /**
   * 상태 타입:
   * - 'empty': 설정된 리듬이 하나도 없는 초기 상태
   * - 'completed': 오늘 할당된 모든 리듬을 완료한 상태
   */
  type: "empty" | "completed";
  /**
   * 버튼 클릭 시 실행할 핸들러
   */
  onAction?: (e?: React.MouseEvent) => void;
  /**
   * 추가 스타일 클래스
   */
  className?: string;
}

/**
 * 메인 피드에서 리듬이 없거나 모두 완료했을 때 표시하는 컴포넌트
 */
export function FeedEmptyState({ type, onAction, className }: FeedEmptyStateProps) {
  if (type === "empty") {
    return (
      <div className={cn("flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500", className)}>
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
          <Plus className="w-8 h-8 text-slate-300 stroke-[2]" />
        </div>
        <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">
          아직 설정된 리듬이 없습니다
        </h3>
        <p className="text-[14px] font-medium text-slate-400 mb-8 leading-relaxed">
          첫 번째 약속을 만들고 나만의 일상을 채워보세요.
        </p>
        <Button 
          onClick={(e) => onAction?.(e)}
          variant="outline"
          className="h-auto rounded-full px-8 py-3.5 text-[14px] font-bold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-none"
        >
          첫 약속 만들기
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500", className)}>
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-slate-300 stroke-[3]" />
      </div>
      <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">
        오늘의 리듬 완료!
      </h3>
      <p className="text-[14px] font-medium text-slate-400 mb-8 leading-relaxed">
        모든 약속을 지켰습니다. 편안한 휴식 시간을 가져보세요.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-[200px]">
        <Button 
          onClick={(e) => onAction?.(e)}
          variant="outline"
          className="h-auto rounded-full px-8 py-3.5 text-[14px] font-bold border-slate-200 text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-none flex items-center justify-center gap-2"
        >
          <PenLine className="w-4 h-4" />
          오늘 회고하기
        </Button>
      </div>
    </div>
  );
}
