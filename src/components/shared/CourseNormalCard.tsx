import EditPencilIcon from '../icons/EditPencilIcon';

type CourseNormalCardProps = {
    handleActiveCard: () => void,
    active?: boolean,
    courseCode?: string,
    courseName?: string,
    attendance?: boolean
}

const CourseNormalCard = (props: CourseNormalCardProps) => {
    const { handleActiveCard, attendance, active, courseCode, courseName } = props;
  return (
    <div onClick={handleActiveCard} className={`flex flex-col justify-between h-19 border px-3 py-2 rounded-lg ${active ? "border-secondary border-2" : "border-gray-400 border-1"} cursor-pointer active:scale-95`}>
      <div className='flex items-center justify-between gap-8'>
        <span className='font-semibold'>{courseCode}</span>

        {attendance && <EditPencilIcon/>}
      </div>

      <span className='text-gray-800'>{courseName}</span>
    </div>
  )
}

export default CourseNormalCard
