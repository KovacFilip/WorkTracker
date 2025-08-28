import type { ITaskService } from "../../../interfaces/services/taskService.js";
import type { UpdateTaskEntity } from "../../../models/task/entities/task.js";
import { getOptionalStringValue } from "../../helpers/getOptionalStringValue.js";
import { getTasksContainingStringHelper } from "../../helpers/getTaskStartingWithStringHelper.js";

export async function editTask(taskService: ITaskService) {
    const task = (await getTasksContainingStringHelper(taskService)).task;

    const currentTaskData = await taskService.getTask({ name: task });

    console.log("Current task values:");
    console.table([
        {
            Name: currentTaskData.name,
            Description: currentTaskData.description ?? "-",
        },
    ]);

    const newData: UpdateTaskEntity = {};

    const newName = await getOptionalStringValue("name", currentTaskData.name);
    if (newName) {
        newData.name = newName;
    }

    const newDescription = await getOptionalStringValue(
        "description",
        currentTaskData.description,
    );
    if (newDescription) {
        newData.description = newDescription;
    }

    const updatedTask = await taskService.editTask({ name: task }, newData);

    console.log(`Task ${task} updated successfully. The new values:`);
    console.table([
        {
            Name: updatedTask.name,
            Description: updatedTask.description ?? "-",
        },
    ]);
}
