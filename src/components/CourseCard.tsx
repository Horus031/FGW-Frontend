import ProgressCircle from "./ProgressCircle";

type CourseCardProps = {
    percent?: number;
}

const CourseCard = (props: CourseCardProps) => {
    const { percent } = props;

  return (
    <div className="border-1 border-gray-400 p-5 rounded-lg w-full">
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

        {percent && <ProgressCircle/>}
      </div>
    </div>
  );
};

export default CourseCard;
