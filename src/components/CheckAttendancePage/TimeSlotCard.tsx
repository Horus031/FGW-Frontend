import { Badge } from "../../components/ui/badge";

type Props = {
  slot: number;
  startTime: string;
  endTime: string;
  status: string;
  active?: boolean;
  onClick?: () => void;
};

const TimeSlotCard = (props: Props) => {
  const { slot, startTime, endTime, status, active = false, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border-1 px-4 py-3 rounded-lg focus:outline-none cursor-pointer ${active ? "border-primary bg-gray-100 " : "border-gray-300"
        }`}
    >
      <div className="flex flex-col gap-3 text-xs text-primary">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Slot {slot}</span>
          <Badge
            className={`${status === "Completed"
              ? "border-green-700 bg-green-100 text-green-700"
              : "border-gray-700 bg-gray-100 text-gray-700"
              } border-1 px-2 rounded-[6px] `}
          >
            {status}
          </Badge>
        </div>
        <span>
          {startTime} AM - {endTime} AM
        </span>
      </div>
    </button>
  );
};

export default TimeSlotCard;
