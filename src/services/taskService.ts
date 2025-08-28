import type { ITaskService } from "../interfaces/services/taskService.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskSimpleEntityWithDescription,
    TaskUniqueIdentifier,
    UpdateTaskEntity,
} from "../models/task/entities/task.js";
import { TaskRepository } from "../repositories/TaskRepository.js";

const taskRepository = new TaskRepository();

export class TaskService implements ITaskService {
    async addTask(createTaskEntity: CreateTaskEntity): Promise<TaskEntity> {
        return await taskRepository.createTask(createTaskEntity);
    }

    async getTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity> {
        return await taskRepository.getTask(taskIdentifier);
    }

    async getAllTasksContaining(
        partialName: string,
    ): Promise<TaskSimpleEntity[]> {
        return await taskRepository.getAllTasksContaining(partialName);
    }

    async getAllTasksWithActiveWork(
        partialName: string,
    ): Promise<TaskSimpleEntity[]> {
        return await taskRepository.getAllTasksWithActiveWork(partialName);
    }

    async describeTask(
        taskIdentifier: TaskUniqueIdentifier,
        description: string,
    ): Promise<TaskEntity> {
        return await taskRepository.describeTask(taskIdentifier, description);
    }

    async startWork(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity> {
        return await taskRepository.startWorkOnTask(taskIdentifier);
    }

    async stopWork(
        taskIdentifier: TaskUniqueIdentifier,
        description?: string,
    ): Promise<TaskEntity> {
        return await taskRepository.stopWorkOnTask(taskIdentifier, description);
    }

    async addNoteToTask(
        taskIdentifier: TaskUniqueIdentifier,
        note: string,
    ): Promise<TaskEntity> {
        return await taskRepository.addNoteOnTask(taskIdentifier, note);
    }

    async deleteTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<TaskEntity> {
        return await taskRepository.deleteTask(taskIdentifier);
    }

    async editTask(
        taskIdentifier: TaskUniqueIdentifier,
        data: UpdateTaskEntity,
    ): Promise<TaskSimpleEntityWithDescription> {
        return await taskRepository.updateTask(taskIdentifier, data);
    }
}
