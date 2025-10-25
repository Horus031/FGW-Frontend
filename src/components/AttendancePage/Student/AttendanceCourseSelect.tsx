import CourseCard from '../../shared/CourseAttendanceCard'
import TermSelect from '../../shared/TermSelect'

const AttendanceCourseSelect = () => {
  return (
    <div className='flex flex-col gap-4 w-xl'>
      <TermSelect />

      <div className='grid grid-rows-3 gap-5'>
        <CourseCard percent={75} active={true} />
        <CourseCard percent={75} />
        <CourseCard percent={75} />
      </div>
    </div>
  )
}

export default AttendanceCourseSelect
