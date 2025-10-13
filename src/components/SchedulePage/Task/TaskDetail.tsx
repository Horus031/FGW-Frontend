import { useState } from 'react';
import type { Task } from './../../../models/task';

interface TaskDetailProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
}

const TaskDetail = ({ isOpen, onClose, task }: TaskDetailProps) => {
    const [remindMe, setRemindMe] = useState(false);

    if (!isOpen) return null;


    return (
        <>
            {/* Background overlay */}
            <div
                className="fixed inset-0 bg-black/70 z-40"
                onClick={onClose}
            />
            {/* Modal content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded border border-blue-200">
                                {task.status || 'New'}
                            </span>
                            <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600">X</button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-1 font-medium">Course</div>
                                <a href="#" className="text-blue-600 hover:underline font-medium">{task.course}</a>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1 font-medium">Class</div>
                                <a href="#" className="text-blue-600 hover:underline font-medium">{task.studentgroup}</a>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1 font-medium">Deadline</div>
                                <p className="text-gray-900 font-medium">{task.dueDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-6 ">
                            <span className="text-gray-900 font-medium">Remind me</span>
                            <button onClick={() => setRemindMe(!remindMe)} className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${remindMe ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${remindMe ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{task.description}</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                            <ul className="space-y-2">
                                {task.requirements.map((req: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-600">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            Submit on Moodle
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskDetail