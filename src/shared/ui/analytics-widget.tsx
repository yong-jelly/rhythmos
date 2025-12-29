import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface CircularGaugeProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  unit?: string;
}

export function CircularGauge({
  value,
  size = 180,
  strokeWidth = 12,
  className,
  label,
  unit,
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative flex flex-col items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-white transition-all duration-1000 ease-out"
        />
        {/* Ticks (optional, from Image 2) */}
        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={i}
            x1={size / 2 + (radius + 15) * Math.cos((i * 9 * Math.PI) / 180)}
            y1={size / 2 + (radius + 15) * Math.sin((i * 9 * Math.PI) / 180)}
            x2={size / 2 + (radius + 20) * Math.cos((i * 9 * Math.PI) / 180)}
            y2={size / 2 + (radius + 20) * Math.sin((i * 9 * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1"
            className={cn(
              "transition-opacity duration-500",
              (i / 40) * 100 <= value ? "text-white/40" : "text-white/10"
            )}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-[42px] font-black leading-none tracking-tighter">
          {value}
          <span className="text-[14px] font-bold ml-1 opacity-60">{unit || "%"}</span>
        </span>
        {label && <span className="text-[12px] font-bold uppercase tracking-widest mt-1 opacity-40">{label}</span>}
      </div>
    </div>
  );
}

interface DotMatrixGridProps {
  data: boolean[]; // true = completed, false = missed/pending
  rows?: number;
  cols?: number;
  className?: string;
}

export function DotMatrixGrid({ data, rows = 3, cols = 10, className }: DotMatrixGridProps) {
  return (
    <div 
      className={cn("grid gap-2", className)}
      style={{ 
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-500",
            data[i] ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/10"
          )}
          style={{ transitionDelay: `${i * 10}ms` }}
        />
      ))}
    </div>
  );
}

interface LinearProgressProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  className?: string;
}

export function LinearProgress({ value, label, sublabel, className }: LinearProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between mb-3 text-white">
        <div className="flex flex-col">
          {sublabel && <span className="text-[11px] font-bold uppercase opacity-40 tracking-widest mb-1">{sublabel}</span>}
          <span className="text-[24px] font-black leading-none tracking-tight">{label}</span>
        </div>
        <span className="text-[18px] font-black opacity-60">{value}%</span>
      </div>
      <div className="h-6 w-full bg-white/10 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
        <div 
          className="h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

