// 사용자 타입
export interface User {
  id: string;
  name: string;
  state: "new" | "active" | "returning";
  returnCount: number;
  lastActiveAt: string;
  createdAt: string;
}

// 약속 타입
export interface Pledge {
  id: string;
  title: string;
  meaning: string;
  action: string;
  frequency: "daily" | "weekly_5" | "weekly_3" | "weekend";
  timeDetail?: string;
  gracePeriod?: string;
  repairTrigger?: string;
  repairAction?: string;
  identityStatement?: string;
  shareWith: "myself" | "family" | "colleagues";
  status: "active" | "paused" | "completed";
  currentRun: Run;
  returnHistory: Return[];
  createdAt: string;
}

// 회차 타입
export interface Run {
  id: string;
  pledgeId: string;
  number: number;
  startDate: string;
  endDate?: string;
  targetDays: number;
  completedDays: number;
  events: Event[];
}

// 이벤트 타입
export interface Event {
  id: string;
  runId: string;
  date: string;
  type: "success" | "skip" | "grace" | "unknown";
  reason?: string;
  note?: string;
}

// 귀환 타입
export interface Return {
  id: string;
  pledgeId: string;
  date: string;
  gapDays: number;
  reason?: string;
}

// 회복 타입
export interface Repair {
  id: string;
  pledgeId: string;
  date: string;
  causeTags: string[];
  situationNote?: string;
  newRules?: string;
  missionNote?: string;
}

// 기억 타입
export interface Memory {
  id: string;
  pledgeId: string;
  date: string;
  type: "note" | "photo" | "voice" | "lesson";
  content: string;
  imageUrl?: string;
}

// 리듬 상태 타입
export interface RhythmStatus {
  state: "flowing" | "unstable" | "finding";
  message: string;
  weeklyCompletedCount: number;
  lastCheckIn?: string;
}

// 서클 타입
export interface Circle {
  id: string;
  name: string;
  type: "family" | "colleagues";
  members: CircleMember[];
  sharedPledges: string[];
  charter?: string;
}

// 서클 멤버 타입
export interface CircleMember {
  id: string;
  userId: string;
  name: string;
  role: "admin" | "member";
  rhythmState: "flowing" | "unstable" | "finding";
}


