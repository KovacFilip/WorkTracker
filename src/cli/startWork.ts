import { buildCommand, type CommandContext } from "@stricli/core";
import inquirer from "inquirer";
import { TaskService } from "../services/taskService.js";

const taskService = new TaskService();

export const startWorkCommand = buildCommand({
    func: startWork,
    parameters: {},
    docs: {
        brief: "Command for starting work on a task",
    },
});

async function startWork(this: CommandContext, _: {}) {
    const task = await inquirer.prompt<{ task: string }>([
        {
            type: "autocomplete",
            name: "task",
            message: "Pick a task:",
            source: async (answersSoFar: string[], input: string) => {
                const tasks = await taskService.getAllTasksStartingWith(
                    input ?? "",
                );

                return tasks.map((task) => task.name);
            },
        },
    ]);

    const selectedTask = task.task;

    const startWorkTask = await taskService.startWork({ name: selectedTask });

    console.log("Starting work on task: ", startWorkTask);
}
