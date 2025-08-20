import { select } from "@inquirer/prompts";
import { buildCommand, type CommandContext } from "@stricli/core";
import { TaskService } from "../../services/taskService.js";
import { WorkLogService } from "../../services/workLogService.js";
import { createTask } from "./commands/createTask.js";
import { deleteTask } from "./commands/deleteTask.js";
import { editTask } from "./commands/editTask.js";
import { viewAllTasks } from "./commands/viewAllTasks.js";
import { viewLogsPerTask } from "./commands/viewLogsPerTask.js";

const CREATE_TASK = "Create a new task";
const EDIT_TASK = "Edit task";
const DELETE_TASK = "Delete task";
const VIEW_LOGS_ON_TASK = "View all logs for task";
const VIEW_ALL_TASKS = "View all tasks";

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
        choices: [
            CREATE_TASK,
            EDIT_TASK,
            DELETE_TASK,
            VIEW_ALL_TASKS,
            VIEW_LOGS_ON_TASK,
        ],
        message: "Select the operation:",
    });

    switch (selectedCommand) {
        case CREATE_TASK:
            await createTask(taskService);
            break;
        case EDIT_TASK:
            await editTask(taskService);
            break;
        case DELETE_TASK:
            await deleteTask(taskService);
            break;
        case VIEW_LOGS_ON_TASK:
            await viewLogsPerTask(taskService, workLogService);
            break;
        case VIEW_ALL_TASKS:
            viewAllTasks(taskService);
            break;
        default:
            break;
    }
}
