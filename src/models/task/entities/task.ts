import type { WorkLogBase, WorkLogEntityComplex } from "./workLog.js";

export type TaskEntityBase = {
    id: TaskId;
    name: string;
    description?: string;
};

export type TaskEntity = {
    id: TaskId;
    name: string;
    description?: string;
    workLogs: WorkLogBase[];
    notes: string[];
};

export type TaskEntityWithComplexWorkLogs = TaskEntityBase & {
    workLogs: WorkLogEntityComplex[];
    notes: string[];
};

export type TaskSimpleEntity = {
    id: TaskId;
    name: string;
};

export type TaskSimpleEntityWithDescription = TaskSimpleEntity & {
    description?: string;
};

export type TaskUniqueIdentifier = { name: string } | { id: TaskId };

export type CreateTaskEntity = {
    name: string;
    description?: string;
};

export type UpdateTaskEntity = {
    name?: string;
    description?: string;
};

export type TaskId = string;
