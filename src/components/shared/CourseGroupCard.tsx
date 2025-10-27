
type CourseGroupProps = {
  courseCode: string;
  courseName: string;
};

const CourseGroupCard = (props: CourseGroupProps) => {
    const { courseCode, courseName } = props;
  return (
    <div
      key={courseCode}
      className="px-4 py-3 rounded-lg text-xs flex flex-col gap-4 border-1 border-gray-400 cursor-pointer active:scale-95"
    >
      <span className="font-semibold">{courseCode}</span>
      <span>{courseName}</span>
    </div>
  );
};

export default CourseGroupCard;
