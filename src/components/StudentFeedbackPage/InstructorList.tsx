import InstructorCard from "./InstructorCard";
import type { FeedbackForm } from "../../models/feedback";

type InstructorListProps = {
  forms: FeedbackForm[];
  activeFormIndex: number;
  onSelectForm: (index: number) => void;
};

const InstructorList = ({ forms, activeFormIndex, onSelectForm }: InstructorListProps) => {
  const handleOnClick = (index: number) => {
    onSelectForm(index);
  };

  const renderInstructor = () => {
    return forms.map((form, index) => {
      return (
        <InstructorCard
          key={`${form.staffId}-${form.courseId}-${form.classId}`}
          onclick={() => handleOnClick(index)}
          form={form}
          {...(index === activeFormIndex ? { active: true } : {})}
        />
      );
    });
  };

  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-2">
      {forms.length > 0 ? renderInstructor() : <p>No feedback forms available</p>}
    </div>
  );
};

export default InstructorList;
