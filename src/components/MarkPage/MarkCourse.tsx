import { Badge } from "../ui/badge";

type MarkCourseProps = {
  courseName: string;
  classCode: string;
  grade?: number;
  gradeStatus?: string;
  active?: boolean;
  onclick?: () => void;
};

const MarkCourse = (props: MarkCourseProps) => {
  const { courseName, classCode, grade, gradeStatus, active, onclick } = props;

  //
  return (
    <div
      onClick={onclick}
      className={`flex gap-3 px-4 py-6 ${
        active
          ? "border-secondary border-2  bg-blue-50"
          : "border-gray-300 border-1"
      }  shadow-md rounded-lg cursor-pointer active:scale-98`}
    >
      <div className="flex flex-col flex-1">
        <span className="font-medium text-base text-gray-800/60">{classCode}</span>
        <span className="font-semibold text-xl text-primary">{courseName}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-base">{grade}/100</span>
        <Badge
          className={`${
            gradeStatus == "pass" ? "bg-approve" : "bg-danger"
          } capitalize px-2.5 text-sm w-18`}
        >
          {gradeStatus}
        </Badge>
      </div>
    </div>
  );
};

export default MarkCourse;
