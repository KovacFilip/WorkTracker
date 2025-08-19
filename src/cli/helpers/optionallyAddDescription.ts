import { confirm, input } from "@inquirer/prompts";

export const optionallyAddDescription = async (): Promise<string> => {
    const addDescription = await confirm({
        message: "Do you wish to add description to task?",
        default: true,
    });

    let description;

    if (addDescription) {
        description = await input({
            message: "Task desription: ",
        });
    }

    return description ?? "";
};
