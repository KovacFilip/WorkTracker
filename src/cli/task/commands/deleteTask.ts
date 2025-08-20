import type { ITaskService } from "../../../interfaces/services/taskService.js";
import { getTaskStartingWithStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function deleteTask(taskService: ITaskService) {
    const task = (await getTaskStartingWithStringHelper(taskService)).task;

    await taskService.deleteTask({ name: task });

    console.log(`Successfully deleted the task: ${task}`);
}
