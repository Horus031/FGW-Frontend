import { Label } from '../ui/label'
import InputWithIcon from '../shared/InputWithIcon'
import { Button } from '../ui/button'

const GradeSearch = () => {
  return (
    <div className='space-y-2'>
      <Label>Search Student Grade</Label>
      <div className='flex items-center gap-3'>
        <InputWithIcon placeholder='Enter Roll Number or Student Name...'/>
        <Button className='h-11'>Search</Button>
      </div>
    </div>
  )
}

export default GradeSearch
