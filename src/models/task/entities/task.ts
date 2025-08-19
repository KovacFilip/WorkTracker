import type { WorkLog } from "./workLog.js";

export type TaskEntity = {
    id: TaskId;
    name: string;
    description?: string;
    workLogs: WorkLog[];
    notes: string[];
};

export type CreateTaskEntity = {
    name: string;
    description?: string;
};

export type TaskId = string;
