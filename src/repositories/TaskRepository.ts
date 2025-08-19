import { PrismaClient } from "@prisma/client";
import type { ITaskRepository } from "../interfaces/repositories/taskRepository.js";
import { mapToEntity } from "../mappers/taskModelToTaskEntity.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskId,
} from "../models/task/entities/task.js";

const prisma = new PrismaClient();

export class TaskRepository implements ITaskRepository {
    async createTask(createTask: CreateTaskEntity): Promise<TaskEntity> {
        const task = await prisma.task.create({
            data: {
                name: createTask.name,
                description: createTask.description ?? null,
            },
            include: { workLogs: true, notes: true },
        });

        return mapToEntity(task);
    }

    async getTask(taskId: TaskId): Promise<TaskEntity> {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: { workLogs: true, notes: true },
        });

        if (!task) throw new Error(`Task with id ${taskId} not found`);
        return mapToEntity(task);
    }

    async getTaskByName(name: string): Promise<TaskEntity> {
        const task = await prisma.task.findUnique({
            where: { name },
            include: { workLogs: true, notes: true },
        });

        if (!task) throw new Error(`Task with name "${name}" not found`);
        return mapToEntity(task);
    }

    async describeTask(
        taskId: TaskId,
        description: string,
    ): Promise<TaskEntity> {
        return await prisma.$transaction(async (tx) => {
            const task = await tx.task.findFirst({
                where: {
                    id: taskId,
                },
            });

            if (!task) throw new Error(`Task with id "${taskId}" not found`);

            const updatedTask = await tx.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    description: description,
                },
                include: { workLogs: true, notes: true },
            });

            return mapToEntity(updatedTask);
        });
    }

    async startWorkOnTask(taskId: TaskId): Promise<TaskEntity> {
        return await prisma.$transaction(async (tx) => {
            // First check, if there is any active workLog on the task
            const activeLog = await tx.workLog.findFirst({
                where: {
                    taskId,
                    end: null,
                },
            });

            if (activeLog)
                throw new Error(
                    `There is already open worklog on task: "${taskId}"`,
                );

            await tx.workLog.create({
                data: {
                    start: new Date(),
                    task: { connect: { id: taskId } },
                },
            });

            return this.getTask(taskId);
        });
    }

    async stopWorkOnTask(
        taskId: TaskId,
        description?: string,
    ): Promise<TaskEntity> {
        const lastLog = await prisma.workLog.findFirst({
            where: { taskId, end: null },
            orderBy: { start: "desc" },
        });

        if (!lastLog) throw new Error(`No active work log for task ${taskId}`);

        await prisma.workLog.update({
            where: { id: lastLog.id },
            data: { end: new Date(), description: description },
        });

        return this.getTask(taskId);
    }

    async addNoteOnTask(taskId: TaskId, note: string): Promise<TaskEntity> {
        await prisma.note.create({
            data: {
                text: note,
                task: { connect: { id: taskId } },
            },
        });

        return this.getTask(taskId);
    }
}
