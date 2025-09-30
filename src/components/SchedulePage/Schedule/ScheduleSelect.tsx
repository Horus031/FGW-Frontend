import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { type Weeks } from "@/hooks/useWeeksInYear";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useWeeksInYear from "@/hooks/useWeeksInYear";

type ScheduleSelectProps = {
  handleSetWeeks: (weeks: Weeks | null) => void;
};

const ScheduleSelect = (props: ScheduleSelectProps) => {
  const { handleSetWeeks } = props;
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedWeek, setSelectedWeek] = useState<Weeks | null>(null);

  const weeks = useWeeksInYear(Number(selectedYear));

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleWeekChange = (value: string) => {
    const parsed: Weeks = JSON.parse(value);
    // cần convert lại string thành Date
    parsed.start = new Date(parsed.start);
    parsed.end = new Date(parsed.end);

    setSelectedWeek(parsed);
  };

  const renderDaysInWeek = () => {
    return weeks.map((week, idx) => {
      const startWeek = `${week.start.getDate()}/${week.start.getMonth() + 1}`;
      const endWeek = `${week.end.getDate()}/${week.end.getMonth() + 1}`;

      return (
        <SelectItem
          key={idx}
          value={JSON.stringify({
            start: week.start,
            end: week.end,
          })}
          className="pr-2 justify-center"
        >
          {startWeek} - {endWeek}
        </SelectItem>
      );
    });
  };

  useEffect(() => {
    if (weeks.length > 0) {
      const today = new Date();
      const currentYear = today.getFullYear();

      let defaultWeek: Weeks | null = null;

      if (Number(selectedYear) === currentYear) {
        defaultWeek =
          weeks.find((week) => week.start <= today && today <= week.end) ||
          null;
      } else {
        defaultWeek = weeks[0];
      }

      if (defaultWeek) {
        setSelectedWeek((prev) => {
          if (
            !prev ||
            prev.start.getTime() !== defaultWeek!.start.getTime() ||
            prev.end.getTime() !== defaultWeek!.end.getTime()
          ) {
            return defaultWeek;
          }

          return prev;
        });
        handleSetWeeks(defaultWeek);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeks, selectedYear]);


  return (
    <div className="flex self-end gap-4">
      <Select value={selectedYear} onValueChange={handleYearChange}>
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

      <div className="flex border border-black/30 rounded-md">
        <Button className="rounded-r-none bg-white hover:bg-black/10 cursor-pointer">
          <ChevronLeft color="gray" />
        </Button>

        <Select
          value={
            selectedWeek
              ? JSON.stringify({
                  start: selectedWeek.start,
                  end: selectedWeek.end,
                })
              : undefined
          }
          onValueChange={handleWeekChange}
        >
          <SelectTrigger
            noIcon
            className="rounded-none border-y-0 hover:bg-black/10 cursor-pointer border-black/30"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="-left-5">
            <SelectGroup className="text-center">
              {renderDaysInWeek()}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="rounded-l-none bg-white hover:bg-black/10 cursor-pointer">
          <ChevronRight color="gray" />
        </Button>
      </div>
    </div>
  );
};

export default ScheduleSelect;
