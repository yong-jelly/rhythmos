import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { OnboardingPage } from "@/pages/onboarding";
import { HomePage } from "@/pages/home";
import { PledgeWizardPage } from "@/pages/pledge-wizard";
import { DailyCheckinPage } from "@/pages/daily-checkin";
import { RepairFlowPage } from "@/pages/repair-flow";

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
  useEffect(() => {
    console.log("[Router] AppRouter mounted");
  }, []);

  return (
    <ErrorBoundary>
      <RouterDebug />
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pledge/new" element={<PledgeWizardPage />} />
        <Route path="/checkin" element={<DailyCheckinPage />} />
        <Route path="/repair" element={<RepairFlowPage />} />
        {/* 404 페이지 */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold">404</h1>
                <p className="text-muted-foreground">페이지를 찾을 수 없습니다</p>
              </div>
            </div>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

