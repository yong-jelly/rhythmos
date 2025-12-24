import type { Meta, StoryObj } from "@storybook/react";
import { RhythmStatusCard } from "./RhythmStatusCard";
import type { RhythmStatus } from "@/shared/types";

const meta: Meta<typeof RhythmStatusCard> = {
  title: "Entities/Rhythm/RhythmStatusCard",
  component: RhythmStatusCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Flowing: Story = {
  args: {
    status: {
      state: "flowing",
      message: "조용히 흐르는 중",
      weeklyCompletedCount: 7,
    },
    className: "w-[350px]",
  },
};

export const Unstable: Story = {
  args: {
    status: {
      state: "unstable",
      message: "조금 흔들리는 중",
      weeklyCompletedCount: 4,
    },
    className: "w-[350px]",
  },
};

export const Finding: Story = {
  args: {
    status: {
      state: "finding",
      message: "리듬을 찾는 중",
      weeklyCompletedCount: 2,
    },
    className: "w-[350px]",
  },
};


