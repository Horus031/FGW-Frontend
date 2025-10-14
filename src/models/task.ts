export interface Task {
    id: number;
    status: 'new' | 'missing' | 'attempted' | null;
    title: string;
    studentgroup: string;
    course: string;
    dueDate: string;
    requirements: string[];
    description?: string;
}


export interface StatusConfig {
  badge: string | null;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
}

export interface TaskDetailProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    StatusConfig: StatusConfig;
}
