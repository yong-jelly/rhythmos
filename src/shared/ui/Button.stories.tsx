import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Heart, ArrowRight, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Shared/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "버튼",
  },
};

export const Primary: Story = {
  args: {
    variant: "default",
    children: "리듬 다시 맞추기",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "천천히 둘러보기",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "건너뛰기",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Heart className="h-4 w-4" />
        시작하기
      </>
    ),
  },
};

export const IconRight: Story = {
  args: {
    children: (
      <>
        다음
        <ArrowRight className="h-4 w-4" />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <Plus className="h-5 w-5" />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "약속 시작하기",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    className: "w-full max-w-sm rounded-full",
    children: "시작하기",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화",
  },
};


