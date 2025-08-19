import { buildCommand, type CommandContext } from "@stricli/core";
import { TaskService } from "../services/taskService.js";
import { getTaskStartingWithStringHelper } from "./helpers/getTaskStartingWithStringHelper.js";

const taskService = new TaskService();

export const startWorkCommand = buildCommand({
    func: startWork,
    parameters: {},
    docs: {
        brief: "Command for starting work on a task",
    },
});

async function startWork(this: CommandContext, _: {}) {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const startWorkTask = await taskService.startWork({ name: selectedTask });

    console.log("Starting work on task: ", startWorkTask);
}
