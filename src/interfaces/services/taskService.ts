import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../../models/task/entities/task.js";

export interface ITaskService {
    addTask(createTaskEntity: CreateTaskEntity): TaskEntity;

    getTask(taskId: TaskId): TaskEntity;

    getTaskByName(taskName: string): TaskEntity;

    describeTask(taskId: TaskId): TaskEntity;

    startWork(taskId: TaskId): boolean;

    stopWork(taskId: TaskId): TaskEntity;

    addNoteToTask(taskId: TaskId): TaskEntity;
}
