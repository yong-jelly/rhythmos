import { create } from "zustand";
import type { Pledge } from "@/shared/types";
import { get_pledges_active } from "@/shared/api/mocks";

interface PledgeState {
  pledges: Pledge[];
  isLoading: boolean;
  isWizardOpen: boolean;
  checkInTarget: Pledge | null;
  fetchPledges: () => void;
  getPledgeById: (id: string) => Pledge | undefined;
  getSlippedPledges: () => Pledge[];
  setIsWizardOpen: (isOpen: boolean) => void;
  setCheckInTarget: (target: Pledge | null) => void;
}

export const usePledgeStore = create<PledgeState>((set, get) => ({
  pledges: [],
  isLoading: false,
  isWizardOpen: false,
  checkInTarget: null,
  fetchPledges: () => {
    set({ isLoading: true });
    const pledges = get_pledges_active();
    set({ pledges, isLoading: false });
  },
  getPledgeById: (id) => {
    return get().pledges.find((p) => p.id === id);
  },
  getSlippedPledges: () => {
    return get().pledges.filter((p) => {
      // 최근 3일 내 skip이 있는 약속을 미끄러진 것으로 판단
      const recentEvents = p.currentRun.events.slice(-3);
      return recentEvents.some((e) => e.type === "skip");
    });
  },
  setIsWizardOpen: (isOpen) => {
    set({ isWizardOpen: isOpen });
  },
  setCheckInTarget: (target) => {
    set({ checkInTarget: target });
  },
}));


