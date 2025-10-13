import { MoreVertical, User, BookOpen, ArrowRight } from 'lucide-react';
import TaskDetail from './TaskDetail';
import { useState } from 'react';
import type { Task } from '../../../models/task';
import type { StatusConfig } from '../../../models/task';


const TaskCard = (task: Task) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status, title, studentgroup, course, dueDate } = task;

  const getStatusConfig = (): StatusConfig => {
    switch (status) {
      case 'new':
        return {
          badge: 'New',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          badgeColor: 'bg-blue-100 text-blue-700'
        };
      case 'missing':
        return {
          badge: 'Missing',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          badgeColor: 'bg-red-100 text-red-700'
        };
      case 'attempted':
        return {
          badge: 'Attempted',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          badgeColor: 'bg-green-100 text-green-700'
        };
      default:
        return {
          badge: null,
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          badgeColor: ''
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 relative`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {config.badge && (
            <span className={`${config.badgeColor} text-sm font-medium px-2.5 py-1 rounded`}>
              {config.badge}
            </span>
          )}
          <h3 className="text-base font-semibold text-primary">{title}</h3>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-primary cursor-pointer p-1"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Student Info */}
      <div className="flex items-center gap-2 mb-2 text-sm text-[var(--color-gray-weak)]">
        <User size={16} />
        <span>{studentgroup}</span>
      </div>

      {/* Course Info */}
      <div className="flex items-center gap-2 mb-6 text-sm text-[var(--color-gray-weak)]">
        <BookOpen size={16} />
        <span>{course}</span>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 border-gray-200">
        <button
          className="cursor-pointer flex items-center gap-2 px-2 py-1 border-2 border-gray-900 rounded-lg text-base font-semibold bg-white text-primary whitespace-nowrap"
        >
          Submit on Moodle
          <ArrowRight size={16} />
        </button>
        <span className="text-sm text-[var(--color-gray-weak)]">Due to {dueDate}</span>
      </div>
      <TaskDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
      />
    </div>
  );
};
export default TaskCard 
