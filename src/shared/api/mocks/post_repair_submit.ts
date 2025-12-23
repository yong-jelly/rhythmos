import type { Repair } from "@/shared/types";

interface RepairRequest {
  pledgeId: string;
  causeTags: string[];
  situationNote?: string;
  newRules?: string;
  missionNote?: string;
}

interface RepairResponse {
  success: boolean;
  repair: Repair;
  message: string;
}

export const post_repair_submit = (request: RepairRequest): RepairResponse => {
  const repair: Repair = {
    id: `repair_${Date.now()}`,
    pledgeId: request.pledgeId,
    date: new Date().toISOString().split("T")[0],
    causeTags: request.causeTags,
    situationNote: request.situationNote,
    newRules: request.newRules,
    missionNote: request.missionNote,
  };

  return {
    success: true,
    repair,
    message: "회복 기록이 저장되었어요. 당신은 지금 다시 설계 중입니다. 이게 진짜 성장이에요.",
  };
};

