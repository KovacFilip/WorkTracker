import { input } from "@inquirer/prompts";
import { buildCommand, type CommandContext } from "@stricli/core";
import { TaskService } from "../services/taskService.js";
import { optionallyAddDescription } from "./helpers/optionallyAddDescription.js";

const taskService = new TaskService();

export const createTaskCommand = buildCommand({
    func: createTask,
    parameters: {},
    docs: {
        brief: "Command for adding a task to work on",
    },
});

async function createTask(this: CommandContext, _: {}) {
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
