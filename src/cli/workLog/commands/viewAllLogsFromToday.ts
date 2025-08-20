import chalk from "chalk";
import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";

export async function viewAllLogsFromToday(workLogService: IWorkLogService) {
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
