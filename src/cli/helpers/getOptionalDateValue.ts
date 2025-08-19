import { confirm, input } from "@inquirer/prompts";

export const getOptionalDateValue = async (
    property: string,
): Promise<string | undefined> => {
    const addQuestion = await confirm({
        message: `Do you wish to edit the ${property} value?`,
        default: true,
    });

    if (addQuestion) {
        const value = await input({
            message: "New date (YYYY-MM-DD HH:mm): ",
            validate: (input) => !isNaN(Date.parse(input)) || "Invalid date",
        });

        return value;
    }

    return undefined;
};
