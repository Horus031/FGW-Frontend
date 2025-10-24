import EditPencilIcon from '../icons/EditPencilIcon';

type Props = {
    courseName: string;
    courseCode: string;
    attendance?: boolean;
    active?: boolean;
    handleActiveCard?: () => void
}

const CourseNormalCard = (props: Props) => {
    const { attendance, courseName, courseCode, active, handleActiveCard } = props;
  return (
    <div onClick={() => handleActiveCard?.()} className={`${active ? "border-secondary bg-secondary-100 border-2" : "border-gray-400 border-1"} px-3 py-2 rounded-lg cursor-pointer active:scale-95 space-y-2`}>
      <div className='flex items-center justify-between'>
        <span className='text-primary font-semibold'>{courseCode}</span>
        { attendance && (
            <EditPencilIcon/>
        )}
      </div>

      <span className='text-gray-400'>{courseName}</span>
    </div>
  )
}

export default CourseNormalCard
