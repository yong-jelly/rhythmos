import type { RhythmStatus } from "@/shared/types";

export const get_rhythm_status = (): RhythmStatus => ({
  state: "flowing",
  message: "조용히 흐르는 중",
  weeklyCompletedCount: 7,
  lastCheckIn: "2024-12-22T08:15:00Z",
});


