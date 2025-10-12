import Pagination from "../../shared/Pagination"
import FilterButton from "../../shared/Filter"
import { TaskCard } from "./Taskcard";

interface Task {
  id: number;
  status: 'new' | 'missing' | 'attempted' | null;
  title: string;
  student: string;
  course: string;
  dueDate: string;
}


const TaskContainer = () => {

  const tasks: Task[] = [
    { id: 1, status: 'new', title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
    { id: 2, status: null, title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
    { id: 3, status: 'missing', title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
    { id: 4, status: 'missing', title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
    { id: 5, status: 'attempted', title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
    { id: 6, status: 'attempted', title: 'Submit Dissertation', student: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025' },
  ];

  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <FilterButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default TaskContainer
