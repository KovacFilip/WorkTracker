import { buildCommand } from "@stricli/core";
import { TaskService } from "../services/taskService.js";
import { getDateInput } from "./helpers/getDateInput.js";
import { getTaskStartingWithStringHelper } from "./helpers/getTaskStartingWithStringHelper.js";
import { optionallyAddDescription } from "./helpers/optionallyAddDescription.js";

const taskService = new TaskService();

export const addCompleteWorkLogCommand = buildCommand({
    func: addWorkLog,
    parameters: {},
    docs: {
        brief: "Command for adding a complete work log on a task",
    },
});

async function addWorkLog() {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const startTime = await getDateInput("Start time ");
    const endTime = await getDateInput("End time ");

    const desription = await optionallyAddDescription();

    console.log("You added a work log to task: ", selectedTask);
    console.log(
        `The work log has startTime: ${startTime}, endTime: ${endTime}, description: ${desription} `,
    );
}
