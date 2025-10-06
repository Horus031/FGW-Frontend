import { useState } from "react";
import InstructorCard from "./InstructorCard";

const data = [
  {
    instructor: "Nguyen Duc Son",
    course: "Web Programming 1",
    class: "COS1204",
  },
  {
    instructor: "Nguyen Duc Son",
    course: "Web Programming 1",
    class: "COS1204",
  },
  {
    instructor: "Nguyen Duc Son",
    course: "Web Programming 1",
    class: "COS1204",
  },
];

const InstructorList = () => {
  const [active, setActive] = useState(data.indexOf(data[0]));

  const handleOnClick = (index: number) => {
    setActive(index);
  }
  const renderInstructor = () => {
    return data.map((_, index) => {
      return <InstructorCard key={index} onclick={() => handleOnClick(index)} { ...index === active ? { active: true } : {} } />;
    });
  };
  return (
    <div className="flex items-center gap-6">
      {renderInstructor()}
    </div>
  );
};

export default InstructorList;
