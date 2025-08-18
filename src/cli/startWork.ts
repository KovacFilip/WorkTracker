import { buildCommand, type CommandContext } from "@stricli/core";

export const startWorkCommand = buildCommand({
    func(this: CommandContext, _: {}, id: string) {
        this.process.stdout.write(`Starting working on work with id: ${id}`);
    },
    parameters: {
        positional: {
            kind: "tuple",
            parameters: [
                {
                    brief: "Id of the task",
                    parse: String,
                    placeholder: "task id",
                },
            ],
        },
    },
    docs: {
        brief: "Command for starting work",
    },
});
