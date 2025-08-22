import { select } from "@inquirer/prompts";
import { buildCommand } from "@stricli/core";
import { TaskService } from "../../services/taskService.js";
import { WorkLogService } from "../../services/workLogService.js";
import { addCompleteWorkLog } from "./commands/addCompleteWorkLog.js";
import { editLog } from "./commands/editLog.js";
import { startWork } from "./commands/startWork.js";
import { stopWork } from "./commands/stopWork.js";

const START_WORK = "Start working on a task";
const STOP_WORK = "Stop working on a task";
const ADD_COMPLETE_WORK_LOG = "Add a work log to a task";
const EDIT_LOG = "Edit a work log";

const taskService = new TaskService();
const workLogService = new WorkLogService();

export const logCommand = buildCommand({
    func: logCommands,
    parameters: {},
    docs: {
        brief: "Work log related commands",
    },
});

async function logCommands() {
    const selectedCommand = await select({
        choices: [START_WORK, STOP_WORK, ADD_COMPLETE_WORK_LOG, EDIT_LOG],
        message: "Select the operation",
    });

    switch (selectedCommand) {
        case START_WORK:
            startWork(taskService);
            break;
        case STOP_WORK:
            stopWork(taskService);
            break;
        case ADD_COMPLETE_WORK_LOG:
            addCompleteWorkLog(taskService, workLogService);
            break;
        case EDIT_LOG:
            editLog(taskService, workLogService);
            break;
        default:
            break;
    }
}
