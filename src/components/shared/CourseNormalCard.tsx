import EditPencilIcon from "../icons/EditPencilIcon";

type CourseNormalCardProps = {
  courseCode: string;
  courseName: string;
  attendance?: boolean;
  handleActiveCard: () => void;
  active: boolean;
};

const CourseNormalCard = (props: CourseNormalCardProps) => {
  const { courseCode, courseName, attendance, active, handleActiveCard } = props;
  return (
    <div onClick={handleActiveCard} className={`flex flex-col gap-2 px-3 py-2 rounded-lg ${active ? "border-2 border-secondary bg-secondary/10" : "border-1 border-gray-400"} cursor-pointer`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-primary">{courseCode}</span>

        {attendance && <EditPencilIcon />}
      </div>

      <span className="text-gray-weak">{courseName}</span>
    </div>
  );
};

export default CourseNormalCard;
