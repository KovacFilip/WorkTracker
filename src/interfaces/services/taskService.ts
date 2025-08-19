import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../../models/task/entities/task.js";

export interface ITaskService {
    addTask(createTaskEntity: CreateTaskEntity): Promise<TaskEntity>;
    getTask(taskId: TaskId): Promise<TaskEntity>;
    getTaskByName(taskName: string): Promise<TaskEntity>;
    describeTask(taskId: TaskId, description: string): Promise<TaskEntity>;
    startWork(taskId: TaskId): Promise<TaskEntity>;
    stopWork(taskId: TaskId): Promise<TaskEntity>;
    addNoteToTask(taskId: TaskId, note: string): Promise<TaskEntity>;
}
