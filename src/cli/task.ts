import { input, select } from "@inquirer/prompts";
import { buildCommand, type CommandContext } from "@stricli/core";
import { TaskService } from "../services/taskService.js";
import { WorkLogService } from "../services/workLogService.js";
import { getTaskStartingWithStringHelper } from "./helpers/getTaskStartingWithStringHelper.js";
import { optionallyAddDescription } from "./helpers/optionallyAddDescription.js";

const CREATE_TASK = "Create a new task";
const VIEW_LOGS_ON_TASK = "View all logs for task";

const taskService = new TaskService();
const workLogService = new WorkLogService();

export const taskCommand = buildCommand({
    func: taskCommands,
    parameters: {},
    docs: {
        brief: "Task related commands",
    },
});

async function taskCommands(this: CommandContext, options: {}) {
    const selectedCommand = await select({
        choices: [CREATE_TASK, VIEW_LOGS_ON_TASK],
        message: "Select the operation:",
    });

    switch (selectedCommand) {
        case CREATE_TASK:
            await createTask();
            break;
        case VIEW_LOGS_ON_TASK:
            await viewLogsPerTask();
            break;
        default:
            break;
    }
}

async function createTask() {
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

async function viewLogsPerTask() {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const workLogs = await workLogService.getWorkLogsForTask({
        name: selectedTask,
    });

    console.log(`The work logs for task: ${selectedTask}`);
    console.table(
        workLogs.map((log) => ({
            Start: log.start.toLocaleString(),
            End: log.end ? log.end.toLocaleString() : "-",
            Description: log.description ?? "-",
            Hours: log.hours ?? "-",
        })),
    );
}
