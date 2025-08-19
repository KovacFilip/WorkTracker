import { confirm, input } from "@inquirer/prompts";

export const getOptionalStringValue = async (
    property: string,
    currentValue: string = "",
): Promise<string | undefined> => {
    const addQuestion = await confirm({
        message: `Do you wish to edit the ${property} value?`,
        default: true,
    });

    let value;

    if (addQuestion) {
        value = await input({
            message: "New value: ",
            default: currentValue,
        });
    }

    return value;
};
