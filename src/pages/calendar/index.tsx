import { useState } from "react";
import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { cn } from "@/shared/lib/utils";
import { CalendarView } from "@/widgets/calendar-view";
import { CategorizedDailyList } from "./CategorizedDailyList";

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex min-h-screen flex-col bg-background pb-32 bg-dot-matrix">
      <Header title="달력" />

      <main className="flex-1 max-w-2xl mx-auto w-full pt-0">
        {/* Calendar Strip - Sticky and Flat */}
        <div className="sticky top-[64px] z-20 px-4 py-2 bg-background border-b-[0.5px] border-border/40 transition-all">
          <CalendarView 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
          />
        </div>

        {/* Categorized Content Section */}
        <div className="px-4 pt-6">
          <CategorizedDailyList date={selectedDate} />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

