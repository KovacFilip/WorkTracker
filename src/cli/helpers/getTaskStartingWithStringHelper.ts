import inquirer from "inquirer";
import type { ITaskService } from "../../interfaces/services/taskService.js";

export const getTasksContainingStringHelper = async (
    taskService: ITaskService,
) => {
    return await inquirer.prompt<{ task: string }>([
        {
            type: "autocomplete",
            name: "task",
            message: "Pick a task",
            source: async (answersSoFar: string[], input: string) => {
                const tasks = await taskService.getAllTasksContaining(
                    input ?? "",
                );

                return tasks.map((task) => task.name);
            },
        },
    ]);
};
