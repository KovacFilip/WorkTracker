import type { Note, Task, WorkLog } from "@prisma/client";
import type {
    TaskEntity,
    TaskEntityWithComplexWorkLogs,
} from "../models/task/entities/task.js";
import { mapToComplexEntity } from "./workLogModelToWorkLogEntity.js";

export const mapToEntity = (
    task: Task & { workLogs: WorkLog[]; notes: Note[] },
): TaskEntity => {
    return {
        id: task.id,
        name: task.name,
        description: task.description ?? undefined,
        workLogs: task.workLogs.map((wl) => ({
            start: wl.start,
            end: wl.end ? wl.end : undefined,
            description: wl.description ?? undefined,
        })),
        notes: task.notes.map((n) => n.text),
    };
};

export const mapTaskToComplexTaskEntity = (
    task: Task & { workLogs: WorkLog[]; notes: Note[] },
): TaskEntityWithComplexWorkLogs => {
    const workLogs = task.workLogs.map(mapToComplexEntity);

    return {
        id: task.id,
        name: task.name,
        description: task.description ?? undefined,
        notes: task.notes.map((note) => note.text),
        workLogs,
    };
};
