import { PrismaClient } from "@prisma/client";
import type { ITaskRepository } from "../interfaces/repositories/taskRepository.js";
import { mapToEntity } from "../mappers/taskModelToTaskEntity.js";
import type {
    CreateTaskEntity,
    TaskEntity,
    TaskSimpleEntity,
    TaskUniqueIdentifier,
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

    async getTask(taskIdentifier: TaskUniqueIdentifier): Promise<TaskEntity> {
        const task = await prisma.task.findUnique({
            where: taskIdentifier,
            include: { workLogs: true, notes: true },
        });

        if (!task) throw new Error(`Task not found`);
        return mapToEntity(task);
    }

    async getAllTasksStartingWith(
        partialName: string,
    ): Promise<TaskSimpleEntity[]> {
        const tasks = await prisma.task.findMany({
            where: {
                name: {
                    startsWith: partialName,
                },
            },
        });

        return tasks.map((task) => {
            return {
                id: task.id,
                name: task.name,
            };
        });
    }

    async getAllTasksWithActiveWork(
        partialName: string,
    ): Promise<TaskSimpleEntity[]> {
        const workLogs = await prisma.workLog.findMany({
            where: {
                end: null,
                task: {
                    name: {
                        startsWith: partialName,
                    },
                },
            },
            include: { task: true },
        });

        return workLogs.map((workLog) => {
            return {
                id: workLog.task.id,
                name: workLog.task.name,
            };
        });
    }

    async describeTask(
        taskIdentifier: TaskUniqueIdentifier,
        description: string,
    ): Promise<TaskEntity> {
        return await prisma.$transaction(async (tx) => {
            const task = await tx.task.findFirst({
                where: taskIdentifier,
            });

            if (!task) throw new Error(`Task not found`);

            const updatedTask = await tx.task.update({
                where: taskIdentifier,
                data: {
                    description: description,
                },
                include: { workLogs: true, notes: true },
            });

            return mapToEntity(updatedTask);
        });
    }

    async startWorkOnTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<TaskEntity> {
        return await prisma.$transaction(async (tx) => {
            // First check, if there is any active workLog on the task
            const activeLog = await tx.workLog.findFirst({
                where: {
                    task: taskIdentifier,
                    end: null,
                },
            });

            if (activeLog)
                throw new Error(`There is already open worklog on this task"`);

            await tx.workLog.create({
                data: {
                    start: new Date(),
                    task: { connect: taskIdentifier },
                },
            });

            const task = await tx.task.findUnique({
                where: taskIdentifier,
                include: { notes: true, workLogs: true },
            });

            if (!task) throw new Error(`Task not found`);

            return mapToEntity(task);
        });
    }

    async stopWorkOnTask(
        taskIdentifier: TaskUniqueIdentifier,
        description?: string,
    ): Promise<TaskEntity> {
        return await prisma.$transaction(async (tx) => {
            const lastLog = await tx.workLog.findFirst({
                where: { task: taskIdentifier, end: null },
                orderBy: { start: "desc" },
            });

            if (!lastLog) throw new Error(`No active work log for the task`);

            await tx.workLog.update({
                where: { id: lastLog.id },
                data: { end: new Date(), description: description },
            });

            const task = await tx.task.findUnique({
                where: taskIdentifier,
                include: { notes: true, workLogs: true },
            });

            if (!task) throw new Error(`Task not found`);

            return mapToEntity(task);
        });
    }

    async addNoteOnTask(
        taskIdentifier: TaskUniqueIdentifier,
        note: string,
    ): Promise<TaskEntity> {
        await prisma.note.create({
            data: {
                text: note,
                task: { connect: taskIdentifier },
            },
        });

        return this.getTask(taskIdentifier);
    }

    async deleteTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<TaskEntity> {
        const deletedTask = await prisma.task.delete({
            where: taskIdentifier,
            include: { workLogs: true, notes: true },
        });

        return mapToEntity(deletedTask);
    }
}
