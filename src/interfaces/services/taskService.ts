import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskUniqueIdentifier,
} from "../../models/task/entities/task.js";

export interface ITaskService {
    addTask(createTaskEntity: CreateTaskEntity): Promise<TaskEntity>;
    getTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    getAllTasksStartingWith(partialName: string): Promise<TaskSimpleEntity[]>;
    describeTask(
        taskIdentifier: TaskUniqueIdentifier,
        description: string,
    ): Promise<TaskEntity>;
    startWork(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    stopWork(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    addNoteToTask(
        taskIdentifier: TaskUniqueIdentifier,
        note: string,
    ): Promise<TaskEntity>;
}
