import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import React, { useEffect, useMemo, useRef } from "react";
import { useWeekStore } from "../../../store/week";
import type { Weeks } from "../../../hooks/useWeeksInYear";
import DatePicker from "../../shared/DatePicker";

const isSameWeek = (a: Weeks | null, b: Weeks | null) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    a.start.getTime() === b.start.getTime() &&
    a.end.getTime() === b.end.getTime()
  );
};

const ScheduleSelect = () => {
  const {
    selectedYear,
    setSelectedYear,
    weeksInYear,
    setSelectedWeek,
    selectedWeek,
  } = useWeekStore();

  const prevWeeksRef = useRef<Weeks[] | null>(null);
  useEffect(() => {
    if (prevWeeksRef.current !== weeksInYear) {
      prevWeeksRef.current = weeksInYear;
    }

    if (weeksInYear.length > 0) {
      const today = new Date();
      const currentYear = today.getFullYear();

      let defaultWeek: Weeks | null = null;

      if (Number(selectedYear) === currentYear) {
        defaultWeek =
          weeksInYear.find(
            (week) => week.start <= today && today <= week.end
          ) || null;
      } else {
        defaultWeek = weeksInYear[0];
      }

      if (defaultWeek && !isSameWeek(defaultWeek, selectedWeek)) {
        setSelectedWeek(defaultWeek);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeksInYear, selectedYear, setSelectedWeek]);

  const handleWeekChange = (value: string) => {
    const parsed: Weeks = JSON.parse(value);
    parsed.start = new Date(parsed.start);
    parsed.end = new Date(parsed.end);

    if (!isSameWeek(parsed, selectedWeek)) {
      setSelectedWeek(parsed);
    }
  };

  const renderWeeks = useMemo(() => {
    if (weeksInYear.length === 0) return null;
    return weeksInYear.map((week, index) => {
      const startTime = `${week.start.getDate()}/${week.start.getMonth() + 1}`;
      const endTime = `${week.end.getDate()}/${week.end.getMonth() + 1}`;

      return (
        <SelectItem
          key={index}
          value={JSON.stringify({
            start: week.start,
            end: week.end,
          })}
          className="pr-2 justify-center"
        >
          {`${startTime} - ${endTime}`}
        </SelectItem>
      );
    });
  }, [weeksInYear]);

  return (
    <div className="flex self-end gap-4">
      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DatePicker weeksInYear={weeksInYear} selectedWeek={selectedWeek} handleWeekChange={handleWeekChange} renderWeeks={() => renderWeeks} />
    </div>
  );
};

export default React.memo(ScheduleSelect);
