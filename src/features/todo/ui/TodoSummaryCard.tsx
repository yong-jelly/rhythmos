import React from "react";
import { Card } from "@/shared/ui";
import { ListTodo, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TodoSummaryCardProps {
  remainingCount: number;
}

export function DelayedTodoCard({ count }: { count: number }) {
  const navigate = useNavigate();

  if (count === 0) return null;

  return (
    <div className="px-4 mb-8">
      <Card 
        onClick={() => navigate("/calendar")}
        className="relative overflow-hidden bg-warning/10 border border-warning/20 p-6 cursor-pointer active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center animate-pulse">
            <ClockIcon className="w-5 h-5 text-warning-foreground" />
          </div>
          <div>
            <h3 className="text-[15px] font-black tracking-tight text-warning-foreground">잠잠한 할일들</h3>
            <p className="text-[13px] font-medium opacity-70">
              {count}개의 할일이 조용히 기다리고 있습니다. 다시 리듬을 찾아볼까요?
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

