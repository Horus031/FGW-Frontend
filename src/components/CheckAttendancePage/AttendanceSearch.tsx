import { useState } from "react";
import KeyframeIcon from "../icons/KeyframeIcon";
import SaveIcon from "../icons/SaveIcon";
import InputWithIcon from "../shared/InputWithIcon";
import Select from "../shared/Select";
import { Button } from "../ui/button";
import Toast from "../ui/Toast";

type Props = {
  selectedSlot?: number | undefined;
  quickMarkAll: (status: "Attend" | "Absent") => void;
  copyFromPreviousSlot: () => void;
  onSave?: () => void;
};

const AttendanceSearch = ({ selectedSlot, quickMarkAll, copyFromPreviousSlot, onSave }: Props) => {
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = () => {
    // In the real app you'd call save API here. For mock, just show toast.
    setToastVisible(true);
    onSave?.();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <InputWithIcon placeholder="Search Student..." />
        </div>

        <div className="flex items-center gap-3">
          <Select quickMarkAll={quickMarkAll} />

          {/* Copy from previous slot appears only when selectedSlot >= 2 */}
          {selectedSlot && selectedSlot >= 2 && (
            <Button
              className="border-secondary text-secondary font-semibold bg-secondary/5 flex items-center gap-2 h-10 hover:bg-secondary/5 hover:text-secondary cursor-pointer"
              variant="outline"
              onClick={copyFromPreviousSlot}
            >
              <KeyframeIcon />
              <span>Copy from Slot {selectedSlot - 1}</span>
            </Button>
          )}

          <Button className="bg-secondary font-semibold cursor-pointer" onClick={handleSave}>
            <SaveIcon />
            <span>Save</span>
          </Button>
        </div>
      </div>

      <Toast
        visible={toastVisible}
        title="Attendance saved successfully"
        subtitle={selectedSlot ? `Slot ${selectedSlot} attendance has been recorded` : undefined}
        duration={3000}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
};

export default AttendanceSearch;
