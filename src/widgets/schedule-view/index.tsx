import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  duration: string;
  attendees?: string[];
}

interface ScheduleViewProps {
  date: {
    day: string;
    date: number;
    month: number;
  };
  items: ScheduleItem[];
  remainingTime: string;
  currentTask: string;
  progress: number;
}

export function ScheduleView({ date, items, remainingTime, currentTask, progress }: ScheduleViewProps) {
  const weekDays = [
    { day: "Mo", date: 8 },
    { day: "Tu", date: 9, active: true },
    { day: "We", date: 10, selected: true },
    { day: "Th", date: 11 },
    { day: "Fr", date: 12 },
    { day: "Sa", date: 13 },
    { day: "Su", date: 14 },
  ];

  return (
    <div className="bg-white rounded-[40px] overflow-hidden shadow-xl mb-10">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[32px] font-black tracking-tighter">
            {date.day} <span className="text-primary">{date.date}</span>
          </h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors border border-border">
              <span className="sr-only">Calendar</span>
              <div className="w-5 h-5 flex items-center justify-center">🗓️</div>
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-border">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User" />
            </div>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="flex justify-between items-center mb-8">
          {weekDays.map((wd) => (
            <div key={wd.day} className="flex flex-col items-center gap-2">
              <span className="text-[13px] font-bold text-muted-foreground">{wd.day}</span>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black transition-all",
                wd.selected ? "bg-foreground text-background scale-110 shadow-lg" : 
                wd.active ? "text-foreground relative after:content-[''] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full" : "text-foreground/40"
              )}>
                {wd.date}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative space-y-6 before:content-[''] before:absolute before:left-[42px] before:top-0 before:bottom-0 before:w-px before:bg-border/40">
          {items.map((item) => (
            <div key={item.id} className="relative flex gap-8 pl-2">
              <span className="w-8 text-[11px] font-bold text-muted-foreground/40 mt-1">{item.time}</span>
              <div className="flex-1 bg-secondary/30 rounded-[24px] p-6 border-l-4 border-foreground shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[17px] font-black tracking-tight leading-tight">{item.title}</h3>
                  <span className="text-[11px] font-bold text-primary">{item.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-muted-foreground/60">{item.time} - ...</span>
                  {item.attendees && (
                    <div className="flex -space-x-2">
                      {item.attendees.map((a, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a}`} />
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Status */}
      <div className="bg-foreground text-background p-8">
        <div className="mb-6">
          <h4 className="text-[32px] font-black leading-none tracking-tighter mb-2">
            {remainingTime}
          </h4>
          <p className="text-[15px] font-bold opacity-40">remaining</p>
        </div>

        <div className="space-y-4">
          <div className="h-6 w-full bg-white/10 rounded-full overflow-hidden p-1">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[13px] font-black">
            <span className="opacity-40">{currentTask}</span>
            <span>09:00am - 10:30am</span>
          </div>
        </div>
      </div>
    </div>
  );
}

