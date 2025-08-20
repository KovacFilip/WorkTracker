import type { ITaskService } from "../../../interfaces/services/taskService.js";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTaskStartingWithStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function viewLogsPerTask(
    taskService: ITaskService,
    workLogService: IWorkLogService,
) {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const workLogs = await workLogService.getWorkLogsForTask({
        name: selectedTask,
    });

    console.log(`The work logs for task: ${selectedTask}`);
    console.table(
        workLogs.map((log) => ({
            Start: log.start.toLocaleString(),
            End: log.end ? log.end.toLocaleString() : "-",
            Description: log.description ?? "-",
            Hours: log.hours ?? "-",
        })),
    );
}
