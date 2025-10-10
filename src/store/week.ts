// ...existing code...
import { create } from "zustand";
import type { Weeks } from "../hooks/useWeeksInYear";
import { getWeeksInYear } from "../hooks/useWeeksInYear";

interface WeekState {
  selectedYear: string;
  weeksInYear: Weeks[];
  selectedWeek: Weeks | null;
  setSelectedYear: (year: string) => void;
  setSelectedWeek: (week: Weeks) => void;
}

const currentYear = new Date().getFullYear().toString();

function sameWeek(a: Weeks | null, b: Weeks | null) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    a.start.getTime() === b.start.getTime() &&
    a.end.getTime() === b.end.getTime()
  );
}

export const useWeekStore = create<WeekState>((set) => ({
  selectedYear: currentYear,
  weeksInYear: getWeeksInYear(currentYear),
  selectedWeek: null,
  setSelectedYear: (year: string) =>
    set((state) => {
      if (year === state.selectedYear) {
        return state;
      }
      const weeks = getWeeksInYear(year);
      return { selectedYear: year, weeksInYear: weeks };
    }),
  setSelectedWeek: (week: Weeks) =>
    set((state) => {
      if (sameWeek(state.selectedWeek, week)) {
        // return the same state object so zustand won't notify subscribers
        return state;
      }
      return { ...state, selectedWeek: week };
    }),
}));
// ...existing code...
