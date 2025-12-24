import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Shared/UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "귀환 7회",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "피로/컨디션",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "완료",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "주의",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "실패",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "가족과 함께",
  },
};

export const WithEmoji: Story = {
  args: {
    variant: "secondary",
    children: "😴 피로",
  },
};


