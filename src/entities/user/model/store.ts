import { create } from "zustand";
import type { User } from "@/shared/types";
import { get_user_profile } from "@/shared/api/mocks";

interface UserState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => void;
  setUserState: (state: User["state"]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: () => {
    set({ isLoading: true });
    // 모의 API 호출
    const user = get_user_profile();
    set({ user, isLoading: false });
  },
  setUserState: (state) => {
    set((prev) => (prev.user ? { user: { ...prev.user, state } } : {}));
  },
}));


