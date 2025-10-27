import { useState } from "react";
import CourseNormalCard from "../shared/CourseNormalCard";

const data = [
  {
    courseCode: "COS1204",
    courseName: "Computer Networks",
  },
  {
    courseCode: "COS1205",
    courseName: "Computer Networks",
  },
];

const AttendanceGroupList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const renderCourseGroup = () => {
    return data.map((item, index) => {
      return (
        <CourseNormalCard
          handleActiveCard={() => setSelectedIndex(index)}
          key={item.courseCode}
          attendance
          active={selectedIndex === index}
          courseCode={item.courseCode}
          courseName={item.courseName}
        />
      );
    });
  };

  return <div className="flex items-center gap-3">{renderCourseGroup()}</div>;
};

export default AttendanceGroupList;
