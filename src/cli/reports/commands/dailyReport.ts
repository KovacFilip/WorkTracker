import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { viewAllLogsFromSpecificDayHelper } from "../../workLog/helpers/viewLogsFromSpecificDay.js";

export async function dailyReport(workLogService: IWorkLogService) {
    const lastWorkingDayDate = getLastWorkingDay();

    await viewAllLogsFromSpecificDayHelper(workLogService, lastWorkingDayDate);
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
