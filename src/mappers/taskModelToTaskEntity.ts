import type { Note, Task, WorkLog } from "@prisma/client";
import type { TaskEntity } from "../models/task/entities/task.js";

export const mapToEntity = (
    task: Task & { workLogs: WorkLog[]; notes: Note[] },
): TaskEntity => {
    return {
        id: task.id,
        name: task.name,
        description: task.description ?? undefined,
        workLogs: task.workLogs.map((wl) => ({
            start: wl.start.toISOString(),
            end: wl.end ? wl.end.toISOString() : undefined,
            description: wl.description ?? undefined,
        })),
        notes: task.notes.map((n) => n.text),
    };
};
