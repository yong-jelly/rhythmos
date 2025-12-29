import React from "react";
import { Card, Avatar, AvatarImage, AvatarFallback } from "@/shared/ui";
import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

interface CircleActivityCardProps {
  type: "status" | "message";
  user: {
    name: string;
    avatar: string;
    color: string;
  };
  content: string;
  timestamp: string;
}

export function CircleActivityCard({ type, user, content, timestamp }: CircleActivityCardProps) {
  const navigate = useNavigate();

  return (
    <div className="px-6 mb-8">
      <Card 
        onClick={() => navigate("/circle")}
        className="group bg-white border border-border/40 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer active:scale-[0.99] transition-all rounded-[32px]"
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10 border border-white shadow-sm">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white", user.color)} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-black text-foreground">{user.name}</span>
              <span className="text-[11px] font-medium text-muted-foreground">{timestamp}</span>
            </div>
            <div className="flex items-start gap-2">
              {type === "message" ? (
                <Heart className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              ) : (
                <MessageCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              )}
              <p className="text-[14px] font-medium text-muted-foreground leading-relaxed">
                {content}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

