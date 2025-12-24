import { create } from "zustand";
import type { Memory } from "@/shared/types";
import { get_memories_recent } from "@/shared/api/mocks";

interface MemoryState {
  memories: Memory[];
  isLoading: boolean;
  fetchMemories: () => void;
  getRecentMemory: () => Memory | undefined;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  isLoading: false,
  fetchMemories: () => {
    set({ isLoading: true });
    const memories = get_memories_recent();
    set({ memories, isLoading: false });
  },
  getRecentMemory: () => {
    return get().memories[0];
  },
}));


