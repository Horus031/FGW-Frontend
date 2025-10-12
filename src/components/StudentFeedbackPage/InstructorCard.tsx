import EditPencilIcon from "../icons/EditPencilIcon"

type InstructorCardProps = {
    active?: boolean;
    onclick?: () => void
}

const InstructorCard = (props: InstructorCardProps) => {
 const { active, onclick } = props;

  return (
    <div onClick={onclick} className={`flex flex-col gap-2 border ${active ? "border-blue-600 border-2 bg-blue-50" : "border-gray-400"} shadow-lg px-5 py-2 rounded-lg text-primary cursor-pointer`}>
      <div className="flex items-center gap-12">
        <span className="font-semibold">Instructor: Nguyen Duc Son</span>
        <EditPencilIcon/>
      </div>

      <div className="flex flex-col text-gray-400 text-sm font-normal">
        <span>Web Programming 1</span>
        <span>Class: COS1204</span>
      </div>
    </div>
  )
}

export default InstructorCard
