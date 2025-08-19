import type { WorkLogBase, WorkLogEntityComplex } from "./workLog.js";

export type TaskEntity = {
    id: TaskId;
    name: string;
    description?: string;
    workLogs: WorkLogBase[];
    notes: string[];
};

export type TaskEntityWithComplexWorkLogs = TaskEntity & {
    workLogs: WorkLogEntityComplex[];
};

export type TaskSimpleEntity = {
    id: TaskId;
    name: string;
};

export type TaskUniqueIdentifier = { name: string } | { id: TaskId };

export type CreateTaskEntity = {
    name: string;
    description?: string;
};

export type TaskId = string;
