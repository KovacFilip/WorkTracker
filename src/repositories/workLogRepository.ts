import { PrismaClient } from "@prisma/client";
import type { IWorkLogRepository } from "../interfaces/repositories/workLogRepository.js";
import {
    mapToComplexEntity,
    mapToEntity,
} from "../mappers/workLogModelToWorkLogEntity.js";
import type { TaskUniqueIdentifier } from "../models/task/entities/task.js";
import type {
    CreateWorkLog,
    UpdateWorkLog,
    WorkLogEntity,
    WorkLogEntityComplex,
    WorkLogId,
} from "../models/task/entities/workLog.js";

const prisma = new PrismaClient();

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
}
