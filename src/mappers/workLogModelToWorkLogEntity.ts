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
        hours: workLog.end
            ? calculateHours(workLog.start, workLog.end)
            : undefined,
    };
};

function calculateHours(start: Date, end: Date): number {
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 0;

    const diffMinutes = diffMs / (1000 * 60);

    // round to nearest 15 minutes (quarter hour)
    const quarters = Math.ceil(diffMinutes / 15);
    return quarters * 0.25; // each quarter is 0.25h
}
