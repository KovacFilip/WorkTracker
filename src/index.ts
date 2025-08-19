import { buildApplication, buildRouteMap, run } from "@stricli/core";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { createTaskCommand } from "./cli/createTask.js";
import { startWorkCommand } from "./cli/startWork.js";
import { stopWorkCommand } from "./cli/stopWork.js";

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const root = buildRouteMap({
    routes: {
        start: startWorkCommand,
        stop: stopWorkCommand,
        create: createTaskCommand,
    },
    docs: {
        brief: "All available commands",
    },
});

const app = buildApplication(root, {
    name: "WorkTracker",
});

run(app, process.argv.slice(2), { process });
