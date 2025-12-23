import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { Card } from "@/shared/ui";
import { Archive, Calendar, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemoryStore } from "@/entities/memory";
import { MemoryCard } from "@/entities/memory";
import { useEffect } from "react";

export function ArchivesPage() {
  const navigate = useNavigate();
  const { memories, fetchMemories } = useMemoryStore();

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header title="기록실" subtitle="모든 기억들" />

      <main className="flex-1 px-5 py-8 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">기억 모음</h2>
          {memories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          ) : (
            <Card className="p-6">
              <div className="text-center py-8">
                <Archive className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mb-1">아직 기록된 기억이 없어요</p>
                <p className="text-xs text-muted-foreground/70">체크인을 완료하면 기억이 기록됩니다</p>
              </div>
            </Card>
          )}
        </div>

        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">통계</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-muted-foreground">총 기억</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">{memories.length}개</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-chart-2" />
                <h3 className="text-sm font-semibold text-muted-foreground">이번 달</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {memories.filter(
                  (m) =>
                    new Date(m.date).getMonth() === new Date().getMonth() &&
                    new Date(m.date).getFullYear() === new Date().getFullYear()
                ).length}
                개
              </p>
            </Card>
          </div>
        </div>
      </main>

      <BottomNavigation onAddClick={() => navigate("/pledge/new")} />
    </div>
  );
}

