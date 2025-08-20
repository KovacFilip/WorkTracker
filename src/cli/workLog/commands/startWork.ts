import type { ITaskService } from "../../../interfaces/services/taskService.js";
import { getTaskStartingWithStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function startWork(taskService: ITaskService) {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    await taskService.startWork({ name: selectedTask });

    console.log("Starting work on task: ", selectedTask);
}
