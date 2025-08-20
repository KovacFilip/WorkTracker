import { select } from "@inquirer/prompts";
import type { ITaskService } from "../../../interfaces/services/taskService.js";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import type { UpdateWorkLog } from "../../../models/task/entities/workLog.js";
import { getOptionalDateValue } from "../../helpers/getOptionalDateValue.js";
import { getOptionalStringValue } from "../../helpers/getOptionalStringValue.js";
import { getTaskStartingWithStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function editLog(
    taskService: ITaskService,
    workLogService: IWorkLogService,
) {
    // First get task
    const task = (await getTaskStartingWithStringHelper(taskService)).task;

    // Select log on the selected task
    const taskLogs = await workLogService.getWorkLogsForTask({ name: task });
    const selectedLog = await select({
        message: "Select the log you want to update",
        choices: taskLogs.map((log) => ({
            name: `${log.id}: ${log.start.toLocaleString()} - ${log.end ? log.end.toLocaleString() : "-"}, ${log.description ?? "-"}`,
            value: log,
        })),
    });

    // Print current value
    console.log("The current values: ");
    console.table([
        {
            Start: selectedLog.start.toLocaleString(),
            End: selectedLog.end ? selectedLog.end.toLocaleString() : "-",
            Description: selectedLog.description ?? "-",
        },
    ]);

    // Update log
    const newData: UpdateWorkLog = {};

    const newStart = await getOptionalDateValue("Start");
    if (newStart) {
        newData.start = new Date(newStart);
    }

    const newEnd = await getOptionalDateValue("End");
    if (newEnd) {
        newData.end = new Date(newEnd);
    }

    const newDescription = await getOptionalStringValue("Description");
    if (newDescription) {
        newData.description = newDescription;
    }

    const updatedLog = await workLogService.editWorkLog(
        selectedLog.id,
        newData,
    );

    // Print updated value
    console.log(`Work Log successfully updated. The new values:`);
    console.table([
        {
            Start: updatedLog.start.toLocaleString(),
            End: updatedLog.end ? updatedLog.end.toLocaleString() : "-",
            Description: updatedLog.description ?? "-",
        },
    ]);
}
