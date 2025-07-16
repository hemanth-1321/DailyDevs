import { create } from "zustand";
import { persist } from "zustand/middleware";

type StreakState = {
  totalLogs: number;
  currentStreak: number;
  bestStreak: number;
  setStreaks: (data: {
    totalLogs: number;
    currentStreak: number;
    bestStreak: number;
  }) => void;
};

export const useStreakStore = create<StreakState>()(
  persist(
    (set) => ({
      totalLogs: 0,
      currentStreak: 0,
      bestStreak: 0,
      setStreaks: ({ totalLogs, currentStreak, bestStreak }) =>
        set({ totalLogs, currentStreak, bestStreak }),
    }),
    {
      name: "streak-storage",
    }
  )
);

// Optional debug log
useStreakStore.subscribe((state) => {
  console.log("✅ Zustand store updated:", state);
});
