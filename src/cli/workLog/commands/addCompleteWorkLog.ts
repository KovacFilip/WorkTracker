import type { ITaskService } from "../../../interfaces/services/taskService.js";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getDateTimeInput } from "../../helpers/getDateInput.js";
import { getOptionalStringValue } from "../../helpers/getOptionalStringValue.js";
import { getTaskStartingWithStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function addCompleteWorkLog(
    taskService: ITaskService,
    workLogService: IWorkLogService,
) {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const startTime = new Date(await getDateTimeInput("Start time"));
    const endTime = new Date(await getDateTimeInput("End time"));

    const desription = await getOptionalStringValue("Description");

    await workLogService.createWorkLog(
        { name: selectedTask },
        { start: startTime, end: endTime, description: desription },
    );

    console.log("You added a work log to task: ", selectedTask);
}
