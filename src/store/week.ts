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

const initialWeeks = getWeeksInYear(currentYear);
const today = new Date();
const initialWeek = initialWeeks.find(
  (week) => week.start <= today && today <= week.end
) || initialWeeks[0] || null;

export const useWeekStore = create<WeekState>((set) => ({
  selectedYear: currentYear,
  weeksInYear: initialWeeks,
  selectedWeek: initialWeek, // ✅ Initialize with current week instead of null
  setSelectedYear: (year: string) =>
    set((state) => {
      if (year === state.selectedYear) {
        return state;
      }
      const weeks = getWeeksInYear(year);
      return { 
        selectedYear: year, 
        weeksInYear: weeks,
        selectedWeek: null // Reset when year changes
      };
    }),
  setSelectedWeek: (week: Weeks) =>
    set((state) => {
      if (sameWeek(state.selectedWeek, week)) {
        return state;
      }
      return { selectedWeek: week };
    }),
}));
// ...existing code...
