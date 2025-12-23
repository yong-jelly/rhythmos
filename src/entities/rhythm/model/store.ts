import { create } from "zustand";
import type { RhythmStatus } from "@/shared/types";
import { get_rhythm_status } from "@/shared/api/mocks";

interface RhythmState {
  status: RhythmStatus | null;
  isLoading: boolean;
  fetchStatus: () => void;
}

export const useRhythmStore = create<RhythmState>((set) => ({
  status: null,
  isLoading: false,
  fetchStatus: () => {
    set({ isLoading: true });
    const status = get_rhythm_status();
    set({ status, isLoading: false });
  },
}));

