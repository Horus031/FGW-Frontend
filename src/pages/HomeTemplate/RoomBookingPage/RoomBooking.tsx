import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import BookingCalendar from "../../../components/shared/Calendar";
import SlotButton from "../../../components/RoomBookingPage/BookingSlots";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number[]>([]);

  const slots = [
    { id: 1, label: "Slot 1" },
    { id: 2, label: "Slot 2" },
    { id: 3, label: "Slot 3" },
    { id: 4, label: "Slot 4" },
    { id: 5, label: "Slot 5" },
    { id: 6, label: "Slot 6" },
    { id: 7, label: "Slot 7" },
    { id: 8, label: "Slot 8" },
  ];
  const handleSlotClick = (slotId: number) => {
    setSelectedSlot((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleSubmit = () => { };



  return (
    <div className="space-y-6 max-w-4xl ml-0">
      {/* Date and Slot Selection - Flex Layout */}
      <div className="flex gap-6">
        {/* Date Selection */}
        <div className="flex-shrink-0 w-64">
          <div className="flex flex-col gap-3">
            <label className="text-base font-semibold text-primary">Select day</label>
            <BookingCalendar value={selectedDate} onChange={setSelectedDate} />
          </div>
        </div>

        {/* Slot Selection */}
        <div className="flex flex-col gap-3 flex-1">
          <label className="text-base font-semibold text-primary">
            Select a slot
          </label>
          <div className="grid grid-cols-4 gap-3">
            {slots.map((slot) => (
              <SlotButton
                key={slot.id}
                label={slot.label}
                isSelected={selectedSlot.includes(slot.id)}
                onClick={() => handleSlotClick(slot.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-base font-semibold text-primary">
          Purpose
        </label>
        {/* Textarea */}
        <Textarea className="h-64" placeholder="Choose verification's status" />
      </div>
      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="bg-secondary hover:bg-secondary text-white px-6 cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
