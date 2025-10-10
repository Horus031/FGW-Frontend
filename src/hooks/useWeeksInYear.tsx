// ...existing code...
import { useMemo } from "react";

export type Weeks = {
  start: Date;
  end: Date;
};

// pure, synchronous function (safe to call outside React)
export function getWeeksInYear(props: string): Weeks[] {
  const weeks: Weeks[] = [];
  const year = Number(props);
  const date = new Date(year, 0, 1);

  const firstDayOfWeek = date.getDay();
  if (firstDayOfWeek !== 1) {
    const daysToMonday = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    date.setDate(date.getDate() - daysToMonday);
  }

  while (true) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(date.getDate() + 6);

    if (end.getFullYear() > year) {
      break;
    }

    weeks.push({
      start,
      end,
    });

    date.setDate(date.getDate() + 7);
  }

  return weeks;
}

// hook wrapper for components that want memoized result
export default function useWeeksInYear(props: string) {
  return useMemo(() => getWeeksInYear(props), [props]);
}
// ...existing code...