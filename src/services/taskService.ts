import type { ITaskService } from "../interfaces/services/taskService.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../models/task/entities/task.js";

export class TaskService implements ITaskService {
    addTask(createTaskEntity: CreateTaskEntity): TaskEntity {
        throw new Error("Method not implemented.");
    }
    getTask(taskId: TaskId): TaskEntity {
        throw new Error("Method not implemented.");
    }
    getTaskByName(taskName: string): TaskEntity {
        throw new Error("Method not implemented.");
    }
    describeTask(taskId: TaskId): TaskEntity {
        throw new Error("Method not implemented.");
    }
    startWork(taskId: TaskId): boolean {
        throw new Error("Method not implemented.");
    }
    stopWork(taskId: TaskId): TaskEntity {
        throw new Error("Method not implemented.");
    }
    addNoteToTask(taskId: TaskId): TaskEntity {
        throw new Error("Method not implemented.");
    }
}
