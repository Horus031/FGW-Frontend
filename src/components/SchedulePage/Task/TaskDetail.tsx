import { useState } from 'react';
import type { TaskDetailProps } from '../../../models/task';
import CalendarIcon from '../../icons/CalendarIcon';
import BookIcon from '../../icons/Book';
import GroupIcon from '../../icons/Group';

const TaskDetail = ({ isOpen, onClose, task, StatusConfig }: TaskDetailProps) => {
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
                        {/* If there's no badge, title and close button share one line */}
                        {!StatusConfig.badge ? (
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                                <button
                                    onClick={onClose}
                                    aria-label="Close task detail"
                                    className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
                                >
                                    X
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* If there's a badge, show it above the title and keep X in the corner */}
                                <div className="relative mb-4">
                                    <div className="flex items-start gap-3">
                                        <span
                                            className={`${StatusConfig.badgeColor} text-sm font-medium px-2.5 py-1 rounded`}
                                        >
                                            {StatusConfig.badge}
                                        </span>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        aria-label="Close task detail"
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 z-10 font-bold "
                                    >
                                        X
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                            </>
                        )}
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <BookIcon className="font-semibold" />
                                    <span className="text-sm text-black font-medium">Module</span>
                                </div>
                                <a href="#" className="text-blue-600 hover:underline font-medium">
                                    {task.course}
                                </a>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <GroupIcon className="text-gray-600" />
                                    <span className="text-sm text-black font-medium">Class</span>
                                </div>
                                <a href="#" className="text-blue-600 hover:underline font-medium">
                                    {task.studentgroup}
                                </a>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <CalendarIcon className="font-semibold" />
                                    <span className="text-sm text-black font-medium">Deadline</span>
                                </div>
                                <p className="text-gray-weak font-medium">{task.dueDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center py-4 border-y border-gray-200 mb-6 ">
                            <span className="text-gray-900 font-medium pr-5">Remind me</span>
                            <button onClick={() => setRemindMe(!remindMe)} className={`cursor-pointer relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${remindMe ? 'bg-primary' : 'bg-gray-300'}`}>
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