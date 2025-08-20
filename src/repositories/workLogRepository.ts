import { prisma } from "../infrastructure/prisma.js";
import type { IWorkLogRepository } from "../interfaces/repositories/workLogRepository.js";
import { mapTaskToComplexTaskEntity } from "../mappers/taskModelToTaskEntity.js";
import {
    mapToComplexEntity,
    mapToEntity,
} from "../mappers/workLogModelToWorkLogEntity.js";
import type {
    TaskEntityWithComplexWorkLogs,
    TaskUniqueIdentifier,
} from "../models/task/entities/task.js";
import type {
    CreateWorkLog,
    UpdateWorkLog,
    WorkLogEntity,
    WorkLogEntityComplex,
    WorkLogId,
} from "../models/task/entities/workLog.js";

export class WorkLogRepository implements IWorkLogRepository {
    async createWorkLog(
        taskIdentifier: TaskUniqueIdentifier,
        workLog: CreateWorkLog,
    ): Promise<WorkLogEntity> {
        const createdLog = await prisma.workLog.create({
            data: {
                start: workLog.start,
                end: workLog.end,
                description: workLog.description,
                task: {
                    connect: taskIdentifier,
                },
            },
        });

        return mapToEntity(createdLog);
    }

    async deleteWorkLog(workLogId: WorkLogId): Promise<WorkLogEntity> {
        const deletedLog = await prisma.workLog.delete({
            where: {
                id: workLogId,
            },
        });

        return mapToEntity(deletedLog);
    }

    async editWorkLog(
        workLogId: WorkLogId,
        data: UpdateWorkLog,
    ): Promise<WorkLogEntity> {
        const updatedWorkLog = await prisma.workLog.update({
            where: {
                id: workLogId,
            },
            data,
        });

        return mapToEntity(updatedWorkLog);
    }

    async getWorkLogsForTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<WorkLogEntityComplex[]> {
        const workLogs = await prisma.workLog.findMany({
            where: {
                task: taskIdentifier,
            },
        });

        return workLogs.map((log) => {
            return mapToComplexEntity(log);
        });
    }

    async getWorkLog(workLogId: WorkLogId): Promise<WorkLogEntityComplex> {
        const workLog = await prisma.workLog.findUnique({
            where: {
                id: workLogId,
            },
        });

        if (!workLog) throw new Error(`Work log not found`);

        return mapToComplexEntity(workLog);
    }

    async getWorkLogsForDate(
        date: Date,
    ): Promise<TaskEntityWithComplexWorkLogs[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const tasks = await prisma.task.findMany({
            where: {},
            include: {
                workLogs: {
                    where: {
                        start: {
                            gte: startOfDay,
                            lte: endOfDay,
                        },
                    },
                    orderBy: {
                        start: "asc",
                    },
                },
                notes: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return tasks.map(mapTaskToComplexTaskEntity);
    }
}
