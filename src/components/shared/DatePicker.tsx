import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Weeks } from "../../hooks/useWeeksInYear";

type DatePickerProps = {
  weeksInYear?: Weeks[];
  selectedWeek?: Weeks | null;
  handleWeekChange?: (value: string) => void;
  renderWeeks?: () => React.ReactNode;
};

const DatePicker = (props: DatePickerProps) => {
  const { weeksInYear = [], selectedWeek, handleWeekChange, renderWeeks } = props;

  // ✅ Compare dates by timestamp instead of reference
  const currentIndex = weeksInYear.findIndex(
    (w) =>
      w.start.getTime() === selectedWeek?.start.getTime() &&
      w.end.getTime() === selectedWeek?.end.getTime()
  );

  const handlePrevWeek = () => {
    if (currentIndex > 0 && handleWeekChange) {
      const prevWeek = weeksInYear[currentIndex - 1];
      handleWeekChange(JSON.stringify(prevWeek));
    }
  };

  const handleNextWeek = () => {
    if (currentIndex < weeksInYear.length - 1 && handleWeekChange) {
      const nextWeek = weeksInYear[currentIndex + 1];
      handleWeekChange(JSON.stringify(nextWeek));
    }
  };

  return (
    <div className="flex border border-black/30 rounded-md overflow-hidden">
      <Button
        className="rounded-none border-none border-r border-black/30 bg-white hover:bg-black/10 cursor-pointer"
        onClick={handlePrevWeek}
        disabled={currentIndex <= 0}
      >
        <ChevronLeft color="#00033d" />
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
          className="rounded-none border-none hover:bg-black/10 cursor-pointer"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="-left-5">
          <SelectGroup className="text-center">{renderWeeks?.()}</SelectGroup>
        </SelectContent>
      </Select>

      <Button
        className="rounded-none border-none border-l border-black/30 bg-white hover:bg-black/10 cursor-pointer"
        onClick={handleNextWeek}
        disabled={currentIndex >= weeksInYear.length - 1}
      >
        <ChevronRight color="#00033d" />
      </Button>
    </div>
  );

}
export default DatePicker;
