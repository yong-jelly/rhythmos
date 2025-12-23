import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "Shared/UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>아침 7시에 일어나기</CardTitle>
        <CardDescription>14일 중 5일째</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          알람이 울리면 창문을 열고 물 한 잔 마시기
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">체크인 시작하기</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-5">
      <p className="text-sm italic text-muted-foreground">
        "아침에 일어나니 창밖에 눈이 내리고 있었다. 물 한 잔을 마시며 조용한 아침을 느꼈다."
      </p>
      <p className="mt-3 text-xs text-muted-foreground">12/21, 아침 일찍 일어나기</p>
    </Card>
  ),
};

export const Highlighted: Story = {
  render: () => (
    <Card className="w-[350px] border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
      <h3 className="mb-2 text-lg font-semibold">오늘의 다음 행동</h3>
      <p className="text-sm text-muted-foreground">
        아침 7시에 일어나기
      </p>
    </Card>
  ),
};

export const Warning: Story = {
  render: () => (
    <Card className="w-[350px] border-warning/30 bg-gradient-to-br from-warning/5 to-transparent p-5">
      <h3 className="mb-2 font-medium">리듬이 흔들렸어요</h3>
      <p className="text-sm text-muted-foreground">
        "아침 7시에 일어나기"를 3일 동안 지키지 못했어요.
      </p>
    </Card>
  ),
};

