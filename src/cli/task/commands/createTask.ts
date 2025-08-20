import { input } from "@inquirer/prompts";
import type { ITaskService } from "../../../interfaces/services/taskService.js";
import { optionallyAddDescription } from "../../helpers/optionallyAddDescription.js";

export async function createTask(taskService: ITaskService) {
    const taskName = await input({
        message: "Task name: ",
    });

    const description = await optionallyAddDescription();

    const newTask = await taskService.addTask({
        name: taskName,
        description: description,
    });

    console.log("Created task: ", newTask);
}
