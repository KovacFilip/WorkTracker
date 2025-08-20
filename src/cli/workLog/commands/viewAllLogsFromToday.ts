import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { viewAllLogsFromSpecificDayHelper } from "../helpers/viewLogsFromSpecificDay.js";

export async function viewAllLogsFromToday(workLogService: IWorkLogService) {
    viewAllLogsFromSpecificDayHelper(workLogService, new Date());
}
