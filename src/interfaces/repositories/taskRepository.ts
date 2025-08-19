import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../../models/task/entities/task.js";

export interface ITaskRepository {
    createTask(createTask: CreateTaskEntity): Promise<TaskEntity>;
    getTask(taskId: TaskId): Promise<TaskEntity>;
    getTaskByName(name: string): Promise<TaskEntity>;
    describeTask(taskId: TaskId): Promise<TaskEntity>;
    startWorkOnTask(taskId: TaskId): Promise<TaskEntity>;
    stopWorkOnTask(taskId: TaskId): Promise<TaskEntity>;
    addNoteOnTask(taskId: TaskId, note: string): Promise<TaskEntity>;
}
