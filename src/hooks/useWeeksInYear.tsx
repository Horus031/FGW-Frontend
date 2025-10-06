import { useMemo } from "react";

export type Weeks = {
  start: Date;
  end: Date;
};

const useWeeksInYear = (props: number) => {
  return useMemo(() => {
    const weeks: Weeks[] = [];
    const year = props;
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

      // Đẩy tuần vào mảng
      weeks.push({
        start,
        end,
      });

      date.setDate(date.getDate() + 7);
    }

    console.log(weeks);

    return weeks;
  }, [props]);
};

export default useWeeksInYear;
