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
      className={`w-full text-left border-1 px-4 py-3 rounded-lg focus:outline-none ${
        active ? "border-secondary bg-secondary/5" : "border-gray-300"
      }`}
    >
      <div className="flex flex-col gap-3 text-xs text-primary">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Slot {slot}</span>
          <Badge
            className={`${
              status === "Completed"
                ? "border-approve bg-approve/10 text-approve"
                : "border-gray-400 bg-gray-500/10 text-primary"
            } border-1`}
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
