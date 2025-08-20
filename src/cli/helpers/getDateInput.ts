import { input } from "@inquirer/prompts";

export const getDateTimeInput = async (message: string): Promise<string> => {
    return await input({
        message: message + "(YYYY-MM-DD HH:mm)",
        validate: (input) => !isNaN(Date.parse(input)) || "Invalid datetime",
    });
};

export const getDateInput = async (message: string): Promise<string> => {
    return await input({
        message: message + "(YYYY-MM-DD)",
        validate: (input) => !isNaN(Date.parse(input)) || "Invalid date",
    });
};
