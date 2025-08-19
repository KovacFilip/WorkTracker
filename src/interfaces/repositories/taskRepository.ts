import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskUniqueIdentifier,
} from "../../models/task/entities/task.js";

export interface ITaskRepository {
    createTask(createTask: CreateTaskEntity): Promise<TaskEntity>;
    getTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    getAllTasksStartingWith(partialName: string): Promise<TaskSimpleEntity[]>;
    getAllTasksWithActiveWork(partialName: string): Promise<TaskSimpleEntity[]>;
    describeTask(
        taskIdentifier: TaskUniqueIdentifier,
        description: string,
    ): Promise<TaskEntity>;
    startWorkOnTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    stopWorkOnTask(
        taskIdentifier: TaskUniqueIdentifier,
        description?: string,
    ): Promise<TaskEntity>;
    addNoteOnTask(
        taskIdentifier: TaskUniqueIdentifier,
        note: string,
    ): Promise<TaskEntity>;
    deleteTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
}
