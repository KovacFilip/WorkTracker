import type {
    TaskEntityWithComplexWorkLogs,
    TaskUniqueIdentifier,
} from "../../models/task/entities/task.js";
import type {
    CreateWorkLog,
    UpdateWorkLog,
    WorkLogEntity,
    WorkLogEntityComplex,
    WorkLogId,
} from "../../models/task/entities/workLog.js";

export interface IWorkLogRepository {
    createWorkLog(
        taskIdentifier: TaskUniqueIdentifier,
        workLog: CreateWorkLog,
    ): Promise<WorkLogEntity>;

    deleteWorkLog(workLogId: WorkLogId): Promise<WorkLogEntity>;

    editWorkLog(
        workLogId: WorkLogId,
        data: UpdateWorkLog,
    ): Promise<WorkLogEntity>;

    getWorkLogsForTask(
        taskIdentifier: TaskUniqueIdentifier,
    ): Promise<WorkLogEntityComplex[]>;

    getWorkLog(workLogId: WorkLogId): Promise<WorkLogEntityComplex>;

    getWorkLogsForDate(date: Date): Promise<TaskEntityWithComplexWorkLogs[]>;
}
