import { confirm } from "@inquirer/prompts";
import { getDateTimeInput } from "./getDateInput.js";

export const getOptionalDateValue = async (
    property: string,
): Promise<string | undefined> => {
    const addQuestion = await confirm({
        message: `Do you wish to edit the ${property} value?`,
        default: true,
    });

    if (addQuestion) return getDateTimeInput("New date");

    return undefined;
};
