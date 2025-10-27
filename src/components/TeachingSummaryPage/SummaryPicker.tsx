import { useState } from "react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const SummaryPicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-xs text-gray-400">
            <CalendarIcon />
            {date ? date.toLocaleDateString() : "Select a day"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SummaryPicker;
