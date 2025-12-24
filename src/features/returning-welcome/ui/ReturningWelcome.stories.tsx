import type { Meta, StoryObj } from "@storybook/react";
import { ReturningWelcome } from "./ReturningWelcome";

const meta: Meta<typeof ReturningWelcome> = {
  title: "Features/ReturningWelcome",
  component: ReturningWelcome,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    returnCount: 7,
    onContinue: () => console.log("Continue"),
    onBrowse: () => console.log("Browse"),
  },
};

export const FirstReturn: Story = {
  args: {
    returnCount: 1,
    onContinue: () => console.log("Continue"),
    onBrowse: () => console.log("Browse"),
  },
};

export const ManyReturns: Story = {
  args: {
    returnCount: 15,
    onContinue: () => console.log("Continue"),
    onBrowse: () => console.log("Browse"),
  },
};


