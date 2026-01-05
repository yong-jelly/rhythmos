import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "@/pages/home";
import { Home2Page } from "@/pages/home2";
import { JourneyPage } from "@/pages/journey";
import { CirclePage } from "@/pages/circle";
import { GroupChallengePage } from "@/pages/circle/challenge";
import { ArchivesPage } from "@/pages/archives";
import { CalendarPage } from "@/pages/calendar";
import { Calendar2Page } from "@/pages/calendar2";
import { PledgeWizardPage } from "@/pages/pledge-wizard";
import { PledgeListPage } from "@/pages/pledges";
import { DailyCheckinPage } from "@/pages/daily-checkin";
import { RepairFlowPage } from "@/pages/repair-flow";
import { PledgeWizardModal } from "@/widgets/modal/PledgeWizardModal";
import { usePledgeStore } from "@/entities/pledge";

// 라우터 디버깅을 위한 컴포넌트
function RouterDebug() {
  const location = useLocation();
  useEffect(() => {
    console.log("[Router] Route changed:", location.pathname);
  }, [location]);
  return null;
}

// 에러 경계 컴포넌트 (간단한 버전)
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function AppRouter() {
  const { isWizardOpen, setIsWizardOpen } = usePledgeStore();

  useEffect(() => {
    console.log("[Router] AppRouter mounted");
  }, []);

  return (
    <ErrorBoundary>
      <RouterDebug />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home2" element={<Home2Page />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/circle" element={<CirclePage />} />
        <Route path="/circle/challenge/:id" element={<GroupChallengePage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar2" element={<Calendar2Page />} />
        <Route path="/pledges" element={<PledgeListPage />} />
        <Route path="/pledge/new" element={<PledgeWizardPage />} />
        <Route path="/checkin" element={<DailyCheckinPage />} />
        <Route path="/repair" element={<RepairFlowPage />} />
        {/* 404 페이지 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-[100dvh] items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold">404</h1>
                <p className="text-muted-foreground">페이지를 찾을 수 없습니다</p>
              </div>
            </div>
          }
        />
      </Routes>

      <PledgeWizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)}
        onComplete={(data) => {
          console.log("Wizard completed", data);
          setIsWizardOpen(false);
        }}
      />
    </ErrorBoundary>
  );
}

