import { useState } from "react";
import CalendarIcon from "../icons/CalendarIcon";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DatePickerProps = {
  selected?: Date;
  onSelect?: (date?: Date) => void;
};

const DatePicker = ({ selected, onSelect }: DatePickerProps) => {
  // Always use the prop if provided, fallback to internal state
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>(selected);

  const date = selected ?? internalDate;

  const handleSelect = (d?: Date) => {
    setInternalDate(d); // update internal state if uncontrolled
    onSelect?.(d);      // notify parent if controlled
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={`hover:bg-transparent justify-start h-11 px-3.5 py-2.5 ${date ? "" : "hover:text-gray-400"}`}
        >
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
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
