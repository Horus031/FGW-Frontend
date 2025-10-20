import { useState } from "react";
import MarkCourse from "../../../components/MarkPage/MarkCourse";
import MarkTable from "../../../components/MarkPage/MarkTable";
import PageTitle from "../../../components/shared/PageTitle";
import TermSelect from "../../../components/shared/TermSelect";
import type { CourseMark } from "../../../models/course";

const data: CourseMark[] = [
  {
    courseName: "Design Research Project",
    classCode: "TDS1512",
    grade: 80,
    gradeStatus: "pass",
  },
  {
    courseName: "Design Research Project",
    classCode: "TDS1512",
    grade: 39,
    gradeStatus: "fail",
  },
  {
    courseName: "Design Research Project",
    classCode: "TDS1512",
    grade: 50,
    gradeStatus: "pass",
  },
];

const MarkPage = () => {
  const [active, setActive] = useState(data.indexOf(data[0]));

  const handleOnClick = (index: number) => {
    setActive(index);
  };

  const renderCourse = () => {
    return data.map((item, index) => {
      return (
        <MarkCourse
          onclick={() => handleOnClick(index)}
          {...(index === active ? { active: true } : {})}
          key={index}
          courseName={item.courseName}
          classCode={item.classCode}
          grade={item.grade}
          gradeStatus={item.gradeStatus}
        />
      );
    });
  };

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="Mark Report" />

      <div className="flex flex-col gap-6">
        <TermSelect />

        <div className="flex gap-12">
          <div className="flex flex-col gap-2.5 w-5/12">{renderCourse()}</div>
          <div className="w-7/12">
            <MarkTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkPage;
