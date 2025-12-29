import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui";
import { FeedItem } from "@/widgets/feed-item";
import { PledgeCheckIn } from "@/features/pledge-checkin";
import type { Pledge } from "@/shared/types";

interface PledgeCarouselProps {
  pledges: Pledge[];
}

export function PledgeCarousel({ pledges }: PledgeCarouselProps) {
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);

  const handleCheckIn = (type: string) => {
    console.log(`Check-in for ${selectedPledge?.title}: ${type}`);
    // 실제 로직: 스토어 업데이트 등
    setSelectedPledge(null);
  };

  return (
    <div className="w-full">
      <div className="px-6 mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-black tracking-tight">오늘의 리듬</h2>
        <span className="text-[13px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {pledges.length}개의 약속
        </span>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4 px-6 pb-8">
          {pledges.map((pledge) => (
            <CarouselItem key={pledge.id} className="pl-4 basis-[90%] md:basis-[45%]">
              <div 
                onClick={() => setSelectedPledge(pledge)}
                className="cursor-pointer active:scale-[0.98] transition-transform"
              >
                <FeedItem 
                  user={{
                    name: "Sarah Chen",
                    handle: "sarah_rhythm",
                    role: "Rhythm Guardian",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                    time: "Now"
                  }}
                  content={{
                    type: "rhythm",
                    variant: "gauge",
                    title: pledge.title,
                    description: pledge.meaning,
                    data: { 
                      value: Math.floor(Math.random() * 40) + 60, 
                      unit: "%", 
                      label: "Adherence" 
                    }
                  }}
                  stats={{
                    likes: 124,
                    comments: 12
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {selectedPledge && (
        <PledgeCheckIn 
          pledge={selectedPledge}
          isOpen={!!selectedPledge}
          onClose={() => setSelectedPledge(null)}
          onCheckIn={handleCheckIn}
        />
      )}
    </div>
  );
}

