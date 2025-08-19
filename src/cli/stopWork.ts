import { confirm, input } from "@inquirer/prompts";
import { buildCommand, type CommandContext } from "@stricli/core";
import inquirer from "inquirer";
import { TaskService } from "../services/taskService.js";

const taskService = new TaskService();

export const stopWorkCommand = buildCommand({
    func: stopWork,
    parameters: {},
    docs: {
        brief: "Command for stopping work",
    },
});

async function stopWork(this: CommandContext, _: {}) {
    const task = await inquirer.prompt<{ task: string }>([
        {
            type: "autocomplete",
            name: "task",
            message: "Pick a task to stop work on:",
            source: async (answersSoFar: string[], input: string) => {
                const tasks = await taskService.getAllTasksWithActiveWork(
                    input ?? "",
                );

                return tasks.map((task) => task.name);
            },
        },
    ]);

    const selectedTask = task.task;

    const addDescription = await confirm({
        message: "Do you wish to add description to work log?",
        default: true,
    });

    let description;

    if (addDescription) {
        description = await input({
            message: "Work log description: ",
        });
    }

    const stopWorkTask = await taskService.stopWork(
        { name: selectedTask },
        description,
    );

    console.log("Stopped working on task: ", stopWorkTask);
}
