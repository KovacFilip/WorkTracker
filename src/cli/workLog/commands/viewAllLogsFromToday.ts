import { confirm } from "@inquirer/prompts";
import chalk from "chalk";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTimeInReadableFormat } from "../../helpers/getTimeInReadableFormat.js";

export async function viewAllLogsFromToday(workLogService: IWorkLogService) {
    const tasks = await workLogService.getWorkLogsForDate(new Date());

    const logs: {
        Task: string;
        Start: Date;
        End?: Date;
        WorkDescription?: string;
        Time?: string;
    }[] = [];

    let totalMinutes = 0;

    tasks.map((task) => {
        task.workLogs.map((log) => {
            logs.push({
                Task: task.name,
                Start: log.start,
                End: log.end,
                WorkDescription: log.description ? log.description : "-",
                Time: log.minutes ? getTimeInReadableFormat(log.minutes) : "-",
            });

            totalMinutes += log.minutes ? log.minutes : 0;
        });
    });

    const orderByStartDate = await confirm({
        message: "Do you wish to sort logs by start date?",
    });

    if (orderByStartDate) {
        logs.sort((a, b) => a.Start.getTime() - b.Start.getTime());
    }

    console.table(
        logs.map((log) => {
            return {
                ...log,
                Start: log.Start.toLocaleString(),
                End: log.End?.toLocaleString(),
            };
        }),
    );

    console.log(
        chalk.bold(
            `Total working time today: ${chalk.green(getTimeInReadableFormat(totalMinutes))}`,
        ),
    );
}
