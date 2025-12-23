import type { Memory } from "@/shared/types";

export const get_memories_recent = (): Memory[] => [
  {
    id: "memory_1",
    pledgeId: "pledge_1",
    date: "2024-12-21",
    type: "note",
    content: "아침에 일어나니 창밖에 눈이 내리고 있었다. 물 한 잔을 마시며 조용한 아침을 느꼈다.",
  },
  {
    id: "memory_2",
    pledgeId: "pledge_1",
    date: "2024-12-19",
    type: "lesson",
    content: "피곤할 때는 무리하지 않는 게 오히려 지속에 도움이 된다는 걸 배웠다.",
  },
  {
    id: "memory_3",
    pledgeId: "pledge_2",
    date: "2024-12-20",
    type: "note",
    content: "밤에 간식 대신 따뜻한 허브티를 마셨다. 생각보다 만족스러웠다.",
  },
];

