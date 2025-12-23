import type { Meta, StoryObj } from "@storybook/react";
import { MemoryCard } from "./MemoryCard";
import type { Memory } from "@/shared/types";

const meta: Meta<typeof MemoryCard> = {
  title: "Entities/Memory/MemoryCard",
  component: MemoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Note: Story = {
  args: {
    memory: {
      id: "memory_1",
      pledgeId: "pledge_1",
      date: "2024-12-21",
      type: "note",
      content: "아침에 일어나니 창밖에 눈이 내리고 있었다. 물 한 잔을 마시며 조용한 아침을 느꼈다.",
    },
    className: "w-[350px]",
  },
};

export const Lesson: Story = {
  args: {
    memory: {
      id: "memory_2",
      pledgeId: "pledge_1",
      date: "2024-12-19",
      type: "lesson",
      content: "피곤할 때는 무리하지 않는 게 오히려 지속에 도움이 된다는 걸 배웠다.",
    },
    className: "w-[350px]",
  },
};

export const Short: Story = {
  args: {
    memory: {
      id: "memory_3",
      pledgeId: "pledge_2",
      date: "2024-12-20",
      type: "note",
      content: "오늘은 특별히 좋았다.",
    },
    className: "w-[350px]",
  },
};

