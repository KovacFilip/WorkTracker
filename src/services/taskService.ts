import type { ITaskService } from "../interfaces/services/taskService.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../models/task/entities/task.js";
import { TaskRepository } from "../repositories/TaskRepository.js";

const taskRepository = new TaskRepository();

export class TaskService implements ITaskService {
    async addTask(createTaskEntity: CreateTaskEntity): Promise<TaskEntity> {
        return await taskRepository.createTask(createTaskEntity);
    }

    async getTask(taskId: TaskId): Promise<TaskEntity> {
        return await taskRepository.getTask(taskId);
    }

    async getTaskByName(taskName: string): Promise<TaskEntity> {
        return await taskRepository.getTaskByName(taskName);
    }

    async describeTask(
        taskId: TaskId,
        description: string,
    ): Promise<TaskEntity> {
        return await taskRepository.describeTask(taskId, description);
    }

    async startWork(taskId: TaskId): Promise<TaskEntity> {
        return await taskRepository.startWorkOnTask(taskId);
    }

    async stopWork(taskId: TaskId, description?: string): Promise<TaskEntity> {
        return await taskRepository.stopWorkOnTask(taskId, description);
    }

    async addNoteToTask(taskId: TaskId, note: string): Promise<TaskEntity> {
        return await taskRepository.addNoteOnTask(taskId, note);
    }
}
