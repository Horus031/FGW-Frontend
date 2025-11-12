import { useEffect, useState } from "react";
import MarkCourse from "../../../components/MarkPage/MarkCourse";
import MarkTable from "../../../components/MarkPage/MarkTable";
import PageTitle from "../../../components/shared/PageTitle";
import SkeletonDemo from "../../../components/shared/SkeletonLoading";
import type { CourseMark } from "../../../models/course";

const mockMarkData = [
  {
    courseName: "Design Research Project",
    classCode: "TDS1512",
    table: {
      categories: [
        {
          name: "Final Exam",
          items: [
            { gradeItem: "Listening FE", weight: "8.0%", value: 8.5, comment: "" },
            { gradeItem: "Speaking FE", weight: "25.0%", value: 7.8, comment: "" },
            { gradeItem: "Writing FE", weight: "10.0%", value: 8.0, comment: "" },
            { gradeItem: "Reading FE", weight: "16.0%", value: 7.2, comment: "" },
            { gradeItem: "Total", weight: "40.0%", value: 7.8, comment: "" },
          ],
        },
      ],
      courseTotal: { average: 80, status: "Passed" },
    },
  },
  {
    courseName: "Web Application Development",
    classCode: "CSD201",
    table: {
      categories: [
        {
          name: "Final Exam",
          items: [
            { gradeItem: "Practical FE", weight: "30.0%", value: 6.8, comment: "" },
            { gradeItem: "Theory FE", weight: "10.0%", value: 7.0, comment: "" },
            { gradeItem: "Project", weight: "30.0%", value: 8.2, comment: "" },
            { gradeItem: "Assignment", weight: "10.0%", value: 7.6, comment: "" },
            { gradeItem: "Total", weight: "80.0%", value: 7.4, comment: "" },
          ],
        },
      ],
      courseTotal: { average: 74, status: "Passed" },
    },
  },
  {
    courseName: "Database Systems",
    classCode: "DBI202",
    table: {
      categories: [
        {
          name: "Final Exam",
          items: [
            { gradeItem: "Midterm", weight: "20.0%", value: 4.8, comment: "" },
            { gradeItem: "Final FE", weight: "50.0%", value: 3.9, comment: "" },
            { gradeItem: "Lab Exercises", weight: "20.0%", value: 5.5, comment: "" },
            { gradeItem: "Project", weight: "10.0%", value: 4.2, comment: "" },
            { gradeItem: "Total", weight: "100.0%", value: 4.3, comment: "" },
          ],
        },
      ],
      courseTotal: { average: 43, status: "Failed" },
    },
  },
];

const data: CourseMark[] = [
  { courseName: "Design Research Project", classCode: "TDS1512", grade: 80, gradeStatus: "passed" },
  { courseName: "Web Application Development", classCode: "CSD201", grade: 74, gradeStatus: "passed" },
  { courseName: "Database Systems", classCode: "DBI202", grade: 43, gradeStatus: "not pass" },
];

const MarkPage = () => {
  const [active, setActive] = useState(0);
  const [leftLoading, setLeftLoading] = useState(true); // for first load
  const [rightLoading, setRightLoading] = useState(true); // for table loading
  const [tableData, setTableData] = useState(mockMarkData[0].table);

  // simulate initial left + right loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeftLoading(false);
      setRightLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // simulate right (table) reload when course changes
  const handleOnClick = (index: number) => {
    if (index === active) return;
    setActive(index);
    setRightLoading(true);

    // simulate API fetch delay
    setTimeout(() => {
      setTableData(mockMarkData[index].table);
      setRightLoading(false);
    }, 1000);
  };

  const renderCourse = () =>
    data.map((item, index) => (
      <MarkCourse
        key={index}
        onclick={() => handleOnClick(index)}
        active={index === active}
        courseName={item.courseName}
        classCode={item.classCode}
        grade={item.grade}
        gradeStatus={item.gradeStatus}
      />
    ));

  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Mark Report" />

      <div className="flex flex-col gap-6">
        <div className="flex gap-8.5 justify-between">
          {/* LEFT: Course list */}
          <div className="flex flex-col gap-2.5 ">
            {leftLoading ? <div className="border-gray-700 border rounded-lg  w-[400px] h-[300px]"> <SkeletonDemo skeletonNum={12} /> </div> : renderCourse()}
          </div>

          {/* RIGHT: Table */}
          <div className="w-[950px]">
            {rightLoading ? (
              <div className="space-y-2 border-gray-600 border rounded-lg p-4 h-96">
                <SkeletonDemo skeletonNum={15} />
              </div>
            ) : (
              <MarkTable table={tableData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkPage;
