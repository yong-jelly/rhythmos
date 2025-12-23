import { Header } from "@/widgets/header";
import { BottomNavigation } from "@/widgets/bottom-navigation";
import { Card, Button } from "@/shared/ui";
import { Users, UserPlus, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CirclePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header title="서클" subtitle="함께하는 사람들" />

      <main className="flex-1 px-5 py-8 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">내 서클</h2>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-card-foreground mb-1">서클이 비어있어요</h3>
                <p className="text-sm text-muted-foreground mb-4">가족이나 친구들과 함께 약속을 지켜보세요</p>
                <Button size="sm" className="rounded-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  서클에 초대하기
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">함께하는 약속</h2>
          <Card className="p-6">
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">아직 함께하는 약속이 없어요</p>
            </div>
          </Card>
        </div>
      </main>

      <BottomNavigation onAddClick={() => navigate("/pledge/new")} />
    </div>
  );
}

