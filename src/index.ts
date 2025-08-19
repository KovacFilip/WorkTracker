import { buildApplication, buildRouteMap, run } from "@stricli/core";
import { createTaskCommand } from "./cli/createTask.js";
import { startWorkCommand } from "./cli/startWork.js";
import { stopWorkCommand } from "./cli/stopWork.js";

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
