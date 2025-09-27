import CourseCard from '../shared/CourseCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const AttendanceCourseSelect = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Select>
        <SelectTrigger className='w-[190px]'>
            <SelectValue  placeholder="Select Terms"/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem value='Fall2025'>Fall 2025</SelectItem>
                <SelectItem value='1'>Fall 2025</SelectItem>
                <SelectItem value='2'>Fall 2025</SelectItem>
                <SelectItem value='3'>Fall 2025</SelectItem>
                <SelectItem value='4'>Fall 2025</SelectItem>
            </SelectGroup>
        </SelectContent>
      </Select>

      <div className='grid grid-cols-3 gap-11'>
        <CourseCard percent={75} active={true}/>
        <CourseCard percent={75} />
        <CourseCard percent={75}/>
      </div>
    </div>
  )
}

export default AttendanceCourseSelect
