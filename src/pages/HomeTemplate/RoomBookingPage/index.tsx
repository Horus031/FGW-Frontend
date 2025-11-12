import { useState } from "react";
import SlotButton from "../../../components/RoomBookingPage/BookingSlots";
import BookingCalendar from "../../../components/shared/Calendar";
import PageTitle from "../../../components/shared/PageTitle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useUserStore } from "../../../store/user";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number[]>([]);
  const [purpose, setPurpose] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [errors, setErrors] = useState<{ slot?: string; purpose?: string }>({});
  const user = useUserStore((state) => state.user);

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
    // ⚠️ Must select date first
    if (!selectedDate) {
      setIsWarning(true);
      return;
    }

    setSelectedSlot((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // ⚠️ Must select date first
    if (!selectedDate) {
      setIsWarning(true);
      return;
    }
    setPurpose(e.target.value);
  };

  const validateForm = () => {
    const newErrors: { slot?: string; purpose?: string } = {};

    if (!selectedDate) {
      newErrors.slot = "Please select a date first.";
    }
    if (selectedSlot.length === 0) {
      newErrors.slot = "Please select at least one slot.";
    }
    if (purpose.trim().split(" ").length < 5) {
      newErrors.purpose = "Purpose must have at least 5 words.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      setIsWarning(true);
      return;
    }
    if (!validateForm()) return;
    setIsConfirm(true); // ✅ show confirm popup instead of success
  };

  const handleClear = () => {
    setSelectedDate(null);
    setSelectedSlot([]);
    setPurpose("");
  };

  const confirmBooking = () => {
    setIsConfirm(false);
    setIsSuccess(true);
  };
  return (
    <div className="space-y-6 max-w-4xl ml-0">
      <PageTitle breadcrumb="Room Booking" />

      {/* Date + Slot Section */}
      <div className="flex gap-6">
        {/* Date Selection */}
        <div className="flex-shrink-0 w-64">
          <div className="flex flex-col gap-3">
            <label className="text-base font-semibold text-primary">
              Select day
            </label>
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
          {errors.slot && (
            <p className="text-red-500 text-sm mt-1">{errors.slot}</p>
          )}
        </div>
      </div>

      {/* Purpose Input */}
      <div className="flex flex-col gap-3">
        <label className="text-base font-semibold text-primary">Purpose</label>
        <Textarea
          className="h-64"
          placeholder="Enter the purpose of your booking..."
          value={purpose}
          onChange={handlePurposeChange}
        />
        {errors.purpose && (
          <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
        )}
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

      {/* Success Popup */}
      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">Booking Successful</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-weak">
              Your booking is pending approval. You'll be notified once confirmed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="text-sm text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Name:</span>
              <span>{user?.fullName || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Student ID:</span>
              <span>{user?.student?.id || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Date:</span>
              <span>
                {selectedDate ? selectedDate.toLocaleDateString("en-GB") : "-"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Slots:</span>
              <span>
                {selectedSlot?.length > 0
                  ? `${Math.min(...selectedSlot)} to ${Math.max(...selectedSlot)}`
                  : "-"}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">Purpose:</span>
              <span>
                <em>
                  “{purpose?.trim() || "No purpose provided."}”
                </em>
              </span>
            </div>
          </div>


          <AlertDialogFooter className="flex w-full space-x-2">
            <AlertDialogAction
              onClick={() => { setIsSuccess(false); handleClear(); }}
              className="bg-secondary text-white cursor-pointer flex-1 hover:opacity-80 transition"
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* ⚠️ Warning Popup */}
      <AlertDialog open={isWarning} onOpenChange={setIsWarning}>
        <AlertDialogContent className="flex flex-col items-left text-primary font-semibold text-lg">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle>Please select a date first!</AlertDialogTitle>
            <AlertDialogDescription>
              To continue, choose a date before selecting a slot or entering a purpose
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Footer */}
          <AlertDialogFooter className="w-full flex justify-center mt-4">
            <AlertDialogAction
              onClick={() => setIsWarning(false)}
              className="w-full py-3 text-lg cursor-pointer rounded-lg bg-secondary text-white hover:opacity-80 transition"
            >
              Select a date
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Booking Popup */}
      <AlertDialog open={isConfirm} onOpenChange={setIsConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader className="pb-4">
            <AlertDialogTitle className="text-primary">Confirm Your Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-weak">
              Please make sure your date, slot, and purpose are correct.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="text-sm text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Name:</span>
              <span>{user?.fullName || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Student ID:</span>
              <span>{user?.student?.id || "-"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Date:</span>
              <span>
                {selectedDate ? selectedDate.toLocaleDateString("en-GB") : "-"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Slots:</span>
              <span>
                {selectedSlot?.length > 0
                  ? `${Math.min(...selectedSlot)} to ${Math.max(...selectedSlot)}`
                  : "-"}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-medium text-primary">Purpose:</span>
              <span>
                <em>
                  “{purpose?.trim() || "No purpose provided."}”
                </em>
              </span>
            </div>
          </div>


          <AlertDialogFooter className="flex w-full space-x-2">
            <AlertDialogCancel className="flex-1 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBooking}
              className="flex-1 bg-secondary text-white cursor-pointer hover:opacity-80 transition"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



    </div >
  );
};

export default BookingForm;
