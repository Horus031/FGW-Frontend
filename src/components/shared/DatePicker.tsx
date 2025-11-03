import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import CalendarIcon from "../icons/CalendarIcon";

type DatePickerProps = {
  selected?: Date | undefined;
  onSelect?: (date?: Date) => void;
};

const DatePicker = ({ selected, onSelect }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(selected);

  // keep local state in sync if parent controls selected
  useEffect(() => setDate(selected), [selected]);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={`hover:bg-transparent justify-start h-11 px-3.5 py-2.5 ${date ? "" : "hover:text-gray-400"}`}>
          <Button
            variant="outline"
            id="date"
            className={`w-40 font-medium text-sm ${date ? "" : "text-gray-400"} cursor-pointer`}
          >
            <CalendarIcon className="size-6 text-primary" />

            {date ? date.toLocaleDateString() : "DD/MM/YY"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(d) => {
              setDate(d);
              onSelect?.(d);
              setOpen(false);
            }}
          ></Calendar>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
