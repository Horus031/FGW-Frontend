import type { CourseFeedback } from "../../models/course";
import CourseNormalCard from "../shared/CourseNormalCard";

type CourseFeedbackListProps = {
  data: CourseFeedback[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const CourseFeedbackList = (props: CourseFeedbackListProps) => {
  const { data, selectedIndex, onSelect } = props;

  const renderCourseFeedback = () => {
    return data.map((feedback, index) => {
      return (
        <CourseNormalCard
          handleActiveCard={() => onSelect(index)}
          key={feedback.classCode}
          active={selectedIndex === index}
          courseCode={feedback.classCode}
          courseName={feedback.courseName}
        />
      );
    });
  };

  return <div className="flex items-center gap-4">{renderCourseFeedback()}</div>;
};

export default CourseFeedbackList;