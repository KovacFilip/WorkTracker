import { confirm } from "@inquirer/prompts";
import { getDateInput } from "./getDateInput.js";

export const getOptionalDateValue = async (
    property: string,
): Promise<string | undefined> => {
    const addQuestion = await confirm({
        message: `Do you wish to edit the ${property} value?`,
        default: true,
    });

    if (addQuestion) return getDateInput("New date");

    return undefined;
};
