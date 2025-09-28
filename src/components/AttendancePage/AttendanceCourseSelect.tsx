import CourseCard from '../shared/CourseCard'
import TermSelect from '../shared/TermSelect'

const AttendanceCourseSelect = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TermSelect/>

      <div className='grid grid-cols-3 gap-11'>
        <CourseCard percent={75} active={true}/>
        <CourseCard percent={75} />
        <CourseCard percent={75}/>
      </div>
    </div>
  )
}

export default AttendanceCourseSelect
