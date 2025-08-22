import { select } from "@inquirer/prompts";
import { buildCommand } from "@stricli/core";
import { WorkLogService } from "../../services/workLogService.js";
import { dailyReport } from "./commands/dailyReport.js";

const DAILY = "Daily";

const workLogService = new WorkLogService();

export const reportCommand = buildCommand({
    func: reportCommands,
    parameters: {},
    docs: {
        brief: "Reports - daily/weekly/monthly/custom",
    },
});

async function reportCommands() {
    const selectedCommand = await select({
        choices: [DAILY],
        message: "Select the report",
    });

    switch (selectedCommand) {
        case DAILY:
            dailyReport(workLogService);
            break;

        default:
            break;
    }
}
