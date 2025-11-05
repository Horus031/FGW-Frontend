import EditPencilIcon from "../icons/EditPencilIcon";
import type { FeedbackForm } from "../../models/feedback";

type InstructorCardProps = {
  active?: boolean;
  onclick?: () => void;
  form: FeedbackForm;
}

const InstructorCard = (props: InstructorCardProps) => {
  const { active, onclick, form } = props;

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <div onClick={onclick} className={`relative flex flex-col gap-2 border ${active ? "border-[#005EB8] border-2 bg-blue-50" : "border-gray-300"} shadow-sm px-5 py-3 rounded-lg text-primary cursor-pointer hover:shadow-md transition-shadow min-w-[280px]`}>
      {form.isSubmitted && (
        <div className="absolute top-3 right-3">
          <EditPencilIcon />
        </div>
      )}

      <div className="flex items-start pr-6">
        <span className="font-semibold text-[16px] text-[#00033D]">Instructor: {form.teacherName}</span>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <span className="text-[#666666]">{form.courseName}</span>
        <div className="flex items-center gap-2">
          <span className="text-[#666666] font-medium">Class:</span><span className="text-[#0C85EB] font-medium">{form.classCode}</span>
          <span className="text-[#666666] text-[12px] ml-auto">{currentDate}</span>
        </div>
      </div>
    </div>
  )
}

export default InstructorCard
