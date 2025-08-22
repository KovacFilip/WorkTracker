import chalk from "chalk";
import CliTable3, { type HorizontalTableRow } from "cli-table3";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTimeInReadableFormat } from "../../helpers/getTimeInReadableFormat.js";

export async function viewAllLogsFromSpecificDayHelper(
    workLogService: IWorkLogService,
    date: Date,
) {
    const tasks = await workLogService.getWorkLogsForDate(date);

    const terminalWidth = process.stdout.columns ?? 80; // default fallback
    const colWidths = [20, 30, terminalWidth - 20 - 30 - 8 - 10, 8];

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
            `Total working time on ${date.toDateString()}: ${chalk.green(getTimeInReadableFormat(totalMinutes))}`,
        ),
    );
}
