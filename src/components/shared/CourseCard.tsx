import ProgressCircle from "./ProgressCircle";

type CourseCardProps = {
    percent?: number;
    active?: boolean;
}

const CourseCard = (props: CourseCardProps) => {
    const { percent, active } = props;

  return (
    <div className={`${active ? "border-bright border-3" : "border-gray-400 border-1"} p-5 rounded-lg w-full cursor-pointer active:scale-95`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary text-nowrap">
            Design Research Project
          </span>
          <div className="text-gray-400 text-sm flex flex-col gap-1">
            <span>Class: TDS1502</span>
            <span>Total Slots: 24</span>
          </div>
        </div>

        {percent && <ProgressCircle percent={percent}/>}
      </div>
    </div>
  );
};

export default CourseCard;
