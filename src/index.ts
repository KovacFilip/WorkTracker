import { buildApplication, buildRouteMap, run } from "@stricli/core";
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import { taskCommand } from "./cli/task/index.js";
import { logCommand } from "./cli/workLog/index.js";

inquirer.registerPrompt("autocomplete", inquirerPrompt);

const root = buildRouteMap({
    routes: {
        task: taskCommand,
        log: logCommand,
    },
    docs: {
        brief: "All available commands",
    },
});

const app = buildApplication(root, {
    name: "WorkTracker",
});

run(app, process.argv.slice(2), { process });
