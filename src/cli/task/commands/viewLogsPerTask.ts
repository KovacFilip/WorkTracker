import type { ITaskService } from "../../../interfaces/services/taskService.js";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTasksContainingStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";
import { getTimeInReadableFormat } from "../../helpers/getTimeInReadableFormat.js";

export async function viewLogsPerTask(
    taskService: ITaskService,
    workLogService: IWorkLogService,
) {
    const task = await getTasksContainingStringHelper(taskService);

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
            Time: log.minutes ? getTimeInReadableFormat(log.minutes) : "-",
        })),
    );
}
