import { select } from "@inquirer/prompts";
import { buildCommand } from "@stricli/core";
import chalk from "chalk";
import inquirer from "inquirer";
import { TaskService } from "../services/taskService.js";
import { WorkLogService } from "../services/workLogService.js";
import { getDateInput } from "./helpers/getDateInput.js";
import { getTaskStartingWithStringHelper } from "./helpers/getTaskStartingWithStringHelper.js";
import { optionallyAddDescription } from "./helpers/optionallyAddDescription.js";

const START_WORK = "Start working on a task";
const STOP_WORK = "Stop working on a task";
const ADD_COMPLETE_WORK_LOG = "Add a work log to a task";
const VIEW_ALL_LOGS_FROM_TODAY = "View all today's logs";

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
        choices: [
            START_WORK,
            STOP_WORK,
            ADD_COMPLETE_WORK_LOG,
            VIEW_ALL_LOGS_FROM_TODAY,
        ],
        message: "Select the operation",
    });

    switch (selectedCommand) {
        case START_WORK:
            startWork();
            break;
        case STOP_WORK:
            stopWork();
            break;
        case ADD_COMPLETE_WORK_LOG:
            addCompleteWorkLog();
            break;
        case VIEW_ALL_LOGS_FROM_TODAY:
            viewAllLogsFromToday();
            break;
        default:
            break;
    }
}

async function startWork() {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    await taskService.startWork({ name: selectedTask });

    console.log("Starting work on task: ", selectedTask);
}

async function stopWork() {
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

    const description = await optionallyAddDescription();

    await taskService.stopWork({ name: selectedTask }, description);

    console.log(`Stopped work on task: ${selectedTask}`);
}

async function addCompleteWorkLog() {
    const task = await getTaskStartingWithStringHelper(taskService);

    const selectedTask = task.task;

    const startTime = new Date(await getDateInput("Start time "));
    const endTime = new Date(await getDateInput("End time "));

    const desription = await optionallyAddDescription();

    await workLogService.createWorkLog(
        { name: selectedTask },
        { start: startTime, end: endTime, description: desription },
    );

    console.log("You added a work log to task: ", selectedTask);
}

async function viewAllLogsFromToday() {
    const tasks = await workLogService.getWorkLogsForDate(new Date());

    const logs: {
        Task: string;
        Start: string;
        End?: string;
        WorkDescription?: string;
        Hours?: number;
    }[] = [];

    let totalHours = 0;

    tasks.map((task) => {
        task.workLogs.map((log) => {
            logs.push({
                Task: task.name,
                Start: log.start.toLocaleString(),
                End: log.end ? log.end.toLocaleString() : "-",
                WorkDescription: log.description ? log.description : "-",
                Hours: log.hours ? log.hours : 0,
            });

            totalHours += log.hours ? log.hours : 0;
        });
    });

    console.table(logs);
    console.log(chalk.bold(`Total hours today: ${chalk.green(totalHours)}`));
}
