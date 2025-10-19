export interface Task {
    id: number;
    status: 'new' | 'missing' | 'attempted' | "default";
    title: string;
    studentgroup: string;
    course: string;
    dueDate: string;
    requirements: string[];
    description?: string;
}


export interface StatusConfig {
  taskName?: string;
  taskColor?: string | null;
  badgeBorder?: string;
}

export interface TaskDetailProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    StatusConfig: StatusConfig;
}
