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
      className={`flex gap-3 px-4 py-6 ${active
        ? "border-primary border-2 bg-gray-100"
        : "border-gray-300 border-1"
        }  shadow-md rounded-lg cursor-pointer active:scale-98`}
    >
      <div className="flex flex-col flex-1 gap-2">
        <span className="font-semibold text-xl text-primary truncate w-full overflow-ellipsis">{courseName}</span>
        <span className="font-medium text-[14px] text-gray-primary">Class: {classCode}</span>
      </div>
      <div className="flex flex-col items-center gap-2 ">
        <span className="font-bold text-base">{grade}/100</span>
        <Badge
          className={`${gradeStatus == "passed" ? "bg-green-100 text-green-700 border-green-700 border-[0.5px] rounded-[6px]" : "bg-red-100 text-red-700 border-red-700 border-[0.5px] rounded-[6px]"
            } capitalize px-2.5 text-sm `}
        >
          {gradeStatus}
        </Badge>
      </div>
    </div>
  );
};

export default MarkCourse;
