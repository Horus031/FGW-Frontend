import { useMemo } from "react";
import type { Weeks } from "./useWeeksInYear";
import { dayNames } from "@/constants/constants";

const useDaysInWeek = (props: Weeks | null) => {
  return useMemo(() => {
    const data = props;
    const daysInWeek: Date[] = [];

    if (data) {
        // Get the first day of the week
      let DayOfWeek = new Date(data.start);

      dayNames.map((_, index) => {
        // Push the first day of the week at the first loop
        if (index == 0) {
          daysInWeek.push(DayOfWeek);
          return
        }

        // Calculate the date into next day, re-assign DayOfWeek
        const nextDate = new Date(DayOfWeek);
        nextDate.setDate(DayOfWeek.getDate() + 1);

        DayOfWeek = nextDate;

        daysInWeek.push(nextDate);
      });
    }

    return daysInWeek
  }, [props]);
};

export default useDaysInWeek;
