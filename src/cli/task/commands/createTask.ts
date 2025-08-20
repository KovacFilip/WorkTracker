import { input } from "@inquirer/prompts";
import type { ITaskService } from "../../../interfaces/services/taskService.js";
import { getOptionalStringValue } from "../../helpers/getOptionalStringValue.js";

export async function createTask(taskService: ITaskService) {
    const taskName = await input({
        message: "Task name: ",
    });

    const description = await getOptionalStringValue("Description");

    const newTask = await taskService.addTask({
        name: taskName,
        description: description,
    });

    console.log("Created task: ", newTask);
}
