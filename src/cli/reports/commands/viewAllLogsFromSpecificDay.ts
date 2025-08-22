import type { IWorkLogService } from "../../../interfaces/services/workLogService.js";
import { getDateInput } from "../../helpers/getDateInput.js";
import { viewAllLogsFromSpecificDayHelper } from "../../workLog/helpers/viewLogsFromSpecificDay.js";

export async function viewAllLogsFromSpecificDay(
    workLogService: IWorkLogService,
) {
    const date = await getDateInput("Date");
    await viewAllLogsFromSpecificDayHelper(workLogService, new Date(date));
}
