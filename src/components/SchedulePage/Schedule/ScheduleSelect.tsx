import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import React, { useMemo } from "react";
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

  // ✅ Remove the entire useEffect that sets default week
  // The store now handles initialization

  const handleWeekChange = (value: string) => {
    // console.log('🔵 handleWeekChange called');
    const parsed: Weeks = JSON.parse(value);
    parsed.start = new Date(parsed.start);
    parsed.end = new Date(parsed.end);

    if (!isSameWeek(parsed, selectedWeek)) {
      // console.log('🔵 Setting week:', parsed);
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

      <DatePicker
        weeksInYear={weeksInYear}
        selectedWeek={selectedWeek}
        handleWeekChange={handleWeekChange}
        renderWeeks={() => renderWeeks}
      />
    </div>
  );
};

export default React.memo(ScheduleSelect);