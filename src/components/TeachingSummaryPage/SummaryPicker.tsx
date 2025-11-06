// import { PopoverTrigger } from "@radix-ui/react-popover";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Calendar } from "../ui/calendar";
// import { Popover, PopoverContent } from "../ui/popover";

// type SummaryPickerProps = {
//   selected?: Date | undefined;
//   onSelect?: (d?: Date) => void;
// };

// const SummaryPicker = ({ selected, onSelect }: SummaryPickerProps) => {
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState<Date | undefined>(selected);

//   useEffect(() => setDate(selected), [selected]);

//   return (
//     <div>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className="text-xs text-gray-400">
//             <CalendarIcon />
//             {date ? date.toLocaleDateString() : "Select a day"}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//           <Calendar
//             mode="single"
//             selected={date}
//             captionLayout="dropdown"
//             onSelect={(d) => {
//               setDate(d);
//               onSelect?.(d);
//               setOpen(false);
//             }}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default SummaryPicker;

import { PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent } from "../ui/popover";

type SummaryPickerProps = {
  selected?: Date;
  onSelect?: (d?: Date) => void;
};

const SummaryPicker = ({ selected, onSelect }: SummaryPickerProps) => {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | undefined>(selected);

  // Use prop if provided, fallback to internal state
  const date = selected ?? internalDate;

  const handleSelect = (d?: Date) => {
    setInternalDate(d); // update internal state if uncontrolled
    onSelect?.(d);      // notify parent
    setOpen(false);
  };

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
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SummaryPicker;

