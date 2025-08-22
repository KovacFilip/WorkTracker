import { select } from "@inquirer/prompts";
import { buildCommand } from "@stricli/core";
import { WorkLogService } from "../../services/workLogService.js";
import { dailyReport } from "./commands/dailyReport.js";
import { viewAllLogsFromSpecificDay } from "./commands/viewAllLogsFromSpecificDay.js";
import { viewAllLogsFromToday } from "./commands/viewAllLogsFromToday.js";

const DAILY = "Daily Meeting report";
const TODAY = "Today's report";
const CHOOSE_A_DAY = "Choose a date";

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
        choices: [TODAY, DAILY, CHOOSE_A_DAY],
        message: "Select the report",
    });

    switch (selectedCommand) {
        case TODAY:
            viewAllLogsFromToday(workLogService);
            break;
        case DAILY:
            dailyReport(workLogService);
            break;
        case CHOOSE_A_DAY:
            viewAllLogsFromSpecificDay(workLogService);
            break;
        default:
            break;
    }
}
