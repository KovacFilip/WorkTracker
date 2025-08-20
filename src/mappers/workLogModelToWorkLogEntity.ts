import type { WorkLog } from "@prisma/client";
import type {
    WorkLogEntity,
    WorkLogEntityComplex,
} from "../models/task/entities/workLog.js";

export const mapToEntity = (workLog: WorkLog): WorkLogEntity => {
    return {
        id: workLog.id,
        start: workLog.start,
        end: workLog.end ? workLog.end : undefined,
        description: workLog.description ?? undefined,
    };
};

export const mapToComplexEntity = (workLog: WorkLog): WorkLogEntityComplex => {
    const basicWorkLog = mapToEntity(workLog);

    return {
        ...basicWorkLog,
        minutes: workLog.end
            ? calculateMinutes(workLog.start, workLog.end)
            : undefined,
    };
};

function calculateMinutes(start: Date, end: Date): number {
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 0;

    return Math.floor(diffMs / (1000 * 60));
}
