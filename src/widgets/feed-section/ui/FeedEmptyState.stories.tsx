import type { Meta, StoryObj } from "@storybook/react";
import { FeedEmptyState } from "./FeedEmptyState";

const meta: Meta<typeof FeedEmptyState> = {
  title: "Widgets/FeedSection/FeedEmptyState",
  component: FeedEmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["empty", "completed"],
    },
    onAction: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof FeedEmptyState>;

export const Empty: Story = {
  args: {
    type: "empty",
  },
};

export const Completed: Story = {
  args: {
    type: "completed",
  },
};

export const InContainer: Story = {
  render: (args) => (
    <div className="w-[375px] border border-slate-200 bg-slate-50/30 rounded-[40px] overflow-hidden">
      <FeedEmptyState {...args} />
    </div>
  ),
  args: {
    type: "completed",
  },
};
