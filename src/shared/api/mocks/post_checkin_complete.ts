import type { Event } from "@/shared/types";

interface CheckinRequest {
  pledgeId: string;
  type: "success" | "skip" | "grace" | "unknown";
  reason?: string;
  note?: string;
}

interface CheckinResponse {
  success: boolean;
  event: Event;
  message: string;
}

export const post_checkin_complete = (request: CheckinRequest): CheckinResponse => {
  const event: Event = {
    id: `event_${Date.now()}`,
    runId: "run_current",
    date: new Date().toISOString().split("T")[0],
    type: request.type,
    reason: request.reason,
    note: request.note,
  };

  const messages: Record<string, string> = {
    success: "오늘도 리듬을 맞췄어요!",
    skip: "괜찮아요, 다음에 다시 맞추면 돼요.",
    grace: "예외 상황이었네요. 자신을 탓하지 마세요.",
    unknown: "아직 모르는 것도 괜찮아요.",
  };

  return {
    success: true,
    event,
    message: messages[request.type] || "기록되었어요.",
  };
};


