import { Calendar } from "lucide-react";

interface BookingCalendarProps {
  value: string;
  onChange: (value: string) => void;
}

const BookingCalendar = ({ value, onChange }: BookingCalendarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="8 Oct 2025"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default BookingCalendar;
