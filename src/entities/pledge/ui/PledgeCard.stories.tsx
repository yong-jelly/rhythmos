import type { Meta, StoryObj } from "@storybook/react";
import { PledgeCard } from "./PledgeCard";
import type { Pledge } from "@/shared/types";

const meta: Meta<typeof PledgeCard> = {
  title: "Entities/Pledge/PledgeCard",
  component: PledgeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basePledge: Pledge = {
  id: "pledge_1",
  title: "아침 7시에 일어나기",
  meaning: "하루를 여유롭게 시작하고 싶어서",
  action: "알람이 울리면 창문을 열고 물 한 잔 마시기",
  frequency: "daily",
  shareWith: "myself",
  status: "active",
  currentRun: {
    id: "run_1",
    pledgeId: "pledge_1",
    number: 3,
    startDate: "2024-12-18",
    targetDays: 14,
    completedDays: 5,
    events: [],
  },
  returnHistory: [
    { id: "return_1", pledgeId: "pledge_1", date: "2024-11-05", gapDays: 12 },
    { id: "return_2", pledgeId: "pledge_1", date: "2024-12-18", gapDays: 8 },
  ],
  createdAt: "2024-09-01T00:00:00Z",
};

export const Default: Story = {
  args: {
    pledge: basePledge,
    className: "w-[350px]",
  },
};

export const SharedWithFamily: Story = {
  args: {
    pledge: {
      ...basePledge,
      id: "pledge_2",
      title: "저녁 8시 이후 가족 시간",
      shareWith: "family",
    },
    className: "w-[350px]",
  },
};

export const EarlyProgress: Story = {
  args: {
    pledge: {
      ...basePledge,
      currentRun: {
        ...basePledge.currentRun,
        completedDays: 2,
      },
      returnHistory: [],
    },
    className: "w-[350px]",
  },
};

export const AlmostComplete: Story = {
  args: {
    pledge: {
      ...basePledge,
      currentRun: {
        ...basePledge.currentRun,
        completedDays: 12,
      },
    },
    className: "w-[350px]",
  },
};

