import chalk from "chalk";
import CliTable3, { type HorizontalTableRow } from "cli-table3";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTimeInReadableFormat } from "../../helpers/getTimeInReadableFormat.js";

export async function dailyReport(workLogService: IWorkLogService) {
    const lastWorkingDayDate = getLastWorkingDay();
    const tasks = await workLogService.getWorkLogsForDate(lastWorkingDayDate);

    const terminalWidth = process.stdout.columns ?? 80; // default fallback
    const colWidths = [20, 30, terminalWidth - 20 - 30 - 15 - 10, 8];

    const table = new CliTable3({
        head: [
            "Task name",
            "Task description",
            "Work description",
            "Total time",
        ],
        colWidths,
        wordWrap: true,
    });

    let totalMinutes = 0;

    tasks.forEach((task) => {
        const workLogsFormatted = task.workLogs
            .map(
                (wl, i) =>
                    `• ${wl.description ?? "No description"} (${getTimeInReadableFormat(wl.minutes ?? 0)})`,
            )
            .join("\n"); // each log on a new line

        const tableRow: HorizontalTableRow = [
            task.name,
            task.description,
            workLogsFormatted,
            getTimeInReadableFormat(
                task.workLogs.reduce(
                    (prev, current) => prev + (current.minutes ?? 0),
                    0,
                ),
            ),
        ];

        task.workLogs.forEach((wl) => (totalMinutes += wl.minutes ?? 0));

        table.push(tableRow);
    });

    console.log(table.toString());
    console.log(
        chalk.bold(
            `Total working time on ${lastWorkingDayDate.toDateString()}: ${chalk.green(getTimeInReadableFormat(totalMinutes))}`,
        ),
    );
}

export function getLastWorkingDay(): Date {
    const result = new Date();
    let day = result.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Step back one day
    result.setDate(result.getDate() - 1);
    day = result.getDay();

    // If it's weekend, move back until it's Friday
    if (day === 0) {
        // Sunday → Friday
        result.setDate(result.getDate() - 2);
    } else if (day === 6) {
        // Saturday → Friday
        result.setDate(result.getDate() - 1);
    }

    return result;
}
