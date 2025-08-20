import chalk from "chalk";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getTimeInReadableFormat } from "../../helpers/getTimeInReadableFormat.js";

export async function viewAllLogsFromToday(workLogService: IWorkLogService) {
    const tasks = await workLogService.getWorkLogsForDate(new Date());

    const logs: {
        Task: string;
        Start: string;
        End?: string;
        WorkDescription?: string;
        Time?: string;
    }[] = [];

    let totalMinutes = 0;

    tasks.map((task) => {
        task.workLogs.map((log) => {
            logs.push({
                Task: task.name,
                Start: log.start.toLocaleString(),
                End: log.end ? log.end.toLocaleString() : "-",
                WorkDescription: log.description ? log.description : "-",
                Time: log.minutes ? getTimeInReadableFormat(log.minutes) : "-",
            });

            totalMinutes += log.minutes ? log.minutes : 0;
        });
    });

    console.table(logs);
    console.log(
        chalk.bold(
            `Total working time today: ${chalk.green(getTimeInReadableFormat(totalMinutes))}`,
        ),
    );
}
