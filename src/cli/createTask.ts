import { confirm, input } from "@inquirer/prompts";
import { buildCommand, type CommandContext } from "@stricli/core";
import { TaskService } from "../services/taskService.js";

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

    const addDescription = await confirm({
        message: "Do you wish to add description to task?",
        default: true,
    });

    let description;

    if (addDescription) {
        description = await input({
            message: "Task desription: ",
        });
    }

    const newTask = await taskService.addTask({
        name: taskName,
        description: description,
    });

    console.log("Created task: ", newTask);
}
