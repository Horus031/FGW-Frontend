import { Label } from '../ui/label'
import InputWithIcon from '../shared/InputWithIcon'
import { Button } from '../ui/button'
import { useRef, type FormEvent } from 'react';

type GradeSearchProps = {
  onStudentSelect: (student: string) => void;
}

const GradeSearch = (props: GradeSearchProps) => {
  const { onStudentSelect } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;

    // Mock student lookup - replace with actual API call
    onStudentSelect(value);
  };

  return (
    <div className='space-y-2'>
      <Label>Search Student Grade</Label>
      <div className='flex items-center gap-3'>
        <InputWithIcon ref={inputRef} placeholder='Enter Roll Number...'/>
        <Button onClick={handleSearch} className='h-11 cursor-pointer active:scale-95'>Search</Button>
      </div>
    </div>
  )
}

export default GradeSearch
