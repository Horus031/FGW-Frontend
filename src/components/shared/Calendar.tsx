import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface BookingCalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const BookingCalendar = ({ value, onChange }: BookingCalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Unfocus Popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = Array.from(
    { length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() },
    (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  const handleDateClick = (day: Date) => {
    onChange(day);
    setShowCalendar(false);
  };

  return (
    <div className="relative w-full" ref={calendarRef}>
      {/* Input field */}
      <div
        className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 cursor-pointer focus-within:ring-2 focus-within:ring-secondary"
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        <Calendar className="w-5 h-5 text-gray-400 mr-2 pb-1" />
        <input
          type="text"
          readOnly
          value={value ? format(value, "dd MMM yyyy") : ""}
          placeholder="Select a date"
          className="w-full bg-transparent focus:outline-none cursor-pointer"
        />
      </div>

      {/* Popup calendar */}
      {showCalendar && (
        <div className="absolute top-14 left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-3">
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
              ←
            </button>
            <span className="font-semibold">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`p-2 rounded-md text-sm transition ${value && format(day, "yyyy-MM-dd") === format(value, "yyyy-MM-dd")
                  ? "bg-secondary text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
