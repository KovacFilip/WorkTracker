import type { IWorkLogService } from "../interfaces/services/workLogService.js";
import type { TaskUniqueIdentifier } from "../models/task/entities/task.js";
import type {
    CreateWorkLog,
    UpdateWorkLog,
    WorkLogEntity,
    WorkLogEntityComplex,
    WorkLogId,
} from "../models/task/entities/workLog.js";
import { WorkLogRepository } from "../repositories/workLogRepository.js";

const workLogRepository = new WorkLogRepository();

export class WorkLogService implements IWorkLogService {
    async createWorkLog(
        taskIdentifier: TaskUniqueIdentifier,
        workLog: CreateWorkLog,
    ): Promise<WorkLogEntity> {
        return await workLogRepository.createWorkLog(taskIdentifier, workLog);
    }
    async deleteWorkLog(workLogId: WorkLogId): Promise<WorkLogEntity> {
        return await workLogRepository.deleteWorkLog(workLogId);
    }
    async editWorkLog(
        workLogId: WorkLogId,
        data: UpdateWorkLog,
    ): Promise<WorkLogEntity> {
        return await workLogRepository.editWorkLog(workLogId, data);
    }

    async getWorkLogsForTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<WorkLogEntityComplex[]> {
        return await workLogRepository.getWorkLogsForTask(taskIdentifier);
    }

    async getWorkLog(workLogId: WorkLogId): Promise<WorkLogEntityComplex> {
        return await workLogRepository.getWorkLog(workLogId);
    }
}
