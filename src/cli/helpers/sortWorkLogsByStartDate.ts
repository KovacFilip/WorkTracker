import type { WorkLog } from "@prisma/client";
import type { WorkLogEntityComplex } from "../../models/task/entities/workLog.js";

export function sortWorkLogsByStartDateMutable(
    logs: WorkLog[] | WorkLogEntityComplex[],
): void {
    logs.sort((a, b) => a.start.getTime() - b.start.getTime());
}
