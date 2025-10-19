import Pagination from "../../shared/Pagination"
import TaskCard from "./TaskCardContainer";
import type { Task } from "../../../models/task";

const TaskContainer = () => {

  const tasks: Task[] = [
    { id: 1, status: 'new', title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
    { id: 2, status: "default", title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
    { id: 3, status: 'missing', title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
    { id: 4, status: 'missing', title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
    { id: 5, status: 'attempted', title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
    { id: 6, status: 'attempted', title: 'Submit Dissertation', studentgroup: 'SonND24', course: 'DESI1240.2 - Design Research Project', dueDate: '17 Mar 2025', requirements: ['Cover page', 'Abstract', 'Research findings', 'References'], description: 'Complete and submit the final dissertation document, ensuring all sections are thoroughly researched and well-written. Adhere to the formatting guidelines provided by the university and include all necessary citations and references.' },
  ];

  return (
    <div className="py-4">
      <div className="max-w-8xl">
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
