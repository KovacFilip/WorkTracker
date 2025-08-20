import inquirer from "inquirer";
import type { ITaskService } from "../../../interfaces/services/taskService.js";
import { getOptionalStringValue } from "../../helpers/getOptionalStringValue.js";

export async function stopWork(taskService: ITaskService) {
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

    const description = await getOptionalStringValue("Description");

    await taskService.stopWork({ name: selectedTask }, description);

    console.log(`Stopped work on task: ${selectedTask}`);
}
