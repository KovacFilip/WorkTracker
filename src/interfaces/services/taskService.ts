import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskSimpleEntityWithDescription,
    TaskUniqueIdentifier,
    UpdateTaskEntity,
} from "../../models/task/entities/task.js";

export interface ITaskService {
    addTask(createTaskEntity: CreateTaskEntity): Promise<TaskEntity>;
    editTask(
        taskIdentifier: TaskUniqueIdentifier,
        data: UpdateTaskEntity,
    ): Promise<TaskSimpleEntityWithDescription>;
    getTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    getAllTasksContaining(partialName: string): Promise<TaskSimpleEntity[]>;
    getAllTasksWithActiveWork(partialName: string): Promise<TaskSimpleEntity[]>;
    describeTask(
        taskIdentifier: TaskUniqueIdentifier,
        description: string,
    ): Promise<TaskEntity>;
    startWork(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
    stopWork(
        taskIdentifier: TaskUniqueIdentifier,
        description?: string,
    ): Promise<TaskEntity>;
    addNoteToTask(
        taskIdentifier: TaskUniqueIdentifier,
        note: string,
    ): Promise<TaskEntity>;
    deleteTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity>;
}
