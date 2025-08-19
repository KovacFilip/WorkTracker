import type { ITaskService } from "../interfaces/services/taskService.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskUniqueIdentifier,
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

    async getAllTasksStartingWith(
        partialName: string,
    ): Promise<TaskSimpleEntity[]> {
        return await taskRepository.getAllTasksStartingWith(partialName);
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
}
