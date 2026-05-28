import { TaskType, TaskStatus, TaskPriority } from '../trade-task.entity';
export declare class FilterTaskDto {
    taskType?: TaskType;
    status?: TaskStatus;
    priority?: TaskPriority;
    assignedTo?: string;
    page?: number;
    limit?: number;
}
