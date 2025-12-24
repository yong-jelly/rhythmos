import type { Pledge } from "@/shared/types";

export const get_pledges_active = (): Pledge[] => [
  {
    id: "pledge_1",
    title: "아침 7시에 일어나기",
    meaning: "하루를 여유롭게 시작하고 싶어서",
    action: "알람이 울리면 창문을 열고 물 한 잔 마시기",
    frequency: "daily",
    timeDetail: "아침 7시",
    gracePeriod: "주말은 8시까지 허용",
    repairTrigger: "3일 연속 못 지키면",
    repairAction: "빈도를 주 5회로 줄이기",
    identityStatement: "나는 아침을 소중히 여기는 사람이다",
    shareWith: "myself",
    status: "active",
    currentRun: {
      id: "run_1",
      pledgeId: "pledge_1",
      number: 3,
      startDate: "2024-12-18",
      targetDays: 14,
      completedDays: 5,
      events: [
        { id: "event_1", runId: "run_1", date: "2024-12-18", type: "success" },
        { id: "event_2", runId: "run_1", date: "2024-12-19", type: "success" },
        { id: "event_3", runId: "run_1", date: "2024-12-20", type: "skip", reason: "피로" },
        { id: "event_4", runId: "run_1", date: "2024-12-21", type: "success", note: "창밖에 눈이 내리고 있었다" },
        { id: "event_5", runId: "run_1", date: "2024-12-22", type: "success" },
      ],
    },
    returnHistory: [
      { id: "return_1", pledgeId: "pledge_1", date: "2024-11-05", gapDays: 12, reason: "출장" },
      { id: "return_2", pledgeId: "pledge_1", date: "2024-12-18", gapDays: 8, reason: "컨디션 난조" },
    ],
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "pledge_2",
    title: "저녁 8시 이후 간식 줄이기",
    meaning: "밤에 과식하면 다음날 몸이 무겁고 자책하게 돼요",
    action: "저녁 8시 이후에는 물이나 차만 마시기",
    frequency: "weekly_5",
    timeDetail: "저녁 8시 이후",
    gracePeriod: "회식이나 모임이 있을 때",
    repairTrigger: "일주일에 3번 이상 못 지키면",
    repairAction: "시간대를 9시로 늦추기",
    identityStatement: "나는 내 몸의 신호를 존중하는 사람이다",
    shareWith: "family",
    status: "active",
    currentRun: {
      id: "run_2",
      pledgeId: "pledge_2",
      number: 1,
      startDate: "2024-12-20",
      targetDays: 14,
      completedDays: 3,
      events: [
        { id: "event_6", runId: "run_2", date: "2024-12-20", type: "success" },
        { id: "event_7", runId: "run_2", date: "2024-12-21", type: "success" },
        { id: "event_8", runId: "run_2", date: "2024-12-22", type: "success" },
      ],
    },
    returnHistory: [{ id: "return_3", pledgeId: "pledge_2", date: "2024-12-20", gapDays: 0 }],
    createdAt: "2024-12-20T00:00:00Z",
  },
];


